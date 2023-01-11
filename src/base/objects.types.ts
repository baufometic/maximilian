export type TEntries<T> = {
	[K in keyof T]: [K, T[K]]
} [keyof T][];
