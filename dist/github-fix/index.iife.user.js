// ==UserScript==
// @name         Github Fix
// @namespace    https://timsmart.co/
// @version      2025-10-28
// @description  Remove AI from github homepage
// @author       Tim Smart <hello@timsmart.co>
// @match        https://github.com
// @grant        GM_addStyle
// ==/UserScript==

(function() {


//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/interfaces/Pipeable.js
/**
	* @since 2.0.0
	*/
	/**
	* @since 2.0.0
	* @category utilities
	* @example
	* ```ts
	* import { Pipeable } from "effect/interfaces"
	*
	* // pipeArguments is used internally to implement efficient piping
	* function customPipe<A>(self: A, ...fns: Array<(a: any) => any>): unknown {
	*   return Pipeable.pipeArguments(self, arguments as any)
	* }
	*
	* // Example usage
	* const add = (x: number) => (y: number) => x + y
	* const multiply = (x: number) => (y: number) => x * y
	*
	* const result = customPipe(5, add(2), multiply(3))
	* console.log(result) // 21
	* ```
	*/
	const pipeArguments = (self, args$1) => {
		switch (args$1.length) {
			case 0: return self;
			case 1: return args$1[0](self);
			case 2: return args$1[1](args$1[0](self));
			case 3: return args$1[2](args$1[1](args$1[0](self)));
			case 4: return args$1[3](args$1[2](args$1[1](args$1[0](self))));
			case 5: return args$1[4](args$1[3](args$1[2](args$1[1](args$1[0](self)))));
			case 6: return args$1[5](args$1[4](args$1[3](args$1[2](args$1[1](args$1[0](self))))));
			case 7: return args$1[6](args$1[5](args$1[4](args$1[3](args$1[2](args$1[1](args$1[0](self)))))));
			case 8: return args$1[7](args$1[6](args$1[5](args$1[4](args$1[3](args$1[2](args$1[1](args$1[0](self))))))));
			case 9: return args$1[8](args$1[7](args$1[6](args$1[5](args$1[4](args$1[3](args$1[2](args$1[1](args$1[0](self)))))))));
			default: {
				let ret = self;
				for (let i = 0, len = args$1.length; i < len; i++) ret = args$1[i](ret);
				return ret;
			}
		}
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Function.js
/**
	* Tests if a value is a `function`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import * as Predicate from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(Predicate.isFunction(Predicate.isFunction), true)
	* assert.deepStrictEqual(Predicate.isFunction("function"), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isFunction = (input) => typeof input === "function";
	/**
	* Creates a function that can be used in a data-last (aka `pipe`able) or
	* data-first style.
	*
	* The first parameter to `dual` is either the arity of the uncurried function
	* or a predicate that determines if the function is being used in a data-first
	* or data-last style.
	*
	* Using the arity is the most common use case, but there are some cases where
	* you may want to use a predicate. For example, if you have a function that
	* takes an optional argument, you can use a predicate to determine if the
	* function is being used in a data-first or data-last style.
	*
	* You can pass either the arity of the uncurried function or a predicate
	* which determines if the function is being used in a data-first or
	* data-last style.
	*
	* @example
	* ```ts
	* import { dual, pipe } from "effect/Function"
	*
	* // Using arity to determine data-first or data-last style
	* const sum = dual<
	*   (that: number) => (self: number) => number,
	*   (self: number, that: number) => number
	* >(2, (self, that) => self + that)
	*
	* console.log(sum(2, 3)) // 5 (data-first)
	* console.log(pipe(2, sum(3))) // 5 (data-last)
	* ```
	*
	* **Example** (Using arity to determine data-first or data-last style)
	*
	* ```ts
	* import { dual, pipe } from "effect/Function"
	*
	* const sum = dual<
	*   (that: number) => (self: number) => number,
	*   (self: number, that: number) => number
	* >(2, (self, that) => self + that)
	*
	* console.log(sum(2, 3)) // 5
	* console.log(pipe(2, sum(3))) // 5
	* ```
	*
	* **Example** (Using call signatures to define the overloads)
	*
	* ```ts
	* import { dual, pipe } from "effect/Function"
	*
	* const sum: {
	*   (that: number): (self: number) => number
	*   (self: number, that: number): number
	* } = dual(2, (self: number, that: number): number => self + that)
	*
	* console.log(sum(2, 3)) // 5
	* console.log(pipe(2, sum(3))) // 5
	* ```
	*
	* **Example** (Using a predicate to determine data-first or data-last style)
	*
	* ```ts
	* import { dual, pipe } from "effect/Function"
	*
	* const sum = dual<
	*   (that: number) => (self: number) => number,
	*   (self: number, that: number) => number
	* >(
	*   (args) => args.length === 2,
	*   (self, that) => self + that
	* )
	*
	* console.log(sum(2, 3)) // 5
	* console.log(pipe(2, sum(3))) // 5
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	const dual = function(arity, body) {
		if (typeof arity === "function") return function() {
			return arity(arguments) ? body.apply(this, arguments) : (self) => body(self, ...arguments);
		};
		switch (arity) {
			case 0:
			case 1: throw new RangeError(`Invalid arity ${arity}`);
			case 2: return function(a, b) {
				if (arguments.length >= 2) return body(a, b);
				return function(self) {
					return body(self, a);
				};
			};
			case 3: return function(a, b, c) {
				if (arguments.length >= 3) return body(a, b, c);
				return function(self) {
					return body(self, a, b);
				};
			};
			default: return function() {
				if (arguments.length >= arity) return body.apply(this, arguments);
				const args$1 = arguments;
				return function(self) {
					return body(self, ...args$1);
				};
			};
		}
	};
	/**
	* The identity function, i.e. A function that returns its input argument.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { identity } from "effect/Function"
	*
	* assert.deepStrictEqual(identity(5), 5)
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	const identity = (a) => a;
	/**
	* Creates a constant value that never changes.
	*
	* This is useful when you want to pass a value to a higher-order function (a function that takes another function as its argument)
	* and want that inner function to always use the same value, no matter how many times it is called.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { constant } from "effect/Function"
	*
	* const constNull = constant(null)
	*
	* assert.deepStrictEqual(constNull(), null)
	* assert.deepStrictEqual(constNull(), null)
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const constant = (value) => () => value;
	/**
	* A thunk that returns always `true`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { constTrue } from "effect/Function"
	*
	* assert.deepStrictEqual(constTrue(), true)
	* ```
	*
	* @category constants
	* @since 2.0.0
	*/
	const constTrue = /* @__PURE__ */ constant(true);
	/**
	* A thunk that returns always `false`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { constFalse } from "effect/Function"
	*
	* assert.deepStrictEqual(constFalse(), false)
	* ```
	*
	* @category constants
	* @since 2.0.0
	*/
	const constFalse = /* @__PURE__ */ constant(false);
	/**
	* A thunk that returns always `undefined`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { constUndefined } from "effect/Function"
	*
	* assert.deepStrictEqual(constUndefined(), undefined)
	* ```
	*
	* @category constants
	* @since 2.0.0
	*/
	const constUndefined = /* @__PURE__ */ constant(void 0);
	/**
	* A thunk that returns always `void`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { constVoid } from "effect/Function"
	*
	* assert.deepStrictEqual(constVoid(), undefined)
	* ```
	*
	* @category constants
	* @since 2.0.0
	*/
	const constVoid = constUndefined;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/data/Predicate.js
/**
	* Tests if a value is a `string`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isString } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isString("a"), true)
	*
	* assert.deepStrictEqual(isString(1), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isString = (input) => typeof input === "string";
	/**
	* Tests if a value is a `number`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isNumber } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isNumber(2), true)
	*
	* assert.deepStrictEqual(isNumber("2"), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isNumber = (input) => typeof input === "number";
	/**
	* Tests if a value is a `boolean`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isBoolean } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isBoolean(true), true)
	*
	* assert.deepStrictEqual(isBoolean("true"), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isBoolean = (input) => typeof input === "boolean";
	/**
	* Tests if a value is a `bigint`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isBigInt } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isBigInt(1n), true)
	*
	* assert.deepStrictEqual(isBigInt(1), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isBigInt = (input) => typeof input === "bigint";
	/**
	* Tests if a value is a `symbol`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isSymbol } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isSymbol(Symbol.for("a")), true)
	*
	* assert.deepStrictEqual(isSymbol("a"), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isSymbol = (input) => typeof input === "symbol";
	/**
	* Tests if a value is a `function`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isFunction } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isFunction(isFunction), true)
	*
	* assert.deepStrictEqual(isFunction("function"), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isFunction$1 = isFunction;
	/**
	* Tests if a value is an object.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isObject } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isObject({}), true)
	* assert.deepStrictEqual(isObject({ a: 1 }), true)
	*
	* assert.deepStrictEqual(isObject([]), false)
	* assert.deepStrictEqual(isObject([1, 2, 3]), false)
	* assert.deepStrictEqual(isObject(null), false)
	* assert.deepStrictEqual(isObject(undefined), false)
	* assert.deepStrictEqual(isObject(() => null), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isObject = (input) => typeof input === "object" && input !== null && !Array.isArray(input);
	/**
	* Tests if a value is an `object` (i.e. objects, arrays, functions).
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isObjectKeyword } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isObjectKeyword({}), true)
	* assert.deepStrictEqual(isObjectKeyword([]), true)
	* assert.deepStrictEqual(isObjectKeyword(() => 1), true)
	*
	* assert.deepStrictEqual(isObjectKeyword(null), false)
	* assert.deepStrictEqual(isObjectKeyword(undefined), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isObjectKeyword = (input) => typeof input === "object" && input !== null || isFunction$1(input);
	/**
	* Checks whether a value is an `object` containing a specified property key.
	* This is useful for safely accessing object properties and creating type guards.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Predicate } from "effect/data"
	*
	* const hasName = Predicate.hasProperty("name")
	* const hasAge = Predicate.hasProperty("age")
	*
	* assert.deepStrictEqual(hasName({ name: "Alice" }), true)
	* assert.deepStrictEqual(hasName({ age: 30 }), false)
	* assert.deepStrictEqual(hasName(null), false)
	*
	* // Curried usage
	* assert.deepStrictEqual(Predicate.hasProperty({ name: "Bob", age: 25 }, "name"), true)
	* assert.deepStrictEqual(Predicate.hasProperty({ name: "Bob", age: 25 }, "email"), false)
	*
	* // Type guard usage
	* const data: unknown = { name: "Charlie", age: 35 }
	* if (hasName(data) && hasAge(data)) {
	*   // TypeScript knows data has name and age properties
	*   console.log(`${data.name} is ${data.age} years old`)
	* }
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const hasProperty = /* @__PURE__ */ dual(2, (self, property) => isObjectKeyword(self) && property in self);
	/**
	* Tests if a value is an `object` with a property `_tag` that matches the given tag.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isTagged } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isTagged(1, "a"), false)
	* assert.deepStrictEqual(isTagged(null, "a"), false)
	* assert.deepStrictEqual(isTagged({}, "a"), false)
	* assert.deepStrictEqual(isTagged({ a: "a" }, "a"), false)
	* assert.deepStrictEqual(isTagged({ _tag: "a" }, "a"), true)
	* assert.deepStrictEqual(isTagged("a")({ _tag: "a" }), true)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isTagged = /* @__PURE__ */ dual(2, (self, tag) => hasProperty(self, "_tag") && self["_tag"] === tag);
	/**
	* A guard that succeeds when the input is a `Date`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isDate } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isDate(new Date()), true)
	*
	* assert.deepStrictEqual(isDate(null), false)
	* assert.deepStrictEqual(isDate({}), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isDate = (input) => input instanceof Date;
	/**
	* A guard that succeeds when the input is an `Iterable`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { isIterable } from "effect/data/Predicate"
	*
	* assert.deepStrictEqual(isIterable([]), true)
	* assert.deepStrictEqual(isIterable(new Set()), true)
	*
	* assert.deepStrictEqual(isIterable(null), false)
	* assert.deepStrictEqual(isIterable({}), false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	function isIterable(input) {
		return hasProperty(input, Symbol.iterator) || isString(input);
	}

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/equal.js
/** @internal */
	const getAllObjectKeys = (obj) => {
		const keys$1 = new Set(Reflect.ownKeys(obj));
		if (obj.constructor === Object) return keys$1;
		if (obj instanceof Error) keys$1.delete("stack");
		const proto = Object.getPrototypeOf(obj);
		let current = proto;
		while (current !== null && current !== Object.prototype) {
			const ownKeys = Reflect.ownKeys(current);
			for (let i = 0; i < ownKeys.length; i++) keys$1.add(ownKeys[i]);
			current = Object.getPrototypeOf(current);
		}
		if (keys$1.has("constructor") && typeof obj.constructor === "function" && proto === obj.constructor.prototype) keys$1.delete("constructor");
		return keys$1;
	};
	/** @internal */
	const byReferenceInstances = /* @__PURE__ */ new WeakSet();

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/interfaces/Hash.js
/**
	* The unique identifier used to identify objects that implement the Hash interface.
	*
	* @since 2.0.0
	*/
	const symbol$2 = "~effect/interfaces/Hash";
	/**
	* Computes a hash value for any given value.
	*
	* This function can hash primitives (numbers, strings, booleans, etc.) as well as
	* objects, arrays, and other complex data structures. It automatically handles
	* different types and provides a consistent hash value for equivalent inputs.
	*
	* **⚠️ CRITICAL IMMUTABILITY REQUIREMENT**: Objects being hashed must be treated as
	* immutable after their first hash computation. Hash results are cached, so mutating
	* an object after hashing will lead to stale cached values and broken hash-based
	* operations. For mutable objects, use referential equality by implementing custom
	* `Hash` interface that hashes the object reference, not its content.
	*
	* **FORBIDDEN**: Modifying objects after `Hash.hash()` has been called on them
	* **ALLOWED**: Using immutable objects, or mutable objects with custom `Hash` interface
	* that uses referential equality (hashes the object reference, not content)
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* // Hash primitive values
	* console.log(Hash.hash(42)) // numeric hash
	* console.log(Hash.hash("hello")) // string hash
	* console.log(Hash.hash(true)) // boolean hash
	*
	* // Hash objects and arrays
	* console.log(Hash.hash({ name: "John", age: 30 }))
	* console.log(Hash.hash([1, 2, 3]))
	* console.log(Hash.hash(new Date("2023-01-01")))
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const hash = (self) => {
		switch (typeof self) {
			case "number": return number$2(self);
			case "bigint": return string$1(self.toString(10));
			case "boolean": return string$1(String(self));
			case "symbol": return string$1(String(self));
			case "string": return string$1(self);
			case "undefined": return string$1("undefined");
			case "function":
			case "object": if (self === null) return string$1("null");
			else if (self instanceof Date) return string$1(self.toISOString());
			else if (self instanceof RegExp) return string$1(self.toString());
			else {
				if (byReferenceInstances.has(self)) return random(self);
				if (hashCache.has(self)) return hashCache.get(self);
				const h = withVisitedTracking$1(self, () => {
					if (isHash(self)) return self[symbol$2]();
					else if (typeof self === "function") return random(self);
					else if (Array.isArray(self)) return array$2(self);
					else if (self instanceof Map) return hashMap(self);
					else if (self instanceof Set) return hashSet(self);
					return structure(self);
				});
				hashCache.set(self, h);
				return h;
			}
			default: throw new Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
		}
	};
	/**
	* Generates a random hash value for an object and caches it.
	*
	* This function creates a random hash value for objects that don't have their own
	* hash implementation. The hash value is cached using a WeakMap, so the same object
	* will always return the same hash value during its lifetime.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* const obj1 = { a: 1 }
	* const obj2 = { a: 1 }
	*
	* // Same object always returns the same hash
	* console.log(Hash.random(obj1) === Hash.random(obj1)) // true
	*
	* // Different objects get different hashes
	* console.log(Hash.random(obj1) === Hash.random(obj2)) // false
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const random = (self) => {
		if (!randomHashCache.has(self)) randomHashCache.set(self, number$2(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
		return randomHashCache.get(self);
	};
	/**
	* Combines two hash values into a single hash value.
	*
	* This function takes two hash values and combines them using a mathematical
	* operation to produce a new hash value. It's useful for creating hash values
	* of composite structures.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* const hash1 = Hash.hash("hello")
	* const hash2 = Hash.hash("world")
	*
	* // Combine two hash values
	* const combined = Hash.combine(hash2)(hash1)
	* console.log(combined) // combined hash value
	*
	* // Can also be used with pipe
	* import { pipe } from "effect"
	* const result = pipe(hash1, Hash.combine(hash2))
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const combine = /* @__PURE__ */ dual(2, (self, b) => self * 53 ^ b);
	/**
	* Optimizes a hash value by applying bit manipulation techniques.
	*
	* This function takes a hash value and applies bitwise operations to improve
	* the distribution of hash values, reducing the likelihood of collisions.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* const rawHash = 1234567890
	* const optimizedHash = Hash.optimize(rawHash)
	* console.log(optimizedHash) // optimized hash value
	*
	* // Often used internally by other hash functions
	* const stringHash = Hash.optimize(Hash.string("hello"))
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
	/**
	* Checks if a value implements the Hash interface.
	*
	* This function determines whether a given value has the Hash symbol property,
	* indicating that it can provide its own hash value implementation.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* class MyHashable implements Hash.Hash {
	*   [Hash.symbol]() {
	*     return 42
	*   }
	* }
	*
	* const obj = new MyHashable()
	* console.log(Hash.isHash(obj)) // true
	* console.log(Hash.isHash({})) // false
	* console.log(Hash.isHash("string")) // false
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isHash = (u) => hasProperty(u, symbol$2);
	/**
	* Computes a hash value for a number.
	*
	* This function creates a hash value for numeric inputs, handling special cases
	* like NaN, Infinity, and -Infinity with distinct hash values. It uses bitwise operations to ensure good distribution
	* of hash values across different numeric inputs.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* console.log(Hash.number(42)) // hash of 42
	* console.log(Hash.number(3.14)) // hash of 3.14
	* console.log(Hash.number(NaN)) // hash of "NaN"
	* console.log(Hash.number(Infinity)) // 0 (special case)
	*
	* // Same numbers produce the same hash
	* console.log(Hash.number(100) === Hash.number(100)) // true
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const number$2 = (n) => {
		if (n !== n) return string$1("NaN");
		if (n === Infinity) return string$1("Infinity");
		if (n === -Infinity) return string$1("-Infinity");
		let h = n | 0;
		if (h !== n) h ^= n * 4294967295;
		while (n > 4294967295) h ^= n /= 4294967295;
		return optimize(h);
	};
	/**
	* Computes a hash value for a string using the djb2 algorithm.
	*
	* This function implements a variation of the djb2 hash algorithm, which is
	* known for its good distribution properties and speed. It processes each
	* character of the string to produce a consistent hash value.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* console.log(Hash.string("hello")) // hash of "hello"
	* console.log(Hash.string("world")) // hash of "world"
	* console.log(Hash.string("")) // hash of empty string
	*
	* // Same strings produce the same hash
	* console.log(Hash.string("test") === Hash.string("test")) // true
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const string$1 = (str) => {
		let h = 5381, i = str.length;
		while (i) h = h * 33 ^ str.charCodeAt(--i);
		return optimize(h);
	};
	/**
	* Computes a hash value for an object using only the specified keys.
	*
	* This function allows you to hash an object by considering only specific keys,
	* which is useful when you want to create a hash based on a subset of an object's
	* properties.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* const person = { name: "John", age: 30, city: "New York" }
	*
	* // Hash only specific keys
	* const hash1 = Hash.structureKeys(person, ["name", "age"])
	* const hash2 = Hash.structureKeys(person, ["name", "city"])
	*
	* console.log(hash1) // hash based on name and age
	* console.log(hash2) // hash based on name and city
	*
	* // Same keys produce the same hash
	* const person2 = { name: "John", age: 30, city: "Boston" }
	* const hash3 = Hash.structureKeys(person2, ["name", "age"])
	* console.log(hash1 === hash3) // true
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const structureKeys = (o, keys$1) => {
		let h = 12289;
		for (const key of keys$1) h ^= combine(hash(key), hash(o[key]));
		return optimize(h);
	};
	/**
	* Computes a hash value for an object using all of its enumerable keys.
	*
	* This function creates a hash value based on all enumerable properties of an object.
	* It's a convenient way to hash an entire object structure when you want to consider
	* all its properties.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* const obj1 = { name: "John", age: 30 }
	* const obj2 = { name: "Jane", age: 25 }
	* const obj3 = { name: "John", age: 30 }
	*
	* console.log(Hash.structure(obj1)) // hash of obj1
	* console.log(Hash.structure(obj2)) // different hash
	* console.log(Hash.structure(obj3)) // same as obj1
	*
	* // Objects with same properties produce same hash
	* console.log(Hash.structure(obj1) === Hash.structure(obj3)) // true
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const structure = (o) => structureKeys(o, getAllObjectKeys(o));
	const iterableWith = (seed, f) => (iter) => {
		let h = seed;
		for (const element of iter) h ^= f(element);
		return optimize(h);
	};
	/**
	* Computes a hash value for an array by hashing all of its elements.
	*
	* This function creates a hash value based on all elements in the array.
	* The order of elements matters, so arrays with the same elements in different
	* orders will produce different hash values.
	*
	* @example
	* ```ts
	* import { Hash } from "effect/interfaces"
	*
	* const arr1 = [1, 2, 3]
	* const arr2 = [1, 2, 3]
	* const arr3 = [3, 2, 1]
	*
	* console.log(Hash.array(arr1)) // hash of [1, 2, 3]
	* console.log(Hash.array(arr2)) // same hash as arr1
	* console.log(Hash.array(arr3)) // different hash (different order)
	*
	* // Arrays with same elements in same order produce same hash
	* console.log(Hash.array(arr1) === Hash.array(arr2)) // true
	* console.log(Hash.array(arr1) === Hash.array(arr3)) // false
	* ```
	*
	* @category hashing
	* @since 2.0.0
	*/
	const array$2 = /* @__PURE__ */ iterableWith(6151, hash);
	const hashMap = /* @__PURE__ */ iterableWith(/* @__PURE__ */ string$1("Map"), ([k, v]) => combine(hash(k), hash(v)));
	const hashSet = /* @__PURE__ */ iterableWith(/* @__PURE__ */ string$1("Set"), hash);
	const randomHashCache = /* @__PURE__ */ new WeakMap();
	const hashCache = /* @__PURE__ */ new WeakMap();
	const visitedObjects = /* @__PURE__ */ new WeakSet();
	function withVisitedTracking$1(obj, fn$2) {
		if (visitedObjects.has(obj)) return string$1("[Circular]");
		visitedObjects.add(obj);
		const result$2 = fn$2();
		visitedObjects.delete(obj);
		return result$2;
	}

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/interfaces/Equal.js
/**
	* The unique identifier used to identify objects that implement the `Equal` interface.
	*
	* @since 2.0.0
	*/
	const symbol$1 = "~effect/interfaces/Equal";
	function equals$1() {
		if (arguments.length === 1) return (self) => compareBoth(self, arguments[0]);
		return compareBoth(arguments[0], arguments[1]);
	}
	function compareBoth(self, that) {
		if (self === that) return true;
		if (self == null || that == null) return false;
		const selfType = typeof self;
		if (selfType !== typeof that) return false;
		if (selfType === "number" && self !== self && that !== that) return true;
		if (selfType !== "object" && selfType !== "function") return false;
		if (byReferenceInstances.has(self) || byReferenceInstances.has(that)) return false;
		return withCache(self, that, compareObjects);
	}
	/** Helper to run comparison with proper visited tracking */
	function withVisitedTracking(self, that, fn$2) {
		const hasLeft = visitedLeft.has(self);
		const hasRight = visitedRight.has(that);
		if (hasLeft && hasRight) return true;
		if (hasLeft || hasRight) return false;
		visitedLeft.add(self);
		visitedRight.add(that);
		const result$2 = fn$2();
		visitedLeft.delete(self);
		visitedRight.delete(that);
		return result$2;
	}
	const visitedLeft = /* @__PURE__ */ new WeakSet();
	const visitedRight = /* @__PURE__ */ new WeakSet();
	/** Helper to perform cached object comparison */
	function compareObjects(self, that) {
		if (hash(self) !== hash(that)) return false;
		else if (self instanceof Date) {
			if (!(that instanceof Date)) return false;
			return self.toISOString() === that.toISOString();
		} else if (self instanceof RegExp) {
			if (!(that instanceof RegExp)) return false;
			return self.toString() === that.toString();
		}
		const selfIsEqual = isEqual(self);
		const thatIsEqual = isEqual(that);
		if (selfIsEqual !== thatIsEqual) return false;
		const bothEquals = selfIsEqual && thatIsEqual;
		if (typeof self === "function" && !bothEquals) return false;
		return withVisitedTracking(self, that, () => {
			if (bothEquals) return self[symbol$1](that);
			else if (Array.isArray(self)) {
				if (!Array.isArray(that) || self.length !== that.length) return false;
				return compareArrays(self, that);
			} else if (self instanceof Map) {
				if (!(that instanceof Map) || self.size !== that.size) return false;
				return compareMaps(self, that);
			} else if (self instanceof Set) {
				if (!(that instanceof Set) || self.size !== that.size) return false;
				return compareSets(self, that);
			}
			return compareRecords(self, that);
		});
	}
	function withCache(self, that, f) {
		let selfMap = equalityCache.get(self);
		if (!selfMap) {
			selfMap = /* @__PURE__ */ new WeakMap();
			equalityCache.set(self, selfMap);
		} else if (selfMap.has(that)) return selfMap.get(that);
		const result$2 = f(self, that);
		selfMap.set(that, result$2);
		let thatMap = equalityCache.get(that);
		if (!thatMap) {
			thatMap = /* @__PURE__ */ new WeakMap();
			equalityCache.set(that, thatMap);
		}
		thatMap.set(self, result$2);
		return result$2;
	}
	const equalityCache = /* @__PURE__ */ new WeakMap();
	function compareArrays(self, that) {
		for (let i = 0; i < self.length; i++) if (!compareBoth(self[i], that[i])) return false;
		return true;
	}
	function compareRecords(self, that) {
		const selfKeys = getAllObjectKeys(self);
		const thatKeys = getAllObjectKeys(that);
		if (selfKeys.size !== thatKeys.size) return false;
		for (const key of selfKeys) if (!thatKeys.has(key) || !compareBoth(self[key], that[key])) return false;
		return true;
	}
	/** @internal */
	function makeCompareMap(keyEquivalence, valueEquivalence) {
		return function compareMaps$1(self, that) {
			for (const [selfKey, selfValue] of self) {
				let found = false;
				for (const [thatKey, thatValue] of that) if (keyEquivalence(selfKey, thatKey) && valueEquivalence(selfValue, thatValue)) {
					found = true;
					break;
				}
				if (!found) return false;
			}
			return true;
		};
	}
	const compareMaps = /* @__PURE__ */ makeCompareMap(compareBoth, compareBoth);
	/** @internal */
	function makeCompareSet(equivalence$1) {
		return function compareSets$1(self, that) {
			for (const selfValue of self) {
				let found = false;
				for (const thatValue of that) if (equivalence$1(selfValue, thatValue)) {
					found = true;
					break;
				}
				if (!found) return false;
			}
			return true;
		};
	}
	const compareSets = /* @__PURE__ */ makeCompareSet(compareBoth);
	/**
	* Determines if a value implements the `Equal` interface.
	*
	* @example
	* ```ts
	* import { Equal, Hash } from "effect/interfaces"
	* import * as assert from "node:assert"
	*
	* class MyClass implements Equal.Equal {
	*   [Equal.symbol](that: Equal.Equal): boolean {
	*     return that instanceof MyClass
	*   }
	*   [Hash.symbol](): number {
	*     return 0
	*   }
	* }
	*
	* const instance = new MyClass()
	* assert(Equal.isEqual(instance) === true)
	* assert(Equal.isEqual({}) === false)
	* assert(Equal.isEqual(42) === false)
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isEqual = (u) => hasProperty(u, symbol$1);
	/**
	* Creates an `Equivalence` instance using the `equals` function.
	* This allows the equality logic to be used with APIs that expect an `Equivalence`.
	*
	* @example
	* ```ts
	* import { Equal } from "effect/interfaces"
	* import { Array } from "effect/collections"
	*
	* const eq = Equal.equivalence<number>()
	* const result = Array.dedupeWith([1, 2, 2, 3, 1], eq)
	* console.log(result) // [1, 2, 3]
	* ```
	*
	* @category instances
	* @since 2.0.0
	*/
	const equivalence = () => equals$1;
	/**
	* Marks an object to use reference equality instead of structural equality, without creating a proxy.
	*
	* Unlike `byReference`, this function directly modifies the object's equality behavior
	* without creating a proxy wrapper. This is more performant but "unsafe" because
	* it permanently changes how the object is compared.
	*
	* @example
	* ```ts
	* import { Equal } from "effect/interfaces"
	* import * as assert from "node:assert"
	*
	* const obj1 = { a: 1, b: 2 }
	* const obj2 = { a: 1, b: 2 }
	*
	* // Mark obj1 for reference equality (modifies obj1 directly)
	* const obj1ByRef = Equal.byReferenceUnsafe(obj1)
	* assert(obj1ByRef === obj1) // Same object, no proxy created
	* assert(Equal.equals(obj1ByRef, obj2) === false) // uses reference equality
	* assert(Equal.equals(obj1ByRef, obj1ByRef) === true) // same reference
	*
	* // The original obj1 is now permanently marked for reference equality
	* assert(Equal.equals(obj1, obj2) === false) // obj1 uses reference equality
	* ```
	*
	* @category utility
	* @since 2.0.0
	*/
	const byReferenceUnsafe = (obj) => {
		byReferenceInstances.add(obj);
		return obj;
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/interfaces/Inspectable.js
/**
	* Symbol used by Node.js for custom object inspection.
	*
	* This symbol is recognized by Node.js's `util.inspect()` function and the REPL
	* for custom object representation. When an object has a method with this symbol,
	* it will be called to determine how the object should be displayed.
	*
	* @example
	* ```ts
	* import { Inspectable } from "effect/interfaces"
	*
	* class CustomObject {
	*   constructor(private value: string) {}
	*
	*   [Inspectable.NodeInspectSymbol]() {
	*     return `CustomObject(${this.value})`
	*   }
	* }
	*
	* const obj = new CustomObject("hello")
	* console.log(obj) // Displays: CustomObject(hello)
	* ```
	*
	* @since 2.0.0
	* @category symbols
	*/
	const NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
	/**
	* Safely converts a value to a JSON-serializable representation.
	*
	* This function attempts to extract JSON data from objects that implement the
	* `toJSON` method, recursively processes arrays, and handles errors gracefully.
	* For objects that don't have a `toJSON` method, it applies redaction to
	* protect sensitive information.
	*
	* @example
	* ```ts
	* import { Inspectable } from "effect/interfaces"
	*
	* class Person {
	*   constructor(
	*     public name: string,
	*     public age: number
	*   ) {}
	*
	*   toJSON() {
	*     return { name: this.name, age: this.age }
	*   }
	* }
	*
	* const person = new Person("Alice", 30)
	* const data = Inspectable.toJson(person)
	* console.log(data) // { name: "Alice", age: 30 }
	*
	* // Works with arrays
	* const people = [person, new Person("Bob", 25)]
	* const array = Inspectable.toJson(people)
	* console.log(array) // [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }]
	* ```
	*
	* @since 2.0.0
	* @category conversions
	*/
	const toJson = (input) => {
		try {
			if (hasProperty(input, "toJSON") && isFunction$1(input["toJSON"]) && input["toJSON"].length === 0) return input.toJSON();
			else if (Array.isArray(input)) return input.map(toJson);
		} catch {
			return "[toJSON threw]";
		}
		return redact(input);
	};
	/**
	* Formats a value as a pretty-printed JSON string.
	*
	* This function takes any value and converts it to a nicely formatted JSON string
	* with 2-space indentation. It's commonly used for debugging and logging purposes.
	*
	* @example
	* ```ts
	* import { Inspectable } from "effect/interfaces"
	*
	* const data = {
	*   name: "Alice",
	*   details: {
	*     age: 30,
	*     hobbies: ["reading", "coding"]
	*   }
	* }
	*
	* console.log(Inspectable.format(data))
	* // {
	* //   "name": "Alice",
	* //   "details": {
	* //     "age": 30,
	* //     "hobbies": [
	* //       "reading",
	* //       "coding"
	* //     ]
	* //   }
	* // }
	* ```
	*
	* @since 2.0.0
	* @category formatting
	*/
	const CIRCULAR = "[Circular]";
	/** @internal */
	function formatPropertyKey(name) {
		return isString(name) ? JSON.stringify(name) : String(name);
	}
	/** @internal */
	function formatDate(date$1) {
		try {
			return date$1.toISOString();
		} catch {
			return "Invalid Date";
		}
	}
	function safeToString(input) {
		try {
			const s = input.toString();
			return typeof s === "string" ? s : String(s);
		} catch {
			return "[toString threw]";
		}
	}
	/**
	* Converts any JavaScript value into a human-readable string.
	*
	* Unlike `JSON.stringify`, this formatter:
	* - Handles circular references (printed as `"[Circular]"`).
	* - Supports additional types like `BigInt`, `Symbol`, `Set`, `Map`, `Date`, `RegExp`, and
	*   objects with custom `toString` methods.
	* - Includes constructor names for class instances (e.g. `MyClass({"a":1})`).
	* - Does not guarantee valid JSON output — the result is intended for debugging and inspection.
	*
	* Formatting rules:
	* - Primitives are stringified naturally (`null`, `undefined`, `123`, `"abc"`, `true`).
	* - Strings are JSON-quoted.
	* - Arrays and objects with a single element/property are formatted inline.
	* - Larger arrays/objects are pretty-printed with optional indentation.
	* - Circular references are replaced with the literal `"[Circular]"`.
	*
	* **Options**:
	* - `space`: Indentation used when pretty-printing:
	*   - If a number, that many spaces will be used.
	*   - If a string, the string is used as the indentation unit (e.g. `"\t"`).
	*   - If `0`, empty string, or `undefined`, output is compact (no indentation).
	*   Defaults to `0`.
	* - `ignoreToString`: If `true`, the `toString` method is not called on the value.
	*   Defaults to `false`.
	*
	* @since 4.0.0
	*/
	function format(input, options) {
		const space = options?.space ?? 0;
		const seen = /* @__PURE__ */ new WeakSet();
		const gap = !space ? "" : isNumber(space) ? " ".repeat(space) : space;
		const ind = (d) => gap.repeat(d);
		const wrap = (v, body) => {
			const ctor = v?.constructor;
			return ctor && ctor !== Object.prototype.constructor && ctor.name ? `${ctor.name}(${body})` : body;
		};
		const ownKeys = (o) => {
			try {
				return Reflect.ownKeys(o);
			} catch {
				return ["[ownKeys threw]"];
			}
		};
		function go(v, d = 0) {
			if (Array.isArray(v)) {
				if (seen.has(v)) return CIRCULAR;
				seen.add(v);
				if (!gap || v.length <= 1) return `[${v.map((x) => go(x, d)).join(",")}]`;
				const inner = v.map((x) => go(x, d + 1)).join(",\n" + ind(d + 1));
				return `[\n${ind(d + 1)}${inner}\n${ind(d)}]`;
			}
			if (isDate(v)) return formatDate(v);
			if (!options?.ignoreToString && hasProperty(v, "toString") && isFunction$1(v["toString"]) && v["toString"] !== Object.prototype.toString && v["toString"] !== Array.prototype.toString) {
				const s = safeToString(v);
				if (v instanceof Error && v.cause) return `${s} (cause: ${go(v.cause, d)})`;
				return s;
			}
			if (isString(v)) return JSON.stringify(v);
			if (isNumber(v) || v == null || isBoolean(v) || isSymbol(v)) return String(v);
			if (isBigInt(v)) return String(v) + "n";
			if (v instanceof Set || v instanceof Map) {
				if (seen.has(v)) return CIRCULAR;
				seen.add(v);
				return `${v.constructor.name}(${go(Array.from(v), d)})`;
			}
			if (isObject(v)) {
				if (seen.has(v)) return CIRCULAR;
				seen.add(v);
				const keys$1 = ownKeys(v);
				if (!gap || keys$1.length <= 1) return wrap(v, `{${keys$1.map((k) => `${formatPropertyKey(k)}:${go(v[k], d)}`).join(",")}}`);
				return wrap(v, `{\n${keys$1.map((k) => `${ind(d + 1)}${formatPropertyKey(k)}: ${go(v[k], d + 1)}`).join(",\n")}\n${ind(d)}}`);
			}
			return String(v);
		}
		return go(input, 0);
	}
	/**
	* Safely stringifies objects that may contain circular references.
	*
	* This function performs JSON.stringify with circular reference detection and handling.
	* It also applies redaction to sensitive values and provides a safe fallback for
	* any objects that can't be serialized normally.
	*
	* **Options**:
	* - `space`: Indentation used when pretty-printing:
	*   - If a number, that many spaces will be used.
	*   - If a string, the string is used as the indentation unit (e.g. `"\t"`).
	*   - If `0`, empty string, or `undefined`, output is compact (no indentation).
	*   Defaults to `0`.
	*
	* @example
	* ```ts
	* import { Inspectable } from "effect/interfaces"
	*
	* // Normal object
	* const simple = { name: "Alice", age: 30 }
	* console.log(Inspectable.formatJson(simple))
	* // {"name":"Alice","age":30}
	*
	* // Object with circular reference
	* const circular: any = { name: "test" }
	* circular.self = circular
	* console.log(Inspectable.formatJson(circular))
	* // {"name":"test"} (circular reference omitted)
	*
	* // With formatting
	* console.log(Inspectable.formatJson(simple, { space: 2 }))
	* // {
	* //   "name": "Alice",
	* //   "age": 30
	* // }
	* ```
	*
	* @since 2.0.0
	* @category conversions
	*/
	const formatJson = (obj, options) => {
		let cache = [];
		const retVal = JSON.stringify(obj, (_key, value) => typeof value === "object" && value !== null ? cache.includes(value) ? void 0 : cache.push(value) && (isRedactable(value) ? redact(value) : value) : value, options?.space);
		cache = void 0;
		return retVal;
	};
	/**
	* A base prototype object that implements the Inspectable interface.
	*
	* This object provides default implementations for the Inspectable methods.
	* It can be used as a prototype for objects that want to be inspectable,
	* or as a mixin to add inspection capabilities to existing objects.
	*
	* @example
	* ```ts
	* import { Inspectable } from "effect/interfaces"
	*
	* // Use as prototype
	* const myObject = Object.create(Inspectable.BaseProto)
	* myObject.name = "example"
	* myObject.value = 42
	*
	* console.log(myObject.toString()) // Pretty printed representation
	*
	* // Or extend in a constructor
	* function MyClass(this: any, name: string) {
	*   this.name = name
	* }
	* MyClass.prototype = Object.create(Inspectable.BaseProto)
	* MyClass.prototype.constructor = MyClass
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const BaseProto = {
		toJSON() {
			return toJson(this);
		},
		[NodeInspectSymbol]() {
			return this.toJSON();
		},
		toString() {
			return format(this.toJSON());
		}
	};
	/**
	* Abstract base class that implements the Inspectable interface.
	*
	* This class provides a convenient way to create inspectable objects by extending it.
	* Subclasses only need to implement the `toJSON()` method, and they automatically
	* get proper `toString()` and Node.js inspection support.
	*
	* @example
	* ```ts
	* import { Inspectable } from "effect/interfaces"
	*
	* class User extends Inspectable.Class {
	*   constructor(
	*     public readonly id: number,
	*     public readonly name: string,
	*     public readonly email: string
	*   ) {
	*     super()
	*   }
	*
	*   toJSON() {
	*     return {
	*       _tag: "User",
	*       id: this.id,
	*       name: this.name,
	*       email: this.email
	*     }
	*   }
	* }
	*
	* const user = new User(1, "Alice", "alice@example.com")
	* console.log(user.toString()) // Pretty printed JSON with _tag, id, name, email
	* console.log(user) // In Node.js, shows the same formatted output
	* ```
	*
	* @since 2.0.0
	* @category classes
	*/
	var Class = class {
		/**
		* Node.js custom inspection method.
		*
		* @since 2.0.0
		*/
		[NodeInspectSymbol]() {
			return this.toJSON();
		}
		/**
		* Returns a formatted string representation of this object.
		*
		* @since 2.0.0
		*/
		toString() {
			return format(this.toJSON());
		}
	};
	/**
	* Symbol used to identify objects that implement redaction capabilities.
	*
	* @since 4.0.0
	* @category symbol
	*/
	const symbolRedactable = /* @__PURE__ */ Symbol.for("~effect/Inspectable/redactable");
	/**
	* Checks if a value implements the `Redactable` interface.
	*
	* This function determines whether a given value has redaction capabilities,
	* meaning it can provide alternative representations based on context.
	*
	* @param u - The value to check
	*
	* @example
	* ```ts
	* import { Inspectable } from "effect/interfaces"
	*
	* class RedactableSecret {
	*   [Inspectable.symbolRedactable]() {
	*     return "[REDACTED]"
	*   }
	* }
	*
	* const secret = new RedactableSecret()
	* const normal = { value: 42 }
	*
	* console.log(Inspectable.isRedactable(secret)) // true
	* console.log(Inspectable.isRedactable(normal)) // false
	* console.log(Inspectable.isRedactable("string")) // false
	* ```
	*
	* @since 3.10.0
	* @category redactable
	*/
	const isRedactable = (u) => typeof u === "object" && u !== null && symbolRedactable in u;
	/** @internal */
	const currentFiberTypeId = "~effect/Fiber/currentFiber";
	/**
	* Applies redaction to a value if it implements the Redactable interface.
	*
	* This function checks if the value is redactable and applies the redaction
	* transformation if a current fiber context is available. Otherwise, it returns
	* the value unchanged.
	*
	* @param u - The value to potentially redact
	*
	* @example
	* ```ts
	* import { Inspectable } from "effect/interfaces"
	*
	* class CreditCard {
	*   constructor(private number: string) {}
	*
	*   [Inspectable.symbolRedactable]() {
	*     return {
	*       number: this.number.slice(0, 4) + "****"
	*     }
	*   }
	* }
	*
	* const card = new CreditCard("1234567890123456")
	* console.log(Inspectable.redact(card)) // { number: "1234****" }
	*
	* // Non-redactable values are returned unchanged
	* console.log(Inspectable.redact("normal string")) // "normal string"
	* console.log(Inspectable.redact({ id: 123 })) // { id: 123 }
	* ```
	*
	* @since 3.10.0
	* @category redactable
	*/
	const redact = (u) => {
		if (isRedactable(u)) return u[symbolRedactable](globalThis[currentFiberTypeId]?.services ?? emptyServiceMap$1);
		return u;
	};
	const emptyServiceMap$1 = {
		"~effect/ServiceMap": {},
		mapUnsafe: /* @__PURE__ */ new Map(),
		pipe() {
			return pipeArguments(this, arguments);
		}
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Utils.js
/**
	* @since 2.0.0
	*/
	const GenKindTypeId = "~effect/Utils/GenKind";
	var GenKindImpl = class {
		value;
		constructor(value) {
			this.value = value;
		}
		get _F() {
			return identity;
		}
		get _R() {
			return (_) => _;
		}
		get _O() {
			return (_) => _;
		}
		get _E() {
			return (_) => _;
		}
		[GenKindTypeId] = GenKindTypeId;
		[Symbol.iterator]() {
			return new SingleShotGen(this);
		}
	};
	/**
	* @category constructors
	* @since 2.0.0
	*/
	var SingleShotGen = class SingleShotGen {
		called = false;
		self;
		constructor(self) {
			this.self = self;
		}
		/**
		* @since 2.0.0
		*/
		next(a) {
			return this.called ? {
				value: a,
				done: true
			} : (this.called = true, {
				value: this.self,
				done: false
			});
		}
		/**
		* @since 2.0.0
		*/
		[Symbol.iterator]() {
			return new SingleShotGen(this.self);
		}
	};
	const InternalTypeId = "~effect/Effect/internal";
	const standard = { [InternalTypeId]: (body) => {
		return body();
	} };
	const forced = { [InternalTypeId]: (body) => {
		try {
			return body();
		} finally {}
	} };
	const isNotOptimizedAway = /* @__PURE__ */ standard[InternalTypeId](() => (/* @__PURE__ */ new Error()).stack)?.includes(InternalTypeId) === true;
	/**
	* @since 3.2.2
	* @status experimental
	* @category tracing
	*/
	const internalCall = isNotOptimizedAway ? standard[InternalTypeId] : forced[InternalTypeId];
	const genConstructor = function* () {}.constructor;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/version.js
	const version = "dev";

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/core.js
/** @internal */
	const EffectTypeId = `~effect/Effect/${version}`;
	/** @internal */
	const ExitTypeId = `~effect/Exit/${version}`;
	const effectVariance = {
		_A: identity,
		_E: identity,
		_R: identity
	};
	/** @internal */
	const identifier = `${EffectTypeId}/identifier`;
	/** @internal */
	const args = `${EffectTypeId}/args`;
	/** @internal */
	const evaluate = `${EffectTypeId}/evaluate`;
	/** @internal */
	const contA = `${EffectTypeId}/successCont`;
	/** @internal */
	const contE = `${EffectTypeId}/failureCont`;
	/** @internal */
	const contAll = `${EffectTypeId}/ensureCont`;
	/** @internal */
	const Yield = /* @__PURE__ */ Symbol.for("effect/Effect/Yield");
	/** @internal */
	const PipeInspectableProto = {
		pipe() {
			return pipeArguments(this, arguments);
		},
		toJSON() {
			return { ...this };
		},
		toString() {
			return format(this, { ignoreToString: true });
		},
		[NodeInspectSymbol]() {
			return this.toJSON();
		}
	};
	/** @internal */
	const StructuralProto = {
		[symbol$2]() {
			return structureKeys(this, Object.keys(this));
		},
		[symbol$1](that) {
			const selfKeys = Object.keys(this);
			const thatKeys = Object.keys(that);
			if (selfKeys.length !== thatKeys.length) return false;
			for (let i = 0; i < selfKeys.length; i++) if (selfKeys[i] !== thatKeys[i] && !equals$1(this[selfKeys[i]], that[selfKeys[i]])) return false;
			return true;
		}
	};
	/** @internal */
	const YieldableProto = { [Symbol.iterator]() {
		return new SingleShotGen(this);
	} };
	/** @internal */
	const EffectProto = {
		[EffectTypeId]: effectVariance,
		...PipeInspectableProto,
		[Symbol.iterator]() {
			return new SingleShotGen(this);
		},
		asEffect() {
			return this;
		},
		toJSON() {
			return {
				_id: "Effect",
				op: this[identifier],
				...args in this ? { args: this[args] } : void 0
			};
		}
	};
	/** @internal */
	const isEffect$1 = (u) => hasProperty(u, EffectTypeId);
	/** @internal */
	const isExit$1 = (u) => hasProperty(u, ExitTypeId);
	/** @internal */
	const CauseTypeId = "~effect/Cause";
	/** @internal */
	const CauseFailureTypeId = "~effect/Cause/Failure";
	/** @internal */
	const isCause$1 = (self) => hasProperty(self, CauseTypeId);
	/** @internal */
	const isCauseFailure = (self) => hasProperty(self, CauseFailureTypeId);
	/** @internal */
	var CauseImpl = class {
		[CauseTypeId];
		failures;
		constructor(failures) {
			this[CauseTypeId] = CauseTypeId;
			this.failures = failures;
		}
		pipe() {
			return pipeArguments(this, arguments);
		}
		toJSON() {
			return {
				_id: "Cause",
				failures: this.failures.map((f) => f.toJSON())
			};
		}
		toString() {
			return `Cause(${format(this.failures)})`;
		}
		[NodeInspectSymbol]() {
			return this.toJSON();
		}
		[symbol$1](that) {
			return isCause$1(that) && this.failures.length === that.failures.length && this.failures.every((e, i) => equals$1(e, that.failures[i]));
		}
		[symbol$2]() {
			return array$2(this.failures);
		}
	};
	const annotationsMap = /* @__PURE__ */ new WeakMap();
	/** @internal */
	var FailureBase = class {
		[CauseFailureTypeId];
		annotations;
		_tag;
		constructor(_tag, annotations$1, originalError) {
			this[CauseFailureTypeId] = CauseFailureTypeId;
			this._tag = _tag;
			if (annotations$1 !== constEmptyAnnotations && typeof originalError === "object" && originalError !== null && annotations$1.size > 0) {
				const prevAnnotations = annotationsMap.get(originalError);
				if (prevAnnotations) annotations$1 = new Map([...prevAnnotations, ...annotations$1]);
				annotationsMap.set(originalError, annotations$1);
			}
			this.annotations = annotations$1;
		}
		pipe() {
			return pipeArguments(this, arguments);
		}
		toString() {
			return format(this);
		}
		[NodeInspectSymbol]() {
			return this.toString();
		}
	};
	/** @internal */
	const constEmptyAnnotations = /* @__PURE__ */ new Map();
	/** @internal */
	var Fail = class Fail extends FailureBase {
		error;
		constructor(error, annotations$1 = constEmptyAnnotations) {
			super("Fail", annotations$1, error);
			this.error = error;
		}
		toString() {
			return `Fail(${format(this.error)})`;
		}
		toJSON() {
			return {
				_tag: "Fail",
				error: this.error
			};
		}
		annotate(tag, value, options) {
			if (options?.overwrite !== true && this.annotations.has(tag.key)) return this;
			return new Fail(this.error, new Map([...this.annotations, [tag.key, value]]));
		}
		[symbol$1](that) {
			return failureIsFail$1(that) && equals$1(this.error, that.error) && equals$1(this.annotations, that.annotations);
		}
		[symbol$2]() {
			return combine(string$1(this._tag))(combine(hash(this.error))(hash(this.annotations)));
		}
	};
	/** @internal */
	const causeFromFailures = (failures) => new CauseImpl(failures);
	/** @internal */
	const causeEmpty = /* @__PURE__ */ new CauseImpl([]);
	/** @internal */
	const causeFail = (error) => new CauseImpl([new Fail(error)]);
	/** @internal */
	var Die = class Die extends FailureBase {
		defect;
		constructor(defect, annotations$1 = constEmptyAnnotations) {
			super("Die", annotations$1, defect);
			this.defect = defect;
		}
		toString() {
			return `Die(${format(this.defect)})`;
		}
		toJSON() {
			return {
				_tag: "Die",
				defect: this.defect
			};
		}
		annotate(tag, value, options) {
			if (options?.overwrite !== true && this.annotations.has(tag.key)) return this;
			return new Die(this.defect, new Map([...this.annotations, [tag.key, value]]));
		}
		[symbol$1](that) {
			return failureIsDie$1(that) && equals$1(this.defect, that.defect) && equals$1(this.annotations, that.annotations);
		}
		[symbol$2]() {
			return combine(string$1(this._tag))(combine(hash(this.defect))(hash(this.annotations)));
		}
	};
	/** @internal */
	const causeDie = (defect) => new CauseImpl([new Die(defect)]);
	/** @internal */
	const causeAnnotate = /* @__PURE__ */ dual((args$1) => isCause$1(args$1[0]), (self, key, value, options) => new CauseImpl(self.failures.map((f) => f.annotate(key, value, options))));
	/** @internal */
	const failureIsFail$1 = (self) => self._tag === "Fail";
	/** @internal */
	const failureIsDie$1 = (self) => self._tag === "Die";
	/** @internal */
	const failureIsInterrupt$2 = (self) => self._tag === "Interrupt";
	function defaultEvaluate(_fiber) {
		return exitDie(`Effect.evaluate: Not implemented`);
	}
	/** @internal */
	const makePrimitiveProto = (options) => ({
		...EffectProto,
		[identifier]: options.op,
		[evaluate]: options[evaluate] ?? defaultEvaluate,
		[contA]: options[contA],
		[contE]: options[contE],
		[contAll]: options[contAll]
	});
	/** @internal */
	const makePrimitive = (options) => {
		const Proto$1 = makePrimitiveProto(options);
		return function() {
			const self = Object.create(Proto$1);
			self[args] = options.single === false ? arguments : arguments[0];
			return self;
		};
	};
	/** @internal */
	const makeExit = (options) => {
		const Proto$1 = {
			...makePrimitiveProto(options),
			[ExitTypeId]: ExitTypeId,
			_tag: options.op,
			get [options.prop]() {
				return this[args];
			},
			toString() {
				return `${options.op}(${format(this[args])})`;
			},
			toJSON() {
				return {
					_id: "Exit",
					_tag: options.op,
					[options.prop]: this[args]
				};
			},
			[symbol$1](that) {
				return isExit$1(that) && that._tag === this._tag && equals$1(this[args], that[args]);
			},
			[symbol$2]() {
				return combine(string$1(options.op), hash(this[args]));
			}
		};
		return function(value) {
			const self = Object.create(Proto$1);
			self[args] = value;
			self[contA] = void 0;
			self[contE] = void 0;
			self[contAll] = void 0;
			return self;
		};
	};
	/** @internal */
	const exitSucceed = /* @__PURE__ */ makeExit({
		op: "Success",
		prop: "value",
		[evaluate](fiber) {
			const cont = fiber.getCont(contA);
			return cont ? cont[contA](this[args], fiber, this) : fiber.yieldWith(this);
		}
	});
	/** @internal */
	const CurrentSpanKey = { key: "effect/Cause/CurrentSpan" };
	/** @internal */
	const InterruptorSpanKey = { key: "effect/Cause/InterruptorSpan" };
	/** @internal */
	const exitFailCause = /* @__PURE__ */ makeExit({
		op: "Failure",
		prop: "cause",
		[evaluate](fiber) {
			let cause = this[args];
			let annotated = false;
			if (fiber.currentSpan && fiber.currentSpan._tag === "Span") {
				cause = causeAnnotate(cause, CurrentSpanKey, fiber.currentSpan);
				annotated = true;
			}
			let cont = fiber.getCont(contE);
			while (fiber.interruptible && fiber._interruptedCause && cont) cont = fiber.getCont(contE);
			return cont ? cont[contE](cause, fiber, annotated ? void 0 : this) : fiber.yieldWith(annotated ? this : exitFailCause(cause));
		}
	});
	/** @internal */
	const exitFail = (e) => exitFailCause(causeFail(e));
	/** @internal */
	const exitDie = (defect) => exitFailCause(causeDie(defect));
	/** @internal */
	const withFiber$1 = /* @__PURE__ */ makePrimitive({
		op: "WithFiber",
		[evaluate](fiber) {
			return this[args](fiber);
		}
	});
	/** @internal */
	const YieldableError = /* @__PURE__ */ function() {
		class YieldableError$1 extends globalThis.Error {
			asEffect() {
				return exitFail(this);
			}
		}
		Object.assign(YieldableError$1.prototype, YieldableProto);
		return YieldableError$1;
	}();
	/** @internal */
	const Error$1 = /* @__PURE__ */ function() {
		const plainArgsSymbol = /* @__PURE__ */ Symbol.for("effect/Data/Error/plainArgs");
		return class Base extends YieldableError {
			constructor(args$1) {
				super(args$1?.message, args$1?.cause ? { cause: args$1.cause } : void 0);
				if (args$1) {
					Object.assign(this, args$1);
					Object.defineProperty(this, plainArgsSymbol, {
						value: args$1,
						enumerable: false
					});
				}
			}
			toJSON() {
				return {
					...this[plainArgsSymbol],
					...this
				};
			}
		};
	}();
	/** @internal */
	const TaggedError = (tag) => {
		class Base extends Error$1 {
			_tag = tag;
		}
		Base.prototype.name = tag;
		return Base;
	};
	/** @internal */
	const NoSuchElementErrorTypeId$1 = "~effect/Cause/NoSuchElementError";
	/** @internal */
	const isNoSuchElementError$1 = (u) => hasProperty(u, NoSuchElementErrorTypeId$1);
	/** @internal */
	var NoSuchElementError$1 = class extends TaggedError("NoSuchElementError") {
		[NoSuchElementErrorTypeId$1] = NoSuchElementErrorTypeId$1;
		constructor(message) {
			super({ message });
		}
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/data/Equivalence.js
/**
	* Creates a custom equivalence relation with an optimized reference equality check.
	*
	* The resulting equivalence first performs a reference equality check (`===`) for performance,
	* then falls back to the provided equivalence function if the values are not identical.
	*
	* @example
	* ```ts
	* import { Equivalence } from "effect/data"
	*
	* // Case-insensitive string equivalence
	* const caseInsensitive = Equivalence.make<string>((a, b) =>
	*   a.toLowerCase() === b.toLowerCase()
	* )
	*
	* console.log(caseInsensitive("Hello", "HELLO")) // true
	* console.log(caseInsensitive("foo", "bar")) // false
	*
	* // Same reference optimization
	* const str = "test"
	* console.log(caseInsensitive(str, str)) // true (fast path)
	*
	* // Numeric tolerance equivalence
	* const tolerance = Equivalence.make<number>((a, b) =>
	*   Math.abs(a - b) < 0.0001
	* )
	*
	* console.log(tolerance(1.0, 1.0001)) // false
	* console.log(tolerance(1.0, 1.00001)) // true
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const make$7 = (isEquivalent) => (self, that) => self === that || isEquivalent(self, that);
	/**
	* Creates an equivalence for arrays where all elements are compared using the same equivalence.
	*
	* Two arrays are considered equivalent if they have the same length and all corresponding
	* elements are equivalent according to the provided element equivalence.
	*
	* @example
	* ```ts
	* import { Equivalence } from "effect/data"
	*
	* const numberArrayEq = Equivalence.array(Equivalence.strict<number>())
	*
	* console.log(numberArrayEq([1, 2, 3], [1, 2, 3])) // true
	* console.log(numberArrayEq([1, 2, 3], [1, 2, 4])) // false
	* console.log(numberArrayEq([1, 2], [1, 2, 3])) // false (different length)
	*
	* // Case-insensitive string array
	* const caseInsensitive = Equivalence.mapInput(
	*   Equivalence.strict<string>(),
	*   (s: string) => s.toLowerCase()
	* )
	* const stringArrayEq = Equivalence.array(caseInsensitive)
	*
	* console.log(stringArrayEq(["Hello", "World"], ["HELLO", "WORLD"])) // true
	* console.log(stringArrayEq(["Hello"], ["Hi"])) // false
	*
	* // Empty arrays
	* console.log(numberArrayEq([], [])) // true
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	function array$1(item) {
		return make$7((self, that) => {
			if (self.length !== that.length) return false;
			for (let i = 0; i < self.length; i++) if (!item(self[i], that[i])) return false;
			return true;
		});
	}

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/data/Order.js
/**
	* Creates a new `Order` instance from a comparison function.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Order } from "effect/data"
	*
	* const byAge = Order.make<{ name: string, age: number }>((self, that) => {
	*   if (self.age < that.age) return -1
	*   if (self.age > that.age) return 1
	*   return 0
	* })
	*
	* assert.deepStrictEqual(byAge({ name: "Alice", age: 30 }, { name: "Bob", age: 25 }), 1)
	* assert.deepStrictEqual(byAge({ name: "Alice", age: 25 }, { name: "Bob", age: 30 }), -1)
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const make$6 = (compare) => (self, that) => self === that ? 0 : compare(self, that);
	/**
	* An `Order` instance for numbers that compares them numerically.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Order } from "effect/data"
	*
	* assert.deepStrictEqual(Order.number(1, 2), -1)
	* assert.deepStrictEqual(Order.number(2, 1), 1)
	* assert.deepStrictEqual(Order.number(1, 1), 0)
	* ```
	*
	* @category instances
	* @since 2.0.0
	*/
	const number$1 = /* @__PURE__ */ make$6((self, that) => self < that ? -1 : 1);
	/**
	* Transforms an `Order` on type `A` into an `Order` on type `B` by providing a function that
	* maps values of type `B` to values of type `A`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Order } from "effect/data"
	*
	* const byLength = Order.mapInput(Order.number, (s: string) => s.length)
	*
	* assert.deepStrictEqual(byLength("a", "bb"), -1)
	* assert.deepStrictEqual(byLength("bb", "a"), 1)
	* assert.deepStrictEqual(byLength("aa", "bb"), 0)
	* ```
	*
	* @category mapping
	* @since 2.0.0
	*/
	const mapInput = /* @__PURE__ */ dual(2, (self, f) => make$6((b1, b2) => self(f(b1), f(b2))));
	/**
	* This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
	* The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
	* If all elements are equal, the arrays are then compared based on their length.
	* It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Order } from "effect/data"
	*
	* const arrayOrder = Order.array(Order.number)
	*
	* assert.deepStrictEqual(arrayOrder([1, 2], [1, 3]), -1)
	* assert.deepStrictEqual(arrayOrder([1, 2], [1, 2, 3]), -1) // shorter array is less
	* assert.deepStrictEqual(arrayOrder([1, 2, 3], [1, 2]), 1) // longer array is greater
	* assert.deepStrictEqual(arrayOrder([1, 2], [1, 2]), 0)
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	const array = (O) => make$6((self, that) => {
		const aLen = self.length;
		const bLen = that.length;
		const len = Math.min(aLen, bLen);
		for (let i = 0; i < len; i++) {
			const o = O(self[i], that[i]);
			if (o !== 0) return o;
		}
		return number$1(aLen, bLen);
	});
	/**
	* Test whether one value is _strictly greater than_ another.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Order } from "effect/data"
	*
	* const greaterThanNumber = Order.greaterThan(Order.number)
	*
	* assert.deepStrictEqual(greaterThanNumber(2, 1), true)
	* assert.deepStrictEqual(greaterThanNumber(1, 2), false)
	* assert.deepStrictEqual(greaterThanNumber(1, 1), false)
	* ```
	*
	* @category predicates
	* @since 2.0.0
	*/
	const greaterThan = (O) => dual(2, (self, that) => O(self, that) === 1);

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/option.js
	const TypeId$11 = "~effect/data/Option";
	const CommonProto$1 = {
		[TypeId$11]: { _A: (_) => _ },
		...PipeInspectableProto,
		...YieldableProto
	};
	const SomeProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
		_tag: "Some",
		_op: "Some",
		[symbol$1](that) {
			return isOption$1(that) && isSome$1(that) && equals$1(this.value, that.value);
		},
		[symbol$2]() {
			return combine(hash(this._tag))(hash(this.value));
		},
		toString() {
			return `some(${format(this.value)})`;
		},
		toJSON() {
			return {
				_id: "Option",
				_tag: this._tag,
				value: toJson(this.value)
			};
		},
		asEffect() {
			return exitSucceed(this.value);
		}
	});
	const NoneHash = /* @__PURE__ */ hash("None");
	const NoneProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
		_tag: "None",
		_op: "None",
		[symbol$1](that) {
			return isOption$1(that) && isNone$1(that);
		},
		[symbol$2]() {
			return NoneHash;
		},
		toString() {
			return `none()`;
		},
		toJSON() {
			return {
				_id: "Option",
				_tag: this._tag
			};
		},
		asEffect() {
			return exitFail(new NoSuchElementError$1());
		}
	});
	/** @internal */
	const isOption$1 = (input) => hasProperty(input, TypeId$11);
	/** @internal */
	const isNone$1 = (fa) => fa._tag === "None";
	/** @internal */
	const isSome$1 = (fa) => fa._tag === "Some";
	/** @internal */
	const none$1 = /* @__PURE__ */ Object.create(NoneProto);
	/** @internal */
	const some$1 = (value) => {
		const a = Object.create(SomeProto);
		a.value = value;
		return a;
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/result.js
	const TypeId$10 = "~effect/data/Result";
	const CommonProto = {
		[TypeId$10]: {
			_A: (_) => _,
			_E: (_) => _
		},
		...PipeInspectableProto,
		...YieldableProto
	};
	const SuccessProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
		_tag: "Success",
		_op: "Success",
		[symbol$1](that) {
			return isResult$1(that) && isSuccess$4(that) && equals$1(this.success, that.success);
		},
		[symbol$2]() {
			return combine(hash(this._tag))(hash(this.success));
		},
		toString() {
			return `success(${format(this.success)})`;
		},
		toJSON() {
			return {
				_id: "Result",
				_tag: this._tag,
				value: toJson(this.success)
			};
		},
		asEffect() {
			return exitSucceed(this.success);
		}
	});
	const FailureProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
		_tag: "Failure",
		_op: "Failure",
		[symbol$1](that) {
			return isResult$1(that) && isFailure$5(that) && equals$1(this.failure, that.failure);
		},
		[symbol$2]() {
			return combine(hash(this._tag))(hash(this.failure));
		},
		toString() {
			return `failure(${format(this.failure)})`;
		},
		toJSON() {
			return {
				_id: "Result",
				_tag: this._tag,
				failure: toJson(this.failure)
			};
		},
		asEffect() {
			return exitFail(this.failure);
		}
	});
	/** @internal */
	const isResult$1 = (input) => hasProperty(input, TypeId$10);
	/** @internal */
	const isFailure$5 = (result$2) => result$2._tag === "Failure";
	/** @internal */
	const isSuccess$4 = (result$2) => result$2._tag === "Success";
	/** @internal */
	const fail$6 = (failure) => {
		const a = Object.create(FailureProto);
		a.failure = failure;
		return a;
	};
	/** @internal */
	const succeed$6 = (success) => {
		const a = Object.create(SuccessProto);
		a.success = success;
		return a;
	};
	/** @internal */
	const getFailure$2 = (self) => isSuccess$4(self) ? none$1 : some$1(self.failure);
	/** @internal */
	const getSuccess$3 = (self) => isFailure$5(self) ? none$1 : some$1(self.success);
	/** @internal */
	const fromOption$4 = /* @__PURE__ */ dual(2, (self, onNone) => isNone$1(self) ? fail$6(onNone()) : succeed$6(self.value));

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/data/Option.js
/**
	* Represents the absence of a value by creating an empty `Option`.
	*
	* `Option.none` returns an `Option<never>`, which is a subtype of `Option<A>`.
	* This means you can use it in place of any `Option<A>` regardless of the type
	* `A`.
	*
	* @example
	* ```ts
	* import { Option } from "effect/data"
	*
	* // An Option holding no value
	* //
	* //      ┌─── Option<never>
	* //      ▼
	* const noValue = Option.none()
	*
	* console.log(noValue)
	* // Output: { _id: 'Option', _tag: 'None' }
	* ```
	*
	* @see {@link some} for the opposite operation.
	*
	* @category Constructors
	* @since 2.0.0
	*/
	const none = () => none$1;
	/**
	* Wraps the given value into an `Option` to represent its presence.
	*
	* @example
	* ```ts
	* import { Option } from "effect/data"
	*
	* // An Option holding the number 1
	* //
	* //      ┌─── Option<number>
	* //      ▼
	* const value = Option.some(1)
	*
	* console.log(value)
	* // Output: { _id: 'Option', _tag: 'Some', value: 1 }
	* ```
	*
	* @see {@link none} for the opposite operation.
	*
	* @category Constructors
	* @since 2.0.0
	*/
	const some = some$1;
	/**
	* Determines whether the given value is an `Option`.
	*
	* **Details**
	*
	* This function checks if a value is an instance of `Option`. It returns `true`
	* if the value is either `Option.some` or `Option.none`, and `false` otherwise.
	* This is particularly useful when working with unknown values or when you need
	* to ensure type safety in your code.
	*
	* @example
	* ```ts
	* import { Option } from "effect/data"
	*
	* console.log(Option.isOption(Option.some(1)))
	* // Output: true
	*
	* console.log(Option.isOption(Option.none()))
	* // Output: true
	*
	* console.log(Option.isOption({}))
	* // Output: false
	* ```
	*
	* @category Guards
	* @since 2.0.0
	*/
	const isOption = isOption$1;
	/**
	* Checks whether an `Option` represents the absence of a value (`None`).
	*
	* @example
	* ```ts
	* import { Option } from "effect/data"
	*
	* console.log(Option.isNone(Option.some(1)))
	* // Output: false
	*
	* console.log(Option.isNone(Option.none()))
	* // Output: true
	* ```
	*
	* @see {@link isSome} for the opposite check.
	*
	* @category Guards
	* @since 2.0.0
	*/
	const isNone = isNone$1;
	/**
	* Checks whether an `Option` contains a value (`Some`).
	*
	* @example
	* ```ts
	* import { Option } from "effect/data"
	*
	* console.log(Option.isSome(Option.some(1)))
	* // Output: true
	*
	* console.log(Option.isSome(Option.none()))
	* // Output: false
	* ```
	*
	* @see {@link isNone} for the opposite check.
	*
	* @category Guards
	* @since 2.0.0
	*/
	const isSome = isSome$1;
	/**
	* Converts a `Result` into an `Option` by discarding the error and extracting
	* the right value.
	*
	* **Details**
	*
	* This function takes an `Result` and returns an `Option` based on its value:
	*
	* - If the `Result` is a `Ok`, its value is wrapped in a `Some` and
	*   returned.
	* - If the `Result` is a `Err`, the error is discarded, and `None` is
	*   returned.
	*
	* This is particularly useful when you only care about the success case
	* (`Ok`) of an `Result` and want to handle the result using `Option`. By
	* using this function, you can convert `Result` into a simpler structure for
	* cases where error handling is not required.
	*
	* @example
	* ```ts
	* import { Result } from "effect/data"
	* import { Option } from "effect/data"
	*
	* console.log(Option.getSuccess(Result.succeed("ok")))
	* // Output: { _id: 'Option', _tag: 'Some', value: 'ok' }
	*
	* console.log(Option.getSuccess(Result.fail("err")))
	* // Output: { _id: 'Option', _tag: 'None' }
	* ```
	*
	* @see {@link getFailure} for the opposite operation.
	*
	* @category Conversions
	* @since 2.0.0
	*/
	const getSuccess$2 = getSuccess$3;
	/**
	* Converts a `Result` into an `Option` by discarding the right value and
	* extracting the left value.
	*
	* **Details**
	*
	* This function transforms an `Result` into an `Option` as follows:
	*
	* - If the `Result` is a `Err`, its value is wrapped in a `Some` and returned.
	* - If the `Result` is a `Ok`, the value is discarded, and `None` is
	*   returned.
	*
	* This utility is useful when you only care about the error case (`Err`) of an
	* `Result` and want to handle it as an `Option`. By discarding the right value,
	* it simplifies error-focused workflows.
	*
	* @example
	* ```ts
	* import { Result } from "effect/data"
	* import { Option } from "effect/data"
	*
	* console.log(Option.getFailure(Result.succeed("ok")))
	* // Output: { _id: 'Option', _tag: 'None' }
	*
	* console.log(Option.getFailure(Result.fail("err")))
	* // Output: { _id: 'Option', _tag: 'Some', value: 'err' }
	* ```
	*
	* @see {@link getSuccess} for the opposite operation.
	*
	* @category Conversions
	* @since 2.0.0
	*/
	const getFailure$1 = getFailure$2;
	/**
	* Converts an `Option` into an `Array`.
	*
	* **Details**
	*
	* This function transforms an `Option` into an `Array` representation:
	* - If the input is `None`, an empty array is returned.
	* - If the input is `Some`, its value is wrapped in a single-element array.
	*
	* This is useful for converting optional values into a format that can be
	* easily processed with array operations or when working with APIs that
	* expect arrays.
	*
	* @example
	* ```ts
	* import { Option } from "effect/data"
	*
	* console.log(Option.toArray(Option.some(1)))
	* // Output: [1]
	*
	* console.log(Option.toArray(Option.none()))
	* // Output: []
	* ```
	*
	* @category Conversions
	* @since 2.0.0
	*/
	const toArray = (self) => isNone(self) ? [] : [self.value];

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/data/Result.js
/**
	* Constructs a new `Result` holding a `Success` value.
	*
	* @example
	* ```ts
	* import { Result } from "effect/data"
	*
	* const result = Result.succeed(42)
	*
	* console.log(Result.isSuccess(result)) // true
	* if (Result.isSuccess(result)) {
	*   console.log(result.success) // 42
	* }
	* ```
	*
	* @category Constructors
	* @since 4.0.0
	*/
	const succeed$5 = succeed$6;
	/**
	* Constructs a new `Result` holding a `Failure` value.
	*
	* @example
	* ```ts
	* import { Result } from "effect/data"
	*
	* const result = Result.fail("Something went wrong")
	*
	* console.log(Result.isFailure(result)) // true
	* if (Result.isFailure(result)) {
	*   console.log(result.failure) // "Something went wrong"
	* }
	* ```
	*
	* @category Constructors
	* @since 4.0.0
	*/
	const fail$5 = fail$6;
	/**
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Result } from "effect/data"
	* import { Option } from "effect/data"
	*
	* assert.deepStrictEqual(Result.fromOption(Option.some(1), () => 'error'), Result.succeed(1))
	* assert.deepStrictEqual(Result.fromOption(Option.none(), () => 'error'), Result.fail('error'))
	* ```
	*
	* @category Constructors
	* @since 4.0.0
	*/
	const fromOption$3 = fromOption$4;
	/**
	* Tests if a value is a `Result`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Result } from "effect/data"
	*
	* assert.deepStrictEqual(Result.isResult(Result.succeed(1)), true)
	* assert.deepStrictEqual(Result.isResult(Result.fail("a")), true)
	* assert.deepStrictEqual(Result.isResult({ value: 1 }), false)
	* ```
	*
	* @category Type Guards
	* @since 4.0.0
	*/
	const isResult = isResult$1;
	/**
	* Determine if a `Result` is a `Failure`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Result } from "effect/data"
	*
	* assert.deepStrictEqual(Result.isFailure(Result.succeed(1)), false)
	* assert.deepStrictEqual(Result.isFailure(Result.fail("a")), true)
	* ```
	*
	* @category Type Guards
	* @since 4.0.0
	*/
	const isFailure$4 = isFailure$5;
	/**
	* Determine if a `Result` is a `Success`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Result } from "effect/data"
	*
	* assert.deepStrictEqual(Result.isSuccess(Result.succeed(1)), true)
	* assert.deepStrictEqual(Result.isSuccess(Result.fail("a")), false)
	* ```
	*
	* @category Type Guards
	* @since 4.0.0
	*/
	const isSuccess$3 = isSuccess$4;
	/**
	* Converts a `Result` to an `Option` discarding the `Failure`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Result } from "effect/data"
	* import { Option } from "effect/data"
	*
	* assert.deepStrictEqual(Result.getSuccess(Result.succeed('ok')), Option.some('ok'))
	* assert.deepStrictEqual(Result.getSuccess(Result.fail('err')), Option.none())
	* ```
	*
	* @category Getters
	* @since 4.0.0
	*/
	const getSuccess$1 = getSuccess$3;
	/**
	* Converts a `Result` to an `Option` discarding the `Success`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Result } from "effect/data"
	* import { Option } from "effect/data"
	*
	* assert.deepStrictEqual(Result.getFailure(Result.succeed('ok')), Option.none())
	* assert.deepStrictEqual(Result.getFailure(Result.fail('err')), Option.some('err'))
	* ```
	*
	* @category Getters
	* @since 4.0.0
	*/
	const getFailure = getFailure$2;
	/**
	* Creates a `Result` that succeeds with a `None` value.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Result } from "effect/data"
	* import { Option } from "effect/data"
	*
	* const result = Result.succeedNone
	* assert.deepStrictEqual(result, Result.succeed(Option.none()))
	* ```
	*
	* @category Constructors
	* @since 4.0.0
	*/
	const succeedNone$2 = /* @__PURE__ */ succeed$5(none$1);

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/collections/Iterable.js
/**
	* Get the first element of a `Iterable`, or throw an error if the `Iterable` is empty.
	*
	* @example
	* ```ts
	* import { Iterable } from "effect/collections"
	*
	* const numbers = [1, 2, 3]
	* console.log(Iterable.headUnsafe(numbers)) // 1
	*
	* const letters = "hello"
	* console.log(Iterable.headUnsafe(letters)) // "h"
	*
	* // This will throw an error!
	* try {
	*   const empty = Iterable.empty<number>()
	*   Iterable.headUnsafe(empty) // throws Error: "headUnsafe: empty iterable"
	* } catch (error) {
	*   console.log((error as Error).message) // "headUnsafe: empty iterable"
	* }
	*
	* // Use only when you're certain the iterable is non-empty
	* const nonEmpty = Iterable.range(1, 10)
	* console.log(Iterable.headUnsafe(nonEmpty)) // 1
	* ```
	*
	* @category getters
	* @since 3.3.0
	*/
	const headUnsafe = (self) => {
		const result$2 = self[Symbol.iterator]().next();
		if (result$2.done) throw new Error("headUnsafe: empty iterable");
		return result$2.value;
	};
	/**
	* Returns the first element that satisfies the specified
	* predicate, or `None` if no such element exists.
	*
	* @example
	* ```ts
	* import { Iterable } from "effect/collections"
	* import * as Option from "effect/data/Option"
	*
	* const numbers = [1, 3, 4, 6, 8]
	* const firstEven = Iterable.findFirst(numbers, x => x % 2 === 0)
	* console.log(firstEven) // Option.some(4)
	*
	* const firstGreaterThan10 = Iterable.findFirst(numbers, x => x > 10)
	* console.log(firstGreaterThan10) // Option.none()
	*
	* // With index
	* const letters = ["a", "b", "c", "d"]
	* const atEvenIndex = Iterable.findFirst(letters, (_, i) => i % 2 === 0)
	* console.log(atEvenIndex) // Option.some("a")
	*
	* // Type refinement
	* const mixed: (string | number)[] = [1, "hello", 2, "world"]
	* const firstString = Iterable.findFirst(mixed, (x): x is string => typeof x === "string")
	* console.log(firstString) // Option.some("hello")
	*
	* // Transform during search
	* const findSquareRoot = Iterable.findFirst([1, 4, 9, 16], x => {
	*   const sqrt = Math.sqrt(x)
	*   return Number.isInteger(sqrt) ? Option.some(sqrt) : Option.none()
	* })
	* console.log(findSquareRoot) // Option.some(1)
	* ```
	*
	* @category elements
	* @since 2.0.0
	*/
	const findFirst$1 = /* @__PURE__ */ dual(2, (self, f) => {
		let i = 0;
		for (const a of self) {
			const o = f(a, i);
			if (isBoolean(o)) {
				if (o) return some(a);
			} else if (isSome(o)) return o;
			i++;
		}
		return none();
	});

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/data/Filter.js
	const FailTypeId = "~effect/data/Filter/fail";
	/**
	* @since 4.0.0
	* @category fail
	*/
	const fail$4 = (value) => ({
		[FailTypeId]: FailTypeId,
		fail: value
	});
	/**
	* @since 4.0.0
	* @category fail
	*/
	const failVoid = /* @__PURE__ */ fail$4(void 0);
	/**
	* @since 4.0.0
	* @category fail
	*/
	const isFail = (u) => u === failVoid || typeof u === "object" && u !== null && FailTypeId in u;
	/**
	* @since 4.0.0
	* @category fail
	*/
	const isPass = (u) => !isFail(u);
	/**
	* @since 4.0.0
	* @category Mapping
	*/
	const mapFail = /* @__PURE__ */ dual(2, (self, f) => (input) => {
		const result$2 = self(input);
		return isFail(result$2) ? fail$4(f(result$2.fail)) : result$2;
	});
	/**
	* Creates a Filter from a predicate or refinement function.
	*
	* This is a convenient way to create filters from boolean-returning functions.
	* When the predicate returns true, the input value is passed through unchanged.
	* When it returns false, the `fail` type is returned.
	*
	* @example
	* ```ts
	* import { Filter } from "effect/data"
	*
	* // Create filter from predicate
	* const positiveNumbers = Filter.fromPredicate((n: number) => n > 0)
	* const nonEmptyStrings = Filter.fromPredicate((s: string) => s.length > 0)
	*
	* // Type refinement
	* const isString = Filter.fromPredicate((x: unknown): x is string => typeof x === "string")
	*
	* console.log(positiveNumbers(5))    // 5
	* console.log(positiveNumbers(-1))   // fail
	* console.log(isString("hello"))     // "hello" (typed as string)
	* console.log(isString(42))          // fail
	* ```
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const fromPredicate = (predicate) => (input) => predicate(input) ? input : fail$4(input);
	/**
	* A predefined filter that only passes through string values.
	*
	* This filter accepts any unknown value and only allows strings to pass through,
	* filtering out all other types. It's useful for type-safe string extraction
	* from mixed-type data.
	*
	* @example
	* ```ts
	* import { Filter } from "effect/data"
	*
	* console.log(Filter.string("hello"))  // "hello"
	* console.log(Filter.string(42))       // fail
	* console.log(Filter.string(true))     // fail
	* console.log(Filter.string(null))     // fail
	*
	* // Use with arrays of mixed types
	* const mixed = ["a", 1, "b", true, "c"]
	* const strings = mixed.map(Filter.string).filter(x => Filter.isPass(x))
	* console.log(strings) // ["a", "b", "c"]
	* ```
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const string = /* @__PURE__ */ fromPredicate(isString);
	/**
	* A predefined filter that only passes through number values.
	*
	* This filter accepts any unknown value and only allows numbers to pass through,
	* filtering out all other types including NaN. It's useful for type-safe number
	* extraction from mixed-type data.
	*
	* @example
	* ```ts
	* import { Filter } from "effect/data"
	*
	* console.log(Filter.number(42))       // 42
	* console.log(Filter.number(3.14))     // 3.14
	* console.log(Filter.number("42"))     // fail
	* console.log(Filter.number(true))     // fail
	* console.log(Filter.number(NaN))      // fail
	*
	* // Extract numbers from mixed array
	* const mixed = [1, "2", 3, true, 4.5]
	* const numbers = mixed.map(Filter.number).filter(Filter.isPass)
	* console.log(numbers) // [1, 3, 4.5]
	*
	* // Use with array filtering
	* const data: unknown[] = [10, "hello", 20, null, 30.5, "world"]
	* const numbersOnly = data.filter(item => Filter.isPass(Filter.number(item))) as number[]
	* console.log(numbersOnly) // [10, 20, 30.5]
	*
	* // Combine with other filters
	* const positiveNumbers = Filter.compose(Filter.number, Filter.fromPredicate((n: number) => n > 0))
	* console.log(positiveNumbers(5))   // 5
	* console.log(positiveNumbers(-1))  // fail
	* console.log(positiveNumbers("5")) // fail
	* ```
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const number = /* @__PURE__ */ fromPredicate(isNumber);
	/**
	* A predefined filter that only passes through boolean values.
	*
	* This filter accepts any unknown value and only allows true boolean values
	* to pass through, filtering out all other types including truthy/falsy values
	* that aren't actual booleans.
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const boolean = /* @__PURE__ */ fromPredicate(isBoolean);
	/**
	* A predefined filter that only passes through BigInt values.
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const bigint = /* @__PURE__ */ fromPredicate(isBigInt);
	/**
	* A predefined filter that only passes through Symbol values.
	*
	* This filter accepts any unknown value and only allows Symbol values to pass
	* through, filtering out all other types.
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const symbol = /* @__PURE__ */ fromPredicate(isSymbol);
	/**
	* A predefined filter that only passes through Date objects.
	*
	* This filter accepts any unknown value and only allows Date instances to pass
	* through, filtering out date strings, timestamps, and all other types.
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const date = /* @__PURE__ */ fromPredicate(isDate);
	/**
	* Composes two filters sequentially, feeding the output of the first into the second.
	*
	* This creates a pipeline where the output of the left filter becomes the input
	* to the right filter. If either filter returns `fail`, the composition returns
	* `fail`. This is useful for creating multi-stage validation and transformation
	* pipelines.
	*
	* @example
	* ```ts
	* import { Filter } from "effect/data"
	*
	* // First filter: only pass strings
	* const stringFilter = Filter.string
	* // Second filter: only pass non-empty strings and uppercase them
	* const nonEmptyUpper = Filter.make((s: string) =>
	*   s.length > 0 ? s.toUpperCase() : Filter.fail(s)
	* )
	*
	* // Compose: unknown -> string -> uppercase string
	* const stringToUpper = Filter.compose(stringFilter, nonEmptyUpper)
	*
	* console.log(stringToUpper("hello"))  // "HELLO"
	* console.log(stringToUpper(""))       // fail (empty string)
	* console.log(stringToUpper(123))      // fail (not a string)
	*
	* // Multi-stage number processing
	* const positiveFilter = Filter.fromPredicate((n: number) => n > 0)
	* const doubleFilter = Filter.make((n: number) => n * 2)
	* const positiveDouble = Filter.compose(positiveFilter, doubleFilter)
	* ```
	*
	* @since 4.0.0
	* @category Combinators
	*/
	const compose = /* @__PURE__ */ dual(2, (left, right) => (input) => {
		const leftOut = left(input);
		if (isFail(leftOut)) return leftOut;
		return right(leftOut);
	});
	/**
	* Composes two filters sequentially, allowing the output of the first to be
	* passed to the second.
	*
	* This is similar to `compose`, but it will always fail with the original
	* input.
	*
	* @since 4.0.0
	* @category Combinators
	*/
	const composePassthrough = /* @__PURE__ */ dual(2, (left, right) => (input) => {
		const leftOut = left(input);
		if (isFail(leftOut)) return fail$4(input);
		const rightOut = right(leftOut);
		if (isFail(rightOut)) return fail$4(input);
		return rightOut;
	});

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/data/Record.js
/**
	* Transforms the values of a record into an `Array` with a custom mapping function.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Record } from "effect/data"
	*
	* const x = { a: 1, b: 2, c: 3 }
	* assert.deepStrictEqual(Record.collect(x, (key, n) => [key, n]), [["a", 1], ["b", 2], ["c", 3]])
	* ```
	*
	* @category conversions
	* @since 2.0.0
	*/
	const collect = /* @__PURE__ */ dual(2, (self, f) => {
		const out = [];
		for (const key of keys(self)) out.push(f(key, self[key]));
		return out;
	});
	/**
	* Takes a record and returns an array of tuples containing its keys and values.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Record } from "effect/data"
	*
	* const x = { a: 1, b: 2, c: 3 }
	* assert.deepStrictEqual(Record.toEntries(x), [["a", 1], ["b", 2], ["c", 3]])
	* ```
	*
	* @category conversions
	* @since 2.0.0
	*/
	const toEntries = /* @__PURE__ */ collect((key, value) => [key, value]);
	/**
	* Retrieve the keys of a given record as an array.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Record } from "effect/data"
	*
	* assert.deepStrictEqual(Record.keys({ a: 1, b: 2, c: 3 }), ["a", "b", "c"])
	* ```
	*
	* @category getters
	* @since 2.0.0
	*/
	const keys = (self) => Object.keys(self);

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/array.js
/**
	* @since 2.0.0
	*/
	/** @internal */
	const isArrayNonEmpty$1 = (self) => self.length > 0;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/collections/Array.js
/**
	* Reference to the global Array constructor.
	*
	* @example
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const arr = new Array.Array(3)
	* console.log(arr) // [undefined, undefined, undefined]
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const Array$1 = globalThis.Array;
	/**
	* Creates a new `Array` from an iterable collection of values.
	* If the input is already an array, it returns the input as-is.
	* Otherwise, it converts the iterable collection to an array.
	*
	* @example
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.fromIterable(new Set([1, 2, 3]))
	* console.log(result) // [1, 2, 3]
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const fromIterable = (collection) => Array$1.isArray(collection) ? collection : Array$1.from(collection);
	/**
	* Takes a record and returns an array of tuples containing its keys and values.
	*
	* @example
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.fromRecord({ a: 1, b: 2, c: 3 })
	* console.log(result) // [["a", 1], ["b", 2], ["c", 3]]
	* ```
	*
	* @category conversions
	* @since 2.0.0
	*/
	const fromRecord = toEntries;
	/**
	* Converts an `Option` to an array.
	*
	* @example
	* ```ts
	* import { Array } from "effect/collections"
	* import * as Option from "effect/data/Option"
	*
	* console.log(Array.fromOption(Option.some(1))) // [1]
	* console.log(Array.fromOption(Option.none())) // []
	* ```
	*
	* @category conversions
	* @since 2.0.0
	*/
	const fromOption$2 = toArray;
	/**
	* Concatenates two arrays (or iterables), combining their elements.
	* If either array is non-empty, the result is also a non-empty array.
	*
	* @example
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.appendAll([1, 2], [3, 4])
	* console.log(result) // [1, 2, 3, 4]
	* ```
	*
	* @category concatenating
	* @since 2.0.0
	*/
	const appendAll$1 = /* @__PURE__ */ dual(2, (self, that) => fromIterable(self).concat(fromIterable(that)));
	/**
	* Determine if `unknown` is an Array.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* console.log(Array.isArray(null)) // false
	* console.log(Array.isArray([1, 2, 3])) // true
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isArray = Array$1.isArray;
	/**
	* Determine if an `Array` is non empty narrowing down the type to `NonEmptyArray`.
	*
	* An `Array` is considered to be a `NonEmptyArray` if it contains at least one element.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* console.log(Array.isArrayNonEmpty([])) // false
	* console.log(Array.isArrayNonEmpty([1, 2, 3])) // true
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isArrayNonEmpty = isArrayNonEmpty$1;
	/**
	* Determine if a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray`.
	*
	* A `ReadonlyArray` is considered to be a `NonEmptyReadonlyArray` if it contains at least one element.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* console.log(Array.isReadonlyArrayNonEmpty([])) // false
	* console.log(Array.isReadonlyArrayNonEmpty([1, 2, 3])) // true
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isReadonlyArrayNonEmpty = isArrayNonEmpty$1;
	/** @internal */
	function isOutOfBounds(i, as$2) {
		return i < 0 || i >= as$2.length;
	}
	/**
	* Gets an element unsafely, will throw on out of bounds.
	*
	* @example
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.getUnsafe([1, 2, 3], 1)
	* console.log(result) // 2
	*
	* // This will throw an error
	* // Array.getUnsafe([1, 2, 3], 10)
	* ```
	*
	* @since 2.0.0
	* @category unsafe
	*/
	const getUnsafe$1 = /* @__PURE__ */ dual(2, (self, index) => {
		const i = Math.floor(index);
		if (isOutOfBounds(i, self)) throw new Error(`Index out of bounds: ${i}`);
		return self[i];
	});
	/**
	* Get the first element of a non empty array.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.headNonEmpty([1, 2, 3, 4])
	* console.log(result) // 1
	* ```
	*
	* @category getters
	* @since 2.0.0
	*/
	const headNonEmpty = /* @__PURE__ */ getUnsafe$1(0);
	/**
	* Get the last element of a non empty array.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.lastNonEmpty([1, 2, 3, 4])
	* console.log(result) // 4
	* ```
	*
	* @category getters
	* @since 2.0.0
	*/
	const lastNonEmpty = (self) => self[self.length - 1];
	/**
	* Get all but the first element of a `NonEmptyReadonlyArray`.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.tailNonEmpty([1, 2, 3, 4])
	* console.log(result) // [2, 3, 4]
	* ```
	*
	* @category getters
	* @since 2.0.0
	*/
	const tailNonEmpty = (self) => self.slice(1);
	/**
	* Returns the first element that satisfies the specified
	* predicate, or `None` if no such element exists.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.findFirst([1, 2, 3, 4, 5], x => x > 3)
	* console.log(result) // Option.some(4)
	* ```
	*
	* @category elements
	* @since 2.0.0
	*/
	const findFirst = findFirst$1;
	const _equivalence = /* @__PURE__ */ equivalence();
	/**
	* Calculates the union of two arrays using the provided equivalence relation.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const union = Array.unionWith([1, 2], [2, 3], (a, b) => a === b)
	* console.log(union) // [1, 2, 3]
	* ```
	*
	* @category elements
	* @since 2.0.0
	*/
	const unionWith = /* @__PURE__ */ dual(3, (self, that, isEquivalent) => {
		const a = fromIterable(self);
		const b = fromIterable(that);
		if (isReadonlyArrayNonEmpty(a)) {
			if (isReadonlyArrayNonEmpty(b)) return dedupeWith(isEquivalent)(appendAll$1(a, b));
			return a;
		}
		return b;
	});
	/**
	* Creates a union of two arrays, removing duplicates.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.union([1, 2], [2, 3])
	* console.log(result) // [1, 2, 3]
	* ```
	*
	* @category elements
	* @since 2.0.0
	*/
	const union = /* @__PURE__ */ dual(2, (self, that) => unionWith(self, that, _equivalence));
	/**
	* Constructs a new `NonEmptyArray<A>` from the specified value.
	*
	* @example
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.of(1)
	* console.log(result) // [1]
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const of = (a) => [a];
	/**
	* This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
	* The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
	* If all elements are equal, the arrays are then compared based on their length.
	* It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
	*
	* @example
	* ```ts
	* import { Array } from "effect/collections"
	* import { Order } from "effect/data"
	*
	* const arrayOrder = Array.getOrder(Order.number)
	* console.log(arrayOrder([1, 2], [1, 3])) // -1 (first is less than second)
	* ```
	*
	* @category instances
	* @since 2.0.0
	*/
	const getOrder = array;
	/**
	* Creates an equivalence relation for arrays.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const eq = Array.getEquivalence<number>((a, b) => a === b)
	* console.log(eq([1, 2, 3], [1, 2, 3])) // true
	* ```
	*
	* @category instances
	* @since 2.0.0
	*/
	const getEquivalence = array$1;
	/**
	* Remove duplicates from an `Iterable` using the provided `isEquivalent` function,
	* preserving the order of the first occurrence of each element.
	*
	* @example
	*
	* ```ts
	* import { Array } from "effect/collections"
	*
	* const result = Array.dedupeWith([1, 2, 2, 3, 3, 3], (a, b) => a === b)
	* console.log(result) // [1, 2, 3]
	* ```
	*
	* @category elements
	* @since 2.0.0
	*/
	const dedupeWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
		const input = fromIterable(self);
		if (isReadonlyArrayNonEmpty(input)) {
			const out = [headNonEmpty(input)];
			const rest = tailNonEmpty(input);
			for (const r of rest) if (out.every((a) => !isEquivalent(r, a))) out.push(r);
			return out;
		}
		return [];
	});

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Duration.js
	const TypeId$9 = "~effect/time/Duration";
	const bigint0$1 = /* @__PURE__ */ BigInt(0);
	const bigint1e3 = /* @__PURE__ */ BigInt(1e3);
	const DURATION_REGEX = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/;
	/**
	* Decodes a `DurationInput` into a `Duration`.
	*
	* If the input is not a valid `DurationInput`, it throws an error.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration1 = Duration.fromDurationInputUnsafe(1000) // 1000 milliseconds
	* const duration2 = Duration.fromDurationInputUnsafe("5 seconds")
	* const duration3 = Duration.fromDurationInputUnsafe([2, 500_000_000]) // 2 seconds and 500ms
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const fromDurationInputUnsafe = (input) => {
		if (isDuration(input)) return input;
		if (isNumber(input)) return millis(input);
		if (isBigInt(input)) return nanos(input);
		if (Array.isArray(input) && input.length === 2 && input.every(isNumber)) {
			if (input[0] === -Infinity || input[1] === -Infinity || Number.isNaN(input[0]) || Number.isNaN(input[1])) return zero;
			if (input[0] === Infinity || input[1] === Infinity) return infinity;
			return nanos(BigInt(Math.round(input[0] * 1e9)) + BigInt(Math.round(input[1])));
		}
		if (isString(input)) {
			const match$4 = DURATION_REGEX.exec(input);
			if (match$4) {
				const [_, valueStr, unit] = match$4;
				const value = Number(valueStr);
				switch (unit) {
					case "nano":
					case "nanos": return nanos(BigInt(valueStr));
					case "micro":
					case "micros": return micros(BigInt(valueStr));
					case "milli":
					case "millis": return millis(value);
					case "second":
					case "seconds": return seconds(value);
					case "minute":
					case "minutes": return minutes(value);
					case "hour":
					case "hours": return hours(value);
					case "day":
					case "days": return days(value);
					case "week":
					case "weeks": return weeks(value);
				}
			}
		}
		throw new Error(`Invalid DurationInput: ${input}`);
	};
	const zeroDurationValue = {
		_tag: "Millis",
		millis: 0
	};
	const infinityDurationValue = { _tag: "Infinity" };
	const DurationProto = {
		[TypeId$9]: TypeId$9,
		[symbol$2]() {
			return structure(this.value);
		},
		[symbol$1](that) {
			return isDuration(that) && equals(this, that);
		},
		toString() {
			switch (this.value._tag) {
				case "Infinity": return "Infinity";
				case "Nanos": return `${this.value.nanos} nanos`;
				case "Millis": return `${this.value.millis} millis`;
			}
		},
		toJSON() {
			switch (this.value._tag) {
				case "Millis": return {
					_id: "Duration",
					_tag: "Millis",
					millis: this.value.millis
				};
				case "Nanos": return {
					_id: "Duration",
					_tag: "Nanos",
					nanos: String(this.value.nanos)
				};
				case "Infinity": return {
					_id: "Duration",
					_tag: "Infinity"
				};
			}
		},
		[NodeInspectSymbol]() {
			return this.toJSON();
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	const make$5 = (input) => {
		const duration = Object.create(DurationProto);
		if (isNumber(input)) if (isNaN(input) || input <= 0) duration.value = zeroDurationValue;
		else if (!Number.isFinite(input)) duration.value = infinityDurationValue;
		else if (!Number.isInteger(input)) duration.value = {
			_tag: "Nanos",
			nanos: BigInt(Math.round(input * 1e6))
		};
		else duration.value = {
			_tag: "Millis",
			millis: input
		};
		else if (input <= bigint0$1) duration.value = zeroDurationValue;
		else duration.value = {
			_tag: "Nanos",
			nanos: input
		};
		return duration;
	};
	/**
	* Checks if a value is a Duration.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* console.log(Duration.isDuration(Duration.seconds(1))) // true
	* console.log(Duration.isDuration(1000)) // false
	* ```
	*
	* @since 2.0.0
	* @category guards
	*/
	const isDuration = (u) => hasProperty(u, TypeId$9);
	/**
	* Checks if a Duration is zero.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* console.log(Duration.isZero(Duration.zero)) // true
	* console.log(Duration.isZero(Duration.seconds(1))) // false
	* ```
	*
	* @since 3.5.0
	* @category guards
	*/
	const isZero = (self) => {
		switch (self.value._tag) {
			case "Millis": return self.value.millis === 0;
			case "Nanos": return self.value.nanos === bigint0$1;
			case "Infinity": return false;
		}
	};
	/**
	* A Duration representing zero time.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* console.log(Duration.toMillis(Duration.zero)) // 0
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const zero = /* @__PURE__ */ make$5(0);
	/**
	* A Duration representing infinite time.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* console.log(Duration.toMillis(Duration.infinity)) // Infinity
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const infinity = /* @__PURE__ */ make$5(Infinity);
	/**
	* Creates a Duration from nanoseconds.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.nanos(BigInt(500_000_000))
	* console.log(Duration.toMillis(duration)) // 500
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const nanos = (nanos$1) => make$5(nanos$1);
	/**
	* Creates a Duration from microseconds.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.micros(BigInt(500_000))
	* console.log(Duration.toMillis(duration)) // 500
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const micros = (micros$1) => make$5(micros$1 * bigint1e3);
	/**
	* Creates a Duration from milliseconds.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.millis(1000)
	* console.log(Duration.toMillis(duration)) // 1000
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const millis = (millis$1) => make$5(millis$1);
	/**
	* Creates a Duration from seconds.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.seconds(30)
	* console.log(Duration.toMillis(duration)) // 30000
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const seconds = (seconds$1) => make$5(seconds$1 * 1e3);
	/**
	* Creates a Duration from minutes.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.minutes(5)
	* console.log(Duration.toMillis(duration)) // 300000
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const minutes = (minutes$1) => make$5(minutes$1 * 6e4);
	/**
	* Creates a Duration from hours.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.hours(2)
	* console.log(Duration.toMillis(duration)) // 7200000
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const hours = (hours$1) => make$5(hours$1 * 36e5);
	/**
	* Creates a Duration from days.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.days(1)
	* console.log(Duration.toMillis(duration)) // 86400000
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const days = (days$1) => make$5(days$1 * 864e5);
	/**
	* Creates a Duration from weeks.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.weeks(1)
	* console.log(Duration.toMillis(duration)) // 604800000
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const weeks = (weeks$1) => make$5(weeks$1 * 6048e5);
	/**
	* Converts a Duration to milliseconds.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* console.log(Duration.toMillis(Duration.seconds(5))) // 5000
	* console.log(Duration.toMillis(Duration.minutes(2))) // 120000
	* ```
	*
	* @since 2.0.0
	* @category getters
	*/
	const toMillis = (self) => match$3(self, {
		onMillis: identity,
		onNanos: (nanos$1) => Number(nanos$1) / 1e6,
		onInfinity: () => Infinity
	});
	/**
	* Get the duration in nanoseconds as a bigint.
	*
	* If the duration is infinite, it throws an error.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const duration = Duration.seconds(2)
	* const nanos = Duration.toNanosUnsafe(duration)
	* console.log(nanos) // 2000000000n
	*
	* // This will throw an error
	* try {
	*   Duration.toNanosUnsafe(Duration.infinity)
	* } catch (error) {
	*   console.log((error as Error).message) // "Cannot convert infinite duration to nanos"
	* }
	* ```
	*
	* @since 2.0.0
	* @category getters
	*/
	const toNanosUnsafe = (self) => {
		switch (self.value._tag) {
			case "Infinity": throw new Error("Cannot convert infinite duration to nanos");
			case "Nanos": return self.value.nanos;
			case "Millis": return BigInt(Math.round(self.value.millis * 1e6));
		}
	};
	/**
	* Pattern matches on a Duration, providing different handlers for millis and nanos.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const result = Duration.match(Duration.seconds(5), {
	*   onMillis: (millis) => `${millis} milliseconds`,
	*   onNanos: (nanos) => `${nanos} nanoseconds`,
	*   onInfinity: () => "infinite"
	* })
	* console.log(result) // "5000 milliseconds"
	* ```
	*
	* @since 2.0.0
	* @category pattern matching
	*/
	const match$3 = /* @__PURE__ */ dual(2, (self, options) => {
		switch (self.value._tag) {
			case "Millis": return options.onMillis(self.value.millis);
			case "Nanos": return options.onNanos(self.value.nanos);
			case "Infinity": return options.onInfinity();
		}
	});
	/**
	* Pattern matches on two `Duration`s, providing handlers that receive both values.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const sum = Duration.matchPair(Duration.seconds(3), Duration.seconds(2), {
	*   onMillis: (a, b) => a + b,
	*   onNanos: (a, b) => Number(a + b),
	*   onInfinity: () => Infinity
	* })
	* console.log(sum) // 5000
	* ```
	*
	* @since 2.0.0
	* @category pattern matching
	*/
	const matchPair = /* @__PURE__ */ dual(3, (self, that, options) => {
		if (self.value._tag === "Infinity" || that.value._tag === "Infinity") return options.onInfinity(self, that);
		if (self.value._tag === "Millis") return that.value._tag === "Millis" ? options.onMillis(self.value.millis, that.value.millis) : options.onNanos(toNanosUnsafe(self), that.value.nanos);
		else return options.onNanos(self.value.nanos, toNanosUnsafe(that));
	});
	/**
	* Equivalence instance for `Duration`, allowing equality comparisons.
	*
	* Two infinite durations are considered equivalent.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const isEqual = Duration.Equivalence(Duration.seconds(5), Duration.millis(5000))
	* console.log(isEqual) // true
	* ```
	*
	* @category instances
	* @since 2.0.0
	*/
	const Equivalence = (self, that) => matchPair(self, that, {
		onMillis: (self$1, that$1) => self$1 === that$1,
		onNanos: (self$1, that$1) => self$1 === that$1,
		onInfinity: (self$1, that$1) => self$1.value._tag === that$1.value._tag
	});
	/**
	* Checks if two Durations are equal.
	*
	* @example
	* ```ts
	* import { Duration } from "effect"
	*
	* const isEqual = Duration.equals(Duration.seconds(5), Duration.millis(5000))
	* console.log(isEqual) // true
	* ```
	*
	* @since 2.0.0
	* @category predicates
	*/
	const equals = /* @__PURE__ */ dual(2, (self, that) => Equivalence(self, that));

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/ServiceMap.js
	const ServiceTypeId = "~effect/ServiceMap/Service";
	/**
	* @example
	* ```ts
	* import { ServiceMap } from "effect"
	*
	* // Create a simple service
	* const Database = ServiceMap.Service<{
	*   query: (sql: string) => string
	* }>("Database")
	*
	* // Create a service class
	* class Config extends ServiceMap.Service<Config, {
	*   port: number
	* }>()("Config") {}
	*
	* // Use the services to create service maps
	* const db = ServiceMap.make(Database, {
	*   query: (sql) => `Result: ${sql}`
	* })
	* const config = ServiceMap.make(Config, { port: 8080 })
	* ```
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const Service = function() {
		const prevLimit = Error.stackTraceLimit;
		Error.stackTraceLimit = 2;
		const err = /* @__PURE__ */ new Error();
		Error.stackTraceLimit = prevLimit;
		function KeyClass() {}
		const self = KeyClass;
		Object.setPrototypeOf(self, ServiceProto);
		Object.defineProperty(self, "stack", { get() {
			return err.stack;
		} });
		if (arguments.length > 0) {
			self.key = arguments[0];
			if (arguments[1]?.defaultValue) {
				self[ReferenceTypeId] = ReferenceTypeId;
				self.defaultValue = arguments[1].defaultValue;
			}
			return self;
		}
		return function(key, options) {
			self.key = key;
			if (options?.make) self.make = options.make;
			return self;
		};
	};
	const ServiceProto = {
		[ServiceTypeId]: {
			_Service: (_) => _,
			_Identifier: (_) => _
		},
		...PipeInspectableProto,
		...YieldableProto,
		toJSON() {
			return {
				_id: "Service",
				key: this.key,
				stack: this.stack
			};
		},
		asEffect() {
			return (this.asEffect = constant(withFiber$1((fiber) => exitSucceed(get(fiber.services, this)))))();
		},
		of(self) {
			return self;
		},
		serviceMap(self) {
			return make$4(this, self);
		}
	};
	const ReferenceTypeId = "~effect/ServiceMap/Reference";
	const TypeId$8 = "~effect/ServiceMap";
	/**
	* @example
	* ```ts
	* import { ServiceMap } from "effect"
	*
	* // Create a service map from a Map (unsafe)
	* const map = new Map([
	*   ["Logger", { log: (msg: string) => console.log(msg) }]
	* ])
	*
	* const services = ServiceMap.makeUnsafe(map)
	* ```
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const makeUnsafe$2 = (mapUnsafe) => {
		const self = Object.create(Proto);
		self.mapUnsafe = mapUnsafe;
		return self;
	};
	const Proto = {
		...PipeInspectableProto,
		[TypeId$8]: { _Services: (_) => _ },
		toJSON() {
			return {
				_id: "ServiceMap",
				services: Array.from(this.mapUnsafe).map(([key, value]) => ({
					key,
					value
				}))
			};
		},
		[symbol$1](that) {
			if (!isServiceMap(that) || this.mapUnsafe.size !== that.mapUnsafe.size) return false;
			for (const k of this.mapUnsafe.keys()) if (!that.mapUnsafe.has(k) || !equals$1(this.mapUnsafe.get(k), that.mapUnsafe.get(k))) return false;
			return true;
		},
		[symbol$2]() {
			return number$2(this.mapUnsafe.size);
		}
	};
	/**
	* Checks if the provided argument is a `ServiceMap`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	*
	* assert.strictEqual(ServiceMap.isServiceMap(ServiceMap.empty()), true)
	* ```
	*
	* @since 4.0.0
	* @category Guards
	*/
	const isServiceMap = (u) => hasProperty(u, TypeId$8);
	/**
	* Checks if the provided argument is a `Reference`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	*
	* const LoggerRef = ServiceMap.Reference("Logger", { defaultValue: () => ({ log: (msg: string) => console.log(msg) }) })
	*
	* assert.strictEqual(ServiceMap.isReference(LoggerRef), true)
	* assert.strictEqual(ServiceMap.isReference(ServiceMap.Service("Key")), false)
	* ```
	*
	* @since 4.0.0
	* @category Guards
	*/
	const isReference = (u) => hasProperty(u, ReferenceTypeId);
	/**
	* Returns an empty `ServiceMap`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	*
	* assert.strictEqual(ServiceMap.isServiceMap(ServiceMap.empty()), true)
	* ```
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const empty$3 = () => emptyServiceMap;
	const emptyServiceMap = /* @__PURE__ */ makeUnsafe$2(/* @__PURE__ */ new Map());
	/**
	* Creates a new `ServiceMap` with a single service associated to the key.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	*
	* const Port = ServiceMap.Service<{ PORT: number }>("Port")
	*
	* const Services = ServiceMap.make(Port, { PORT: 8080 })
	*
	* assert.deepStrictEqual(ServiceMap.get(Services, Port), { PORT: 8080 })
	* ```
	*
	* @since 4.0.0
	* @category Constructors
	*/
	const make$4 = (key, service$2) => makeUnsafe$2(new Map([[key.key, service$2]]));
	/**
	* Adds a service to a given `ServiceMap`.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { pipe } from "effect"
	* import { ServiceMap } from "effect"
	*
	* const Port = ServiceMap.Service<{ PORT: number }>("Port")
	* const Timeout = ServiceMap.Service<{ TIMEOUT: number }>("Timeout")
	*
	* const someServiceMap = ServiceMap.make(Port, { PORT: 8080 })
	*
	* const Services = pipe(
	*   someServiceMap,
	*   ServiceMap.add(Timeout, { TIMEOUT: 5000 })
	* )
	*
	* assert.deepStrictEqual(ServiceMap.get(Services, Port), { PORT: 8080 })
	* assert.deepStrictEqual(ServiceMap.get(Services, Timeout), { TIMEOUT: 5000 })
	* ```
	*
	* @since 4.0.0
	* @category Adders
	*/
	const add = /* @__PURE__ */ dual(3, (self, key, service$2) => {
		const map$5 = new Map(self.mapUnsafe);
		map$5.set(key.key, service$2);
		return makeUnsafe$2(map$5);
	});
	/**
	* @since 4.0.0
	* @category Adders
	*/
	const addOrOmit = /* @__PURE__ */ dual(3, (self, key, service$2) => {
		const map$5 = new Map(self.mapUnsafe);
		if (service$2._tag === "None") map$5.delete(key.key);
		else map$5.set(key.key, service$2.value);
		return makeUnsafe$2(map$5);
	});
	/**
	* Get a service from the context that corresponds to the given key.
	*
	* This function is unsafe because if the key is not present in the context, a
	* runtime error will be thrown.
	*
	* For a safer version see {@link getOption}.
	*
	* @param self - The `ServiceMap` to search for the service.
	* @param service - The `Service` of the service to retrieve.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	*
	* const Port = ServiceMap.Service<{ PORT: number }>("Port")
	* const Timeout = ServiceMap.Service<{ TIMEOUT: number }>("Timeout")
	*
	* const Services = ServiceMap.make(Port, { PORT: 8080 })
	*
	* assert.deepStrictEqual(ServiceMap.getUnsafe(Services, Port), { PORT: 8080 })
	* assert.throws(() => ServiceMap.getUnsafe(Services, Timeout))
	* ```
	*
	* @since 4.0.0
	* @category unsafe
	*/
	const getUnsafe = /* @__PURE__ */ dual(2, (self, service$2) => {
		if (!self.mapUnsafe.has(service$2.key)) {
			if (ReferenceTypeId in service$2) return getDefaultValue(service$2);
			throw serviceNotFoundError(service$2);
		}
		return self.mapUnsafe.get(service$2.key);
	});
	/**
	* Get a service from the context that corresponds to the given key.
	*
	* @param self - The `ServiceMap` to search for the service.
	* @param service - The `Service` of the service to retrieve.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { pipe } from "effect"
	* import { ServiceMap } from "effect"
	*
	* const Port = ServiceMap.Service<{ PORT: number }>("Port")
	* const Timeout = ServiceMap.Service<{ TIMEOUT: number }>("Timeout")
	*
	* const Services = pipe(
	*   ServiceMap.make(Port, { PORT: 8080 }),
	*   ServiceMap.add(Timeout, { TIMEOUT: 5000 })
	* )
	*
	* assert.deepStrictEqual(ServiceMap.get(Services, Timeout), { TIMEOUT: 5000 })
	* ```
	*
	* @since 4.0.0
	* @category Getters
	*/
	const get = getUnsafe;
	/**
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	*
	* const LoggerRef = ServiceMap.Reference("Logger", {
	*   defaultValue: () => ({ log: (msg: string) => console.log(msg) })
	* })
	*
	* const services = ServiceMap.empty()
	* const logger = ServiceMap.getReferenceUnsafe(services, LoggerRef)
	*
	* assert.deepStrictEqual(logger, { log: (msg: string) => console.log(msg) })
	* ```
	*
	* @since 4.0.0
	* @category unsafe
	*/
	const getReferenceUnsafe = (self, service$2) => {
		if (!self.mapUnsafe.has(service$2.key)) return getDefaultValue(service$2);
		return self.mapUnsafe.get(service$2.key);
	};
	const defaultValueCacheKey = "~effect/ServiceMap/defaultValue";
	const getDefaultValue = (ref) => {
		if (defaultValueCacheKey in ref) return ref[defaultValueCacheKey];
		return ref[defaultValueCacheKey] = ref.defaultValue();
	};
	const serviceNotFoundError = (service$2) => {
		const error = /* @__PURE__ */ new Error(`Service not found${service$2.key ? `: ${String(service$2.key)}` : ""}`);
		if (service$2.stack) {
			const lines = service$2.stack.split("\n");
			if (lines.length > 2) {
				const afterAt = lines[2].match(/at (.*)/);
				if (afterAt) error.message = error.message + ` (defined at ${afterAt[1]})`;
			}
		}
		if (error.stack) {
			const lines = error.stack.split("\n");
			lines.splice(1, 3);
			error.stack = lines.join("\n");
		}
		return error;
	};
	/**
	* Get the value associated with the specified key from the context wrapped in
	* an `Option` object. If the key is not found, the `Option` object will be
	* `None`.
	*
	* @param self - The `ServiceMap` to search for the service.
	* @param service - The `Service` of the service to retrieve.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	* import { Option } from "effect/data"
	*
	* const Port = ServiceMap.Service<{ PORT: number }>("Port")
	* const Timeout = ServiceMap.Service<{ TIMEOUT: number }>("Timeout")
	*
	* const Services = ServiceMap.make(Port, { PORT: 8080 })
	*
	* assert.deepStrictEqual(ServiceMap.getOption(Services, Port), Option.some({ PORT: 8080 }))
	* assert.deepStrictEqual(ServiceMap.getOption(Services, Timeout), Option.none())
	* ```
	*
	* @since 4.0.0
	* @category Getters
	*/
	const getOption = /* @__PURE__ */ dual(2, (self, service$2) => {
		if (self.mapUnsafe.has(service$2.key)) return some(self.mapUnsafe.get(service$2.key));
		return isReference(service$2) ? some(getDefaultValue(service$2)) : none();
	});
	/**
	* Merges two `ServiceMap`s, returning a new `ServiceMap` containing the services of both.
	*
	* @param self - The first `ServiceMap` to merge.
	* @param that - The second `ServiceMap` to merge.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	*
	* const Port = ServiceMap.Service<{ PORT: number }>("Port")
	* const Timeout = ServiceMap.Service<{ TIMEOUT: number }>("Timeout")
	*
	* const firstServiceMap = ServiceMap.make(Port, { PORT: 8080 })
	* const secondServiceMap = ServiceMap.make(Timeout, { TIMEOUT: 5000 })
	*
	* const Services = ServiceMap.merge(firstServiceMap, secondServiceMap)
	*
	* assert.deepStrictEqual(ServiceMap.get(Services, Port), { PORT: 8080 })
	* assert.deepStrictEqual(ServiceMap.get(Services, Timeout), { TIMEOUT: 5000 })
	* ```
	*
	* @since 4.0.0
	* @category Utils
	*/
	const merge$1 = /* @__PURE__ */ dual(2, (self, that) => {
		if (self.mapUnsafe.size === 0) return that;
		if (that.mapUnsafe.size === 0) return self;
		const map$5 = new Map(self.mapUnsafe);
		that.mapUnsafe.forEach((value, key) => map$5.set(key, value));
		return makeUnsafe$2(map$5);
	});
	/**
	* Creates a service map key with a default value.
	*
	* **Details**
	*
	* `ServiceMap.Reference` allows you to create a key that can hold a value. You
	* can provide a default value for the service, which will automatically be used
	* when the context is accessed, or override it with a custom implementation
	* when needed.
	*
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { ServiceMap } from "effect"
	*
	* // Create a reference with a default value
	* const LoggerRef = ServiceMap.Reference("Logger", {
	*   defaultValue: () => ({ log: (msg: string) => console.log(msg) })
	* })
	*
	* // The reference provides the default value when accessed from an empty context
	* const services = ServiceMap.empty()
	* const logger = ServiceMap.get(services, LoggerRef)
	*
	* // You can also override the default value
	* const customServices = ServiceMap.make(LoggerRef, { log: (msg) => `Custom: ${msg}` })
	* const customLogger = ServiceMap.get(customServices, LoggerRef)
	* ```
	*
	* @since 4.0.0
	* @category References
	*/
	const Reference = Service;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Scheduler.js
/**
	* @since 4.0.0
	* @category references
	*/
	const Scheduler = /* @__PURE__ */ Reference("effect/Scheduler", { defaultValue: () => new MixedScheduler() });
	const setImmediate = "setImmediate" in globalThis ? (f) => {
		const timer = globalThis.setImmediate(f);
		return () => globalThis.clearImmediate(timer);
	} : (f) => {
		const timer = setTimeout(f, 0);
		return () => clearTimeout(timer);
	};
	/**
	* The default scheduler implementation that provides efficient task scheduling
	* with support for both synchronous and asynchronous execution modes.
	*
	* Features:
	* - Batches tasks for efficient execution
	* - Supports priority-based task scheduling
	* - Configurable execution mode (sync/async)
	* - Automatic yielding based on operation count
	* - Optimized for high-throughput scenarios
	*
	* @example
	* ```ts
	* import { MixedScheduler } from "effect/Scheduler"
	*
	* // Create a mixed scheduler with async execution (default)
	* const asyncScheduler = new MixedScheduler("async")
	*
	* // Create a mixed scheduler with sync execution
	* const syncScheduler = new MixedScheduler("sync")
	*
	* // Schedule tasks with different priorities
	* asyncScheduler.scheduleTask(() => console.log("High priority task"), 10)
	* asyncScheduler.scheduleTask(() => console.log("Normal priority task"), 0)
	* asyncScheduler.scheduleTask(() => console.log("Low priority task"), -1)
	*
	* // For sync scheduler, you can flush tasks immediately
	* syncScheduler.scheduleTask(() => console.log("Task 1"), 0)
	* syncScheduler.scheduleTask(() => console.log("Task 2"), 0)
	*
	* // Force flush all pending tasks in sync mode
	* syncScheduler.flush()
	* // Output: "Task 1", "Task 2"
	*
	* // Check execution mode
	* console.log(asyncScheduler.executionMode) // "async"
	* console.log(syncScheduler.executionMode) // "sync"
	* ```
	*
	* @since 2.0.0
	* @category schedulers
	*/
	var MixedScheduler = class {
		tasks = [];
		running = void 0;
		executionMode;
		constructor(executionMode = "async") {
			this.executionMode = executionMode;
		}
		/**
		* @since 2.0.0
		*/
		scheduleTask(task, _priority) {
			this.tasks.push(task);
			if (this.running === void 0) this.running = setImmediate(this.afterScheduled);
		}
		/**
		* @since 2.0.0
		*/
		afterScheduled = () => {
			this.running = void 0;
			this.runTasks();
		};
		/**
		* @since 2.0.0
		*/
		runTasks() {
			const tasks = this.tasks;
			this.tasks = [];
			for (let i = 0, len = tasks.length; i < len; i++) tasks[i]();
		}
		/**
		* @since 2.0.0
		*/
		shouldYield(fiber) {
			return fiber.currentOpCount >= fiber.maxOpsBeforeYield;
		}
		/**
		* @since 2.0.0
		*/
		flush() {
			while (this.tasks.length > 0) {
				if (this.running !== void 0) {
					this.running();
					this.running = void 0;
				}
				this.runTasks();
			}
		}
	};
	/**
	* A service reference that controls the maximum number of operations a fiber
	* can perform before yielding control back to the scheduler. This helps
	* prevent long-running fibers from monopolizing the execution thread.
	*
	* The default value is 2048 operations, which provides a good balance between
	* performance and fairness in concurrent execution.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { MaxOpsBeforeYield } from "effect/Scheduler"
	*
	* // Configure a fiber to yield more frequently
	* const program = Effect.gen(function* () {
	*   // Get current max ops setting (default is 2048)
	*   const currentMax = yield* MaxOpsBeforeYield
	*   yield* Effect.log(`Default max ops before yield: ${currentMax}`)
	*
	*   // Run with reduced max ops for more frequent yielding
	*   return yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const maxOps = yield* MaxOpsBeforeYield
	*       yield* Effect.log(`Max ops before yield: ${maxOps}`)
	*
	*       // Run a compute-intensive task that will yield frequently
	*       let result = 0
	*       for (let i = 0; i < 10000; i++) {
	*         result += i
	*         // This will cause yielding every 100 operations
	*         yield* Effect.sync(() => result)
	*       }
	*       return result
	*     }),
	*     MaxOpsBeforeYield,
	*     100
	*   )
	* })
	*
	* // Configure for high-performance scenarios
	* const highPerformanceProgram = Effect.gen(function* () {
	*   // Run with increased max ops for better performance (less yielding)
	*   return yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const maxOps = yield* MaxOpsBeforeYield
	*       yield* Effect.log(`High-performance max ops: ${maxOps}`)
	*
	*       // Run multiple concurrent tasks
	*       const tasks = Array.from({ length: 100 }, (_, i) =>
	*         Effect.gen(function* () {
	*           yield* Effect.sleep(`${i * 10} millis`)
	*           return `Task ${i} completed`
	*         })
	*       )
	*
	*       return yield* Effect.all(tasks, { concurrency: "unbounded" })
	*     }),
	*     MaxOpsBeforeYield,
	*     10000
	*   )
	* })
	*
	* // Configure for fair scheduling
	* const fairSchedulingProgram = Effect.gen(function* () {
	*   // Run with lower max ops for more frequent yielding
	*   return yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const maxOps = yield* MaxOpsBeforeYield
	*       yield* Effect.log(`Fair scheduling max ops: ${maxOps}`)
	*
	*       const longRunningTask = Effect.gen(function* () {
	*         for (let i = 0; i < 1000; i++) {
	*           yield* Effect.sync(() => Math.random())
	*         }
	*         return "Long task completed"
	*       })
	*
	*       const quickTask = Effect.gen(function* () {
	*         yield* Effect.sleep("10 millis")
	*         return "Quick task completed"
	*       })
	*
	*       // Both tasks will execute fairly due to frequent yielding
	*       return yield* Effect.all([longRunningTask, quickTask], {
	*         concurrency: "unbounded"
	*       })
	*     }),
	*     MaxOpsBeforeYield,
	*     50
	*   )
	* })
	* ```
	*
	* @since 4.0.0
	* @category references
	*/
	const MaxOpsBeforeYield = /* @__PURE__ */ Reference("effect/Scheduler/MaxOpsBeforeYield", { defaultValue: () => 2048 });

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Tracer.js
/**
	* @since 2.0.0
	* @category tags
	* @example
	* ```ts
	* import { Tracer } from "effect"
	*
	* // The key used to identify parent spans in the service map
	* console.log(Tracer.ParentSpanKey) // "effect/Tracer/ParentSpan"
	* ```
	*/
	const ParentSpanKey = "effect/Tracer/ParentSpan";
	/**
	* @since 2.0.0
	* @category tags
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Tracer } from "effect"
	*
	* // Access the parent span from the context
	* const program = Effect.gen(function* () {
	*   const parentSpan = yield* Effect.service(Tracer.ParentSpan)
	*   console.log(`Parent span: ${parentSpan.spanId}`)
	* })
	* ```
	*/
	var ParentSpan = class extends Service()(ParentSpanKey) {};
	/**
	* @since 2.0.0
	* @category constructors
	* @example
	* ```ts
	* import { Tracer } from "effect"
	* import { ServiceMap } from "effect"
	* import { Option } from "effect/data"
	*
	* // Create a custom tracer with logging
	* const loggingTracer = Tracer.make({
	*   span: (name, parent, context, links, startTime, kind) => {
	*     console.log(`Starting span: ${name} (${kind})`)
	*     return new Tracer.NativeSpan(name, parent, context, links, startTime, kind)
	*   },
	*   context: (f, fiber) => {
	*     console.log("Executing with tracer context")
	*     return f()
	*   }
	* })
	* ```
	*/
	const make$3 = (options) => options;
	/**
	* @since 3.12.0
	* @category references
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Tracer } from "effect"
	*
	* // Disable span propagation for a specific effect
	* const program = Effect.gen(function* () {
	*   yield* Effect.log("This will not propagate parent span")
	* }).pipe(
	*   Effect.provideService(Tracer.DisablePropagation, true)
	* )
	* ```
	*/
	const DisablePropagation = /* @__PURE__ */ Reference("effect/Tracer/DisablePropagation", { defaultValue: constFalse });
	/**
	* @since 4.0.0
	* @category references
	*/
	const TracerKey = "effect/Tracer";
	/**
	* @since 4.0.0
	* @category references
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Tracer } from "effect"
	*
	* // Access the current tracer from the context
	* const program = Effect.gen(function* () {
	*   const tracer = yield* Effect.service(Tracer.Tracer)
	*   console.log("Using current tracer")
	* })
	*
	* // Or use the built-in tracer effect
	* const tracerEffect = Effect.gen(function* () {
	*   const tracer = yield* Effect.tracer
	*   console.log("Current tracer obtained")
	* })
	* ```
	*/
	const Tracer = /* @__PURE__ */ Reference(TracerKey, { defaultValue: () => make$3({ span: (name, parent, context, links, startTime, kind) => new NativeSpan(name, parent, context, links, startTime, kind) }) });
	/**
	* @since 4.0.0
	* @category native tracer
	* @example
	* ```ts
	* import { Tracer } from "effect"
	* import { ServiceMap } from "effect"
	* import { Option } from "effect/data"
	*
	* // Create a native span directly
	* const span = new Tracer.NativeSpan(
	*   "my-operation",
	*   undefined,
	*   ServiceMap.empty(),
	*   [],
	*   BigInt(Date.now() * 1000000),
	*   "internal"
	* )
	*
	* // Use the span
	* span.attribute("user.id", "123")
	* span.event("checkpoint", BigInt(Date.now() * 1000000))
	* ```
	*/
	var NativeSpan = class {
		_tag = "Span";
		spanId;
		traceId = "native";
		sampled = true;
		name;
		parent;
		context;
		links;
		startTime;
		kind;
		status;
		attributes;
		events = [];
		constructor(name, parent, context, links, startTime, kind) {
			this.name = name;
			this.parent = parent;
			this.context = context;
			this.links = links;
			this.startTime = startTime;
			this.kind = kind;
			this.status = {
				_tag: "Started",
				startTime
			};
			this.attributes = /* @__PURE__ */ new Map();
			this.traceId = parent ? parent.traceId : randomHexString(32);
			this.spanId = randomHexString(16);
		}
		end(endTime, exit$2) {
			this.status = {
				_tag: "Ended",
				endTime,
				exit: exit$2,
				startTime: this.status.startTime
			};
		}
		attribute(key, value) {
			this.attributes.set(key, value);
		}
		event(name, startTime, attributes) {
			this.events.push([
				name,
				startTime,
				attributes ?? {}
			]);
		}
	};
	const randomHexString = /* @__PURE__ */ function() {
		const characters = "abcdef0123456789";
		const charactersLength = 16;
		return function(length) {
			let result$2 = "";
			for (let i = 0; i < length; i++) result$2 += characters.charAt(Math.floor(Math.random() * charactersLength));
			return result$2;
		};
	}();

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/References.js
/**
	* Reference for controlling the current concurrency limit. Can be set to "unbounded"
	* for unlimited concurrency or a specific number to limit concurrent operations.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { References } from "effect"
	*
	* const limitConcurrency = Effect.gen(function* () {
	*   // Get current setting
	*   const current = yield* References.CurrentConcurrency
	*   console.log(current) // "unbounded" (default)
	*
	*   // Run with limited concurrency
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const limited = yield* References.CurrentConcurrency
	*       console.log(limited) // 10
	*     }),
	*     References.CurrentConcurrency,
	*     10
	*   )
	*
	*   // Run with unlimited concurrency
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const unlimited = yield* References.CurrentConcurrency
	*       console.log(unlimited) // "unbounded"
	*     }),
	*     References.CurrentConcurrency,
	*     "unbounded"
	*   )
	* })
	* ```
	*
	* @category references
	* @since 4.0.0
	*/
	const CurrentConcurrency = /* @__PURE__ */ Reference("effect/References/CurrentConcurrency", { defaultValue: () => "unbounded" });
	/**
	* Reference for controlling whether tracing is enabled globally. When set to false,
	* spans will not be registered with the tracer and tracing overhead is minimized.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { References } from "effect"
	*
	* const tracingControl = Effect.gen(function* () {
	*   // Check if tracing is enabled (default is true)
	*   const current = yield* References.TracerEnabled
	*   console.log(current) // true
	*
	*   // Disable tracing globally
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const isEnabled = yield* References.TracerEnabled
	*       console.log(isEnabled) // false
	*
	*       // Spans will not be traced in this context
	*       yield* Effect.log("This will not be traced")
	*     }),
	*     References.TracerEnabled,
	*     false
	*   )
	*
	*   // Re-enable tracing
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const isEnabled = yield* References.TracerEnabled
	*       console.log(isEnabled) // true
	*
	*       // All subsequent spans will be traced
	*       yield* Effect.log("This will be traced")
	*     }),
	*     References.TracerEnabled,
	*     true
	*   )
	* })
	* ```
	*
	* @since 4.0.0
	* @category references
	*/
	const TracerEnabled = /* @__PURE__ */ Reference("effect/References/TracerEnabled", { defaultValue: constTrue });
	/**
	* Reference for managing span annotations that are automatically added to all new spans.
	* These annotations provide context and metadata that applies across multiple spans.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { References } from "effect"
	*
	* const spanAnnotationExample = Effect.gen(function* () {
	*   // Get current annotations (empty by default)
	*   const current = yield* References.TracerSpanAnnotations
	*   console.log(current) // {}
	*
	*   // Set global span annotations
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       // Get current annotations
	*       const annotations = yield* References.TracerSpanAnnotations
	*       console.log(annotations) // { service: "user-service", version: "1.2.3", environment: "production" }
	*
	*       // All spans created will include these annotations
	*       yield* Effect.gen(function* () {
	*         // Add more specific annotations for this span
	*         yield* Effect.annotateCurrentSpan("userId", "123")
	*         yield* Effect.log("Processing user")
	*       })
	*     }),
	*     References.TracerSpanAnnotations,
	*     {
	*       service: "user-service",
	*       version: "1.2.3",
	*       environment: "production"
	*     }
	*   )
	*
	*   // Clear annotations
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const annotations = yield* References.TracerSpanAnnotations
	*       console.log(annotations) // {}
	*     }),
	*     References.TracerSpanAnnotations,
	*     {}
	*   )
	* })
	* ```
	*
	* @since 4.0.0
	* @category references
	*/
	const TracerSpanAnnotations = /* @__PURE__ */ Reference("effect/References/TracerSpanAnnotations", { defaultValue: () => ({}) });
	/**
	* Reference for managing span links that are automatically added to all new spans.
	* Span links connect related spans that are not in a parent-child relationship.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { References } from "effect"
	* import { Tracer } from "effect"
	*
	* const spanLinksExample = Effect.gen(function* () {
	*   // Get current links (empty by default)
	*   const current = yield* References.TracerSpanLinks
	*   console.log(current.length) // 0
	*
	*   // Create an external span for the example
	*   const externalSpan = Tracer.externalSpan({
	*     spanId: "external-span-123",
	*     traceId: "trace-456"
	*   })
	*
	*   // Create span links
	*   const spanLink: Tracer.SpanLink = {
	*     span: externalSpan,
	*     attributes: {
	*       relationship: "follows-from",
	*       priority: "high"
	*     }
	*   }
	*
	*   // Set global span links
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       // Get current links
	*       const links = yield* References.TracerSpanLinks
	*       console.log(links.length) // 1
	*
	*       // All new spans will include these links
	*       yield* Effect.gen(function* () {
	*         yield* Effect.log("This span will have linked spans")
	*         return "operation complete"
	*       })
	*     }),
	*     References.TracerSpanLinks,
	*     [spanLink]
	*   )
	*
	*   // Clear links
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const links = yield* References.TracerSpanLinks
	*       console.log(links.length) // 0
	*     }),
	*     References.TracerSpanLinks,
	*     []
	*   )
	* })
	* ```
	*
	* @since 4.0.0
	* @category references
	*/
	const TracerSpanLinks = /* @__PURE__ */ Reference("effect/References/TracerSpanLinks", { defaultValue: () => [] });
	/**
	* Reference for managing log annotations that are automatically added to all log entries.
	* These annotations provide contextual metadata that appears in every log message.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { References } from "effect"
	* import { Console } from "effect"
	*
	* const logAnnotationExample = Effect.gen(function* () {
	*   // Get current annotations (empty by default)
	*   const current = yield* References.CurrentLogAnnotations
	*   console.log(current) // {}
	*
	*   // Run with custom log annotations
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const annotations = yield* References.CurrentLogAnnotations
	*       console.log(annotations) // { requestId: "req-123", userId: "user-456", version: "1.0.0" }
	*
	*       // All log entries will include these annotations
	*       yield* Console.log("Starting operation")
	*       yield* Console.info("Processing data")
	*     }),
	*     References.CurrentLogAnnotations,
	*     {
	*       requestId: "req-123",
	*       userId: "user-456",
	*       version: "1.0.0"
	*     }
	*   )
	*
	*   // Run with extended annotations
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const extended = yield* References.CurrentLogAnnotations
	*       console.log(extended) // { requestId: "req-123", userId: "user-456", version: "1.0.0", operation: "data-sync", timestamp: 1234567890 }
	*
	*       yield* Console.log("Operation completed with extended context")
	*     }),
	*     References.CurrentLogAnnotations,
	*     {
	*       requestId: "req-123",
	*       userId: "user-456",
	*       version: "1.0.0",
	*       operation: "data-sync",
	*       timestamp: 1234567890
	*     }
	*   )
	* })
	* ```
	*
	* @since 4.0.0
	* @category references
	*/
	const CurrentLogAnnotations = /* @__PURE__ */ Reference("effect/References/CurrentLogAnnotations", { defaultValue: () => ({}) });
	/**
	* Reference for controlling the current log level for dynamic filtering.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { References } from "effect"
	* import { Console } from "effect"
	*
	* const dynamicLogging = Effect.gen(function* () {
	*   // Get current log level (default is "Info")
	*   const current = yield* References.CurrentLogLevel
	*   console.log(current) // "Info"
	*
	*   // Set log level to Debug for detailed logging
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const level = yield* References.CurrentLogLevel
	*       console.log(level) // "Debug"
	*       yield* Console.debug("This debug message will be shown")
	*     }),
	*     References.CurrentLogLevel,
	*     "Debug"
	*   )
	*
	*   // Change to Error level to reduce noise
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const level = yield* References.CurrentLogLevel
	*       console.log(level) // "Error"
	*       yield* Console.info("This info message will be filtered out")
	*       yield* Console.error("This error message will be shown")
	*     }),
	*     References.CurrentLogLevel,
	*     "Error"
	*   )
	* })
	* ```
	*
	* @category references
	* @since 4.0.0
	*/
	const CurrentLogLevel = /* @__PURE__ */ Reference("effect/References/CurrentLogLevel", { defaultValue: () => "Info" });
	/**
	* Reference for managing log spans that track the duration and hierarchy of operations.
	* Each span represents a labeled time period for performance analysis and debugging.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { References } from "effect"
	* import { Console } from "effect"
	*
	* const logSpanExample = Effect.gen(function* () {
	*   // Get current spans (empty by default)
	*   const current = yield* References.CurrentLogSpans
	*   console.log(current.length) // 0
	*
	*   // Add a log span manually
	*   const startTime = Date.now()
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       // Simulate some work
	*       yield* Effect.sleep("100 millis")
	*       yield* Console.log("Database operation in progress")
	*
	*       const spans = yield* References.CurrentLogSpans
	*       console.log("Active spans:", spans.map(([label]) => label)) // ["database-connection"]
	*     }),
	*     References.CurrentLogSpans,
	*     [["database-connection", startTime]]
	*   )
	*
	*   // Add another span
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const spans = yield* References.CurrentLogSpans
	*       console.log("Active spans:", spans.map(([label]) => label)) // ["database-connection", "data-processing"]
	*
	*       yield* Console.log("Multiple operations in progress")
	*     }),
	*     References.CurrentLogSpans,
	*     [
	*       ["database-connection", startTime],
	*       ["data-processing", Date.now()]
	*     ]
	*   )
	*
	*   // Clear spans when operations complete
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const spans = yield* References.CurrentLogSpans
	*       console.log("Active spans:", spans.length) // 0
	*     }),
	*     References.CurrentLogSpans,
	*     []
	*   )
	* })
	* ```
	*
	* @since 4.0.0
	* @category references
	*/
	const CurrentLogSpans = /* @__PURE__ */ Reference("effect/References/CurrentLogSpans", { defaultValue: () => [] });
	/**
	* Reference for setting the minimum log level threshold. Log entries below this
	* level will be filtered out completely.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { References } from "effect"
	* import { Console } from "effect"
	*
	* const configureMinimumLogging = Effect.gen(function* () {
	*   // Get current minimum level (default is "Info")
	*   const current = yield* References.MinimumLogLevel
	*   console.log(current) // "Info"
	*
	*   // Set minimum level to Warn - Debug and Info will be filtered
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const minLevel = yield* References.MinimumLogLevel
	*       console.log(minLevel) // "Warn"
	*
	*       // These won't be processed at all
	*       yield* Console.debug("Debug message") // Filtered out
	*       yield* Console.info("Info message")   // Filtered out
	*
	*       // These will be processed
	*       yield* Console.warn("Warning message") // Shown
	*       yield* Console.error("Error message") // Shown
	*     }),
	*     References.MinimumLogLevel,
	*     "Warn"
	*   )
	*
	*   // Reset to default Info level
	*   yield* Effect.provideService(
	*     Effect.gen(function* () {
	*       const minLevel = yield* References.MinimumLogLevel
	*       console.log(minLevel) // "Info"
	*
	*       // Now info messages will be processed
	*       yield* Console.info("Info message") // Shown
	*     }),
	*     References.MinimumLogLevel,
	*     "Info"
	*   )
	* })
	* ```
	*
	* @category references
	* @since 4.0.0
	*/
	const MinimumLogLevel = /* @__PURE__ */ Reference("effect/References/MinimumLogLevel", { defaultValue: () => "Info" });

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/metric.js
/** @internal */
	const FiberRuntimeMetricsKey = "effect/observability/Metric/FiberRuntimeMetricsKey";

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/tracer.js
/** @internal */
	const addSpanStackTrace = (options) => {
		if (options?.captureStackTrace === false) return options;
		else if (options?.captureStackTrace !== void 0 && typeof options.captureStackTrace !== "boolean") return options;
		const limit = Error.stackTraceLimit;
		Error.stackTraceLimit = 3;
		const traceError = /* @__PURE__ */ new Error();
		Error.stackTraceLimit = limit;
		let cache = false;
		return {
			...options,
			captureStackTrace: () => {
				if (cache !== false) return cache;
				if (traceError.stack !== void 0) {
					const stack = traceError.stack.split("\n");
					if (stack[3] !== void 0) {
						cache = stack[3].trim();
						return cache;
					}
				}
			}
		};
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/effect.js
/** @internal */
	var Interrupt = class Interrupt extends FailureBase {
		fiberId;
		constructor(fiberId, annotations$1 = constEmptyAnnotations) {
			super("Interrupt", annotations$1, "Interrupted");
			this.fiberId = fiberId;
		}
		toString() {
			return `Interrupt(${this.fiberId})`;
		}
		toJSON() {
			return {
				_tag: "Interrupt",
				fiberId: this.fiberId
			};
		}
		annotate(key, value, options) {
			if (options?.overwrite !== true && this.annotations.has(key.key)) return this;
			return new Interrupt(this.fiberId, new Map([...this.annotations, [key.key, value]]));
		}
		[symbol$1](that) {
			return failureIsInterrupt$1(that) && this.fiberId === that.fiberId && this.annotations === that.annotations;
		}
		[symbol$2]() {
			return combine(string$1(`${this._tag}:${this.fiberId}`))(random(this.annotations));
		}
	};
	/** @internal */
	const failureInterrupt$1 = (fiberId) => new Interrupt(fiberId);
	/** @internal */
	const causeInterrupt = (fiberId) => new CauseImpl([new Interrupt(fiberId)]);
	/** @internal */
	const causeHasFail = (self) => self.failures.some(failureIsFail$1);
	/** @internal */
	const causeFilterFail = (self) => {
		const failure = self.failures.find(failureIsFail$1);
		return failure ? failure : fail$4(self);
	};
	/** @internal */
	const causeFilterError = (self) => {
		for (let i = 0; i < self.failures.length; i++) {
			const failure = self.failures[i];
			if (failure._tag === "Fail") return failure.error;
		}
		return fail$4(self);
	};
	/** @internal */
	const causeHasDie = (self) => self.failures.some(failureIsDie$1);
	/** @internal */
	const causeFilterDie = (self) => {
		const failure = self.failures.find(failureIsDie$1);
		return failure ? failure : fail$4(self);
	};
	/** @internal */
	const causeFilterDefect = (self) => {
		const failure = self.failures.find(failureIsDie$1);
		return failure ? failure.defect : fail$4(self);
	};
	/** @internal */
	const causeHasInterrupt = (self) => self.failures.some(failureIsInterrupt$1);
	/** @internal */
	const causeFilterInterrupt = (self) => {
		const failure = self.failures.find(failureIsInterrupt$1);
		return failure ? failure : fail$4(self);
	};
	/** @internal */
	const causeFilterInterruptors = (self) => {
		let interruptors$1;
		for (let i = 0; i < self.failures.length; i++) {
			const f = self.failures[i];
			if (f._tag !== "Interrupt") continue;
			interruptors$1 ??= /* @__PURE__ */ new Set();
			if (f.fiberId !== void 0) interruptors$1.add(f.fiberId);
		}
		return interruptors$1 ? interruptors$1 : fail$4(self);
	};
	/** @internal */
	const causeInterruptors = (self) => {
		const result$2 = causeFilterInterruptors(self);
		return isFail(result$2) ? emptySet : result$2;
	};
	const emptySet = /* @__PURE__ */ new Set();
	/** @internal */
	const causeIsInterruptedOnly = (self) => self.failures.every(failureIsInterrupt$1);
	/** @internal */
	const failureIsInterrupt$1 = (self) => isTagged(self, "Interrupt");
	/** @internal */
	const failureAnnotations$1 = (self) => makeUnsafe$2(self.annotations);
	/** @internal */
	const causeAnnotations = (self) => {
		const map$5 = /* @__PURE__ */ new Map();
		for (const f of self.failures) if (f.annotations.size > 0) for (const [key, value] of f.annotations) map$5.set(key, value);
		return makeUnsafe$2(map$5);
	};
	/** @internal */
	const causeMerge = /* @__PURE__ */ dual(2, (self, that) => {
		const newCause = new CauseImpl(union(self.failures, that.failures));
		return equals$1(self, newCause) ? self : newCause;
	});
	/** @internal */
	const causeMap = /* @__PURE__ */ dual(2, (self, f) => {
		let hasFail$2 = false;
		const failures = self.failures.map((failure) => {
			if (failureIsFail$1(failure)) {
				hasFail$2 = true;
				return new Fail(f(failure.error));
			}
			return failure;
		});
		return hasFail$2 ? causeFromFailures(failures) : self;
	});
	/** @internal */
	const causePartition = (self) => {
		const obj = {
			Fail: [],
			Die: [],
			Interrupt: []
		};
		for (let i = 0; i < self.failures.length; i++) obj[self.failures[i]._tag].push(self.failures[i]);
		return obj;
	};
	/** @internal */
	const causeSquash = (self) => {
		const partitioned = causePartition(self);
		if (partitioned.Fail.length > 0) return partitioned.Fail[0].error;
		else if (partitioned.Die.length > 0) return partitioned.Die[0].defect;
		else if (partitioned.Interrupt.length > 0) return new globalThis.Error("All fibers interrupted without error");
		return new globalThis.Error("Empty cause");
	};
	/** @internal */
	const causePrettyErrors = (self) => {
		const errors = [];
		const interrupts = [];
		if (self.failures.length === 0) return errors;
		const prevStackLimit = Error.stackTraceLimit;
		Error.stackTraceLimit = 1;
		for (const failure of self.failures) {
			if (failure._tag === "Interrupt") {
				interrupts.push(failure);
				continue;
			}
			errors.push(causePrettyError(failure._tag === "Die" ? failure.defect : failure.error, failure.annotations));
		}
		if (errors.length === 0) {
			const cause = /* @__PURE__ */ new Error("The fiber was interrupted by:");
			cause.name = "InterruptCause";
			cause.stack = interruptCauseStack(cause, interrupts);
			const error = new globalThis.Error("All fibers interrupted without error", { cause });
			error.name = "InterruptError";
			error.stack = `${error.name}: ${error.message}`;
			errors.push(causePrettyError(error, interrupts[0].annotations));
		}
		Error.stackTraceLimit = prevStackLimit;
		return errors;
	};
	const causePrettyError = (original, annotations$1) => {
		const kind = typeof original;
		let error;
		if (original && kind === "object") {
			error = new globalThis.Error(causePrettyMessage(original), { cause: original.cause ? causePrettyError(original.cause) : void 0 });
			if (typeof original.name === "string") error.name = original.name;
			if (typeof original.stack === "string") error.stack = cleanErrorStack(original.stack, error, annotations$1);
			else {
				const stack = `${error.name}: ${error.message}`;
				error.stack = annotations$1 ? addStackAnnotations(stack, annotations$1) : stack;
			}
			for (const key of Object.keys(original)) if (!(key in error)) error[key] = original[key];
		} else error = new globalThis.Error(!original ? `Unknown error: ${original}` : kind === "string" ? original : formatJson(original));
		return error;
	};
	/** @internal */
	const causePrettyMessage = (u) => {
		if (typeof u.message === "string") return u.message;
		else if (typeof u.toString === "function" && u.toString !== Object.prototype.toString && u.toString !== Array.prototype.toString) try {
			return u.toString();
		} catch {}
		return formatJson(u);
	};
	const locationRegex = /\((.*)\)/g;
	const cleanErrorStack = (stack, error, annotations$1) => {
		const message = `${error.name}: ${error.message}`;
		const lines = (stack.startsWith(message) ? stack.slice(message.length) : stack).split("\n");
		const out = [message];
		for (let i = 1; i < lines.length; i++) {
			if (/(?:Generator\.next|~effect\/Effect)/.test(lines[i])) break;
			out.push(lines[i]);
		}
		return annotations$1 ? addStackAnnotations(out.join("\n"), annotations$1) : out.join("\n");
	};
	const addStackAnnotations = (stack, annotations$1) => {
		const callsiteStack = annotations$1?.get(callsiteErrorKey.key)?.stack;
		if (callsiteStack) stack = `${stack}\n${callsiteStack.split("\n")[2]}`;
		const defStack = annotations$1?.get(defErrorKey.key)?.stack;
		if (defStack) stack = `${stack}\n${defStack.split("\n")[2]}`;
		const span = annotations$1?.get(CurrentSpanKey.key);
		if (span) stack = `${stack}\n${currentSpanStack(span)}`;
		return stack;
	};
	const interruptCauseStack = (error, interrupts) => {
		const out = [`${error.name}: ${error.message}`];
		for (const current of interrupts) {
			const fiberId = current.fiberId !== void 0 ? `#${current.fiberId}` : "unknown";
			const span = current.annotations.get(InterruptorSpanKey.key);
			out.push(`    at fiber (${fiberId})`);
			if (span) out.push(currentSpanStack(span));
		}
		return out.join("\n");
	};
	const currentSpanStack = (span) => {
		const out = [];
		let current = span;
		let i = 0;
		while (current && current._tag === "Span" && i < 10) {
			const stack = spanToTrace.get(current)?.();
			if (stack) {
				const locationMatchAll = stack.matchAll(locationRegex);
				let match$4 = false;
				for (const [, location] of locationMatchAll) {
					match$4 = true;
					out.push(`    at ${current.name} (${location})`);
				}
				if (!match$4) out.push(`    at ${current.name} (${stack.replace(/^at /, "")})`);
			} else out.push(`    at ${current.name}`);
			current = current.parent;
			i++;
		}
		return out.join("\n");
	};
	/** @internal */
	const causePretty = (cause) => causePrettyErrors(cause).map((e) => e.cause ? `${e.stack} {\n${renderErrorCause(e.cause, "  ")}\n}` : e.stack).join("\n");
	const renderErrorCause = (cause, prefix) => {
		const lines = cause.stack.split("\n");
		let stack = `${prefix}[cause]: ${lines[0]}`;
		for (let i = 1, len = lines.length; i < len; i++) stack += `\n${prefix}${lines[i]}`;
		if (cause.cause) stack += ` {\n${renderErrorCause(cause.cause, `${prefix}  `)}\n${prefix}}`;
		return stack;
	};
	/** @internal */
	const FiberTypeId = `~effect/Fiber/${version}`;
	const fiberVariance = {
		_A: identity,
		_E: identity
	};
	const fiberIdStore = { id: 0 };
	/** @internal */
	const getCurrentFiber = () => globalThis[currentFiberTypeId];
	const keepAlive = /* @__PURE__ */ (() => {
		let count = 0;
		let running = void 0;
		return {
			increment() {
				count++;
				running ??= globalThis.setInterval(constVoid, 2147483647);
			},
			decrement() {
				count--;
				if (count === 0 && running !== void 0) {
					globalThis.clearInterval(running);
					running = void 0;
				}
			}
		};
	})();
	/** @internal */
	var FiberImpl = class {
		constructor(services$2, interruptible$2 = true) {
			this[FiberTypeId] = fiberVariance;
			this.setServices(services$2);
			this.id = ++fiberIdStore.id;
			this.currentOpCount = 0;
			this.currentLoopCount = 0;
			this.interruptible = interruptible$2;
			this._stack = [];
			this._observers = [];
			this._exit = void 0;
			this._children = void 0;
			this._interruptedCause = void 0;
			this._yielded = void 0;
		}
		[FiberTypeId];
		id;
		interruptible;
		currentOpCount;
		currentLoopCount;
		_stack;
		_observers;
		_exit;
		_currentExit;
		_children;
		_interruptedCause;
		_yielded;
		services;
		currentScheduler;
		currentTracerContext;
		currentSpan;
		runtimeMetrics;
		maxOpsBeforeYield;
		getRef(ref) {
			return getReferenceUnsafe(this.services, ref);
		}
		addObserver(cb) {
			if (this._exit) {
				cb(this._exit);
				return constVoid;
			}
			this._observers.push(cb);
			return () => {
				const index = this._observers.indexOf(cb);
				if (index >= 0) this._observers.splice(index, 1);
			};
		}
		interruptUnsafe(fiberId, span) {
			if (this._exit) return;
			let cause = causeInterrupt(fiberId);
			if (this.currentSpanLocal) cause = causeAnnotate(cause, CurrentSpanKey, this.currentSpan);
			if (span) cause = causeAnnotate(cause, InterruptorSpanKey, span);
			this._interruptedCause = this._interruptedCause ? causeMerge(this._interruptedCause, cause) : cause;
			if (this.interruptible) this.evaluate(failCause$3(this._interruptedCause));
		}
		pollUnsafe() {
			return this._exit;
		}
		evaluate(effect) {
			this.runtimeMetrics?.recordFiberStart(this.services);
			if (this._exit) return;
			else if (this._yielded !== void 0) {
				const yielded = this._yielded;
				this._yielded = void 0;
				yielded();
			}
			const exit$2 = this.runLoop(effect);
			if (exit$2 === Yield) return;
			const interruptChildren = fiberMiddleware.interruptChildren && fiberMiddleware.interruptChildren(this);
			if (interruptChildren !== void 0) return this.evaluate(flatMap$3(interruptChildren, () => exit$2));
			this._exit = exit$2;
			this.runtimeMetrics?.recordFiberEnd(this.services, this._exit);
			for (let i = 0; i < this._observers.length; i++) this._observers[i](exit$2);
			this._observers.length = 0;
		}
		runLoop(effect) {
			const prevFiber = globalThis[currentFiberTypeId];
			globalThis[currentFiberTypeId] = this;
			let yielding = false;
			let current = effect;
			this.currentOpCount = 0;
			const currentLoop = ++this.currentLoopCount;
			try {
				while (true) {
					this.currentOpCount++;
					if (!yielding && this.currentScheduler.shouldYield(this)) {
						yielding = true;
						const prev = current;
						current = flatMap$3(yieldNow$1, () => prev);
					}
					current = this.currentTracerContext ? this.currentTracerContext(() => current[evaluate](this), this) : current[evaluate](this);
					if (currentLoop !== this.currentLoopCount) return Yield;
					else if (current === Yield) {
						const yielded = this._yielded;
						if (ExitTypeId in yielded) {
							this._yielded = void 0;
							return yielded;
						}
						return Yield;
					}
				}
			} catch (error) {
				if (!hasProperty(current, evaluate)) return exitDie(`Fiber.runLoop: Not a valid effect: ${String(current)}`);
				return this.runLoop(exitDie(error));
			} finally {
				globalThis[currentFiberTypeId] = prevFiber;
			}
		}
		getCont(symbol$3) {
			while (true) {
				const op = this._stack.pop();
				if (!op) return void 0;
				const cont = op[contAll] && op[contAll](this);
				if (cont) return { [symbol$3]: cont };
				if (op[symbol$3]) return op;
			}
		}
		yieldWith(value) {
			this._yielded = value;
			return Yield;
		}
		children() {
			return this._children ??= /* @__PURE__ */ new Set();
		}
		pipe() {
			return pipeArguments(this, arguments);
		}
		setServices(services$2) {
			this.services = services$2;
			this.currentScheduler = this.getRef(Scheduler);
			this.currentSpan = services$2.mapUnsafe.get(ParentSpanKey);
			this.maxOpsBeforeYield = this.getRef(MaxOpsBeforeYield);
			this.runtimeMetrics = services$2.mapUnsafe.get(FiberRuntimeMetricsKey);
			const currentTracer = services$2.mapUnsafe.get(TracerKey);
			this.currentTracerContext = currentTracer ? currentTracer["context"] : void 0;
		}
		get currentSpanLocal() {
			return this.currentSpan?._tag === "Span" ? this.currentSpan : void 0;
		}
	};
	const fiberMiddleware = { interruptChildren: void 0 };
	const fiberInterruptChildren = (fiber) => {
		if (fiber._children === void 0 || fiber._children.size === 0) return;
		return fiberInterruptAll(fiber._children);
	};
	/** @internal */
	const fiberAwait = (self) => {
		const impl = self;
		if (impl._exit) return succeed$4(impl._exit);
		return callback$2((resume) => {
			if (impl._exit) return resume(succeed$4(impl._exit));
			return sync$1(self.addObserver((exit$2) => resume(succeed$4(exit$2))));
		});
	};
	/** @internal */
	const fiberAwaitAll = (self) => callback$2((resume) => {
		const iter = self[Symbol.iterator]();
		const exits = [];
		let cancel = void 0;
		function loop() {
			let result$2 = iter.next();
			while (!result$2.done) {
				if (result$2.value._exit) {
					exits.push(result$2.value._exit);
					result$2 = iter.next();
					continue;
				}
				cancel = result$2.value.addObserver((exit$2) => {
					exits.push(exit$2);
					loop();
				});
				return;
			}
			resume(succeed$4(exits));
		}
		loop();
		return sync$1(() => cancel?.());
	});
	/** @internal */
	const fiberJoin = (self) => {
		const impl = self;
		if (impl._exit) return impl._exit;
		return callback$2((resume) => {
			if (impl._exit) return resume(impl._exit);
			return sync$1(self.addObserver(resume));
		});
	};
	/** @internal */
	const fiberJoinAll = (self) => forEachSequential(self, fiberJoin);
	/** @internal */
	const fiberInterrupt = (self) => withFiber$1((fiber) => fiberInterruptAs(self, fiber.id));
	/** @internal */
	const fiberInterruptAs = /* @__PURE__ */ dual(2, (self, fiberId) => withFiber$1((parent) => {
		self.interruptUnsafe(fiberId, parent.currentSpanLocal);
		return asVoid$2(fiberAwait(self));
	}));
	/** @internal */
	const fiberInterruptAll = (fibers) => withFiber$1((parent) => {
		const span = parent.currentSpanLocal;
		for (const fiber of fibers) fiber.interruptUnsafe(parent.id, span);
		return asVoid$2(fiberAwaitAll(fibers));
	});
	/** @internal */
	const fiberInterruptAllAs = /* @__PURE__ */ dual(2, (fibers, fiberId) => withFiber$1((parent) => {
		const span = parent.currentSpanLocal;
		for (const fiber of fibers) fiber.interruptUnsafe(fiberId, span);
		return asVoid$2(fiberAwaitAll(fibers));
	}));
	/** @internal */
	const succeed$4 = exitSucceed;
	/** @internal */
	const failCause$3 = exitFailCause;
	/** @internal */
	const fail$3 = exitFail;
	/** @internal */
	const sync$1 = /* @__PURE__ */ makePrimitive({
		op: "Sync",
		[evaluate](fiber) {
			const value = this[args]();
			const cont = fiber.getCont(contA);
			return cont ? cont[contA](value, fiber) : fiber.yieldWith(exitSucceed(value));
		}
	});
	/** @internal */
	const suspend$3 = /* @__PURE__ */ makePrimitive({
		op: "Suspend",
		[evaluate](_fiber) {
			return this[args]();
		}
	});
	/** @internal */
	const fromYieldable$1 = (yieldable) => yieldable.asEffect();
	/** @internal */
	const fromOption$1 = fromYieldable$1;
	/** @internal */
	const fromResult$1 = fromYieldable$1;
	/** @internal */
	const fromNullishOr$1 = (value) => value == null ? fail$3(new NoSuchElementError$1()) : succeed$4(value);
	/** @internal */
	const yieldNowWith$1 = /* @__PURE__ */ makePrimitive({
		op: "Yield",
		[evaluate](fiber) {
			let resumed = false;
			fiber.currentScheduler.scheduleTask(() => {
				if (resumed) return;
				fiber.evaluate(exitVoid);
			}, this[args] ?? 0);
			return fiber.yieldWith(() => {
				resumed = true;
			});
		}
	});
	/** @internal */
	const yieldNow$1 = /* @__PURE__ */ yieldNowWith$1(0);
	/** @internal */
	const succeedSome$1 = (a) => succeed$4(some(a));
	/** @internal */
	const succeedNone$1 = /* @__PURE__ */ succeed$4(/* @__PURE__ */ none());
	/** @internal */
	const failCauseSync$1 = (evaluate$1) => suspend$3(() => failCause$3(internalCall(evaluate$1)));
	/** @internal */
	const die$3 = (defect) => exitDie(defect);
	/** @internal */
	const failSync$1 = (error) => suspend$3(() => fail$3(internalCall(error)));
	/** @internal */
	const void_$2 = /* @__PURE__ */ succeed$4(void 0);
	/** @internal */
	const try_$1 = (options) => suspend$3(() => {
		try {
			return succeed$4(internalCall(options.try));
		} catch (err) {
			return fail$3(internalCall(() => options.catch(err)));
		}
	});
	/** @internal */
	const promise$1 = (evaluate$1) => callbackOptions(function(resume, signal) {
		internalCall(() => evaluate$1(signal)).then((a) => resume(succeed$4(a)), (e) => resume(die$3(e)));
	}, evaluate$1.length !== 0);
	/** @internal */
	const tryPromise$1 = (options) => {
		const f = typeof options === "function" ? options : options.try;
		const catcher = typeof options === "function" ? (cause) => new UnknownError$1(cause, "An error occurred in Effect.tryPromise") : options.catch;
		return callbackOptions(function(resume, signal) {
			try {
				internalCall(() => f(signal)).then((a) => resume(succeed$4(a)), (e) => resume(fail$3(internalCall(() => catcher(e)))));
			} catch (err) {
				resume(fail$3(internalCall(() => catcher(err))));
			}
		}, eval.length !== 0);
	};
	/** @internal */
	const withFiberId = (f) => withFiber$1((fiber) => f(fiber.id));
	const callbackOptions = /* @__PURE__ */ makePrimitive({
		op: "Async",
		single: false,
		[evaluate](fiber) {
			const register = internalCall(() => this[args][0].bind(fiber.currentScheduler));
			let resumed = false;
			let yielded = false;
			const controller = this[args][1] ? new AbortController() : void 0;
			const onCancel = register((effect) => {
				if (resumed) return;
				resumed = true;
				if (yielded) fiber.evaluate(effect);
				else yielded = effect;
			}, controller?.signal);
			if (yielded !== false) return yielded;
			yielded = true;
			keepAlive.increment();
			fiber._yielded = () => {
				resumed = true;
				keepAlive.decrement();
			};
			if (controller === void 0 && onCancel === void 0) return Yield;
			fiber._stack.push(asyncFinalizer(() => {
				resumed = true;
				controller?.abort();
				return onCancel ?? exitVoid;
			}));
			return Yield;
		}
	});
	const asyncFinalizer = /* @__PURE__ */ makePrimitive({
		op: "AsyncFinalizer",
		[contAll](fiber) {
			if (fiber.interruptible) {
				fiber.interruptible = false;
				fiber._stack.push(setInterruptibleTrue);
			}
		},
		[contE](cause, _fiber) {
			return causeHasInterrupt(cause) ? flatMap$3(this[args](), () => failCause$3(cause)) : failCause$3(cause);
		}
	});
	/** @internal */
	const callback$2 = (register) => callbackOptions(register, register.length >= 2);
	/** @internal */
	const never$3 = /* @__PURE__ */ callback$2(constVoid);
	/** @internal */
	const gen$1 = (...args$1) => suspend$3(() => fromIteratorUnsafe(args$1.length === 1 ? args$1[0]() : args$1[1].call(args$1[0])));
	/** @internal */
	const fnUntraced$1 = (body, ...pipeables) => {
		return pipeables.length === 0 ? function() {
			return suspend$3(() => fromIteratorUnsafe(body.apply(this, arguments)));
		} : function() {
			let effect = suspend$3(() => fromIteratorUnsafe(body.apply(this, arguments)));
			for (const pipeable of pipeables) effect = pipeable(effect, ...arguments);
			return effect;
		};
	};
	/** @internal */
	const fn$1 = (body, ...pipeables) => {
		const prevLimit = globalThis.Error.stackTraceLimit;
		globalThis.Error.stackTraceLimit = 2;
		const defError = new globalThis.Error();
		globalThis.Error.stackTraceLimit = prevLimit;
		return function() {
			let result$2 = suspend$3(() => {
				const iter = body.apply(this, arguments);
				return isEffect$1(iter) ? iter : fromIteratorUnsafe(iter);
			});
			for (let i = 0; i < pipeables.length; i++) result$2 = pipeables[i](result$2, ...args);
			if (!isEffect$1(result$2)) return result$2;
			const prevLimit$1 = globalThis.Error.stackTraceLimit;
			globalThis.Error.stackTraceLimit = 2;
			const callError = new globalThis.Error();
			globalThis.Error.stackTraceLimit = prevLimit$1;
			return catchCause$1(result$2, (cause) => failCause$3(causeFromFailures(cause.failures.map((f) => f.annotate(defErrorKey, defError).annotate(callsiteErrorKey, callError)))));
		};
	};
	const defErrorKey = /* @__PURE__ */ Service("effect/Cause/FnDefinitionTrace");
	const callsiteErrorKey = /* @__PURE__ */ Service("effect/Cause/FnCallsiteTrace");
	/** @internal */
	const fnUntracedEager$1 = (body, ...pipeables) => pipeables.length === 0 ? function() {
		return fromIteratorEagerUnsafe(() => body.apply(this, arguments));
	} : function() {
		let effect = fromIteratorEagerUnsafe(() => body.apply(this, arguments));
		for (const pipeable of pipeables) effect = pipeable(effect);
		return effect;
	};
	const fromIteratorEagerUnsafe = (evaluate$1) => {
		try {
			const iterator = evaluate$1();
			let value = void 0;
			while (true) {
				const state = iterator.next(value);
				if (state.done) return succeed$4(state.value);
				const effect = state.value.asEffect();
				const primitive = effect;
				if (primitive && primitive._tag === "Success") {
					value = primitive.value;
					continue;
				} else if (primitive && primitive._tag === "Failure") return effect;
				else {
					let isFirstExecution = true;
					return suspend$3(() => {
						if (isFirstExecution) {
							isFirstExecution = false;
							return flatMap$3(effect, (value$1) => fromIteratorUnsafe(iterator, value$1));
						} else return suspend$3(() => fromIteratorUnsafe(evaluate$1()));
					});
				}
			}
		} catch (error) {
			return die$3(error);
		}
	};
	const fromIteratorUnsafe = /* @__PURE__ */ makePrimitive({
		op: "Iterator",
		single: false,
		[contA](value, fiber) {
			const iter = this[args][0];
			while (true) {
				const state = iter.next(value);
				if (state.done) return succeed$4(state.value);
				const eff = state.value.asEffect();
				if (!effectIsExit(eff)) {
					fiber._stack.push(this);
					return eff;
				} else if (eff._tag === "Failure") return eff;
				value = eff.value;
			}
		},
		[evaluate](fiber) {
			return this[contA](this[args][1], fiber);
		}
	});
	/** @internal */
	const as$1 = /* @__PURE__ */ dual(2, (self, value) => {
		const b = succeed$4(value);
		return flatMap$3(self, (_) => b);
	});
	/** @internal */
	const asSome$1 = (self) => map$4(self, some);
	/** @internal */
	const flip$1 = (self) => matchEffect$2(self, {
		onFailure: succeed$4,
		onSuccess: fail$3
	});
	/** @internal */
	const andThen$1 = /* @__PURE__ */ dual(2, (self, f) => flatMap$3(self, (a) => {
		if (isEffect$1(f)) return f;
		const value = typeof f === "function" ? internalCall(() => f(a)) : f;
		return isEffect$1(value) ? value : succeed$4(value);
	}));
	/** @internal */
	const tap$3 = /* @__PURE__ */ dual(2, (self, f) => flatMap$3(self, (a) => {
		const value = isEffect$1(f) ? f : typeof f === "function" ? internalCall(() => f(a)) : f;
		return isEffect$1(value) ? as$1(value, a) : succeed$4(a);
	}));
	/** @internal */
	const asVoid$2 = (self) => flatMap$3(self, (_) => exitVoid);
	/** @internal */
	const sandbox$1 = (self) => catchCause$1(self, fail$3);
	/** @internal */
	const raceAll$1 = (all$2, options) => withFiber$1((parent) => callback$2((resume) => {
		const effects = fromIterable(all$2);
		const len = effects.length;
		let doneCount = 0;
		let done$2 = false;
		const fibers = /* @__PURE__ */ new Set();
		const failures = [];
		const onExit$2 = (exit$2, fiber, i) => {
			doneCount++;
			if (exit$2._tag === "Failure") {
				failures.push(...exit$2.cause.failures);
				if (doneCount >= len) resume(failCause$3(causeFromFailures(failures)));
				return;
			}
			const isWinner = !done$2;
			done$2 = true;
			resume(fibers.size === 0 ? exit$2 : flatMap$3(uninterruptible$1(fiberInterruptAll(fibers)), () => exit$2));
			if (isWinner && options?.onWinner) options.onWinner({
				fiber,
				index: i,
				parentFiber: parent
			});
		};
		for (let i = 0; i < len; i++) {
			const fiber = forkUnsafe$1(parent, effects[i], true, true, false);
			fibers.add(fiber);
			fiber.addObserver((exit$2) => {
				fibers.delete(fiber);
				onExit$2(exit$2, fiber, i);
			});
			if (done$2) break;
		}
		return fiberInterruptAll(fibers);
	}));
	/** @internal */
	const raceAllFirst$1 = (all$2, options) => withFiber$1((parent) => callback$2((resume) => {
		let done$2 = false;
		const fibers = /* @__PURE__ */ new Set();
		const onExit$2 = (exit$2) => {
			done$2 = true;
			resume(fibers.size === 0 ? exit$2 : flatMap$3(uninterruptible$1(fiberInterruptAll(fibers)), () => exit$2));
		};
		let i = 0;
		for (const effect of all$2) {
			if (done$2) break;
			const index = i++;
			const fiber = forkUnsafe$1(parent, effect, true, true, false);
			fibers.add(fiber);
			fiber.addObserver((exit$2) => {
				fibers.delete(fiber);
				const isWinner = !done$2;
				onExit$2(exit$2);
				if (isWinner && options?.onWinner) options.onWinner({
					fiber,
					index,
					parentFiber: parent
				});
			});
		}
		return fiberInterruptAll(fibers);
	}));
	/** @internal */
	const raceFirst$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[1]), (self, that, options) => raceAllFirst$1([self, that], options));
	/** @internal */
	const flatMap$3 = /* @__PURE__ */ dual(2, (self, f) => {
		const onSuccess = Object.create(OnSuccessProto);
		onSuccess[args] = self;
		onSuccess[contA] = f.length !== 1 ? (a) => f(a) : f;
		return onSuccess;
	});
	const OnSuccessProto = /* @__PURE__ */ makePrimitiveProto({
		op: "OnSuccess",
		[evaluate](fiber) {
			fiber._stack.push(this);
			return this[args];
		}
	});
	/** @internal */
	const matchCauseEffectEager$1 = /* @__PURE__ */ dual(2, (self, options) => {
		if (effectIsExit(self)) return self._tag === "Success" ? options.onSuccess(self.value) : options.onFailure(self.cause);
		return matchCauseEffect$1(self, options);
	});
	/** @internal */
	const effectIsExit = (effect) => ExitTypeId in effect;
	/** @internal */
	const flatMapEager$1 = /* @__PURE__ */ dual(2, (self, f) => {
		if (effectIsExit(self)) return self._tag === "Success" ? f(self.value) : self;
		return flatMap$3(self, f);
	});
	/** @internal */
	const flatten$2 = (self) => flatMap$3(self, identity);
	/** @internal */
	const map$4 = /* @__PURE__ */ dual(2, (self, f) => flatMap$3(self, (a) => succeed$4(internalCall(() => f(a)))));
	/** @internal */
	const mapEager$1 = /* @__PURE__ */ dual(2, (self, f) => effectIsExit(self) ? exitMap(self, f) : map$4(self, f));
	/** @internal */
	const mapErrorEager$1 = /* @__PURE__ */ dual(2, (self, f) => effectIsExit(self) ? exitMapError(self, f) : mapError$2(self, f));
	/** @internal */
	const mapBothEager$1 = /* @__PURE__ */ dual(2, (self, options) => effectIsExit(self) ? exitMapBoth(self, options) : mapBoth$2(self, options));
	/** @internal */
	const catchEager$1 = /* @__PURE__ */ dual(2, (self, f) => {
		if (effectIsExit(self)) {
			if (self._tag === "Success") return self;
			const error = causeFilterError(self.cause);
			if (isFail(error)) return self;
			return f(error);
		}
		return catch_$1(self, f);
	});
	/** @internal */
	const exitInterrupt$1 = (fiberId) => exitFailCause(causeInterrupt(fiberId));
	/** @internal */
	const exitIsSuccess = (self) => self._tag === "Success";
	/** @internal */
	const exitFilterSuccess = (self) => self._tag === "Success" ? self : fail$4(self);
	/** @internal */
	const exitFilterValue = (self) => self._tag === "Success" ? self.value : fail$4(self);
	/** @internal */
	const exitIsFailure = (self) => self._tag === "Failure";
	/** @internal */
	const exitFilterFailure = (self) => self._tag === "Failure" ? self : fail$4(self);
	/** @internal */
	const exitFilterCause = (self) => self._tag === "Failure" ? self.cause : fail$4(self);
	/** @internal */
	const exitFilterError = /* @__PURE__ */ composePassthrough(exitFilterCause, causeFilterError);
	/** @internal */
	const exitFilterDefect = /* @__PURE__ */ composePassthrough(exitFilterCause, causeFilterDefect);
	/** @internal */
	const exitHasInterrupt = (self) => self._tag === "Failure" && causeHasInterrupt(self.cause);
	/** @internal */
	const exitHasDie = (self) => self._tag === "Failure" && causeHasDie(self.cause);
	/** @internal */
	const exitHasFail = (self) => self._tag === "Failure" && causeHasFail(self.cause);
	/** @internal */
	const exitVoid = /* @__PURE__ */ exitSucceed(void 0);
	/** @internal */
	const exitMap = /* @__PURE__ */ dual(2, (self, f) => self._tag === "Success" ? exitSucceed(f(self.value)) : self);
	/** @internal */
	const exitMapError = /* @__PURE__ */ dual(2, (self, f) => {
		if (self._tag === "Success") return self;
		const error = causeFilterError(self.cause);
		if (isFail(error)) return self;
		return exitFail(f(error));
	});
	/** @internal */
	const exitMapBoth = /* @__PURE__ */ dual(2, (self, options) => {
		if (self._tag === "Success") return exitSucceed(options.onSuccess(self.value));
		const error = causeFilterError(self.cause);
		if (isFail(error)) return self;
		return exitFail(options.onFailure(error));
	});
	/** @internal */
	const exitAs = /* @__PURE__ */ dual(2, (self, b) => exitIsSuccess(self) ? exitSucceed(b) : self);
	/** @internal */
	const exitZipRight = /* @__PURE__ */ dual(2, (self, that) => exitIsSuccess(self) ? that : self);
	/** @internal */
	const exitMatch = /* @__PURE__ */ dual(2, (self, options) => exitIsSuccess(self) ? options.onSuccess(self.value) : options.onFailure(self.cause));
	/** @internal */
	const exitAsVoid = /* @__PURE__ */ exitAs(void 0);
	/** @internal */
	const exitAsVoidAll = (exits) => {
		const failures = [];
		for (const exit$2 of exits) if (exit$2._tag === "Failure") failures.push(...exit$2.cause.failures);
		return failures.length === 0 ? exitVoid : exitFailCause(causeFromFailures(failures));
	};
	/** @internal */
	const exitGetSuccess = (self) => exitIsSuccess(self) ? some(self.value) : none();
	/** @internal */
	const exitGetCause = (self) => exitIsFailure(self) ? some(self.cause) : none();
	/** @internal */
	const exitGetError = (self) => {
		const error = exitFilterError(self);
		return isFail(error) ? none() : some(error);
	};
	/** @internal */
	const service$1 = fromYieldable$1;
	/** @internal */
	const serviceOption$1 = (service$2) => withFiber$1((fiber) => succeed$4(getOption(fiber.services, service$2)));
	/** @internal */
	const serviceOptional = (service$2) => withFiber$1((fiber) => fiber.services.mapUnsafe.has(service$2.key) ? succeed$4(getUnsafe(fiber.services, service$2)) : fail$3(new NoSuchElementError$1()));
	/** @internal */
	const updateServices$1 = /* @__PURE__ */ dual(2, (self, f) => withFiber$1((fiber) => {
		const prev = fiber.services;
		fiber.setServices(f(prev));
		const newServices = /* @__PURE__ */ new Map();
		for (const [key, value] of fiber.services.mapUnsafe) if (!prev.mapUnsafe.has(key) || value !== prev.mapUnsafe.get(key)) newServices.set(key, value);
		return onExit$1(self, () => {
			const map$5 = new Map(fiber.services.mapUnsafe);
			for (const [key, value] of newServices) {
				if (value !== map$5.get(key)) continue;
				if (prev.mapUnsafe.has(key)) map$5.set(key, prev.mapUnsafe.get(key));
				else map$5.delete(key);
			}
			fiber.setServices(makeUnsafe$2(map$5));
		});
	}));
	/** @internal */
	const updateService$1 = /* @__PURE__ */ dual(3, (self, service$2, f) => withFiber$1((fiber) => {
		const prev = getUnsafe(fiber.services, service$2);
		fiber.setServices(add(fiber.services, service$2, f(prev)));
		return onExit$1(self, () => fiber.setServices(add(fiber.services, service$2, prev)));
	}));
	/** @internal */
	const services$1 = () => getServiceMap;
	const getServiceMap = /* @__PURE__ */ withFiber$1((fiber) => succeed$4(fiber.services));
	/** @internal */
	const servicesWith$1 = (f) => withFiber$1((fiber) => f(fiber.services));
	/** @internal */
	const provideServices$1 = /* @__PURE__ */ dual(2, (self, services$2) => {
		if (effectIsExit(self)) return self;
		return updateServices$1(self, merge$1(services$2));
	});
	/** @internal */
	const provideService$1 = function() {
		if (arguments.length === 1) return dual(2, (self, impl) => provideServiceImpl(self, arguments[0], impl));
		return dual(3, (self, service$2, impl) => provideServiceImpl(self, service$2, impl)).apply(this, arguments);
	};
	const provideServiceImpl = (self, service$2, implementation) => withFiber$1((fiber) => {
		const prev = getOption(fiber.services, service$2);
		fiber.setServices(add(fiber.services, service$2, implementation));
		return onExit$1(self, () => fiber.setServices(addOrOmit(fiber.services, service$2, prev)));
	});
	/** @internal */
	const provideServiceEffect$1 = /* @__PURE__ */ dual(3, (self, service$2, acquire) => flatMap$3(acquire, (implementation) => provideService$1(self, service$2, implementation)));
	/** @internal */
	const withConcurrency$1 = /* @__PURE__ */ provideService$1(CurrentConcurrency);
	/** @internal */
	const zip$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[1]), (self, that, options) => zipWith$1(self, that, (a, a2) => [a, a2], options));
	/** @internal */
	const zipWith$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[1]), (self, that, f, options) => options?.concurrent ? map$4(all$1([self, that], { concurrency: 2 }), ([a, a2]) => internalCall(() => f(a, a2))) : flatMap$3(self, (a) => map$4(that, (a2) => internalCall(() => f(a, a2)))));
	const filterOrFail$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, filter$2, orFailWith) => filterOrElse$1(self, filter$2, (a) => failSync$1(() => orFailWith === void 0 ? new NoSuchElementError$1() : orFailWith(a))));
	/** @internal */
	const when$1 = /* @__PURE__ */ dual(2, (self, condition) => flatMap$3(isEffect$1(condition) ? condition : sync$1(condition), (pass) => pass ? asSome$1(self) : succeedNone$1));
	/** @internal */
	const replicate$1 = /* @__PURE__ */ dual(2, (self, n) => Array.from({ length: n }, () => self));
	/** @internal */
	const replicateEffect$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, n, options) => all$1(replicate$1(self, n), options));
	/** @internal */
	const forever$2 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, options) => whileLoop$1({
		while: constTrue,
		body: constant(options?.autoYield ? flatMap$3(self, (_) => yieldNow$1) : self),
		step: constVoid
	}));
	/** @internal */
	const catchCause$1 = /* @__PURE__ */ dual(2, (self, f) => {
		const onFailure = Object.create(OnFailureProto);
		onFailure[args] = self;
		onFailure[contE] = f.length !== 1 ? (cause) => f(cause) : f;
		return onFailure;
	});
	const OnFailureProto = /* @__PURE__ */ makePrimitiveProto({
		op: "OnFailure",
		[evaluate](fiber) {
			fiber._stack.push(this);
			return this[args];
		}
	});
	/** @internal */
	const catchCauseFilter$1 = /* @__PURE__ */ dual(3, (self, filter$2, f) => catchCause$1(self, (cause) => {
		const eb = filter$2(cause);
		return !isFail(eb) ? internalCall(() => f(eb, cause)) : failCause$3(eb.fail);
	}));
	/** @internal */
	const catch_$1 = /* @__PURE__ */ dual(2, (self, f) => catchCauseFilter$1(self, causeFilterError, (e) => f(e)));
	/** @internal */
	const catchDefect$1 = /* @__PURE__ */ dual(2, (self, f) => catchCauseFilter$1(self, causeFilterDefect, f));
	/** @internal */
	const tapCause$1 = /* @__PURE__ */ dual(2, (self, f) => catchCause$1(self, (cause) => andThen$1(internalCall(() => f(cause)), failCause$3(cause))));
	/** @internal */
	const tapCauseFilter$1 = /* @__PURE__ */ dual(3, (self, filter$2, f) => catchCauseFilter$1(self, (cause) => {
		const result$2 = filter$2(cause);
		return isFail(result$2) ? fail$4(cause) : result$2;
	}, (failure, cause) => andThen$1(internalCall(() => f(failure, cause)), failCause$3(cause))));
	/** @internal */
	const tapError$1 = /* @__PURE__ */ dual(2, (self, f) => tapCauseFilter$1(self, causeFilterError, (e) => f(e)));
	/** @internal */
	const tapDefect$1 = /* @__PURE__ */ dual(2, (self, f) => tapCauseFilter$1(self, causeFilterDefect, (_) => f(_)));
	/** @internal */
	const catchFilter$1 = /* @__PURE__ */ dual(3, (self, filter$2, f) => catchCauseFilter$1(self, compose(causeFilterError, mapFail(filter$2, causeFail)), (e) => f(e)));
	/** @internal */
	const catchTag$1 = /* @__PURE__ */ dual(3, (self, k, f) => {
		const pred = Array.isArray(k) ? (e) => hasProperty(e, "_tag") && k.includes(e._tag) : isTagged(k);
		return catchFilter$1(self, fromPredicate(pred), f);
	});
	/** @internal */
	const catchTags$1 = /* @__PURE__ */ dual(2, (self, cases) => {
		let keys$1;
		return catchFilter$1(self, (e) => {
			keys$1 ??= Object.keys(cases);
			return hasProperty(e, "_tag") && isString(e["_tag"]) && keys$1.includes(e["_tag"]) ? e : fail$4(e);
		}, (e) => internalCall(() => cases[e["_tag"]](e)));
	});
	/** @internal */
	const mapError$2 = /* @__PURE__ */ dual(2, (self, f) => catch_$1(self, (error) => failSync$1(() => f(error))));
	const mapBoth$2 = /* @__PURE__ */ dual(2, (self, options) => matchEffect$2(self, {
		onFailure: (e) => failSync$1(() => options.onFailure(e)),
		onSuccess: (a) => sync$1(() => options.onSuccess(a))
	}));
	/** @internal */
	const orDie$1 = (self) => catch_$1(self, die$3);
	/** @internal */
	const orElseSucceed$1 = /* @__PURE__ */ dual(2, (self, f) => catch_$1(self, (_) => sync$1(f)));
	/** @internal */
	const ignore$1 = (self) => matchEffect$2(self, {
		onFailure: (_) => void_$2,
		onSuccess: (_) => void_$2
	});
	/** @internal */
	const option$1 = (self) => match$2(self, {
		onFailure: none,
		onSuccess: some
	});
	/** @internal */
	const result$1 = (self) => matchEager$1(self, {
		onFailure: fail$5,
		onSuccess: succeed$5
	});
	/** @internal */
	const matchCauseEffect$1 = /* @__PURE__ */ dual(2, (self, options) => {
		const primitive = Object.create(OnSuccessAndFailureProto);
		primitive[args] = self;
		primitive[contA] = options.onSuccess.length !== 1 ? (a) => options.onSuccess(a) : options.onSuccess;
		primitive[contE] = options.onFailure.length !== 1 ? (cause) => options.onFailure(cause) : options.onFailure;
		return primitive;
	});
	const OnSuccessAndFailureProto = /* @__PURE__ */ makePrimitiveProto({
		op: "OnSuccessAndFailure",
		[evaluate](fiber) {
			fiber._stack.push(this);
			return this[args];
		}
	});
	/** @internal */
	const matchCause$1 = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect$1(self, {
		onFailure: (cause) => sync$1(() => options.onFailure(cause)),
		onSuccess: (value) => sync$1(() => options.onSuccess(value))
	}));
	/** @internal */
	const matchEffect$2 = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect$1(self, {
		onFailure: (cause) => {
			const fail$7 = cause.failures.find(failureIsFail$1);
			return fail$7 ? internalCall(() => options.onFailure(fail$7.error)) : failCause$3(cause);
		},
		onSuccess: options.onSuccess
	}));
	/** @internal */
	const match$2 = /* @__PURE__ */ dual(2, (self, options) => matchEffect$2(self, {
		onFailure: (error) => sync$1(() => options.onFailure(error)),
		onSuccess: (value) => sync$1(() => options.onSuccess(value))
	}));
	/** @internal */
	const matchEager$1 = /* @__PURE__ */ dual(2, (self, options) => {
		if (effectIsExit(self)) {
			if (self._tag === "Success") return exitSucceed(options.onSuccess(self.value));
			const error = causeFilterError(self.cause);
			if (isFail(error)) return self;
			return exitSucceed(options.onFailure(error));
		}
		return match$2(self, options);
	});
	/** @internal */
	const matchCauseEager$1 = /* @__PURE__ */ dual(2, (self, options) => {
		if (effectIsExit(self)) {
			if (self._tag === "Success") return exitSucceed(options.onSuccess(self.value));
			return exitSucceed(options.onFailure(self.cause));
		}
		return matchCause$1(self, options);
	});
	/** @internal */
	const exit$1 = (self) => effectIsExit(self) ? exitSucceed(self) : exitPrimitive(self);
	const exitPrimitive = /* @__PURE__ */ makePrimitive({
		op: "Exit",
		[evaluate](fiber) {
			fiber._stack.push(this);
			return this[args];
		},
		[contA](value, _, exit$2) {
			return succeed$4(exit$2 ?? exitSucceed(value));
		},
		[contE](cause, _, exit$2) {
			return succeed$4(exit$2 ?? exitFailCause(cause));
		}
	});
	/** @internal */
	const isFailure$3 = /* @__PURE__ */ matchEager$1({
		onFailure: () => true,
		onSuccess: () => false
	});
	/** @internal */
	const isSuccess$2 = /* @__PURE__ */ matchEager$1({
		onFailure: () => false,
		onSuccess: () => true
	});
	/** @internal */
	const delay$1 = /* @__PURE__ */ dual(2, (self, duration) => andThen$1(sleep$1(duration), self));
	/** @internal */
	const timeoutOrElse$1 = /* @__PURE__ */ dual(2, (self, options) => raceFirst$1(self, flatMap$3(sleep$1(options.duration), options.onTimeout)));
	/** @internal */
	const timeout$1 = /* @__PURE__ */ dual(2, (self, duration) => timeoutOrElse$1(self, {
		duration,
		onTimeout: () => fail$3(new TimeoutError$1())
	}));
	/** @internal */
	const timeoutOption$1 = /* @__PURE__ */ dual(2, (self, duration) => raceFirst$1(asSome$1(self), as$1(sleep$1(duration), none())));
	/** @internal */
	const timed$1 = (self) => clockWith$2((clock) => {
		const start = clock.currentTimeNanosUnsafe();
		return map$4(self, (a) => [nanos(clock.currentTimeNanosUnsafe() - start), a]);
	});
	/** @internal */
	const ScopeTypeId = "~effect/Scope";
	/** @internal */
	const ScopeCloseableTypeId = "~effect/Scope/Closeable";
	/** @internal */
	const scopeTag = /* @__PURE__ */ Service("effect/Scope");
	/** @internal */
	const scopeClose = (self, exit_) => suspend$3(() => scopeCloseUnsafe(self, exit_) ?? void_$2);
	/** @internal */
	const scopeCloseUnsafe = (self, exit_) => {
		if (self.state._tag === "Closed") return;
		const closed = {
			_tag: "Closed",
			exit: exit_
		};
		if (self.state._tag === "Empty") {
			self.state = closed;
			return;
		}
		const { finalizers } = self.state;
		self.state = closed;
		if (finalizers.size === 0) return;
		else if (finalizers.size === 1) return finalizers.values().next().value(exit_);
		return scopeCloseFinalizers(self, finalizers, exit_);
	};
	const scopeCloseFinalizers = /* @__PURE__ */ fnUntraced$1(function* (self, finalizers, exit_) {
		let exits = [];
		const fibers = [];
		const arr = Array.from(finalizers.values());
		const parent = getCurrentFiber();
		for (let i = arr.length - 1; i >= 0; i--) {
			const finalizer = arr[i];
			if (self.strategy === "sequential") exits.push(yield* exit$1(finalizer(exit_)));
			else fibers.push(forkUnsafe$1(parent, finalizer(exit_), true, true, "inherit"));
		}
		if (fibers.length > 0) exits = yield* fiberAwaitAll(fibers);
		return yield* exitAsVoidAll(exits);
	});
	/** @internal */
	const scopeFork = (scope$2, finalizerStrategy) => sync$1(() => scopeForkUnsafe(scope$2, finalizerStrategy));
	/** @internal */
	const scopeForkUnsafe = (scope$2, finalizerStrategy) => {
		const newScope = scopeMakeUnsafe(finalizerStrategy);
		if (scope$2.state._tag === "Closed") {
			newScope.state = scope$2.state;
			return newScope;
		}
		const key = {};
		scopeAddFinalizerUnsafe(scope$2, key, (exit$2) => scopeClose(newScope, exit$2));
		scopeAddFinalizerUnsafe(newScope, key, (_) => sync$1(() => scopeRemoveFinalizerUnsafe(scope$2, key)));
		return newScope;
	};
	/** @internal */
	const scopeAddFinalizerExit = (scope$2, finalizer) => {
		return suspend$3(() => {
			if (scope$2.state._tag === "Closed") return finalizer(scope$2.state.exit);
			scopeAddFinalizerUnsafe(scope$2, {}, finalizer);
			return void_$2;
		});
	};
	/** @internal */
	const scopeAddFinalizer = (scope$2, finalizer) => scopeAddFinalizerExit(scope$2, constant(finalizer));
	/** @internal */
	const scopeAddFinalizerUnsafe = (scope$2, key, finalizer) => {
		if (scope$2.state._tag === "Empty") scope$2.state = {
			_tag: "Open",
			finalizers: new Map([[key, finalizer]])
		};
		else if (scope$2.state._tag === "Open") scope$2.state.finalizers.set(key, finalizer);
	};
	/** @internal */
	const scopeRemoveFinalizerUnsafe = (scope$2, key) => {
		if (scope$2.state._tag === "Open") scope$2.state.finalizers.delete(key);
	};
	/** @internal */
	const scopeMakeUnsafe = (finalizerStrategy = "sequential") => ({
		[ScopeCloseableTypeId]: ScopeCloseableTypeId,
		[ScopeTypeId]: ScopeTypeId,
		strategy: finalizerStrategy,
		state: constScopeEmpty
	});
	const constScopeEmpty = { _tag: "Empty" };
	/** @internal */
	const scopeMake = (finalizerStrategy) => sync$1(() => scopeMakeUnsafe(finalizerStrategy));
	/** @internal */
	const scope$1 = /* @__PURE__ */ scopeTag.asEffect();
	/** @internal */
	const provideScope = /* @__PURE__ */ provideService$1(scopeTag);
	/** @internal */
	const scoped$1 = (self) => withFiber$1((fiber) => {
		const prev = getOption(fiber.services, scopeTag);
		const scope$2 = scopeMakeUnsafe();
		fiber.setServices(add(fiber.services, scopeTag, scope$2));
		return onExit$1(self, (exit$2) => {
			fiber.setServices(addOrOmit(fiber.services, scopeTag, prev));
			return scopeCloseUnsafe(scope$2, exit$2);
		});
	});
	/** @internal */
	const scopeUse = /* @__PURE__ */ dual(2, (self, scope$2) => onExit$1(provideScope(self, scope$2), (exit$2) => scopeCloseUnsafe(scope$2, exit$2)));
	/** @internal */
	const scopedWith$1 = (f) => suspend$3(() => {
		const scope$2 = scopeMakeUnsafe();
		return onExit$1(f(scope$2), (exit$2) => scopeCloseUnsafe(scope$2, exit$2));
	});
	/** @internal */
	const acquireRelease$1 = (acquire, release) => uninterruptible$1(flatMap$3(scope$1, (scope$2) => tap$3(acquire, (a) => scopeAddFinalizerExit(scope$2, (exit$2) => internalCall(() => release(a, exit$2))))));
	/** @internal */
	const addFinalizer$2 = (finalizer) => flatMap$3(scope$1, (scope$2) => servicesWith$1((services$2) => scopeAddFinalizerExit(scope$2, (exit$2) => provideServices$1(finalizer(exit$2), services$2))));
	const onExitPrimitive = /* @__PURE__ */ makePrimitive({
		op: "OnExit",
		single: false,
		[evaluate](fiber) {
			fiber._stack.push(this);
			return this[args][0];
		},
		[contAll](fiber) {
			if (fiber.interruptible && this[args][2] !== true) {
				fiber._stack.push(setInterruptibleTrue);
				fiber.interruptible = false;
			}
		},
		[contA](value, _, exit$2) {
			exit$2 ??= exitSucceed(value);
			const eff = this[args][1](exit$2);
			return isEffect$1(eff) ? flatMap$3(eff, (_$1) => exit$2) : exit$2;
		},
		[contE](cause, _, exit$2) {
			exit$2 ??= exitFailCause(cause);
			const eff = this[args][1](exit$2);
			return isEffect$1(eff) ? flatMap$3(eff, (_$1) => exit$2) : exit$2;
		}
	});
	/** @internal */
	const onExit$1 = /* @__PURE__ */ dual(2, onExitPrimitive);
	/** @internal */
	const onExitInterruptible$1 = /* @__PURE__ */ dual(2, (self, f) => onExitPrimitive(self, f, true));
	/** @internal */
	const ensuring$1 = /* @__PURE__ */ dual(2, (self, finalizer) => onExit$1(self, (_) => finalizer));
	/** @internal */
	const onExitFilter$1 = /* @__PURE__ */ dual(3, (self, filter$2, f) => onExit$1(self, (exit$2) => {
		const b = filter$2(exit$2);
		return isFail(b) ? void 0 : f(b, exit$2);
	}));
	/** @internal */
	const onError$1 = /* @__PURE__ */ dual(2, (self, f) => onExitFilter$1(self, exitFilterCause, f));
	/** @internal */
	const onErrorFilter$1 = /* @__PURE__ */ dual(3, (self, filter$2, f) => onExitFilter$1(self, compose(exitFilterCause, filter$2), (eb, exit$2) => f(eb, exit$2.cause)));
	/** @internal */
	const onInterrupt$1 = /* @__PURE__ */ dual(2, (self, finalizer) => onErrorFilter$1(self, causeFilterInterruptors, isEffect$1(finalizer) ? constant(finalizer) : finalizer));
	/** @internal */
	const acquireUseRelease$1 = (acquire, use$1, release) => uninterruptibleMask$1((restore) => flatMap$3(acquire, (a) => onExitInterruptible$1(restore(use$1(a)), (exit$2) => release(a, exit$2))));
	/** @internal */
	const cachedInvalidateWithTTL$1 = /* @__PURE__ */ dual(2, (self, ttl) => sync$1(() => {
		const ttlMillis = toMillis(fromDurationInputUnsafe(ttl));
		const isFinite = Number.isFinite(ttlMillis);
		const latch = makeLatchUnsafe$1(false);
		let expiresAt = 0;
		let running = false;
		let exit$2;
		const wait = flatMap$3(latch.await, () => exit$2);
		return [withFiber$1((fiber) => {
			const now = isFinite ? fiber.getRef(ClockRef).currentTimeMillisUnsafe() : 0;
			if (running || now < expiresAt) return exit$2 ?? wait;
			running = true;
			latch.closeUnsafe();
			exit$2 = void 0;
			return onExit$1(self, (exit_) => {
				running = false;
				expiresAt = now + ttlMillis;
				exit$2 = exit_;
				latch.openUnsafe();
			});
		}), sync$1(() => {
			expiresAt = 0;
			latch.closeUnsafe();
			exit$2 = void 0;
		})];
	}));
	/** @internal */
	const cachedWithTTL$1 = /* @__PURE__ */ dual(2, (self, timeToLive) => map$4(cachedInvalidateWithTTL$1(self, timeToLive), (tuple) => tuple[0]));
	/** @internal */
	const cached$1 = (self) => cachedWithTTL$1(self, infinity);
	/** @internal */
	const interrupt$4 = /* @__PURE__ */ withFiber$1((fiber) => failCause$3(causeInterrupt(fiber.id)));
	/** @internal */
	const uninterruptible$1 = (self) => withFiber$1((fiber) => {
		if (!fiber.interruptible) return self;
		fiber.interruptible = false;
		fiber._stack.push(setInterruptibleTrue);
		return self;
	});
	const setInterruptible = /* @__PURE__ */ makePrimitive({
		op: "SetInterruptible",
		[contAll](fiber) {
			fiber.interruptible = this[args];
			if (fiber._interruptedCause && fiber.interruptible) return () => failCause$3(fiber._interruptedCause);
		}
	});
	const setInterruptibleTrue = /* @__PURE__ */ setInterruptible(true);
	const setInterruptibleFalse = /* @__PURE__ */ setInterruptible(false);
	/** @internal */
	const interruptible$1 = (self) => withFiber$1((fiber) => {
		if (fiber.interruptible) return self;
		fiber.interruptible = true;
		fiber._stack.push(setInterruptibleFalse);
		if (fiber._interruptedCause) return failCause$3(fiber._interruptedCause);
		return self;
	});
	/** @internal */
	const uninterruptibleMask$1 = (f) => withFiber$1((fiber) => {
		if (!fiber.interruptible) return f(identity);
		fiber.interruptible = false;
		fiber._stack.push(setInterruptibleTrue);
		return f(interruptible$1);
	});
	/** @internal */
	const interruptibleMask$1 = (f) => withFiber$1((fiber) => {
		if (fiber.interruptible) return f(identity);
		fiber.interruptible = true;
		fiber._stack.push(setInterruptibleFalse);
		return f(uninterruptible$1);
	});
	/** @internal */
	const all$1 = (arg, options) => {
		if (isIterable(arg)) return forEach$1(arg, identity, options);
		else if (options?.discard) return forEach$1(Object.values(arg), identity, options);
		return suspend$3(() => {
			const out = {};
			return as$1(forEach$1(Object.entries(arg), ([key, effect]) => map$4(effect, (value) => {
				out[key] = value;
			}), {
				discard: true,
				concurrency: options?.concurrency
			}), out);
		});
	};
	/** @internal */
	const whileLoop$1 = /* @__PURE__ */ makePrimitive({
		op: "While",
		[contA](value, fiber) {
			this[args].step(value);
			if (this[args].while()) {
				fiber._stack.push(this);
				return this[args].body();
			}
			return exitVoid;
		},
		[evaluate](fiber) {
			if (this[args].while()) {
				fiber._stack.push(this);
				return this[args].body();
			}
			return exitVoid;
		}
	});
	/** @internal */
	const forEach$1 = /* @__PURE__ */ dual((args$1) => typeof args$1[1] === "function", (iterable, f, options) => withFiber$1((parent) => {
		const concurrencyOption = options?.concurrency === "inherit" ? parent.getRef(CurrentConcurrency) : options?.concurrency ?? 1;
		const concurrency = concurrencyOption === "unbounded" ? Number.POSITIVE_INFINITY : Math.max(1, concurrencyOption);
		if (concurrency === 1) return forEachSequential(iterable, f, options);
		const items = fromIterable(iterable);
		let length = items.length;
		if (length === 0) return options?.discard ? void_$2 : succeed$4([]);
		const out = options?.discard ? void 0 : new Array(length);
		let index = 0;
		const span = parent.currentSpanLocal;
		return callback$2((resume) => {
			const fibers = /* @__PURE__ */ new Set();
			const failures = [];
			let failed = false;
			let inProgress = 0;
			let doneCount = 0;
			let pumping = false;
			let interrupted = false;
			function pump() {
				pumping = true;
				while (inProgress < concurrency && index < length) {
					const currentIndex = index;
					const item = items[currentIndex];
					index++;
					inProgress++;
					try {
						const child = forkUnsafe$1(parent, f(item, currentIndex), true, true, "inherit");
						fibers.add(child);
						child.addObserver((exit$2) => {
							if (interrupted) return;
							fibers.delete(child);
							if (exit$2._tag === "Failure") if (!failed) {
								failed = true;
								length = index;
								failures.push(...exit$2.cause.failures);
								fibers.forEach((fiber) => fiber.interruptUnsafe(parent.id, span));
							} else for (const f$1 of exit$2.cause.failures) {
								if (f$1._tag === "Interrupt") continue;
								failures.push(f$1);
							}
							else if (out !== void 0) out[currentIndex] = exit$2.value;
							doneCount++;
							inProgress--;
							if (doneCount === length) resume(failures.length > 0 ? exitFailCause(causeFromFailures(failures)) : succeed$4(out));
							else if (!pumping && !failed && inProgress < concurrency) pump();
						});
					} catch (err) {
						failed = true;
						length = index;
						failures.push(new Die(err));
						fibers.forEach((fiber) => fiber.interruptUnsafe(parent.id, span));
					}
				}
				pumping = false;
			}
			pump();
			return suspend$3(() => {
				interrupted = true;
				index = length;
				return fiberInterruptAll(fibers);
			});
		});
	}));
	const forEachSequential = (iterable, f, options) => suspend$3(() => {
		const out = options?.discard ? void 0 : [];
		const iterator = iterable[Symbol.iterator]();
		let state = iterator.next();
		let index = 0;
		return as$1(whileLoop$1({
			while: () => !state.done,
			body: () => f(state.value, index++),
			step: (b) => {
				if (out) out.push(b);
				state = iterator.next();
			}
		}), out);
	});
	const filterOrElse$1 = /* @__PURE__ */ dual(3, (self, filter$2, orElse) => flatMap$3(self, (a) => {
		const b = filter$2(a);
		return isFail(b) ? internalCall(() => orElse(b.fail)) : succeed$4(b);
	}));
	/** @internal */
	const filter$1 = (iterable, f, options) => suspend$3(() => {
		const out = [];
		return as$1(forEach$1(iterable, (a) => map$4(f(a), (o) => {
			if (isPass(o)) out.push(o);
		}), {
			discard: true,
			concurrency: options?.concurrency
		}), out);
	});
	/** @internal */
	const forkChild$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, options) => withFiber$1((fiber) => {
		interruptChildrenPatch();
		return succeed$4(forkUnsafe$1(fiber, self, options?.startImmediately, false, options?.uninterruptible ?? false));
	}));
	/** @internal */
	const forkUnsafe$1 = (parent, effect, immediate = false, daemon = false, uninterruptible$2 = false) => {
		const interruptible$2 = uninterruptible$2 === "inherit" ? parent.interruptible : !uninterruptible$2;
		const child = new FiberImpl(parent.services, interruptible$2);
		if (immediate) child.evaluate(effect);
		else parent.currentScheduler.scheduleTask(() => child.evaluate(effect), 0);
		if (!daemon && !child._exit) {
			parent.children().add(child);
			child.addObserver(() => parent._children.delete(child));
		}
		return child;
	};
	/** @internal */
	const forkDetach$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, options) => withFiber$1((fiber) => succeed$4(forkUnsafe$1(fiber, self, options?.startImmediately, true, options?.uninterruptible))));
	/** @internal */
	const forkIn$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, scope$2, options) => withFiber$1((parent) => {
		const fiber = forkUnsafe$1(parent, self, options?.startImmediately, true, options?.uninterruptible);
		if (!fiber._exit) if (scope$2.state._tag !== "Closed") {
			const key = {};
			const finalizer = () => withFiberId((interruptor) => interruptor === fiber.id ? void_$2 : fiberInterrupt(fiber));
			scopeAddFinalizerUnsafe(scope$2, key, finalizer);
			fiber.addObserver(() => scopeRemoveFinalizerUnsafe(scope$2, key));
		} else fiber.interruptUnsafe(parent.id, parent.currentSpanLocal);
		return succeed$4(fiber);
	}));
	/** @internal */
	const fork$2 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, options) => flatMap$3(scope$1, (scope$2) => forkIn$1(self, scope$2, options)));
	/** @internal */
	const runForkWith$1 = (services$2) => (effect, options) => {
		const scheduler = options?.scheduler || !services$2.mapUnsafe.has(Scheduler.key) && new MixedScheduler();
		const fiber = new FiberImpl(scheduler ? add(services$2, Scheduler, scheduler) : services$2, options?.uninterruptible !== true);
		fiber.evaluate(effect);
		if (fiber._exit) return fiber;
		if (options?.signal) if (options.signal.aborted) fiber.interruptUnsafe();
		else {
			const abort = () => fiber.interruptUnsafe();
			options.signal.addEventListener("abort", abort, { once: true });
			fiber.addObserver(() => options.signal.removeEventListener("abort", abort));
		}
		return fiber;
	};
	/** @internal */
	const fiberRunIn = /* @__PURE__ */ dual(2, (self, scope$2) => {
		if (self._exit) return self;
		else if (scope$2.state._tag === "Closed") {
			self.interruptUnsafe(self.id);
			return self;
		}
		const key = {};
		scopeAddFinalizerUnsafe(scope$2, key, () => fiberInterrupt(self));
		self.addObserver(() => scopeRemoveFinalizerUnsafe(scope$2, key));
		return self;
	});
	/** @internal */
	const runFork$1 = /* @__PURE__ */ runForkWith$1(/* @__PURE__ */ empty$3());
	/** @internal */
	const runCallbackWith$1 = (services$2) => {
		const runFork$2 = runForkWith$1(services$2);
		return (effect, options) => {
			const fiber = runFork$2(effect, options);
			if (options?.onExit) fiber.addObserver(options.onExit);
			return (interruptor) => {
				return fiber.interruptUnsafe(interruptor);
			};
		};
	};
	/** @internal */
	const runCallback$1 = /* @__PURE__ */ runCallbackWith$1(/* @__PURE__ */ empty$3());
	/** @internal */
	const runPromiseExitWith$1 = (services$2) => {
		const runFork$2 = runForkWith$1(services$2);
		return (effect, options) => {
			const fiber = runFork$2(effect, options);
			return new Promise((resolve) => {
				fiber.addObserver((exit$2) => resolve(exit$2));
			});
		};
	};
	/** @internal */
	const runPromiseExit$1 = /* @__PURE__ */ runPromiseExitWith$1(/* @__PURE__ */ empty$3());
	/** @internal */
	const runPromiseWith$1 = (services$2) => {
		const runPromiseExit$2 = runPromiseExitWith$1(services$2);
		return (effect, options) => runPromiseExit$2(effect, options).then((exit$2) => {
			if (exit$2._tag === "Failure") throw causeSquash(exit$2.cause);
			return exit$2.value;
		});
	};
	/** @internal */
	const runPromise$1 = /* @__PURE__ */ runPromiseWith$1(/* @__PURE__ */ empty$3());
	/** @internal */
	const runSyncExitWith$1 = (services$2) => {
		const runFork$2 = runForkWith$1(services$2);
		return (effect) => {
			if (effectIsExit(effect)) return effect;
			const scheduler = new MixedScheduler("sync");
			const fiber = runFork$2(effect, { scheduler });
			scheduler.flush();
			return fiber._exit ?? exitDie(fiber);
		};
	};
	/** @internal */
	const runSyncExit$1 = /* @__PURE__ */ runSyncExitWith$1(/* @__PURE__ */ empty$3());
	/** @internal */
	const runSyncWith$1 = (services$2) => {
		const runSyncExit$2 = runSyncExitWith$1(services$2);
		return (effect) => {
			const exit$2 = runSyncExit$2(effect);
			if (exit$2._tag === "Failure") throw causeSquash(exit$2.cause);
			return exit$2.value;
		};
	};
	/** @internal */
	const runSync$1 = /* @__PURE__ */ runSyncWith$1(/* @__PURE__ */ empty$3());
	/** @internal */
	var Semaphore = class {
		waiters = /* @__PURE__ */ new Set();
		taken = 0;
		permits;
		constructor(permits) {
			this.permits = permits;
		}
		get free() {
			return this.permits - this.taken;
		}
		take = (n) => callback$2((resume) => {
			if (this.free < n) {
				const observer = () => {
					if (this.free < n) return;
					this.waiters.delete(observer);
					this.taken += n;
					resume(succeed$4(n));
				};
				this.waiters.add(observer);
				return sync$1(() => {
					this.waiters.delete(observer);
				});
			}
			this.taken += n;
			return resume(succeed$4(n));
		});
		updateTaken = (f) => withFiber$1((fiber) => {
			this.taken = f(this.taken);
			if (this.waiters.size > 0) fiber.currentScheduler.scheduleTask(() => {
				const iter = this.waiters.values();
				let item = iter.next();
				while (item.done === false && this.free > 0) {
					item.value();
					item = iter.next();
				}
			}, 0);
			return succeed$4(this.free);
		});
		release = (n) => this.updateTaken((taken) => taken - n);
		releaseAll = /* @__PURE__ */ this.updateTaken((_) => 0);
		withPermits = (n) => (self) => uninterruptibleMask$1((restore) => flatMap$3(restore(this.take(n)), (permits) => ensuring$1(restore(self), this.release(permits))));
		withPermit = /* @__PURE__ */ this.withPermits(1);
		withPermitsIfAvailable = (n) => (self) => uninterruptibleMask$1((restore) => suspend$3(() => {
			if (this.free < n) return succeedNone$1;
			this.taken += n;
			return ensuring$1(restore(asSome$1(self)), this.release(n));
		}));
	};
	/** @internal */
	const makeSemaphoreUnsafe$1 = (permits) => new Semaphore(permits);
	/** @internal */
	const makeSemaphore$1 = (permits) => sync$1(() => makeSemaphoreUnsafe$1(permits));
	const succeedTrue = /* @__PURE__ */ succeed$4(true);
	const succeedFalse = /* @__PURE__ */ succeed$4(false);
	var Latch = class {
		waiters = [];
		scheduled = false;
		isOpen;
		constructor(isOpen) {
			this.isOpen = isOpen;
		}
		scheduleUnsafe(fiber) {
			if (this.scheduled || this.waiters.length === 0) return succeedTrue;
			this.scheduled = true;
			fiber.currentScheduler.scheduleTask(this.flushWaiters, 0);
			return succeedTrue;
		}
		flushWaiters = () => {
			this.scheduled = false;
			const waiters = this.waiters;
			this.waiters = [];
			for (let i = 0; i < waiters.length; i++) waiters[i](exitVoid);
		};
		open = /* @__PURE__ */ withFiber$1((fiber) => {
			if (this.isOpen) return succeedFalse;
			this.isOpen = true;
			return this.scheduleUnsafe(fiber);
		});
		release = /* @__PURE__ */ withFiber$1((fiber) => this.open ? succeedFalse : this.scheduleUnsafe(fiber));
		openUnsafe() {
			if (this.isOpen) return false;
			this.isOpen = true;
			this.flushWaiters();
			return true;
		}
		await = /* @__PURE__ */ callback$2((resume) => {
			if (this.isOpen) return resume(void_$2);
			this.waiters.push(resume);
			return sync$1(() => {
				const index = this.waiters.indexOf(resume);
				if (index !== -1) this.waiters.splice(index, 1);
			});
		});
		closeUnsafe() {
			if (!this.isOpen) return false;
			this.isOpen = false;
			return true;
		}
		close = /* @__PURE__ */ sync$1(() => this.closeUnsafe());
		whenOpen = (self) => andThen$1(this.await, self);
	};
	/** @internal */
	const makeLatchUnsafe$1 = (open) => new Latch(open ?? false);
	/** @internal */
	const makeLatch$1 = (open) => sync$1(() => makeLatchUnsafe$1(open));
	/** @internal */
	const tracer$1 = /* @__PURE__ */ withFiber$1((fiber) => succeed$4(fiber.getRef(Tracer)));
	/** @internal */
	const withTracer$1 = /* @__PURE__ */ dual(2, (effect, tracer$2) => provideService$1(effect, Tracer, tracer$2));
	/** @internal */
	const withTracerEnabled$1 = /* @__PURE__ */ provideService$1(TracerEnabled);
	const bigint0 = /* @__PURE__ */ BigInt(0);
	const NoopSpanProto = {
		_tag: "Span",
		spanId: "noop",
		traceId: "noop",
		sampled: false,
		status: {
			_tag: "Ended",
			startTime: bigint0,
			endTime: bigint0,
			exit: exitVoid
		},
		attributes: /* @__PURE__ */ new Map(),
		links: [],
		kind: "internal",
		attribute() {},
		event() {},
		end() {}
	};
	/** @internal */
	const noopSpan = (options) => Object.assign(Object.create(NoopSpanProto), options);
	const filterDisablePropagation = (span) => {
		if (span) return get(span.context, DisablePropagation) ? span._tag === "Span" ? filterDisablePropagation(span.parent) : void 0 : span;
	};
	/** @internal */
	const spanToTrace = /* @__PURE__ */ new WeakMap();
	/** @internal */
	const makeSpanUnsafe = (fiber, name, options) => {
		const disablePropagation = !fiber.getRef(TracerEnabled) || options.context && get(options.context, DisablePropagation);
		const parent = options.parent ?? (options.root ? void 0 : filterDisablePropagation(fiber.currentSpan));
		let span;
		if (disablePropagation) span = noopSpan({
			name,
			parent,
			context: add(options.context ?? empty$3(), DisablePropagation, true)
		});
		else {
			const tracer$2 = fiber.getRef(Tracer);
			const clock = fiber.getRef(ClockRef);
			const annotationsFromEnv = fiber.getRef(TracerSpanAnnotations);
			const linksFromEnv = fiber.getRef(TracerSpanLinks);
			const links = options.links !== void 0 ? [...linksFromEnv, ...options.links] : linksFromEnv;
			span = tracer$2.span(name, parent, options.context ?? empty$3(), links, clock.currentTimeNanosUnsafe(), options.kind ?? "internal");
			for (const [key, value] of Object.entries(annotationsFromEnv)) span.attribute(key, value);
			if (options.attributes !== void 0) for (const [key, value] of Object.entries(options.attributes)) span.attribute(key, value);
		}
		if (typeof options.captureStackTrace === "function") spanToTrace.set(span, options.captureStackTrace);
		return span;
	};
	/** @internal */
	const makeSpan$1 = (name, options) => {
		options = addSpanStackTrace(options);
		return withFiber$1((fiber) => succeed$4(makeSpanUnsafe(fiber, name, options)));
	};
	/** @internal */
	const makeSpanScoped$1 = (name, options) => {
		options = addSpanStackTrace(options);
		return uninterruptible$1(withFiber$1((fiber) => {
			const scope$2 = getUnsafe(fiber.services, scopeTag);
			const span = makeSpanUnsafe(fiber, name, options);
			const clock = fiber.getRef(ClockRef);
			return as$1(scopeAddFinalizerExit(scope$2, (exit$2) => endSpan(span, exit$2, clock)), span);
		}));
	};
	/** @internal */
	const withSpanScoped$1 = function() {
		const dataFirst = typeof arguments[0] !== "string";
		const name = dataFirst ? arguments[1] : arguments[0];
		const options = addSpanStackTrace(dataFirst ? arguments[2] : arguments[1]);
		if (dataFirst) {
			const self = arguments[0];
			return flatMap$3(makeSpanScoped$1(name, addSpanStackTrace(options)), (span) => withParentSpan$1(self, span));
		}
		return (self) => flatMap$3(makeSpanScoped$1(name, addSpanStackTrace(options)), (span) => withParentSpan$1(self, span));
	};
	/** @internal */
	const spanAnnotations$1 = /* @__PURE__ */ TracerSpanAnnotations.asEffect();
	/** @internal */
	const spanLinks$1 = /* @__PURE__ */ TracerSpanLinks.asEffect();
	/** @internal */
	const linkSpans$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, span, attributes = {}) => {
		const links = (Array.isArray(span) ? span : [span]).map((span$1) => ({
			span: span$1,
			attributes
		}));
		return updateService$1(self, TracerSpanLinks, (current) => [...current, ...links]);
	});
	/** @internal */
	const endSpan = (span, exit$2, clock) => sync$1(() => {
		if (span.status._tag === "Ended") return;
		span.end(clock.currentTimeNanosUnsafe(), exit$2);
	});
	/** @internal */
	const useSpan$1 = (name, ...args$1) => {
		const options = addSpanStackTrace(args$1.length === 1 ? void 0 : args$1[0]);
		const evaluate$1 = args$1[args$1.length - 1];
		return withFiber$1((fiber) => {
			const span = makeSpanUnsafe(fiber, name, options);
			const clock = fiber.getRef(ClockRef);
			return onExit$1(internalCall(() => evaluate$1(span)), (exit$2) => {
				if (span.status._tag === "Ended") return;
				span.end(clock.currentTimeNanosUnsafe(), exit$2);
			});
		});
	};
	/** @internal */
	const withParentSpan$1 = /* @__PURE__ */ provideService$1(ParentSpan);
	/** @internal */
	const withSpan$1 = function() {
		const dataFirst = typeof arguments[0] !== "string";
		const name = dataFirst ? arguments[1] : arguments[0];
		if (dataFirst) {
			const self = arguments[0];
			return useSpan$1(name, addSpanStackTrace(arguments[2]), (span) => withParentSpan$1(self, span));
		}
		const fnArg = typeof arguments[1] === "function" ? arguments[1] : void 0;
		const traceOptions = addSpanStackTrace(arguments[2]);
		const partialOptions = fnArg ? traceOptions : {
			...traceOptions,
			...arguments[1]
		};
		return (self, ...args$1) => useSpan$1(name, fnArg ? {
			...partialOptions,
			...fnArg(...args$1)
		} : partialOptions, (span) => withParentSpan$1(self, span));
	};
	/** @internal */
	const annotateSpans$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (effect, ...args$1) => updateService$1(effect, TracerSpanAnnotations, (annotations$1) => {
		const newAnnotations = { ...annotations$1 };
		if (args$1.length === 1) Object.assign(newAnnotations, args$1[0]);
		else newAnnotations[args$1[0]] = args$1[1];
		return newAnnotations;
	}));
	/** @internal */
	const annotateCurrentSpan$1 = (...args$1) => withFiber$1((fiber) => {
		const span = fiber.currentSpanLocal;
		if (span) if (args$1.length === 1) for (const [key, value] of Object.entries(args$1[0])) span.attribute(key, value);
		else span.attribute(args$1[0], args$1[1]);
		return void_$2;
	});
	/** @internal */
	const currentSpan$1 = /* @__PURE__ */ withFiber$1((fiber) => {
		const span = fiber.currentSpanLocal;
		return span ? succeed$4(span) : fail$3(new NoSuchElementError$1());
	});
	/** @internal */
	const currentParentSpan$1 = /* @__PURE__ */ serviceOptional(ParentSpan);
	/** @internal */
	const ClockRef = /* @__PURE__ */ Reference("effect/Clock", { defaultValue: () => new ClockImpl() });
	const MAX_TIMER_MILLIS = 2 ** 31 - 1;
	var ClockImpl = class {
		currentTimeMillisUnsafe() {
			return Date.now();
		}
		currentTimeMillis = /* @__PURE__ */ sync$1(() => this.currentTimeMillisUnsafe());
		currentTimeNanosUnsafe() {
			return processOrPerformanceNow();
		}
		currentTimeNanos = /* @__PURE__ */ sync$1(() => this.currentTimeNanosUnsafe());
		sleep(duration) {
			const millis$1 = toMillis(duration);
			if (millis$1 <= 0) return yieldNow$1;
			return callback$2((resume) => {
				if (millis$1 > MAX_TIMER_MILLIS) return;
				const handle = setTimeout(() => resume(void_$2), millis$1);
				return sync$1(() => clearTimeout(handle));
			});
		}
	};
	const performanceNowNanos = /* @__PURE__ */ function() {
		const bigint1e6 = /* @__PURE__ */ BigInt(1e6);
		if (typeof performance === "undefined") return () => BigInt(Date.now()) * bigint1e6;
		else if (typeof performance.timeOrigin === "number" && performance.timeOrigin === 0) return () => BigInt(Math.round(performance.now() * 1e6));
		const origin = /* @__PURE__ */ BigInt(/* @__PURE__ */ Date.now()) * bigint1e6 - /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(/* @__PURE__ */ performance.now() * 1e6));
		return () => origin + BigInt(Math.round(performance.now() * 1e6));
	}();
	const processOrPerformanceNow = /* @__PURE__ */ function() {
		const processHrtime = typeof process === "object" && "hrtime" in process && typeof process.hrtime.bigint === "function" ? process.hrtime : void 0;
		if (!processHrtime) return performanceNowNanos;
		const origin = /* @__PURE__ */ performanceNowNanos() - /* @__PURE__ */ processHrtime.bigint();
		return () => origin + processHrtime.bigint();
	}();
	/** @internal */
	const clockWith$2 = (f) => withFiber$1((fiber) => f(fiber.getRef(ClockRef)));
	/** @internal */
	const sleep$1 = (duration) => clockWith$2((clock) => clock.sleep(fromDurationInputUnsafe(duration)));
	/** @internal */
	const currentTimeMillis$1 = /* @__PURE__ */ clockWith$2((clock) => clock.currentTimeMillis);
	/** @internal */
	const currentTimeNanos$1 = /* @__PURE__ */ clockWith$2((clock) => clock.currentTimeNanos);
	/** @internal */
	const TimeoutErrorTypeId$1 = "~effect/Cause/TimeoutError";
	/** @internal */
	const isTimeoutError$1 = (u) => hasProperty(u, TimeoutErrorTypeId$1);
	/** @internal */
	var TimeoutError$1 = class extends TaggedError("TimeoutError") {
		[TimeoutErrorTypeId$1] = TimeoutErrorTypeId$1;
		constructor(message) {
			super({ message });
		}
	};
	/** @internal */
	const IllegalArgumentErrorTypeId$1 = "~effect/Cause/IllegalArgumentError";
	/** @internal */
	const isIllegalArgumentError$1 = (u) => hasProperty(u, IllegalArgumentErrorTypeId$1);
	/** @internal */
	var IllegalArgumentError$1 = class extends TaggedError("IllegalArgumentError") {
		[IllegalArgumentErrorTypeId$1] = IllegalArgumentErrorTypeId$1;
		constructor(message) {
			super({ message });
		}
	};
	/** @internal */
	const ExceededCapacityErrorTypeId$1 = "~effect/Cause/ExceededCapacityError";
	/** @internal */
	const isExceededCapacityError$1 = (u) => hasProperty(u, ExceededCapacityErrorTypeId$1);
	/** @internal */
	var ExceededCapacityError$1 = class extends TaggedError("ExceededCapacityError") {
		[ExceededCapacityErrorTypeId$1] = ExceededCapacityErrorTypeId$1;
		constructor(message) {
			super({ message });
		}
	};
	/** @internal */
	const UnknownErrorTypeId$1 = "~effect/Cause/UnknownError";
	/** @internal */
	const isUnknownError$1 = (u) => hasProperty(u, UnknownErrorTypeId$1);
	/** @internal */
	var UnknownError$1 = class extends TaggedError("UnknownError") {
		[UnknownErrorTypeId$1] = UnknownErrorTypeId$1;
		constructor(cause, message) {
			super({
				message,
				cause
			});
		}
	};
	/** @internal */
	const ConsoleRef = /* @__PURE__ */ Reference("effect/Console/CurrentConsole", { defaultValue: () => globalThis.console });
	const logLevelToOrder = (level) => {
		switch (level) {
			case "All": return Number.MIN_SAFE_INTEGER;
			case "Fatal": return 5e4;
			case "Error": return 4e4;
			case "Warn": return 3e4;
			case "Info": return 2e4;
			case "Debug": return 1e4;
			case "Trace": return 0;
			case "None": return Number.MAX_SAFE_INTEGER;
		}
	};
	/** @internal */
	const LogLevelOrder = /* @__PURE__ */ mapInput(number$1, logLevelToOrder);
	/** @internal */
	const logLevelGreaterThan = /* @__PURE__ */ greaterThan(LogLevelOrder);
	/** @internal */
	const CurrentLoggers = /* @__PURE__ */ Reference("effect/Loggers/CurrentLoggers", { defaultValue: () => new Set([defaultLogger]) });
	/** @internal */
	const LogToStderr = /* @__PURE__ */ Reference("effect/Logger/LogToStderr", { defaultValue: constFalse });
	/** @internal */
	const LoggerTypeId = "~effect/Logger";
	const LoggerProto = {
		[LoggerTypeId]: {
			_Message: identity,
			_Output: identity
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	/** @internal */
	const loggerMake = (log) => {
		const self = Object.create(LoggerProto);
		self.log = log;
		return self;
	};
	/**
	* Sanitize a given string by replacing spaces, equal signs, and double quotes
	* with underscores.
	*
	* @internal
	*/
	const formatLabel = (key) => key.replace(/[\s="]/g, "_");
	/**
	* Formats a log span into a `<label>=<value>ms` string.
	*
	* @internal
	*/
	const formatLogSpan = (self, now) => {
		return `${formatLabel(self[0])}=${now - self[1]}ms`;
	};
	/** @internal */
	const logWithLevel$1 = (level) => (...message) => {
		let cause = void 0;
		for (let i = 0, len = message.length; i < len; i++) {
			const msg = message[i];
			if (isCause$1(msg)) {
				if (cause) message.splice(i, 1);
				else message = message.slice(0, i).concat(message.slice(i + 1));
				cause = cause ? causeFromFailures(cause.failures.concat(msg.failures)) : msg;
				i--;
			}
		}
		if (cause === void 0) cause = causeEmpty;
		return withFiber$1((fiber) => {
			const logLevel = level ?? fiber.getRef(CurrentLogLevel);
			if (logLevelGreaterThan(fiber.getRef(MinimumLogLevel), logLevel)) return void_$2;
			const clock = fiber.getRef(ClockRef);
			const loggers = fiber.getRef(CurrentLoggers);
			if (loggers.size > 0) {
				const date$1 = new Date(clock.currentTimeMillisUnsafe());
				for (const logger of loggers) logger.log({
					cause,
					fiber,
					date: date$1,
					logLevel,
					message
				});
			}
			return void_$2;
		});
	};
	const colors = {
		bold: "1",
		red: "31",
		green: "32",
		yellow: "33",
		blue: "34",
		cyan: "36",
		white: "37",
		gray: "90",
		black: "30",
		bgBrightRed: "101"
	};
	const logLevelColors = {
		None: [],
		All: [],
		Trace: [colors.gray],
		Debug: [colors.blue],
		Info: [colors.green],
		Warn: [colors.yellow],
		Error: [colors.red],
		Fatal: [colors.bgBrightRed, colors.black]
	};
	const defaultDateFormat = (date$1) => `${date$1.getHours().toString().padStart(2, "0")}:${date$1.getMinutes().toString().padStart(2, "0")}:${date$1.getSeconds().toString().padStart(2, "0")}.${date$1.getMilliseconds().toString().padStart(3, "0")}`;
	const hasProcessStdout = typeof process === "object" && process !== null && typeof process.stdout === "object" && process.stdout !== null;
	const processStdoutIsTTY = hasProcessStdout && process.stdout.isTTY === true;
	const hasProcessStdoutOrDeno = hasProcessStdout || "Deno" in globalThis;
	/** @internal */
	const defaultLogger = /* @__PURE__ */ loggerMake(({ cause, date: date$1, fiber, logLevel, message }) => {
		const message_ = Array.isArray(message) ? message.slice() : [message];
		if (cause.failures.length > 0) message_.unshift(causePretty(cause));
		const now = date$1.getTime();
		const spans = fiber.getRef(CurrentLogSpans);
		let spanString = "";
		for (const span of spans) spanString += ` ${formatLogSpan(span, now)}`;
		const annotations$1 = fiber.getRef(CurrentLogAnnotations);
		if (Object.keys(annotations$1).length > 0) message_.push(annotations$1);
		const console = fiber.getRef(ConsoleRef);
		(fiber.getRef(LogToStderr) ? console.error : console.log)(`[${defaultDateFormat(date$1)}] ${logLevel.toUpperCase()} (#${fiber.id})${spanString}:`, ...message_);
	});
	/** @internal */
	function interruptChildrenPatch() {
		fiberMiddleware.interruptChildren ??= fiberInterruptChildren;
	}
	/** @internal */
	const undefined_$1 = /* @__PURE__ */ succeed$4(void 0);

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Cause.js
/**
	* @since 2.0.0
	*/
	const TypeId$7 = CauseTypeId;
	/**
	* @since 2.0.0
	*/
	const FailureTypeId = CauseFailureTypeId;
	/**
	* Tests if a value is a `Cause`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* console.log(Cause.isCause(Cause.fail("error"))) // true
	* console.log(Cause.isCause("not a cause")) // false
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isCause = isCause$1;
	/**
	* @category guards
	* @since 2.0.0
	*/
	const isFailure$2 = isCauseFailure;
	/**
	* Tests if a `Failure` is a `Fail`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const cause = Cause.fail("error")
	* const failure = cause.failures[0]
	* console.log(Cause.failureIsFail(failure)) // true
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const failureIsFail = failureIsFail$1;
	/**
	* Tests if a `Failure` is a `Die`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const cause = Cause.die("defect")
	* const failure = cause.failures[0]
	* console.log(Cause.failureIsDie(failure)) // true
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const failureIsDie = failureIsDie$1;
	/**
	* Tests if a `Failure` is an `Interrupt`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const cause = Cause.interrupt(123)
	* const failure = cause.failures[0]
	* console.log(Cause.failureIsInterrupt(failure)) // true
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const failureIsInterrupt = failureIsInterrupt$2;
	/**
	* Creates a `Cause` from a collection of `Failure` values.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const fail1 = Cause.fail("error1").failures[0]
	* const fail2 = Cause.fail("error2").failures[0]
	* const cause = Cause.fromFailures([fail1, fail2])
	* console.log(cause.failures.length) // 2
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const fromFailures = causeFromFailures;
	/**
	* A `Cause` that that contains no failures, representing a successful
	* computation or an empty state.
	*
	* @category constructors
	* @since 2.0.0
	*/
	const empty$2 = causeEmpty;
	/**
	* Creates a `Cause` that represents a typed error.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const cause = Cause.fail("Something went wrong")
	* console.log(cause.failures.length) // 1
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const fail$2 = causeFail;
	/**
	* Creates a `Cause` that represents an unrecoverable defect.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const cause = Cause.die(new Error("Unexpected error"))
	* console.log(cause.failures.length) // 1
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const die$2 = causeDie;
	/**
	* Creates a `Cause` that represents fiber interruption.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const cause = Cause.interrupt(123)
	* console.log(cause.failures.length) // 1
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const interrupt$3 = causeInterrupt;
	/**
	* @category Failure
	* @since 4.0.0
	*/
	const failureInterrupt = failureInterrupt$1;
	/**
	* Tests if a `Cause` contains only interruptions.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const interruptCause = Cause.interrupt(123)
	* const failCause = Cause.fail("error")
	*
	* console.log(Cause.isInterruptedOnly(interruptCause)) // true
	* console.log(Cause.isInterruptedOnly(failCause)) // false
	* ```
	*
	* @category utils
	* @since 2.0.0
	*/
	const isInterruptedOnly = causeIsInterruptedOnly;
	/**
	* @category Mapping
	* @since 4.0.0
	*/
	const map$3 = causeMap;
	/**
	* Merges two causes into a single cause containing failures from both.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const cause1 = Cause.fail("error1")
	* const cause2 = Cause.fail("error2")
	* const merged = Cause.merge(cause1, cause2)
	* console.log(merged.failures.length) // 2
	* ```
	*
	* @category utils
	* @since 4.0.0
	*/
	const merge = causeMerge;
	/**
	* Squashes a `Cause` down to a single defect, chosen to be the "most important"
	* defect.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const cause = Cause.fail("error")
	* const squashed = Cause.squash(cause)
	* console.log(squashed) // "error"
	* ```
	*
	* @category destructors
	* @since 2.0.0
	*/
	const squash = causeSquash;
	/**
	* Tests if a `Cause` contains any typed errors.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const failCause = Cause.fail("error")
	* const dieCause = Cause.die("defect")
	*
	* console.log(Cause.hasFail(failCause)) // true
	* console.log(Cause.hasFail(dieCause)) // false
	* ```
	*
	* @category utils
	* @since 2.0.0
	*/
	const hasFail$1 = causeHasFail;
	/**
	* Filters out the first typed error from a `Cause`.
	*
	* @category filters
	* @since 4.0.0
	*/
	const filterFail = causeFilterFail;
	/**
	* Filters out the first typed error value from a `Cause`.
	*
	* @category filters
	* @since 4.0.0
	*/
	const filterError$1 = causeFilterError;
	/**
	* Tests if a `Cause` contains any defects.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const dieCause = Cause.die("defect")
	* const failCause = Cause.fail("error")
	*
	* console.log(Cause.hasDie(dieCause)) // true
	* console.log(Cause.hasDie(failCause)) // false
	* ```
	*
	* @category utils
	* @since 2.0.0
	*/
	const hasDie$1 = causeHasDie;
	/**
	* Filters out the first Die failure from a `Cause`.
	*
	* @category filters
	* @since 4.0.0
	*/
	const filterDie = causeFilterDie;
	/**
	* Filters out the first defect from a `Cause`.
	*
	* @category filters
	* @since 4.0.0
	*/
	const filterDefect$1 = causeFilterDefect;
	/**
	* Tests if a `Cause` contains any interruptions.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const interruptCause = Cause.interrupt(123)
	* const failCause = Cause.fail("error")
	*
	* console.log(Cause.hasInterrupt(interruptCause)) // true
	* console.log(Cause.hasInterrupt(failCause)) // false
	* ```
	*
	* @category utils
	* @since 2.0.0
	*/
	const hasInterrupt$1 = causeHasInterrupt;
	/**
	* Filters out the first interruption from a `Cause`.
	*
	* @category filters
	* @since 4.0.0
	*/
	const filterInterrupt = causeFilterInterrupt;
	/**
	* @since 4.0.0
	* @category Accessors
	*/
	const interruptors = causeInterruptors;
	/**
	* @since 4.0.0
	* @category filters
	*/
	const filterInterruptors = causeFilterInterruptors;
	/**
	* @since 4.0.0
	* @category Pretty printing
	*/
	const prettyErrors = causePrettyErrors;
	/**
	* Pretty prints a `Cause` as a string, cleaning up the output for better
	* readability & adding trace information from annotations.
	*
	* @since 4.0.0
	* @category Pretty printing
	*/
	const pretty = causePretty;
	/**
	* Tests if a value is a `NoSuchElementError`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.NoSuchElementError()
	* console.log(Cause.isNoSuchElementError(error)) // true
	* console.log(Cause.isNoSuchElementError("not an error")) // false
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const isNoSuchElementError = isNoSuchElementError$1;
	/**
	* @since 4.0.0
	* @category errors
	*/
	const NoSuchElementErrorTypeId = NoSuchElementErrorTypeId$1;
	/**
	* Creates a `NoSuchElementError` with an optional message.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.NoSuchElementError("Element not found")
	* console.log(error.message) // "Element not found"
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const NoSuchElementError = NoSuchElementError$1;
	/**
	* @category errors
	* @since 4.0.0
	*/
	const TimeoutErrorTypeId = TimeoutErrorTypeId$1;
	/**
	* Tests if a value is a `TimeoutError`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.TimeoutError()
	* console.log(Cause.isTimeoutError(error)) // true
	* console.log(Cause.isTimeoutError("not an error")) // false
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const isTimeoutError = isTimeoutError$1;
	/**
	* Creates a `TimeoutError` with an optional message.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.TimeoutError("Operation timed out")
	* console.log(error.message) // "Operation timed out"
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const TimeoutError = TimeoutError$1;
	/**
	* @category errors
	* @since 4.0.0
	*/
	const IllegalArgumentErrorTypeId = IllegalArgumentErrorTypeId$1;
	/**
	* Tests if a value is an `IllegalArgumentError`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.IllegalArgumentError()
	* console.log(Cause.isIllegalArgumentError(error)) // true
	* console.log(Cause.isIllegalArgumentError("not an error")) // false
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const isIllegalArgumentError = isIllegalArgumentError$1;
	/**
	* Creates an `IllegalArgumentError` with an optional message.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.IllegalArgumentError("Invalid argument")
	* console.log(error.message) // "Invalid argument"
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const IllegalArgumentError = IllegalArgumentError$1;
	/**
	* Tests if a value is an `ExceededCapacityError`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.ExceededCapacityError()
	* console.log(Cause.isExceededCapacityError(error)) // true
	* console.log(Cause.isExceededCapacityError("not an error")) // false
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const isExceededCapacityError = isExceededCapacityError$1;
	/**
	* @category errors
	* @since 4.0.0
	*/
	const ExceededCapacityErrorTypeId = ExceededCapacityErrorTypeId$1;
	/**
	* Creates an `ExceededCapacityError` with an optional message.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.ExceededCapacityError("Capacity exceeded")
	* console.log(error.message) // "Capacity exceeded"
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const ExceededCapacityError = ExceededCapacityError$1;
	/**
	* @category errors
	* @since 4.0.0
	*/
	const UnknownErrorTypeId = UnknownErrorTypeId$1;
	/**
	* Tests if a value is an `UnknownError`.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.UnknownError("some cause")
	* console.log(Cause.isUnknownError(error)) // true
	* console.log(Cause.isUnknownError("not an error")) // false
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const isUnknownError = isUnknownError$1;
	/**
	* Creates an `UnknownError` with a cause and optional message.
	*
	* @example
	* ```ts
	* import { Cause } from "effect"
	*
	* const error = new Cause.UnknownError("original cause", "Unknown error occurred")
	* console.log(error.message) // "Unknown error occurred"
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const UnknownError = UnknownError$1;
	/**
	* Adds annotations to a `Cause` using a `ServiceMap.Service` to store metadata
	* that can be retrieved later for debugging or tracing purposes.
	*
	* @example
	* ```ts
	* import { Cause, ServiceMap } from "effect"
	*
	* // Define a custom annotation key
	* class UserId extends ServiceMap.Service<UserId, string>()("UserId") {}
	*
	* // Create a cause and add an annotation
	* const originalCause = Cause.fail("Something went wrong")
	* const annotatedCause = Cause.annotate(originalCause, UserId, "user123")
	* ```
	*
	* @category Annotations
	* @since 4.0.0
	*/
	const annotate = causeAnnotate;
	/**
	* Retrieves the annotations from a `Failure`.
	*
	* @category Annotations
	* @since 4.0.0
	*/
	const failureAnnotations = failureAnnotations$1;
	/**
	* Retrieves the merged annotations from all failures in a `Cause`.
	*
	* @category Annotations
	* @since 4.0.0
	*/
	const annotations = causeAnnotations;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Exit.js
	ExitTypeId;
	/**
	* Tests if a value is an `Exit`.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const success = Exit.succeed(42)
	* const failure = Exit.fail("error")
	*
	* console.log(Exit.isExit(success)) // true
	* console.log(Exit.isExit(failure)) // true
	* console.log(Exit.isExit("not an exit")) // false
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isExit = isExit$1;
	/**
	* Creates a successful `Exit` containing the provided value.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const exit = Exit.succeed(42)
	* console.log(exit._tag) // "Success"
	* console.log(Exit.isSuccess(exit) ? exit.value : null) // 42
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const succeed$3 = exitSucceed;
	/**
	* Creates a failed `Exit` from a `Cause`.
	*
	* @example
	* ```ts
	* import { Exit, Cause } from "effect"
	*
	* const cause = Cause.fail("Something went wrong")
	* const exit = Exit.failCause(cause)
	* console.log(exit._tag) // "Failure"
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const failCause$2 = exitFailCause;
	/**
	* Creates a failed `Exit` from an error value.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const exit = Exit.fail("Something went wrong")
	* console.log(exit._tag) // "Failure"
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const fail$1 = exitFail;
	/**
	* Creates a failed `Exit` from a defect (unexpected error).
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const exit = Exit.die(new Error("Unexpected error"))
	* console.log(exit._tag) // "Failure"
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const die$1 = exitDie;
	/**
	* Creates a failed `Exit` from fiber interruption.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const exit = Exit.interrupt(123)
	* console.log(exit._tag) // "Failure"
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const interrupt$2 = exitInterrupt$1;
	const void_$1 = exitVoid;
	/**
	* Tests if an `Exit` is successful.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const success = Exit.succeed(42)
	* const failure = Exit.fail("error")
	*
	* console.log(Exit.isSuccess(success)) // true
	* console.log(Exit.isSuccess(failure)) // false
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isSuccess$1 = exitIsSuccess;
	/**
	* Tests if an `Exit` is a failure.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const success = Exit.succeed(42)
	* const failure = Exit.fail("error")
	*
	* console.log(Exit.isFailure(success)) // false
	* console.log(Exit.isFailure(failure)) // true
	* ```
	*
	* @category guards
	* @since 2.0.0
	*/
	const isFailure$1 = exitIsFailure;
	/**
	* Tests if an `Exit` contains a typed error (as opposed to a defect or interruption).
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const failure = Exit.fail("error")
	* const defect = Exit.die(new Error("defect"))
	*
	* console.log(Exit.hasFail(failure)) // true
	* console.log(Exit.hasFail(defect)) // false
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const hasFail = exitHasFail;
	/**
	* Tests if an `Exit` contains a defect (unexpected error).
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const failure = Exit.fail("error")
	* const defect = Exit.die(new Error("defect"))
	*
	* console.log(Exit.hasDie(failure)) // false
	* console.log(Exit.hasDie(defect)) // true
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const hasDie = exitHasDie;
	/**
	* Tests if an `Exit` contains an interruption.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const failure = Exit.fail("error")
	* const interruption = Exit.interrupt(123)
	*
	* console.log(Exit.hasInterrupt(failure)) // false
	* console.log(Exit.hasInterrupt(interruption)) // true
	* ```
	*
	* @category guards
	* @since 4.0.0
	*/
	const hasInterrupt = exitHasInterrupt;
	/**
	* @category filters
	* @since 4.0.0
	*/
	const filterSuccess = exitFilterSuccess;
	/**
	* @category filters
	* @since 4.0.0
	*/
	const filterValue = exitFilterValue;
	/**
	* @category filters
	* @since 4.0.0
	*/
	const filterFailure = exitFilterFailure;
	/**
	* @category filters
	* @since 4.0.0
	*/
	const filterCause = exitFilterCause;
	/**
	* @category filters
	* @since 4.0.0
	*/
	const filterError = exitFilterError;
	/**
	* @category filters
	* @since 4.0.0
	*/
	const filterDefect = exitFilterDefect;
	/**
	* Pattern matches on an `Exit` value, handling both success and failure cases.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const success = Exit.succeed(42)
	* const failure = Exit.fail("error")
	*
	* const result1 = Exit.match(success, {
	*   onSuccess: (value) => `Success: ${value}`,
	*   onFailure: (cause) => `Failure: ${cause}`
	* })
	* console.log(result1) // "Success: 42"
	*
	* const result2 = Exit.match(failure, {
	*   onSuccess: (value) => `Success: ${value}`,
	*   onFailure: (cause) => `Failure: ${cause}`
	* })
	* console.log(result2) // "Failure: [object Object]"
	* ```
	*
	* @category pattern matching
	* @since 2.0.0
	*/
	const match$1 = exitMatch;
	/**
	* Transforms the success value of an `Exit` using the provided function.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const success = Exit.succeed(42)
	* const failure = Exit.fail("error")
	*
	* const doubled = Exit.map(success, x => x * 2)
	* console.log(doubled) // Exit.succeed(84)
	*
	* const stillFailure = Exit.map(failure, x => x * 2)
	* console.log(stillFailure) // Exit.fail("error")
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	const map$2 = exitMap;
	/**
	* Transforms the error value of a failed `Exit` using the provided function.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const success = Exit.succeed(42)
	* const failure = Exit.fail("error")
	*
	* const stillSuccess = Exit.mapError(success, (e: string) => e.toUpperCase())
	* console.log(stillSuccess) // Exit.succeed(42)
	*
	* const mappedFailure = Exit.mapError(failure, (e: string) => e.toUpperCase())
	* console.log(mappedFailure) // Exit.fail("ERROR")
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	const mapError$1 = exitMapError;
	/**
	* Transforms both the success and error values of an `Exit`.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const success = Exit.succeed(42)
	* const failure = Exit.fail("error")
	*
	* const mappedSuccess = Exit.mapBoth(success, {
	*   onSuccess: (x: number) => x.toString(),
	*   onFailure: (e: string) => e.toUpperCase()
	* })
	* console.log(mappedSuccess) // Exit.succeed("42")
	*
	* const mappedFailure = Exit.mapBoth(failure, {
	*   onSuccess: (x: number) => x.toString(),
	*   onFailure: (e: string) => e.toUpperCase()
	* })
	* console.log(mappedFailure) // Exit.fail("ERROR")
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	const mapBoth$1 = exitMapBoth;
	/**
	* Discards the success value of an `Exit`, replacing it with `void`.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const success = Exit.succeed(42)
	* const failure = Exit.fail("error")
	*
	* const voidSuccess = Exit.asVoid(success)
	* console.log(voidSuccess) // Exit.succeed(undefined)
	*
	* const stillFailure = Exit.asVoid(failure)
	* console.log(stillFailure) // Exit.fail("error")
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	const asVoid$1 = exitAsVoid;
	/**
	* Combines multiple `Exit` values into a single `Exit<void, E>`. If all are successful,
	* the result is a success. If any fail, the result is a failure with the combined errors.
	*
	* @example
	* ```ts
	* import { Exit } from "effect"
	*
	* const exits1 = [Exit.succeed(1), Exit.succeed(2), Exit.succeed(3)]
	* const result1 = Exit.asVoidAll(exits1)
	* console.log(result1) // Exit.succeed(undefined)
	*
	* const exits2 = [Exit.succeed(1), Exit.fail("error"), Exit.succeed(3)]
	* const result2 = Exit.asVoidAll(exits2)
	* console.log(result2) // Exit.fail(...)
	* ```
	*
	* @category combinators
	* @since 4.0.0
	*/
	const asVoidAll = exitAsVoidAll;
	/**
	* @category Accessors
	* @since 4.0.0
	*/
	const getSuccess = exitGetSuccess;
	/**
	* @category Accessors
	* @since 4.0.0
	*/
	const getCause = exitGetCause;
	/**
	* @category Accessors
	* @since 4.0.0
	*/
	const getError = exitGetError;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Deferred.js
	const DeferredProto = {
		["~effect/Deferred"]: {
			_A: identity,
			_E: identity
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	/**
	* Unsafely creates a new `Deferred`
	*
	* @example
	* ```ts
	* import { Deferred } from "effect"
	*
	* const deferred = Deferred.makeUnsafe<number>()
	* console.log(deferred)
	* ```
	*
	* @since 2.0.0
	* @category unsafe
	*/
	const makeUnsafe$1 = () => {
		const self = Object.create(DeferredProto);
		self.resumes = void 0;
		self.effect = void 0;
		return self;
	};
	const _await = (self) => callback$2((resume) => {
		if (self.effect) return resume(self.effect);
		self.resumes ??= [];
		self.resumes.push(resume);
		return sync$1(() => {
			const index = self.resumes.indexOf(resume);
			self.resumes.splice(index, 1);
		});
	});
	/**
	* Completes the deferred with the result of the specified effect. If the
	* deferred has already been completed, the method will produce false.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Deferred } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const deferred = yield* Deferred.make<number>()
	*   const completed = yield* Deferred.completeWith(deferred, Effect.succeed(42))
	*   console.log(completed) // true
	*
	*   const value = yield* Deferred.await(deferred)
	*   console.log(value) // 42
	* })
	* ```
	*
	* @since 2.0.0
	* @category utils
	*/
	const completeWith = /* @__PURE__ */ dual(2, (self, effect) => sync$1(() => doneUnsafe$1(self, effect)));
	/**
	* Exits the `Deferred` with the specified `Exit` value, which will be
	* propagated to all fibers waiting on the value of the `Deferred`.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Deferred } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const deferred = yield* Deferred.make<number>()
	*   yield* Deferred.done(deferred, Exit.succeed(42))
	*
	*   const value = yield* Deferred.await(deferred)
	*   console.log(value) // 42
	* })
	* ```
	*
	* @since 2.0.0
	* @category utils
	*/
	const done$1 = completeWith;
	/**
	* Unsafely exits the `Deferred` with the specified `Exit` value, which will be
	* propagated to all fibers waiting on the value of the `Deferred`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Deferred } from "effect"
	*
	* const deferred = Deferred.makeUnsafe<number>()
	* const success = Deferred.doneUnsafe(deferred, Effect.succeed(42))
	* console.log(success) // true
	* ```
	*
	* @since 2.0.0
	* @category unsafe
	*/
	const doneUnsafe$1 = (self, effect) => {
		if (self.effect) return false;
		self.effect = effect;
		if (self.resumes) {
			for (let i = 0; i < self.resumes.length; i++) self.resumes[i](effect);
			self.resumes = void 0;
		}
		return true;
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Scope.js
	ScopeTypeId;
	ScopeCloseableTypeId;
	/**
	* The service tag for `Scope`, used for dependency injection in the Effect system.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Scope } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   // Access the scope from the context
	*   const scope = yield* Scope.Scope
	*
	*   // Use the scope for resource management
	*   yield* Scope.addFinalizer(scope, Effect.log("Cleanup"))
	* })
	*
	* // Provide a scope to the program
	* const scoped = Effect.scoped(program)
	* ```
	*
	* @since 2.0.0
	* @category tags
	*/
	const Scope = scopeTag;
	/**
	* Creates a new `Scope` with the specified finalizer strategy.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	* import { Scope } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   // Create a scope with sequential cleanup
	*   const scope = yield* Scope.make("sequential")
	*
	*   // Add finalizers
	*   yield* Scope.addFinalizer(scope, Console.log("Cleanup 1"))
	*   yield* Scope.addFinalizer(scope, Console.log("Cleanup 2"))
	*
	*   // Close the scope (finalizers run in reverse order)
	*   yield* Scope.close(scope, Exit.void)
	*   // Output: "Cleanup 2", then "Cleanup 1"
	* })
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const make$2 = scopeMake;
	/**
	* Creates a new `Scope` synchronously without wrapping it in an `Effect`.
	* This is useful when you need a scope immediately but should be used with caution
	* as it doesn't provide the same safety guarantees as the `Effect`-wrapped version.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	* import { Scope } from "effect"
	*
	* // Create a scope immediately
	* const scope = Scope.makeUnsafe("sequential")
	*
	* // Use it in an Effect program
	* const program = Effect.gen(function* () {
	*   yield* Scope.addFinalizer(scope, Console.log("Cleanup"))
	*   yield* Scope.close(scope, Exit.void)
	* })
	* ```
	*
	* @since 4.0.0
	* @category constructors
	*/
	const makeUnsafe = scopeMakeUnsafe;
	/**
	* Provides a `Scope` to an `Effect`, removing the `Scope` requirement from its context.
	* This allows you to run effects that require a scope by explicitly providing one.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	* import { Scope } from "effect"
	*
	* // An effect that requires a Scope
	* const program = Effect.gen(function* () {
	*   const scope = yield* Scope.Scope
	*   yield* Scope.addFinalizer(scope, Console.log("Cleanup"))
	*   yield* Console.log("Working...")
	* })
	*
	* // Provide a scope to the program
	* const withScope = Effect.gen(function* () {
	*   const scope = yield* Scope.make()
	*   yield* Scope.provide(scope)(program)
	* })
	* ```
	*
	* @since 4.0.0
	* @category combinators
	*/
	const provide$2 = provideScope;
	/**
	* Adds a finalizer to a scope that will be executed when the scope is closed.
	* Finalizers are cleanup functions that receive the exit value of the scope.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	* import { Scope } from "effect"
	*
	* const withResource = Effect.gen(function* () {
	*   const scope = yield* Scope.make()
	*
	*   // Add a finalizer for cleanup
	*   yield* Scope.addFinalizerExit(scope, (exit) =>
	*     Console.log(`Cleaning up resource. Exit: ${Exit.isSuccess(exit) ? "Success" : "Failure"}`)
	*   )
	*
	*   // Use the resource
	*   yield* Console.log("Using resource")
	*
	*   // Close the scope
	*   yield* Scope.close(scope, Exit.void)
	* })
	* ```
	*
	* @category combinators
	* @since 4.0.0
	*/
	const addFinalizerExit = scopeAddFinalizerExit;
	/**
	* Adds a finalizer to a scope. The finalizer is a simple `Effect` that will be
	* executed when the scope is closed, regardless of whether the scope closes
	* successfully or with an error.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	* import { Scope } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const scope = yield* Scope.make()
	*
	*   // Add simple finalizers
	*   yield* Scope.addFinalizer(scope, Console.log("Cleanup task 1"))
	*   yield* Scope.addFinalizer(scope, Console.log("Cleanup task 2"))
	*   yield* Scope.addFinalizer(scope, Effect.log("Cleanup task 3"))
	*
	*   // Do some work
	*   yield* Console.log("Doing work...")
	*
	*   // Close the scope
	*   yield* Scope.close(scope, Exit.void)
	* })
	* ```
	*
	* @since 4.0.0
	* @category combinators
	*/
	const addFinalizer$1 = scopeAddFinalizer;
	/**
	* Creates a child scope from a parent scope. The child scope inherits the
	* parent's finalization strategy unless overridden.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	* import { Scope } from "effect"
	*
	* const nestedScopes = Effect.gen(function* () {
	*   const parentScope = yield* Scope.make("sequential")
	*
	*   // Add finalizer to parent
	*   yield* Scope.addFinalizer(parentScope, Console.log("Parent cleanup"))
	*
	*   // Create child scope
	*   const childScope = yield* Scope.fork(parentScope, "parallel")
	*
	*   // Add finalizer to child
	*   yield* Scope.addFinalizer(childScope, Console.log("Child cleanup"))
	*
	*   // Close child first, then parent
	*   yield* Scope.close(childScope, Exit.void)
	*   yield* Scope.close(parentScope, Exit.void)
	* })
	* ```
	*
	* @category combinators
	* @since 4.0.0
	*/
	const fork$1 = scopeFork;
	/**
	* Creates a child scope from a parent scope synchronously without wrapping it in an `Effect`.
	* The child scope inherits the parent's finalization strategy unless overridden.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	* import { Scope } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const parentScope = Scope.makeUnsafe("sequential")
	*   const childScope = Scope.forkUnsafe(parentScope, "parallel")
	*
	*   // Add finalizers to both scopes
	*   yield* Scope.addFinalizer(parentScope, Console.log("Parent cleanup"))
	*   yield* Scope.addFinalizer(childScope, Console.log("Child cleanup"))
	*
	*   // Close child first, then parent
	*   yield* Scope.close(childScope, Exit.void)
	*   yield* Scope.close(parentScope, Exit.void)
	* })
	* ```
	*
	* @since 4.0.0
	* @category combinators
	*/
	const forkUnsafe = scopeForkUnsafe;
	/**
	* Closes a scope, running all registered finalizers in the appropriate order.
	* The exit value is passed to each finalizer.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	* import { Scope } from "effect"
	*
	* const resourceManagement = Effect.gen(function* () {
	*   const scope = yield* Scope.make("sequential")
	*
	*   // Add multiple finalizers
	*   yield* Scope.addFinalizer(scope, Console.log("Close database connection"))
	*   yield* Scope.addFinalizer(scope, Console.log("Close file handle"))
	*   yield* Scope.addFinalizer(scope, Console.log("Release memory"))
	*
	*   // Do some work...
	*   yield* Console.log("Performing operations...")
	*
	*   // Close scope - finalizers run in reverse order of registration
	*   yield* Scope.close(scope, Exit.succeed("Success!"))
	*   // Output: "Release memory", "Close file handle", "Close database connection"
	* })
	* ```
	*
	* @category combinators
	* @since 4.0.0
	*/
	const close = scopeClose;
	/**
	* @since 4.0.0
	*/
	const closeUnsafe = scopeCloseUnsafe;
	/**
	* @category combinators
	* @since 4.0.0
	*/
	const use = scopeUse;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Layer.js
	const TypeId$6 = "~effect/Layer";
	const MemoMapTypeId = "~effect/Layer/MemoMap";
	const LayerProto = {
		[TypeId$6]: {
			_ROut: identity,
			_E: identity,
			_RIn: identity
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	const fromBuildUnsafe = (build) => {
		const self = Object.create(LayerProto);
		self.build = build;
		return self;
	};
	/**
	* Constructs a Layer from a function that uses a `MemoMap` and `Scope` to build the layer.
	*
	* The function receives a `MemoMap` for memoization and a `Scope` for resource management.
	* A child scope is created, and if the build fails, the child scope is closed.
	*
	* @example
	* ```ts
	* import { Effect, Layer, ServiceMap } from "effect"
	*
	* class Database extends ServiceMap.Service<Database, {
	*   readonly query: (sql: string) => Effect.Effect<string>
	* }>()("Database") {}
	*
	* const databaseLayer = Layer.fromBuild(() =>
	*   Effect.sync(() => ServiceMap.make(Database, {
	*     query: (sql: string) => Effect.succeed("result")
	*   }))
	* )
	* ```
	*
	* @since 4.0.0
	* @category constructors
	*/
	const fromBuild = (build) => fromBuildUnsafe((memoMap, scope$2) => flatMap$3(fork$1(scope$2), (scope$3) => onExit$1(build(memoMap, scope$3), (exit$2) => exit$2._tag === "Failure" ? close(scope$3, exit$2) : void_$2)));
	var MemoMapImpl = class {
		get [MemoMapTypeId]() {
			return MemoMapTypeId;
		}
		map = /* @__PURE__ */ new Map();
		getOrElseMemoize(layer, scope$2, build) {
			if (this.map.has(layer)) {
				const entry$1 = this.map.get(layer);
				entry$1.observers++;
				return andThen$1(scopeAddFinalizerExit(scope$2, (exit$2) => entry$1.finalizer(exit$2)), entry$1.effect);
			}
			const layerScope = makeUnsafe();
			const deferred = makeUnsafe$1();
			const entry = {
				observers: 1,
				effect: _await(deferred),
				finalizer: (exit$2) => suspend$3(() => {
					entry.observers--;
					if (entry.observers === 0) {
						this.map.delete(layer);
						return close(layerScope, exit$2);
					}
					return void_$2;
				})
			};
			this.map.set(layer, entry);
			return scopeAddFinalizerExit(scope$2, entry.finalizer).pipe(flatMap$3(() => build(this, layerScope)), onExit$1((exit$2) => {
				entry.effect = exit$2;
				return done$1(deferred, exit$2);
			}));
		}
	};
	/**
	* Constructs a `MemoMap` that can be used to build additional layers.
	*
	* @example
	* ```ts
	* import { Effect, Layer, ServiceMap } from "effect"
	*
	* class Database extends ServiceMap.Service<Database, {
	*   readonly query: (sql: string) => Effect.Effect<string>
	* }>()("Database") {}
	*
	* // Create a memo map for manual layer building
	* const program = Effect.gen(function* () {
	*   const memoMap = Layer.makeMemoMapUnsafe()
	*   const scope = yield* Effect.scope
	*
	*   const dbLayer = Layer.succeed(Database)({
	*     query: (sql: string) => Effect.succeed("result")
	*   })
	*   const services = yield* Layer.buildWithMemoMap(dbLayer, memoMap, scope)
	*
	*   return ServiceMap.get(services, Database)
	* })
	* ```
	*
	* @since 4.0.0
	* @category memo map
	*/
	const makeMemoMapUnsafe = () => new MemoMapImpl();
	/**
	* Builds a layer into an `Effect` value. Any resources associated with this
	* layer will be released when the specified scope is closed unless their scope
	* has been extended. This allows building layers where the lifetime of some of
	* the services output by the layer exceed the lifetime of the effect the
	* layer is provided to.
	*
	* @example
	* ```ts
	* import { Effect, Layer, Scope, ServiceMap } from "effect"
	*
	* class Database extends ServiceMap.Service<Database, {
	*   readonly query: (sql: string) => Effect.Effect<string>
	* }>()("Database") {}
	*
	* // Build a layer with explicit scope control
	* const program = Effect.gen(function* () {
	*   const scope = yield* Effect.scope
	*
	*   const dbLayer = Layer.effect(Database)(Effect.gen(function* () {
	*     console.log("Initializing database...")
	*     yield* Scope.addFinalizer(scope, Effect.sync(() => console.log("Database closed")))
	*     return { query: (sql: string) => Effect.succeed(`Result: ${sql}`) }
	*   }))
	*
	*   // Build with specific scope - resources tied to this scope
	*   const services = yield* Layer.buildWithScope(dbLayer, scope)
	*   const database = ServiceMap.get(services, Database)
	*
	*   return yield* database.query("SELECT * FROM users")
	*   // Database will be closed when scope is closed
	* })
	* ```
	*
	* @since 2.0.0
	* @category destructors
	*/
	const buildWithScope = /* @__PURE__ */ dual(2, (self, scope$2) => suspend$3(() => self.build(makeMemoMapUnsafe(), scope$2)));
	const mergeAllEffect = (layers, memoMap, scope$2) => forEach$1(layers, (layer) => layer.build(memoMap, scope$2), { concurrency: layers.length }).pipe(map$4((contexts) => {
		const map$5 = /* @__PURE__ */ new Map();
		for (const context of contexts) for (const [key, value] of context.mapUnsafe) map$5.set(key, value);
		return makeUnsafe$2(map$5);
	}));
	/**
	* Combines all the provided layers concurrently, creating a new layer with merged input, error, and output types.
	*
	* All layers are built concurrently, and their outputs are merged into a single layer.
	* This is useful when you need to combine multiple independent layers.
	*
	* @example
	* ```ts
	* import { Effect, Layer, ServiceMap } from "effect"
	*
	* class Database extends ServiceMap.Service<Database, {
	*   readonly query: (sql: string) => Effect.Effect<string>
	* }>()("Database") {}
	*
	* class Logger extends ServiceMap.Service<Logger, {
	*   readonly log: (msg: string) => Effect.Effect<void>
	* }>()("Logger") {}
	*
	* const dbLayer = Layer.succeed(Database)({
	*   query: (sql: string) => Effect.succeed("result")
	* })
	* const loggerLayer = Layer.succeed(Logger)({
	*   log: (msg: string) => Effect.sync(() => console.log(msg))
	* })
	*
	* const mergedLayer = Layer.mergeAll(dbLayer, loggerLayer)
	* ```
	*
	* @since 2.0.0
	* @category zipping
	*/
	const mergeAll$1 = (...layers) => fromBuild((memoMap, scope$2) => mergeAllEffect(layers, memoMap, scope$2));

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/layer.js
	const provideLayer = (self, layer) => scopedWith$1((scope$2) => flatMap$3(buildWithScope(layer, scope$2), (context) => provideServices$1(self, context)));
	/** @internal */
	const provide$1 = /* @__PURE__ */ dual(2, (self, source) => isServiceMap(source) ? provideServices$1(self, source) : provideLayer(self, Array.isArray(source) ? mergeAll$1(...source) : source));

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Request.js
	const TypeId$5 = "~effect/Request";
	const requestVariance = /* @__PURE__ */ byReferenceUnsafe({
		_E: (_) => _,
		_A: (_) => _,
		_R: (_) => _
	});
	/**
	* @since 4.0.0
	*/
	const RequestPrototype = {
		...StructuralProto,
		[TypeId$5]: requestVariance
	};
	/**
	* @since 2.0.0
	* @category entry
	*/
	const makeEntry = (options) => options;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/request.js
/** @internal */
	const request$1 = /* @__PURE__ */ dual(2, (self, resolver) => {
		const withResolver = (resolver$1) => callback$2((resume) => {
			return maybeRemoveEntry(resolver$1, addEntry(resolver$1, self, resume, getCurrentFiber()));
		});
		return isEffect$1(resolver) ? flatMap$3(resolver, withResolver) : withResolver(resolver);
	});
	/** @internal */
	const requestUnsafe$1 = (self, options) => {
		const entry = addEntry(options.resolver, self, options.onExit, {
			services: options.services,
			currentScheduler: get(options.services, Scheduler)
		});
		return () => removeEntryUnsafe(options.resolver, entry);
	};
	const batchPool = [];
	const pendingBatches = /* @__PURE__ */ new Map();
	const addEntry = (resolver, request$2, resume, fiber) => {
		let batchMap = pendingBatches.get(resolver);
		if (!batchMap) {
			batchMap = /* @__PURE__ */ new Map();
			pendingBatches.set(resolver, batchMap);
		}
		let batch;
		let completed = false;
		const entry = makeEntry({
			request: request$2,
			services: fiber.services,
			uninterruptible: false,
			completeUnsafe(effect) {
				if (completed) return;
				completed = true;
				resume(effect);
				batch?.entrySet.delete(entry);
			}
		});
		if (resolver.preCheck !== void 0 && !resolver.preCheck(entry)) return entry;
		const key = resolver.batchKey(entry);
		batch = batchMap.get(key);
		if (!batch) {
			if (batchPool.length > 0) {
				batch = batchPool.pop();
				batch.key = key;
				batch.resolver = resolver;
				batch.map = batchMap;
			} else {
				const newBatch = {
					key,
					resolver,
					map: batchMap,
					entrySet: /* @__PURE__ */ new Set(),
					entries: /* @__PURE__ */ new Set(),
					delayEffect: flatMap$3(suspend$3(() => newBatch.resolver.delay), (_) => runBatch(newBatch)),
					run: onExit$1(suspend$3(() => newBatch.resolver.runAll(Array.from(newBatch.entries), newBatch.key)), (exit$2) => {
						for (const entry$1 of newBatch.entrySet) entry$1.completeUnsafe(exit$2._tag === "Success" ? exitDie(new Error("Effect.request: RequestResolver did not complete request", { cause: entry$1.request })) : exit$2);
						newBatch.entries.clear();
						if (batchPool.length < 128) {
							newBatch.entrySet.clear();
							newBatch.key = void 0;
							newBatch.delayFiber = void 0;
							batchPool.push(newBatch);
						}
						return void_$2;
					})
				};
				batch = newBatch;
			}
			batchMap.set(key, batch);
			batch.delayFiber = runFork$1(batch.delayEffect, { scheduler: fiber.currentScheduler });
		}
		batch.entrySet.add(entry);
		batch.entries.add(entry);
		if (batch.resolver.collectWhile(batch.entries)) return entry;
		batch.delayFiber.interruptUnsafe(fiber.id);
		batch.delayFiber = void 0;
		runFork$1(runBatch(batch), { scheduler: fiber.currentScheduler });
		return entry;
	};
	const removeEntryUnsafe = (resolver, entry) => {
		if (entry.uninterruptible) return;
		const batchMap = pendingBatches.get(resolver);
		if (!batchMap) return;
		const key = resolver.batchKey(entry.request);
		const batch = batchMap.get(key);
		if (!batch) return;
		batch.entries.delete(entry);
		batch.entrySet.delete(entry);
		if (batch.entries.size === 0) {
			batchMap.delete(key);
			if (batch.delayFiber) batch.delayFiber.interruptUnsafe();
		}
	};
	const maybeRemoveEntry = (resolver, entry) => sync$1(() => removeEntryUnsafe(resolver, entry));
	function runBatch(batch) {
		if (!batch.map.has(batch.key)) return void_$2;
		batch.map.delete(batch.key);
		return batch.run;
	}

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Clock.js
/**
	* A reference to the current Clock service in the environment.
	*
	* @example
	* ```ts
	* import { Clock, Effect } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const clock = yield* Clock.Clock
	*   return clock.currentTimeMillisUnsafe()
	* })
	* ```
	*
	* @category references
	* @since 4.0.0
	*/
	const Clock = ClockRef;
	/**
	* Accesses the current Clock service and uses it to run the provided function.
	*
	* @example
	* ```ts
	* import { Clock, Effect } from "effect"
	*
	* const program = Clock.clockWith((clock) =>
	*   Effect.sync(() => {
	*     const currentTime = clock.currentTimeMillisUnsafe()
	*     console.log(`Current time: ${currentTime}`)
	*     return currentTime
	*   })
	* )
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const clockWith$1 = clockWith$2;
	/**
	* Returns an Effect that succeeds with the current time in milliseconds.
	*
	* @example
	* ```ts
	* import { Clock, Effect } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const currentTime = yield* Clock.currentTimeMillis
	*   console.log(`Current time: ${currentTime}ms`)
	*   return currentTime
	* })
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const currentTimeMillis = currentTimeMillis$1;
	/**
	* Returns an Effect that succeeds with the current time in nanoseconds.
	*
	* @example
	* ```ts
	* import { Clock, Effect } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const currentTime = yield* Clock.currentTimeNanos
	*   console.log(`Current time: ${currentTime}ns`)
	*   return currentTime
	* })
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const currentTimeNanos = currentTimeNanos$1;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/stream/Pull.js
/**
	* @since 4.0.0
	* @category Halt
	*/
	const HaltTypeId = "~effect/stream/Pull/Halt";
	/**
	* Represents a halt error that carries a leftover value.
	* Used to signal the end of a Pull operation with a final value.
	*
	* @since 4.0.0
	* @category Halt
	*/
	var Halt = class {
		/**
		* @since 4.0.0
		*/
		[HaltTypeId] = HaltTypeId;
		leftover;
		constructor(leftover) {
			this.leftover = leftover;
		}
	};
	/**
	* Catches halt errors and handles them with a recovery function.
	*
	* @example
	* ```ts
	* import { Pull } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const pullWithHalt = Pull.halt("stream ended")
	* const recovered = Pull.catchHalt(pullWithHalt, (leftover) =>
	*   Effect.succeed(`Recovered from: ${leftover}`)
	* )
	* ```
	*
	* @since 4.0.0
	* @category Halt
	*/
	const catchHalt = /* @__PURE__ */ dual(2, (effect, f) => catchCauseFilter$1(effect, filterHaltLeftover, (l) => f(l)));
	/**
	* Checks if a value is a Halt error.
	*
	* @example
	* ```ts
	* import { Pull } from "effect/stream"
	*
	* const halt = new Pull.Halt("completed")
	* const regularError = new Error("failed")
	*
	* console.log(Pull.isHalt(halt)) // true
	* console.log(Pull.isHalt(regularError)) // false
	* ```
	*
	* @since 4.0.0
	* @category Halt
	*/
	const isHalt = (u) => hasProperty(u, HaltTypeId);
	/**
	* Checks if a Cause contains any halt errors.
	*
	* @example
	* ```ts
	* import { Pull } from "effect/stream"
	* import { Cause } from "effect"
	*
	* const halt = new Pull.Halt("completed")
	* const causeWithHalt = Cause.fail(halt)
	* const regularCause = Cause.fail("regular error")
	*
	* console.log(Pull.isHaltCause(causeWithHalt)) // true
	* console.log(Pull.isHaltCause(regularCause)) // false
	* ```
	*
	* @since 4.0.0
	* @category Halt
	*/
	const isHaltCause = (cause) => cause.failures.some(isHaltFailure);
	/**
	* Checks if a Cause failure is a halt error.
	*
	* @example
	* ```ts
	* import { Pull } from "effect/stream"
	* import { Cause } from "effect"
	*
	* const halt = new Pull.Halt("completed")
	* const haltCause = Cause.fail(halt)
	* const regularCause = Cause.fail("regular error")
	*
	* const haltFailure = haltCause.failures[0]
	* const regularFailure = regularCause.failures[0]
	*
	* console.log(Pull.isHaltFailure(haltFailure)) // true
	* console.log(Pull.isHaltFailure(regularFailure)) // false
	* ```
	*
	* @since 4.0.0
	* @category Halt
	*/
	const isHaltFailure = (failure) => failure._tag === "Fail" && isHalt(failure.error);
	/**
	* Filters a Cause to extract only halt errors.
	*
	* @since 4.0.0
	* @category Halt
	*/
	const filterHalt = /* @__PURE__ */ composePassthrough(filterError$1, (e) => isHalt(e) ? e : fail$4(e));
	/**
	* Filters a Cause to extract the leftover value from halt errors.
	*
	* @example
	* ```ts
	* import { Pull } from "effect/stream"
	* import { Cause } from "effect"
	*
	* const halt = new Pull.Halt("stream completed")
	* const causeWithHalt = Cause.fail(halt)
	* const leftover = Pull.filterHaltLeftover(causeWithHalt)
	*
	* // leftover will be "stream completed" if halt is present
	* ```
	*
	* @since 4.0.0
	* @category Halt
	*/
	const filterHaltLeftover = /* @__PURE__ */ composePassthrough(filterError$1, (e) => isHalt(e) ? e.leftover : fail$4(e));
	/**
	* Creates a Pull that halts with the specified leftover value.
	*
	* @example
	* ```ts
	* import { Pull } from "effect/stream"
	* import { Effect } from "effect"
	*
	* // Create a halt with a string leftover
	* const haltWithMessage = Pull.halt("operation completed")
	*
	* // Create a halt with a number leftover
	* const haltWithCount = Pull.halt(42)
	* ```
	*
	* @since 4.0.0
	* @category Halt
	*/
	const halt = (leftover) => fail$3(new Halt(leftover));
	/**
	* A pre-defined halt with void leftover, commonly used to signal completion.
	*
	* @example
	* ```ts
	* import { Pull } from "effect/stream"
	* import { Effect } from "effect"
	*
	* // Use the pre-defined halt with void
	* const completePull = Pull.haltVoid
	*
	* // Equivalent to:
	* const samePull = Pull.halt(void 0)
	* ```
	*
	* @since 4.0.0
	* @category Halt
	*/
	const haltVoid = /* @__PURE__ */ fail$3(/* @__PURE__ */ new Halt(void 0));
	/**
	* Converts a Cause into an Exit, extracting halt leftovers as success values.
	*
	* @example
	* ```ts
	* import { Cause, Exit } from "effect"
	* import { Pull } from "effect/stream"
	*
	* const halt = new Pull.Halt("completed")
	* const causeWithHalt = Cause.fail(halt)
	* const exit = Pull.haltExitFromCause(causeWithHalt)
	*
	* // exit will be Exit.succeed("completed")
	* ```
	*
	* @since 4.0.0
	* @category Halt
	*/
	const haltExitFromCause = (cause) => {
		const halt$1 = filterHalt(cause);
		return !isFail(halt$1) ? succeed$3(halt$1.leftover) : failCause$2(halt$1.fail);
	};
	/**
	* Pattern matches on a Pull, handling success, failure, and halt cases.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	* import { Pull } from "effect/stream"
	*
	* const pull = Pull.halt("stream ended")
	*
	* const result = Pull.matchEffect(pull, {
	*   onSuccess: (value) => Effect.succeed(`Got value: ${value}`),
	*   onFailure: (cause) => Effect.succeed(`Got error: ${cause}`),
	*   onHalt: (leftover) => Effect.succeed(`Stream halted with: ${leftover}`)
	* })
	* ```
	*
	* @since 4.0.0
	* @category pattern matching
	*/
	const matchEffect$1 = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect$1(self, {
		onSuccess: options.onSuccess,
		onFailure: (cause) => {
			const halt$1 = filterHalt(cause);
			return !isFail(halt$1) ? options.onHalt(halt$1.leftover) : options.onFailure(halt$1.fail);
		}
	}));

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Schedule.js
	const TypeId$4 = "~effect/Schedule";
	const ScheduleProto = {
		[TypeId$4]: {
			_Out: identity,
			_In: identity,
			_Env: identity
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	/**
	* Type guard that checks if a value is a Schedule.
	*
	* @example
	* ```ts
	* import { Schedule } from "effect"
	*
	* const schedule = Schedule.exponential("100 millis")
	* const notSchedule = { foo: "bar" }
	*
	* console.log(Schedule.isSchedule(schedule)) // true
	* console.log(Schedule.isSchedule(notSchedule)) // false
	* console.log(Schedule.isSchedule(null)) // false
	* console.log(Schedule.isSchedule(undefined)) // false
	* ```
	*
	* @since 2.0.0
	* @category guards
	*/
	const isSchedule = (u) => hasProperty(u, TypeId$4);
	/**
	* Creates a Schedule from a step function that returns a Pull.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	*
	* // fromStep is an advanced function for creating custom schedules
	* // It requires a step function that returns a Pull value
	*
	* // Most users should use simpler schedule constructors like:
	* const simpleSchedule = Schedule.exponential("100 millis")
	* const spacedSchedule = Schedule.spaced("1 second")
	* const recurringSchedule = Schedule.recurs(5)
	*
	* // These can be combined and transformed as needed
	* const complexSchedule = simpleSchedule.pipe(
	*   Schedule.compose(Schedule.recurs(3))
	* )
	* ```
	*
	* @since 4.0.0
	* @category constructors
	*/
	const fromStep = (step) => {
		const self = Object.create(ScheduleProto);
		self.step = step;
		return self;
	};
	const metadataFn = () => {
		let n = 0;
		let previous;
		let start;
		return (now, input) => {
			if (start === void 0) start = now;
			const elapsed = now - start;
			const elapsedSincePrevious = previous === void 0 ? 0 : now - previous;
			previous = now;
			return {
				input,
				recurrence: n++,
				start,
				now,
				elapsed,
				elapsedSincePrevious
			};
		};
	};
	/**
	* Creates a Schedule from a step function that receives metadata about the schedule's execution.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	*
	* // fromStepWithMetadata is an advanced function for creating schedules
	* // that need access to execution metadata like timing and recurrence count
	*
	* // Most users should use simpler metadata-aware functions like:
	* const metadataSchedule = Schedule.spaced("1 second").pipe(
	*   Schedule.collectWhile((metadata) => metadata.recurrence < 5)
	* )
	*
	* // Or use existing schedules with metadata transformations:
	* const conditionalSchedule = Schedule.exponential("100 millis").pipe(
	*   Schedule.tapOutput((output) => Effect.log(`Output: ${output}`))
	* )
	* ```
	*
	* @since 4.0.0
	* @category constructors
	*/
	const fromStepWithMetadata = (step) => fromStep(map$4(step, (f) => {
		const meta = metadataFn();
		return (now, input) => f(meta(now, input));
	}));
	/**
	* Extracts the step function from a Schedule.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	*
	* // Extract step function from an existing schedule
	* const schedule = Schedule.exponential("100 millis").pipe(Schedule.take(3))
	*
	* const program = Effect.gen(function* () {
	*   const stepFn = yield* Schedule.toStep(schedule)
	*
	*   // Use the step function directly for custom logic
	*   const now = Date.now()
	*   const result = yield* stepFn(now, "input")
	*
	*   console.log(`Step result: ${result}`)
	* })
	* ```
	*
	* @since 4.0.0
	* @category destructors
	*/
	const toStep = (schedule) => catchCause$1(schedule.step, (cause) => succeed$4(() => failCause$3(cause)));
	/**
	* Extracts a step function from a Schedule that automatically handles sleep delays.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	*
	* // Convert schedule to step function with automatic sleeping
	* const schedule = Schedule.spaced("1 second").pipe(Schedule.take(3))
	*
	* const program = Effect.gen(function* () {
	*   const stepWithSleep = yield* Schedule.toStepWithSleep(schedule)
	*
	*   // Each call will automatically sleep for the scheduled delay
	*   console.log("Starting...")
	*   const result1 = yield* stepWithSleep("first")
	*   console.log(`First result: ${result1}`)
	*
	*   const result2 = yield* stepWithSleep("second")
	*   console.log(`Second result: ${result2}`)
	*
	*   const result3 = yield* stepWithSleep("third")
	*   console.log(`Third result: ${result3}`)
	* })
	* ```
	*
	* @since 4.0.0
	* @category destructors
	*/
	const toStepWithSleep = (schedule) => clockWith$2((clock) => map$4(toStep(schedule), (step) => (input) => flatMap$3(suspend$3(() => step(clock.currentTimeMillisUnsafe(), input)), ([output, duration]) => isZero(duration) ? succeed$4(output) : as$1(sleep$1(duration), output))));
	/**
	* Returns a new `Schedule` that outputs the inputs of the specified schedule.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	* import { Console } from "effect"
	*
	* // Create a schedule that outputs the inputs instead of original outputs
	* const inputSchedule = Schedule.passthrough(
	*   Schedule.exponential("100 millis").pipe(Schedule.take(3))
	* )
	*
	* const program = Effect.gen(function* () {
	*   let counter = 0
	*   yield* Effect.repeat(
	*     Effect.gen(function* () {
	*       counter++
	*       yield* Console.log(`Task ${counter} executed`)
	*       return `result-${counter}`
	*     }),
	*     inputSchedule
	*   )
	* })
	* ```
	*
	* @since 2.0.0
	* @category utilities
	*/
	const passthrough = (self) => fromStep(map$4(toStep(self), (step) => (now, input) => matchEffect$1(step(now, input), {
		onSuccess: (result$2) => succeed$4([input, result$2[1]]),
		onFailure: failCause$3,
		onHalt: () => halt(input)
	})));
	/**
	* Returns a schedule that recurs continuously, each repetition spaced the
	* specified duration from the last run.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	* import { Console } from "effect"
	*
	* // Basic spaced schedule - runs every 2 seconds
	* const everyTwoSeconds = Schedule.spaced("2 seconds")
	*
	* // Heartbeat that runs indefinitely with fixed spacing
	* const heartbeat = Effect.gen(function* () {
	*   yield* Console.log(`Heartbeat at ${new Date().toISOString()}`)
	* }).pipe(
	*   Effect.repeat(everyTwoSeconds)
	* )
	*
	* // Limited repeat - run only 5 times with 1-second spacing
	* const limitedTask = Effect.gen(function* () {
	*   yield* Console.log("Executing scheduled task...")
	*   yield* Effect.sleep("500 millis") // simulate work
	*   return "Task completed"
	* }).pipe(
	*   Effect.repeat(
	*     Schedule.spaced("1 second").pipe(Schedule.take(5))
	*   )
	* )
	*
	* // Simple spaced schedule with limited repetitions
	* const limitedSpaced = Schedule.spaced("100 millis").pipe(
	*   Schedule.compose(Schedule.recurs(5)) // at most 5 times
	* )
	*
	* const program = Effect.gen(function* () {
	*   yield* Console.log("Starting spaced execution...")
	*
	*   yield* Effect.repeat(
	*     Effect.succeed("work item"),
	*     limitedSpaced
	*   )
	*
	*   yield* Console.log("Completed executions")
	* })
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const spaced = (duration) => {
		const decoded = fromDurationInputUnsafe(duration);
		return fromStepWithMetadata(succeed$4((meta) => succeed$4([meta.recurrence, decoded])));
	};
	const while_ = /* @__PURE__ */ dual(2, (self, predicate) => fromStep(map$4(toStep(self), (step) => {
		const meta = metadataFn();
		return (now, input) => flatMap$3(step(now, input), (result$2) => {
			const check = predicate({
				...meta(now, input),
				output: result$2[0]
			});
			return isEffect$1(check) ? flatMap$3(check, (check$1) => check$1 ? succeed$4(result$2) : halt(result$2[0])) : check ? succeed$4(result$2) : halt(result$2[0]);
		});
	})));
	/**
	* Returns a new `Schedule` that will recur forever.
	*
	* The output of the schedule is the current count of its repetitions thus far
	* (i.e. `0, 1, 2, ...`).
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	* import { Console } from "effect"
	*
	* // A schedule that runs forever with no delay
	* const infiniteSchedule = Schedule.forever
	*
	* const program = Effect.gen(function* () {
	*   yield* Effect.repeat(
	*     Effect.gen(function* () {
	*       yield* Console.log("Running forever...")
	*       return "continuous-task"
	*     }),
	*     infiniteSchedule.pipe(Schedule.take(5)) // Limit for demo
	*   )
	* })
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const forever$1 = /* @__PURE__ */ spaced(zero);

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/internal/schedule.js
/** @internal */
	const repeatOrElse$1 = /* @__PURE__ */ dual(3, (self, schedule, orElse) => flatMap$3(toStepWithSleep(schedule), (step) => {
		let lastOutput = none();
		return catch_$1(forever$2(tap$3(flatMap$3(self, step), (output) => {
			lastOutput = some(output);
		}), { autoYield: false }), (error) => isHalt(error) ? succeed$4(error.leftover) : orElse(error, lastOutput));
	}));
	/** @internal */
	const retryOrElse$1 = /* @__PURE__ */ dual(3, (self, policy, orElse) => flatMap$3(toStepWithSleep(policy), (step) => {
		let lastError;
		const loop = catch_$1(self, (error) => {
			lastError = error;
			return flatMap$3(step(error), () => loop);
		});
		return catchHalt(loop, (out) => internalCall(() => orElse(lastError, out)));
	}));
	/** @internal */
	const repeat$1 = /* @__PURE__ */ dual(2, (self, options) => repeatOrElse$1(self, isSchedule(options) ? options : buildFromOptions(options), fail$3));
	/** @internal */
	const retry$1 = /* @__PURE__ */ dual(2, (self, options) => retryOrElse$1(self, isSchedule(options) ? options : buildFromOptions(options), fail$3));
	/** @internal */
	const scheduleFrom$1 = /* @__PURE__ */ dual(3, (self, initial, schedule) => flatMap$3(toStepWithSleep(schedule), (step) => catch_$1(andThen$1(step(initial), forever$2(flatMap$3(self, step), { autoYield: false })), (error) => isHalt(error) ? succeed$4(error.leftover) : fail$3(error))));
	const passthroughForever = /* @__PURE__ */ passthrough(forever$1);
	const buildFromOptions = (options) => {
		let schedule = options.schedule ?? passthroughForever;
		if (options.while) schedule = while_(schedule, ({ input }) => options.while(input));
		if (options.until) schedule = while_(schedule, ({ input }) => {
			const applied = options.until(input);
			return typeof applied === "boolean" ? !applied : map$4(applied, (b) => !b);
		});
		if (options.times !== void 0) schedule = while_(schedule, ({ recurrence }) => recurrence < options.times);
		return schedule;
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Effect.js
	const TypeId$3 = EffectTypeId;
	/**
	* Tests if a value is an `Effect`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* console.log(Effect.isEffect(Effect.succeed(1))) // true
	* console.log(Effect.isEffect("hello")) // false
	* ```
	*
	* @since 2.0.0
	* @category guards
	*/
	const isEffect = (u) => typeof u === "object" && u !== null && TypeId$3 in u;
	/**
	* Combines multiple effects into one, returning results based on the input
	* structure.
	*
	* **Details**
	*
	* Use this function when you need to run multiple effects and combine their
	* results into a single output. It supports tuples, iterables, structs, and
	* records, making it flexible for different input types.
	*
	* For instance, if the input is a tuple:
	*
	* ```ts skip-type-checking
	* //         ┌─── a tuple of effects
	* //         ▼
	* Effect.all([effect1, effect2, ...])
	* ```
	*
	* the effects are executed sequentially, and the result is a new effect
	* containing the results as a tuple. The results in the tuple match the order
	* of the effects passed to `Effect.all`.
	*
	* **Concurrency**
	*
	* You can control the execution order (e.g., sequential vs. concurrent) using
	* the `concurrency` option.
	*
	* **Short-Circuiting Behavior**
	*
	* This function stops execution on the first error it encounters, this is
	* called "short-circuiting". If any effect in the collection fails, the
	* remaining effects will not run, and the error will be propagated. To change
	* this behavior, you can use the `mode` option, which allows all effects to run
	* and collect results as `Result` or `Option`.
	*
	* **The `mode` option**
	*
	* The `{ mode: "result" }` option changes the behavior of `Effect.all` to
	* ensure all effects run, even if some fail. Instead of stopping on the first
	* failure, this mode collects both successes and failures, returning an array
	* of `Result` instances where each result is either an `Ok` (success) or a
	* `Err` (failure).
	*
	* Similarly, the `{ mode: "validate" }` option uses `Option` to indicate
	* success or failure. Each effect returns `None` for success and `Some` with
	* the error for failure.
	*
	* @example Combining Effects in Tuples
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const tupleOfEffects = [
	*   Effect.succeed(42).pipe(Effect.tap(Console.log)),
	*   Effect.succeed("Hello").pipe(Effect.tap(Console.log))
	* ] as const
	*
	* //      ┌─── Effect<[number, string], never, never>
	* //      ▼
	* const resultsAsTuple = Effect.all(tupleOfEffects)
	*
	* Effect.runPromise(resultsAsTuple).then(console.log)
	* // Output:
	* // 42
	* // Hello
	* // [ 42, 'Hello' ]
	* ```
	*
	* @example Combining Effects in Iterables
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const iterableOfEffects: Iterable<Effect.Effect<number>> = [1, 2, 3].map(
	*   (n) => Effect.succeed(n).pipe(Effect.tap(Console.log))
	* )
	*
	* //      ┌─── Effect<number[], never, never>
	* //      ▼
	* const resultsAsArray = Effect.all(iterableOfEffects)
	*
	* Effect.runPromise(resultsAsArray).then(console.log)
	* // Output:
	* // 1
	* // 2
	* // 3
	* // [ 1, 2, 3 ]
	* ```
	*
	* @example Combining Effects in Structs
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const structOfEffects = {
	*   a: Effect.succeed(42).pipe(Effect.tap(Console.log)),
	*   b: Effect.succeed("Hello").pipe(Effect.tap(Console.log))
	* }
	*
	* //      ┌─── Effect<{ a: number; b: string; }, never, never>
	* //      ▼
	* const resultsAsStruct = Effect.all(structOfEffects)
	*
	* Effect.runPromise(resultsAsStruct).then(console.log)
	* // Output:
	* // 42
	* // Hello
	* // { a: 42, b: 'Hello' }
	* ```
	*
	* @example Combining Effects in Records
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const recordOfEffects: Record<string, Effect.Effect<number>> = {
	*   key1: Effect.succeed(1).pipe(Effect.tap(Console.log)),
	*   key2: Effect.succeed(2).pipe(Effect.tap(Console.log))
	* }
	*
	* //      ┌─── Effect<{ [x: string]: number; }, never, never>
	* //      ▼
	* const resultsAsRecord = Effect.all(recordOfEffects)
	*
	* Effect.runPromise(resultsAsRecord).then(console.log)
	* // Output:
	* // 1
	* // 2
	* // { key1: 1, key2: 2 }
	* ```
	*
	* @example Short-Circuiting Behavior
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const program = Effect.all([
	*   Effect.succeed("Task1").pipe(Effect.tap(Console.log)),
	*   Effect.fail("Task2: Oh no!").pipe(Effect.tap(Console.log)),
	*   // Won't execute due to earlier failure
	*   Effect.succeed("Task3").pipe(Effect.tap(Console.log))
	* ])
	*
	* Effect.runPromiseExit(program).then(console.log)
	* // Output:
	* // Task1
	* // {
	* //   _id: 'Exit',
	* //   _tag: 'Failure',
	* //   cause: { _id: 'Cause', _tag: 'Fail', failure: 'Task2: Oh no!' }
	* // }
	* ```
	*
	* @see {@link forEach} for iterating over elements and applying an effect.
	* @see {@link allWith} for a data-last version of this function.
	*
	* @since 2.0.0
	* @category Collecting
	*/
	const all = all$1;
	/**
	* Executes an effectful operation for each element in an `Iterable`.
	*
	* **Details**
	*
	* The `forEach` function applies a provided operation to each element in the
	* iterable, producing a new effect that returns an array of results.
	*
	* If any effect fails, the iteration stops immediately (short-circuiting), and
	* the error is propagated.
	*
	* **Concurrency**
	*
	* The `concurrency` option controls how many operations are performed
	* concurrently. By default, the operations are performed sequentially.
	*
	* **Discarding Results**
	*
	* If the `discard` option is set to `true`, the intermediate results are not
	* collected, and the final result of the operation is `void`.
	*
	* @see {@link all} for combining multiple effects into one.
	*
	* @example
	* ```ts
	* // Title: Applying Effects to Iterable Elements
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const result = Effect.forEach([1, 2, 3, 4, 5], (n, index) =>
	*   Console.log(`Currently at index ${index}`).pipe(Effect.as(n * 2))
	* )
	*
	* Effect.runPromise(result).then(console.log)
	* // Output:
	* // Currently at index 0
	* // Currently at index 1
	* // Currently at index 2
	* // Currently at index 3
	* // Currently at index 4
	* // [ 2, 4, 6, 8, 10 ]
	* ```
	*
	* @example
	* // Title: Using discard to Ignore Results
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* // Apply effects but discard the results
	* const result = Effect.forEach(
	*   [1, 2, 3, 4, 5],
	*   (n, index) =>
	*     Console.log(`Currently at index ${index}`).pipe(Effect.as(n * 2)),
	*   { discard: true }
	* )
	*
	* Effect.runPromise(result).then(console.log)
	* // Output:
	* // Currently at index 0
	* // Currently at index 1
	* // Currently at index 2
	* // Currently at index 3
	* // Currently at index 4
	* // undefined
	*
	* @since 2.0.0
	* @category Collecting
	*/
	const forEach = forEach$1;
	/**
	* Executes a body effect repeatedly while a condition holds true.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* let counter = 0
	*
	* const program = Effect.whileLoop({
	*   while: () => counter < 5,
	*   body: () => Effect.sync(() => ++counter),
	*   step: (n) => console.log(`Current count: ${n}`)
	* })
	*
	* Effect.runPromise(program)
	* // Output:
	* // Current count: 1
	* // Current count: 2
	* // Current count: 3
	* // Current count: 4
	* // Current count: 5
	* ```
	*
	* @since 2.0.0
	* @category Collecting
	*/
	const whileLoop = whileLoop$1;
	/**
	* Creates an `Effect` that represents an asynchronous computation guaranteed to
	* succeed.
	*
	* **When to Use**
	*
	* Use `promise` when you are sure the operation will not reject.
	*
	* **Details**
	*
	* The provided function (`thunk`) returns a `Promise` that should never reject; if it does, the error
	* will be treated as a "defect".
	*
	* This defect is not a standard error but indicates a flaw in the logic that
	* was expected to be error-free. You can think of it similar to an unexpected
	* crash in the program, which can be further managed or logged using tools like
	* {@link catchAllDefect}.
	*
	* **Interruptions**
	*
	* An optional `AbortSignal` can be provided to allow for interruption of the
	* wrapped `Promise` API.
	*
	* @see {@link tryPromise} for a version that can handle failures.
	*
	* @example
	* ```ts
	* // Title: Delayed Message
	* import { Effect } from "effect"
	*
	* const delay = (message: string) =>
	*   Effect.promise<string>(
	*     () =>
	*       new Promise((resolve) => {
	*         setTimeout(() => {
	*           resolve(message)
	*         }, 2000)
	*       })
	*   )
	*
	* //      ┌─── Effect<string, never, never>
	* //      ▼
	* const program = delay("Async operation completed successfully!")
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const promise = promise$1;
	/**
	* Creates an `Effect` that represents an asynchronous computation that might
	* fail.
	*
	* **When to Use**
	*
	* In situations where you need to perform asynchronous operations that might
	* fail, such as fetching data from an API, you can use the `tryPromise`
	* constructor. This constructor is designed to handle operations that could
	* throw exceptions by capturing those exceptions and transforming them into
	* manageable errors.
	*
	* **Error Handling**
	*
	* There are two ways to handle errors with `tryPromise`:
	*
	* 1. If you don't provide a `catch` function, the error is caught and the
	*    effect fails with an `UnknownError`.
	* 2. If you provide a `catch` function, the error is caught and the `catch`
	*    function maps it to an error of type `E`.
	*
	* **Interruptions**
	*
	* An optional `AbortSignal` can be provided to allow for interruption of the
	* wrapped `Promise` API.
	*
	* @example Fetching a TODO Item
	* ```ts
	* import { Effect } from "effect"
	*
	* const getTodo = (id: number) =>
	*   // Will catch any errors and propagate them as UnknownError
	*   Effect.tryPromise(() =>
	*     fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
	*   )
	*
	* //      ┌─── Effect<Response, UnknownError, never>
	* //      ▼
	* const program = getTodo(1)
	* ```
	*
	* @example Custom Error Handling
	* ```ts
	* import { Effect } from "effect"
	*
	* const getTodo = (id: number) =>
	*   Effect.tryPromise({
	*     try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
	*     // remap the error
	*     catch: (unknown) => new Error(`something went wrong ${unknown}`)
	*   })
	*
	* //      ┌─── Effect<Response, Error, never>
	* //      ▼
	* const program = getTodo(1)
	* ```
	*
	* @see {@link promise} if the effectful computation is asynchronous and does not throw errors.
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const tryPromise = tryPromise$1;
	/**
	* Creates an `Effect` that always succeeds with a given value.
	*
	* **When to Use**
	*
	* Use this function when you need an effect that completes successfully with a
	* specific value without any errors or external dependencies.
	*
	* @see {@link fail} to create an effect that represents a failure.
	*
	* @example
	* ```ts
	* // Title: Creating a Successful Effect
	* import { Effect } from "effect"
	*
	* // Creating an effect that represents a successful scenario
	* //
	* //      ┌─── Effect<number, never, never>
	* //      ▼
	* const success = Effect.succeed(42)
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const succeed$2 = succeed$4;
	/**
	* Returns an effect which succeeds with `None`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.succeedNone
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: { _id: 'Option', _tag: 'None' }
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const succeedNone = succeedNone$1;
	/**
	* Returns an effect which succeeds with the value wrapped in a `Some`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.succeedSome(42)
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: { _id: 'Option', _tag: 'Some', value: 42 }
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const succeedSome = succeedSome$1;
	/**
	* Delays the creation of an `Effect` until it is actually needed.
	*
	* **When to Use**
	*
	* Use `suspend` when you need to defer the evaluation of an effect until it is required. This is particularly useful for optimizing expensive computations, managing circular dependencies, or resolving type inference issues.
	*
	* **Details**
	*
	* `suspend` takes a thunk that represents the effect and wraps it in a suspended effect. This means the effect will not be created until it is explicitly needed, which is helpful in various scenarios:
	* - **Lazy Evaluation**: Helps optimize performance by deferring computations, especially when the effect might not be needed, or when its computation is expensive. This also ensures that any side effects or scoped captures are re-executed on each invocation.
	* - **Handling Circular Dependencies**: Useful in managing circular dependencies, such as recursive functions that need to avoid eager evaluation to prevent stack overflow.
	* - **Unifying Return Types**: Can help TypeScript unify return types in situations where multiple branches of logic return different effects, simplifying type inference.
	*
	* @example
	* ```ts
	* // Title: Lazy Evaluation with Side Effects
	* import { Effect } from "effect"
	*
	* let i = 0
	*
	* const bad = Effect.succeed(i++)
	*
	* const good = Effect.suspend(() => Effect.succeed(i++))
	*
	* console.log(Effect.runSync(bad)) // Output: 0
	* console.log(Effect.runSync(bad)) // Output: 0
	*
	* console.log(Effect.runSync(good)) // Output: 1
	* console.log(Effect.runSync(good)) // Output: 2
	* ```
	*
	* @example
	* // Title: Recursive Fibonacci
	* import { Effect } from "effect"
	*
	* const blowsUp = (n: number): Effect.Effect<number> =>
	*   n < 2
	*     ? Effect.succeed(1)
	*     : Effect.zipWith(blowsUp(n - 1), blowsUp(n - 2), (a, b) => a + b)
	*
	* // console.log(Effect.runSync(blowsUp(32)))
	* // crash: JavaScript heap out of memory
	*
	* const allGood = (n: number): Effect.Effect<number> =>
	*   n < 2
	*     ? Effect.succeed(1)
	*     : Effect.zipWith(
	*         Effect.suspend(() => allGood(n - 1)),
	*         Effect.suspend(() => allGood(n - 2)),
	*         (a, b) => a + b
	*       )
	*
	* console.log(Effect.runSync(allGood(32)))
	* // Output: 3524578
	*
	* @example
	* // Title: Using Effect.suspend to Help TypeScript Infer Types
	* import { Effect } from "effect"
	*
	* //   Without suspend, TypeScript may struggle with type inference.
	* //   Inferred type:
	* //     (a: number, b: number) =>
	* //       Effect<never, Error, never> | Effect<number, never, never>
	* const withoutSuspend = (a: number, b: number) =>
	*   b === 0
	*     ? Effect.fail(new Error("Cannot divide by zero"))
	*     : Effect.succeed(a / b)
	*
	* //   Using suspend to unify return types.
	* //   Inferred type:
	* //     (a: number, b: number) => Effect<number, Error, never>
	* const withSuspend = (a: number, b: number) =>
	*   Effect.suspend(() =>
	*     b === 0
	*       ? Effect.fail(new Error("Cannot divide by zero"))
	*       : Effect.succeed(a / b)
	*   )
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const suspend$2 = suspend$3;
	/**
	* Creates an `Effect` that represents a synchronous side-effectful computation.
	*
	* **When to Use**
	*
	* Use `sync` when you are sure the operation will not fail.
	*
	* **Details**
	*
	* The provided function (`thunk`) must not throw errors; if it does, the error
	* will be treated as a "defect".
	*
	* This defect is not a standard error but indicates a flaw in the logic that
	* was expected to be error-free. You can think of it similar to an unexpected
	* crash in the program, which can be further managed or logged using tools like
	* {@link catchAllDefect}.
	*
	* @see {@link try_ | try} for a version that can handle failures.
	*
	* @example
	* ```ts
	* // Title: Logging a Message
	* import { Effect } from "effect"
	*
	* const log = (message: string) =>
	*   Effect.sync(() => {
	*     console.log(message) // side effect
	*   })
	*
	* //      ┌─── Effect<void, never, never>
	* //      ▼
	* const program = log("Hello, World!")
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const sync = sync$1;
	const void_ = void_$2;
	const undefined_ = undefined_$1;
	/**
	* Creates an `Effect` from a callback-based asynchronous function.
	*
	* **Details**
	*
	* The `resume` function:
	* - Must be called exactly once. Any additional calls will be ignored.
	* - Can return an optional `Effect` that will be run if the `Fiber` executing
	*   this `Effect` is interrupted. This can be useful in scenarios where you
	*   need to handle resource cleanup if the operation is interrupted.
	* - Can receive an `AbortSignal` to handle interruption if needed.
	*
	* The `FiberId` of the fiber that may complete the async callback may also be
	* specified using the `blockingOn` argument. This is called the "blocking
	* fiber" because it suspends the fiber executing the `async` effect (i.e.
	* semantically blocks the fiber from making progress). Specifying this fiber id
	* in cases where it is known will improve diagnostics, but not affect the
	* behavior of the returned effect.
	*
	* **When to Use**
	*
	* Use `Effect.async` when dealing with APIs that use callback-style instead of
	* `async/await` or `Promise`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const delay = (ms: number) =>
	*   Effect.callback<void>((resume) => {
	*     const timeoutId = setTimeout(() => {
	*       resume(Effect.void)
	*     }, ms)
	*     // Cleanup function for interruption
	*     return Effect.sync(() => clearTimeout(timeoutId))
	*   })
	*
	* const program = delay(1000)
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const callback$1 = callback$2;
	/**
	* Returns an effect that will never produce anything. The moral equivalent of
	* `while(true) {}`, only without the wasted CPU cycles.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // This effect will never complete
	* const program = Effect.never
	*
	* // This will run forever (or until interrupted)
	* // Effect.runPromise(program) // Never resolves
	*
	* // Use with timeout for practical applications
	* const timedProgram = Effect.timeout(program, "1 second")
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const never$2 = never$3;
	/**
	* Provides a way to write effectful code using generator functions, simplifying
	* control flow and error handling.
	*
	* **When to Use**
	*
	* `gen` allows you to write code that looks and behaves like synchronous
	* code, but it can handle asynchronous tasks, errors, and complex control flow
	* (like loops and conditions). It helps make asynchronous code more readable
	* and easier to manage.
	*
	* The generator functions work similarly to `async/await` but with more
	* explicit control over the execution of effects. You can `yield*` values from
	* effects and return the final result at the end.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const addServiceCharge = (amount: number) => amount + 1
	*
	* const applyDiscount = (
	*   total: number,
	*   discountRate: number
	* ): Effect.Effect<number, Error> =>
	*   discountRate === 0
	*     ? Effect.fail(new Error("Discount rate cannot be zero"))
	*     : Effect.succeed(total - (total * discountRate) / 100)
	*
	* const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
	*
	* const fetchDiscountRate = Effect.promise(() => Promise.resolve(5))
	*
	* export const program = Effect.gen(function* () {
	*   const transactionAmount = yield* fetchTransactionAmount
	*   const discountRate = yield* fetchDiscountRate
	*   const discountedAmount = yield* applyDiscount(
	*     transactionAmount,
	*     discountRate
	*   )
	*   const finalAmount = addServiceCharge(discountedAmount)
	*   return `Final amount to charge: ${finalAmount}`
	* })
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const gen = gen$1;
	/**
	* Creates an `Effect` that represents a recoverable error.
	*
	* **When to Use**
	*
	* Use this function to explicitly signal an error in an `Effect`. The error
	* will keep propagating unless it is handled. You can handle the error with
	* functions like {@link catchAll} or {@link catchTag}.
	*
	* @see {@link succeed} to create an effect that represents a successful value.
	*
	* @example
	* ```ts
	* // Title: Creating a Failed Effect
	* import { Effect } from "effect"
	*
	* //      ┌─── Effect<never, Error, never>
	* //      ▼
	* const failure = Effect.fail(
	*   new Error("Operation failed due to network error")
	* )
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const fail = fail$3;
	/**
	* Creates an `Effect` that represents a recoverable error using a lazy evaluation.
	*
	* This function is useful when you need to create an error effect but want to
	* defer the computation of the error value until the effect is actually run.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.failSync(() => new Error("Something went wrong"))
	*
	* Effect.runPromiseExit(program).then(console.log)
	* // Output: { _id: 'Exit', _tag: 'Failure', cause: ... }
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const failSync = failSync$1;
	/**
	* Creates an `Effect` that represents a failure with a specific `Cause`.
	*
	* This function allows you to create effects that fail with complex error
	* structures, including multiple errors, defects, interruptions, and more.
	*
	* @example
	* ```ts
	* import { Cause, Effect } from "effect"
	*
	* const program = Effect.failCause(
	*   Cause.fail("Network error")
	* )
	*
	* Effect.runPromiseExit(program).then(console.log)
	* // Output: { _id: 'Exit', _tag: 'Failure', cause: ... }
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const failCause$1 = failCause$3;
	/**
	* Creates an `Effect` that represents a failure with a `Cause` computed lazily.
	*
	* This function is useful when you need to create a failure effect with a
	* complex cause but want to defer the computation until the effect is run.
	*
	* @example
	* ```ts
	* import { Cause, Effect } from "effect"
	*
	* const program = Effect.failCauseSync(() =>
	*   Cause.fail("Error computed at runtime")
	* )
	*
	* Effect.runPromiseExit(program).then(console.log)
	* // Output: { _id: 'Exit', _tag: 'Failure', cause: ... }
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const failCauseSync = failCauseSync$1;
	/**
	* Creates an effect that terminates a fiber with a specified error.
	*
	* **When to Use**
	*
	* Use `die` when encountering unexpected conditions in your code that should
	* not be handled as regular errors but instead represent unrecoverable defects.
	*
	* **Details**
	*
	* The `die` function is used to signal a defect, which represents a critical
	* and unexpected error in the code. When invoked, it produces an effect that
	* does not handle the error and instead terminates the fiber.
	*
	* The error channel of the resulting effect is of type `never`, indicating that
	* it cannot recover from this failure.
	*
	* @see {@link dieSync} for a variant that throws a specified error, evaluated lazily.
	* @see {@link dieMessage} for a variant that throws a `RuntimeException` with a message.
	*
	* @example
	* ```ts
	* // Title: Terminating on Division by Zero with a Specified Error
	* import { Effect } from "effect"
	*
	* const divide = (a: number, b: number) =>
	*   b === 0
	*     ? Effect.die(new Error("Cannot divide by zero"))
	*     : Effect.succeed(a / b)
	*
	* //      ┌─── Effect<number, never, never>
	* //      ▼
	* const program = divide(1, 0)
	*
	* Effect.runPromise(program).catch(console.error)
	* // Output:
	* // (FiberFailure) Error: Cannot divide by zero
	* //   ...stack trace...
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const die = die$3;
	const try_ = try_$1;
	/**
	* Yields control back to the Effect runtime, allowing other fibers to execute.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   console.log("Before yield")
	*   yield* Effect.yieldNow
	*   console.log("After yield")
	* })
	*
	* Effect.runPromise(program)
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const yieldNow = yieldNow$1;
	/**
	* Yields control back to the Effect runtime with a specified priority, allowing other fibers to execute.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   console.log("High priority task")
	*   yield* Effect.yieldNowWith(10) // Higher priority
	*   console.log("Continued after yield")
	* })
	*
	* Effect.runPromise(program)
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const yieldNowWith = yieldNowWith$1;
	/**
	* Provides access to the current fiber within an effect computation.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.withFiber((fiber) =>
	*   Effect.succeed(`Fiber ID: ${fiber.id}`)
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: Fiber ID: 1
	* ```
	*
	* @since 2.0.0
	* @category Creating Effects
	*/
	const withFiber = withFiber$1;
	/**
	* Converts a `Result` to an `Effect`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Result } from "effect/data"
	*
	* const success = Result.succeed(42)
	* const failure = Result.fail("Something went wrong")
	*
	* const effect1 = Effect.fromResult(success)
	* const effect2 = Effect.fromResult(failure)
	*
	* Effect.runPromise(effect1).then(console.log) // 42
	* Effect.runPromiseExit(effect2).then(console.log)
	* // { _id: 'Exit', _tag: 'Failure', cause: { _id: 'Cause', _tag: 'Fail', failure: 'Something went wrong' } }
	* ```
	*
	* @since 4.0.0
	* @category Conversions
	*/
	const fromResult = fromResult$1;
	/**
	* Converts an `Option` to an `Effect`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Option } from "effect/data"
	*
	* const some = Option.some(42)
	* const none = Option.none()
	*
	* const effect1 = Effect.fromOption(some)
	* const effect2 = Effect.fromOption(none)
	*
	* Effect.runPromise(effect1).then(console.log) // 42
	* Effect.runPromiseExit(effect2).then(console.log)
	* // { _id: 'Exit', _tag: 'Failure', cause: { _id: 'Cause', _tag: 'Fail', failure: { _id: 'NoSuchElementError' } } }
	* ```
	*
	* @since 4.0.0
	* @category Conversions
	*/
	const fromOption = fromOption$1;
	/**
	* Converts a nullish value to an `Effect`, failing with a `NoSuchElementError`
	* if the value is `null` or `undefined`.
	*
	* @since 4.0.0
	* @category Conversions
	*/
	const fromNullishOr = fromNullishOr$1;
	/**
	* Converts a yieldable value to an Effect.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import * as Option from "effect/data/Option"
	*
	* // Option is yieldable in Effect
	* const program = Effect.gen(function* () {
	*   const value = yield* Effect.fromYieldable(Option.some(42))
	*   return value * 2
	* })
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: 84
	* ```
	*
	* @since 4.0.0
	* @category Conversions
	*/
	const fromYieldable = fromYieldable$1;
	/**
	* Chains effects to produce new `Effect` instances, useful for combining
	* operations that depend on previous results.
	*
	* **Syntax**
	*
	* ```ts skip-type-checking
	* const flatMappedEffect = pipe(myEffect, Effect.flatMap(transformation))
	* // or
	* const flatMappedEffect = Effect.flatMap(myEffect, transformation)
	* // or
	* const flatMappedEffect = myEffect.pipe(Effect.flatMap(transformation))
	* ```
	*
	* **Details**
	*
	* `flatMap` lets you sequence effects so that the result of one effect can be
	* used in the next step. It is similar to `flatMap` used with arrays but works
	* specifically with `Effect` instances, allowing you to avoid deeply nested
	* effect structures.
	*
	* Since effects are immutable, `flatMap` always returns a new effect instead of
	* changing the original one.
	*
	* **When to Use**
	*
	* Use `flatMap` when you need to chain multiple effects, ensuring that each
	* step produces a new `Effect` while flattening any nested effects that may
	* occur.
	*
	* @example
	* ```ts
	* import { pipe, Effect } from "effect"
	*
	* // Function to apply a discount safely to a transaction amount
	* const applyDiscount = (
	*   total: number,
	*   discountRate: number
	* ): Effect.Effect<number, Error> =>
	*   discountRate === 0
	*     ? Effect.fail(new Error("Discount rate cannot be zero"))
	*     : Effect.succeed(total - (total * discountRate) / 100)
	*
	* // Simulated asynchronous task to fetch a transaction amount from database
	* const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
	*
	* // Chaining the fetch and discount application using `flatMap`
	* const finalAmount = pipe(
	*   fetchTransactionAmount,
	*   Effect.flatMap((amount) => applyDiscount(amount, 5))
	* )
	*
	* Effect.runPromise(finalAmount).then(console.log)
	* // Output: 95
	* ```
	*
	* @see {@link tap} for a version that ignores the result of the effect.
	*
	* @since 2.0.0
	* @category Sequencing
	*/
	const flatMap$2 = flatMap$3;
	/**
	* @since 2.0.0
	* @category Sequencing
	*/
	const flatten$1 = flatten$2;
	/**
	* Chains two actions, where the second action can depend on the result of the
	* first.
	*
	* **Syntax**
	*
	* ```ts skip-type-checking
	* const transformedEffect = pipe(myEffect, Effect.andThen(anotherEffect))
	* // or
	* const transformedEffect = Effect.andThen(myEffect, anotherEffect)
	* // or
	* const transformedEffect = myEffect.pipe(Effect.andThen(anotherEffect))
	* ```
	*
	* **When to Use**
	*
	* Use `andThen` when you need to run multiple actions in sequence, with the
	* second action depending on the result of the first. This is useful for
	* combining effects or handling computations that must happen in order.
	*
	* **Details**
	*
	* The second action can be:
	*
	* - A constant value (similar to {@link as})
	* - A function returning a value (similar to {@link map})
	* - A `Promise`
	* - A function returning a `Promise`
	* - An `Effect`
	* - A function returning an `Effect` (similar to {@link flatMap})
	*
	* **Note:** `andThen` works well with both `Option` and `Result` types,
	* treating them as effects.
	*
	* @example Applying a Discount Based on Fetched Amount
	* ```ts
	* import { pipe, Effect } from "effect"
	*
	* // Function to apply a discount safely to a transaction amount
	* const applyDiscount = (
	*   total: number,
	*   discountRate: number
	* ): Effect.Effect<number, Error> =>
	*   discountRate === 0
	*     ? Effect.fail(new Error("Discount rate cannot be zero"))
	*     : Effect.succeed(total - (total * discountRate) / 100)
	*
	* // Simulated asynchronous task to fetch a transaction amount from database
	* const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
	*
	* // Using Effect.map and Effect.flatMap
	* const result1 = pipe(
	*   fetchTransactionAmount,
	*   Effect.map((amount) => amount * 2),
	*   Effect.flatMap((amount) => applyDiscount(amount, 5))
	* )
	*
	* Effect.runPromise(result1).then(console.log)
	* // Output: 190
	*
	* // Using Effect.andThen
	* const result2 = pipe(
	*   fetchTransactionAmount,
	*   Effect.andThen((amount) => amount * 2),
	*   Effect.andThen((amount) => applyDiscount(amount, 5))
	* )
	*
	* Effect.runPromise(result2).then(console.log)
	* // Output: 190
	* ```
	*
	* @since 2.0.0
	* @category Sequencing
	*/
	const andThen = andThen$1;
	/**
	* Runs a side effect with the result of an effect without changing the original
	* value.
	*
	* **When to Use**
	*
	* Use `tap` when you want to perform a side effect, like logging or tracking,
	* without modifying the main value. This is useful when you need to observe or
	* record an action but want the original value to be passed to the next step.
	*
	* **Details**
	*
	* `tap` works similarly to `flatMap`, but it ignores the result of the function
	* passed to it. The value from the previous effect remains available for the
	* next part of the chain. Note that if the side effect fails, the entire chain
	* will fail too.
	*
	* @example
	* ```ts
	* // Title: Logging a step in a pipeline
	* import { Effect, pipe } from "effect"
	* import { Console } from "effect"
	*
	* // Function to apply a discount safely to a transaction amount
	* const applyDiscount = (
	*   total: number,
	*   discountRate: number
	* ): Effect.Effect<number, Error> =>
	*   discountRate === 0
	*     ? Effect.fail(new Error("Discount rate cannot be zero"))
	*     : Effect.succeed(total - (total * discountRate) / 100)
	*
	* // Simulated asynchronous task to fetch a transaction amount from database
	* const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
	*
	* const finalAmount = pipe(
	*   fetchTransactionAmount,
	*   // Log the fetched transaction amount
	*   Effect.tap((amount) => Console.log(`Apply a discount to: ${amount}`)),
	*   // `amount` is still available!
	*   Effect.flatMap((amount) => applyDiscount(amount, 5))
	* )
	*
	* Effect.runPromise(finalAmount).then(console.log)
	* // Output:
	* // Apply a discount to: 100
	* // 95
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const tap$2 = tap$3;
	/**
	* Encapsulates both success and failure of an `Effect` into a `Result` type.
	*
	* **Details**
	*
	* This function converts an effect that may fail into an effect that always
	* succeeds, wrapping the outcome in a `Result` type. The result will be
	* `Result.Err` if the effect fails, containing the recoverable error, or
	* `Result.Ok` if it succeeds, containing the result.
	*
	* Using this function, you can handle recoverable errors explicitly without
	* causing the effect to fail. This is particularly useful in scenarios where
	* you want to chain effects and manage both success and failure in the same
	* logical flow.
	*
	* It's important to note that unrecoverable errors, often referred to as
	* "defects," are still thrown and not captured within the `Result` type. Only
	* failures that are explicitly represented as recoverable errors in the effect
	* are encapsulated.
	*
	* The resulting effect cannot fail directly because all recoverable failures
	* are represented inside the `Result` type.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Result } from "effect/data"
	*
	* const success = Effect.succeed(42)
	* const failure = Effect.fail("Something went wrong")
	*
	* const program1 = Effect.result(success)
	* const program2 = Effect.result(failure)
	*
	* Effect.runPromise(program1).then(console.log)
	* // { _id: 'Result', _tag: 'Success', value: 42 }
	*
	* Effect.runPromise(program2).then(console.log)
	* // { _id: 'Result', _tag: 'Failure', error: 'Something went wrong' }
	* ```
	*
	* @see {@link option} for a version that uses `Option` instead.
	* @see {@link exit} for a version that encapsulates both recoverable errors and defects in an `Exit`.
	*
	* @since 4.0.0
	* @category Outcome Encapsulation
	*/
	const result = result$1;
	/**
	* Encapsulates the result of an effect in an `Option`.
	*
	* **Details**
	*
	* This function wraps the outcome of an effect in an `Option` type. If the
	* original effect succeeds, the success value is wrapped in `Option.some`. If
	* the effect fails, the failure is converted to `Option.none`.
	*
	* This is particularly useful for scenarios where you want to represent the
	* absence of a value explicitly, without causing the resulting effect to fail.
	* The resulting effect has an error type of `never`, meaning it cannot fail
	* directly. However, unrecoverable errors, also referred to as defects, are
	* not captured and will still result in failure.
	*
	* @see {@link result} for a version that uses `Result` instead.
	* @see {@link exit} for a version that encapsulates both recoverable errors and defects in an `Exit`.
	*
	* @since 2.0.0
	* @category Output Encapsulation
	*/
	const option = option$1;
	/**
	* Transforms an effect to encapsulate both failure and success using the `Exit`
	* data type.
	*
	* **Details**
	*
	* `exit` wraps an effect's success or failure inside an `Exit` type, allowing
	* you to handle both cases explicitly.
	*
	* The resulting effect cannot fail because the failure is encapsulated within
	* the `Exit.Failure` type. The error type is set to `never`, indicating that
	* the effect is structured to never fail directly.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	*
	* const success = Effect.succeed(42)
	* const failure = Effect.fail("Something went wrong")
	*
	* const program1 = Effect.exit(success)
	* const program2 = Effect.exit(failure)
	*
	* Effect.runPromise(program1).then(console.log)
	* // { _id: 'Exit', _tag: 'Success', value: 42 }
	*
	* Effect.runPromise(program2).then(console.log)
	* // { _id: 'Exit', _tag: 'Failure', cause: { _id: 'Cause', _tag: 'Fail', failure: 'Something went wrong' } }
	* ```
	*
	* @see {@link option} for a version that uses `Option` instead.
	* @see {@link result} for a version that uses `Result` instead.
	*
	* @since 2.0.0
	* @category Outcome Encapsulation
	*/
	const exit = exit$1;
	/**
	* Transforms the value inside an effect by applying a function to it.
	*
	* **Syntax**
	*
	* ```ts skip-type-checking
	* const mappedEffect = pipe(myEffect, Effect.map(transformation))
	* // or
	* const mappedEffect = Effect.map(myEffect, transformation)
	* // or
	* const mappedEffect = myEffect.pipe(Effect.map(transformation))
	* ```
	*
	* **Details**
	*
	* `map` takes a function and applies it to the value contained within an
	* effect, creating a new effect with the transformed value.
	*
	* It's important to note that effects are immutable, meaning that the original
	* effect is not modified. Instead, a new effect is returned with the updated
	* value.
	*
	* @example Adding a Service Charge
	* ```ts
	* import { pipe, Effect } from "effect"
	*
	* const addServiceCharge = (amount: number) => amount + 1
	*
	* const fetchTransactionAmount = Effect.promise(() => Promise.resolve(100))
	*
	* const finalAmount = pipe(
	*   fetchTransactionAmount,
	*   Effect.map(addServiceCharge)
	* )
	*
	* Effect.runPromise(finalAmount).then(console.log)
	* // Output: 101
	* ```
	*
	* @see {@link mapError} for a version that operates on the error channel.
	* @see {@link mapBoth} for a version that operates on both channels.
	* @see {@link flatMap} or {@link andThen} for a version that can return a new effect.
	*
	* @since 2.0.0
	* @category Mapping
	*/
	const map$1 = map$4;
	/**
	* Replaces the value inside an effect with a constant value.
	*
	* `as` allows you to ignore the original value inside an effect and
	* replace it with a new constant value.
	*
	* @example
	* ```ts
	* // Title: Replacing a Value
	* import { pipe, Effect } from "effect"
	*
	* // Replaces the value 5 with the constant "new value"
	* const program = pipe(Effect.succeed(5), Effect.as("new value"))
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: "new value"
	* ```
	*
	* @since 2.0.0
	* @category Mapping
	*/
	const as = as$1;
	/**
	* This function maps the success value of an `Effect` value to a `Some` value
	* in an `Option` value. If the original `Effect` value fails, the returned
	* `Effect` value will also fail.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import * as Option from "effect/data/Option"
	*
	* const program = Effect.asSome(Effect.succeed(42))
	*
	* Effect.runPromise(program).then(console.log)
	* // { _id: 'Option', _tag: 'Some', value: 42 }
	* ```
	*
	* @category Mapping
	* @since 2.0.0
	*/
	const asSome = asSome$1;
	/**
	* This function maps the success value of an `Effect` value to `void`. If the
	* original `Effect` value succeeds, the returned `Effect` value will also
	* succeed. If the original `Effect` value fails, the returned `Effect` value
	* will fail with the same error.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.asVoid(Effect.succeed(42))
	*
	* Effect.runPromise(program).then(console.log)
	* // undefined (void)
	* ```
	*
	* @since 2.0.0
	* @category Mapping
	*/
	const asVoid = asVoid$2;
	/**
	* The `flip` function swaps the success and error channels of an effect,
	* so that the success becomes the error, and the error becomes the success.
	*
	* This function is useful when you need to reverse the flow of an effect,
	* treating the previously successful values as errors and vice versa. This can
	* be helpful in scenarios where you want to handle a success as a failure or
	* treat an error as a valid result.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* //      ┌─── Effect<number, string, never>
	* //      ▼
	* const program = Effect.fail("Oh uh!").pipe(Effect.as(2))
	*
	* //      ┌─── Effect<string, number, never>
	* //      ▼
	* const flipped = Effect.flip(program)
	* ```
	*
	* @since 2.0.0
	* @category Mapping
	*/
	const flip = flip$1;
	/**
	* Combines two effects into a single effect, producing a tuple with the results of both effects.
	*
	* The `zip` function executes the first effect (left) and then the second effect (right).
	* Once both effects succeed, their results are combined into a tuple.
	*
	* **Concurrency**
	*
	* By default, `zip` processes the effects sequentially. To execute the effects concurrently,
	* use the `{ concurrent: true }` option.
	*
	* @see {@link zipWith} for a version that combines the results with a custom function.
	* @see {@link validate} for a version that accumulates errors.
	*
	* @example
	* ```ts
	* // Title: Combining Two Effects Sequentially
	* import { Effect } from "effect"
	*
	* const task1 = Effect.succeed(1).pipe(
	*   Effect.delay("200 millis"),
	*   Effect.tap(Effect.log("task1 done"))
	* )
	* const task2 = Effect.succeed("hello").pipe(
	*   Effect.delay("100 millis"),
	*   Effect.tap(Effect.log("task2 done"))
	* )
	*
	* // Combine the two effects together
	* //
	* //      ┌─── Effect<[number, string], never, never>
	* //      ▼
	* const program = Effect.zip(task1, task2)
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // timestamp=... level=INFO fiber=#0 message="task1 done"
	* // timestamp=... level=INFO fiber=#0 message="task2 done"
	* // [ 1, 'hello' ]
	* ```
	*
	* @example
	* // Title: Combining Two Effects Concurrently
	* import { Effect } from "effect"
	*
	* const task1 = Effect.succeed(1).pipe(
	*   Effect.delay("200 millis"),
	*   Effect.tap(Effect.log("task1 done"))
	* )
	* const task2 = Effect.succeed("hello").pipe(
	*   Effect.delay("100 millis"),
	*   Effect.tap(Effect.log("task2 done"))
	* )
	*
	* // Run both effects concurrently using the concurrent option
	* const program = Effect.zip(task1, task2, { concurrent: true })
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // timestamp=... level=INFO fiber=#0 message="task2 done"
	* // timestamp=... level=INFO fiber=#0 message="task1 done"
	* // [ 1, 'hello' ]
	*
	* @since 2.0.0
	* @category Zipping
	*/
	const zip = zip$1;
	/**
	* Combines two effects sequentially and applies a function to their results to
	* produce a single value.
	*
	* **When to Use**
	*
	* The `zipWith` function is similar to {@link zip}, but instead of returning a
	* tuple of results, it applies a provided function to the results of the two
	* effects, combining them into a single value.
	*
	* **Concurrency**
	*
	* By default, the effects are run sequentially. To execute them concurrently,
	* use the `{ concurrent: true }` option.
	*
	* @example
	* ```ts
	* // Title: Combining Effects with a Custom Function
	* import { Effect } from "effect"
	*
	* const task1 = Effect.succeed(1).pipe(
	*   Effect.delay("200 millis"),
	*   Effect.tap(Effect.log("task1 done"))
	* )
	* const task2 = Effect.succeed("hello").pipe(
	*   Effect.delay("100 millis"),
	*   Effect.tap(Effect.log("task2 done"))
	* )
	*
	* const task3 = Effect.zipWith(
	*   task1,
	*   task2,
	*   // Combines results into a single value
	*   (number, string) => number + string.length
	* )
	*
	* Effect.runPromise(task3).then(console.log)
	* // Output:
	* // timestamp=... level=INFO fiber=#3 message="task1 done"
	* // timestamp=... level=INFO fiber=#2 message="task2 done"
	* // 6
	* ```
	*
	* @since 2.0.0
	* @category Zipping
	*/
	const zipWith = zipWith$1;
	const catch_ = catch_$1;
	/**
	* Catches and handles specific errors by their `_tag` field, which is used as a
	* discriminator.
	*
	* **When to Use**
	*
	* `catchTag` is useful when your errors are tagged with a readonly `_tag` field
	* that identifies the error type. You can use this function to handle specific
	* error types by matching the `_tag` value. This allows for precise error
	* handling, ensuring that only specific errors are caught and handled.
	*
	* The error type must have a readonly `_tag` field to use `catchTag`. This
	* field is used to identify and match errors.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* class NetworkError {
	*   readonly _tag = "NetworkError"
	*   constructor(readonly message: string) {}
	* }
	*
	* class ValidationError {
	*   readonly _tag = "ValidationError"
	*   constructor(readonly message: string) {}
	* }
	*
	* declare const task: Effect.Effect<string, NetworkError | ValidationError>
	*
	* const program = Effect.catchTag(task, "NetworkError", (error) =>
	*   Effect.succeed(`Recovered from network error: ${error.message}`)
	* )
	* ```
	*
	* @since 2.0.0
	* @category Error handling
	*/
	const catchTag = catchTag$1;
	/**
	* Handles multiple errors in a single block of code using their `_tag` field.
	*
	* **When to Use**
	*
	* `catchTags` is a convenient way to handle multiple error types at
	* once. Instead of using {@link catchTag} multiple times, you can pass an
	* object where each key is an error type's `_tag`, and the value is the handler
	* for that specific error. This allows you to catch and recover from multiple
	* error types in a single call.
	*
	* The error type must have a readonly `_tag` field to use `catchTag`. This
	* field is used to identify and match errors.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Data } from "effect/data"
	*
	* // Define tagged error types
	* class ValidationError extends Data.TaggedError("ValidationError")<{
	*   message: string
	* }> {}
	*
	* class NetworkError extends Data.TaggedError("NetworkError")<{
	*   statusCode: number
	* }> {}
	*
	* // An effect that might fail with multiple error types
	* declare const program: Effect.Effect<string, ValidationError | NetworkError>
	*
	* // Handle multiple error types at once
	* const handled = Effect.catchTags(program, {
	*   ValidationError: (error) => Effect.succeed(`Validation failed: ${error.message}`),
	*   NetworkError: (error) => Effect.succeed(`Network error: ${error.statusCode}`)
	* })
	* ```
	*
	* @since 2.0.0
	* @category Error handling
	*/
	const catchTags = catchTags$1;
	/**
	* Handles both recoverable and unrecoverable errors by providing a recovery
	* effect.
	*
	* **When to Use**
	*
	* The `catchCause` function allows you to handle all errors, including
	* unrecoverable defects, by providing a recovery effect. The recovery logic is
	* based on the `Cause` of the error, which provides detailed information about
	* the failure.
	*
	* **When to Recover from Defects**
	*
	* Defects are unexpected errors that typically shouldn't be recovered from, as
	* they often indicate serious issues. However, in some cases, such as
	* dynamically loaded plugins, controlled recovery might be needed.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	* import { Console } from "effect"
	*
	* // An effect that might fail in different ways
	* const program = Effect.die("Something went wrong")
	*
	* // Recover from any cause (including defects)
	* const recovered = Effect.catchCause(program, (cause) => {
	*   if (Cause.hasDie(cause)) {
	*     return Console.log("Caught defect").pipe(
	*       Effect.as("Recovered from defect")
	*     )
	*   }
	*   return Effect.succeed("Unknown error")
	* })
	* ```
	*
	* @since 4.0.0
	* @category Error handling
	*/
	const catchCause = catchCause$1;
	/**
	* Recovers from all defects using a provided recovery function.
	*
	* **When to Use**
	*
	* There is no sensible way to recover from defects. This method should be used
	* only at the boundary between Effect and an external system, to transmit
	* information on a defect for diagnostic or explanatory purposes.
	*
	* **Details**
	*
	* `catchAllDefect` allows you to handle defects, which are unexpected errors
	* that usually cause the program to terminate. This function lets you recover
	* from these defects by providing a function that handles the error. However,
	* it does not handle expected errors (like those from {@link fail}) or
	* execution interruptions (like those from {@link interrupt}).
	*
	* **When to Recover from Defects**
	*
	* Defects are unexpected errors that typically shouldn't be recovered from, as
	* they often indicate serious issues. However, in some cases, such as
	* dynamically loaded plugins, controlled recovery might be needed.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* // An effect that might throw an unexpected error (defect)
	* const program = Effect.sync(() => {
	*   throw new Error("Unexpected error")
	* })
	*
	* // Recover from defects only
	* const recovered = Effect.catchDefect(program, (defect) => {
	*   return Console.log(`Caught defect: ${defect}`).pipe(
	*     Effect.as("Recovered from defect")
	*   )
	* })
	* ```
	*
	* @since 4.0.0
	* @category Error handling
	*/
	const catchDefect = catchDefect$1;
	/**
	* Recovers from specific errors based on a predicate.
	*
	* **When to Use**
	*
	* `catchFilter` works similarly to {@link catchSome}, but it allows you to
	* recover from errors by providing a predicate function. If the predicate
	* matches the error, the recovery effect is applied. This function doesn't
	* alter the error type, so the resulting effect still carries the original
	* error type unless a user-defined type guard is used to narrow the type.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // An effect that might fail with a number
	* const program = Effect.fail(42)
	*
	* // Recover only from specific error values
	* const recovered = Effect.catchFilter(program,
	*   (error) => error === 42,
	*   (error) => Effect.succeed(`Recovered from error: ${error}`)
	* )
	* ```
	*
	* @since 2.0.0
	* @category Error handling
	*/
	const catchFilter = catchFilter$1;
	/**
	* Recovers from specific failures based on a predicate.
	*
	* This function allows you to conditionally catch and recover from failures
	* that match a specific predicate. This is useful when you want to handle
	* only certain types of errors while letting others propagate.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	* import { Console } from "effect"
	*
	* const httpRequest = Effect.fail("Network Error")
	*
	* // Only catch network-related failures
	* const program = Effect.catchCauseFilter(
	*   httpRequest,
	*   (cause) => Cause.hasFail(cause),
	*   (failure, cause) => Effect.gen(function* () {
	*     yield* Console.log(`Caught network error: ${Cause.squash(cause)}`)
	*     return "Fallback response"
	*   })
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: "Caught network error: Network Error"
	* // Then: "Fallback response"
	* ```
	*
	* @since 4.0.0
	* @category Error handling
	*/
	const catchCauseFilter = catchCauseFilter$1;
	/**
	* The `mapError` function is used to transform or modify the error
	* produced by an effect, without affecting its success value.
	*
	* This function is helpful when you want to enhance the error with additional
	* information, change the error type, or apply custom error handling while
	* keeping the original behavior of the effect's success values intact. It only
	* operates on the error channel and leaves the success channel unchanged.
	*
	* @see {@link map} for a version that operates on the success channel.
	* @see {@link mapBoth} for a version that operates on both channels.
	* @see {@link orElseFail} if you want to replace the error with a new one.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* //      ┌─── Effect<number, string, never>
	* //      ▼
	* const simulatedTask = Effect.fail("Oh no!").pipe(Effect.as(1))
	*
	* //      ┌─── Effect<number, Error, never>
	* //      ▼
	* const mapped = Effect.mapError(
	*   simulatedTask,
	*   (message) => new Error(message)
	* )
	* ```
	*
	* @since 2.0.0
	* @category Error handling
	*/
	const mapError = mapError$2;
	/**
	* Applies transformations to both the success and error channels of an effect.
	*
	* **Details**
	*
	* This function takes two map functions as arguments: one for the error channel
	* and one for the success channel. You can use it when you want to modify both
	* the error and the success values without altering the overall success or
	* failure status of the effect.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* //      ┌─── Effect<number, string, never>
	* //      ▼
	* const simulatedTask = Effect.fail("Oh no!").pipe(Effect.as(1))
	*
	* //      ┌─── Effect<boolean, Error, never>
	* //      ▼
	* const modified = Effect.mapBoth(simulatedTask, {
	*   onFailure: (message) => new Error(message),
	*   onSuccess: (n) => n > 0
	* })
	* ```
	*
	* @see {@link map} for a version that operates on the success channel.
	* @see {@link mapError} for a version that operates on the error channel.
	*
	* @since 2.0.0
	* @category Mapping
	*/
	const mapBoth = mapBoth$2;
	/**
	* Converts an effect's failure into a fiber termination, removing the error from the effect's type.
	*
	* **When to Use*
	*
	* Use `orDie` when failures should be treated as unrecoverable defects and no error handling is required.
	*
	* **Details**
	*
	* The `orDie` function is used when you encounter errors that you do not want to handle or recover from.
	* It removes the error type from the effect and ensures that any failure will terminate the fiber.
	* This is useful for propagating failures as defects, signaling that they should not be handled within the effect.
	*
	* @see {@link orDieWith} if you need to customize the error.
	*
	* @example
	* ```ts
	* // Title: Propagating an Error as a Defect
	* import { Effect } from "effect"
	*
	* const divide = (a: number, b: number) =>
	*   b === 0
	*     ? Effect.fail(new Error("Cannot divide by zero"))
	*     : Effect.succeed(a / b)
	*
	* //      ┌─── Effect<number, never, never>
	* //      ▼
	* const program = Effect.orDie(divide(1, 0))
	*
	* Effect.runPromise(program).catch(console.error)
	* // Output:
	* // (FiberFailure) Error: Cannot divide by zero
	* //   ...stack trace...
	* ```
	*
	* @since 2.0.0
	* @category Converting Failures to Defects
	*/
	const orDie = orDie$1;
	/**
	* The `tapError` function executes an effectful operation to inspect the
	* failure of an effect without modifying it.
	*
	* This function is useful when you want to perform some side effect (like
	* logging or tracking) on the failure of an effect, but without changing the
	* result of the effect itself. The error remains in the effect's error channel,
	* while the operation you provide can inspect or act on it.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* // Simulate a task that fails with an error
	* const task: Effect.Effect<number, string> = Effect.fail("NetworkError")
	*
	* // Use tapError to log the error message when the task fails
	* const tapping = Effect.tapError(task, (error) =>
	*   Console.log(`expected error: ${error}`)
	* )
	*
	* Effect.runFork(tapping)
	* // Output:
	* // expected error: NetworkError
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const tapError = tapError$1;
	/**
	* The `tapCause` function allows you to inspect the complete cause
	* of an error, including failures and defects.
	*
	* This function is helpful when you need to log, monitor, or handle specific
	* error causes in your effects. It gives you access to the full error cause,
	* whether it's a failure, defect, or other exceptional conditions, without
	* altering the error or the overall result of the effect.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	* import { Console } from "effect"
	*
	* const task = Effect.fail("Something went wrong")
	*
	* const program = Effect.tapCause(task, (cause) =>
	*   Console.log(`Logging cause: ${Cause.squash(cause)}`)
	* )
	*
	* Effect.runPromiseExit(program).then(console.log)
	* // Output: "Logging cause: Error: Something went wrong"
	* // Then: { _id: 'Exit', _tag: 'Failure', cause: ... }
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const tapCause = tapCause$1;
	/**
	* Conditionally executes a side effect based on the cause of a failed effect.
	*
	* This function allows you to tap into the cause of an effect's failure only when
	* the cause matches a specific predicate. This is useful for conditional logging,
	* monitoring, or other side effects based on the type of failure.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	* import { Console } from "effect"
	*
	* const task = Effect.fail("Network timeout")
	*
	* // Only log causes that contain failures (not interrupts or defects)
	* const program = Effect.tapCauseFilter(
	*   task,
	*   (cause) => Cause.hasFail(cause),
	*   (_, cause) =>
	*     Console.log(`Logging failure cause: ${Cause.squash(cause)}`)
	* )
	*
	* Effect.runPromiseExit(program).then(console.log)
	* // Output: "Logging failure cause: Network timeout"
	* // Then: { _id: 'Exit', _tag: 'Failure', cause: ... }
	* ```
	*
	* @since 4.0.0
	* @category sequencing
	*/
	const tapCauseFilter = tapCauseFilter$1;
	/**
	* Inspect severe errors or defects (non-recoverable failures) in an effect.
	*
	* **Details**
	*
	* This function is specifically designed to handle and inspect defects, which
	* are critical failures in your program, such as unexpected runtime exceptions
	* or system-level errors. Unlike normal recoverable errors, defects typically
	* indicate serious issues that cannot be addressed through standard error
	* handling.
	*
	* When a defect occurs in an effect, the function you provide to this function
	* will be executed, allowing you to log, monitor, or handle the defect in some
	* way. Importantly, this does not alter the main result of the effect. If no
	* defect occurs, the effect behaves as if this function was not used.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* // Simulate a task that fails with a recoverable error
	* const task1: Effect.Effect<number, string> = Effect.fail("NetworkError")
	*
	* // tapDefect won't log anything because NetworkError is not a defect
	* const tapping1 = Effect.tapDefect(task1, (cause) =>
	*   Console.log(`defect: ${cause}`)
	* )
	*
	* Effect.runFork(tapping1)
	* // No Output
	*
	* // Simulate a severe failure in the system
	* const task2: Effect.Effect<number> = Effect.die(
	*   "Something went wrong"
	* )
	*
	* // Log the defect using tapDefect
	* const tapping2 = Effect.tapDefect(task2, (cause) =>
	*   Console.log(`defect: ${cause}`)
	* )
	*
	* Effect.runFork(tapping2)
	* // Output:
	* // defect: RuntimeException: Something went wrong
	* //   ... stack trace ...
	* ```
	*
	* @since 2.0.0
	* @category Sequencing
	*/
	const tapDefect = tapDefect$1;
	/**
	* Retries a failing effect based on a defined retry policy.
	*
	* **Details**
	*
	* The `Effect.retry` function takes an effect and a {@link Schedule} policy,
	* and will automatically retry the effect if it fails, following the rules of
	* the policy.
	*
	* If the effect ultimately succeeds, the result will be returned.
	*
	* If the maximum retries are exhausted and the effect still fails, the failure
	* is propagated.
	*
	* **When to Use**
	*
	* This can be useful when dealing with intermittent failures, such as network
	* issues or temporary resource unavailability. By defining a retry policy, you
	* can control the number of retries, the delay between them, and when to stop
	* retrying.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	*
	* let attempt = 0
	* const task = Effect.callback<string, Error>((resume) => {
	*   attempt++
	*   if (attempt <= 2) {
	*     resume(Effect.fail(new Error(`Attempt ${attempt} failed`)))
	*   } else {
	*     resume(Effect.succeed("Success!"))
	*   }
	* })
	*
	* const policy = Schedule.addDelay(Schedule.recurs(5), () => "100 millis")
	* const program = Effect.retry(task, policy)
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: "Success!" (after 2 retries)
	* ```
	*
	* @see {@link retryOrElse} for a version that allows you to run a fallback.
	* @see {@link repeat} if your retry condition is based on successful outcomes rather than errors.
	*
	* @since 2.0.0
	* @category Error handling
	*/
	const retry = retry$1;
	/**
	* Retries a failing effect and runs a fallback effect if retries are exhausted.
	*
	* **Details**
	*
	* The `Effect.retryOrElse` function attempts to retry a failing effect multiple
	* times according to a defined {@link Schedule} policy.
	*
	* If the retries are exhausted and the effect still fails, it runs a fallback
	* effect instead.
	*
	* **When to Use**
	*
	* This function is useful when you want to handle failures gracefully by
	* specifying an alternative action after repeated failures.
	*
	* @see {@link retry} for a version that does not run a fallback effect.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	* import { Console } from "effect"
	*
	* let attempt = 0
	* const networkRequest = Effect.gen(function* () {
	*   attempt++
	*   yield* Console.log(`Network attempt ${attempt}`)
	*   if (attempt < 3) {
	*     return yield* Effect.fail(new Error("Network timeout"))
	*   }
	*   return "Network data"
	* })
	*
	* // Retry up to 2 times, then fall back to cached data
	* const program = Effect.retryOrElse(
	*   networkRequest,
	*   Schedule.recurs(2),
	*   (error, retryCount) => Effect.gen(function* () {
	*     yield* Console.log(`All ${retryCount} retries failed, using cache`)
	*     return "Cached data"
	*   })
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // Network attempt 1
	* // Network attempt 2
	* // Network attempt 3
	* // Network data
	* ```
	*
	* @since 2.0.0
	* @category Error handling
	*/
	const retryOrElse = retryOrElse$1;
	/**
	* The `sandbox` function transforms an effect by exposing the full cause
	* of any error, defect, or fiber interruption that might occur during its
	* execution. It changes the error channel of the effect to include detailed
	* information about the cause, which is wrapped in a `Cause<E>` type.
	*
	* This function is useful when you need access to the complete underlying cause
	* of failures, defects, or interruptions, enabling more detailed error
	* handling. Once you apply `sandbox`, you can use operators like
	* {@link catchAll} and {@link catchTags} to handle specific error conditions.
	* If necessary, you can revert the sandboxing operation with {@link unsandbox}
	* to return to the original error handling behavior.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	*
	* const task = Effect.fail("Something went wrong")
	*
	* // Sandbox exposes the full cause as the error type
	* const program = Effect.gen(function* () {
	*   const result = yield* Effect.flip(Effect.sandbox(task))
	*   return `Caught cause: ${Cause.squash(result)}`
	* })
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: "Caught cause: Something went wrong"
	* ```
	*
	* @see {@link unsandbox} to restore the original error handling.
	*
	* @since 2.0.0
	* @category Error handling
	*/
	const sandbox = sandbox$1;
	/**
	* Discards both the success and failure values of an effect.
	*
	* **When to Use**
	*
	* `ignore` allows you to run an effect without caring about its result, whether
	* it succeeds or fails. This is useful when you only care about the side
	* effects of the effect and do not need to handle or process its outcome.
	*
	* @example
	* ```ts
	* // Title: Using Effect.ignore to Discard Values
	* import { Effect } from "effect"
	*
	* //      ┌─── Effect<number, string, never>
	* //      ▼
	* const task = Effect.fail("Uh oh!").pipe(Effect.as(5))
	*
	* //      ┌─── Effect<void, never, never>
	* //      ▼
	* const program = Effect.ignore(task)
	* ```
	*
	* @since 2.0.0
	* @category Error handling
	*/
	const ignore = ignore$1;
	/**
	* Replaces the original failure with a success value, ensuring the effect
	* cannot fail.
	*
	* `orElseSucceed` allows you to replace the failure of an effect with a
	* success value. If the effect fails, it will instead succeed with the provided
	* value, ensuring the effect always completes successfully. This is useful when
	* you want to guarantee a successful result regardless of whether the original
	* effect failed.
	*
	* The function ensures that any failure is effectively "swallowed" and replaced
	* by a successful value, which can be helpful for providing default values in
	* case of failure.
	*
	* **Important**: This function only applies to failed effects. If the effect
	* already succeeds, it will remain unchanged.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const validate = (age: number): Effect.Effect<number, string> => {
	*   if (age < 0) {
	*     return Effect.fail("NegativeAgeError")
	*   } else if (age < 18) {
	*     return Effect.fail("IllegalAgeError")
	*   } else {
	*     return Effect.succeed(age)
	*   }
	* }
	*
	* const program = Effect.orElseSucceed(validate(-1), () => 18)
	*
	* console.log(Effect.runSyncExit(program))
	* // Output:
	* // { _id: 'Exit', _tag: 'Success', value: 18 }
	* ```
	*
	* @since 2.0.0
	* @category Fallback
	*/
	const orElseSucceed = orElseSucceed$1;
	/**
	* Adds a time limit to an effect, triggering a timeout if the effect exceeds
	* the duration.
	*
	* The `timeout` function allows you to specify a time limit for an
	* effect's execution. If the effect does not complete within the given time, a
	* `TimeoutException` is raised. This can be useful for controlling how long
	* your program waits for a task to finish, ensuring that it doesn't hang
	* indefinitely if the task takes too long.
	*
	* @see {@link timeoutFail} for a version that raises a custom error.
	* @see {@link timeoutFailCause} for a version that raises a custom defect.
	* @see {@link timeoutTo} for a version that allows specifying both success and timeout handlers.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const task = Effect.gen(function* () {
	*   console.log("Start processing...")
	*   yield* Effect.sleep("2 seconds") // Simulates a delay in processing
	*   console.log("Processing complete.")
	*   return "Result"
	* })
	*
	* // Output will show a TimeoutException as the task takes longer
	* // than the specified timeout duration
	* const timedEffect = task.pipe(Effect.timeout("1 second"))
	*
	* Effect.runPromiseExit(timedEffect).then(console.log)
	* // Output:
	* // Start processing...
	* // {
	* //   _id: 'Exit',
	* //   _tag: 'Failure',
	* //   cause: {
	* //     _id: 'Cause',
	* //     _tag: 'Fail',
	* //     failure: { _tag: 'TimeoutException' }
	* //   }
	* // }
	* ```
	*
	* @since 2.0.0
	* @category delays & timeouts
	*/
	const timeout = timeout$1;
	/**
	* Handles timeouts by returning an `Option` that represents either the result
	* or a timeout.
	*
	* The `timeoutOption` function provides a way to gracefully handle
	* timeouts by wrapping the outcome of an effect in an `Option` type. If the
	* effect completes within the specified time, it returns a `Some` containing
	* the result. If the effect times out, it returns a `None`, allowing you to
	* treat the timeout as a regular result instead of throwing an error.
	*
	* This is useful when you want to handle timeouts without causing the program
	* to fail, making it easier to manage situations where you expect tasks might
	* take too long but want to continue executing other tasks.
	*
	* @see {@link timeout} for a version that raises a `TimeoutException`.
	* @see {@link timeoutFail} for a version that raises a custom error.
	* @see {@link timeoutFailCause} for a version that raises a custom defect.
	* @see {@link timeoutTo} for a version that allows specifying both success and timeout handlers.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const task = Effect.gen(function* () {
	*   console.log("Start processing...")
	*   yield* Effect.sleep("2 seconds") // Simulates a delay in processing
	*   console.log("Processing complete.")
	*   return "Result"
	* })
	*
	* const timedOutEffect = Effect.all([
	*   task.pipe(Effect.timeoutOption("3 seconds")),
	*   task.pipe(Effect.timeoutOption("1 second"))
	* ])
	*
	* Effect.runPromise(timedOutEffect).then(console.log)
	* // Output:
	* // Start processing...
	* // Processing complete.
	* // Start processing...
	* // [
	* //   { _id: 'Option', _tag: 'Some', value: 'Result' },
	* //   { _id: 'Option', _tag: 'None' }
	* // ]
	* ```
	*
	* @since 3.1.0
	* @category delays & timeouts
	*/
	const timeoutOption = timeoutOption$1;
	/**
	* Applies a timeout to an effect, with a fallback effect executed if the timeout is reached.
	*
	* This function is useful when you want to set a maximum duration for an operation
	* and provide an alternative action if the timeout is exceeded.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const slowQuery = Effect.gen(function* () {
	*   yield* Console.log("Starting database query...")
	*   yield* Effect.sleep("5 seconds")
	*   return "Database result"
	* })
	*
	* // Use cached data as fallback when timeout is reached
	* const program = Effect.timeoutOrElse(slowQuery, {
	*   duration: "2 seconds",
	*   onTimeout: () => Effect.gen(function* () {
	*     yield* Console.log("Query timed out, using cached data")
	*     return "Cached result"
	*   })
	* })
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // Starting database query...
	* // Query timed out, using cached data
	* // Cached result
	* ```
	*
	* @since 3.1.0
	* @category delays & timeouts
	*/
	const timeoutOrElse = timeoutOrElse$1;
	/**
	* Returns an effect that is delayed from this effect by the specified
	* `Duration`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const program = Effect.delay(
	*   Console.log("Delayed message"),
	*   "1 second"
	* )
	*
	* Effect.runFork(program)
	* // Waits 1 second, then prints: "Delayed message"
	* ```
	*
	* @since 2.0.0
	* @category delays & timeouts
	*/
	const delay = delay$1;
	/**
	* Returns an effect that suspends for the specified duration. This method is
	* asynchronous, and does not actually block the fiber executing the effect.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   yield* Console.log("Start")
	*   yield* Effect.sleep("2 seconds")
	*   yield* Console.log("End")
	* })
	*
	* Effect.runFork(program)
	* // Output: "Start" (immediately)
	* // Output: "End" (after 2 seconds)
	* ```
	*
	* @since 2.0.0
	* @category delays & timeouts
	*/
	const sleep = sleep$1;
	/**
	* Executes an effect and measures the time it takes to complete.
	*
	* **Details**
	*
	* This function wraps the provided effect and returns a new effect that, when
	* executed, performs the original effect and calculates its execution duration.
	*
	* The result of the new effect includes both the execution time (as a
	* `Duration`) and the original effect's result. This is useful for monitoring
	* performance or gaining insights into the time taken by specific operations.
	*
	* The original effect's behavior (success, failure, or interruption) remains
	* unchanged, and the timing information is provided alongside the result in a
	* tuple.
	*
	* @since 2.0.0
	* @category Delays & Timeouts
	*/
	const timed = timed$1;
	/**
	* Races multiple effects and returns the first successful result.
	*
	* **Details**
	*
	* This function runs multiple effects concurrently and returns the result of
	* the first one to succeed. If one effect succeeds, the others will be
	* interrupted.
	*
	* If none of the effects succeed, the function will fail with the last error
	* encountered.
	*
	* **When to Use**
	*
	* This is useful when you want to race multiple effects, but only care about
	* the first one to succeed. It is commonly used in cases like timeouts,
	* retries, or when you want to optimize for the faster response without
	* worrying about the other effects.
	*
	* @see {@link race} for a version that handles only two effects.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Duration } from "effect"
	*
	* // Multiple effects with different delays
	* const effect1 = Effect.delay(Effect.succeed("Fast"), Duration.millis(100))
	* const effect2 = Effect.delay(Effect.succeed("Slow"), Duration.millis(500))
	* const effect3 = Effect.delay(Effect.succeed("Very Slow"), Duration.millis(1000))
	*
	* // Race all effects - the first to succeed wins
	* const raced = Effect.raceAll([effect1, effect2, effect3])
	*
	* // Result: "Fast" (after ~100ms)
	* ```
	*
	* @since 2.0.0
	* @category Racing
	*/
	const raceAll = raceAll$1;
	/**
	* Races multiple effects and returns the first successful result.
	*
	* **Details**
	*
	* Similar to `raceAll`, this function runs multiple effects concurrently
	* and returns the result of the first one to succeed. If one effect succeeds,
	* the others will be interrupted.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Duration } from "effect"
	*
	* // Multiple effects with different delays and potential failures
	* const effect1 = Effect.delay(Effect.succeed("First"), Duration.millis(200))
	* const effect2 = Effect.delay(Effect.fail("Second failed"), Duration.millis(100))
	* const effect3 = Effect.delay(Effect.succeed("Third"), Duration.millis(300))
	*
	* // Race all effects - the first to succeed wins
	* const raced = Effect.raceAllFirst([effect1, effect2, effect3])
	*
	* // Result: "First" (after ~200ms, even though effect2 completes first but fails)
	* ```
	*
	* @since 4.0.0
	* @category Racing
	*/
	const raceAllFirst = raceAllFirst$1;
	/**
	* Races two effects and returns the result of the first one to complete.
	*
	* **Details**
	*
	* This function takes two effects and runs them concurrently, returning the
	* result of the first one that completes, regardless of whether it succeeds or
	* fails.
	*
	* **When to Use**
	*
	* This function is useful when you want to race two operations, and you want to
	* proceed with whichever one finishes first, regardless of whether it succeeds
	* or fails.
	*
	* @since 2.0.0
	* @category Racing
	*/
	const raceFirst = raceFirst$1;
	/**
	* Filters an iterable using the specified effectful Filter.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const isEven = (n: number) => Effect.succeed(n % 2 === 0)
	*
	* const program = Effect.filter([1, 2, 3, 4, 5], isEven)
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: [2, 4]
	* ```
	*
	* @since 2.0.0
	* @category Filtering
	*/
	const filter = filter$1;
	/**
	* Filters an effect, providing an alternative effect if the predicate fails.
	*
	* **Details**
	*
	* This function applies a predicate to the result of an effect. If the
	* predicate evaluates to `false`, it executes the `orElse` effect instead. The
	* `orElse` effect can produce an alternative value or perform additional
	* computations.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // An effect that produces a number
	* const program = Effect.succeed(5)
	*
	* // Filter for even numbers, provide alternative for odd numbers
	* const filtered = Effect.filterOrElse(
	*   program,
	*   (n): n is number => n % 2 === 0,
	*   (n) => Effect.succeed(`Number ${n} is odd`)
	* )
	*
	* // Result: "Number 5 is odd" (since 5 is not even)
	* ```
	*
	* @since 2.0.0
	* @category Filtering
	*/
	const filterOrElse = filterOrElse$1;
	/**
	* Filters an effect, failing with a custom error if the predicate fails.
	*
	* **Details**
	*
	* This function applies a predicate to the result of an effect. If the
	* predicate evaluates to `false`, the effect fails with either a custom
	* error (if `orFailWith` is provided) or a `NoSuchElementError`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // An effect that produces a number
	* const program = Effect.succeed(5)
	*
	* // Filter for even numbers, fail for odd numbers
	* const filtered = Effect.filterOrFail(
	*   program,
	*   (n): n is number => n % 2 === 0,
	*   (n) => `Expected even number, got ${n}`
	* )
	*
	* // Result: Effect.fail("Expected even number, got 5")
	* ```
	*
	* @since 2.0.0
	* @category Filtering
	*/
	const filterOrFail = filterOrFail$1;
	/**
	* Conditionally executes an effect based on a boolean condition.
	*
	* **Details**
	*
	* This function allows you to run an effect only if a given condition evaluates
	* to `true`. If the condition is `true`, the effect is executed, and its result
	* is wrapped in an `Option.some`. If the condition is `false`, the effect is
	* skipped, and the result is `Option.none`.
	*
	* **When to Use**
	*
	* This function is useful for scenarios where you need to dynamically decide
	* whether to execute an effect based on runtime logic, while also representing
	* the skipped case explicitly.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import * as Option from "effect/data/Option"
	* import { Console } from "effect"
	*
	* const shouldLog = true
	*
	* const program = Effect.when(
	*   Console.log("Condition is true!"),
	*   () => shouldLog
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: "Condition is true!"
	* // { _id: 'Option', _tag: 'Some', value: undefined }
	* ```
	*
	* @see {@link whenEffect} for a version that allows the condition to be an effect.
	* @see {@link unless} for a version that executes the effect when the condition is `false`.
	*
	* @since 2.0.0
	* @category Conditional Operators
	*/
	const when = when$1;
	/**
	* Handles both success and failure cases of an effect without performing side
	* effects.
	*
	* **Details**
	*
	* `match` lets you define custom handlers for both success and failure
	* scenarios. You provide separate functions to handle each case, allowing you
	* to process the result if the effect succeeds, or handle the error if the
	* effect fails.
	*
	* **When to Use**
	*
	* This is useful for structuring your code to respond differently to success or
	* failure without triggering side effects.
	*
	* @see {@link matchEffect} if you need to perform side effects in the handlers.
	*
	* @example
	* ```ts
	* // Title: Handling Both Success and Failure Cases
	* import { Effect } from "effect"
	*
	* const success: Effect.Effect<number, Error> = Effect.succeed(42)
	*
	* const program1 = Effect.match(success, {
	*   onFailure: (error) => `failure: ${error.message}`,
	*   onSuccess: (value) => `success: ${value}`
	* })
	*
	* // Run and log the result of the successful effect
	* Effect.runPromise(program1).then(console.log)
	* // Output: "success: 42"
	*
	* const failure: Effect.Effect<number, Error> = Effect.fail(
	*   new Error("Uh oh!")
	* )
	*
	* const program2 = Effect.match(failure, {
	*   onFailure: (error) => `failure: ${error.message}`,
	*   onSuccess: (value) => `success: ${value}`
	* })
	*
	* // Run and log the result of the failed effect
	* Effect.runPromise(program2).then(console.log)
	* // Output: "failure: Uh oh!"
	* ```
	*
	* @since 2.0.0
	* @category Pattern matching
	*/
	const match = match$2;
	/**
	* Handles both success and failure cases of an effect without performing side
	* effects, with eager evaluation for resolved effects.
	*
	* **Details**
	*
	* `matchEager` works like `match` but provides better performance for resolved
	* effects (Success or Failure). When the effect is already resolved, it applies
	* the handlers immediately without fiber scheduling. For unresolved effects,
	* it falls back to the regular `match` behavior.
	*
	* **When to Use**
	*
	* Use this when you need to handle both success and failure cases and want
	* optimal performance for resolved effects. This is particularly useful in
	* scenarios where you frequently work with already computed values.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const result = yield* Effect.matchEager(Effect.succeed(42), {
	*     onFailure: (error) => `Failed: ${error}`,
	*     onSuccess: (value) => `Success: ${value}`
	*   })
	*   console.log(result) // "Success: 42"
	* })
	* ```
	*
	* @see {@link match} for the non-eager version.
	* @see {@link matchEffect} if you need to perform side effects in the handlers.
	*
	* @since 2.0.0
	* @category Pattern matching
	*/
	const matchEager = matchEager$1;
	/**
	* Handles failures by matching the cause of failure.
	*
	* **Details**
	*
	* The `matchCause` function allows you to handle failures with access to the
	* full cause of the failure within a fiber.
	*
	* **When to Use**
	*
	* This is useful for differentiating between different types of errors, such as
	* regular failures, defects, or interruptions. You can provide specific
	* handling logic for each failure type based on the cause.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	*
	* const task = Effect.fail("Something went wrong")
	*
	* const program = Effect.matchCause(task, {
	*   onFailure: (cause) => `Failed: ${Cause.squash(cause)}`,
	*   onSuccess: (value) => `Success: ${value}`
	* })
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: "Failed: Error: Something went wrong"
	* ```
	*
	* @see {@link matchCauseEffect} if you need to perform side effects in the
	* handlers.
	* @see {@link match} if you don't need to handle the cause of the failure.
	*
	* @since 2.0.0
	* @category Pattern matching
	*/
	const matchCause = matchCause$1;
	/**
	* Handles failures by matching the cause of failure with eager evaluation.
	*
	* **Details**
	*
	* `matchCauseEager` works like `matchCause` but provides better performance for resolved
	* effects by immediately applying the matching function instead of deferring it
	* through the effect pipeline.
	*
	* **When to Use**
	*
	* This is useful when you have effects that are likely to be already resolved
	* and you want to avoid the overhead of the effect pipeline. For pending effects,
	* it automatically falls back to the regular `matchCause` behavior.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const handleResult = Effect.matchCauseEager(Effect.succeed(42), {
	*   onSuccess: (value) => `Success: ${value}`,
	*   onFailure: (cause) => `Failed: ${cause}`
	* })
	* ```
	*
	* @since 3.8.0
	* @category Pattern matching
	*/
	const matchCauseEager = matchCauseEager$1;
	/**
	* @since 4.0.0
	* @category Pattern matching
	*/
	const matchCauseEffectEager = matchCauseEffectEager$1;
	/**
	* Handles failures with access to the cause and allows performing side effects.
	*
	* **Details**
	*
	* The `matchCauseEffect` function works similarly to {@link matchCause}, but it
	* also allows you to perform additional side effects based on the failure
	* cause. This function provides access to the complete cause of the failure,
	* making it possible to differentiate between various failure types, and allows
	* you to respond accordingly while performing side effects (like logging or
	* other operations).
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	* import * as Filter from "effect/data/Filter"
	* import { Console } from "effect"
	*
	* const task = Effect.fail(new Error("Task failed"))
	*
	* const program = Effect.matchCauseEffect(task, {
	*   onFailure: (cause) =>
	*     Effect.gen(function* () {
	*       if (Cause.hasFail(cause)) {
	*         const error = Cause.filterError(cause)
	*         if (Filter.isPass(error)) {
	*           yield* Console.log(`Handling error: ${(error as Error).message}`)
	*         }
	*         return "recovered from error"
	*       } else {
	*         yield* Console.log("Handling interruption or defect")
	*         return "recovered from interruption/defect"
	*       }
	*     }),
	*   onSuccess: (value) =>
	*     Effect.gen(function* () {
	*       yield* Console.log(`Success: ${value}`)
	*       return `processed ${value}`
	*     })
	* })
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // Handling error: Task failed
	* // recovered from error
	* ```
	*
	* @see {@link matchCause} if you don't need side effects and only want to handle the result or failure.
	* @see {@link matchEffect} if you don't need to handle the cause of the failure.
	*
	* @since 2.0.0
	* @category Pattern matching
	*/
	const matchCauseEffect = matchCauseEffect$1;
	/**
	* Handles both success and failure cases of an effect, allowing for additional
	* side effects.
	*
	* **Details**
	*
	* The `matchEffect` function is similar to {@link match}, but it enables you to
	* perform side effects in the handlers for both success and failure outcomes.
	*
	* **When to Use**
	*
	* This is useful when you need to execute additional actions, like logging or
	* notifying users, based on whether an effect succeeds or fails.
	*
	* @see {@link match} if you don't need side effects and only want to handle the
	* result or failure.
	*
	* @example
	* ```ts
	* // Title: Handling Both Success and Failure Cases with Side Effects
	* import { Effect } from "effect"
	*
	* const success: Effect.Effect<number, Error> = Effect.succeed(42)
	* const failure: Effect.Effect<number, Error> = Effect.fail(
	*   new Error("Uh oh!")
	* )
	*
	* const program1 = Effect.matchEffect(success, {
	*   onFailure: (error) =>
	*     Effect.succeed(`failure: ${error.message}`).pipe(
	*       Effect.tap(Effect.log)
	*     ),
	*   onSuccess: (value) =>
	*     Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))
	* })
	*
	* console.log(Effect.runSync(program1))
	* // Output:
	* // timestamp=... level=INFO fiber=#0 message="success: 42"
	* // success: 42
	*
	* const program2 = Effect.matchEffect(failure, {
	*   onFailure: (error) =>
	*     Effect.succeed(`failure: ${error.message}`).pipe(
	*       Effect.tap(Effect.log)
	*     ),
	*   onSuccess: (value) =>
	*     Effect.succeed(`success: ${value}`).pipe(Effect.tap(Effect.log))
	* })
	*
	* console.log(Effect.runSync(program2))
	* // Output:
	* // timestamp=... level=INFO fiber=#1 message="failure: Uh oh!"
	* // failure: Uh oh!
	* ```
	*
	* @since 2.0.0
	* @category Pattern matching
	*/
	const matchEffect = matchEffect$2;
	/**
	* Checks if an effect has failed.
	*
	* **Details**
	*
	* This function evaluates whether an effect has resulted in a failure. It
	* returns a boolean value wrapped in an effect, with `true` indicating the
	* effect failed and `false` otherwise.
	*
	* The resulting effect cannot fail (`never` in the error channel) but retains
	* the context of the original effect.
	*
	* **Example**
	*
	* ```ts
	* import { Effect } from "effect"
	*
	* const failure = Effect.fail("Uh oh!")
	*
	* console.log(Effect.runSync(Effect.isFailure(failure)))
	* // Output: true
	*
	* const defect = Effect.die("BOOM!")
	*
	* Effect.runSync(Effect.isFailure(defect))
	* // throws: BOOM!
	* ```
	*
	* @since 2.0.0
	* @category Condition Checking
	*/
	const isFailure = isFailure$3;
	/**
	* Checks if an effect has succeeded.
	*
	* **Details**
	*
	* This function evaluates whether an effect has resulted in a success. It
	* returns a boolean value wrapped in an effect, with `true` indicating the
	* effect succeeded and `false` otherwise.
	*
	* The resulting effect cannot fail (`never` in the error channel) but retains
	* the context of the original effect.
	*
	* @since 2.0.0
	* @category Condition Checking
	*/
	const isSuccess = isSuccess$2;
	/**
	* Returns the complete service map from the current context.
	*
	* This function allows you to access all services that are currently available
	* in the effect's environment. This can be useful for debugging, introspection,
	* or when you need to pass the entire context to another function.
	*
	* @example
	* ```ts
	* import { Console, Effect, ServiceMap } from "effect"
	* import { Option } from "effect/data"
	*
	* const Logger = ServiceMap.Service<{
	*   log: (msg: string) => void
	* }>("Logger")
	* const Database = ServiceMap.Service<{
	*   query: (sql: string) => string
	* }>("Database")
	*
	* const program = Effect.gen(function* () {
	*   const allServices = yield* Effect.services()
	*
	*   // Check if specific services are available
	*   const loggerOption = ServiceMap.getOption(allServices, Logger)
	*   const databaseOption = ServiceMap.getOption(allServices, Database)
	*
	*   yield* Console.log(`Logger available: ${Option.isSome(loggerOption)}`)
	*   yield* Console.log(`Database available: ${Option.isSome(databaseOption)}`)
	* })
	*
	* const serviceMap = ServiceMap.make(Logger, { log: console.log })
	*   .pipe(ServiceMap.add(Database, { query: () => "result" }))
	*
	* const provided = Effect.provideServices(program, serviceMap)
	* ```
	*
	* @since 2.0.0
	* @category Environment
	*/
	const services = services$1;
	/**
	* Transforms the current service map using the provided function.
	*
	* This function allows you to access the complete service map and perform
	* computations based on all available services. This is useful when you need
	* to conditionally execute logic based on what services are available.
	*
	* @example
	* ```ts
	* import { Console, Effect, ServiceMap } from "effect"
	* import { Option } from "effect/data"
	*
	* const Logger = ServiceMap.Service<{
	*   log: (msg: string) => void
	* }>("Logger")
	* const Cache = ServiceMap.Service<{
	*   get: (key: string) => string | null
	* }>("Cache")
	*
	* const program = Effect.servicesWith((services) => {
	*   const cacheOption = ServiceMap.getOption(services, Cache)
	*   const hasCache = Option.isSome(cacheOption)
	*
	*   if (hasCache) {
	*     return Effect.gen(function* () {
	*       const cache = yield* Effect.service(Cache)
	*       yield* Console.log("Using cached data")
	*       return cache.get("user:123") || "default"
	*     })
	*   } else {
	*     return Effect.gen(function* () {
	*       yield* Console.log("No cache available, using fallback")
	*       return "fallback data"
	*     })
	*   }
	* })
	*
	* const withCache = Effect.provideService(program, Cache, {
	*   get: () => "cached_value"
	* })
	* ```
	*
	* @since 2.0.0
	* @category Environment
	*/
	const servicesWith = servicesWith$1;
	/**
	* Provides dependencies to an effect using layers or a context.
	*
	* @example
	* ```ts
	* import { Effect, Layer, ServiceMap } from "effect"
	*
	* interface Database {
	*   readonly query: (sql: string) => Effect.Effect<string>
	* }
	*
	* const Database = ServiceMap.Service<Database>("Database")
	*
	* const DatabaseLive = Layer.succeed(Database)({
	*   query: (sql: string) => Effect.succeed(`Result for: ${sql}`)
	* })
	*
	* const program = Effect.gen(function* () {
	*   const db = yield* Database
	*   return yield* db.query("SELECT * FROM users")
	* })
	*
	* const provided = Effect.provide(program, DatabaseLive)
	*
	* Effect.runPromise(provided).then(console.log)
	* // Output: "Result for: SELECT * FROM users"
	* ```
	*
	* @since 2.0.0
	* @category Environment
	*/
	const provide = provide$1;
	/**
	* Provides a service map to an effect, fulfilling its service requirements.
	*
	* **Details**
	*
	* This function provides multiple services at once by supplying a service map
	* that contains all the required services. It removes the provided services
	* from the effect's requirements, making them available to the effect.
	*
	* @example
	* ```ts
	* import { Effect, ServiceMap } from "effect"
	*
	* // Define service keys
	* const Logger = ServiceMap.Service<{
	*   log: (msg: string) => void
	* }>("Logger")
	* const Database = ServiceMap.Service<{
	*   query: (sql: string) => string
	* }>("Database")
	*
	* // Create service map with multiple services
	* const serviceMap = ServiceMap.make(Logger, { log: console.log })
	*   .pipe(ServiceMap.add(Database, { query: () => "result" }))
	*
	* // An effect that requires both services
	* const program = Effect.gen(function* () {
	*   const logger = yield* Effect.service(Logger)
	*   const db = yield* Effect.service(Database)
	*   logger.log("Querying database")
	*   return db.query("SELECT * FROM users")
	* })
	*
	* const provided = Effect.provideServices(program, serviceMap)
	* ```
	*
	* @since 2.0.0
	* @category Environment
	*/
	const provideServices = provideServices$1;
	/**
	* Accesses a service from the context.
	*
	* @example
	* ```ts
	* import { Effect, ServiceMap } from "effect"
	*
	* interface Database {
	*   readonly query: (sql: string) => Effect.Effect<string>
	* }
	*
	* const Database = ServiceMap.Service<Database>("Database")
	*
	* const program = Effect.gen(function* () {
	*   const db = yield* Effect.service(Database)
	*   return yield* db.query("SELECT * FROM users")
	* })
	* ```
	*
	* @since 4.0.0
	* @category ServiceMap
	*/
	const service = service$1;
	/**
	* Optionally accesses a service from the environment.
	*
	* **Details**
	*
	* This function attempts to access a service from the environment. If the
	* service is available, it returns `Some(service)`. If the service is not
	* available, it returns `None`. Unlike `service`, this function does not
	* require the service to be present in the environment.
	*
	* @example
	* ```ts
	* import { Effect, ServiceMap } from "effect"
	* import { Option } from "effect/data"
	*
	* // Define a service key
	* const Logger = ServiceMap.Service<{
	*   log: (msg: string) => void
	* }>("Logger")
	*
	* // Use serviceOption to optionally access the logger
	* const program = Effect.gen(function* () {
	*   const maybeLogger = yield* Effect.serviceOption(Logger)
	*
	*   if (Option.isSome(maybeLogger)) {
	*     maybeLogger.value.log("Service is available")
	*   } else {
	*     console.log("Service not available")
	*   }
	* })
	* ```
	*
	* @since 2.0.0
	* @category ServiceMap
	*/
	const serviceOption = serviceOption$1;
	/**
	* Provides part of the required context while leaving the rest unchanged.
	*
	* **Details**
	*
	* This function allows you to transform the context required by an effect,
	* providing part of the context and leaving the rest to be fulfilled later.
	*
	* @example
	* ```ts
	* import { Effect, ServiceMap } from "effect"
	*
	* // Define services
	* const Logger = ServiceMap.Service<{
	*   log: (msg: string) => void
	* }>("Logger")
	* const Config = ServiceMap.Service<{
	*   name: string
	* }>("Config")
	*
	* const program = Effect.service(Config).pipe(
	*   Effect.map((config) => `Hello ${config.name}!`)
	* )
	*
	* // Transform services by providing Config while keeping Logger requirement
	* const configured = program.pipe(
	*   Effect.updateServices((services: ServiceMap.ServiceMap<typeof Logger>) =>
	*     ServiceMap.add(services, Config, { name: "World" })
	*   )
	* )
	*
	* // The effect now requires only Logger service
	* const result = Effect.provideService(configured, Logger, {
	*   log: (msg) => console.log(msg)
	* })
	* ```
	*
	* @since 4.0.0
	* @category ServiceMap
	*/
	const updateServices = updateServices$1;
	/**
	* Updates the service with the required service entry.
	*
	* @example
	* ```ts
	* import { Console, Effect, ServiceMap } from "effect"
	*
	* // Define a counter service
	* const Counter = ServiceMap.Service<{ count: number }>("Counter")
	*
	* const program = Effect.gen(function* () {
	*   const updatedCounter = yield* Effect.service(Counter)
	*   yield* Console.log(`Updated count: ${updatedCounter.count}`)
	*   return updatedCounter.count
	* }).pipe(
	*   Effect.updateService(Counter, (counter) => ({ count: counter.count + 1 }))
	* )
	*
	* // Provide initial service and run
	* const result = Effect.provideService(program, Counter, { count: 0 })
	* Effect.runPromise(result).then(console.log)
	* // Output: Updated count: 1
	* // 1
	* ```
	*
	* @since 2.0.0
	* @category ServiceMap
	*/
	const updateService = updateService$1;
	/**
	* The `provideService` function is used to provide an actual
	* implementation for a service in the context of an effect.
	*
	* This function allows you to associate a service with its implementation so
	* that it can be used in your program. You define the service (e.g., a random
	* number generator), and then you use `provideService` to link that
	* service to its implementation. Once the implementation is provided, the
	* effect can be run successfully without further requirements.
	*
	* @see {@link provide} for providing multiple layers to an effect.
	*
	* @example
	* ```ts
	* import { Console, Effect, ServiceMap } from "effect"
	*
	* // Define a service for configuration
	* const Config = ServiceMap.Service<{
	*   apiUrl: string; timeout: number
	* }>("Config")
	*
	* const fetchData = Effect.gen(function* () {
	*   const config = yield* Effect.service(Config)
	*   yield* Console.log(`Fetching from: ${config.apiUrl}`)
	*   yield* Console.log(`Timeout: ${config.timeout}ms`)
	*   return "data"
	* })
	*
	* // Provide the service implementation
	* const program = Effect.provideService(fetchData, Config, {
	*   apiUrl: "https://api.example.com",
	*   timeout: 5000
	* })
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // Fetching from: https://api.example.com
	* // Timeout: 5000ms
	* // data
	* ```
	*
	* @since 2.0.0
	* @category ServiceMap
	*/
	const provideService = provideService$1;
	/**
	* Provides the effect with the single service it requires. If the effect
	* requires more than one service use `provide` instead.
	*
	* This function is similar to `provideService`, but instead of providing a
	* static service implementation, it allows you to provide an effect that
	* will produce the service. This is useful when the service needs to be
	* acquired through an effectful computation (e.g., reading from a database,
	* making an HTTP request, or allocating resources).
	*
	* @example
	* ```ts
	* import { Console, Effect, ServiceMap } from "effect"
	*
	* // Define a database connection service
	* interface DatabaseConnection {
	*   readonly query: (sql: string) => Effect.Effect<string>
	* }
	* const Database = ServiceMap.Service<DatabaseConnection>("Database")
	*
	* // Effect that creates a database connection
	* const createConnection = Effect.gen(function* () {
	*   yield* Console.log("Establishing database connection...")
	*   yield* Effect.sleep("100 millis") // Simulate connection time
	*   yield* Console.log("Database connected!")
	*   return {
	*     query: (sql: string) => Effect.succeed(`Result for: ${sql}`)
	*   }
	* })
	*
	* const program = Effect.gen(function* () {
	*   const db = yield* Effect.service(Database)
	*   return yield* db.query("SELECT * FROM users")
	* })
	*
	* // Provide the service through an effect
	* const withDatabase = Effect.provideServiceEffect(program, Database, createConnection)
	*
	* Effect.runPromise(withDatabase).then(console.log)
	* // Output:
	* // Establishing database connection...
	* // Database connected!
	* // Result for: SELECT * FROM users
	* ```
	*
	* @since 2.0.0
	* @category ServiceMap
	*/
	const provideServiceEffect = provideServiceEffect$1;
	/**
	* Sets the concurrency level for parallel operations within an effect.
	*
	* @example
	* ```ts
	* import { Console, Effect } from "effect"
	*
	* const task = (id: number) => Effect.gen(function* () {
	*   yield* Console.log(`Task ${id} starting`)
	*   yield* Effect.sleep("100 millis")
	*   yield* Console.log(`Task ${id} completed`)
	*   return id
	* })
	*
	* // Run tasks with limited concurrency (max 2 at a time)
	* const program = Effect.gen(function* () {
	*   const tasks = [1, 2, 3, 4, 5].map(task)
	*   return yield* Effect.all(tasks, { concurrency: 2 })
	* }).pipe(
	*   Effect.withConcurrency(2)
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Tasks will run with max 2 concurrent operations
	* // [1, 2, 3, 4, 5]
	* ```
	*
	* @since 2.0.0
	* @category References
	*/
	const withConcurrency = withConcurrency$1;
	/**
	* Returns the current scope for resource management.
	*
	* @example
	* ```ts
	* import { Console, Effect, Scope } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const currentScope = yield* Effect.scope
	*   yield* Console.log("Got scope for resource management")
	*
	*   // Use the scope to manually manage resources if needed
	*   const resource = yield* Effect.acquireRelease(
	*     Console.log("Acquiring resource").pipe(Effect.as("resource")),
	*     () => Console.log("Releasing resource")
	*   )
	*
	*   return resource
	* })
	*
	* Effect.runPromise(Effect.scoped(program)).then(console.log)
	* // Output:
	* // Got scope for resource management
	* // Acquiring resource
	* // resource
	* // Releasing resource
	* ```
	*
	* @since 2.0.0
	* @category Resource management & finalization
	*/
	const scope = scope$1;
	/**
	* Scopes all resources used in this workflow to the lifetime of the workflow,
	* ensuring that their finalizers are run as soon as this workflow completes
	* execution, whether by success, failure, or interruption.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const resource = Effect.acquireRelease(
	*   Console.log("Acquiring resource").pipe(Effect.as("resource")),
	*   () => Console.log("Releasing resource")
	* )
	*
	* const program = Effect.scoped(
	*   Effect.gen(function* () {
	*     const res = yield* resource
	*     yield* Console.log(`Using ${res}`)
	*     return res
	*   })
	* )
	*
	* Effect.runFork(program)
	* // Output: "Acquiring resource"
	* // Output: "Using resource"
	* // Output: "Releasing resource"
	* ```
	*
	* @since 2.0.0
	* @category scoping, resources & finalization
	*/
	const scoped = scoped$1;
	/**
	* Creates a scoped effect by providing access to the scope.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Scope } from "effect"
	* import { Console } from "effect"
	*
	* const program = Effect.scopedWith((scope) =>
	*   Effect.gen(function* () {
	*     yield* Console.log("Inside scoped context")
	*
	*     // Manually add a finalizer to the scope
	*     yield* Scope.addFinalizer(scope, Console.log("Manual finalizer"))
	*
	*     // Create a scoped resource
	*     const resource = yield* Effect.scoped(
	*       Effect.acquireRelease(
	*         Console.log("Acquiring resource").pipe(Effect.as("resource")),
	*         () => Console.log("Releasing resource")
	*       )
	*     )
	*
	*     return resource
	*   })
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // Inside scoped context
	* // Acquiring resource
	* // resource
	* // Releasing resource
	* // Manual finalizer
	* ```
	*
	* @since 2.0.0
	* @category scoping, resources & finalization
	*/
	const scopedWith = scopedWith$1;
	/**
	* This function constructs a scoped resource from an `acquire` and `release`
	* `Effect` value.
	*
	* If the `acquire` `Effect` value successfully completes execution, then the
	* `release` `Effect` value will be added to the finalizers associated with the
	* scope of this `Effect` value, and it is guaranteed to be run when the scope
	* is closed.
	*
	* The `acquire` and `release` `Effect` values will be run uninterruptibly.
	* Additionally, the `release` `Effect` value may depend on the `Exit` value
	* specified when the scope is closed.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	*
	* // Simulate a resource that needs cleanup
	* interface FileHandle {
	*   readonly path: string
	*   readonly content: string
	* }
	*
	* // Acquire a file handle
	* const acquire = Effect.gen(function* () {
	*   yield* Console.log("Opening file")
	*   return { path: "/tmp/file.txt", content: "file content" }
	* })
	*
	* // Release the file handle
	* const release = (handle: FileHandle, exit: Exit.Exit<unknown, unknown>) =>
	*   Console.log(`Closing file ${handle.path} with exit: ${Exit.isSuccess(exit) ? "success" : "failure"}`)
	*
	* // Create a scoped resource
	* const resource = Effect.acquireRelease(acquire, release)
	*
	* // Use the resource within a scope
	* const program = Effect.scoped(
	*   Effect.gen(function* () {
	*     const handle = yield* resource
	*     yield* Console.log(`Using file: ${handle.path}`)
	*     return handle.content
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category Resource management & finalization
	*/
	const acquireRelease = acquireRelease$1;
	/**
	* This function is used to ensure that an `Effect` value that represents the
	* acquisition of a resource (for example, opening a file, launching a thread,
	* etc.) will not be interrupted, and that the resource will always be released
	* when the `Effect` value completes execution.
	*
	* `acquireUseRelease` does the following:
	*
	*   1. Ensures that the `Effect` value that acquires the resource will not be
	*      interrupted. Note that acquisition may still fail due to internal
	*      reasons (such as an uncaught exception).
	*   2. Ensures that the `release` `Effect` value will not be interrupted,
	*      and will be executed as long as the acquisition `Effect` value
	*      successfully acquires the resource.
	*
	* During the time period between the acquisition and release of the resource,
	* the `use` `Effect` value will be executed.
	*
	* If the `release` `Effect` value fails, then the entire `Effect` value will
	* fail, even if the `use` `Effect` value succeeds. If this fail-fast behavior
	* is not desired, errors produced by the `release` `Effect` value can be caught
	* and ignored.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	*
	* interface Database {
	*   readonly connection: string
	*   readonly query: (sql: string) => Effect.Effect<string>
	* }
	*
	* const program = Effect.acquireUseRelease(
	*   // Acquire - connect to database
	*   Effect.gen(function* () {
	*     yield* Console.log("Connecting to database...")
	*     return {
	*       connection: "db://localhost:5432",
	*       query: (sql: string) => Effect.succeed(`Result for: ${sql}`)
	*     }
	*   }),
	*   // Use - perform database operations
	*   (db) => Effect.gen(function* () {
	*     yield* Console.log(`Connected to ${db.connection}`)
	*     const result = yield* db.query("SELECT * FROM users")
	*     yield* Console.log(`Query result: ${result}`)
	*     return result
	*   }),
	*   // Release - close database connection
	*   (db, exit) => Effect.gen(function* () {
	*     if (Exit.isSuccess(exit)) {
	*       yield* Console.log(`Closing connection to ${db.connection} (success)`)
	*     } else {
	*       yield* Console.log(`Closing connection to ${db.connection} (failure)`)
	*     }
	*   })
	* )
	*
	* Effect.runPromise(program)
	* // Output:
	* // Connecting to database...
	* // Connected to db://localhost:5432
	* // Query result: Result for: SELECT * FROM users
	* // Closing connection to db://localhost:5432 (success)
	* ```
	*
	* @since 2.0.0
	* @category Resource management & finalization
	*/
	const acquireUseRelease = acquireUseRelease$1;
	/**
	* This function adds a finalizer to the scope of the calling `Effect` value.
	* The finalizer is guaranteed to be run when the scope is closed, and it may
	* depend on the `Exit` value that the scope is closed with.
	*
	* Finalizers are useful for cleanup operations that must run regardless of
	* whether the effect succeeds or fails. They're commonly used for resource
	* cleanup, logging, or other side effects that should always occur.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	*
	* const program = Effect.scoped(
	*   Effect.gen(function* () {
	*     // Add a finalizer that runs when the scope closes
	*     yield* Effect.addFinalizer((exit) =>
	*       Console.log(
	*         Exit.isSuccess(exit)
	*           ? "Cleanup: Operation completed successfully"
	*           : "Cleanup: Operation failed, cleaning up resources"
	*       )
	*     )
	*
	*     yield* Console.log("Performing main operation...")
	*
	*     // This could succeed or fail
	*     return "operation result"
	*   })
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // Performing main operation...
	* // Cleanup: Operation completed successfully
	* // operation result
	* ```
	*
	* @since 2.0.0
	* @category Resource management & finalization
	*/
	const addFinalizer = addFinalizer$2;
	/**
	* Returns an effect that, if this effect _starts_ execution, then the
	* specified `finalizer` is guaranteed to be executed, whether this effect
	* succeeds, fails, or is interrupted.
	*
	* For use cases that need access to the effect's result, see `onExit`.
	*
	* Finalizers offer very powerful guarantees, but they are low-level, and
	* should generally not be used for releasing resources. For higher-level
	* logic built on `ensuring`, see the `acquireRelease` family of methods.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const task = Effect.gen(function* () {
	*   yield* Console.log("Task started")
	*   yield* Effect.sleep("1 second")
	*   yield* Console.log("Task completed")
	*   return 42
	* })
	*
	* // Ensure cleanup always runs, regardless of success or failure
	* const program = Effect.ensuring(
	*   task,
	*   Console.log("Cleanup: This always runs!")
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // Task started
	* // Task completed
	* // Cleanup: This always runs!
	* // 42
	* ```
	*
	* @since 2.0.0
	* @category Resource management & finalization
	*/
	const ensuring = ensuring$1;
	/**
	* Runs the specified effect if this effect fails, providing the error to the
	* effect if it exists. The provided effect will not be interrupted.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	* import { Console } from "effect"
	*
	* const task = Effect.fail(new Error("Something went wrong"))
	*
	* const program = Effect.onError(task, (cause) =>
	*   Console.log(`Cleanup on error: ${Cause.squash(cause)}`)
	* )
	*
	* Effect.runPromise(program).catch(console.error)
	* // Output:
	* // Cleanup on error: Error: Something went wrong
	* // Error: Something went wrong
	* ```
	*
	* @since 2.0.0
	* @category Resource management & finalization
	*/
	const onError = onError$1;
	/**
	* Runs the specified effect if this effect fails, providing the error to the
	* effect if it exists. The provided effect will not be interrupted.
	*
	* @since 4.0.0
	* @category Resource management & finalization
	*/
	const onErrorFilter = onErrorFilter$1;
	/**
	* Ensures that a cleanup functions runs, whether this effect succeeds, fails,
	* or is interrupted.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Console } from "effect"
	*
	* const task = Effect.succeed(42)
	*
	* const program = Effect.onExit(task, (exit) =>
	*   Console.log(
	*     Exit.isSuccess(exit)
	*       ? `Task succeeded with: ${exit.value}`
	*       : `Task failed: ${Exit.isFailure(exit) ? exit.cause : "interrupted"}`
	*   )
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Output:
	* // Task succeeded with: 42
	* // 42
	* ```
	*
	* @since 2.0.0
	* @category Resource management & finalization
	*/
	const onExit = onExit$1;
	/**
	* @since 4.0.0
	* @category Resource management & finalization
	*/
	const onExitInterruptible = onExitInterruptible$1;
	/**
	* @since 4.0.0
	* @category Resource management & finalization
	*/
	const onExitFilter = onExitFilter$1;
	/**
	* Returns an effect that lazily computes a result and caches it for subsequent
	* evaluations.
	*
	* **Details**
	*
	* This function wraps an effect and ensures that its result is computed only
	* once. Once the result is computed, it is cached, meaning that subsequent
	* evaluations of the same effect will return the cached result without
	* re-executing the logic.
	*
	* **When to Use**
	*
	* Use this function when you have an expensive or time-consuming operation that
	* you want to avoid repeating. The first evaluation will compute the result,
	* and all following evaluations will immediately return the cached value,
	* improving performance and reducing unnecessary work.
	*
	* @see {@link cachedWithTTL} for a similar function that includes a
	* time-to-live duration for the cached value.
	* @see {@link cachedInvalidateWithTTL} for a similar function that includes an
	* additional effect for manually invalidating the cached value.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* let i = 1
	* const expensiveTask = Effect.promise<string>(() => {
	*   console.log("expensive task...")
	*   return new Promise((resolve) => {
	*     setTimeout(() => {
	*       resolve(`result ${i++}`)
	*     }, 100)
	*   })
	* })
	*
	* const program = Effect.gen(function* () {
	*   console.log("non-cached version:")
	*   yield* expensiveTask.pipe(Effect.andThen(Console.log))
	*   yield* expensiveTask.pipe(Effect.andThen(Console.log))
	*   console.log("cached version:")
	*   const cached = yield* Effect.cached(expensiveTask)
	*   yield* cached.pipe(Effect.andThen(Console.log))
	*   yield* cached.pipe(Effect.andThen(Console.log))
	* })
	*
	* Effect.runFork(program)
	* // Output:
	* // non-cached version:
	* // expensive task...
	* // result 1
	* // expensive task...
	* // result 2
	* // cached version:
	* // expensive task...
	* // result 3
	* // result 3
	* ```
	*
	* @since 2.0.0
	* @category Caching
	*/
	const cached = cached$1;
	/**
	* Returns an effect that caches its result for a specified `Duration`,
	* known as "timeToLive" (TTL).
	*
	* **Details**
	*
	* This function is used to cache the result of an effect for a specified amount
	* of time. This means that the first time the effect is evaluated, its result
	* is computed and stored.
	*
	* If the effect is evaluated again within the specified `timeToLive`, the
	* cached result will be used, avoiding recomputation.
	*
	* After the specified duration has passed, the cache expires, and the effect
	* will be recomputed upon the next evaluation.
	*
	* **When to Use**
	*
	* Use this function when you have an effect that involves costly operations or
	* computations, and you want to avoid repeating them within a short time frame.
	*
	* It's ideal for scenarios where the result of an effect doesn't change
	* frequently and can be reused for a specified duration.
	*
	* By caching the result, you can improve efficiency and reduce unnecessary
	* computations, especially in performance-critical applications.
	*
	* @see {@link cached} for a similar function that caches the result
	* indefinitely.
	* @see {@link cachedInvalidateWithTTL} for a similar function that includes an
	* additional effect for manually invalidating the cached value.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* let i = 1
	* const expensiveTask = Effect.promise<string>(() => {
	*   console.log("expensive task...")
	*   return new Promise((resolve) => {
	*     setTimeout(() => {
	*       resolve(`result ${i++}`)
	*     }, 100)
	*   })
	* })
	*
	* const program = Effect.gen(function* () {
	*   const cached = yield* Effect.cachedWithTTL(expensiveTask, "150 millis")
	*   yield* cached.pipe(Effect.andThen(Console.log))
	*   yield* cached.pipe(Effect.andThen(Console.log))
	*   yield* Effect.sleep("100 millis")
	*   yield* cached.pipe(Effect.andThen(Console.log))
	* })
	*
	* Effect.runFork(program)
	* // Output:
	* // expensive task...
	* // result 1
	* // result 1
	* // expensive task...
	* // result 2
	* ```
	*
	* @since 2.0.0
	* @category Caching
	*/
	const cachedWithTTL = cachedWithTTL$1;
	/**
	* Caches an effect's result for a specified duration and allows manual
	* invalidation before expiration.
	*
	* **Details**
	*
	* This function behaves similarly to {@link cachedWithTTL} by caching the
	* result of an effect for a specified period of time. However, it introduces an
	* additional feature: it provides an effect that allows you to manually
	* invalidate the cached result before it naturally expires.
	*
	* This gives you more control over the cache, allowing you to refresh the
	* result when needed, even if the original cache has not yet expired.
	*
	* Once the cache is invalidated, the next time the effect is evaluated, the
	* result will be recomputed, and the cache will be refreshed.
	*
	* **When to Use**
	*
	* Use this function when you have an effect whose result needs to be cached for
	* a certain period, but you also want the option to refresh the cache manually
	* before the expiration time.
	*
	* This is useful when you need to ensure that the cached data remains valid for
	* a certain period but still want to invalidate it if the underlying data
	* changes or if you want to force a recomputation.
	*
	* @see {@link cached} for a similar function that caches the result
	* indefinitely.
	* @see {@link cachedWithTTL} for a similar function that caches the result for
	* a specified duration but does not include an effect for manual invalidation.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* let i = 1
	* const expensiveTask = Effect.promise<string>(() => {
	*   console.log("expensive task...")
	*   return new Promise((resolve) => {
	*     setTimeout(() => {
	*       resolve(`result ${i++}`)
	*     }, 100)
	*   })
	* })
	*
	* const program = Effect.gen(function* () {
	*   const [cached, invalidate] = yield* Effect.cachedInvalidateWithTTL(
	*     expensiveTask,
	*     "1 hour"
	*   )
	*   yield* cached.pipe(Effect.andThen(Console.log))
	*   yield* cached.pipe(Effect.andThen(Console.log))
	*   yield* invalidate
	*   yield* cached.pipe(Effect.andThen(Console.log))
	* })
	*
	* Effect.runFork(program)
	* // Output:
	* // expensive task...
	* // result 1
	* // result 1
	* // expensive task...
	* // result 2
	* ```
	*
	* @since 2.0.0
	* @category Caching
	*/
	const cachedInvalidateWithTTL = cachedInvalidateWithTTL$1;
	/**
	* Returns an effect that is immediately interrupted.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   yield* Effect.interrupt
	*   yield* Effect.succeed("This won't execute")
	* })
	*
	* Effect.runPromise(program).catch(console.error)
	* // Throws: InterruptedException
	* ```
	*
	* @since 2.0.0
	* @category Interruption
	*/
	const interrupt$1 = interrupt$4;
	/**
	* Returns a new effect that allows the effect to be interruptible.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const longRunning = Effect.forever(Effect.succeed("working..."))
	*
	* const program = Effect.interruptible(longRunning)
	*
	* // This effect can now be interrupted
	* const fiber = Effect.runFork(program)
	* // Later: fiber.interrupt()
	* ```
	*
	* @since 2.0.0
	* @category Interruption
	*/
	const interruptible = interruptible$1;
	/**
	* Runs the specified finalizer effect if this effect is interrupted.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	* import { Console } from "effect"
	*
	* const task = Effect.forever(Effect.succeed("working..."))
	*
	* const program = Effect.onInterrupt(task,
	*   Console.log("Task was interrupted, cleaning up...")
	* )
	*
	* const fiber = Effect.runFork(program)
	* // Later interrupt the task
	* Effect.runPromise(Fiber.interrupt(fiber))
	* // Output: Task was interrupted, cleaning up...
	* ```
	*
	* @since 2.0.0
	* @category Interruption
	*/
	const onInterrupt = onInterrupt$1;
	/**
	* Returns a new effect that disables interruption for the given effect.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	* import { Console } from "effect"
	*
	* const criticalTask = Effect.gen(function* () {
	*   yield* Console.log("Starting critical section...")
	*   yield* Effect.sleep("2 seconds")
	*   yield* Console.log("Critical section completed")
	* })
	*
	* const program = Effect.uninterruptible(criticalTask)
	*
	* const fiber = Effect.runFork(program)
	* // Even if interrupted, the critical task will complete
	* Effect.runPromise(Fiber.interrupt(fiber))
	* ```
	*
	* @since 2.0.0
	* @category Interruption
	*/
	const uninterruptible = uninterruptible$1;
	/**
	* Disables interruption and provides a restore function to restore the
	* interruptible state within the effect.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const program = Effect.uninterruptibleMask((restore) =>
	*   Effect.gen(function* () {
	*     yield* Console.log("Uninterruptible phase...")
	*     yield* Effect.sleep("1 second")
	*
	*     // Restore interruptibility for this part
	*     yield* restore(
	*       Effect.gen(function* () {
	*         yield* Console.log("Interruptible phase...")
	*         yield* Effect.sleep("2 seconds")
	*       })
	*     )
	*
	*     yield* Console.log("Back to uninterruptible")
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category Interruption
	*/
	const uninterruptibleMask = uninterruptibleMask$1;
	/**
	* This function behaves like {@link interruptible}, but it also provides a
	* `restore` function. This function can be used to restore the interruptibility
	* of any specific region of code.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const program = Effect.interruptibleMask((restore) =>
	*   Effect.gen(function* () {
	*     yield* Console.log("Interruptible phase...")
	*     yield* Effect.sleep("1 second")
	*
	*     // Make this part uninterruptible
	*     yield* restore(
	*       Effect.gen(function* () {
	*         yield* Console.log("Uninterruptible phase...")
	*         yield* Effect.sleep("2 seconds")
	*       })
	*     )
	*
	*     yield* Console.log("Back to interruptible")
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category Interruption
	*/
	const interruptibleMask = interruptibleMask$1;
	/**
	* Unsafely creates a new Semaphore.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const semaphore = Effect.makeSemaphoreUnsafe(3)
	*
	* const task = (id: number) =>
	*   semaphore.withPermits(1)(
	*     Effect.gen(function* () {
	*       yield* Effect.log(`Task ${id} started`)
	*       yield* Effect.sleep("1 second")
	*       yield* Effect.log(`Task ${id} completed`)
	*     })
	*   )
	*
	* // Only 3 tasks can run concurrently
	* const program = Effect.all([
	*   task(1), task(2), task(3), task(4), task(5)
	* ], { concurrency: "unbounded" })
	* ```
	*
	* @since 2.0.0
	* @category Semaphore
	*/
	const makeSemaphoreUnsafe = makeSemaphoreUnsafe$1;
	/**
	* Creates a new Semaphore.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const semaphore = yield* Effect.makeSemaphore(2)
	*
	*   const task = (id: number) =>
	*     semaphore.withPermits(1)(
	*       Effect.gen(function* () {
	*         yield* Effect.log(`Task ${id} acquired permit`)
	*         yield* Effect.sleep("1 second")
	*         yield* Effect.log(`Task ${id} releasing permit`)
	*       })
	*     )
	*
	*   // Run 4 tasks, but only 2 can run concurrently
	*   yield* Effect.all([task(1), task(2), task(3), task(4)])
	* })
	* ```
	*
	* @since 2.0.0
	* @category Semaphore
	*/
	const makeSemaphore = makeSemaphore$1;
	/**
	* Creates a new Latch.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const latch = Effect.makeLatchUnsafe(false)
	*
	* const waiter = Effect.gen(function* () {
	*   yield* Effect.log("Waiting for latch to open...")
	*   yield* latch.await
	*   yield* Effect.log("Latch opened! Continuing...")
	* })
	*
	* const opener = Effect.gen(function* () {
	*   yield* Effect.sleep("2 seconds")
	*   yield* Effect.log("Opening latch...")
	*   yield* latch.open
	* })
	*
	* const program = Effect.all([waiter, opener])
	* ```
	*
	* @category Latch
	* @since 3.8.0
	*/
	const makeLatchUnsafe = makeLatchUnsafe$1;
	/**
	* Creates a new Latch.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const latch = yield* Effect.makeLatch(false)
	*
	*   const waiter = Effect.gen(function* () {
	*     yield* Effect.log("Waiting for latch to open...")
	*     yield* latch.await
	*     yield* Effect.log("Latch opened! Continuing...")
	*   })
	*
	*   const opener = Effect.gen(function* () {
	*     yield* Effect.sleep("2 seconds")
	*     yield* Effect.log("Opening latch...")
	*     yield* latch.open
	*   })
	*
	*   yield* Effect.all([waiter, opener])
	* })
	* ```
	*
	* @category Latch
	* @since 3.8.0
	*/
	const makeLatch = makeLatch$1;
	/**
	* Repeats this effect forever (until the first error).
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	* import { Console } from "effect"
	*
	* const task = Effect.gen(function* () {
	*   yield* Console.log("Task running...")
	*   yield* Effect.sleep("1 second")
	* })
	*
	* // This will run forever, printing every second
	* const program = Effect.forever(task)
	*
	* // Run for 5 seconds then interrupt
	* const timedProgram = Effect.gen(function* () {
	*   const fiber = yield* Effect.forkChild(program)
	*   yield* Effect.sleep("5 seconds")
	*   yield* Fiber.interrupt(fiber)
	* })
	* ```
	*
	* @since 2.0.0
	* @category repetition / recursion
	*/
	const forever = forever$2;
	/**
	* Repeats an effect based on a specified schedule or until the first failure.
	*
	* **Details**
	*
	* This function executes an effect repeatedly according to the given schedule.
	* Each repetition occurs after the initial execution of the effect, meaning
	* that the schedule determines the number of additional repetitions. For
	* example, using `Schedule.once` will result in the effect being executed twice
	* (once initially and once as part of the repetition).
	*
	* If the effect succeeds, it is repeated according to the schedule. If it
	* fails, the repetition stops immediately, and the failure is returned.
	*
	* The schedule can also specify delays between repetitions, making it useful
	* for tasks like retrying operations with backoff, periodic execution, or
	* performing a series of dependent actions.
	*
	* You can combine schedules for more advanced repetition logic, such as adding
	* delays, limiting recursions, or dynamically adjusting based on the outcome of
	* each execution.
	*
	* @example
	* ```ts
	* // Success Example
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	* import { Console } from "effect"
	*
	* const action = Console.log("success")
	* const policy = Schedule.addDelay(Schedule.recurs(2), () => "100 millis")
	* const program = Effect.repeat(action, policy)
	*
	* // Effect.runPromise(program).then((n) => console.log(`repetitions: ${n}`))
	* ```
	*
	* @example
	* // Failure Example
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	*
	* let count = 0
	*
	* // Define a callback effect that simulates an action with possible failures
	* const action = Effect.callback<string, string>((resume) => {
	*   if (count > 1) {
	*     console.log("failure")
	*     resume(Effect.fail("Uh oh!"))
	*   } else {
	*     count++
	*     console.log("success")
	*     resume(Effect.succeed("yay!"))
	*   }
	* })
	*
	* const policy = Schedule.addDelay(Schedule.recurs(2), () => "100 millis")
	* const program = Effect.repeat(action, policy)
	*
	* // Effect.runPromiseExit(program).then(console.log)
	*
	* @since 2.0.0
	* @category repetition / recursion
	*/
	const repeat = repeat$1;
	/**
	* Repeats an effect with a schedule, handling failures using a custom handler.
	*
	* **Details**
	*
	* This function allows you to execute an effect repeatedly based on a specified
	* schedule. If the effect fails at any point, a custom failure handler is
	* invoked. The handler is provided with both the failure value and the output
	* of the schedule at the time of failure. If the effect fails immediately, the
	* schedule will never be executed and the output provided to the handler will
	* be `None`. This enables advanced error recovery or alternative fallback logic
	* while maintaining flexibility in how repetitions are handled.
	*
	* For example, using a schedule with `recurs(2)` will allow for two additional
	* repetitions after the initial execution, provided the effect succeeds. If a
	* failure occurs during any iteration, the failure handler is invoked to handle
	* the situation.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	* import * as Option from "effect/data/Option"
	* import { Console } from "effect"
	*
	* let attempt = 0
	* const task = Effect.gen(function* () {
	*   attempt++
	*   if (attempt <= 2) {
	*     yield* Console.log(`Attempt ${attempt} failed`)
	*     yield* Effect.fail(`Error ${attempt}`)
	*   }
	*   yield* Console.log(`Attempt ${attempt} succeeded`)
	*   return "success"
	* })
	*
	* const program = Effect.repeatOrElse(
	*   task,
	*   Schedule.recurs(3),
	*   (error, attempts) =>
	*     Console.log(
	*       `Final failure: ${error}, after ${Option.getOrElse(attempts, () => 0)} attempts`
	*     ).pipe(Effect.map(() => 0))
	* )
	* ```
	*
	* @since 2.0.0
	* @category repetition / recursion
	*/
	const repeatOrElse = repeatOrElse$1;
	/**
	* Replicates the given effect `n` times.
	*
	* **Details**
	*
	* This function takes an effect and replicates it a specified number of times
	* (`n`). The result is an array of `n` effects, each of which is identical to
	* the original effect.
	*
	* @since 2.0.0
	*/
	const replicate = replicate$1;
	/**
	* Performs this effect the specified number of times and collects the results.
	*
	* **Details**
	*
	* This function repeats an effect multiple times and collects the results into
	* an array. You specify how many times to execute the effect, and it runs that
	* many times, either in sequence or concurrently depending on the provided
	* options.
	*
	* **Options**
	*
	* If the `discard` option is set to `true`, the intermediate results are not
	* collected, and the final result of the operation is `void`.
	*
	* The function also allows you to customize how the effects are handled by
	* specifying options such as concurrency, batching, and how finalizers behave.
	* These options provide flexibility in running the effects concurrently or
	* adjusting other execution details.
	*
	* @since 2.0.0
	* @category Collecting
	*/
	const replicateEffect = replicateEffect$1;
	/**
	* Runs an effect repeatedly according to a schedule, starting from a specified
	* initial input value.
	*
	* **Details**
	*
	* This function allows you to repeatedly execute an effect based on a schedule.
	* The schedule starts with the given `initial` input value, which is passed to
	* the first execution. Subsequent executions of the effect are controlled by
	* the schedule's rules, using the output of the previous iteration as the input
	* for the next one.
	*
	* The returned effect will complete when the schedule ends or the effect fails,
	* propagating the error.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	* import { Console } from "effect"
	*
	* const task = (input: number) =>
	*   Effect.gen(function* () {
	*     yield* Console.log(`Processing: ${input}`)
	*     return input + 1
	*   })
	*
	* // Start with 0, repeat 3 times
	* const program = Effect.scheduleFrom(
	*   task(0),
	*   0,
	*   Schedule.recurs(2)
	* )
	*
	* Effect.runPromise(program).then(console.log)
	* // Returns the schedule count
	* ```
	*
	* @since 2.0.0
	* @category Repetition / Recursion
	*/
	const scheduleFrom = scheduleFrom$1;
	/**
	* Returns the current tracer from the context.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const currentTracer = yield* Effect.tracer
	*   yield* Effect.log(`Using tracer: ${currentTracer}`)
	*   return "operation completed"
	* })
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const tracer = tracer$1;
	/**
	* Provides a tracer to an effect.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   yield* Effect.log("Using tracer")
	*   return "completed"
	* })
	*
	* // withTracer provides a tracer to the effect context
	* // const traced = Effect.withTracer(program, customTracer)
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const withTracer = withTracer$1;
	/**
	* Disable the tracer for the given Effect.
	*
	* @since 2.0.0
	* @category Tracing
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* Effect.succeed(42).pipe(
	*   Effect.withSpan("my-span"),
	*   // the span will not be registered with the tracer
	*   Effect.withTracerEnabled(false)
	* )
	* ```
	*/
	const withTracerEnabled = withTracerEnabled$1;
	/**
	* Adds an annotation to each span in this effect.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   yield* Effect.log("Doing some work...")
	*   return "result"
	* })
	*
	* // Add single annotation
	* const annotated1 = Effect.annotateSpans(program, "user", "john")
	*
	* // Add multiple annotations
	* const annotated2 = Effect.annotateSpans(program, {
	*   operation: "data-processing",
	*   version: "1.0.0",
	*   environment: "production"
	* })
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const annotateSpans = annotateSpans$1;
	/**
	* Adds an annotation to the current span if available.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   yield* Effect.annotateCurrentSpan("userId", "123")
	*   yield* Effect.annotateCurrentSpan({
	*     operation: "user-lookup",
	*     timestamp: Date.now()
	*   })
	*   yield* Effect.log("User lookup completed")
	*   return "success"
	* })
	*
	* const traced = Effect.withSpan(program, "user-operation")
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const annotateCurrentSpan = annotateCurrentSpan$1;
	/**
	* Returns the current span from the context.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const span = yield* Effect.currentSpan
	*   yield* Effect.log(`Current span: ${span}`)
	*   return "done"
	* })
	*
	* const traced = Effect.withSpan(program, "my-span")
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const currentSpan = currentSpan$1;
	/**
	* Returns the current parent span from the context.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const childOperation = Effect.gen(function* () {
	*   const parentSpan = yield* Effect.currentParentSpan
	*   yield* Effect.log(`Parent span: ${parentSpan}`)
	*   return "child completed"
	* })
	*
	* const program = Effect.gen(function* () {
	*   yield* Effect.withSpan(childOperation, "child-span")
	*   return "parent completed"
	* })
	*
	* const traced = Effect.withSpan(program, "parent-span")
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const currentParentSpan = currentParentSpan$1;
	/**
	* Returns the annotations of the current span.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   // Add some annotations to the current span
	*   yield* Effect.annotateCurrentSpan("userId", "123")
	*   yield* Effect.annotateCurrentSpan("operation", "data-processing")
	*
	*   // Retrieve all annotations
	*   const annotations = yield* Effect.spanAnnotations
	*
	*   console.log("Current span annotations:", annotations)
	*   return annotations
	* })
	*
	* Effect.runPromise(program).then(console.log)
	* // Output: Current span annotations: { userId: "123", operation: "data-processing" }
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const spanAnnotations = spanAnnotations$1;
	/**
	* Retrieves the span links associated with the current span.
	*
	* Span links are connections between spans that are related but not in a
	* parent-child relationship. They are useful for linking spans across different
	* traces or connecting spans from parallel operations.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   // Get the current span links
	*   const links = yield* Effect.spanLinks
	*   console.log(`Current span has ${links.length} links`)
	*   return links
	* })
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const spanLinks = spanLinks$1;
	/**
	* For all spans in this effect, add a link with the provided span.
	*
	* This is useful for connecting spans that are related but not in a direct
	* parent-child relationship. For example, you might want to link spans from
	* parallel operations or connect spans across different traces.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const parentEffect = Effect.withSpan("parent-operation")(
	*   Effect.succeed("parent result")
	* )
	*
	* const childEffect = Effect.withSpan("child-operation")(
	*   Effect.succeed("child result")
	* )
	*
	* // Link the child span to the parent span
	* const program = Effect.gen(function* () {
	*   const parentSpan = yield* Effect.currentSpan
	*   const result = yield* childEffect.pipe(
	*     Effect.linkSpans(parentSpan, { relationship: "follows" })
	*   )
	*   return result
	* })
	* ```
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // Link multiple spans
	* const program = Effect.gen(function* () {
	*   const span1 = yield* Effect.currentSpan
	*   const span2 = yield* Effect.currentSpan
	*
	*   return yield* Effect.succeed("result").pipe(
	*     Effect.linkSpans([span1, span2], {
	*       type: "dependency",
	*       source: "multiple-operations"
	*     })
	*   )
	* })
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const linkSpans = linkSpans$1;
	/**
	* Create a new span for tracing.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const span = yield* Effect.makeSpan("my-operation")
	*   yield* Effect.log("Operation in progress")
	*   return "completed"
	* })
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const makeSpan = makeSpan$1;
	/**
	* Create a new span for tracing, and automatically close it when the Scope
	* finalizes.
	*
	* The span is not added to the current span stack, so no child spans will be
	* created for it.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.scoped(
	*   Effect.gen(function* () {
	*     const span = yield* Effect.makeSpanScoped("scoped-operation")
	*     yield* Effect.log("Working...")
	*     return "done"
	*     // Span automatically closes when scope ends
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const makeSpanScoped = makeSpanScoped$1;
	/**
	* Create a new span for tracing, and automatically close it when the effect
	* completes.
	*
	* The span is not added to the current span stack, so no child spans will be
	* created for it.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.useSpan("user-operation", (span) =>
	*   Effect.gen(function* () {
	*     yield* Effect.log("Processing user data")
	*     return "success"
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const useSpan = useSpan$1;
	/**
	* Wraps the effect with a new span for tracing.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const task = Effect.gen(function* () {
	*   yield* Effect.log("Executing task")
	*   return "result"
	* })
	*
	* const traced = Effect.withSpan(task, "my-task", {
	*   attributes: { version: "1.0" }
	* })
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const withSpan = withSpan$1;
	/**
	* Wraps the effect with a new span for tracing.
	*
	* The span is ended when the Scope is finalized.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.scoped(
	*   Effect.gen(function* () {
	*     const task = Effect.log("Working...")
	*     yield* Effect.withSpanScoped(task, "scoped-task")
	*     return "completed"
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const withSpanScoped = withSpanScoped$1;
	/**
	* Adds the provided span to the current span stack.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const span = yield* Effect.makeSpan("parent-span")
	*   const childTask = Effect.log("Child operation")
	*   yield* Effect.withParentSpan(childTask, span)
	*   return "completed"
	* })
	* ```
	*
	* @since 2.0.0
	* @category Tracing
	*/
	const withParentSpan = withParentSpan$1;
	/**
	* Executes a request using the provided resolver.
	*
	* @since 2.0.0
	* @category requests & batching
	*/
	const request = request$1;
	/**
	* A low-level function that executes a request using the provided resolver.
	*
	* The resolver will call the `onExit` function with the exit value of the request.
	*
	* It returns a function that, when called, will cancel the request.
	*
	* @since 4.0.0
	* @category requests & batching
	*/
	const requestUnsafe = requestUnsafe$1;
	/**
	* Returns an effect that forks this effect into its own separate fiber,
	* returning the fiber immediately, without waiting for it to begin executing
	* the effect.
	*
	* You can use the `forkChild` method whenever you want to execute an effect in a
	* new fiber, concurrently and without "blocking" the fiber executing other
	* effects. Using fibers can be tricky, so instead of using this method
	* directly, consider other higher-level methods, such as `raceWith`,
	* `zipPar`, and so forth.
	*
	* The fiber returned by this method has methods to interrupt the fiber and to
	* wait for it to finish executing the effect. See `Fiber` for more
	* information.
	*
	* Whenever you use this method to launch a new fiber, the new fiber is
	* attached to the parent fiber's scope. This means when the parent fiber
	* terminates, the child fiber will be terminated as well, ensuring that no
	* fibers leak. This behavior is called "auto supervision", and if this
	* behavior is not desired, you may use the `forkDetach` or `forkIn` methods.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	*
	* const longRunningTask = Effect.gen(function* () {
	*   yield* Effect.sleep("2 seconds")
	*   yield* Effect.log("Task completed")
	*   return "result"
	* })
	*
	* const program = Effect.gen(function* () {
	*   const fiber = yield* Effect.forkChild(longRunningTask)
	*   yield* Effect.log("Task forked, continuing...")
	*   const result = yield* Fiber.join(fiber)
	*   return result
	* })
	* ```
	*
	* @since 4.0.0
	* @category supervision & fibers
	*/
	const forkChild = forkChild$1;
	/**
	* Forks the effect in the specified scope. The fiber will be interrupted
	* when the scope is closed.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Scope } from "effect"
	* import { Fiber } from "effect"
	*
	* const task = Effect.gen(function* () {
	*   yield* Effect.sleep("10 seconds")
	*   return "completed"
	* })
	*
	* const program = Effect.scoped(
	*   Effect.gen(function* () {
	*     const scope = yield* Effect.scope
	*     const fiber = yield* Effect.forkIn(task, scope)
	*     yield* Effect.sleep("1 second")
	*     // Fiber will be interrupted when scope closes
	*     return "done"
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category supervision & fibers
	*/
	const forkIn = forkIn$1;
	/**
	* Forks the fiber in a `Scope`, interrupting it when the scope is closed.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	*
	* const backgroundTask = Effect.gen(function* () {
	*   yield* Effect.sleep("5 seconds")
	*   yield* Effect.log("Background task completed")
	*   return "result"
	* })
	*
	* const program = Effect.scoped(
	*   Effect.gen(function* () {
	*     const fiber = yield* Effect.fork(backgroundTask)
	*     yield* Effect.log("Task forked in scope")
	*     yield* Effect.sleep("1 second")
	*     // Fiber will be interrupted when scope closes
	*     return "scope completed"
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category supervision & fibers
	*/
	const fork = fork$2;
	/**
	* Forks the effect into a new fiber attached to the global scope. Because the
	* new fiber is attached to the global scope, when the fiber executing the
	* returned effect terminates, the forked fiber will continue running.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	*
	* const daemonTask = Effect.gen(function* () {
	*   while (true) {
	*     yield* Effect.sleep("1 second")
	*     yield* Effect.log("Daemon running...")
	*   }
	* })
	*
	* const program = Effect.gen(function* () {
	*   const fiber = yield* Effect.forkDetach(daemonTask)
	*   yield* Effect.log("Daemon started")
	*   yield* Effect.sleep("3 seconds")
	*   // Daemon continues running after this effect completes
	*   return "main completed"
	* })
	* ```
	*
	* @since 2.0.0
	* @category supervision & fibers
	*/
	const forkDetach = forkDetach$1;
	/**
	* The foundational function for running effects, returning a "fiber" that can
	* be observed or interrupted.
	*
	* **When to Use**
	*
	* `runFork` is used to run an effect in the background by creating a
	* fiber. It is the base function for all other run functions. It starts a fiber
	* that can be observed or interrupted.
	*
	* Unless you specifically need a `Promise` or synchronous operation,
	* `runFork` is a good default choice.
	*
	* @example
	* ```ts
	* // Title: Running an Effect in the Background
	* import { Effect } from "effect"
	* import { Schedule } from "effect"
	* import { Fiber } from "effect"
	* import { Console } from "effect"
	*
	* //      ┌─── Effect<number, never, never>
	* //      ▼
	* const program = Effect.repeat(
	*   Console.log("running..."),
	*   Schedule.spaced("200 millis")
	* )
	*
	* //      ┌─── RuntimeFiber<number, never>
	* //      ▼
	* const fiber = Effect.runFork(program)
	*
	* setTimeout(() => {
	*   Effect.runFork(Fiber.interrupt(fiber))
	* }, 500)
	* ```
	*
	* @since 2.0.0
	* @category Running Effects
	*/
	const runFork = runFork$1;
	/**
	* Runs an effect in the background with the provided services.
	*
	* @example
	* ```ts
	* import { Effect, ServiceMap } from "effect"
	*
	* interface Logger {
	*   log: (message: string) => void
	* }
	*
	* const Logger = ServiceMap.Service<Logger>("Logger")
	*
	* const services = ServiceMap.make(Logger, {
	*   log: (message) => console.log(message)
	* })
	*
	* const program = Effect.gen(function* () {
	*   const logger = yield* Logger
	*   logger.log("Hello from service!")
	*   return "done"
	* })
	*
	* const fiber = Effect.runForkWith(services)(program)
	* ```
	*
	* @since 4.0.0
	* @category Running Effects
	*/
	const runForkWith = runForkWith$1;
	/**
	* @since 4.0.0
	* @category Running Effects
	*/
	const runCallbackWith = runCallbackWith$1;
	/**
	* @since 4.0.0
	* @category Running Effects
	*/
	const runCallback = runCallback$1;
	/**
	* Executes an effect and returns the result as a `Promise`.
	*
	* **When to Use**
	*
	* Use `runPromise` when you need to execute an effect and work with the
	* result using `Promise` syntax, typically for compatibility with other
	* promise-based code.
	*
	* If the effect succeeds, the promise will resolve with the result. If the
	* effect fails, the promise will reject with an error.
	*
	* @see {@link runPromiseExit} for a version that returns an `Exit` type instead of rejecting.
	*
	* @example
	* ```ts
	* // Title: Running a Successful Effect as a Promise
	* import { Effect } from "effect"
	*
	* Effect.runPromise(Effect.succeed(1)).then(console.log)
	* // Output: 1
	* ```
	*
	* @example
	* //Example: Handling a Failing Effect as a Rejected Promise
	* import { Effect } from "effect"
	*
	* Effect.runPromise(Effect.fail("my error")).catch(console.error)
	* // Output:
	* // (FiberFailure) Error: my error
	*
	* @since 2.0.0
	* @category Running Effects
	*/
	const runPromise = runPromise$1;
	/**
	* Executes an effect as a Promise with the provided services.
	*
	* @example
	* ```ts
	* import { Effect, ServiceMap } from "effect"
	*
	* interface Config {
	*   apiUrl: string
	* }
	*
	* const Config = ServiceMap.Service<Config>("Config")
	*
	* const services = ServiceMap.make(Config, {
	*   apiUrl: "https://api.example.com"
	* })
	*
	* const program = Effect.gen(function* () {
	*   const config = yield* Config
	*   return `Connecting to ${config.apiUrl}`
	* })
	*
	* Effect.runPromiseWith(services)(program).then(console.log)
	* ```
	*
	* @since 4.0.0
	* @category Running Effects
	*/
	const runPromiseWith = runPromiseWith$1;
	/**
	* Runs an effect and returns a `Promise` that resolves to an `Exit`, which
	* represents the outcome (success or failure) of the effect.
	*
	* **When to Use**
	*
	* Use `runPromiseExit` when you need to determine if an effect succeeded
	* or failed, including any defects, and you want to work with a `Promise`.
	*
	* **Details**
	*
	* The `Exit` type represents the result of the effect:
	* - If the effect succeeds, the result is wrapped in a `Success`.
	* - If it fails, the failure information is provided as a `Failure` containing
	*   a `Cause` type.
	*
	* @example
	* ```ts
	* // Title: Handling Results as Exit
	* import { Effect } from "effect"
	*
	* // Execute a successful effect and get the Exit result as a Promise
	* Effect.runPromiseExit(Effect.succeed(1)).then(console.log)
	* // Output:
	* // {
	* //   _id: "Exit",
	* //   _tag: "Success",
	* //   value: 1
	* // }
	*
	* // Execute a failing effect and get the Exit result as a Promise
	* Effect.runPromiseExit(Effect.fail("my error")).then(console.log)
	* // Output:
	* // {
	* //   _id: "Exit",
	* //   _tag: "Failure",
	* //   cause: {
	* //     _id: "Cause",
	* //     _tag: "Fail",
	* //     failure: "my error"
	* //   }
	* // }
	* ```
	*
	* @since 2.0.0
	* @category Running Effects
	*/
	const runPromiseExit = runPromiseExit$1;
	/**
	* Runs an effect and returns a Promise of Exit with provided services.
	*
	* @example
	* ```ts
	* import { Effect, Exit, ServiceMap } from "effect"
	*
	* interface Database {
	*   query: (sql: string) => string
	* }
	*
	* const Database = ServiceMap.Service<Database>("Database")
	*
	* const services = ServiceMap.make(Database, {
	*   query: (sql) => `Result for: ${sql}`
	* })
	*
	* const program = Effect.gen(function* () {
	*   const db = yield* Database
	*   return db.query("SELECT * FROM users")
	* })
	*
	* Effect.runPromiseExitWith(services)(program).then((exit) => {
	*   if (Exit.isSuccess(exit)) {
	*     console.log("Success:", exit.value)
	*   }
	* })
	* ```
	*
	* @since 4.0.0
	* @category Running Effects
	*/
	const runPromiseExitWith = runPromiseExitWith$1;
	/**
	* Executes an effect synchronously, running it immediately and returning the
	* result.
	*
	* **When to Use**
	*
	* Use `runSync` to run an effect that does not fail and does not include
	* any asynchronous operations.
	*
	* If the effect fails or involves asynchronous work, it will throw an error,
	* and execution will stop where the failure or async operation occurs.
	*
	* @see {@link runSyncExit} for a version that returns an `Exit` type instead of
	* throwing an error.
	*
	* @example
	* ```ts
	* // Title: Synchronous Logging
	* import { Effect } from "effect"
	*
	* const program = Effect.sync(() => {
	*   console.log("Hello, World!")
	*   return 1
	* })
	*
	* const result = Effect.runSync(program)
	* // Output: Hello, World!
	*
	* console.log(result)
	* // Output: 1
	* ```
	*
	* @example
	* // Title: Incorrect Usage with Failing or Async Effects
	* import { Effect } from "effect"
	*
	* try {
	*   // Attempt to run an effect that fails
	*   Effect.runSync(Effect.fail("my error"))
	* } catch (e) {
	*   console.error(e)
	* }
	* // Output:
	* // (FiberFailure) Error: my error
	*
	* try {
	*   // Attempt to run an effect that involves async work
	*   Effect.runSync(Effect.promise(() => Promise.resolve(1)))
	* } catch (e) {
	*   console.error(e)
	* }
	* // Output:
	* // (FiberFailure) AsyncFiberException: Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work
	*
	* @since 2.0.0
	* @category Running Effects
	*/
	const runSync = runSync$1;
	/**
	* Executes an effect synchronously with provided services.
	*
	* @example
	* ```ts
	* import { Effect, ServiceMap } from "effect"
	*
	* interface MathService {
	*   add: (a: number, b: number) => number
	* }
	*
	* const MathService = ServiceMap.Service<MathService>("MathService")
	*
	* const services = ServiceMap.make(MathService, {
	*   add: (a, b) => a + b
	* })
	*
	* const program = Effect.gen(function* () {
	*   const math = yield* MathService
	*   return math.add(2, 3)
	* })
	*
	* const result = Effect.runSyncWith(services)(program)
	* console.log(result) // 5
	* ```
	*
	* @since 4.0.0
	* @category Running Effects
	*/
	const runSyncWith = runSyncWith$1;
	/**
	* Runs an effect synchronously and returns the result as an `Exit` type, which
	* represents the outcome (success or failure) of the effect.
	*
	* **When to Use**
	*
	* Use `runSyncExit` to find out whether an effect succeeded or failed,
	* including any defects, without dealing with asynchronous operations.
	*
	* **Details**
	*
	* The `Exit` type represents the result of the effect:
	* - If the effect succeeds, the result is wrapped in a `Success`.
	* - If it fails, the failure information is provided as a `Failure` containing
	*   a `Cause` type.
	*
	* If the effect contains asynchronous operations, `runSyncExit` will
	* return an `Failure` with a `Die` cause, indicating that the effect cannot be
	* resolved synchronously.
	*
	* @example
	* ```ts
	* // Title: Handling Results as Exit
	* import { Effect } from "effect"
	*
	* console.log(Effect.runSyncExit(Effect.succeed(1)))
	* // Output:
	* // {
	* //   _id: "Exit",
	* //   _tag: "Success",
	* //   value: 1
	* // }
	*
	* console.log(Effect.runSyncExit(Effect.fail("my error")))
	* // Output:
	* // {
	* //   _id: "Exit",
	* //   _tag: "Failure",
	* //   cause: {
	* //     _id: "Cause",
	* //     _tag: "Fail",
	* //     failure: "my error"
	* //   }
	* // }
	* ```
	*
	* @example
	* // Title: Asynchronous Operation Resulting in Die
	* import { Effect } from "effect"
	*
	* console.log(Effect.runSyncExit(Effect.promise(() => Promise.resolve(1))))
	* // Output:
	* // {
	* //   _id: 'Exit',
	* //   _tag: 'Failure',
	* //   cause: {
	* //     _id: 'Cause',
	* //     _tag: 'Die',
	* //     defect: [Fiber #0 cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work] {
	* //       fiber: [FiberRuntime],
	* //       _tag: 'AsyncFiberException',
	* //       name: 'AsyncFiberException'
	* //     }
	* //   }
	* // }
	*
	* @since 2.0.0
	* @category Running Effects
	*/
	const runSyncExit = runSyncExit$1;
	/**
	* Runs an effect synchronously with provided services, returning an Exit result.
	*
	* @example
	* ```ts
	* import { Effect, Exit, ServiceMap } from "effect"
	*
	* // Define a logger service
	* const Logger = ServiceMap.Service<{
	*   log: (msg: string) => void
	* }>("Logger")
	*
	* const program = Effect.gen(function* () {
	*   const logger = yield* Effect.service(Logger)
	*   logger.log("Computing result...")
	*   return 42
	* })
	*
	* // Prepare services
	* const services = ServiceMap.make(Logger, {
	*   log: (msg) => console.log(`[LOG] ${msg}`)
	* })
	*
	* const exit = Effect.runSyncExitWith(services)(program)
	*
	* if (Exit.isSuccess(exit)) {
	*   console.log(`Success: ${exit.value}`)
	* } else {
	*   console.log(`Failure: ${exit.cause}`)
	* }
	* // Output:
	* // [LOG] Computing result...
	* // Success: 42
	* ```
	*
	* @since 4.0.0
	* @category Running Effects
	*/
	const runSyncExitWith = runSyncExitWith$1;
	/**
	* Creates a function that returns an Effect.
	*
	* The function can be created using a generator function that can yield
	* effects.
	*
	* `Effect.fnUntraced` also acts as a `pipe` function, allowing you to create a pipeline after the function definition.
	*
	* @example
	* ```ts
	* // Title: Creating a traced function with a generator function
	* import { Effect } from "effect"
	*
	* const logExample = Effect.fnUntraced(function*<N extends number>(n: N) {
	*   yield* Effect.annotateCurrentSpan("n", n)
	*   yield* Effect.logInfo(`got: ${n}`)
	*   yield* Effect.fail(new Error())
	* })
	*
	* Effect.runFork(logExample(100))
	* ```
	*
	* @since 3.12.0
	* @category function
	*/
	const fnUntraced = fnUntraced$1;
	/**
	* @since 3.12.0
	* @category function
	*/
	const fn = fn$1;
	/**
	* Retrieves the `Clock` service from the context and provides it to the
	* specified effectful function.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	*
	* const program = Effect.clockWith((clock) =>
	*   clock.currentTimeMillis.pipe(
	*     Effect.map((currentTime) => `Current time is: ${currentTime}`),
	*     Effect.tap(Console.log)
	*   )
	* )
	*
	* Effect.runFork(program)
	* // Example Output:
	* // Current time is: 1735484929744
	* ```
	*
	* @since 2.0.0
	* @category Clock
	*/
	const clockWith = clockWith$2;
	/**
	* @since 2.0.0
	* @category logging
	*/
	const logWithLevel = logWithLevel$1;
	/**
	* An optimized version of `map` that checks if an effect is already resolved
	* and applies the mapping function eagerly when possible.
	*
	* **When to Use**
	*
	* `mapEager` provides better performance for effects that are already resolved
	* by applying the transformation immediately instead of deferring it through
	* the effect pipeline.
	*
	* **Behavior**
	*
	* - For **Success effects**: Applies the mapping function immediately to the value
	* - For **Failure effects**: Returns the failure as-is without applying the mapping
	* - For **Pending effects**: Falls back to the regular `map` behavior
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // For resolved effects, the mapping is applied immediately
	* const resolved = Effect.succeed(5)
	* const mapped = Effect.mapEager(resolved, n => n * 2) // Applied eagerly
	*
	* // For pending effects, behaves like regular map
	* const pending = Effect.delay(Effect.succeed(5), "100 millis")
	* const mappedPending = Effect.mapEager(pending, n => n * 2) // Uses regular map
	* ```
	*
	* @since 4.0.0
	* @category Eager
	*/
	const mapEager = mapEager$1;
	/**
	* An optimized version of `mapError` that checks if an effect is already resolved
	* and applies the error mapping function eagerly when possible.
	*
	* **When to Use**
	*
	* `mapErrorEager` provides better performance for effects that are already resolved
	* by applying the error transformation immediately instead of deferring it through
	* the effect pipeline.
	*
	* **Behavior**
	*
	* - For **Success effects**: Returns the success as-is (no error to transform)
	* - For **Failure effects**: Applies the mapping function immediately to the error
	* - For **Pending effects**: Falls back to the regular `mapError` behavior
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // For resolved failure effects, the error mapping is applied immediately
	* const failed = Effect.fail("original error")
	* const mapped = Effect.mapErrorEager(failed, (err: string) => `mapped: ${err}`) // Applied eagerly
	*
	* // For pending effects, behaves like regular mapError
	* const pending = Effect.delay(Effect.fail("error"), "100 millis")
	* const mappedPending = Effect.mapErrorEager(pending, (err: string) => `mapped: ${err}`) // Uses regular mapError
	* ```
	*
	* @since 4.0.0
	* @category Eager
	*/
	const mapErrorEager = mapErrorEager$1;
	/**
	* An optimized version of `mapBoth` that checks if an effect is already resolved
	* and applies the appropriate mapping function eagerly when possible.
	*
	* **When to Use**
	*
	* `mapBothEager` provides better performance for effects that are already resolved
	* by applying the transformation immediately instead of deferring it through
	* the effect pipeline.
	*
	* **Behavior**
	*
	* - For **Success effects**: Applies the `onSuccess` function immediately to the value
	* - For **Failure effects**: Applies the `onFailure` function immediately to the error
	* - For **Pending effects**: Falls back to the regular `mapBoth` behavior
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // For resolved effects, the appropriate mapping is applied immediately
	* const success = Effect.succeed(5)
	* const mapped = Effect.mapBothEager(success, {
	*   onFailure: (err: string) => `Failed: ${err}`,
	*   onSuccess: (n: number) => n * 2
	* }) // onSuccess applied eagerly
	*
	* const failure = Effect.fail("error")
	* const mappedError = Effect.mapBothEager(failure, {
	*   onFailure: (err: string) => `Failed: ${err}`,
	*   onSuccess: (n: number) => n * 2
	* }) // onFailure applied eagerly
	* ```
	*
	* @since 4.0.0
	* @category Eager
	*/
	const mapBothEager = mapBothEager$1;
	/**
	* An optimized version of `flatMap` that checks if an effect is already resolved
	* and applies the flatMap function eagerly when possible.
	*
	* **When to Use**
	*
	* `flatMapEager` provides better performance for effects that are already resolved
	* by applying the transformation immediately instead of deferring it through
	* the effect pipeline.
	*
	* **Behavior**
	*
	* - For **Success effects**: Applies the flatMap function immediately to the value
	* - For **Failure effects**: Returns the failure as-is without applying the flatMap
	* - For **Pending effects**: Falls back to the regular `flatMap` behavior
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // For resolved effects, the flatMap is applied immediately
	* const resolved = Effect.succeed(5)
	* const flatMapped = Effect.flatMapEager(resolved, n => Effect.succeed(n * 2)) // Applied eagerly
	*
	* // For pending effects, behaves like regular flatMap
	* const pending = Effect.delay(Effect.succeed(5), "100 millis")
	* const flatMappedPending = Effect.flatMapEager(pending, n => Effect.succeed(n * 2)) // Uses regular flatMap
	* ```
	*
	* @since 4.0.0
	* @category Eager
	*/
	const flatMapEager = flatMapEager$1;
	/**
	* An optimized version of `catch` that checks if an effect is already resolved
	* and applies the catch function eagerly when possible.
	*
	* **When to Use**
	*
	* `catchEager` provides better performance for effects that are already resolved
	* by applying the error recovery immediately instead of deferring it through
	* the effect pipeline.
	*
	* **Behavior**
	*
	* - For **Success effects**: Returns the success as-is (no error to catch)
	* - For **Failure effects**: Applies the catch function immediately to the error
	* - For **Pending effects**: Falls back to the regular `catch` behavior
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* // For resolved failure effects, the catch function is applied immediately
	* const failed = Effect.fail("original error")
	* const recovered = Effect.catchEager(failed, (err: string) =>
	*   Effect.succeed(`recovered from: ${err}`)
	* ) // Applied eagerly
	*
	* // For success effects, returns success as-is
	* const success = Effect.succeed(42)
	* const unchanged = Effect.catchEager(success, (err: string) =>
	*   Effect.succeed(`recovered from: ${err}`)
	* ) // Returns success as-is
	*
	* // For pending effects, behaves like regular catch
	* const pending = Effect.delay(Effect.fail("error"), "100 millis")
	* const recoveredPending = Effect.catchEager(pending, (err: string) =>
	*   Effect.succeed(`recovered from: ${err}`)
	* ) // Uses regular catch
	* ```
	*
	* @since 4.0.0
	* @category Eager
	*/
	const catchEager = catchEager$1;
	/**
	* Creates untraced function effects with eager evaluation optimization.
	*
	* Executes generator functions eagerly when all yielded effects are synchronous,
	* stopping at the first async effect and deferring to normal execution.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	*
	* const computation = Effect.fnUntracedEager(function*() {
	*   yield* Effect.succeed(1)
	*   yield* Effect.succeed(2)
	*   return "computed eagerly"
	* })
	*
	* const effect = computation() // Executed immediately if all effects are sync
	* ```
	*
	* @since 4.0.0
	* @category Eager
	*/
	const fnUntracedEager = fnUntracedEager$1;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Fiber.js
	`${version}`;
	const await_ = fiberAwait;
	/**
	* Waits for all fibers in the provided iterable to complete and returns
	* an array of their exit values.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const fiber1 = yield* Effect.forkChild(Effect.succeed(1))
	*   const fiber2 = yield* Effect.forkChild(Effect.succeed(2))
	*   const exits = yield* Fiber.awaitAll([fiber1, fiber2])
	*   console.log(exits) // [Exit.succeed(1), Exit.succeed(2)]
	* })
	* ```
	*
	* @since 2.0.0
	* @category combinators
	*/
	const awaitAll = fiberAwaitAll;
	/**
	* Joins a fiber, blocking until it completes. If the fiber succeeds,
	* returns its value. If it fails, the error is propagated.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const fiber = yield* Effect.forkChild(Effect.succeed(42))
	*   const result = yield* Fiber.join(fiber)
	*   console.log(result) // 42
	* })
	* ```
	*
	* @since 2.0.0
	* @category combinators
	*/
	const join = fiberJoin;
	/**
	* @since 2.0.0
	* @category combinators
	*/
	const joinAll = fiberJoinAll;
	/**
	* Interrupts a fiber, causing it to stop executing and clean up any
	* acquired resources.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const fiber = yield* Effect.forkChild(Effect.delay("1 second")(Effect.succeed(42)))
	*   yield* Fiber.interrupt(fiber)
	*   console.log("Fiber interrupted")
	* })
	* ```
	*
	* @since 2.0.0
	* @category interruption
	*/
	const interrupt = fiberInterrupt;
	/**
	* Interrupts a fiber with a specific fiber ID as the interruptor. This allows
	* tracking which fiber initiated the interruption.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const targetFiber = yield* Effect.forkChild(
	*     Effect.delay("5 seconds")(Effect.succeed("task completed"))
	*   )
	*
	*   // Interrupt the fiber, specifying fiber ID 123 as the interruptor
	*   yield* Fiber.interruptAs(targetFiber, 123)
	*   console.log("Fiber interrupted by fiber #123")
	* })
	* ```
	*
	* @since 2.0.0
	* @category interruption
	*/
	const interruptAs = fiberInterruptAs;
	/**
	* Interrupts all fibers in the provided iterable, causing them to stop executing
	* and clean up any acquired resources.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	* import { Fiber } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   // Create multiple long-running fibers
	*   const fiber1 = yield* Effect.forkChild(
	*     Effect.gen(function* () {
	*       yield* Effect.sleep("5 seconds")
	*       yield* Console.log("Task 1 completed")
	*       return "result1"
	*     })
	*   )
	*
	*   const fiber2 = yield* Effect.forkChild(
	*     Effect.gen(function* () {
	*       yield* Effect.sleep("3 seconds")
	*       yield* Console.log("Task 2 completed")
	*       return "result2"
	*     })
	*   )
	*
	*   const fiber3 = yield* Effect.forkChild(
	*     Effect.gen(function* () {
	*       yield* Effect.sleep("4 seconds")
	*       yield* Console.log("Task 3 completed")
	*       return "result3"
	*     })
	*   )
	*
	*   // Wait a bit, then interrupt all fibers
	*   yield* Effect.sleep("1 second")
	*   yield* Console.log("Interrupting all fibers...")
	*   yield* Fiber.interruptAll([fiber1, fiber2, fiber3])
	*   yield* Console.log("All fibers have been interrupted")
	* })
	* ```
	*
	* @since 2.0.0
	* @category interruption
	*/
	const interruptAll = fiberInterruptAll;
	/**
	* Interrupts all fibers in the provided iterable using the specified fiber ID as the
	* interrupting fiber. This allows you to control which fiber is considered the source
	* of the interruption, which can be useful for debugging and tracing.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Console } from "effect"
	* import { Fiber } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   // Create a controlling fiber
	*   const controllerFiber = yield* Effect.forkChild(Effect.succeed("controller"))
	*
	*   // Create multiple worker fibers
	*   const worker1 = yield* Effect.forkChild(
	*     Effect.gen(function* () {
	*       yield* Effect.sleep("5 seconds")
	*       yield* Console.log("Worker 1 completed")
	*       return "worker1"
	*     })
	*   )
	*
	*   const worker2 = yield* Effect.forkChild(
	*     Effect.gen(function* () {
	*       yield* Effect.sleep("3 seconds")
	*       yield* Console.log("Worker 2 completed")
	*       return "worker2"
	*     })
	*   )
	*
	*   // Interrupt all workers using the controller fiber's ID
	*   yield* Effect.sleep("1 second")
	*   yield* Console.log("Interrupting workers from controller...")
	*   yield* Fiber.interruptAllAs([worker1, worker2], controllerFiber.id)
	*   yield* Console.log("All workers interrupted by controller")
	* })
	* ```
	*
	* @since 2.0.0
	* @category interruption
	*/
	const interruptAllAs = fiberInterruptAllAs;
	/**
	* Returns the current fiber if called from within a fiber context,
	* otherwise returns `undefined`.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Fiber } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const current = Fiber.getCurrent()
	*   if (current) {
	*     console.log(`Current fiber ID: ${current.id}`)
	*   }
	* })
	* ```
	*
	* @since 2.0.0
	* @category accessors
	*/
	const getCurrent = getCurrentFiber;
	/**
	* Links the lifetime of a fiber to the provided scope.
	*
	* @since 4.0.0
	* @category Scope
	*/
	const runIn = fiberRunIn;

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/collections/MutableList.js
/**
	* A unique symbol used to represent an empty result when taking elements from a MutableList.
	* This symbol is returned by `take` when the list is empty, allowing for safe type checking.
	*
	* @example
	* ```ts
	* import * as MutableList from "effect/collections/MutableList"
	*
	* const list = MutableList.make<string>()
	*
	* // Take from empty list returns Empty symbol
	* const result = MutableList.take(list)
	* console.log(result === MutableList.Empty) // true
	*
	* // Safe pattern for checking emptiness
	* const processNext = (queue: MutableList.MutableList<string>) => {
	*   const item = MutableList.take(queue)
	*   if (item === MutableList.Empty) {
	*     console.log("Queue is empty")
	*     return null
	*   }
	*   return item.toUpperCase()
	* }
	*
	* // Compare with other empty results
	* MutableList.append(list, "hello")
	* const next = MutableList.take(list)
	* console.log(next !== MutableList.Empty) // true, got "hello"
	*
	* const empty = MutableList.take(list)
	* console.log(empty === MutableList.Empty) // true, list is empty
	* ```
	*
	* @since 4.0.0
	* @category Symbols
	*/
	const Empty = /* @__PURE__ */ Symbol.for("effect/MutableList/Empty");
	/**
	* Creates an empty MutableList.
	*
	* @example
	* ```ts
	* import * as MutableList from "effect/collections/MutableList"
	*
	* const list = MutableList.make<string>()
	*
	* // Add elements
	* MutableList.append(list, "first")
	* MutableList.append(list, "second")
	* MutableList.prepend(list, "beginning")
	*
	* console.log(list.length) // 3
	*
	* // Take elements in FIFO order (from head)
	* console.log(MutableList.take(list)) // "beginning"
	* console.log(MutableList.take(list)) // "first"
	* console.log(MutableList.take(list)) // "second"
	* ```
	*
	* @since 4.0.0
	* @category constructors
	*/
	const make$1 = () => ({
		head: void 0,
		tail: void 0,
		length: 0
	});
	const emptyBucket = () => ({
		array: [],
		mutable: true,
		offset: 0,
		next: void 0
	});
	/**
	* Appends an element to the end of the MutableList.
	* This operation is optimized for high-frequency usage.
	*
	* @example
	* ```ts
	* import * as MutableList from "effect/collections/MutableList"
	*
	* const list = MutableList.make<number>()
	*
	* // Append elements one by one
	* MutableList.append(list, 1)
	* MutableList.append(list, 2)
	* MutableList.append(list, 3)
	*
	* console.log(list.length) // 3
	*
	* // Elements are taken from head (FIFO)
	* console.log(MutableList.take(list)) // 1
	* console.log(MutableList.take(list)) // 2
	* console.log(MutableList.take(list)) // 3
	*
	* // High-throughput usage
	* for (let i = 0; i < 10000; i++) {
	*   MutableList.append(list, i)
	* }
	* ```
	*
	* @since 4.0.0
	* @category mutations
	*/
	const append = (self, message) => {
		if (!self.tail) self.head = self.tail = emptyBucket();
		else if (!self.tail.mutable) {
			self.tail.next = emptyBucket();
			self.tail = self.tail.next;
		}
		self.tail.array.push(message);
		self.length++;
	};
	/**
	* Appends all elements from an iterable to the end of the MutableList.
	* Returns the number of elements added.
	*
	* @example
	* ```ts
	* import * as MutableList from "effect/collections/MutableList"
	*
	* const list = MutableList.make<number>()
	* MutableList.append(list, 1)
	* MutableList.append(list, 2)
	*
	* // Append multiple elements
	* const added = MutableList.appendAll(list, [3, 4, 5])
	* console.log(added) // 3
	* console.log(list.length) // 5
	*
	* // Elements maintain order: [1, 2, 3, 4, 5]
	* console.log(MutableList.takeAll(list)) // [1, 2, 3, 4, 5]
	*
	* // Works with any iterable
	* const newList = MutableList.make<string>()
	* MutableList.appendAll(newList, new Set(["a", "b", "c"]))
	* console.log(MutableList.takeAll(newList)) // ["a", "b", "c"]
	*
	* // Useful for bulk loading
	* const bulkList = MutableList.make<number>()
	* const count = MutableList.appendAll(bulkList, Array.from({ length: 1000 }, (_, i) => i))
	* console.log(count) // 1000
	* ```
	*
	* @since 4.0.0
	* @category mutations
	*/
	const appendAll = (self, messages) => appendAllUnsafe(self, fromIterable(messages), !Array.isArray(messages));
	/**
	* Appends all elements from a ReadonlyArray to the end of the MutableList.
	* This is an optimized version that can reuse the array when mutable=true.
	* Returns the number of elements added.
	*
	* ⚠️ **Warning**: When mutable=true, the input array may be modified internally.
	* Only use mutable=true when you control the array lifecycle.
	*
	* @example
	* ```ts
	* import * as MutableList from "effect/collections/MutableList"
	*
	* const list = MutableList.make<number>()
	* MutableList.append(list, 1)
	*
	* // Safe usage (default mutable=false)
	* const items = [2, 3, 4]
	* const added = MutableList.appendAllUnsafe(list, items)
	* console.log(added) // 3
	* console.log(items) // [2, 3, 4] - unchanged
	*
	* // Unsafe but efficient usage (mutable=true)
	* const mutableItems = [5, 6, 7]
	* MutableList.appendAllUnsafe(list, mutableItems, true)
	* // mutableItems may be modified internally for efficiency
	*
	* console.log(MutableList.takeAll(list)) // [1, 2, 3, 4, 5, 6, 7]
	*
	* // High-performance bulk operations
	* const bigArray = new Array(10000).fill(0).map((_, i) => i)
	* MutableList.appendAllUnsafe(list, bigArray, true) // Very efficient
	* ```
	*
	* @since 4.0.0
	* @category mutations
	*/
	const appendAllUnsafe = (self, messages, mutable = false) => {
		const chunk = {
			array: messages,
			mutable,
			offset: 0,
			next: void 0
		};
		if (self.head) self.tail = self.tail.next = chunk;
		else self.head = self.tail = chunk;
		self.length += messages.length;
		return messages.length;
	};
	/**
	* Removes all elements from the MutableList, resetting it to an empty state.
	* This operation is highly optimized and releases all internal memory.
	*
	* @example
	* ```ts
	* import * as MutableList from "effect/collections/MutableList"
	*
	* const list = MutableList.make<number>()
	* MutableList.appendAll(list, [1, 2, 3, 4, 5])
	*
	* console.log(list.length) // 5
	*
	* // Clear all elements
	* MutableList.clear(list)
	*
	* console.log(list.length) // 0
	* console.log(MutableList.take(list)) // Empty
	*
	* // Can still use the list after clearing
	* MutableList.append(list, 42)
	* console.log(list.length) // 1
	*
	* // Useful for resetting queues or buffers
	* function resetBuffer<T>(buffer: MutableList.MutableList<T>) {
	*   MutableList.clear(buffer)
	*   console.log("Buffer cleared and ready for reuse")
	* }
	* ```
	*
	* @since 4.0.0
	* @category mutations
	*/
	const clear = (self) => {
		self.head = self.tail = void 0;
		self.length = 0;
	};
	/**
	* Takes up to N elements from the beginning of the MutableList and returns them as an array.
	* The taken elements are removed from the list. This operation is optimized for performance
	* and includes zero-copy optimizations when possible.
	*
	* @example
	* ```ts
	* import * as MutableList from "effect/collections/MutableList"
	*
	* const list = MutableList.make<number>()
	* MutableList.appendAll(list, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
	*
	* console.log(list.length) // 10
	*
	* // Take first 3 elements
	* const first3 = MutableList.takeN(list, 3)
	* console.log(first3) // [1, 2, 3]
	* console.log(list.length) // 7
	*
	* // Take more than available
	* const remaining = MutableList.takeN(list, 20)
	* console.log(remaining) // [4, 5, 6, 7, 8, 9, 10]
	* console.log(list.length) // 0
	*
	* // Take from empty list
	* const empty = MutableList.takeN(list, 5)
	* console.log(empty) // []
	*
	* // Batch processing pattern
	* const queue = MutableList.make<string>()
	* MutableList.appendAll(queue, ["task1", "task2", "task3", "task4", "task5"])
	*
	* while (queue.length > 0) {
	*   const batch = MutableList.takeN(queue, 2) // Process 2 at a time
	*   console.log("Processing batch:", batch)
	* }
	* ```
	*
	* @since 4.0.0
	* @category elements
	*/
	const takeN = (self, n) => {
		if (n <= 0 || !self.head) return [];
		n = Math.min(n, self.length);
		if (n === self.length && self.head?.offset === 0 && !self.head.next) {
			const array$4 = self.head.array;
			clear(self);
			return array$4;
		}
		const array$3 = new Array(n);
		let index = 0;
		let chunk = self.head;
		while (chunk) {
			while (chunk.offset < chunk.array.length) {
				array$3[index++] = chunk.array[chunk.offset];
				if (chunk.mutable) chunk.array[chunk.offset] = void 0;
				chunk.offset++;
				if (index === n) {
					self.length -= n;
					if (self.length === 0) clear(self);
					return array$3;
				}
			}
			chunk = chunk.next;
		}
		clear(self);
		return array$3;
	};
	/**
	* Takes a single element from the beginning of the MutableList.
	* Returns the element if available, or the Empty symbol if the list is empty.
	* The taken element is removed from the list.
	*
	* @example
	* ```ts
	* import * as MutableList from "effect/collections/MutableList"
	*
	* const list = MutableList.make<string>()
	* MutableList.appendAll(list, ["first", "second", "third"])
	*
	* // Take elements one by one
	* console.log(MutableList.take(list)) // "first"
	* console.log(list.length) // 2
	*
	* console.log(MutableList.take(list)) // "second"
	* console.log(MutableList.take(list)) // "third"
	* console.log(list.length) // 0
	*
	* // Take from empty list
	* console.log(MutableList.take(list)) // Empty symbol
	*
	* // Check for empty using the Empty symbol
	* const result = MutableList.take(list)
	* if (result === MutableList.Empty) {
	*   console.log("List is empty")
	* } else {
	*   console.log("Got element:", result)
	* }
	*
	* // Consumer pattern
	* function processNext<T>(queue: MutableList.MutableList<T>, processor: (item: T) => void): boolean {
	*   const item = MutableList.take(queue)
	*   if (item !== MutableList.Empty) {
	*     processor(item)
	*     return true
	*   }
	*   return false
	* }
	* ```
	*
	* @since 4.0.0
	* @category elements
	*/
	const take$1 = (self) => {
		if (!self.head) return Empty;
		const message = self.head.array[self.head.offset];
		if (self.head.mutable) self.head.array[self.head.offset] = void 0;
		self.head.offset++;
		self.length--;
		if (self.head.offset === self.head.array.length) if (self.head.next) self.head = self.head.next;
		else clear(self);
		return message;
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/Queue.js
	const TypeId$2 = "~effect/Queue";
	const DequeueTypeId = "~effect/Queue/Dequeue";
	const variance = {
		_A: identity,
		_E: identity
	};
	const QueueProto = {
		[TypeId$2]: variance,
		[DequeueTypeId]: variance,
		...PipeInspectableProto,
		toJSON() {
			return {
				_id: "effect/Queue",
				state: this.state._tag,
				size: sizeUnsafe(this)
			};
		}
	};
	/**
	* A `Queue` is an asynchronous queue that can be offered to and taken from.
	*
	* It also supports signaling that it is done or failed.
	*
	* @since 3.8.0
	* @category constructors
	* @example
	* ```ts
	* import * as assert from "node:assert"
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* Effect.gen(function*() {
	*   const queue = yield* Queue.make<number, string | Queue.Done>()
	*
	*   // add messages to the queue
	*   yield* Queue.offer(queue, 1)
	*   yield* Queue.offer(queue, 2)
	*   yield* Queue.offerAll(queue, [3, 4, 5])
	*
	*   // take messages from the queue
	*   const messages = yield* Queue.takeAll(queue)
	*   assert.deepStrictEqual(messages, [1, 2, 3, 4, 5])
	*
	*   // signal that the queue is done
	*   yield* Queue.end(queue)
	*   const done = yield* Effect.flip(Queue.takeAll(queue))
	*   assert.deepStrictEqual(done, Queue.Done)
	*
	*   // signal that the queue has failed
	*   yield* Queue.fail(queue, "boom")
	* })
	* ```
	*/
	const make = (options) => withFiber$1((fiber) => {
		const self = Object.create(QueueProto);
		self.scheduler = fiber.currentScheduler;
		self.capacity = options?.capacity ?? Number.POSITIVE_INFINITY;
		self.strategy = options?.strategy ?? "suspend";
		self.messages = make$1();
		self.scheduleRunning = false;
		self.state = {
			_tag: "Open",
			takers: /* @__PURE__ */ new Set(),
			offers: /* @__PURE__ */ new Set(),
			awaiters: /* @__PURE__ */ new Set()
		};
		return succeed$4(self);
	});
	/**
	* Creates a bounded queue with the specified capacity that uses backpressure strategy.
	*
	* When the queue reaches capacity, producers will be suspended until space becomes available.
	* This ensures all messages are processed but may slow down producers.
	*
	* @param capacity - The maximum number of elements the queue can hold
	* @returns An Effect that creates a bounded queue
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<string>(5)
	*
	*   // This will succeed as queue has capacity
	*   yield* Queue.offer(queue, "first")
	*   yield* Queue.offer(queue, "second")
	*
	*   const size = yield* Queue.size(queue)
	*   console.log(size) // 2
	* })
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const bounded = (capacity) => make({ capacity });
	/**
	* Add a message to the queue. Returns `false` if the queue is done.
	*
	* For bounded queues, this operation may suspend if the queue is at capacity,
	* depending on the backpressure strategy. For dropping/sliding queues, it may
	* return false or succeed immediately by dropping/sliding existing messages.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number>(3)
	*
	*   // Successfully add messages to queue
	*   const success1 = yield* Queue.offer(queue, 1)
	*   const success2 = yield* Queue.offer(queue, 2)
	*   console.log(success1, success2) // true, true
	*
	*   // Queue state
	*   const size = yield* Queue.size(queue)
	*   console.log(size) // 2
	* })
	* ```
	*
	* @category offering
	* @since 4.0.0
	*/
	const offer = (self, message) => suspend$3(() => {
		if (self.state._tag !== "Open") return exitFalse;
		else if (self.messages.length >= self.capacity) switch (self.strategy) {
			case "dropping": return exitFalse;
			case "suspend":
				if (self.capacity <= 0 && self.state.takers.size > 0) {
					append(self.messages, message);
					releaseTaker(self);
					return exitTrue;
				}
				return offerRemainingSingle(self, message);
			case "sliding":
				take$1(self.messages);
				append(self.messages, message);
				return exitTrue;
		}
		append(self.messages, message);
		scheduleReleaseTaker(self);
		return exitTrue;
	});
	/**
	* Add multiple messages to the queue synchronously. Returns the remaining messages that
	* were not added.
	*
	* This is an unsafe operation that directly modifies the queue without Effect wrapping.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* // Create a bounded queue and use unsafe API
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number>(3)
	*
	*   // Try to add 5 messages to capacity-3 queue using unsafe API
	*   const remaining = Queue.offerAllUnsafe(queue, [1, 2, 3, 4, 5])
	*   console.log(remaining) // [4, 5] - couldn't fit the last 2
	*
	*   // Check what's in the queue
	*   const size = Queue.sizeUnsafe(queue)
	*   console.log(size) // 3
	* })
	* ```
	*
	* @category offering
	* @since 4.0.0
	*/
	const offerAllUnsafe = (self, messages) => {
		if (self.state._tag !== "Open") return fromIterable(messages);
		else if (self.capacity === Number.POSITIVE_INFINITY || self.strategy === "sliding") {
			appendAll(self.messages, messages);
			if (self.strategy === "sliding") takeN(self.messages, self.messages.length - self.capacity);
			scheduleReleaseTaker(self);
			return [];
		}
		const free = self.capacity <= 0 ? self.state.takers.size : self.capacity - self.messages.length;
		if (free === 0) return fromIterable(messages);
		const remaining = [];
		let i = 0;
		for (const message of messages) {
			if (i < free) append(self.messages, message);
			else remaining.push(message);
			i++;
		}
		scheduleReleaseTaker(self);
		return remaining;
	};
	/**
	* Fail the queue with a cause. If the queue is already done, `false` is
	* returned.
	*
	* @example
	* ```ts
	* import { Effect, Cause } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number, string>(10)
	*
	*   // Add some messages
	*   yield* Queue.offer(queue, 1)
	*
	*   // Create a cause and fail the queue
	*   const cause = Cause.fail("Queue processing failed")
	*   const failed = yield* Queue.failCause(queue, cause)
	*   console.log(failed) // true
	*
	*   // The queue is now in failed state with the specified cause
	* })
	* ```
	*
	* @category completion
	* @since 4.0.0
	*/
	const failCause = (self, cause) => done(self, exitFailCause(cause));
	/**
	* Signal that the queue is complete. If the queue is already done, `false` is
	* returned.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number, Queue.Done>(10)
	*
	*   // Add some messages
	*   yield* Queue.offer(queue, 1)
	*   yield* Queue.offer(queue, 2)
	*
	*   // Signal completion - no more messages will be accepted
	*   const ended = yield* Queue.end(queue)
	*   console.log(ended) // true
	*
	*   // Trying to offer more messages will return false
	*   const offerResult = yield* Queue.offer(queue, 3)
	*   console.log(offerResult) // false
	*
	*   // But we can still take existing messages
	*   const message = yield* Queue.take(queue)
	*   console.log(message) // 1
	* })
	* ```
	*
	* @category completion
	* @since 4.0.0
	*/
	const end = (self) => done(self, exitVoid);
	/**
	* Signal that the queue is done with a specific exit value. If the queue is already done, `false` is
	* returned.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number, Queue.Done>(10)
	*
	*   // Add some messages
	*   yield* Queue.offer(queue, 1)
	*   yield* Queue.offer(queue, 2)
	*
	*   // Create a success exit and mark queue as done
	*   const successExit = Exit.succeed(undefined)
	*   const isDone = yield* Queue.done(queue, successExit)
	*   console.log(isDone) // true
	*
	*   // Or create a failure exit
	*   const failureExit = Exit.fail("Processing error")
	*   const queue2 = yield* Queue.bounded<number, string>(10)
	*   const isDone2 = yield* Queue.done(queue2, failureExit)
	*   console.log(isDone2) // true
	* })
	* ```
	*
	* @category completion
	* @since 4.0.0
	*/
	const done = (self, exit$2) => sync$1(() => doneUnsafe(self, exit$2));
	/**
	* Signal that the queue is done synchronously with a specific exit value. If the queue is already done, `false` is
	* returned.
	*
	* This is an unsafe operation that directly modifies the queue without Effect wrapping.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Queue } from "effect"
	*
	* // Create a queue and use unsafe operations
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number, Queue.Done>(10)
	*
	*   // Add some messages
	*   Queue.offerUnsafe(queue, 1)
	*   Queue.offerUnsafe(queue, 2)
	*
	*   // Mark as done with success exit
	*   const successExit = Exit.succeed(undefined)
	*   const isDone = Queue.doneUnsafe(queue, successExit)
	*   console.log(isDone) // true
	*   console.log(queue.state._tag) // "Done"
	* })
	* ```
	*
	* @category completion
	* @since 4.0.0
	*/
	const doneUnsafe = (self, exit$2) => {
		if (self.state._tag !== "Open") return false;
		const fail$7 = exitZipRight(exit$2, exitFailDone);
		if (self.state.offers.size === 0 && self.messages.length === 0) {
			finalize(self, fail$7);
			return true;
		}
		self.state = {
			...self.state,
			_tag: "Closing",
			exit: fail$7
		};
		return true;
	};
	/**
	* Shutdown the queue, canceling any pending operations.
	* If the queue is already done, `false` is returned.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number>(2)
	*
	*   // Add messages
	*   yield* Queue.offer(queue, 1)
	*   yield* Queue.offer(queue, 2)
	*
	*   // Try to add more than capacity (will be pending)
	*   const pendingOffer = Queue.offer(queue, 3)
	*
	*   // Shutdown cancels pending operations and clears the queue
	*   const wasShutdown = yield* Queue.shutdown(queue)
	*   console.log(wasShutdown) // true
	*
	*   // Queue is now done and cleared
	*   const size = yield* Queue.size(queue)
	*   console.log(size) // 0
	* })
	* ```
	*
	* @category completion
	* @since 4.0.0
	*/
	const shutdown = (self) => sync$1(() => {
		if (self.state._tag === "Done") return true;
		clear(self.messages);
		const offers = self.state.offers;
		finalize(self, self.state._tag === "Open" ? exitInterrupt : self.state.exit);
		if (offers.size > 0) {
			for (const entry of offers) if (entry._tag === "Single") entry.resume(exitFalse);
			else entry.resume(exitSucceed(entry.remaining.slice(entry.offset)));
			offers.clear();
		}
		return true;
	});
	/**
	* @category Done
	* @since 4.0.0
	*/
	const Done = /* @__PURE__ */ new Halt(void 0);
	/**
	* @since 4.0.0
	* @category Done
	*/
	const isDone = isHalt;
	/**
	* Take all messages from the queue, or wait for messages to be available.
	*
	* If the queue is done, the `done` flag will be `true`. If the queue
	* fails, the Effect will fail with the error.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number, Queue.Done>(5)
	*
	*   // Add several messages
	*   yield* Queue.offerAll(queue, [1, 2, 3, 4, 5])
	*
	*   // Take all available messages
	*   const messages1 = yield* Queue.takeAll(queue)
	*   console.log(messages1) // [1, 2, 3, 4, 5]
	*
	*   // Add more messages and end the queue
	*   yield* Queue.offerAll(queue, [10, 20])
	*   yield* Queue.end(queue)
	*
	*   // Take remaining messages, done flag indicates completion
	*   const messages2 = yield* Queue.takeAll(queue)
	*   console.log(messages2) // [10, 20]
	*
	*   const done = yield* Effect.flip(Queue.takeAll(queue))
	*   console.log(done) // Queue.Done
	* })
	* ```
	*
	* @category taking
	* @since 4.0.0
	*/
	const takeAll = (self) => takeBetween(self, 1, Number.POSITIVE_INFINITY);
	/**
	* Take a variable number of messages from the queue, between specified min and max.
	* It will only take up to the capacity of the queue.
	*
	* If the queue is done, the `done` flag will be `true`. If the queue
	* fails, the Effect will fail with the error.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number>(10)
	*
	*   // Add several messages
	*   yield* Queue.offerAll(queue, [1, 2, 3, 4, 5, 6, 7, 8])
	*
	*   // Take between 2 and 5 messages
	*   const batch1 = yield* Queue.takeBetween(queue, 2, 5)
	*   console.log(batch1) // [1, 2, 3, 4, 5] - took 5 (up to max)
	*
	*   // Take between 1 and 10 messages (but only 3 remain)
	*   const batch2 = yield* Queue.takeBetween(queue, 1, 10)
	*   console.log(batch2) // [6, 7, 8] - took 3 (all remaining)
	*
	*   // No more messages available, will wait or return done
	*   // const batch3 = yield* Queue.takeBetween(queue, 1, 3)
	* })
	* ```
	*
	* @category taking
	* @since 4.0.0
	*/
	const takeBetween = (self, min, max) => suspend$3(() => takeBetweenUnsafe(self, min, max) ?? andThen$1(awaitTake(self), takeBetween(self, 1, max)));
	/**
	* Take a single message from the queue, or wait for a message to be
	* available.
	*
	* If the queue is done, it will fail with `Done`. If the
	* queue fails, the Effect will fail with the error.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<string, Queue.Done>(3)
	*
	*   // Add some messages
	*   yield* Queue.offer(queue, "first")
	*   yield* Queue.offer(queue, "second")
	*
	*   // Take messages one by one
	*   const msg1 = yield* Queue.take(queue)
	*   const msg2 = yield* Queue.take(queue)
	*   console.log(msg1, msg2) // "first", "second"
	*
	*   // End the queue
	*   yield* Queue.end(queue)
	*
	*   // Taking from ended queue fails with None
	*   const result = yield* Effect.match(Queue.take(queue), {
	*     onFailure: (error: Queue.Done) => true,
	*     onSuccess: (value: string) => false
	*   })
	*   console.log("Queue ended:", result) // true
	* })
	* ```
	*
	* @category taking
	* @since 4.0.0
	*/
	const take = (self) => suspend$3(() => takeUnsafe(self) ?? andThen$1(awaitTake(self), take(self)));
	/**
	* Take a single message from the queue synchronously, or wait for a message to be
	* available.
	*
	* If the queue is done, it will fail with `Done`. If the
	* queue fails, the Effect will fail with the error.
	* Returns `undefined` if no message is immediately available.
	*
	* This is an unsafe operation that directly accesses the queue without Effect wrapping.
	*
	* @example
	* ```ts
	* import { Effect, Exit } from "effect"
	* import { Queue } from "effect"
	*
	* // Create a queue and use unsafe operations
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number>(10)
	*
	*   // Add some messages
	*   Queue.offerUnsafe(queue, 1)
	*   Queue.offerUnsafe(queue, 2)
	*
	*   // Take a message synchronously
	*   const result1 = Queue.takeUnsafe(queue)
	*   console.log(result1) // Success(1) or Exit containing value 1
	*
	*   const result2 = Queue.takeUnsafe(queue)
	*   console.log(result2) // Success(2)
	*
	*   // No more messages - returns undefined
	*   const result3 = Queue.takeUnsafe(queue)
	*   console.log(result3) // undefined
	* })
	* ```
	*
	* @category taking
	* @since 4.0.0
	*/
	const takeUnsafe = (self) => {
		if (self.state._tag === "Done") return self.state.exit;
		if (self.messages.length > 0) {
			const message = take$1(self.messages);
			releaseCapacity(self);
			return exitSucceed(message);
		} else if (self.capacity <= 0 && self.state.offers.size > 0) {
			self.capacity = 1;
			releaseCapacity(self);
			self.capacity = 0;
			const message = take$1(self.messages);
			releaseCapacity(self);
			return exitSucceed(message);
		}
	};
	/**
	* Check the size of the queue synchronously.
	*
	* If the queue is complete, it will return `None`.
	* This is an unsafe operation that directly accesses the queue without Effect wrapping.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	* import * as Option from "effect/data/Option"
	*
	* // Create a queue and use unsafe operations
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number, Queue.Done>(10)
	*
	*   // Check size of empty queue
	*   const size1 = Queue.sizeUnsafe(queue)
	*   console.log(size1) // 0
	*
	*   // Add some messages
	*   Queue.offerUnsafe(queue, 1)
	*   Queue.offerUnsafe(queue, 2)
	*   Queue.offerUnsafe(queue, 3)
	*
	*   // Check size after adding messages
	*   const size2 = Queue.sizeUnsafe(queue)
	*   console.log(size2) // 3
	*
	*   // End the queue
	*   Queue.endUnsafe(queue)
	*
	*   // Size of ended queue is 0
	*   const size3 = Queue.sizeUnsafe(queue)
	*   console.log(size3) // 0
	* })
	* ```
	*
	* @category size
	* @since 4.0.0
	*/
	const sizeUnsafe = (self) => self.state._tag === "Done" ? 0 : self.messages.length;
	/**
	* Run an `Effect` into a `Queue`, where success ends the queue and failure
	* fails the queue.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function*() {
	*   const queue = yield* Queue.bounded<number, Queue.Done>(10)
	*
	*   // Create an effect that succeeds
	*   const dataProcessing = Effect.gen(function*() {
	*     yield* Effect.sleep("100 millis")
	*     return "Processing completed successfully"
	*   })
	*
	*   // Pipe the effect into the queue
	*   // If dataProcessing succeeds, queue ends successfully
	*   // If dataProcessing fails, queue fails with the error
	*   const effectIntoQueue = Queue.into(queue)(dataProcessing)
	*
	*   const wasCompleted = yield* effectIntoQueue
	*   console.log("Queue operation completed:", wasCompleted) // true
	*
	*   // Queue state now reflects the effect's outcome
	*   console.log("Queue state:", queue.state._tag) // "Done"
	* })
	* ```
	*
	* @since 3.8.0
	* @category combinators
	*/
	const into = /* @__PURE__ */ dual(2, (effect, self) => uninterruptibleMask$1((restore) => matchCauseEffect$1(restore(effect), {
		onFailure: (cause) => failCause(self, cause),
		onSuccess: (_) => end(self)
	})));
	/**
	* Creates a Pull from a queue that takes individual values.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const queue = yield* Queue.bounded<number, string>(10)
	*   const pull = Queue.toPull(queue)
	*
	*   // The pull will take values from the queue
	*   // and halt when the queue is closed
	* })
	* ```
	*
	* @since 4.0.0
	* @category Queue
	*/
	const toPull = take;
	/**
	* Creates a Pull from a queue that takes all available values as an array.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const program = Effect.gen(function* () {
	*   const queue = yield* Queue.bounded<number, string>(10)
	*   const pull = Queue.toPullArray(queue)
	*
	*   // The pull will take all available values from the queue
	*   // as a non-empty array, or halt if no values are available
	* })
	* ```
	*
	* @since 4.0.0
	* @category Queue
	*/
	const toPullArray = takeAll;
	const exitFalse = /* @__PURE__ */ exitSucceed(false);
	const exitTrue = /* @__PURE__ */ exitSucceed(true);
	const exitFailDone = /* @__PURE__ */ exitFail(Done);
	const exitInterrupt = /* @__PURE__ */ exitInterrupt$1();
	const releaseTaker = (self) => {
		self.scheduleRunning = false;
		if (self.state._tag === "Done" || self.state.takers.size === 0) return;
		const taker = headUnsafe(self.state.takers);
		self.state.takers.delete(taker);
		taker(exitVoid);
	};
	const scheduleReleaseTaker = (self) => {
		if (self.scheduleRunning || self.state._tag === "Done" || self.state.takers.size === 0) return;
		self.scheduleRunning = true;
		self.scheduler.scheduleTask(() => releaseTaker(self), 0);
	};
	const takeBetweenUnsafe = (self, min, max) => {
		if (self.state._tag === "Done") return self.state.exit;
		else if (max <= 0 || min <= 0) return exitSucceed([]);
		else if (self.capacity <= 0 && self.state.offers.size > 0) {
			self.capacity = 1;
			releaseCapacity(self);
			self.capacity = 0;
			const messages = [take$1(self.messages)];
			releaseCapacity(self);
			return exitSucceed(messages);
		}
		min = Math.min(min, self.capacity || 1);
		if (min <= self.messages.length) {
			const messages = takeN(self.messages, max);
			releaseCapacity(self);
			return exitSucceed(messages);
		}
	};
	const offerRemainingSingle = (self, message) => {
		return callback$2((resume) => {
			if (self.state._tag !== "Open") return resume(exitFalse);
			const entry = {
				_tag: "Single",
				message,
				resume
			};
			self.state.offers.add(entry);
			return sync$1(() => {
				if (self.state._tag === "Open") self.state.offers.delete(entry);
			});
		});
	};
	const releaseCapacity = (self) => {
		if (self.state._tag === "Done") return isHaltCause(self.state.exit.cause);
		else if (self.state.offers.size === 0) {
			if (self.state._tag === "Closing" && self.messages.length === 0) {
				finalize(self, self.state.exit);
				return isHaltCause(self.state.exit.cause);
			}
			return false;
		}
		let n = self.capacity - self.messages.length;
		for (const entry of self.state.offers) if (n === 0) break;
		else if (entry._tag === "Single") {
			append(self.messages, entry.message);
			n--;
			entry.resume(exitTrue);
			self.state.offers.delete(entry);
		} else {
			for (; entry.offset < entry.remaining.length; entry.offset++) {
				if (n === 0) return false;
				append(self.messages, entry.remaining[entry.offset]);
				n--;
			}
			entry.resume(exitSucceed([]));
			self.state.offers.delete(entry);
		}
		return false;
	};
	const awaitTake = (self) => callback$2((resume) => {
		if (self.state._tag === "Done") return resume(self.state.exit);
		self.state.takers.add(resume);
		return sync$1(() => {
			if (self.state._tag !== "Done") self.state.takers.delete(resume);
		});
	});
	const finalize = (self, exit$2) => {
		if (self.state._tag === "Done") return;
		const openState = self.state;
		self.state = {
			_tag: "Done",
			exit: exit$2
		};
		for (const taker of openState.takers) taker(exit$2);
		openState.takers.clear();
		for (const awaiter of openState.awaiters) awaiter(exit$2);
		openState.awaiters.clear();
	};

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/stream/Channel.js
	const TypeId$1 = "~effect/Channel";
	/**
	* Tests if a value is a `Channel`.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	*
	* const channel = Channel.succeed(42)
	* console.log(Channel.isChannel(channel)) // true
	* console.log(Channel.isChannel("not a channel")) // false
	* ```
	*
	* @category guards
	* @since 3.5.4
	*/
	const isChannel = (u) => hasProperty(u, TypeId$1);
	const ChannelProto = {
		[TypeId$1]: {
			_Env: identity,
			_InErr: identity,
			_InElem: identity,
			_OutErr: identity,
			_OutElem: identity
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	/**
	* Creates a `Channel` from a transformation function that operates on upstream pulls.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const channel = Channel.fromTransform((upstream, scope) =>
	*   Effect.succeed(upstream)
	* )
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const fromTransform = (transform) => {
		const self = Object.create(ChannelProto);
		self.transform = transform;
		return self;
	};
	/**
	* Transforms a Channel by applying a function to its Pull implementation.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	* import { Effect } from "effect"
	*
	* // Transform a channel by modifying its pull behavior
	* const originalChannel = Channel.fromIterable([1, 2, 3])
	*
	* const transformedChannel = Channel.transformPull(originalChannel, (pull, scope) =>
	*   Effect.succeed(
	*     Effect.map(pull, (value) => value * 2)
	*   )
	* )
	* // Outputs: 2, 4, 6
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const transformPull$1 = (self, f) => fromTransform((upstream, scope$2) => flatMap$2(toTransform(self)(upstream, scope$2), (pull) => f(pull, scope$2)));
	/**
	* Creates a `Channel` from an `Effect` that produces a `Pull`.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const channel = Channel.fromPull(
	*   Effect.succeed(Effect.succeed(42))
	* )
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const fromPull = (effect) => fromTransform((_, __) => effect);
	/**
	* Creates a `Channel` from a transformation function that operates on upstream
	* pulls, but also provides a forked scope that closes when the resulting
	* Channel completes.
	*
	* @since 4.0.0
	* @category constructors
	*/
	const fromTransformBracket = (f) => fromTransform(fnUntraced(function* (upstream, scope$2) {
		const closableScope = forkUnsafe(scope$2);
		const onCause = (cause) => close(closableScope, haltExitFromCause(cause));
		const pull = yield* onError(f(upstream, scope$2, closableScope), onCause);
		return onError(pull, onCause);
	}));
	/**
	* Converts a `Channel` back to its underlying transformation function.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	*
	* const channel = Channel.succeed(42)
	* const transform = Channel.toTransform(channel)
	* // transform can now be used directly
	* ```
	*
	* @category destructors
	* @since 4.0.0
	*/
	const toTransform = (channel) => channel.transform;
	/**
	* The default chunk size used by channels for batching operations.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	*
	* console.log(Channel.DefaultChunkSize) // 4096
	* ```
	*
	* @category constants
	* @since 2.0.0
	*/
	const DefaultChunkSize$1 = 4096;
	const asyncQueue = (scope$2, f, options) => make({
		capacity: options?.bufferSize,
		strategy: options?.strategy
	}).pipe(tap$2((queue) => addFinalizer$1(scope$2, shutdown(queue))), tap$2((queue) => {
		const result$2 = f(queue);
		if (isEffect(result$2)) return forkIn(provide$2(result$2, scope$2), scope$2);
	}));
	/**
	* Creates a `Channel` that interacts with a callback function using a queue, emitting arrays.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	* import { Effect, Queue } from "effect"
	*
	* const channel = Channel.callbackArray<number>(Effect.fn(function*(queue) {
	*   yield* Queue.offer(queue, 1)
	*   yield* Queue.offer(queue, 2)
	* }))
	* // Emits arrays of numbers instead of individual numbers
	* ```
	*
	* @category constructors
	* @since 4.0.0
	*/
	const callbackArray = (f, options) => fromTransform((_, scope$2) => map$1(asyncQueue(scope$2, f, options), toPullArray));
	/**
	* Creates a `Channel` that lazily evaluates to another channel.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	*
	* const channel = Channel.suspend(() => Channel.succeed(42))
	* // The inner channel is not created until the suspended channel is run
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const suspend$1 = (evaluate$1) => fromTransform((upstream, scope$2) => suspend$2(() => toTransform(evaluate$1())(upstream, scope$2)));
	/**
	* Creates a `Channel` that emits a single value and then ends.
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	*
	* const channel = Channel.succeed(42)
	* // Emits: 42
	* ```
	*
	* @category constructors
	* @since 2.0.0
	*/
	const succeed$1 = (value) => fromEffect(succeed$2(value));
	/**
	* Represents an Channel that emits no elements
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	*
	* // Create an empty channel
	* const emptyChannel = Channel.empty
	*
	* // Use empty channel in composition
	* const combined = Channel.concatWith(emptyChannel, () => Channel.succeed(42))
	* // Will immediately provide the second channel's output
	*
	* // Empty channel can be used as a no-op in conditional logic
	* const conditionalChannel = (shouldEmit: boolean) =>
	*   shouldEmit ? Channel.succeed("data") : Channel.empty
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const empty$1 = /* @__PURE__ */ fromPull(/* @__PURE__ */ succeed$2(haltVoid));
	/**
	* Represents an Channel that never completes
	*
	* @example
	* ```ts
	* import { Channel } from "effect/stream"
	* import { Effect } from "effect"
	*
	* // Create a channel that never completes
	* const neverChannel = Channel.never
	*
	* // Use in conditional logic
	* const withFallback = Channel.concatWith(
	*   neverChannel,
	*   () => Channel.succeed("fallback")
	* )
	*
	* // Never channel is useful for testing or as a placeholder
	* const conditionalChannel = (shouldComplete: boolean) =>
	*   shouldComplete ? Channel.succeed("done") : Channel.never
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const never$1 = /* @__PURE__ */ fromPull(/* @__PURE__ */ succeed$2(never$2));
	/**
	* Use an effect to write a single value to the channel.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Data } from "effect/data"
	*
	* class DatabaseError extends Data.TaggedError("DatabaseError")<{
	*   readonly message: string
	* }> {}
	*
	* // Create a channel from a successful effect
	* const successChannel = Channel.fromEffect(
	*   Effect.succeed("Hello from effect!")
	* )
	*
	* // Create a channel from an effect that might fail
	* const fetchUserChannel = Channel.fromEffect(
	*   Effect.tryPromise({
	*     try: () => fetch("/api/user").then(res => res.json()),
	*     catch: (error) => new DatabaseError({ message: String(error) })
	*   })
	* )
	*
	* // Channel from effect with async computation
	* const asyncChannel = Channel.fromEffect(
	*   Effect.gen(function* () {
	*     yield* Effect.sleep("100 millis")
	*     return "Async result"
	*   })
	* )
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const fromEffect = (effect) => fromPull(sync(() => {
		let done$2 = false;
		return suspend$2(() => {
			if (done$2) return haltVoid;
			done$2 = true;
			return effect;
		});
	}));
	/**
	* Maps the output of this channel using the specified function.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Data } from "effect/data"
	*
	* class TransformError extends Data.TaggedError("TransformError")<{
	*   readonly reason: string
	* }> {}
	*
	* // Basic mapping of channel values
	* const numbersChannel = Channel.fromIterable([1, 2, 3, 4, 5])
	* const doubledChannel = Channel.map(numbersChannel, (n) => n * 2)
	* // Outputs: 2, 4, 6, 8, 10
	*
	* // Transform string data
	* const wordsChannel = Channel.fromIterable(["hello", "world", "effect"])
	* const upperCaseChannel = Channel.map(wordsChannel, (word) => word.toUpperCase())
	* // Outputs: "HELLO", "WORLD", "EFFECT"
	*
	* // Complex object transformation
	* type User = { id: number; name: string }
	* type UserDisplay = { displayName: string; isActive: boolean }
	*
	* const usersChannel = Channel.fromIterable([
	*   { id: 1, name: "Alice" },
	*   { id: 2, name: "Bob" }
	* ])
	* const displayChannel = Channel.map(usersChannel, (user): UserDisplay => ({
	*   displayName: `User: ${user.name}`,
	*   isActive: true
	* }))
	* ```
	*
	* @since 2.0.0
	* @category Sequencing
	*/
	const map = /* @__PURE__ */ dual(2, (self, f) => transformPull$1(self, (pull) => sync(() => {
		let i = 0;
		return map$1(pull, (o) => f(o, i++));
	})));
	const concurrencyIsSequential = (concurrency) => concurrency === void 0 || concurrency !== "unbounded" && concurrency <= 1;
	/**
	* Returns a new channel, which sequentially combines this channel, together
	* with the provided factory function, which creates a second channel based on
	* the output values of this channel. The result is a channel that will first
	* perform the functions of this channel, before performing the functions of
	* the created channel (including yielding its terminal value).
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Data } from "effect/data"
	*
	* class NetworkError extends Data.TaggedError("NetworkError")<{
	*   readonly url: string
	* }> {}
	*
	* // Transform values using effectful operations
	* const urlsChannel = Channel.fromIterable([
	*   "/api/users/1",
	*   "/api/users/2",
	*   "/api/users/3"
	* ])
	*
	* const fetchDataChannel = Channel.mapEffect(
	*   urlsChannel,
	*   (url) => Effect.tryPromise({
	*     try: () => fetch(url).then(res => res.json()),
	*     catch: () => new NetworkError({ url })
	*   })
	* )
	*
	* // Concurrent processing with options
	* const numbersChannel = Channel.fromIterable([1, 2, 3, 4, 5])
	* const processedChannel = Channel.mapEffect(
	*   numbersChannel,
	*   (n) => Effect.gen(function* () {
	*     yield* Effect.sleep("100 millis") // Simulate async work
	*     return n * n
	*   }),
	*   { concurrency: 3, unordered: true }
	* )
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const mapEffect = /* @__PURE__ */ dual((args$1) => isChannel(args$1[0]), (self, f, options) => concurrencyIsSequential(options?.concurrency) ? mapEffectSequential(self, f) : mapEffectConcurrent(self, f, options));
	const mapEffectSequential = (self, f) => fromTransform((upstream, scope$2) => {
		let i = 0;
		return map$1(toTransform(self)(upstream, scope$2), flatMap$2((o) => f(o, i++)));
	});
	const mapEffectConcurrent = (self, f, options) => fromTransformBracket(fnUntraced(function* (upstream, scope$2, forkedScope) {
		let i = 0;
		const pull = yield* toTransform(self)(upstream, scope$2);
		const concurrencyN = options.concurrency === "unbounded" ? Number.MAX_SAFE_INTEGER : options.concurrency;
		const queue = yield* bounded(0);
		yield* addFinalizer$1(forkedScope, shutdown(queue));
		const runFork$2 = runForkWith(yield* services());
		const trackFiber = runIn(forkedScope);
		if (options.unordered) {
			const semaphore = makeSemaphoreUnsafe(concurrencyN);
			const release = constant(semaphore.release(1));
			const handle = matchCauseEffect({
				onFailure: (cause) => flatMap$2(failCause(queue, cause), release),
				onSuccess: (value) => flatMap$2(offer(queue, value), release)
			});
			yield* semaphore.take(1).pipe(flatMap$2(() => pull), flatMap$2((value) => {
				trackFiber(runFork$2(handle(f(value, i++))));
				return void_;
			}), forever({ autoYield: false }), catchCause((cause) => semaphore.withPermits(concurrencyN - 1)(failCause(queue, cause))), forkIn(forkedScope));
		} else {
			const effects = yield* bounded(concurrencyN - 2);
			yield* addFinalizer$1(forkedScope, shutdown(queue));
			yield* take(effects).pipe(flatten$1, flatMap$2((value) => offer(queue, value)), forever({ autoYield: false }), into(queue), forkIn(forkedScope));
			let errorCause;
			const onExit$2 = (exit$2) => {
				if (exit$2._tag === "Success") return;
				errorCause = exit$2.cause;
				doneUnsafe(queue, failCause$2(exit$2.cause));
			};
			yield* pull.pipe(flatMap$2((value) => {
				if (errorCause) return failCause$1(errorCause);
				const fiber = runFork$2(f(value, i++));
				trackFiber(fiber);
				fiber.addObserver(onExit$2);
				return offer(effects, join(fiber));
			}), forever({ autoYield: false }), catchCause((cause) => offer(effects, failCause$2(cause)).pipe(andThen(end(effects)))), forkIn(forkedScope));
		}
		return toPull(queue);
	}));
	/**
	* Applies a side effect function to each output element of the channel,
	* returning a new channel that emits the same elements.
	*
	* The `tap` function allows you to perform side effects (like logging or
	* debugging) on each element emitted by a channel without modifying the
	* elements themselves.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Console } from "effect"
	* import { Data } from "effect/data"
	*
	* class LogError extends Data.TaggedError("LogError")<{
	*   readonly message: string
	* }> {}
	*
	* // Create a channel that outputs numbers
	* const numberChannel = Channel.fromIterable([1, 2, 3])
	*
	* // Tap into each output element to perform side effects
	* const tappedChannel = Channel.tap(numberChannel, (n) =>
	*   Console.log(`Processing number: ${n}`)
	* )
	*
	* // The channel still outputs the same elements but logs each one
	* // Outputs: 1, 2, 3 (while logging each)
	* ```
	*
	* @since 4.0.0
	* @category sequencing
	*/
	const tap$1 = /* @__PURE__ */ dual((args$1) => isChannel(args$1[0]), (self, f, options) => mapEffect(self, (a) => as(f(a), a), options));
	/**
	* Returns a new channel, which sequentially combines this channel, together
	* with the provided factory function, which creates a second channel based on
	* the output values of this channel. The result is a channel that will first
	* perform the functions of this channel, before performing the functions of
	* the created channel (including yielding its terminal value).
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Data } from "effect/data"
	*
	* class ProcessError extends Data.TaggedError("ProcessError")<{
	*   readonly cause: string
	* }> {}
	*
	* // Create a channel that outputs numbers
	* const numberChannel = Channel.fromIterable([1, 2, 3])
	*
	* // FlatMap each number to create new channels
	* const flatMappedChannel = Channel.flatMap(numberChannel, (n) =>
	*   Channel.fromIterable(Array.from({ length: n }, (_, i) => `item-${n}-${i}`))
	* )
	*
	* // Flattens nested channels into a single stream
	* // Outputs: "item-1-0", "item-2-0", "item-2-1", "item-3-0", "item-3-1", "item-3-2"
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const flatMap$1 = /* @__PURE__ */ dual((args$1) => isChannel(args$1[0]), (self, f, options) => concurrencyIsSequential(options?.concurrency) ? flatMapSequential(self, f) : flatMapConcurrent(self, f, options));
	const flatMapSequential = (self, f) => fromTransform((upstream, scope$2) => map$1(toTransform(self)(upstream, scope$2), (pull) => {
		let childPull;
		let childScope;
		const makePull = flatMap$2(pull, (value) => {
			childScope ??= forkUnsafe(scope$2);
			return flatMapEager(toTransform(f(value))(upstream, childScope), (pull$1) => {
				childPull = catchHalt$1(pull$1);
				return childPull;
			});
		});
		const catchHalt$1 = catchHalt((_) => {
			childPull = void 0;
			if (childScope.state._tag === "Open" && childScope.state.finalizers.size === 1) return makePull;
			const close$1 = close(childScope, void_$1);
			childScope = void 0;
			return flatMap$2(close$1, () => makePull);
		});
		return suspend$2(() => childPull ?? makePull);
	}));
	const flatMapConcurrent = (self, f, options) => self.pipe(map(f), mergeAll(options));
	/**
	* Flattens a channel that outputs arrays into a channel that outputs individual elements.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Data } from "effect/data"
	*
	* class FlattenError extends Data.TaggedError("FlattenError")<{
	*   readonly message: string
	* }> {}
	*
	* // Create a channel that outputs arrays
	* const arrayChannel = Channel.fromIterable([
	*   [1, 2, 3],
	*   [4, 5],
	*   [6, 7, 8, 9]
	* ])
	*
	* // Flatten the arrays into individual elements
	* const flattenedChannel = Channel.flattenArray(arrayChannel)
	*
	* // Outputs: 1, 2, 3, 4, 5, 6, 7, 8, 9
	* ```
	*
	* @since 4.0.0
	* @category utils
	*/
	const flattenArray = (self) => transformPull$1(self, (pull) => {
		let array$3;
		let index = 0;
		const pump = suspend$2(function loop() {
			if (array$3 === void 0) return flatMap$2(pull, (array_) => {
				switch (array_.length) {
					case 0: return loop();
					case 1: return succeed$2(array_[0]);
					default:
						array$3 = array_;
						return succeed$2(array_[index++]);
				}
			});
			const next = array$3[index++];
			if (index >= array$3.length) {
				array$3 = void 0;
				index = 0;
			}
			return succeed$2(next);
		});
		return succeed$2(pump);
	});
	/**
	* Merges multiple channels with specified concurrency and buffering options.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Data } from "effect/data"
	*
	* class MergeAllError extends Data.TaggedError("MergeAllError")<{
	*   readonly reason: string
	* }> {}
	*
	* // Create channels that output other channels
	* const nestedChannels = Channel.fromIterable([
	*   Channel.fromIterable([1, 2]),
	*   Channel.fromIterable([3, 4]),
	*   Channel.fromIterable([5, 6])
	* ])
	*
	* // Merge all channels with bounded concurrency
	* const mergedChannel = Channel.mergeAll({
	*   concurrency: 2,
	*   bufferSize: 16
	* })(nestedChannels)
	*
	* // Outputs: 1, 2, 3, 4, 5, 6 (order may vary due to concurrency)
	* ```
	*
	* @since 2.0.0
	* @category utils
	*/
	const mergeAll = /* @__PURE__ */ dual(2, (channels, { bufferSize = 16, concurrency, switch: switch_ = false }) => fromTransformBracket(fnUntraced(function* (upstream, scope$2, forkedScope) {
		const concurrencyN = concurrency === "unbounded" ? Number.MAX_SAFE_INTEGER : Math.max(1, concurrency);
		const semaphore = switch_ ? void 0 : makeSemaphoreUnsafe(concurrencyN);
		const doneLatch = yield* makeLatch(true);
		const fibers = /* @__PURE__ */ new Set();
		const queue = yield* bounded(bufferSize);
		yield* addFinalizer$1(forkedScope, shutdown(queue));
		const pull = yield* toTransform(channels)(upstream, scope$2);
		yield* gen(function* () {
			while (true) {
				if (semaphore) yield* semaphore.take(1);
				const channel = yield* pull;
				const childScope = forkUnsafe(forkedScope);
				const childPull = yield* toTransform(channel)(upstream, childScope);
				while (fibers.size >= concurrencyN) {
					const fiber$1 = headUnsafe(fibers);
					fibers.delete(fiber$1);
					if (fibers.size === 0) yield* doneLatch.open;
					yield* interrupt(fiber$1);
				}
				const fiber = yield* childPull.pipe(tap$2(() => yieldNow), flatMap$2((value) => offer(queue, value)), forever({ autoYield: false }), onError(fnUntraced(function* (cause) {
					const halt$1 = filterHalt(cause);
					yield* exit(close(childScope, !isFail(halt$1) ? succeed$3(halt$1.leftover) : failCause$2(halt$1.fail)));
					if (!fibers.has(fiber)) return;
					fibers.delete(fiber);
					if (semaphore) yield* semaphore.release(1);
					if (fibers.size === 0) yield* doneLatch.open;
					if (isPass(halt$1)) return;
					return yield* failCause(queue, cause);
				})), forkChild);
				doneLatch.closeUnsafe();
				fibers.add(fiber);
			}
		}).pipe(catchCause((cause) => doneLatch.whenOpen(failCause(queue, cause))), forkIn(forkedScope));
		return toPull(queue);
	})));
	const runWith = (self, f, onHalt) => suspend$2(() => {
		const scope$2 = makeUnsafe();
		const makePull = toTransform(self)(haltVoid, scope$2);
		return catchHalt(flatMap$2(makePull, f), onHalt ? onHalt : succeed$2).pipe(onExit((exit$2) => close(scope$2, exit$2)));
	});
	/**
	* Runs a channel and discards all output elements, returning only the final result.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Data } from "effect/data"
	*
	* class DrainError extends Data.TaggedError("DrainError")<{
	*   readonly stage: string
	* }> {}
	*
	* // Create a channel that outputs elements and completes with a result
	* const resultChannel = Channel.fromIterable([1, 2, 3])
	* const completedChannel = Channel.concatWith(resultChannel, () => Channel.succeed("completed"))
	*
	* // Drain all elements and get only the final result
	* const drainEffect = Channel.runDrain(completedChannel)
	*
	* // Effect.runSync(drainEffect) // Returns: "completed"
	* ```
	*
	* @since 2.0.0
	* @category execution
	*/
	const runDrain$1 = (self) => runWith(self, (pull) => forever(pull, { autoYield: false }));
	/**
	* Converts a channel to a Pull within an existing scope.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Channel } from "effect/stream"
	* import { Data } from "effect/data"
	* import { Scope } from "effect"
	*
	* class ScopedPullError extends Data.TaggedError("ScopedPullError")<{
	*   readonly reason: string
	* }> {}
	*
	* // Create a channel
	* const numbersChannel = Channel.fromIterable([1, 2, 3])
	*
	* // Convert to Pull with explicit scope
	* const scopedPullEffect = Effect.gen(function* () {
	*   const scope = yield* Scope.make()
	*   const pull = yield* Channel.toPullScoped(numbersChannel, scope)
	*   return pull
	* })
	* ```
	*
	* @since 4.0.0
	* @category Destructors
	*/
	const toPullScoped = (self, scope$2) => toTransform(self)(haltVoid, scope$2);

//#endregion
//#region node_modules/.pnpm/effect@https+++pkg.pr.new+Effect-TS+effect-smol+effect@3dd9d8e_cb2ba4d41cceede85082522dd4cfafd7/node_modules/effect/dist/stream/Stream.js
	const TypeId = "~effect/stream/Stream";
	const streamVariance = {
		_R: identity,
		_E: identity,
		_A: identity
	};
	/**
	* Checks if a value is a Stream.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	*
	* const stream = Stream.make(1, 2, 3)
	* const notStream = { data: [1, 2, 3] }
	*
	* console.log(Stream.isStream(stream))    // true
	* console.log(Stream.isStream(notStream)) // false
	* ```
	*
	* @since 2.0.0
	* @category guards
	*/
	const isStream = (u) => hasProperty(u, TypeId);
	const StreamProto = {
		[TypeId]: streamVariance,
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	/**
	* The default chunk size used by streams for batching operations.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	*
	* console.log(Stream.DefaultChunkSize) // 4096
	* ```
	*
	* @category constants
	* @since 2.0.0
	*/
	const DefaultChunkSize = DefaultChunkSize$1;
	/**
	* Creates a stream from a `Channel`.
	*
	* This function allows you to create a Stream by providing a Channel that
	* produces arrays of values. It's useful when you have low-level channel
	* operations that you want to expose as a higher-level Stream.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Channel } from "effect/stream"
	*
	* const myChannel = Channel.succeed([1, 2, 3] as const)
	* const stream = Stream.fromChannel(myChannel)
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const fromChannel = (channel) => {
		const self = Object.create(StreamProto);
		self.channel = channel;
		return self;
	};
	/**
	* Derive a Stream from a pull effect.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const originalStream = Stream.make(1, 2, 3)
	*
	* const transformedStream = Stream.transformPull(
	*   originalStream,
	*   (pull) => Effect.succeed(pull)
	* )
	*
	* Effect.runPromise(Stream.runCollect(transformedStream)).then(console.log)
	* ```
	*
	* @since 4.0.0
	* @category utils
	*/
	const transformPull = (self, f) => fromChannel(fromTransform((_, scope$2) => flatMap$2(toPullScoped(self.channel, scope$2), (pull) => f(pull, scope$2))));
	/**
	* Creates a stream from an external resource.
	*
	* You can use the `Queue` with the apis from the `Queue` module to emit
	* values to the stream or to signal the stream ending.
	*
	* By default it uses an "unbounded" buffer size.
	* You can customize the buffer size and strategy by passing an object as the
	* second argument with the `bufferSize` and `strategy` fields.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	* import { Queue } from "effect"
	*
	* const stream = Stream.callback<number>((queue) => {
	*   // Emit values to the stream
	*   Queue.offer(queue, 1)
	*   Queue.offer(queue, 2)
	*   Queue.offer(queue, 3)
	*   // Signal completion
	*   Queue.shutdown(queue)
	* })
	*
	* Effect.runPromise(Stream.runCollect(stream)).then(console.log)
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const callback = (f, options) => fromChannel(callbackArray(f, options));
	/**
	* Creates a `Stream` that emits no elements.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const emptyStream = Stream.empty
	*
	* // Running the empty stream produces an empty chunk
	* const program = emptyStream.pipe(Stream.runCollect)
	*
	* Effect.runPromise(program).then(console.log)
	* ```
	*
	* @since 4.0.0
	* @category constructors
	*/
	const empty = /* @__PURE__ */ fromChannel(empty$1);
	/**
	* Creates a single-valued pure stream.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* // A Stream with a single number
	* const stream = Stream.succeed(3)
	*
	* // Effect.runPromise(Stream.runCollect(stream)).then(console.log)
	* // [ 3 ]
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const succeed = (value) => fromChannel(succeed$1(of(value)));
	/**
	* Returns a lazily constructed stream.
	*
	* This function defers the creation of a Stream until it is actually consumed.
	* The provided function will be called each time the stream is run.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const lazyStream = Stream.suspend(() => {
	*   console.log("Creating stream...")
	*   return Stream.make(1, 2, 3)
	* })
	*
	* // "Creating stream..." will be printed when the stream is run
	* Effect.runPromise(Stream.runCollect(lazyStream))
	* ```
	*
	* @since 2.0.0
	* @category constructors
	*/
	const suspend = (stream) => fromChannel(suspend$1(() => stream().channel));
	/**
	* Creates a stream from an array.
	*
	* This function creates a Stream that emits all values from the provided array.
	* If the array is empty, it returns an empty Stream.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const numbers = [1, 2, 3, 4, 5]
	* const stream = Stream.fromArray(numbers)
	*
	* Effect.runPromise(Stream.runCollect(stream)).then(console.log)
	* ```
	*
	* @since 4.0.0
	* @category constructors
	*/
	const fromArray = (array$3) => isReadonlyArrayNonEmpty(array$3) ? fromChannel(succeed$1(array$3)) : empty;
	/**
	* Creates a `Stream` that runs forever but never emits an output.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* // A stream that never emits values or completes
	* const neverStream = Stream.never
	*
	* // This will run indefinitely (be careful in practice!)
	* // const program = neverStream.pipe(Stream.runCollect)
	* // Effect.runPromise(program) // Never resolves
	* ```
	*
	* @since 4.0.0
	* @category constructors
	*/
	const never = /* @__PURE__ */ fromChannel(never$1);
	/**
	* Adds an effect to consumption of every element of the stream.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Stream } from "effect/stream"
	* import { Console } from "effect"
	*
	* const stream = Stream.fromArray([1, 2, 3]).pipe(
	*   Stream.tap((n) => Console.log(`before mapping: ${n}`)),
	*   Stream.map((n) => n * 2),
	*   Stream.tap((n) => Console.log(`after mapping: ${n}`))
	* )
	*
	* // Effect.runPromise(Stream.runCollect(stream)).then(console.log)
	* // before mapping: 1
	* // after mapping: 2
	* // before mapping: 2
	* // after mapping: 4
	* // before mapping: 3
	* // after mapping: 6
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const tap = /* @__PURE__ */ dual((args$1) => isStream(args$1[0]), (self, f, options) => {
		const concurrency = options?.concurrency ?? 1;
		if (concurrency === 1 || concurrency === "unbounded") return self.channel.pipe(tap$1(forEach(f, {
			discard: true,
			concurrency
		}), options), fromChannel);
		return suspend(() => {
			const withPermit = makeSemaphoreUnsafe(concurrency).withPermit;
			return self.channel.pipe(tap$1(forEach((a) => withPermit(f(a)), {
				discard: true,
				concurrency
			}), options), fromChannel);
		});
	});
	/**
	* Returns a stream made of the concatenation in strict order of all the
	* streams produced by passing each element of this stream to `f0`
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const stream = Stream.make(1, 2, 3)
	*
	* const flatMapped = stream.pipe(
	*   Stream.flatMap(n => Stream.make(n, n * 2))
	* )
	*
	* const program = flatMapped.pipe(Stream.runCollect)
	*
	* Effect.runPromise(program).then(console.log)
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const flatMap = /* @__PURE__ */ dual((args$1) => isStream(args$1[0]), (self, f, options) => self.channel.pipe(flattenArray, flatMap$1((a) => f(a).channel, options), fromChannel));
	/**
	* Flattens a stream of streams into a single stream.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const streamOfStreams = Stream.make(
	*   Stream.make(1, 2),
	*   Stream.make(3, 4),
	*   Stream.make(5, 6)
	* )
	*
	* const flattened = Stream.flatten(streamOfStreams)
	*
	* Effect.runPromise(Stream.runCollect(flattened)).then(console.log)
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const flatten = /* @__PURE__ */ dual((args$1) => isStream(args$1[0]), (self, options) => flatMap(self, identity, options));
	/**
	* Concatenates two streams, emitting all elements from the first stream
	* followed by all elements from the second stream.
	*
	* @example
	* ```ts
	* import { Stream } from "effect/stream"
	* import { Effect } from "effect"
	*
	* const stream1 = Stream.make(1, 2, 3)
	* const stream2 = Stream.make(4, 5, 6)
	*
	* const concatenated = Stream.concat(stream1, stream2)
	*
	* Effect.runPromise(Stream.runCollect(concatenated)).then(console.log)
	* ```
	*
	* @since 2.0.0
	* @category sequencing
	*/
	const concat = /* @__PURE__ */ dual(2, (self, that) => flatten(fromArray([self, that])));
	/**
	* @since 2.0.0
	* @category Rate-limiting
	*/
	const debounce = /* @__PURE__ */ dual(2, (self, duration) => transformPull(self, fnUntraced(function* (pull, scope$2) {
		const clock = yield* Clock;
		const durationMs = toMillis(fromDurationInputUnsafe(duration));
		let lastArr;
		let cause;
		let emitAtMs = Infinity;
		const pullLatch = makeLatchUnsafe();
		const emitLatch = makeLatchUnsafe();
		const endLatch = makeLatchUnsafe();
		yield* pull.pipe(pullLatch.whenOpen, flatMap$2((arr) => {
			emitLatch.openUnsafe();
			lastArr = arr;
			emitAtMs = clock.currentTimeMillisUnsafe() + durationMs;
			return void_;
		}), forever({ autoYield: false }), onError((cause_) => {
			cause = cause_;
			emitAtMs = clock.currentTimeMillisUnsafe();
			emitLatch.openUnsafe();
			endLatch.openUnsafe();
			return void_;
		}), forkIn(scope$2));
		const sleepLoop = suspend$2(function loop() {
			const now = clock.currentTimeMillisUnsafe();
			const timeMs = emitAtMs < now ? durationMs : Math.min(durationMs, emitAtMs - now);
			return flatMap$2(raceFirst(sleep(timeMs), endLatch.await), () => {
				if (clock.currentTimeMillisUnsafe() < emitAtMs) return loop();
				else if (lastArr) {
					emitLatch.closeUnsafe();
					pullLatch.closeUnsafe();
					const eff = succeed$2(of(lastNonEmpty(lastArr)));
					lastArr = void 0;
					return eff;
				} else if (cause) return failCause$1(cause);
				return loop();
			});
		});
		return suspend$2(() => {
			if (cause) {
				if (lastArr) {
					const eff = succeed$2(of(lastNonEmpty(lastArr)));
					lastArr = void 0;
					return eff;
				}
				return failCause$1(cause);
			}
			pullLatch.openUnsafe();
			return emitLatch.whenOpen(sleepLoop);
		});
	})));
	/**
	* Runs the stream only for its effects. The emitted elements are discarded.
	*
	* @example
	* ```ts
	* import { Effect } from "effect"
	* import { Stream } from "effect/stream"
	* import { Console } from "effect"
	*
	* const stream = Stream.make(1, 2, 3).pipe(
	*   Stream.mapEffect((n) => Console.log(`Processing: ${n}`))
	* )
	*
	* Effect.runPromise(Stream.runDrain(stream))
	* // Processing: 1
	* // Processing: 2
	* // Processing: 3
	* ```
	*
	* @since 2.0.0
	* @category destructors
	*/
	const runDrain = (self) => runDrain$1(self.channel);

//#endregion
//#region src/github-fix/index.ts
	GM_addStyle(`
  .copilotPreview__container, .feed-right-column {
    display: none !important;
  }
`);
	succeed(void 0).pipe(concat(callback(fnUntraced(function* (queue) {
		const observer = new MutationObserver((records) => {
			offerAllUnsafe(queue, records);
		});
		observer.observe(document.body, {
			attributes: false,
			childList: true,
			subtree: true
		});
		yield* addFinalizer(() => sync(() => observer.disconnect()));
	}))), debounce(10), tap(() => sync(() => {
		const heading = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent?.includes("Agent sessions"));
		if (heading) {
			const cont = findParentWithClass(heading, "DashboardListView-module__List");
			if (cont) cont.remove();
		}
		const repoButton = document.querySelector(`button[data-testid="dynamic-side-panel-items-search-button"]`);
		if (repoButton) repoButton.click();
	})), runDrain, runFork);
	function findParentWithClass(element, className) {
		while (element) {
			if (element.className.includes(className)) return element;
			element = element.parentElement;
		}
		return null;
	}

//#endregion
})();