/* eslint-disable no-console */
import { useEffect, useState } from "react";

// TODO include devicemotion events too (see tab)

const initialData = {
	noOfUpdates : 0,
	isAbsolute  : false,
	x           : 0,
	y           : 0,
	z           : 0
};

type TState = typeof initialData;

type TUseSensors = () => {
	sensors: TState;
}

export const useSensors: TUseSensors = () => {
	const [ state, setState ] = useState<TState>(initialData);

	useEffect(() => {
		const HandleUpdate = (e: DeviceOrientationEvent) => {
			// * CHECKS
			if ((!e.beta) || (!e.gamma) || !e.alpha) return;

			/*___ DATA STRUCTURE ___
			[X] BETA	-180 to 180
			[Y] GAMMA	 -90 to 90
			[Z] ALPHA	   0 to 360 */
	
			let x = e.beta as number;
			let y = e.gamma as number;
			const z = e.alpha as number;
			x += 90; // TODO normalise the values I think - see the web page saved in laptop FF
			y += 90; // TODO same
			//x = x < -90 ? -90 : x > 90 ? 90 : x; //  CONSTRAIN X TO  -90 90  so device isn't upside down
			
			setState(prev => ({
				noOfUpdates : prev.noOfUpdates + 1,
				isAbsolute  : e.absolute,
				x           : Math.round(x),
				y           : Math.round(y),
				z           : Math.round(z)
			}));
		};

		if (window.DeviceOrientationEvent) {
			console.log("Sensors available");
			window.addEventListener("deviceorientation", HandleUpdate);
		} else {
			console.log("Sensors unavailable. Desktop? HTTPS? ");
		}

		return() => {
			window.removeEventListener("deviceorientation", HandleUpdate);
		};
	}, []);

	return {
		sensors: state
	};
};
