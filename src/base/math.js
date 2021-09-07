import { Log } from "./errorHandling";

export const MATH = new function() {
	Log.Constructor("MATH");

	this.IsEven = (num) => num%2 == 0;

	this.RoundTo2DP = (num) => {
		var m = Number((Math.abs(num) * 100).toPrecision(15));
		return (Math.round(m) / 100 * Math.sign(num));
	};
};
