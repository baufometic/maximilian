// ! If the types throw warnings, check that you're not returning any spaces in the rgb types
import { Log } from "../base/log";
import { Random } from "../base/generators";
import { STR } from "../base/strings";

type T_hexString = `#${ string }`;
type T_rgbString = `${ "rgb"|"RGB" }(${ number },${ number },${ number })`;
type T_rgbaString = `${ "rgba"|"RGBA" }(${ number },${ number },${ number }, ${ number })`;
type T_anyColourString = T_rgbString & T_rgbaString & T_hexString;
type T_rgbObject = Record<"r" | "g" | "b", number>;
type T_rgbaFunction = (alpha: number) => T_rgbaString;

const ColourHelper = {
	IsValidColour: function(colour: T_anyColourString) {
		return (this.IsRGB(colour) || this.IsRGBA(colour) || this.IsHex(colour));
	},
	IsHex  : (str: T_hexString): boolean => str.startsWith("#"),
	IsRGB  : (str: T_rgbString): boolean => (str.toLowerCase()).startsWith("rgb"),
	IsRGBA : (str: T_rgbaString): boolean => (str.toLowerCase()).startsWith("rgba"),

	RandomRGBString: (): string => `rgb(${ Random.NumberBetween(0,255) }, ${ Random.NumberBetween(0,255) }, ${ Random.NumberBetween(0,255) })`,
	
	RGB: {
		FromString: {
			ToArray: function(str: T_rgbString): number[] {
				const matchesArray = str.match(/\d+/g);
				const arr: Array<number> | undefined = matchesArray?.map(item => Number(item));
		
				if (arr) {
					if ((arr.length !== 3) || arr.forEach(entry => entry < 0 || entry > 255)) {
						throw new RangeError(`ExtractNumbersToArray not passed 3 values. Passed: ${ arr }`);
					} else {
						return arr;
					}
				} else {
					throw new Error("No number matches found!");
				}
			},
			ToObject: function(str: T_rgbString): T_rgbObject {
				const arr = this.ToArray(str);
				return {
					r : arr[0],
					g : arr[1],
					b : arr[2],
				};
			},
			ToRGBA: function(str: T_rgbString, alpha: number): T_rgbaString {
				if (alpha < 0 || alpha > 1) throw new RangeError(`[ToRGBA] Alpha channel out of bounds, passed: ${ alpha }`);
				const newRGB = { ...this.ToObject(str) };
				return (`rgba(${ newRGB.r },${ newRGB.g },${ newRGB.b }, ${ alpha })`);
			},
			ToHex: function(str: T_rgbString): T_hexString {
				const newRGB = { ...this.ToObject(str) };
				const componentToHex = (c: number): string => {
					const hex = c.toString(16);
					return (hex.length === 1 ? `0${ hex }` : hex);
				};
				return `#${ componentToHex(newRGB.r) }${ componentToHex(newRGB.g) }${ componentToHex(newRGB.b) }`;
			},
			Invert: function(str: T_rgbString): T_rgbString {
				const oldRGBObj: T_rgbObject = { ...this.ToObject(str) };
				return `rgb(${ 255 - oldRGBObj.r },${ 255 - oldRGBObj.g },${ 255 - oldRGBObj.b })`;
			}
		}
	}	
};

const palettes: {
	[palette: string]: {
		[variation: string]: {
			rgb: T_rgbString;
			rgba?: T_rgbaFunction; // Partial. Gets created later using a loop
			hex?: T_hexString; // " "
			easyAccessName?: string;
		};
	}
} = {
	/** Original green variations from Matrix 1 */
	matrix: {
		a: {
			rgb: "rgb(13,2,8)",
		},
		b: {
			rgb: "rgb(0,59,0)",
		},
		c: {
			rgb: "rgb(0,143,17)",
		},
		d: {
			rgb: "rgb(0,255,65)",
		},
	},
	/** Variation A of synthwave type outrun palette */
	outrunA: {
		a: {
			rgb: "rgb(255,108,17)",
		},
		b: {
			rgb: "rgb(255,56,100)",
		},
		c: {
			rgb: "rgb(45,226,230)",
		},
		d: {
			rgb: "rgb(38,20,71)",
		},
		e: {
			rgb: "rgb(13,2,33)",
		},
	},
	/** Variation B of synthwave type outrun palette */
	outrunB: {
		a: {
			rgb: "rgb(2, 55, 136)",
		},
		b: {
			rgb: "rgb(101, 13, 137)",
		},
		c: {
			rgb: "rgb(146, 0, 117)",
		},
		d: {
			rgb: "rgb(246, 1, 157)",
		},
		e: {
			rgb: "rgb(212, 0, 120)",
		},
	},
	/** Variation C of synthwave type outrun palette */
	outrunC: {
		a: {
			rgb: "rgb(36, 23, 52)",
		},
		b: {
			rgb: "rgb(46, 33, 87)",
		},
		c: {
			rgb: "rgb(253, 55, 119)",
		},
		d: {
			rgb: "rgb(247, 6, 207)",
		},
		e: {
			rgb: "rgb(253, 29, 83)",
		},
	},
	/** Variation D of synthwave type outrun palette */
	outrunD: {
		a: {
			rgb: "rgb(249, 200, 14)",
		},
		b: {
			rgb: "rgb(255, 67, 101)",
		},
		c: {
			rgb: "rgb(84, 13, 110)",
		},
		d: {
			rgb: "rgb(121, 30, 148)",
		},
		e: {
			rgb: "rgb(84, 19, 136)",
		},
	},
	/** Original tech & tribal colour palette */
	techandtribal: {
		a: {
			rgb: "rgb(40, 127, 241)",
		},
		b: {
			rgb: "rgb(247, 6, 207)",
		},
		c: {
			rgb: "rgb(12,20,31)",
		},
		d: {
			rgb: "rgb(13,2,33)",
		},
		e: {
			rgb: "rgb(0,255,255)",
		},
	},
	/** mostly blues, blacks, whites */
	tron: {
		a: {
			rgb: "rgb(24,202,230)",
		},
		b: {
			rgb: "rgb(111,195,223)",
		},
		c: {
			rgb: "rgb(52,96,141)",
		},
		d: {
			rgb: "rgb(40, 127, 241)",
		},
		e: {
			rgb: "rgb(5,13,16)",
		},
		f: {
			rgb: "rgb(13,12,28)",
		},
		g: {
			rgb: "rgb(12,20,31)",
		},
		h: {
			rgb: "rgb(223,116,12)",
		},
		i: {
			rgb: "rgb(255,230,77)",
		},
		j: {
			rgb: "rgb(216,218,231)",
		},
		k: {
			rgb: "rgb(221, 230, 243)",
		},
		l: {
			rgb: "rgb(230,255,255)",
		},
	},
} as const;

const paletteShortcodes: { [k: string]: T_rgbString; } = {};

// * __________ APPEND ENTRIES TO PALETTES OBJECT __________
let paletteKey: keyof typeof palettes;
for (paletteKey in palettes) {
	const paletteObject = palettes[paletteKey];
	
	let variationKey: keyof typeof paletteObject;
	for (variationKey in paletteObject) {
		const objRef = paletteObject[variationKey]; // palettes -> matrix -> b

		if (objRef) {
			// * __________ RGBA / HEX __________
			objRef.rgba = (alpha) => {
				if (alpha < 0 || alpha > 1) throw new RangeError(`[rgba inside palettes] Alpha channel out of bounds, passed: ${ alpha }`);
				return ColourHelper.RGB.FromString.ToRGBA(objRef.rgb, alpha);
			};
			objRef.hex = ColourHelper.RGB.FromString.ToHex(objRef.rgb);

			// * __________ EASY ACCESS NAMES __________
			// * Make eg. 'Palettes.tron.orange.rgb' accessible using "Palettes.tronOrange". Doesn't even need rgb at the end.
			const easyAccessName: string = paletteKey + STR.CapitaliseFirstLetter(variationKey);

			// * Add it to the main object just so it's included in the loop when calling LogPalettes
			objRef.easyAccessName = easyAccessName;

			// * Also add it to a separate object for easy calling
			paletteShortcodes[easyAccessName] = objRef.rgb;
		} else {
			throw new Error("[LogPalettes] Couldn't find objRef whilst looping.");
		}
	}
}
/*================================================================================
END OF LOOP APPENDICES
================================================================================*/

/** Generate a random colour in format "rgb(0-255,0-25,0-255)" */
const RandomRGBColour = (): T_rgbString => {
	const randomPalette = Random.EntryFrom(palettes); // * Pick random palette from palettesObj i.e. tron / matrix
	const randomVariation = Random.EntryFrom(randomPalette); // * Random from variation within that i.e. a/b
	
	if (randomVariation) {
		return randomVariation.rgb;
	} else {
		throw new Error("[RandomRGBColour] Couldn't find rgb in palette");
	}
};

/** console log all available palettes */
const LogPalettes = (): void => {
	// eslint-disable-next-line no-console
	console.log(`Available palettes: ${ Object.keys(palettes).length }`);
	
	let paletteKey: keyof typeof palettes;
	for (paletteKey in palettes) {
		const paletteObject = palettes[paletteKey];
	
		let variationKey: keyof typeof paletteObject;
		for (variationKey in paletteObject) {
			const objRef = paletteObject[variationKey]; // palettes -> matrix -> b
		
			// * Error checks
			if (!objRef) throw new Error("[LogPalettes] - can't find 'objRef'");
			if (!objRef.rgba) throw new Error("[LogPalettes] - can't find objRef.rgba");

			Log.WithCustomStyle(`${ variationKey } | ${ objRef.rgb } | ${ objRef.hex } | ${ objRef.easyAccessName }`, `color: ${ objRef.rgb }`);
			Log.WithCustomStyle("\trgba 0.75", `color: ${ objRef.rgba(0.75) }`);
			Log.WithCustomStyle("\trgba 0.50", `color: ${ objRef.rgba(0.50) }`);
			Log.WithCustomStyle("\trgba 0.25", `color: ${ objRef.rgba(0.25) }`);
		}
	}
};

Object.seal(ColourHelper);
Object.seal(LogPalettes);
Object.seal(palettes);
Object.seal(paletteShortcodes);
Object.seal(RandomRGBColour);

export {
	ColourHelper,
	LogPalettes,
	palettes,
	paletteShortcodes,
	RandomRGBColour,
};
/*================================================================================

END OF FILE

================================================================================*/
