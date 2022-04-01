/* eslint-disable no-console */
import { useEffect, useState } from "react";

let noOfUpdates = 0;

interface stateType {
	noOfUpdates : number;
	x : number;
	y : number;
}

export const useMousePosition = (): [stateType] => {
	const [ mousePosition, setMousePosition ] = useState<stateType>({
		noOfUpdates : 0,
		x           : 0,
		y           : 0,
	});

	useEffect(() => {
		const Update = (e: MouseEvent): void => {
			noOfUpdates++;
			setMousePosition({
				noOfUpdates,
				x : e.clientX,
				y : e.clientY,
			});
		};

		try { window.addEventListener("mousemove", Update); }
		catch(e) { throw new Error("Unable to add event listener in useMousePosition"); }
		
		return () => (window.removeEventListener("mousemove", Update));
	}, []);

	return [ mousePosition ];
};
/*================================================================================

END OF FILE

================================================================================*/
