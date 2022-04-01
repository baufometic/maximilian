const MATH = {
	IsEven     : (num: number): boolean => (num%2 == 0),
	RoundTo2DP : (num: number): number => {
		const m = Number((Math.abs(num) * 100).toPrecision(15));
		return (Math.round(m) / 100 * Math.sign(num));
	},
};

Object.seal(MATH);
export { MATH };
