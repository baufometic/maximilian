import {
	useEffect, useMemo, useState 
} from "react";
import { MakeObservable } from "../base/observers";

const store = MakeObservable("PENDING" as "PENDING" | "ACCEPTED" | "REJECTED");

type TState = ReturnType<typeof store.Get>;

interface IActions {
	AcceptCookies: () => void;
	RejectCookies: () => void;
}

type TUseCookies = () => {
	cookieStatus: TState;
	cookieActions: IActions;
};

export const useCookies: TUseCookies = () => {
	const [ state, setState ] = useState(store.Get());

	useEffect(() => store.Subscribe(setState), []);

	const actions = useMemo((): IActions => ({
		AcceptCookies: () => {
			store.Set("ACCEPTED");
		},
		RejectCookies: () => {
			store.Set("REJECTED");
		}
	}), []);

	return {
		cookieStatus  : state,
		cookieActions : actions
	};
};
