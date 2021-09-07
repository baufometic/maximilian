import { useEffect, useState } from "react"; // ** DOESNT NEED REACT DIRECTLY IMPORTED AS IT'S NOT EXPORTING ANY JSX
import { Log } from "../base/errorHandling";

export const useMousePosition = () => {
	const [ mousePosition, setMousePosition ] = useState({
		x : 0,
		y : 0
	});
	
	useEffect(() => {
		const Update = (e) => {
			setMousePosition({
				x : e.clientX,
				y : e.clientY
			});
		};

		try {
			window.addEventListener("mousemove", Update);
		}
		catch(e) {
			throw new Error("Unable to add event listener in useMousePosition");
		}

		Log.EventListenerAdded("mousemove in useMousePosition");

		return () => {
			window.removeEventListener("mousemove", Update);
			Log.EventListenerRemoved("mousemove in useMousePosition");
		};
	}, []);

	return [ mousePosition ];
};
