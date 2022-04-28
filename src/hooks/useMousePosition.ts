/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { Log } from "../index";

const initialData = {
	noOfUpdates : 0,
	x           : 0,
	y           : 0,
};

interface I_useMousePosition {
	(props: {
		verbose?: boolean;
	}): [ typeof initialData ];
}

export const useMousePosition: I_useMousePosition = ({ verbose=true }) => {
	const [ state, setState ] = useState<typeof initialData>(initialData);
	
	useEffect(() => {
		const Update = (e: MouseEvent): void => {
			setState(prev => ({
				noOfUpdates : prev.noOfUpdates + 1,
				x           : e.clientX,
				y           : e.clientY,
			}));
		};

		window.addEventListener("mousemove", Update);
		Log.EventListenerAdded("mousemove");
		
		return () => {
			window.removeEventListener("mousemove", Update);
			Log.EventListenerRemoved("mousemove");
		};
	}, []);

	useEffect(() => {
		verbose && Log.StateChange(
			JSON.stringify(state, null, 3),
			"useMousePosition"
		);
	}, [ state, verbose ]);

	return [
		state,
	];
};
