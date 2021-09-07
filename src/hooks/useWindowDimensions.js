import { useEffect, useState } from "react";
import { Log } from "../base/errorHandling";

export const useWindowDimensions = () => {
	const [ windowDimensions, setWindowDimensions ] = useState({
		height  : 0,
		width   : 0,
		centreX : 0,
		centreY : 0
	});

	const Update = () => {
		setWindowDimensions({
			width   : Math.floor(window.innerWidth),
			height  : Math.floor(window.innerHeight),
			centreX : Math.floor(window.innerWidth / 2),
			centreY : Math.floor(window.innerHeight / 2)
		});
	};

	useEffect(() => {
		try {
			window.addEventListener("resize", Update);
		}
		catch(e) {
			throw new Error("Unable to add event listener in useWindowDimensions");
		}

		Log.EventListenerAdded("resize in useWindowDimensions");
		Update();

		return () => {
			window.removeEventListener("resize", Update);
			Log.EventListenerRemoved("resize in useWindowDimensions");
		};
	}, []);

	useEffect(() => {
		Log.StateChange("Window dimensions");
		Log.JSON(windowDimensions);
	}, [ windowDimensions ]);

	return [ windowDimensions ];
};

