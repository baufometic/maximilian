import { useEffect, useState } from "react";

const initialState = {
	noOfUpdates         : 0,
	x                   : 0,
	y                   : 0,
	clientX             : 0,
	clientY             : 0,
	distanceFromCentreX : 0,
	distanceFromCentreY : 0
};

type TState = typeof initialState;

type TUseMousePosition = () => {
	mousePosition: TState;
};

export const useMousePosition: TUseMousePosition = () => {
	const [ state, setState ] = useState<TState>(initialState);
	
	useEffect(() => {
		const Update = (e: MouseEvent): void => {
			const distFromX = Math.abs(window.innerWidth/2 - e.pageX);
			const distFromY = Math.abs(window.innerHeight/2 - e.pageY);
			
			setState(prev => {
				return {
					noOfUpdates         : prev.noOfUpdates + 1,
					x                   : e.x,
					y                   : e.y,
					clientX             : e.clientX,
					clientY             : e.clientY,
					distanceFromCentreX : distFromX,
					distanceFromCentreY : distFromY
				};
			});
		};

		window.addEventListener("mousemove", Update);
		
		return () => {
			window.removeEventListener("mousemove", Update);
		};
	}, []);

	return {
		mousePosition: state
	};
};
