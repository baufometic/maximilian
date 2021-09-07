import { Log } from "./errorHandling"; 

export const Random = new function() {
	Log.Constructor("Random");

	this.Test = () => {
		Log.Linebreak("Random [ Testing ]");
		this.NumberBetween(1,1000, true);
		this.RGBObject(true);
		this.RGBString(true);
	};

	/**
	* Returns a random between number between given min max
	* @property {integer} min
	* @property {integer} max
	* @returns {integer} integer containing random number
	*/
	this.NumberBetween = function(min = null, max = null, logTest = false) {
		if (Number.isNaN(min) || Number.isNaN(max) || (min === null) || (max === null)) {
			throw new Error(`Invalid argument(s) passed to RandomNumber. Min: ${ min }, Max: ${ max }`);
		}
		min = Math.ceil(min);
		max = Math.floor(max);
		const random = Number(Math.floor(Math.random() * (max - min + 1) + min));
		if (logTest) Log.Testing(`NumberBetween(${ min },${ max }): ${ random }`);
		return(random);
	};

	/**
	* Returns a random RGB object
	* @returns {object} object in format { r: 12, g: 20, b: 31 }
	*/
	this.RGBObject = (logTest = false) => {
		const rgb = {
			r : this.NumberBetween(0, 255),
			g : this.NumberBetween(0, 255),
			b : this.NumberBetween(0, 255)
		};
		if (logTest) Log.Testing(`RGBObject: ${ JSON.stringify(rgb, null, 4) }`);
		return(rgb);
	};

	/**
	* Returns a random RGB string
	* @returns {string} string in format rgb(12,20,31) 
	*/
	this.RGBString = (logTest = false) => {
		const rgb = { ...this.RGBObject };
		const str = `rgb(${ rgb.r },${ rgb.g },${ rgb.b })`;
		if (logTest) Log.Testing(`RGBString: ${ str }`);
		return(str);
	};
}
