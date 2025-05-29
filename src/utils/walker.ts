import { isObject } from "./values";

export type MapperFN<T, K, P> = (el: T, key: K, parent?: P) => [T, K];

export type WalkerOptions = {
	/**
	 * Enable deep map
	 * @default false
	 */
	deep?: boolean;
	target?: any;
};

export const CONTRACTS_KEY = "__contracts__";

export function walker<T extends Object>(
	value: T | Array<T>,
	mapper: MapperFN<T[keyof T], keyof T, T>,
	options?: WalkerOptions,
	isSeen = new WeakMap()
) {
	if (!isObject(value)) {
		return value;
	}

	options = {
		deep: false,
		target: {},
		...options,
	};

	if (isSeen.has(value)) {
		return isSeen.get(value);
	}

	isSeen.set(value, options.target);

	const { target } = options;
	delete options.target;

	const mapArray = (arr: any) =>
		arr.map((el: any) =>
			isObject(el) ? walker(el, mapper, options, isSeen) : el
		);

	if (Array.isArray(value)) {
		return mapArray(value);
	}

	const contracts: Record<string, string> = {};

	for (const [key, el] of Object.entries(value)) {
		let [newValue, newKey] = mapper(el, key as keyof typeof value, value);

		if (newKey === "__proto__" || newKey == CONTRACTS_KEY) {
			continue;
		}

		if (options.deep && isObject(newValue)) {
			newValue = Array.isArray(newValue)
				? mapArray(newValue)
				: walker(newValue as never, mapper, options, isSeen);
		}

		target[newKey] = newValue;

		contracts[newKey as never] = key;
	}

	Object.defineProperty(target, CONTRACTS_KEY, {
		value: contracts,
		enumerable: false,
		writable: true,
	});

	return target;
}

export { isObject } from "./values";
