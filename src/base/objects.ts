import { TEntries } from "./objects.types";

const OBJ = {
	ArrayContains : <T extends unknown[]>(needle: unknown, haystack: T): boolean => haystack.includes(needle),
	Entries       : <T extends Record<string, unknown>>(obj: T): TEntries<T> => (Object.entries(obj) as any),
	HasKey        : <T extends Record<string, unknown>>(obj: T, key: PropertyKey): key is keyof T => (key in obj),
	IsObject      : <T extends Record<string, unknown>>(obj: T): boolean => (obj.constructor === Object),
	IsEmpty       : <T extends Record<string, unknown>>(obj: T) => ((Object.entries(obj).length === 0) && (obj.constructor === Object)),
	Keys          : <T extends Record<string, unknown>>(obj: T): (keyof T)[] => (Object.keys(obj) as any)

	// TODO come back later and add bool's to the logging
	// Iterate: function(objToIterate, ...typesToMatch) {
	// 	Object.keys(objToIterate).forEach((key) => {
	// 		const objType = typeof objToIterate[key];
	// 		const objValue = objToIterate[key];
			
	// 		if (this.ArrayContains(objType, typesToMatch)) {
	// 			console.log(`Match found:  ${ objValue }`);
	// 			holder.push(objValue);
	// 		}

	// 		if (objType === "object") {
	// 			console.log(`[${ objType }]\t\t[Key] ${ key } ----------> ITERATING`);
	// 			this.Iterate(objValue, ...typesToMatch);
	// 		} else {
	// 			console.log(`[${ objType }]\t\t[Key] ${ key }  [Value] ${ objValue }`);
	// 		}
	// 	});

	// 	return holder;
	// },
};

Object.seal(OBJ);
export { OBJ };
