import { useEffect, useState } from "react";

const QUERIES = {
	xs            : "(max-width: 576px)", // <
	s             : "(min-width: 576px)", // >=
	m             : "(min-width: 768px)", // >=
	l             : "(min-width: 992px)", // >=
	xl            : "(min-width: 1200px)", // >=
	xxl           : "(min-width: 1400px)", // >=
	desktop_S     : "(min-width: 1024px)", // >=
	desktop_M     : "(min-width: 1440px)", // >=
	desktop_L     : "(min-width: 2560px)", // >=
	portrait      : "(orientation: portrait)",
	landscape     : "(orientation: landscape)",
	mobile        : "only screen and (hover: none) and (pointer: coarse)",
	motionReduced : "(prefers-reduced-motion: no-preference)"
};

type TKeys = keyof typeof QUERIES;
type TState = Record<TKeys, boolean>;

export const useMediaQueries = () => {
	const [ state, setState ] = useState(() => {
		const initialState = {} as TState;
		let query: TKeys;
		for (query in QUERIES) initialState[query] = false;
		return initialState;
	});

	useEffect(() => {
		//* INTIALISE STATE AS THE WINDOW OBJECT EXISTS NOW
		
		const UpdateAllQueries = () => {
			setState(() => {
				const newState = {} as TState;
				let query: TKeys;
				for (query in QUERIES) {
					newState[query] = window.matchMedia(QUERIES[query]).matches;
				}
				return newState;
			});
		};

		//* ADD EVENT LISTENERS
		let query: keyof typeof QUERIES;
		for (query in QUERIES) {
			window.matchMedia(QUERIES[query]).addEventListener("change", UpdateAllQueries);
		}
	
		//* Init so state queries aren't all false
		UpdateAllQueries();

		return () => {
			//* REMOVE EVENT LISTENERS
			let query: keyof typeof QUERIES;
			for (query in QUERIES) {
				window.matchMedia(QUERIES[query]).removeEventListener("change", UpdateAllQueries);
			}
		};
	}, []);

	return {
		mediaQueries: state
	};
};

export const Media = (queriesToCombine: Array<keyof typeof QUERIES>) => `@media screen and ${ queriesToCombine.map(query => QUERIES[query]).join(" and ") }`;
