import { CONTRACTS_KEY, walker, type WalkerOptions } from "./utils/walker";
import cache from "./cache";
import camelcase from "../node_modules/camelcase/index";

interface MapperOptions extends WalkerOptions {
	pascalCase?: boolean;
	preserveConsecutiveUppercase?: boolean;
}

export function camelize<T>(value: T, options?: MapperOptions) {
	return walker(
		value as never,
		(val, key) => {
			const newKey = camelcase(key as string, {
				pascalCase: options?.pascalCase,
				locale: false,
				preserveConsecutiveUppercase:
					options?.preserveConsecutiveUppercase,
			});

			cache.set(newKey, key);

			return [val, newKey as never];
		},
		options
	);
}

export function decamelize<T>(value: T, options?: MapperOptions) {
	return walker(
		value as never,
		(val, key) => {
			const newKey =
				val[CONTRACTS_KEY]?.[key] ?? cache.has(key)
					? cache.get(key)
					: key;

			return [val, newKey];
		},
		options
	);
}

export { default as cache } from "./cache";

export * from "./utils/walker";
