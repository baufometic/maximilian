import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (options) => {
	const containerRef = useRef(null);
	const [ isVisible, setIsVisible ] = useState(false);

	const callbackFunction = (entries) => {
		const [ entry ] = entries;
		setIsVisible(entry.isIntersecting);
	};

	useEffect(() => {
		const cRef = containerRef.current || null;
		const observer = new IntersectionObserver(callbackFunction, options);
		if (cRef) observer.observe(cRef);

		return () => {
			if (cRef) observer.unobserve(cRef);
		};
	}, [ containerRef, options ]);

	return [ containerRef, isVisible ];
};

