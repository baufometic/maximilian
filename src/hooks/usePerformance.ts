import { useEffect, useState } from "react";

export const useEngagement = (intervalMS: number): { engagement: number } => {
	const [ engagement, setEngagement ] = useState<number>(0);
	useEffect(() => {
		const t = setInterval(() => (setEngagement(p => p + 1)), intervalMS);
		return() => (clearInterval(t));
	}, [ intervalMS ]);
	return { engagement };
};

export const useOptimisation = (intervalMS: number): { optimisation: number } => {
	const [ optimisation, setOptimisation ] = useState<number>(0);
	useEffect(() => {
		const t = setInterval(() => (setOptimisation(p => p + 1)), intervalMS);
		return() => (clearInterval(t));
	}, [ intervalMS ]);
	return { optimisation };
};

export const useSplitTesting = (intervalMS: number): { splitTesting: number } => {
	const [ splitTesting, setSplitTesting ] = useState<number>(0);
	useEffect(() => {
		const t = setInterval(() => (setSplitTesting(p => p + 1)), intervalMS);
		return() => (clearInterval(t));
	}, [ intervalMS ]);
	return { splitTesting };
};
