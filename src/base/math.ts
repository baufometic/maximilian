const CheckNumber = (n: string) => {
	if (Number.isFinite(parseFloat(n))) return true
	else throw new Error("[CheckNumber] not isFinite")
}

const MATH = {
	IsEven     : (n: number) => (CheckNumber(String(n)) && n % 2 == 0),
	IsOdd      : (n: number) => (CheckNumber(String(n)) && Math.abs(n % 2) == 1),
	RoundTo2DP : (num: number): number => {
		const m = Number((Math.abs(num) * 100).toPrecision(15))
		return (Math.round(m) / 100 * Math.sign(num))
	}
}

Object.seal(MATH)
export { MATH }
