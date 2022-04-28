import { OBJ } from "./objects";

const Random = {
	EntryFrom: function<T extends Record<string, unknown>>(obj: T): T[keyof T] {
		const keys = OBJ.Keys(obj);
		const randomIdx = this.NumberBetween(0, keys.length-1);
		const randomKey = keys[randomIdx];
		return obj[randomKey] as any;
	},
	KeyFrom: function<T extends Record<string, unknown>>(obj: T): keyof T {
		const keys = OBJ.Keys(obj);
		const randomIdx = this.NumberBetween(0, keys.length-1);
		return keys[randomIdx] as any;
	},
	RGBObject: function(): { r: number; g: number; b: number; } {
		return {
			r : this.NumberBetween(0, 255),
			g : this.NumberBetween(0, 255),
			b : this.NumberBetween(0, 255),
		};
	},
	RGBString: function(): `rgb(${ number },${ number },${ number })` {
		const rgb = { ...this.RGBObject() };
		return `rgb(${ rgb.r },${ rgb.g },${ rgb.b })`;
	},
	NumberBetween: function(pMin: number, pMax: number): number {
		// * Checks
		if (pMin >= pMax) throw new RangeError(`NumberBetween: fix pMin or pMax, currently: ${ pMin } and ${ pMax }`);
		const min = Math.ceil(pMin);
		const max = Math.floor(pMax);
		const random = Number(Math.floor(Math.random() * (max - min + 1) + min));
		return random;
	},
};

Object.seal(Random);
export { Random };
