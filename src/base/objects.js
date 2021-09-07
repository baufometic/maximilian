/* eslint-env browser */
import { Log } from "./errorHandling";

const holder = []; // for storing shit when Iterate function goes recursive

export const OBJ = new function() {
	Log.Constructor("OBJ");
	
	this.IsObject = (obj = {}) => (obj.constructor === Object);
	this.IsDiv = (obj = {}) => (obj instanceof HTMLDivElement);
	this.IsEmpty = (obj = {}) => ((Object.entries(obj).length === 0) && (obj.constructor === Object));
	this.IsLink = (obj = {}) => (obj instanceof HTMLLinkElement);
	this.ArrayContains = (needle, [ haystack ]) => haystack.indexOf(needle) > -1;

	this.Iterate = (objToIterate, ...typesToMatch) => {
		Object.keys(objToIterate).forEach((key) => {
			const objType = typeof objToIterate[key];
			const objValue = objToIterate[key];
			if (this.ArrayContains(objType, typesToMatch)) {
				Log.Testing(`Match found:  ${ objValue }`);
				holder.push(objValue);
			}

			if (objType === "object") {
				Log.Testing(`[${ objType }]\t\t[Key] ${ key } ----------> ITERATING`);
				this.Iterate(objValue, ...typesToMatch);
			} else {
				Log.Testing(`[${ objType }]\t\t[Key] ${ key }  [Value] ${ objValue }`);
			}
		});

		return (holder);
	};

	this.Convert = {
		RGBStr: {
			ToObj: (str = null) => {
				if (str === null) throw new Error("Mandatory string required in RGBStr.ToObj");

				const newRGB = {};
				let s = `${ str }`;
				s = s.replace(/ /g, ""); // remove spaces that may come from object list formatting

				// R
				const start1 = s.indexOf("(") + 1;
				const len1 = s.indexOf(",", 0) - start1;
				newRGB.r = Number(s.substr(start1, len1));

				// G
				const start2 = s.indexOf(",") + 1;
				const len2 = s.indexOf(",", start2) - start2;
				newRGB.g = Number(s.substr(start2, len2));

				// B
				const start3 = s.indexOf(",", start2) + 1;
				const len3 = s.indexOf(")") - start3;
				newRGB.b = Number(s.substr(start3, len3));

				return (newRGB);
			},

			ToRGBA: (str = null, alpha = -1) => {
				if (str === null) throw new Error("Mandatory string required in RGBStr.ToRGBA");
				if (alpha < 0 || alpha > 1) throw new RangeError(`Alpha channel out of bounds in RGBStr.ToRGBA, passed: ${ alpha }`);
				const newRGB = this.Convert.RGBStr.ToObj(str);
				return (`rgba(${ newRGB.r },${ newRGB.g },${ newRGB.b }, ${ alpha })`);
			},

			ToHex: (str = "") => {
				const newRGB = { ...this.Convert.RGBStr.ToObj(str) };
				const componentToHex = (c) => {
					const hex = c.toString(16);
					return (hex.length === 1 ? `0${ hex }` : hex);
				};
				return `#${ componentToHex(newRGB.r) }${ componentToHex(newRGB.g) }${ componentToHex(newRGB.b) }`;
			},

			Invert: (str = "") => {
				if (!str.startsWith("rgb") && !str.startsWith("RGB")) throw new Error("RGB.Invert passed invalid color type. Not RGB? Maybe 'blue'");
				const oldRGB = { ...this.Convert.RGBStr.ToObj(str) };
				return (`rgb(${ 255 - oldRGB.r }, ${ 255 - oldRGB.g }, ${ 255 - oldRGB.b })`);
			},
		},
	};
};

