/* eslint-disable no-console */
import { Dispatch, SetStateAction } from "react"
import { Log } from "./log"

type T_setState<T_state> = Dispatch<SetStateAction<T_state>>;

const MakeObservablePro = <_state, _setState extends T_setState<_state>>(targetData: _state): {
	Get: () => _state;
	Set: (arg: _state) => void;
	Subscribe: (setState: _setState) => void;
} => {
	Log.Testing("MakeObservable called with: ")
	console.log(JSON.stringify(targetData, null, 3))
	let listeners: _setState[] = []
	let store = targetData

	const Get = () => store

	const Set = (newValue: _state): void => {
		if (store === newValue) return
		store = newValue
		listeners.forEach(l => l(store))
	}
	
	const Subscribe = (setState: _setState): () => void => {
		listeners.push(setState)
		return () => Unsubscribe(setState) // Used inside initial useEffect[]
	}

	const Unsubscribe = (setState: _setState): void => {
		listeners = listeners.filter(l => l !== setState)
	}

	return {
		Get,
		Set,
		Subscribe
	}
}

export {
	MakeObservablePro
}
