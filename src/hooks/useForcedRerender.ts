import { useEffect, useState } from "react";

interface I_useForcedRerender {
	(intervalMS: number): { forcedRerender: number };
}

// * Artificial re-render timer just to see
export const useForcedRerender: I_useForcedRerender = (intervalMS) => {
	const [ forcedRerender, setForcedRerender ] = useState<number>(0);

	useEffect(() => {
		const intervalTimer = setInterval(() => {
			setForcedRerender(p => p + 1);
		}, intervalMS);
		return () => (clearInterval(intervalTimer));
	}, [ intervalMS ]);

	return { forcedRerender };
};
