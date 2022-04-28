/* eslint-disable no-console */
import { useEffect, useMemo, useState } from "react";
import { Log } from "../index";

const initialData = 0 as number;

type T_actions = {
	trigger: () => void;
};

interface I_useRerender {
	(props: {
		intervalMS: number;
		verbose?: boolean;
	}): [ typeof initialData, T_actions ];
}

export const useRerender: I_useRerender = ({ intervalMS=0, verbose=true }) => {
	const [ state, setState ] = useState<typeof initialData>(initialData);

	useEffect(() => {
		let timer: ReturnType<typeof setInterval>;
		if (intervalMS) {
			timer = setInterval(() => {
				setState(p => p + 1);
			}, intervalMS);
		}

		return () => {
			if (timer) clearInterval(timer);
		};
	}, [ intervalMS, verbose ]);

	useEffect(() => {
		verbose && Log.StateChange(
			JSON.stringify(state, null, 3),
			"useRerender"
		);
	}, [ state, verbose ]);

	const actions = useMemo((): T_actions => ({
		trigger: () => (setState(prev => prev + 1))
	}), []);

	return [
		state,
		actions,
	];
};
