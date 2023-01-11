import { TSetState } from "./observers.types";

const MakeObservable = <_state, _setState extends TSetState<_state>>(targetData: _state): {
	Get: () => _state;
	Set: (arg: _state) => void;
	Subscribe: (setState: _setState) => void;
} => {
	let listeners: _setState[] = [];
	let store = targetData;

	const Get = () => store;

	const Set = (newValue: _state): void => {
		if (store === newValue) return;
		store = newValue;
		listeners.forEach(l => l(store));
	};
	
	const Subscribe = (setState: _setState): () => void => {
		listeners.push(setState);
		return () => Unsubscribe(setState); // Used inside initial useEffect[]
	};

	const Unsubscribe = (setState: _setState): void => {
		listeners = listeners.filter(l => l !== setState);
	};

	return {
		Get,
		Set,
		Subscribe
	};
};

export { MakeObservable };
