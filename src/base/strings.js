import { Log } from "./errorHandling";
import { Random } from "./generators";

export const STR = new function() {
	Log.Constructor("STR");

	this.Rearrange = (str = null) => {
		if (str === null) throw new Error("[STR] String missing in Rearrange()");
		let array = str.split("");
		let newStr = "";

		while (array.length > 0) {
			const idx = Random.NumberBetween(0, array.length - 1);
			newStr += array[idx];
			array.splice(idx, 1);
		}

		return(newStr);
	};

	this.IsValidColour = (str = null) => {
		if (str === null) throw new Error("[STR] String missing in IsValidColour");
		return (this.IsHex(str) || this.IsRGB(str));
	};

	this.IsHex = (str = null) => {
		if (str === null) throw new Error("[STR] String missing in IsHex");
		return (str.startsWith("#"));
	};

	this.IsRGB = (str = null) => {
		if (str === null) throw new Error("[STR] String missing in IsRGB");
		return (str.startsWith("rgb") || str.startsWith("RGB"));
	};

	this.TypeOfColour = (str = null) => {
		if (str === null) throw new Error("[STR] String missing in TypeOfColour");
		if (this.IsHex(str)) return ("hex");
		if (this.IsRGB(str)) return ("rgb");
		return (null);
	};

	this.CapitaliseFirstLetter = (str) => {
		if (str === null) throw new Error("[STR] String missing in CapitaliseFirstLetter");
		return(str.charAt(0).toUpperCase() + str.slice(1));
	};
};
