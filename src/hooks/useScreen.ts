import { useEffect, useState } from "react";

// TODO send out a ready state so there's no repaint
// TODO May swap this for useLayoutEffect
// TODO slow down the paint and see if there's flicker (as per vid)

const initialState = {
	height  : 0,
	width   : 0,
	centreX : 0,
	centreY : 0
};

type TState = typeof initialState;

type TUseScreen = () => {
	screen: TState;
}

export const useScreen: TUseScreen = () => {
	const [ state, setState ] = useState<TState>(initialState);

	useEffect(() => {
		const Update = () => {
			setState(() => {
				const height = window.innerHeight;
				const width = window.innerWidth;
				
				return {
					height  : Math.floor(height),
					width   : Math.floor(width),
					centreX : Math.floor(width / 2),
					centreY : Math.floor(height / 2)
				};
			});
		};

		Update(); //* Initial update
		window.addEventListener("resize", Update);

		return () => {
			window.removeEventListener("resize", Update);
		};
	}, []);
	
	return {
		screen: state
	};
};
