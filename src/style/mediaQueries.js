import { Log } from "../base/errorHandling";

// Pixel values
const breakpoints = {
	mobileS  : "320px",
	mobileM  : "375px",
	mobileL  : "425px",
	tablet   : "768px",
	desktopS : "1024px",
	desktopM : "1440px",
	desktopL : "2560px",
};

// Produce string type media queries based on pixel values
const mediaQueries = {
	a_mobileS       : `(min-width: ${ breakpoints.mobileS })`,
	b_mobileM       : `(min-width: ${ breakpoints.mobileM })`,
	c_mobileL       : `(min-width: ${ breakpoints.mobileL })`,
	d_tablet        : `(min-width: ${ breakpoints.tablet })`,
	e_desktopS      : `(min-width: ${ breakpoints.desktopS })`,
	f_desktopM      : `(min-width: ${ breakpoints.desktopM })`,
	g_desktopL      : `(min-width: ${ breakpoints.desktopL })`,
	isMobile        : "only screen and (hover: none) and (pointer: coarse)",
	isMotionReduced : "(prefers-reduced-motion: no-preference)",
	isPortrait      : "(orientation: portrait)",
	isLandscape     : "(orientation: landscape)",	
};

export const Device = new function() {
	Log.Constructor("Device");
    
	this.isMotionReduced	= `${ mediaQueries.isMotionReduced }`;
	this.isPortrait			= `${ mediaQueries.isPortrait }`;
	this.isLandscape		= `${ mediaQueries.isLandscape }`;
	this.isMobile			= `${ mediaQueries.isMobile }`;
	this.isSmall			= `${ mediaQueries.a_mobileS }, ${ mediaQueries.b_mobileM }, ${ mediaQueries.c_mobileL }`;
	this.isLarge			= `${ mediaQueries.d_tablet }, ${ mediaQueries.e_desktopS }, ${ mediaQueries.f_desktopM }, ${ mediaQueries.g_desktopL }`;
};
