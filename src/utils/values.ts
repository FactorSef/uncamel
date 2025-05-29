export function isObject(value: any): boolean {
	return (
		typeof value === "object" &&
		!(value === null || value === undefined) &&
		!(value instanceof RegExp) &&
		!(value instanceof Error) &&
		!(value instanceof Date) &&
		!(globalThis.Blob && value instanceof globalThis.Blob)
	);
}
