/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { Log } from "../base/log";

type stateType = {
	height : number;
	width : number;
	centreX : number;
	centreY : number;
};

// TODO test this inside of dev panel I made
export const useWindowSize = (): [stateType] => {
	const [ windowSize, setWindowSize ] = useState<stateType>({
		height  : 0,
		width   : 0,
		centreX : 0,
		centreY : 0,
	});

	useEffect(() => {
		const Update = () => {
			setWindowSize({
				height  : Math.floor(window.innerHeight),
				width   : Math.floor(window.innerWidth),
				centreX : Math.floor(window.innerWidth / 2),
				centreY : Math.floor(window.innerHeight / 2),
			});
		};

		try { window.addEventListener("resize", Update); }
		catch(e) { throw new Error("Unable to add event listener in useWindowDimensions"); }

		Update();
		return () => (window.removeEventListener("resize", Update));
	}, []);

	useEffect(() => {
		Log.JSON(windowSize);
	}, [ windowSize ]);
	
	console.log("[render] useWindowSize");
	return [ windowSize ];
};
