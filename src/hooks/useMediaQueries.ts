/* eslint-disable no-console */
import { SetStateAction, useEffect, useState } from "react";
import { Log } from "../base/log";

// * Pixel values
const __breakpoints__ = {
	mobileS  : "320px",
	mobileM  : "375px",
	mobileL  : "425px",
	tablet   : "768px",
	desktopS : "1024px",
	desktopM : "1440px",
	desktopL : "2560px",
};

// * Generate string type media queries based on pixel values
const __strings__ = {
	a_mobileS       : "(min-width: " + __breakpoints__.mobileS + ")",
	b_mobileM       : "(min-width: " + __breakpoints__.mobileM + ")",
	c_mobileL       : "(min-width: " + __breakpoints__.mobileL + ")",
	d_tablet        : "(min-width: " + __breakpoints__.tablet + ")",
	e_desktopS      : "(min-width: " + __breakpoints__.desktopS + ")",
	f_desktopM      : "(min-width: " + __breakpoints__.desktopM + ")",
	g_desktopL      : "(min-width: " + __breakpoints__.desktopL + ")",
	isMobile        : "only screen and (hover: none) and (pointer: coarse)",
	isMotionReduced : "(prefers-reduced-motion: no-preference)",
	isPortrait      : "(orientation: portrait)",
	isLandscape     : "(orientation: landscape)",	
};

type T_mediaQuery = {
	name: string;
	value: string;
	isActive?: boolean;
};

const mediaQueriesObj: T_mediaQuery[] = [
	{
		name  : "isPortrait",
		value : __strings__.isPortrait,
	},
	{
		name  : "isLandscape",
		value : __strings__.isLandscape,
	},
	{
		name  : "isMobile",
		value : __strings__.isMobile,
	},
	{
		name  : "isMotionReduced",
		value : __strings__.isMotionReduced,
	},
	{
		name  : "isSmall",
		value : `${ __strings__.a_mobileS }, ${ __strings__.b_mobileM }, ${ __strings__.c_mobileL }`,
	},
	{
		name  : "isLarge",
		value : `${ __strings__.d_tablet }, ${ __strings__.e_desktopS }, ${ __strings__.f_desktopM }, ${ __strings__.g_desktopL }`,
	}
];

const togglers: (() => void)[] = []; // * just an array of functions

type T_setStateFunction = {
	(...args: [value: SetStateAction<T_mediaQuery[]>] | [arg0: T_mediaQuery[]]): void;
};

const AttachEventListeners = (setStateFunction: T_setStateFunction): void => {
	for (const query of mediaQueriesObj) {
		query.isActive = false;

		const ToggleIsActive = (e: MediaQueryListEvent) => {
			query.isActive = e.matches;
			setStateFunction(mediaQueriesObj);
		};
		
		// * Make it easier to loop remove them
		const RemoveFunction = () => (window.matchMedia(query.value).removeEventListener("change", ToggleIsActive));
		togglers.push(RemoveFunction);

		try { window.matchMedia(query.value).addEventListener("change", ToggleIsActive); }
		catch(e) { throw new Error(`Unable to add '${ query.name }' event listener in useMediaQuery`); }
	}
};

const RemoveEventListeners = () => {
	for (const toggler of togglers) toggler();
};

// TODO basically rebuitl this - test it asap inside of TT next app
export const useMediaQueries = () => {
	const [ mediaQueries, setMediaQueries ] = useState<T_mediaQuery[]>(mediaQueriesObj);
	
	useEffect(() => {
		// * Can't be done in initial use State as it requires window
		AttachEventListeners(setMediaQueries); // * pass in the setState for updating mediaQueries outside of this scope

		return () => {
			RemoveEventListeners();
		};
	}, []);

	useEffect(() => {
		console.log(JSON.stringify(mediaQueries, null, 4));
	}, [ mediaQueries ]);

	Log.Render("useMediaQueries");
	return { mediaQueries };
};
/*================================================================================

END OF FILE

================================================================================*/
