export const MakeObservable = <M_data, M_listener extends {(arg: M_data): unknown}>(targetData: M_data) => {
	let listeners: M_listener[] = [];
	let value = targetData;

	const Get = () => value;

	const Set = (newValue: M_data) => {
		if (value === newValue) return;
		value = newValue;
		listeners.forEach(listener => listener(value));
	};

	const Subscribe = (listenerFunc: M_listener): () => void => {
		listeners.push(listenerFunc);
		return() => Unsubscribe(listenerFunc);
	};

	const Unsubscribe = (listenerFunc: M_listener): void => {
		listeners = listeners.filter(l => l !== listenerFunc);
	};

	return {
		Get,
		Set,
		Subscribe
	};
};
