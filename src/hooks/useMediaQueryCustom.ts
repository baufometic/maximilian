import { useEffect, useState } from "react";

type TState = boolean;

export const useMediaQueryCustom = (queryString: string): TState => {
	const [ state, setState ] = useState<TState>(false);

	useEffect(() => {
		//* INTIALISE STATE AS THE WINDOW OBJECT EXISTS NOW
		const Update = () => {
			setState(window.matchMedia(queryString).matches);
		};

		//* ADD EVENT LISTENER
		window.matchMedia(queryString).addEventListener("change", Update);
	
		//* Init
		Update();

		return () => {
			//* REMOVE EVENT LISTENER
			window.matchMedia(queryString).removeEventListener("change", Update);
		};
	}, [ queryString ]);

	return state;
};
