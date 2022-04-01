/* eslint-disable no-console */
import { Log } from "../base/log";
import { useEffect, useState } from "react";

// TODO include devicemotion events too (see tab)

const GetTickCount = () => Date.now();
const MAX_UPDATES_PER_SECOND_MS = 50;
let lastUpdateTime = Date.now();

const ShouldUpdate = (): boolean => {
	const tickCount = GetTickCount();
	if (tickCount >= (lastUpdateTime + MAX_UPDATES_PER_SECOND_MS)) {
		lastUpdateTime = tickCount;
		return(true);
	}
	return false;
};

type T_orientationObj = {
	count: number,
	isAbsolute : boolean,
	x : number,
	y : number,
	z : number,
};

const initialOrientationObj: T_orientationObj = {
	count      : 0,
	isAbsolute : false,
	x          : 0,
	y          : 0,
	z          : 0,
};

type storeType = {
	holder: Array<T_orientationObj>;
	Add(obj: T_orientationObj): void;
	count: number;
}

const Store: storeType = {
	holder: [],
	Add(obj) { this.holder.push(obj); },
	get count() { return this.holder.length; }
};

export const useSensors = (): [T_orientationObj] => {
	const [ sensorData, setSensorData ] = useState<T_orientationObj>(initialOrientationObj);

	useEffect(() => {
		// TODO set type of event
		const UpdateOrientation = (e: DeviceOrientationEvent) => {
			if (!ShouldUpdate()) return;

			// * CHECKS
			if ((!e.beta) || (!e.gamma) || e.alpha) {
				throw new Error("[UpdateOrientation] nothing in e");
			}

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
	
			const data: T_orientationObj = {
				count      : Store.count + 1,
				isAbsolute : e.absolute,
				x          : Math.round(x),
				y          : Math.round(y),
				z          : Math.round(z),
			};
	
			Store.Add(data);
			setSensorData(data);
		};

		if (window.DeviceOrientationEvent) {
			try { window.addEventListener("deviceorientation", UpdateOrientation); }
			catch(e) { throw new Error("Unable to add useSensors window listener"); }
		} else {
			console.error("Unable to setup useSensors. Using desktop? HTTPS enabled?");
		}

		return () => (removeEventListener("deviceorientation", UpdateOrientation));
	}, []);

	Log.Render("useSensors");
	return [ sensorData ];
};
/*================================================================================

END OF FILE

================================================================================*/
