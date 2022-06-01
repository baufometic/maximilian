import { Random } from "./generators"

const STR = {
	CapitaliseFirstLetter : (pStr: string): string => (pStr.charAt(0).toUpperCase() + pStr.slice(1)),
	Rearrange             : (pStr: string): string => {
		const array = pStr.split("")
		let str = ""
		while (array.length > 0) {
			const idx = Random.NumberBetween(0, array.length - 1)
			str += array[idx]
			array.splice(idx, 1)
		}
		return str
	},
	RemoveIndentation: (pStr: string): string => {
		let str = pStr.replace(/\t/g, "") // tabs
		str = str.replace(/\n/g, "") // new lines
		return str
	}
}

Object.seal(STR)
export { STR }
