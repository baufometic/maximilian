import { Log } from "../base/errorHandling";
import { OBJ } from "../base/objects";
import { STR } from "../base/strings";
import { Random } from "../base/generators";

const { ToHex, ToRGBA } = OBJ.Convert.RGBStr;

export const Palettes = new function() {
	Log.Constructor("Palettes");

	// ____________________ PALETTES ____________________
	this.peteCustom = {
		a : { rgb: "rgb(40, 127, 241)" },
		b : { rgb: "rgb(247, 6, 207)" },
		c : { rgb: "rgb(12,20,31)" },
		d : { rgb: "rgb(13,2,33)" }
	};

	this.outrunA = {
		a : { rgb: "rgb(255,108,17)" },
		b : { rgb: "rgb(255,56,100)" },
		c : { rgb: "rgb(45,226,230)" },
		d : { rgb: "rgb(38,20,71)" },
		e : { rgb: "rgb(13,2,33)" },
	};

	this.outrunB = {
		a : { rgb: "rgb(2, 55, 136)" },
		b : { rgb: "rgb(101, 13, 137)" },
		c : { rgb: "rgb(146, 0, 117)" },
		d : { rgb: "rgb(246, 1, 157)" },
		e : { rgb: "rgb(212, 0, 120)" },
	};

	this.outrunC = {
		a : { rgb: "rgb(36, 23, 52)" },
		b : { rgb: "rgb(46, 33, 87)" },
		c : { rgb: "rgb(253, 55, 119)" },
		d : { rgb: "rgb(247, 6, 207)" },
		e : { rgb: "rgb(253, 29, 83)" },
	};

	this.outrunD = {
		a : { rgb: "rgb(249, 200, 14)" },
		b : { rgb: "rgb(255, 67, 101)" },
		c : { rgb: "rgb(84, 13, 110)" },
		d : { rgb: "rgb(121, 30, 148)" },
		e : { rgb: "rgb(84, 19, 136)" },
	};

	this.matrix = {
		black  : { rgb: "rgb(13,2,8)" },
		green0 : { rgb: "rgb(0,59,0)" },
		green1 : { rgb: "rgb(0,143,17)" },
		green2 : { rgb: "rgb(0,255,65)" },
	};

	this.tron = {
		blue0  : { rgb: "rgb(24,202,230)" },
		blue1  : { rgb: "rgb(111,195,223)" },
		blue2  : { rgb: "rgb(52,96,141)" },
		blue3  : { rgb: "rgb(40, 127, 241)" },
		black0 : { rgb: "rgb(5,13,16)" },
		black1 : { rgb: "rgb(13,12,28)" },
		black2 : { rgb: "rgb(12,20,31)" },
		orange : { rgb: "rgb(223,116,12)" },
		white0 : { rgb: "rgb(216,218,231)" },
		white1 : { rgb: "rgb(221, 230, 243)" },
		white2 : { rgb: "rgb(230,255,255)" },
		yellow : { rgb: "rgb(255,230,77)" },
	};

	//________________________________________ RANDOM COLOUR SELECTION ________________________________________
	const noOfPalettes = Object.keys(this).length;
	const RandomPaletteKey = () => Object.keys(this)[Random.NumberBetween(0, noOfPalettes-1)];
	const RandomPaletteObj = () => this[RandomPaletteKey()];

	this.RandomColour = (logTest = false) => {
		const palette = RandomPaletteObj();
		if (logTest) Log.Testing(`Random Palette: ${ JSON.stringify(palette, null, 4) }`);
		
		const noOfVariations = Object.keys(palette).length;
		const randomVariationIdx = Random.NumberBetween(0, noOfVariations-1);
		const randomKey = Object.keys(palette)[randomVariationIdx];
		const colour = palette[randomKey].rgb;
		if (logTest) Log.Testing(`Random colour: ${ colour }`);
		
		return(colour);
	};
	Object.defineProperty(this, "RandomColour", {
		enumerable: false
	});
	
	//________________________________________ APPENDING FUNCTIONS TO PALETTE VARIATIONS ________________________________________
	Log.Attempt(`${ noOfPalettes } available palettes: ${ Object.keys(this).join(", ") }`);
	Object.entries(this).forEach((palette) => {
		const [ paletteName, variations ] = palette;
		Log.Linebreak(`Palette: ${ paletteName }`);

		Object.entries(variations).forEach((variation) => {
			const [ colourName, obj ] = variation;

			// Append extra methods to palettes. Hex, RGBA, inverted
			obj.hex = ToHex(obj.rgb);
			obj.rgba = (alphaDecimal) => ToRGBA(obj.rgb, alphaDecimal);

			// Makes "Palettes.tron.orange.rgb" accessible using "Palettes.tronOrange" (doesn't even need rgb at end)
			const easyAccessName = `${ paletteName }${ STR.CapitaliseFirstLetter(colourName) }`;
			this[easyAccessName] = obj.rgb;
			Object.defineProperty(this, easyAccessName, {
				enumerable: false
			});

			Log.WithCustomStyle(`${ colourName } | ${ obj.rgb } | ${ obj.hex } | ${ easyAccessName }`,
				`color: ${ obj.rgb };`);
			Log.WithCustomStyle("\trgba 0.75",
				`color: ${ obj.rgba(0.75) }`);
			Log.WithCustomStyle("\trgba 0.50",
				`color: ${ obj.rgba(0.50) }`);
			Log.WithCustomStyle("\trgba 0.25",
				`color: ${ obj.rgba(0.25) }`);
		});
	});	
};
