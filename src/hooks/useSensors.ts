/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { Log } from "../index";

// TODO include devicemotion events too (see tab)
// TODO test updateMS is taking in default

const initialData = {
	noOfUpdates : 0,
	isAbsolute  : false,
	x           : 0,
	y           : 0,
	z           : 0,
};

interface I_useSensors {
	(props: {
		updateLimitMS?: number;
		verbose?: boolean;
	}): [ typeof initialData ];
}

export const useSensors: I_useSensors = ({ updateLimitMS=1000, verbose=true }) => {
	const [ state, setState ] = useState<typeof initialData>(initialData);

	useEffect(() => {
		Log.Testing("Initialising sensors. updateLimitMS: " + updateLimitMS);

		//* CONTROL UPDATE FREQUENCY
		const MAX_UPDATES_PER_SECOND_MS = updateLimitMS || 1000; //* use either prop value or default
		let lastUpdateTime = Date.now();
		
		const ShouldUpdate = (): boolean => {
			if (Date.now() >= (lastUpdateTime + MAX_UPDATES_PER_SECOND_MS)) {
				lastUpdateTime = Date.now();
				return true;
			} else {
				return false;
			}
		};

		// TODO set type of event
		const UpdateOrientation = (e: DeviceOrientationEvent) => {
			Log.Testing("TRYING SENSORS");
			
			// * CHECKS
			if (!ShouldUpdate()) return; // TODO THIS HAS TO BE ULTRA FAST OR RUN WITH TWEENING
			if ((!e.beta) || (!e.gamma) || !e.alpha) throw new Error("[UpdateOrientation] nothing in e");

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
				z           : Math.round(z),
			}));
		};

		if (window.DeviceOrientationEvent) {
			Log.Success("sensors available");

			// TODO reenable after testing
			// try {
			// 	window.addEventListener("deviceorientation", UpdateOrientation);
			// 	Log.Success("Added sensors I think?");
			// }
			// catch(e) {
			// 	Log.Warning("Unable to add useSensors");
			// 	throw new Error("Unable to add useSensors window listener");
			// }
		} else {
			Log.Warning("Sensors unavailable. Desktop? HTTPS? ");
		}

		return () => (removeEventListener("deviceorientation", UpdateOrientation));
	}, [ updateLimitMS ]);

	useEffect(() => {
		verbose && Log.StateChange(
			JSON.stringify(state, null, 3),
			"useSensors"
		);
	}, [ state, verbose ]);

	return [
		state,
	];
};
