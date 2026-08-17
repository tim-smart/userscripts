// ==UserScript==
// @name         Github Fix
// @namespace    https://timsmart.co/
// @version      2025-10-30
// @description  Remove AI from github homepage
// @author       Tim Smart <hello@timsmart.co>
// @match        https://github.com
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Pipeable.js
	/**
	* The `Pipeable` module defines the shared interface and implementation helpers
	* for values that support Effect-style method chaining with `.pipe(...)`.
	*
	* A `Pipeable` value can pass itself through a sequence of unary functions from
	* left to right, so code can be written as `value.pipe(f, g, h)` instead of
	* deeply nesting calls. This is the method form used by many Effect data types
	* to compose transformations, validations, and effectful operations while
	* keeping the original value as the starting point of the pipeline.
	*
	* @since 2.0.0
	*/
	/**
	* Applies a `pipe` method's variadic arguments to an initial value from left
	* to right.
	*
	* **When to use**
	*
	* Use to implement a custom `.pipe(...)` method from JavaScript's `arguments`
	* object.
	*
	* **Details**
	*
	* This helper is intended for implementing `Pipeable.pipe` methods that
	* receive JavaScript's `arguments` object. With no functions it returns the
	* original value; otherwise it feeds each result into the next function.
	*
	* **Example** (Implementing a pipe method)
	*
	* ```ts import.meta.vitest
	* import { Pipeable } from "effect"
	*
	* class NumberBox {
	*   constructor(readonly value: number) {}
	*
	*   pipe(..._fns: ReadonlyArray<(value: number) => number>): number {
	*     return Pipeable.pipeArguments(this.value, arguments) as number
	*   }
	* }
	*
	* const result = new NumberBox(5).pipe(
	*   (n) => n + 2,
	*   (n) => n * 3
	* )
	* result // => 21
	* ```
	*
	* @category combinators
	* @since 2.0.0
	*/
	let pipeArguments = (self, args) => {
		switch (args.length) {
			case 0: return self;
			case 1: return args[0](self);
			case 2: return args[1](args[0](self));
			case 3: return args[2](args[1](args[0](self)));
			case 4: return args[3](args[2](args[1](args[0](self))));
			case 5: return args[4](args[3](args[2](args[1](args[0](self)))));
			case 6: return args[5](args[4](args[3](args[2](args[1](args[0](self))))));
			case 7: return args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))));
			case 8: return args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self))))))));
			case 9: return args[8](args[7](args[6](args[5](args[4](args[3](args[2](args[1](args[0](self)))))))));
			default: {
				let ret = self;
				for (let i = 0, len = args.length; i < len; i++) ret = args[i](ret);
				return ret;
			}
		}
	}, dual = function(arity, body) {
		if (typeof arity == "function") return function() {
			return arity(arguments) ? body.apply(this, arguments) : (self) => body(self, ...arguments);
		};
		switch (arity) {
			case 0:
			case 1: throw RangeError(`Invalid arity ${arity}`);
			case 2: return function(a, b) {
				return arguments.length >= 2 ? body(a, b) : function(self) {
					return body(self, a);
				};
			};
			case 3: return function(a, b, c) {
				return arguments.length >= 3 ? body(a, b, c) : function(self) {
					return body(self, a, b);
				};
			};
			default: return function() {
				if (arguments.length >= arity) return body.apply(this, arguments);
				let args = arguments;
				return function(self) {
					return body(self, ...args);
				};
			};
		}
	}, identity = (a) => a, constant = (value) => () => value, constTrue = /*#__PURE__*/ constant(!0), constUndefined = /*#__PURE__*/ constant(void 0), constVoid = constUndefined, getAllObjectKeys = (obj) => {
		let keys = new Set(Reflect.ownKeys(obj));
		if (obj.constructor === Object) return keys;
		obj instanceof Error && keys.delete("stack");
		let proto = Object.getPrototypeOf(obj), current = proto;
		for (; current !== null && current !== Object.prototype;) {
			let ownKeys = Reflect.ownKeys(current);
			for (let i = 0; i < ownKeys.length; i++) keys.add(ownKeys[i]);
			current = Object.getPrototypeOf(current);
		}
		return keys.has("constructor") && typeof obj.constructor == "function" && proto === obj.constructor.prototype && keys.delete("constructor"), keys;
	}, byReferenceInstances = /*#__PURE__*/ new WeakSet();
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Predicate.js
	/**
	* Defines runtime checks for values.
	*
	* A `Predicate<A>` returns `true` or `false` for an `A`. A
	* `Refinement<A, B>` is a predicate that also narrows the TypeScript type when
	* it succeeds. This module includes guards for common JavaScript values,
	* property and tag checks, tuple and struct checks, boolean combinators, and
	* helpers for composing predicates and refinements.
	*
	* @since 2.0.0
	*/
	/**
	* Checks whether a value is a `number`.
	*
	* **When to use**
	*
	* Use when you need a `Predicate` guard to narrow an `unknown` value to a
	* number.
	*
	* **Details**
	*
	* Uses `typeof input === "number"` and does not exclude `NaN` or `Infinity`.
	*
	* **Example** (Guarding numbers)
	*
	* ```ts import.meta.vitest
	* import { Predicate } from "effect"
	*
	* const data: unknown = 42
	*
	* if (Predicate.isNumber(data)) {
	*   data + 1 // => 43
	* }
	* ```
	*
	* @see {@link isBigInt}
	* @see {@link isString}
	* @category guards
	* @since 2.0.0
	*/
	function isNumber(input) {
		return typeof input == "number";
	}
	/**
	* Checks whether a value is a `function`.
	*
	* **When to use**
	*
	* Use when you need a `Predicate` guard to narrow an `unknown` value to a
	* callable function.
	*
	* **Details**
	*
	* Uses `typeof input === "function"`.
	*
	* **Example** (Guarding functions)
	*
	* ```ts import.meta.vitest
	* import { Predicate } from "effect"
	*
	* const data: unknown = () => 1
	*
	* if (Predicate.isFunction(data)) {
	*   data() // => 1
	* }
	* ```
	*
	* @see {@link isObjectKeyword}
	* @category guards
	* @since 2.0.0
	*/
	function isFunction(input) {
		return typeof input == "function";
	}
	/**
	* Checks whether a value is an `object` in the JavaScript sense (objects, arrays, functions).
	*
	* **When to use**
	*
	* Use when you need a `Predicate` guard that accepts arrays and functions as
	* well as objects.
	*
	* **Details**
	*
	* Returns `true` for arrays and functions, and `false` for `null`.
	*
	* **Example** (Checking object keywords)
	*
	* ```ts import.meta.vitest
	* import { Predicate } from "effect"
	*
	* Predicate.isObjectKeyword(() => 1) // => true
	* Predicate.isObjectKeyword(null) // => false
	* ```
	*
	* @see {@link isObject}
	* @see {@link isObjectOrArray}
	* @category guards
	* @since 4.0.0
	*/
	function isObjectKeyword(input) {
		return typeof input == "object" && !!input || isFunction(input);
	}
	/**
	* Checks whether a value has a given property key.
	*
	* **When to use**
	*
	* Use when you need a `Predicate` guard for property access on `unknown`
	* values with a simple structural object check.
	*
	* **Details**
	*
	* Uses the `in` operator and `isObjectKeyword`. This does not check property
	* value types.
	*
	* **Example** (Guarding object properties)
	*
	* ```ts import.meta.vitest
	* import { Predicate } from "effect"
	*
	* const hasName = Predicate.hasProperty("name")
	* const data: unknown = { name: "Ada" }
	*
	* if (hasName(data)) {
	*   data.name // => "Ada"
	* }
	* ```
	*
	* @see {@link isTagged}
	* @see {@link isObjectKeyword}
	* @category guards
	* @since 2.0.0
	*/
	let hasProperty = /*#__PURE__*/ dual(2, (self, property) => isObjectKeyword(self) && property in self), symbol$1 = "~effect/interfaces/Hash", hash = (self) => {
		switch (typeof self) {
			case "number": return number(self);
			case "bigint": return string(self.toString(10));
			case "boolean": return string(String(self));
			case "symbol": return string(String(self));
			case "string": return string(self);
			case "undefined": return string("undefined");
			case "function":
			case "object":
				if (self === null) return string("null");
				if (self instanceof Date) return Number.isNaN(self.getTime()) ? string("Invalid Date") : string(self.toISOString());
				if (self instanceof RegExp) return string(self.toString());
				{
					if (byReferenceInstances.has(self)) return random(self);
					if (hashCache.has(self)) return hashCache.get(self);
					let h = withVisitedTracking$1(self, () => isHash(self) ? self[symbol$1]() : typeof self == "function" ? random(self) : self instanceof DataView ? array(new Uint8Array(self.buffer, self.byteOffset, self.byteLength)) : Array.isArray(self) || ArrayBuffer.isView(self) ? array(self) : self instanceof Map ? hashMap(self) : self instanceof Set ? hashSet(self) : structure(self));
					return hashCache.set(self, h), h;
				}
			default: throw Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
		}
	}, random = (self) => (randomHashCache.has(self) || randomHashCache.set(self, number(Math.floor(Math.random() * (2 ** 53 - 1)))), randomHashCache.get(self)), combine = /*#__PURE__*/ dual(2, (self, b) => self * 53 ^ b), optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824, isHash = (u) => hasProperty(u, symbol$1), number = (n) => {
		if (n !== n) return string("NaN");
		if (n === Infinity) return string("Infinity");
		if (n === -Infinity) return string("-Infinity");
		let h = n | 0;
		for (h !== n && (h ^= n * 4294967295); n > 4294967295;) h ^= n /= 4294967295;
		return optimize(h);
	}, string = (str) => {
		let h = 5381, i = str.length;
		for (; i;) h = h * 33 ^ str.charCodeAt(--i);
		return optimize(h);
	}, structureKeys = (o, keys) => {
		let h = 12289;
		for (let key of keys) h ^= combine(hash(key), hash(o[key]));
		return optimize(h);
	}, structure = (o) => structureKeys(o, getAllObjectKeys(o)), iterableWith = (seed, f) => (iter) => {
		let h = seed;
		for (let element of iter) h ^= f(element);
		return optimize(h);
	}, array = /*#__PURE__*/ iterableWith(6151, hash), hashMap = /*#__PURE__*/ iterableWith(/*#__PURE__*/ string("Map"), ([k, v]) => combine(hash(k), hash(v))), hashSet = /*#__PURE__*/ iterableWith(/*#__PURE__*/ string("Set"), hash), randomHashCache = /*#__PURE__*/ new WeakMap(), hashCache = /*#__PURE__*/ new WeakMap(), visitedObjects = /*#__PURE__*/ new WeakSet();
	function withVisitedTracking$1(obj, fn) {
		if (visitedObjects.has(obj)) return string("[Circular]");
		visitedObjects.add(obj);
		let result = fn();
		return visitedObjects.delete(obj), result;
	}
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Equal.js
	/**
	* Defines the unique string identifier for the `Equal` interface.
	*
	* **When to use**
	*
	* Use when you implement custom equality and need the computed property key for
	* the equality method.
	*
	* **Details**
	*
	* This is a pure constant with no allocation or side effects.
	*
	* **Example** (Implementing Equal on a class)
	*
	* ```ts import.meta.vitest
	* import { Equal, Hash } from "effect"
	*
	* class UserId implements Equal.Equal {
	*   constructor(readonly id: string) {}
	*
	*   [Equal.symbol](that: Equal.Equal): boolean {
	*     return that instanceof UserId && this.id === that.id
	*   }
	*
	*   [Hash.symbol](): number {
	*     return Hash.string(this.id)
	*   }
	* }
	*
	* Equal.equals(new UserId("1"), new UserId("1")) // => true
	* Equal.equals(new UserId("1"), new UserId("2")) // => false
	* ```
	*
	* @see {@link Equal} — the interface that uses this symbol
	* @see {@link isEqual} — type guard for `Equal` implementors
	* @category symbols
	* @since 2.0.0
	*/
	let symbol = "~effect/interfaces/Equal";
	function equals$1() {
		return arguments.length === 1 ? (self) => compareBoth(self, arguments[0]) : compareBoth(arguments[0], arguments[1]);
	}
	function compareBoth(self, that) {
		if (self === that) return !0;
		if (self == null || that == null) return !1;
		let selfType = typeof self;
		return selfType === typeof that ? selfType === "number" && self !== self && that !== that ? !0 : selfType !== "object" && selfType !== "function" || byReferenceInstances.has(self) || byReferenceInstances.has(that) ? !1 : withCache(self, that, compareObjects) : !1;
	}
	/** Helper to run comparison with proper visited tracking */
	function withVisitedTracking(self, that, fn) {
		let hasLeft = visitedLeft.has(self), hasRight = visitedRight.has(that);
		if (hasLeft && hasRight) return !0;
		if (hasLeft || hasRight) return !1;
		visitedLeft.add(self), visitedRight.add(that);
		let result = fn();
		return visitedLeft.delete(self), visitedRight.delete(that), result;
	}
	let visitedLeft = /*#__PURE__*/ new WeakSet(), visitedRight = /*#__PURE__*/ new WeakSet();
	/** Helper to perform cached object comparison */
	function compareObjects(self, that) {
		if (hash(self) !== hash(that)) return !1;
		if (self instanceof Date) {
			if (!(that instanceof Date)) return !1;
			let selfTime = self.getTime(), thatTime = that.getTime();
			return selfTime === thatTime || Number.isNaN(selfTime) && Number.isNaN(thatTime);
		}
		if (self instanceof RegExp) return that instanceof RegExp && self.toString() === that.toString();
		let selfIsEqual = isEqual(self), thatIsEqual = isEqual(that);
		if (selfIsEqual !== thatIsEqual) return !1;
		let bothEquals = selfIsEqual && thatIsEqual;
		return typeof self == "function" && !bothEquals ? !1 : withVisitedTracking(self, that, () => {
			if (bothEquals) return self[symbol](that);
			if (Array.isArray(self)) return !Array.isArray(that) || self.length !== that.length ? !1 : compareArrays(self, that);
			if (ArrayBuffer.isView(self)) {
				let selfIsDataView = self instanceof DataView;
				if (!ArrayBuffer.isView(that) || self.byteLength !== that.byteLength || selfIsDataView !== that instanceof DataView) return !1;
				if (selfIsDataView) {
					let thatDataView = that;
					return compareTypedArrays(new Uint8Array(self.buffer, self.byteOffset, self.byteLength), new Uint8Array(thatDataView.buffer, thatDataView.byteOffset, thatDataView.byteLength));
				}
				return compareTypedArrays(self, that);
			}
			return self instanceof Map ? !(that instanceof Map) || self.size !== that.size ? !1 : compareMaps(self, that) : self instanceof Set ? !(that instanceof Set) || self.size !== that.size ? !1 : compareSets(self, that) : compareRecords(self, that);
		});
	}
	function withCache(self, that, f) {
		let selfMap = equalityCache.get(self);
		if (!selfMap) selfMap = /* @__PURE__ */ new WeakMap(), equalityCache.set(self, selfMap);
		else if (selfMap.has(that)) return selfMap.get(that);
		let result = f(self, that);
		selfMap.set(that, result);
		let thatMap = equalityCache.get(that);
		return thatMap || (thatMap = /* @__PURE__ */ new WeakMap(), equalityCache.set(that, thatMap)), thatMap.set(self, result), result;
	}
	let equalityCache = /*#__PURE__*/ new WeakMap();
	function compareArrays(self, that) {
		for (let i = 0; i < self.length; i++) if (!compareBoth(self[i], that[i])) return !1;
		return !0;
	}
	function compareTypedArrays(self, that) {
		if (self.length !== that.length) return !1;
		for (let i = 0; i < self.length; i++) if (self[i] !== that[i]) return !1;
		return !0;
	}
	function compareRecords(self, that) {
		let selfKeys = getAllObjectKeys(self), thatKeys = getAllObjectKeys(that);
		if (selfKeys.size !== thatKeys.size) return !1;
		for (let key of selfKeys) if (!thatKeys.has(key) || !compareBoth(self[key], that[key])) return !1;
		return !0;
	}
	/** @internal */
	function makeCompareMap(keyEquivalence, valueEquivalence) {
		return function(self, that) {
			let thatEntries = Array.from(that);
			for (let [selfKey, selfValue] of self) {
				let found = !1;
				for (let i = 0; i < thatEntries.length; i++) {
					let [thatKey, thatValue] = thatEntries[i];
					if (keyEquivalence(selfKey, thatKey) && valueEquivalence(selfValue, thatValue)) {
						thatEntries[i] = thatEntries[thatEntries.length - 1], thatEntries.pop(), found = !0;
						break;
					}
				}
				if (!found) return !1;
			}
			return !0;
		};
	}
	let compareMaps = /*#__PURE__*/ makeCompareMap(compareBoth, compareBoth);
	/** @internal */
	function makeCompareSet(equivalence) {
		return function(self, that) {
			let thatValues = Array.from(that);
			for (let selfValue of self) {
				let found = !1;
				for (let i = 0; i < thatValues.length; i++) {
					let thatValue = thatValues[i];
					if (equivalence(selfValue, thatValue)) {
						thatValues[i] = thatValues[thatValues.length - 1], thatValues.pop(), found = !0;
						break;
					}
				}
				if (!found) return !1;
			}
			return !0;
		};
	}
	let compareSets = /*#__PURE__*/ makeCompareSet(compareBoth), isEqual = (u) => hasProperty(u, symbol), symbolRedactable = /*#__PURE__*/ Symbol.for("~effect/Redactable"), isRedactable = (u) => hasProperty(u, symbolRedactable);
	/**
	* Returns a redacted value if it implements {@link Redactable}, otherwise returns it
	* unchanged.
	*
	* **When to use**
	*
	* Use as the general-purpose entry point for redaction when the input may
	* or may not implement the redaction protocol.
	*
	* **Details**
	*
	* This function calls {@link isRedactable} and, when it returns `true`,
	* delegates to {@link getRedacted}.
	*
	* **Gotchas**
	*
	* Redaction is not recursive. Nested redactable values inside the returned
	* object are not automatically redacted.
	*
	* @see {@link isRedactable} to check before redacting
	* @see {@link getRedacted} for the lower-level variant for known redactables
	* @category destructors
	* @since 3.10.0
	*/
	function redact(u) {
		return isRedactable(u) ? getRedacted(u) : u;
	}
	/**
	* Returns the result of calling `[symbolRedactable]` on a value that is
	* already known to be {@link Redactable}.
	*
	* **When to use**
	*
	* Use when you need to read the redacted representation from a value already
	* verified as `Redactable`.
	*
	* **Details**
	*
	* This function reads the current fiber's `Context` from the global fiber
	* reference and passes it to the redaction method.
	*
	* **Gotchas**
	*
	* If no fiber is active, an empty `Context` is passed to the redaction method.
	*
	* @see {@link redact} for the higher-level variant that handles non-redactable values
	* @see {@link isRedactable} for the type guard to verify before calling this
	* @category destructors
	* @since 4.0.0
	*/
	function getRedacted(redactable) {
		return redactable[symbolRedactable](globalThis["~effect/Fiber/currentFiber"]?.context ?? emptyContext$1);
	}
	/** @internal */
	let currentFiberTypeId = "~effect/Fiber/currentFiber", emptyMap = /*#__PURE__*/ new Map(), emptyContext$1 = {
		"~effect/Context": {},
		base: emptyMap,
		depth: 0,
		mapUnsafe: emptyMap,
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Formatter.js
	/**
	* Formats JavaScript values into readable strings.
	*
	* `format` is intended for logs, diagnostics, and error messages. It handles
	* primitives, objects, arrays, dates, regular expressions, maps, sets, class
	* instances, errors, circular references, and redactable values. `formatJson`
	* wraps JSON formatting with redaction and circular-reference handling, and the
	* module also includes helpers for property keys, paths, and dates.
	*
	* @since 4.0.0
	*/
	/**
	* Converts any JavaScript value into a human-readable string.
	*
	* **When to use**
	*
	* Use when you need to format arbitrary JavaScript values for debugging,
	* logging, or error messages.
	*
	* **Details**
	*
	* - Output is **not** valid JSON; use {@link formatJson} when you need
	*   parseable JSON.
	* - Handles `BigInt`, `Symbol`, `Set`, `Map`, `Date`, `RegExp`, and class
	*   instances that `JSON.stringify` cannot represent.
	* - Circular references are shown as `"[Circular]"` instead of throwing.
	* - Primitives: stringified naturally (`null`, `undefined`, `123`, `true`).
	*   Strings are JSON-quoted.
	* - Objects with a custom `toString` (not `Object.prototype.toString`):
	*   `toString()` is called unless `ignoreToString` is `true`.
	* - Errors with a `cause`: formatted as `"<message> (cause: <cause>)"`.
	* - Iterables (`Set`, `Map`, etc.): formatted as
	*   `ClassName([...elements])`.
	* - Class instances: wrapped as `ClassName({...})`.
	* - `Redactable` values are automatically redacted.
	* - Arrays/objects with 0–1 entries are inline; larger ones are
	*   pretty-printed when `space` is set.
	* - `space` — indentation unit (number of spaces, or a string like
	*   `"\t"`). Defaults to `0` (compact).
	* - `ignoreToString` — skip calling `toString()`. Defaults to `false`.
	*
	* **Example** (Formatting compact output)
	*
	* ```ts import.meta.vitest
	* import { Formatter } from "effect"
	*
	* Formatter.format({ a: 1, b: [2, 3] }) // => "{\"a\":1,\"b\":[2,3]}"
	* ```
	*
	* **Example** (Pretty-printed output)
	*
	* ```ts import.meta.vitest
	* import { Formatter } from "effect"
	*
	* const output = Formatter.format({ a: 1, b: [2, 3] }, { space: 2 })
	* output // => "{\n  \"a\": 1,\n  \"b\": [\n    2,\n    3\n  ]\n}"
	* ```
	*
	* **Example** (Handling circular references)
	*
	* ```ts import.meta.vitest
	* import { Formatter } from "effect"
	*
	* const obj: any = { name: "loop" }
	* obj.self = obj
	* Formatter.format(obj) // => "{\"name\":\"loop\",\"self\":[Circular]}"
	* ```
	*
	* @see {@link formatJson}
	* @see {@link Formatter}
	* @category formatting
	* @since 2.0.0
	*/
	function format(input, options) {
		let space = options?.space ?? 0, ancestors = /* @__PURE__ */ new WeakSet(), gap = space ? typeof space == "number" ? " ".repeat(space) : space : "", ind = (d) => gap.repeat(d), wrap = (v, body) => {
			let ctor = v?.constructor;
			return ctor && ctor !== Object.prototype.constructor && ctor.name ? `${ctor.name}(${body})` : body;
		}, ownKeys = (o) => {
			try {
				return Reflect.ownKeys(o);
			} catch {
				return ["[ownKeys threw]"];
			}
		};
		function recur(v, d = 0) {
			if (typeof v == "string") return JSON.stringify(v);
			if (typeof v == "number" || v == null || typeof v == "boolean" || typeof v == "symbol") return String(v);
			if (typeof v == "bigint") return String(v) + "n";
			if (typeof v == "object" || typeof v == "function") {
				if (ancestors.has(v)) return CIRCULAR;
				ancestors.add(v);
				let output;
				if (symbolRedactable in v) output = recur(getRedacted(v), d);
				else if (Array.isArray(v)) output = !gap || v.length <= 1 ? `[${v.map((x) => recur(x, d)).join(",")}]` : `[\n${ind(d + 1)}${v.map((x) => recur(x, d + 1)).join(",\n" + ind(d + 1))}\n${ind(d)}]`;
				else if (v instanceof Date) output = formatDate(v);
				else if (!options?.ignoreToString && hasProperty(v, "toString") && typeof v.toString == "function" && v.toString !== Object.prototype.toString && v.toString !== Array.prototype.toString) {
					let s = safeToString(v);
					output = v instanceof Error && v.cause ? `${s} (cause: ${recur(v.cause, d)})` : s;
				} else if (Symbol.iterator in v) output = `${v.constructor.name}(${recur(Array.from(v), d)})`;
				else {
					let keys = ownKeys(v);
					if (!gap || keys.length <= 1) {
						let body = `{${keys.map((k) => `${formatPropertyKey(k)}:${recur(v[k], d)}`).join(",")}}`;
						output = wrap(v, body);
					} else {
						let body = `{\n${keys.map((k) => `${ind(d + 1)}${formatPropertyKey(k)}: ${recur(v[k], d + 1)}`).join(",\n")}\n${ind(d)}}`;
						output = wrap(v, body);
					}
				}
				return ancestors.delete(v), output;
			}
			return String(v);
		}
		return recur(input, 0);
	}
	let CIRCULAR = "[Circular]";
	/**
	* @internal
	*/
	function formatPropertyKey(name) {
		return typeof name == "string" ? JSON.stringify(name) : String(name);
	}
	/**
	* Formats a `Date` as an ISO 8601 string, returning `"Invalid Date"` for
	* invalid dates instead of throwing.
	*
	* @internal
	*/
	function formatDate(date) {
		try {
			return date.toISOString();
		} catch {
			return "Invalid Date";
		}
	}
	function safeToString(input) {
		try {
			let s = input.toString();
			return typeof s == "string" ? s : String(s);
		} catch {
			return "[toString threw]";
		}
	}
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Inspectable.js
	/**
	* Defines the symbol used by Node.js for custom object inspection.
	*
	* **When to use**
	*
	* Use to implement Node.js custom inspection for a value.
	*
	* **Details**
	*
	* This symbol is recognized by Node.js's `util.inspect()` function and the REPL
	* for custom object representation. When an object has a method with this symbol,
	* it will be called to determine how the object should be displayed.
	*
	* **Example** (Defining custom Node inspection)
	*
	* ```ts import.meta.vitest
	* import { Inspectable } from "effect"
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
	* obj[Inspectable.NodeInspectSymbol]() // => "CustomObject(hello)"
	* ```
	*
	* @category symbols
	* @since 2.0.0
	*/
	let NodeInspectSymbol = /*#__PURE__*/ Symbol.for("nodejs.util.inspect.custom"), toJson = (input) => {
		try {
			return input = redact(input), hasProperty(input, "toJSON") && isFunction(input.toJSON) && input.toJSON.length === 0 ? input.toJSON() : Array.isArray(input) ? input.map(toJson) : input;
		} catch {
			return "[toJSON threw]";
		}
	};
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Utils.js
	/**
	* Yields its wrapped value exactly once through an `IterableIterator`.
	*
	* **When to use**
	*
	* Use to implement `[Symbol.iterator]()` on Effect-like types so they can be
	* `yield*`-ed inside generator functions, such as `Effect.gen` and
	* `Option.gen`.
	*
	* **Details**
	*
	* The first call to `next()` returns `{ value: self, done: false }`. Every
	* subsequent call returns `{ value: a, done: true }` where `a` is the argument
	* passed to `next()`. `[Symbol.iterator]()` returns a **new** `SingleShotGen`
	* wrapping the same value, so the outer type can be iterated multiple times.
	*
	* **Example** (Yielding a wrapped value in a generator)
	*
	* ```ts import.meta.vitest
	* import { Utils } from "effect"
	*
	* const gen = new Utils.SingleShotGen<string, number>("hello")
	*
	* gen.next(0) // => { value: "hello", done: false }
	*
	* gen.next(42) // => { value: 42, done: true }
	* ```
	*
	* @see {@link Gen} for the type-level signature that relies on `SingleShotGen`
	* @category constructors
	* @since 2.0.0
	*/
	var SingleShotGen = class SingleShotGen {
		called = !1;
		self;
		constructor(self) {
			this.self = self;
		}
		/**
		* Yields the stored value once, then completes with the value sent back in.
		*
		* **When to use**
		*
		* Use to advance a `SingleShotGen` through its single yield and completion
		* step.
		*
		* @since 2.0.0
		*/
		next(a) {
			return this.called ? {
				value: a,
				done: !0
			} : (this.called = !0, {
				value: this.self,
				done: !1
			});
		}
		/**
		* Creates a fresh single-shot iterator over the stored value.
		*
		* **When to use**
		*
		* Use to iterate the wrapped value again without reusing the consumed
		* iterator state.
		*
		* @since 2.0.0
		*/
		[Symbol.iterator]() {
			return new SingleShotGen(this.self);
		}
	};
	/** @internal */
	let internalCall = /*#__PURE__*/ (() => {
		let InternalTypeId = "~effect/Utils/internal", standard = { [InternalTypeId]: (body) => body() }, forced = { [InternalTypeId]: (body) => {
			try {
				return body();
			} finally {}
		} };
		return standard[InternalTypeId](() => (/* @__PURE__ */ Error()).stack)?.includes(InternalTypeId) === !0 ? standard[InternalTypeId] : forced[InternalTypeId];
	})();
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/internal/record.js
	/** @internal */
	function assignProperty(self, key, value) {
		key === "__proto__" ? Object.defineProperty(self, key, {
			value,
			writable: !0,
			enumerable: !0,
			configurable: !0
		}) : self[key] = value;
	}
	/** @internal */
	function assignProperties(self, source) {
		for (let key of Reflect.ownKeys(source)) Object.prototype.propertyIsEnumerable.call(source, key) && assignProperty(self, key, source[key]);
	}
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/internal/core.js
	/** @internal */
	let EffectTypeId = "~effect/Effect", ExitTypeId = "~effect/Exit", effectVariance = {
		_A: identity,
		_E: identity,
		_R: identity
	}, identifier = `${EffectTypeId}/identifier`, args = `${EffectTypeId}/args`, evaluate = `${EffectTypeId}/evaluate`, contA = `${EffectTypeId}/successCont`, contE = `${EffectTypeId}/failureCont`, contAll = `${EffectTypeId}/ensureCont`, Yield = /*#__PURE__*/ Symbol.for("effect/Effect/Yield"), PipeInspectableProto = {
		pipe() {
			return pipeArguments(this, arguments);
		},
		toJSON() {
			return { ...this };
		},
		toString() {
			return format(this.toJSON(), {
				ignoreToString: !0,
				space: 2
			});
		},
		[NodeInspectSymbol]() {
			return this.toJSON();
		}
	}, EffectProto = {
		[EffectTypeId]: effectVariance,
		...PipeInspectableProto,
		[Symbol.iterator]() {
			return new SingleShotGen(this);
		},
		toJSON() {
			return {
				_id: "Effect",
				op: this[identifier],
				...args in this ? { args: this[args] } : void 0
			};
		}
	}, isEffect = (u) => hasProperty(u, EffectTypeId), isExit = (u) => hasProperty(u, ExitTypeId), CauseTypeId = "~effect/Cause", CauseReasonTypeId = "~effect/Cause/Reason", isCause = (self) => hasProperty(self, CauseTypeId);
	/** @internal */
	var CauseImpl = class {
		[CauseTypeId];
		reasons;
		constructor(failures) {
			this[CauseTypeId] = CauseTypeId, this.reasons = failures;
		}
		pipe() {
			return pipeArguments(this, arguments);
		}
		toJSON() {
			return {
				_id: "Cause",
				failures: this.reasons.map((f) => f.toJSON())
			};
		}
		toString() {
			return `Cause(${format(this.reasons)})`;
		}
		[NodeInspectSymbol]() {
			return this.toJSON();
		}
		[symbol](that) {
			return isCause(that) && this.reasons.length === that.reasons.length && this.reasons.every((e, i) => equals$1(e, that.reasons[i]));
		}
		[symbol$1]() {
			return array(this.reasons);
		}
	};
	let annotationsMap = /*#__PURE__*/ new WeakMap();
	/** @internal */
	var ReasonBase = class {
		[CauseReasonTypeId];
		annotations;
		_tag;
		constructor(_tag, annotations, originalError) {
			if (this[CauseReasonTypeId] = CauseReasonTypeId, this._tag = _tag, annotations !== constEmptyAnnotations && typeof originalError == "object" && originalError && annotations.size > 0) {
				let prevAnnotations = annotationsMap.get(originalError);
				prevAnnotations && (annotations = new Map([...prevAnnotations, ...annotations])), annotationsMap.set(originalError, annotations);
			}
			this.annotations = annotations;
		}
		annotate(annotations, options) {
			if (annotations.mapUnsafe.size === 0) return this;
			let newAnnotations = new Map(this.annotations);
			annotations.mapUnsafe.forEach((value, key) => {
				options?.overwrite !== !0 && newAnnotations.has(key) || newAnnotations.set(key, value);
			});
			let self = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
			return self.annotations = newAnnotations, self;
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
	let constEmptyAnnotations = /*#__PURE__*/ new Map();
	/** @internal */
	var Fail = class extends ReasonBase {
		error;
		constructor(error, annotations = constEmptyAnnotations) {
			super("Fail", annotations, error), this.error = error;
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
		[symbol](that) {
			return isFailReason(that) && equals$1(this.error, that.error) && equals$1(this.annotations, that.annotations);
		}
		[symbol$1]() {
			return combine(string(this._tag))(combine(hash(this.error))(hash(this.annotations)));
		}
	};
	/** @internal */
	let causeFromReasons = (reasons) => new CauseImpl(reasons), causeFail = (error) => new CauseImpl([new Fail(error)]);
	/** @internal */
	var Die = class extends ReasonBase {
		defect;
		constructor(defect, annotations = constEmptyAnnotations) {
			super("Die", annotations, defect), this.defect = defect;
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
		[symbol](that) {
			return isDieReason(that) && equals$1(this.defect, that.defect) && equals$1(this.annotations, that.annotations);
		}
		[symbol$1]() {
			return combine(string(this._tag))(combine(hash(this.defect))(hash(this.annotations)));
		}
	};
	/** @internal */
	let causeDie = (defect) => new CauseImpl([new Die(defect)]), causeAnnotate = /*#__PURE__*/ dual((args) => isCause(args[0]), (self, annotations, options) => annotations.mapUnsafe.size === 0 ? self : new CauseImpl(self.reasons.map((f) => f.annotate(annotations, options)))), isFailReason = (self) => self._tag === "Fail", isDieReason = (self) => self._tag === "Die", isInterruptReason = (self) => self._tag === "Interrupt";
	function defaultEvaluate(_fiber) {
		return exitDie("Effect.evaluate: Not implemented");
	}
	/** @internal */
	let makePrimitiveProto = (options) => ({
		...EffectProto,
		[identifier]: options.op,
		[evaluate]: options[evaluate] ?? defaultEvaluate,
		[contA]: options[contA],
		[contE]: options[contE],
		[contAll]: options[contAll]
	}), makePrimitive = (options) => {
		let Proto = makePrimitiveProto(options);
		return function() {
			let self = Object.create(Proto);
			return self[args] = options.single === !1 ? arguments : arguments[0], self;
		};
	}, makeExit = (options) => {
		let Proto = {
			[ExitTypeId]: ExitTypeId,
			_tag: options.op,
			get [options.prop]() {
				return this[args];
			},
			...makePrimitiveProto(options),
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
			[symbol](that) {
				return isExit(that) && that._tag === this._tag && equals$1(this[args], that[args]);
			},
			[symbol$1]() {
				return combine(string(options.op), hash(this[args]));
			}
		};
		return function(value) {
			let self = Object.create(Proto);
			return self[args] = value, self;
		};
	}, exitSucceed = /*#__PURE__*/ makeExit({
		op: "Success",
		prop: "value",
		[evaluate](fiber) {
			let cont = fiber.getCont(contA);
			return cont ? cont[contA](this[args], fiber, this) : fiber.yieldWith(this);
		}
	}), StackTraceKey = { key: "effect/Cause/StackTrace" }, InterruptorStackTrace$1 = { key: "effect/Cause/InterruptorStackTrace" }, exitFailCause = /*#__PURE__*/ makeExit({
		op: "Failure",
		prop: "cause",
		[evaluate](fiber) {
			let cause = this[args], annotated = !1;
			fiber.currentStackFrame && (cause = causeAnnotate(cause, { mapUnsafe: /* @__PURE__ */ new Map([[StackTraceKey.key, fiber.currentStackFrame]]) }), annotated = !0);
			let cont = fiber.getCont(contE);
			for (; fiber.interruptible && fiber._interruptedCause && cont;) cont = fiber.getCont(contE);
			return cont ? cont[contE](cause, fiber, annotated ? void 0 : this) : fiber.yieldWith(annotated ? exitFailCause(cause) : this);
		}
	}), exitFail = (e) => exitFailCause(causeFail(e)), exitDie = (defect) => exitFailCause(causeDie(defect)), withFiber = /*#__PURE__*/ makePrimitive({
		op: "WithFiber",
		[evaluate](fiber) {
			return this[args](fiber);
		}
	}), YieldableError = /*#__PURE__*/ function() {
		class YieldableError extends globalThis.Error {}
		let proto = /*#__PURE__*/ makePrimitiveProto({
			op: "YieldableError",
			[evaluate]() {
				return exitFail(this);
			}
		});
		return delete proto.toString, Object.assign(YieldableError.prototype, proto), YieldableError;
	}(), Error$1 = /*#__PURE__*/ function() {
		let plainArgsSymbol = /*#__PURE__*/ Symbol.for("effect/Data/Error/plainArgs");
		return class extends YieldableError {
			constructor(args) {
				super(args?.message, args?.cause ? { cause: args.cause } : void 0), args && (assignProperties(this, args), Object.defineProperty(this, plainArgsSymbol, {
					value: args,
					enumerable: !1
				}));
			}
			toJSON() {
				return {
					...this[plainArgsSymbol],
					...this
				};
			}
		};
	}(), TaggedError = (tag) => {
		class Base extends Error$1 {
			_tag = tag;
		}
		return Base.prototype.name = tag, Base;
	};
	TaggedError("NoSuchElementError");
	/** @internal */
	let DoneTypeId = "~effect/Cause/Done", isDone$1 = (u) => hasProperty(u, DoneTypeId), DoneVoid = {
		[DoneTypeId]: DoneTypeId,
		_tag: "Done",
		value: void 0
	}, Done = (value) => value === void 0 ? DoneVoid : {
		[DoneTypeId]: DoneTypeId,
		_tag: "Done",
		value
	}, doneVoid = /*#__PURE__*/ exitFail(DoneVoid), done$1 = (value) => value === void 0 ? doneVoid : exitFail(Done(value)), Prototype = (options) => makePrimitiveProto({
		op: options.label,
		[evaluate]: options.evaluate
	}), TypeId$7 = "~effect/data/Option", CommonProto$1 = {
		[TypeId$7]: { _A: (_) => _ },
		...PipeInspectableProto,
		[Symbol.iterator]() {
			return new SingleShotGen(this);
		}
	}, SomeProto = /*#__PURE__*/ Object.defineProperty(/*#__PURE__*/ Object.assign(/*#__PURE__*/ Object.create(CommonProto$1), {
		_tag: "Some",
		_op: "Some",
		[symbol](that) {
			return isOption(that) && isSome(that) && equals$1(this.value, that.value);
		},
		[symbol$1]() {
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
		}
	}), "valueOrUndefined", { get() {
		return this.value;
	} }), NoneHash = /*#__PURE__*/ hash("None"), NoneProto = /*#__PURE__*/ Object.assign(/*#__PURE__*/ Object.create(CommonProto$1), {
		_tag: "None",
		_op: "None",
		valueOrUndefined: void 0,
		[symbol](that) {
			return isOption(that) && isNone(that);
		},
		[symbol$1]() {
			return NoneHash;
		},
		toString() {
			return "none()";
		},
		toJSON() {
			return {
				_id: "Option",
				_tag: this._tag
			};
		}
	}), isOption = (input) => hasProperty(input, TypeId$7), isNone = (fa) => fa._tag === "None", isSome = (fa) => fa._tag === "Some", none$1 = /*#__PURE__*/ Object.create(NoneProto), some$1 = (value) => {
		let a = Object.create(SomeProto);
		return a.value = value, a;
	}, TypeId$6 = "~effect/data/Result", CommonProto = {
		[TypeId$6]: {
			/* v8 ignore next 2 */
			_A: (_) => _,
			_E: (_) => _
		},
		...PipeInspectableProto,
		[Symbol.iterator]() {
			return new SingleShotGen(this);
		}
	}, SuccessProto = /*#__PURE__*/ Object.assign(/*#__PURE__*/ Object.create(CommonProto), {
		_tag: "Success",
		_op: "Success",
		[symbol](that) {
			return isResult(that) && isSuccess$1(that) && equals$1(this.success, that.success);
		},
		[symbol$1]() {
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
		}
	}), FailureProto = /*#__PURE__*/ Object.assign(/*#__PURE__*/ Object.create(CommonProto), {
		_tag: "Failure",
		_op: "Failure",
		[symbol](that) {
			return isResult(that) && isFailure$1(that) && equals$1(this.failure, that.failure);
		},
		[symbol$1]() {
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
		}
	}), isResult = (input) => hasProperty(input, TypeId$6), isFailure$1 = (result) => result._tag === "Failure", isSuccess$1 = (result) => result._tag === "Success", fail$1 = (failure) => {
		let a = Object.create(FailureProto);
		return a.failure = failure, a;
	}, succeed$6 = (success) => {
		let a = Object.create(SuccessProto);
		return a.success = success, a;
	}, none = () => none$1, some = some$1, ServiceTypeId = "~effect/Context/Service", Service = function() {
		function KeyClass() {}
		let self = KeyClass;
		Object.setPrototypeOf(self, ServiceProto);
		let init = (key, options) => (self.key = key, options?.defaultValue && (self[ReferenceTypeId] = ReferenceTypeId, self.defaultValue = options.defaultValue), options?.make && (self.make = options.make), options?.fiberCached && cacheKeys.add(key), self);
		return arguments.length > 0 ? init(arguments[0], arguments[1]) : init;
	}, ServiceProto = {
		[ServiceTypeId]: ServiceTypeId,
		.../*#__PURE__*/ Prototype({
			label: "Service",
			evaluate(fiber) {
				return exitSucceed(get(fiber.context, this));
			}
		}),
		toJSON() {
			return {
				_id: "Service",
				key: this.key
			};
		},
		of(self) {
			return self;
		},
		context(self) {
			return make$4(this, self);
		},
		use(f) {
			return withFiber((fiber) => f(get(fiber.context, this)));
		},
		useSync(f) {
			return withFiber((fiber) => exitSucceed(f(get(fiber.context, this))));
		}
	}, cacheKeys = /*#__PURE__*/ new Set(), ReferenceTypeId = "~effect/Context/Reference", TypeId$5 = "~effect/Context", makeImpl = (cacheRoot, base, overlay, depth) => {
		let self = Object.create(Proto);
		return self.cacheRoot = cacheRoot ?? self, self.base = base, self.overlay = overlay, self.depth = depth, self._flat = void 0, self.baseHits = 0, self;
	}, applyOverlays = (map, overlay) => {
		overlay && (applyOverlays(map, overlay.parent), map.set(overlay.key, overlay.value));
	}, flatten$3 = (self) => {
		if (self._flat) return self._flat;
		if (!self.overlay) return self._flat = self.base;
		let map = new Map(self.base);
		return applyOverlays(map, self.overlay), self._flat = map;
	}, withFlat = (self, f) => {
		let map = new Map(self.mapUnsafe);
		return f(map), makeUnsafe$2(map);
	}, notFound = /*#__PURE__*/ Symbol(), lookup = (self, key) => {
		let impl = self;
		for (let overlay = impl.overlay; overlay; overlay = overlay.parent) if (overlay.key === key) return overlay.value;
		let value = impl.base.get(key);
		return value === void 0 && !impl.base.has(key) ? notFound : (impl.overlay && ++impl.baseHits >= 8 && (impl.base = flatten$3(impl), impl.overlay = void 0, impl.depth = 0), value);
	}, makeUnsafe$2 = (mapUnsafe) => makeImpl(void 0, mapUnsafe, void 0, 0), Proto = {
		...PipeInspectableProto,
		[TypeId$5]: { _Services: (_) => _ },
		get mapUnsafe() {
			return flatten$3(this);
		},
		toJSON() {
			return {
				_id: "Context",
				services: Array.from(this.mapUnsafe).map(([key, value]) => ({
					key,
					value
				}))
			};
		},
		[symbol](that) {
			if (!isContext(that)) return !1;
			let self = this.mapUnsafe, other = that.mapUnsafe;
			if (self.size !== other.size) return !1;
			for (let [key, value] of self) if (!other.has(key) || !equals$1(value, other.get(key))) return !1;
			return !0;
		},
		[symbol$1]() {
			return number(this.mapUnsafe.size);
		}
	}, hasSameCache = (self, that) => self.cacheRoot === that.cacheRoot, isContext = (u) => hasProperty(u, TypeId$5), isReference = (u) => !!u[ReferenceTypeId], empty$3 = () => emptyContext, emptyContext = /*#__PURE__*/ makeUnsafe$2(/*#__PURE__*/ new Map()), make$4 = (key, service) => makeUnsafe$2(/* @__PURE__ */ new Map([[key.key, service]])), add = /*#__PURE__*/ dual(3, (self, key, service) => addUnsafe(self, key.key, service)), addUnsafe = (self, key, service) => {
		let impl = self, cacheRoot = cacheKeys.has(key) ? void 0 : impl.cacheRoot;
		if (impl.depth >= 8) {
			let map = new Map(impl.mapUnsafe);
			return map.set(key, service), makeImpl(cacheRoot, map, void 0, 0);
		}
		return makeImpl(cacheRoot, impl.base, {
			key,
			value: service,
			parent: impl.overlay
		}, impl.depth + 1);
	}, getOrUndefinedUnsafe = (self, key) => {
		let value = lookup(self, key);
		return value === notFound ? void 0 : value;
	}, get = /* @__PURE__ */ dual(2, (self, service) => {
		let value = lookup(self, service.key);
		if (value === notFound) {
			if (isReference(service)) return getDefaultValue(service);
			throw serviceNotFoundError(service);
		}
		return value;
	}), defaultValueCacheKey = "~effect/Context/defaultValue", getDefaultValue = (ref) => defaultValueCacheKey in ref ? ref[defaultValueCacheKey] : ref[defaultValueCacheKey] = ref.defaultValue(), serviceNotFoundError = (service) => {
		let error = /* @__PURE__ */ Error(`Service not found${service.key ? `: ${String(service.key)}` : ""}`);
		if (error.stack) {
			let lines = error.stack.split("\n");
			lines.splice(1, 3), error.stack = lines.join("\n");
		}
		return error;
	}, merge = /*#__PURE__*/ dual(2, (self, that) => self.mapUnsafe.size === 0 ? that : that.mapUnsafe.size === 0 ? self : withFlat(self, (map) => that.mapUnsafe.forEach((value, key) => map.set(key, value)))), Reference = Service, TypeId$4 = "~effect/time/Duration", bigint0 = /*#__PURE__*/ BigInt(0), bigint1 = /*#__PURE__*/ BigInt(1), bigint2 = /*#__PURE__*/ BigInt(2), bigint10 = /*#__PURE__*/ BigInt(10), bigint1e3 = /*#__PURE__*/ BigInt(1e3), roundTiesAwayFromZero = (input) => BigInt(input < 0 ? Math.ceil(input - .5) : Math.floor(input + .5)), roundMillisToNanos = (millis) => roundTiesAwayFromZero(millis * 1e6), parseNanos = (input, scale) => {
		let decimalIndex = input.indexOf(".");
		if (decimalIndex === -1) return BigInt(input) * scale;
		let isNegative = input[0] === "-", fractional = input.slice(decimalIndex + 1), fractionalScale = bigint10 ** BigInt(fractional.length), scaled = (BigInt(input.slice(+!!isNegative, decimalIndex)) * fractionalScale + BigInt(fractional)) * scale, rounded = scaled / fractionalScale + (scaled % fractionalScale * bigint2 >= fractionalScale ? bigint1 : bigint0);
		return isNegative ? -rounded : rounded;
	}, DURATION_REGEXP = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/, fromInputUnsafe = (input) => {
		switch (typeof input) {
			case "number": return millis(input);
			case "bigint": return nanos(input);
			case "string": {
				if (input === "Infinity") return infinity;
				if (input === "-Infinity") return negativeInfinity;
				let match = DURATION_REGEXP.exec(input);
				if (!match) break;
				let [_, valueStr, unit] = match;
				if (unit === "nano" || unit === "nanos") return nanos(parseNanos(valueStr, bigint1));
				if (unit === "micro" || unit === "micros") return nanos(parseNanos(valueStr, bigint1e3));
				let value = Number(valueStr);
				switch (unit) {
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
				break;
			}
			case "object": {
				if (input === null) break;
				if (TypeId$4 in input) return input;
				if (Array.isArray(input)) return input.length !== 2 || !input.every(isNumber) ? invalid(input) : Number.isNaN(input[0]) || Number.isNaN(input[1]) ? zero : input[0] === -Infinity || input[1] === -Infinity ? negativeInfinity : input[0] === Infinity || input[1] === Infinity ? infinity : make$3(roundTiesAwayFromZero(input[0] * 1e9 + input[1]));
				let obj = input, millis = 0;
				return obj.weeks && (millis += obj.weeks * 6048e5), obj.days && (millis += obj.days * 864e5), obj.hours && (millis += obj.hours * 36e5), obj.minutes && (millis += obj.minutes * 6e4), obj.seconds && (millis += obj.seconds * 1e3), obj.milliseconds && (millis += obj.milliseconds), !obj.microseconds && !obj.nanoseconds ? make$3(millis) : make$3(roundTiesAwayFromZero(millis * 1e6 + (obj.microseconds ?? 0) * 1e3 + (obj.nanoseconds ?? 0)));
			}
		}
		return invalid(input);
	}, invalid = (input) => {
		throw Error(`Invalid Input: ${input}`);
	}, zeroDurationValue = {
		_tag: "Millis",
		millis: 0
	}, infinityDurationValue = { _tag: "Infinity" }, negativeInfinityDurationValue = { _tag: "NegativeInfinity" }, DurationProto = {
		[TypeId$4]: TypeId$4,
		[symbol$1]() {
			switch (this.value._tag) {
				case "Millis": {
					let nanos = this.value.millis * 1e6;
					return Number.isFinite(nanos) ? hash(roundTiesAwayFromZero(nanos)) : number(this.value.millis);
				}
				case "Nanos": return hash(this.value.nanos);
				default: return structure(this.value);
			}
		},
		[symbol](that) {
			return isDuration(that) && equals(this, that);
		},
		toString() {
			switch (this.value._tag) {
				case "Infinity": return "Infinity";
				case "NegativeInfinity": return "-Infinity";
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
				case "NegativeInfinity": return {
					_id: "Duration",
					_tag: "NegativeInfinity"
				};
			}
		},
		[NodeInspectSymbol]() {
			return this.toJSON();
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	}, make$3 = (input) => {
		let duration = Object.create(DurationProto);
		return duration.value = typeof input == "number" ? isNaN(input) || input === 0 || Object.is(input, -0) ? zeroDurationValue : Number.isFinite(input) ? Number.isInteger(input) ? {
			_tag: "Millis",
			millis: input
		} : {
			_tag: "Nanos",
			nanos: roundMillisToNanos(input)
		} : input > 0 ? infinityDurationValue : negativeInfinityDurationValue : input === bigint0 ? zeroDurationValue : {
			_tag: "Nanos",
			nanos: input
		}, duration;
	}, isDuration = (u) => hasProperty(u, TypeId$4), zero = /*#__PURE__*/ make$3(0), infinity = /*#__PURE__*/ make$3(Infinity), negativeInfinity = /*#__PURE__*/ make$3(-Infinity), nanos = (nanos) => make$3(nanos), millis = (millis) => make$3(millis), seconds = (seconds) => make$3(seconds * 1e3), minutes = (minutes) => make$3(minutes * 6e4), hours = (hours) => make$3(hours * 36e5), days = (days) => make$3(days * 864e5), weeks = (weeks) => make$3(weeks * 6048e5), toMillis = (self) => match(fromInputUnsafe(self), {
		onMillis: identity,
		onNanos: (nanos) => Number(nanos) / 1e6,
		onInfinity: () => Infinity,
		onNegativeInfinity: () => -Infinity
	}), toNanosUnsafe = (input) => {
		let self = fromInputUnsafe(input);
		switch (self.value._tag) {
			case "Infinity":
			case "NegativeInfinity": throw Error("Cannot convert infinite duration to nanos");
			case "Nanos": return self.value.nanos;
			case "Millis": return roundMillisToNanos(self.value.millis);
		}
	}, match = /*#__PURE__*/ dual(2, (self, options) => {
		switch (self.value._tag) {
			case "Millis": return options.onMillis(self.value.millis);
			case "Nanos": return options.onNanos(self.value.nanos);
			case "Infinity": return options.onInfinity();
			case "NegativeInfinity": return (options.onNegativeInfinity ?? options.onInfinity)();
		}
	}), matchPair = /*#__PURE__*/ dual(3, (self, that, options) => self.value._tag === "Infinity" || self.value._tag === "NegativeInfinity" || that.value._tag === "Infinity" || that.value._tag === "NegativeInfinity" ? options.onInfinity(self, that) : self.value._tag === "Millis" ? that.value._tag === "Millis" ? options.onMillis(self.value.millis, that.value.millis) : options.onNanos(toNanosUnsafe(self), that.value.nanos) : options.onNanos(self.value.nanos, toNanosUnsafe(that))), Equivalence = (self, that) => matchPair(self, that, {
		onMillis: (self, that) => self === that,
		onNanos: (self, that) => self === that,
		onInfinity: (self, that) => self.value._tag === that.value._tag
	}), equals = /*#__PURE__*/ dual(2, (self, that) => Equivalence(self, that)), isArrayNonEmpty = (self) => self.length > 0, succeed$5 = succeed$6, fail = fail$1, isFailure = isFailure$1, isSuccess = isSuccess$1, headUnsafe = (self) => {
		let result = self[Symbol.iterator]().next();
		if (result.done) throw Error("headUnsafe: empty iterable");
		return result.value;
	}, Array$1 = globalThis.Array, fromIterable = (collection) => Array$1.isArray(collection) ? collection : Array$1.from(collection), appendAll$1 = /*#__PURE__*/ dual(2, (self, that) => fromIterable(self).concat(fromIterable(that)));
	Array$1.isArray;
	/**
	* Checks whether a `ReadonlyArray` is non-empty, narrowing the type to
	* `NonEmptyReadonlyArray`.
	*
	* **When to use**
	*
	* Use when you need to prove a readonly array has at least one element without
	* requiring mutable array methods afterward.
	*
	* **Example** (Checking for a non-empty readonly array)
	*
	* ```ts import.meta.vitest
	* import { Array } from "effect"
	*
	* Array.isReadonlyArrayNonEmpty([]) // => false
	* Array.isReadonlyArrayNonEmpty([1, 2, 3]) // => true
	* ```
	*
	* @see {@link isArrayNonEmpty} — mutable variant
	* @see {@link isReadonlyArrayEmpty} — opposite check
	*
	* @category guards
	* @since 4.0.0
	*/
	let isReadonlyArrayNonEmpty = isArrayNonEmpty, hashBucketsAdd = (buckets, value) => {
		let hash$1 = hash(value), bucket = buckets.get(hash$1);
		if (bucket === void 0) return buckets.set(hash$1, [value]), !0;
		for (let previous of bucket) if (equals$1(previous, value)) return !1;
		return bucket.push(value), !0;
	}, union = /*#__PURE__*/ dual(2, (self, that) => {
		let a = fromIterable(self), b = fromIterable(that);
		return isReadonlyArrayNonEmpty(a) ? isReadonlyArrayNonEmpty(b) ? dedupe(appendAll$1(a, b)) : a : b;
	}), empty$2 = () => [], of = (a) => [a], dedupe = (self) => {
		let input = fromIterable(self);
		if (input.length < 2) return [...input];
		let buckets = /* @__PURE__ */ new Map(), out = [];
		for (let value of input) hashBucketsAdd(buckets, value) && out.push(value);
		return out;
	}, composePassthrough = /*#__PURE__*/ dual(2, (left, right) => (input) => {
		let leftOut = left(input);
		if (isFailure(leftOut)) return fail(input);
		let rightOut = right(leftOut.success);
		return isFailure(rightOut) ? fail(input) : rightOut;
	}), Scheduler = /*#__PURE__*/ Reference("effect/Scheduler", {
		fiberCached: !0,
		defaultValue: () => new MixedScheduler()
	}), setImmediate = "setImmediate" in globalThis ? (f) => {
		let timer = globalThis.setImmediate(f);
		return () => globalThis.clearImmediate(timer);
	} : (f) => {
		let timer = setTimeout(f, 0);
		return () => clearTimeout(timer);
	}, setMicrotask = (f) => {
		let cancelled = !1;
		return Promise.resolve().then(() => {
			cancelled || f();
		}), () => {
			cancelled = !0;
		};
	};
	var PriorityBuckets = class {
		buckets = [];
		scheduleTask(task, priority) {
			let buckets = this.buckets, len = buckets.length, bucket, index = 0;
			for (; index < len && !(buckets[index][0] > priority); index++) bucket = buckets[index];
			bucket && bucket[0] === priority ? bucket[1].push(task) : index === len ? buckets.push([priority, [task]]) : buckets.splice(index, 0, [priority, [task]]);
		}
		drain() {
			let buckets = this.buckets;
			return this.buckets = [], buckets;
		}
	}, MixedScheduler = class {
		executionMode;
		setImmediate;
		constructor(executionMode = "async", setImmediateFn) {
			this.executionMode = executionMode, this.setImmediate = setImmediateFn ?? (executionMode === "sync" ? setMicrotask : setImmediate);
		}
		/**
		* Returns whether the fiber has reached its operation budget and should yield.
		*
		* **When to use**
		*
		* Use to decide whether a fiber should yield after consuming its current
		* operation budget.
		*
		* @since 2.0.0
		*/
		shouldYield(fiber) {
			return fiber.currentOpCount >= fiber.maxOpsBeforeYield;
		}
		/**
		* Creates a dispatcher that schedules work through this scheduler.
		*
		* **When to use**
		*
		* Use when you need a standalone dispatcher from a scheduler instance, for
		* example in tests that enqueue tasks and then flush them deterministically.
		*
		* @since 4.0.0
		*/
		makeDispatcher() {
			return new MixedSchedulerDispatcher(this.setImmediate);
		}
	}, MixedSchedulerDispatcher = class {
		tasks = /*#__PURE__*/ new PriorityBuckets();
		running = void 0;
		setImmediate;
		constructor(setImmediateFn = setImmediate) {
			this.setImmediate = setImmediateFn;
		}
		/**
		* @since 2.0.0
		*/
		scheduleTask(task, priority) {
			this.tasks.scheduleTask(task, priority), this.running === void 0 && (this.running = this.setImmediate(this.afterScheduled));
		}
		/**
		* @since 2.0.0
		*/
		afterScheduled = () => {
			this.running = void 0, this.runTasks();
		};
		/**
		* @since 2.0.0
		*/
		runTasks() {
			let buckets = this.tasks.drain();
			for (let i = 0; i < buckets.length; i++) {
				let toRun = buckets[i][1];
				for (let j = 0; j < toRun.length; j++) toRun[j]();
			}
		}
		/**
		* @since 2.0.0
		*/
		flush() {
			for (; this.tasks.buckets.length > 0;) this.running !== void 0 && (this.running(), this.running = void 0), this.runTasks();
		}
	};
	/**
	* Context reference that controls the maximum number of operations a fiber
	* can perform before yielding control back to the scheduler.
	*
	* **When to use**
	*
	* Use to tune scheduler fairness for CPU-bound fibers by changing the scheduler
	* operation budget that triggers a yield.
	*
	* **Details**
	*
	* The default value is `2048` operations, which balances performance and
	* fairness by helping prevent long-running fibers from monopolizing the
	* execution thread.
	*
	* @see {@link PreventSchedulerYield} for bypassing scheduler yield checks entirely rather than tuning the operation budget
	*
	* @category services
	* @since 4.0.0
	*/
	let MaxOpsBeforeYield = /*#__PURE__*/ Reference("effect/Scheduler/MaxOpsBeforeYield", {
		fiberCached: !0,
		defaultValue: () => 2048
	}), PreventSchedulerYield = /*#__PURE__*/ Reference("effect/Scheduler/PreventSchedulerYield", {
		fiberCached: !0,
		defaultValue: () => !1
	}), ParentSpanKey = "effect/Tracer/ParentSpan";
	Service()(ParentSpanKey, { fiberCached: !0 });
	/**
	* Defines the string key for the active tracer context reference.
	*
	* **When to use**
	*
	* Use when you need the raw context key for active tracer lookup in lower-level
	* tracing code.
	*
	* @category constants
	* @since 4.0.0
	*/
	let CurrentStackFrame = /*#__PURE__*/ Reference("effect/References/CurrentStackFrame", {
		fiberCached: !0,
		defaultValue: constUndefined
	}), CurrentLogLevel = /*#__PURE__*/ Reference("effect/References/CurrentLogLevel", {
		fiberCached: !0,
		defaultValue: () => "Info"
	}), MinimumLogLevel = /*#__PURE__*/ Reference("effect/References/MinimumLogLevel", {
		fiberCached: !0,
		defaultValue: () => "Info"
	});
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/internal/effect.js
	/** @internal */
	var Interrupt = class extends ReasonBase {
		fiberId;
		constructor(fiberId, annotations = constEmptyAnnotations) {
			super("Interrupt", annotations, "Interrupted"), this.fiberId = fiberId;
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
		[symbol](that) {
			return isInterruptReason(that) && this.fiberId === that.fiberId && this.annotations === that.annotations;
		}
		[symbol$1]() {
			return combine(string(`${this._tag}:${this.fiberId}`))(random(this.annotations));
		}
	};
	/** @internal */
	let causeInterrupt = (fiberId) => new CauseImpl([new Interrupt(fiberId)]), findError$1 = (self) => {
		for (let i = 0; i < self.reasons.length; i++) {
			let reason = self.reasons[i];
			if (reason._tag === "Fail") return succeed$5(reason.error);
		}
		return fail(self);
	}, hasInterrupts = (self) => self.reasons.some(isInterruptReason), causeCombine = /*#__PURE__*/ dual(2, (self, that) => {
		if (self.reasons.length === 0) return that;
		if (that.reasons.length === 0) return self;
		let newCause = new CauseImpl(union(self.reasons, that.reasons));
		return equals$1(self, newCause) ? self : newCause;
	}), causePartition = (self) => {
		let obj = {
			Fail: [],
			Die: [],
			Interrupt: []
		};
		for (let i = 0; i < self.reasons.length; i++) obj[self.reasons[i]._tag].push(self.reasons[i]);
		return obj;
	}, causeSquash = (self) => {
		let partitioned = causePartition(self);
		return partitioned.Fail.length > 0 ? partitioned.Fail[0].error : partitioned.Die.length > 0 ? partitioned.Die[0].defect : partitioned.Interrupt.length > 0 ? new globalThis.Error("All fibers interrupted without error") : new globalThis.Error("Empty cause");
	}, FiberTypeId = "~effect/Fiber", fiberVariance = {
		_A: identity,
		_E: identity
	}, fiberIdStore = { id: 0 }, getCurrentFiber = () => globalThis[currentFiberTypeId];
	/** @internal */
	var FiberImpl = class {
		constructor(context, interruptible = !0) {
			this[FiberTypeId] = fiberVariance, this.setContext(context), this.id = ++fiberIdStore.id, this.currentOpCount = 0, this.interruptible = interruptible, this._stack = [], this._observers = [], this._exit = void 0, this._children = void 0, this._interruptedCause = void 0, this._yielded = void 0, this._running = !1, this._deferredInterrupt = !1, this.runtimeMetrics?.recordFiberStart(this.context);
		}
		[FiberTypeId];
		id;
		interruptible;
		currentOpCount;
		_stack;
		_observers;
		_exit;
		_children;
		_interruptedCause;
		_yielded;
		_running;
		_deferredInterrupt;
		context;
		currentScheduler;
		currentTracerContext;
		currentSpan;
		currentLogLevel;
		minimumLogLevel;
		currentStackFrame;
		runtimeMetrics;
		maxOpsBeforeYield;
		currentPreventYield;
		_dispatcher = void 0;
		get currentDispatcher() {
			return this._dispatcher ??= this.currentScheduler.makeDispatcher();
		}
		getRef(ref) {
			return get(this.context, ref);
		}
		addObserver(cb) {
			return this._exit ? (cb(this._exit), constVoid) : (this._observers.push(cb), () => {
				let index = this._observers.indexOf(cb);
				index >= 0 && this._observers.splice(index, 1);
			});
		}
		interruptUnsafe(fiberId, annotations) {
			if (this._exit) return;
			let cause = causeInterrupt(fiberId);
			this.currentStackFrame && (cause = causeAnnotate(cause, make$4(StackTraceKey, this.currentStackFrame))), annotations && (cause = causeAnnotate(cause, annotations)), this._interruptedCause = this._interruptedCause ? causeCombine(this._interruptedCause, cause) : cause, this.interruptible && (this._running ? this._deferredInterrupt = !0 : this.evaluate(failCause$3(this._interruptedCause)));
		}
		pollUnsafe() {
			return this._exit;
		}
		evaluate(effect) {
			if (this._exit) return;
			if (this._yielded !== void 0) {
				let yielded = this._yielded;
				this._yielded = void 0, yielded();
			}
			let exit = this.runLoop(effect);
			if (exit === Yield) return;
			let interruptChildren = fiberMiddleware.interruptChildren && fiberMiddleware.interruptChildren(this);
			if (interruptChildren !== void 0) return this.evaluate(flatMap$3(interruptChildren, () => exit));
			this._exit = exit, this.runtimeMetrics?.recordFiberEnd(this.context, this._exit);
			for (let i = 0; i < this._observers.length; i++) this._observers[i](exit);
			this._observers.length = 0, this._stack.length = 0, this._children = void 0, this.context = empty$3();
		}
		runLoop(effect) {
			let prevFiber = globalThis[currentFiberTypeId];
			globalThis[currentFiberTypeId] = this;
			let prevRunning = this._running;
			this._running = !0;
			let yielding = !1, current = effect;
			this.currentOpCount = 0;
			try {
				for (;;) {
					if (this._deferredInterrupt && (this._deferredInterrupt = !1, current = failCause$3(this._interruptedCause)), this.currentOpCount++, !yielding && !this.currentPreventYield && this.currentScheduler.shouldYield(this)) {
						yielding = !0;
						let prev = current;
						current = flatMap$3(yieldNow$1, () => prev);
					}
					if (current = this.currentTracerContext ? this.currentTracerContext(current, this) : current[evaluate](this), current === Yield) {
						let yielded = this._yielded;
						if (ExitTypeId in yielded) return this._deferredInterrupt = !1, this._yielded = void 0, yielded;
						if (this._deferredInterrupt) {
							this._yielded = void 0, yielded();
							continue;
						}
						return Yield;
					}
				}
			} catch (error) {
				return hasProperty(current, evaluate) ? this.runLoop(exitDie(error)) : exitDie(`Fiber.runLoop: Not a valid effect: ${String(current)}`);
			} finally {
				this._running = prevRunning, globalThis[currentFiberTypeId] = prevFiber;
			}
		}
		getCont(symbol) {
			if (this._deferredInterrupt) return this._deferredInterrupt = !1, deferredInterruptCont;
			for (;;) {
				let op = this._stack.pop();
				if (!op) return;
				let cont = op[contAll] && op[contAll](this);
				if (cont) return cont[symbol] = cont, cont;
				if (op[symbol]) return op;
			}
		}
		yieldWith(value) {
			return this._yielded = value, Yield;
		}
		children() {
			return this._children ??= /* @__PURE__ */ new Set();
		}
		pipe() {
			return pipeArguments(this, arguments);
		}
		setContext(context) {
			let previous = this.context;
			if (this.context = context, previous !== void 0 && hasSameCache(previous, context)) return;
			let scheduler = this.getRef(Scheduler);
			scheduler !== this.currentScheduler && (this.currentScheduler = scheduler, this._dispatcher = void 0), this.currentSpan = getOrUndefinedUnsafe(context, ParentSpanKey), this.currentLogLevel = this.getRef(CurrentLogLevel), this.minimumLogLevel = this.getRef(MinimumLogLevel), this.currentStackFrame = this.getRef(CurrentStackFrame), this.maxOpsBeforeYield = this.getRef(MaxOpsBeforeYield), this.currentPreventYield = this.getRef(PreventSchedulerYield), this.runtimeMetrics = getOrUndefinedUnsafe(context, "effect/observability/Metric/FiberRuntimeMetricsKey");
			let currentTracer = getOrUndefinedUnsafe(context, "effect/Tracer");
			this.currentTracerContext = currentTracer ? currentTracer.context : void 0;
		}
		get currentSpanLocal() {
			return this.currentSpan?._tag === "Span" ? this.currentSpan : void 0;
		}
	};
	let deferredInterruptCont = {
		[contA](_value, fiber) {
			return failCause$3(fiber._interruptedCause);
		},
		[contE](_cause, fiber) {
			return failCause$3(fiber._interruptedCause);
		}
	}, fiberMiddleware = { interruptChildren: void 0 }, fiberStackAnnotations = (fiber) => {
		if (!fiber.currentStackFrame) return;
		let annotations = /* @__PURE__ */ new Map();
		return annotations.set(InterruptorStackTrace$1.key, fiber.currentStackFrame), makeUnsafe$2(annotations);
	}, fiberInterruptChildren = (fiber) => {
		if (fiber._children !== void 0 && fiber._children.size !== 0) return fiberInterruptAll(fiber._children);
	}, fiberAwait = (self) => {
		let impl = self;
		return impl._exit ? succeed$4(impl._exit) : callback$1((resume) => impl._exit ? resume(succeed$4(impl._exit)) : sync$1(self.addObserver((exit) => resume(succeed$4(exit)))));
	}, fiberAwaitAll = (self) => callback$1((resume) => {
		let iter = self[Symbol.iterator](), exits = [], cancel;
		function loop() {
			let result = iter.next();
			for (; !result.done;) {
				if (result.value._exit) {
					exits.push(result.value._exit), result = iter.next();
					continue;
				}
				cancel = result.value.addObserver((exit) => {
					exits.push(exit), loop();
				});
				return;
			}
			resume(succeed$4(exits));
		}
		return loop(), sync$1(() => cancel?.());
	}), fiberJoin = (self) => {
		let impl = self;
		return impl._exit ? impl._exit : callback$1((resume) => impl._exit ? resume(impl._exit) : sync$1(self.addObserver(resume)));
	}, fiberInterrupt = (self) => withFiber((fiber) => fiberInterruptAs(self, fiber.id)), fiberInterruptAs = /*#__PURE__*/ dual((args) => hasProperty(args[0], FiberTypeId), (self, fiberId, annotations) => withFiber((parent) => {
		let ann = fiberStackAnnotations(parent);
		return ann = ann && annotations ? merge(ann, annotations) : ann ?? annotations, self.interruptUnsafe(fiberId, ann), asVoid(fiberAwait(self));
	})), fiberInterruptAll = (fibers) => withFiber((parent) => {
		let annotations = fiberStackAnnotations(parent), fiberArr = empty$2();
		for (let fiber of fibers) fiber.interruptUnsafe(parent.id, annotations), fiberArr.push(fiber);
		return asVoid(fiberAwaitAll(fiberArr));
	}), succeed$4 = exitSucceed, failCause$3 = exitFailCause, sync$1 = /*#__PURE__*/ makePrimitive({
		op: "Sync",
		[evaluate](fiber) {
			let value = this[args](), cont = fiber.getCont(contA);
			return cont ? cont[contA](value, fiber) : fiber.yieldWith(exitSucceed(value));
		}
	}), suspend$1 = /*#__PURE__*/ makePrimitive({
		op: "Suspend",
		[evaluate](_fiber) {
			return this[args]();
		}
	}), yieldNow$1 = /*#__PURE__*/ (/* @__PURE__ */ makePrimitive({
		op: "Yield",
		[evaluate](fiber) {
			let resumed = !1;
			return fiber.currentDispatcher.scheduleTask(() => {
				resumed || fiber.evaluate(exitVoid);
			}, this[args] ?? 0), fiber.yieldWith(() => {
				resumed = !0;
			});
		}
	}))(0), succeedNone = /*#__PURE__*/ succeed$4(/*#__PURE__*/ none()), die = (defect) => exitDie(defect), void_$2 = /*#__PURE__*/ succeed$4(void 0), promise$1 = (evaluate) => callbackOptions(function(resume, signal) {
		internalCall(() => evaluate(signal)).then((a) => resume(succeed$4(a)), (e) => resume(die(e)));
	}, evaluate.length !== 0), withFiberId = (f) => withFiber((fiber) => f(fiber.id)), callbackOptions = /*#__PURE__*/ makePrimitive({
		op: "Async",
		single: !1,
		[evaluate](fiber) {
			let register = internalCall(() => this[args][0].bind(fiber.currentScheduler)), resumed = !1, yielded = !1, controller = this[args][1] ? new AbortController() : void 0, onCancel = register((effect) => {
				resumed || (resumed = !0, yielded ? fiber.evaluate(effect) : yielded = effect);
			}, controller?.signal);
			return yielded === !1 ? (yielded = !0, fiber._yielded = () => {
				resumed = !0;
			}, controller === void 0 && onCancel === void 0 || fiber._stack.push(asyncFinalizer(() => (resumed = !0, controller?.abort(), onCancel ?? exitVoid))), Yield) : yielded;
		}
	}), asyncFinalizer = /*#__PURE__*/ makePrimitive({
		op: "AsyncFinalizer",
		[contAll](fiber) {
			fiber.interruptible && (fiber.interruptible = !1, fiber._stack.push(setInterruptibleTrue));
		},
		[contE](cause, _fiber) {
			return hasInterrupts(cause) ? flatMap$3(this[args](), () => failCause$3(cause)) : failCause$3(cause);
		}
	}), callback$1 = (register) => callbackOptions(register, register.length >= 2), never$1 = /*#__PURE__*/ callback$1(constVoid), gen$1 = (...args) => suspend$1(() => fromIteratorUnsafe(args.length === 1 ? args[0]() : args[1].call(args[0].self))), fnUntraced$1 = (body, ...pipeables) => {
		let fn = pipeables.length === 0 ? function() {
			return suspend$1(() => fromIteratorUnsafe(body.apply(this, arguments)));
		} : function() {
			let effect = suspend$1(() => fromIteratorUnsafe(body.apply(this, arguments)));
			for (let i = 0; i < pipeables.length; i++) effect = pipeables[i](effect, ...arguments);
			return effect;
		};
		return defineFunctionLength(body.length, fn);
	}, defineFunctionLength = (length, fn) => Object.defineProperty(fn, "length", {
		value: length,
		configurable: !0
	}), fromIteratorUnsafe = /*#__PURE__*/ makePrimitive({
		op: "Iterator",
		single: !1,
		[contA](value, fiber) {
			let iter = this[args][0];
			for (;;) {
				let state = iter.next(value);
				if (state.done) return succeed$4(state.value);
				if (!effectIsExit(state.value)) return fiber._stack.push(this), state.value;
				if (state.value._tag === "Failure") return state.value;
				value = state.value.value;
			}
		},
		[evaluate](fiber) {
			return this[contA](this[args][1], fiber);
		}
	}), as$1 = /*#__PURE__*/ dual(2, (self, value) => {
		let b = succeed$4(value);
		return flatMap$3(self, (_) => b);
	}), asSome = (self) => map$2(self, some), andThen$1 = /*#__PURE__*/ dual(2, (self, f) => flatMap$3(self, (a) => isEffect(f) ? f : internalCall(() => f(a)))), tap$2 = /*#__PURE__*/ dual(2, (self, f) => flatMap$3(self, (a) => as$1(isEffect(f) ? f : internalCall(() => f(a)), a))), asVoid = (self) => flatMap$3(self, (_) => exitVoid), raceAllFirst = (all, options) => withFiber((parent) => callback$1((resume) => {
		let done = !1, fibers = /* @__PURE__ */ new Set(), onExit = (exit) => {
			done = !0, resume(fibers.size === 0 ? exit : flatMap$3(uninterruptible(fiberInterruptAll(fibers)), () => exit));
		}, i = 0;
		for (let effect of all) {
			if (done) break;
			let index = i++, fiber = forkUnsafe$1(parent, effect, !0, !0, !1);
			fibers.add(fiber), fiber.addObserver((exit) => {
				fibers.delete(fiber);
				let isWinner = !done;
				onExit(exit), isWinner && options?.onWinner && options.onWinner({
					fiber,
					index,
					parentFiber: parent
				});
			});
		}
		return fiberInterruptAll(fibers);
	})), raceFirst$1 = /*#__PURE__*/ dual((args) => isEffect(args[1]), (self, that, options) => raceAllFirst([self, that], options)), flatMap$3 = /*#__PURE__*/ dual(2, (self, f) => {
		let onSuccess = Object.create(OnSuccessProto);
		return onSuccess[args] = self, onSuccess[contA] = f.length === 1 ? f : (a) => f(a), onSuccess;
	}), OnSuccessProto = /*#__PURE__*/ makePrimitiveProto({
		op: "OnSuccess",
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args];
		}
	}), effectIsExit = (effect) => ExitTypeId in effect, flatMapEager$1 = /*#__PURE__*/ dual(2, (self, f) => effectIsExit(self) ? self._tag === "Success" ? f(self.value) : self : flatMap$3(self, f)), flatten$2 = (self) => flatMap$3(self, identity), map$2 = /*#__PURE__*/ dual(2, (self, f) => flatMap$3(self, (a) => succeed$4(internalCall(() => f(a))))), exitInterrupt$1 = (fiberId) => exitFailCause(causeInterrupt(fiberId)), exitIsSuccess = (self) => self._tag === "Success", exitFilterCause = (self) => self._tag === "Failure" ? succeed$5(self.cause) : fail(self), exitVoid = /*#__PURE__*/ exitSucceed(void 0), exitZipRight = /*#__PURE__*/ dual(2, (self, that) => exitIsSuccess(self) ? that : self), exitAsVoidAll = (exits) => {
		let failures = [];
		for (let exit of exits) exit._tag === "Failure" && failures.push(...exit.cause.reasons);
		return failures.length === 0 ? exitVoid : exitFailCause(causeFromReasons(failures));
	}, updateContext = /*#__PURE__*/ dual(2, (self, f) => withFiber((fiber) => {
		let prevContext = fiber.context, nextContext = f(prevContext);
		return prevContext === nextContext ? self : (fiber.setContext(nextContext), onExitPrimitive(self, () => {
			fiber.setContext(prevContext);
		}));
	})), context$1 = () => getContext, getContext = /*#__PURE__*/ withFiber((fiber) => succeed$4(fiber.context)), contextWith = (f) => withFiber((fiber) => f(fiber.context)), provideContext = /*#__PURE__*/ dual(2, (self, context) => effectIsExit(self) ? self : updateContext(self, merge(context))), provideService = function() {
		return arguments.length === 1 ? dual(2, (self, impl) => provideServiceImpl(self, arguments[0], impl)) : dual(3, (self, service, impl) => provideServiceImpl(self, service, impl)).apply(this, arguments);
	}, provideServiceImpl = (self, service, implementation) => updateContext(self, add(service, implementation)), forever$1 = /*#__PURE__*/ dual((args) => isEffect(args[0]), (self, options) => whileLoop({
		while: constTrue,
		body: constant(options?.disableYield ? self : flatMap$3(self, (_) => yieldNow$1)),
		step: constVoid
	})), catchCause$1 = /*#__PURE__*/ dual(2, (self, f) => {
		let onFailure = Object.create(OnFailureProto);
		return onFailure[args] = self, onFailure[contE] = f.length === 1 ? f : (cause) => f(cause), onFailure;
	}), OnFailureProto = /*#__PURE__*/ makePrimitiveProto({
		op: "OnFailure",
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args];
		}
	}), catchCauseFilter = /*#__PURE__*/ dual(3, (self, filter, f) => catchCause$1(self, (cause) => {
		let eb = filter(cause);
		return isFailure(eb) ? failCause$3(eb.failure) : internalCall(() => f(eb.success, cause));
	})), matchCauseEffect$1 = /*#__PURE__*/ dual(2, (self, options) => {
		let primitive = Object.create(OnSuccessAndFailureProto);
		return primitive[args] = self, primitive[contA] = options.onSuccess.length === 1 ? options.onSuccess : (a) => options.onSuccess(a), primitive[contE] = options.onFailure.length === 1 ? options.onFailure : (cause) => options.onFailure(cause), primitive;
	}), OnSuccessAndFailureProto = /*#__PURE__*/ makePrimitiveProto({
		op: "OnSuccessAndFailure",
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args];
		}
	}), exit$1 = (self) => effectIsExit(self) ? exitSucceed(self) : exitPrimitive(self), exitPrimitive = /*#__PURE__*/ makePrimitive({
		op: "Exit",
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args];
		},
		[contA](value, _, exit) {
			return succeed$4(exit ?? exitSucceed(value));
		},
		[contE](cause, _, exit) {
			return succeed$4(exit ?? exitFailCause(cause));
		}
	}), ScopeTypeId = "~effect/Scope", ScopeCloseableTypeId = "~effect/Scope/Closeable", scopeTag = /*#__PURE__*/ Service("effect/Scope"), scopeClose = (self, exit_) => suspend$1(() => scopeCloseUnsafe(self, exit_) ?? void_$2), scopeCloseUnsafe = (self, exit_) => {
		if (self.state._tag === "Closed") return;
		let closed = {
			_tag: "Closed",
			exit: exit_
		};
		if (self.state._tag === "Empty") {
			self.state = closed;
			return;
		}
		let { finalizers } = self.state;
		if (self.state = closed, finalizers.size !== 0) return finalizers.size === 1 ? finalizers.values().next().value(exit_) : scopeCloseFinalizers(self, finalizers, exit_);
	}, scopeCloseFinalizers = /*#__PURE__*/ fnUntraced$1(function* (self, finalizers, exit_) {
		let exits = [], fibers = [], arr = Array.from(finalizers.values()), parent = getCurrentFiber();
		for (let i = arr.length - 1; i >= 0; i--) {
			let finalizer = arr[i];
			self.strategy === "sequential" ? exits.push(yield* exit$1(finalizer(exit_))) : fibers.push(forkUnsafe$1(parent, finalizer(exit_), !0, !0, "inherit"));
		}
		return fibers.length > 0 && (exits = yield* fiberAwaitAll(fibers)), yield* exitAsVoidAll(exits);
	}), scopeForkUnsafe = (scope, finalizerStrategy) => {
		let newScope = scopeMakeUnsafe(finalizerStrategy);
		if (scope.state._tag === "Closed") return newScope.state = scope.state, newScope;
		let key = {};
		return scopeAddFinalizerUnsafe(scope, key, (exit) => scopeClose(newScope, exit)), scopeAddFinalizerUnsafe(newScope, key, (_) => sync$1(() => scopeRemoveFinalizerUnsafe(scope, key))), newScope;
	}, scopeAddFinalizerExit = (scope, finalizer) => suspend$1(() => scope.state._tag === "Closed" ? finalizer(scope.state.exit) : (scopeAddFinalizerUnsafe(scope, {}, finalizer), void_$2)), scopeAddFinalizer = (scope, finalizer) => scopeAddFinalizerExit(scope, constant(finalizer)), scopeAddFinalizerUnsafe = (scope, key, finalizer) => {
		scope.state._tag === "Empty" ? scope.state = {
			_tag: "Open",
			finalizers: /* @__PURE__ */ new Map([[key, finalizer]])
		} : scope.state._tag === "Open" && scope.state.finalizers.set(key, finalizer);
	}, scopeRemoveFinalizerUnsafe = (scope, key) => {
		scope.state._tag === "Open" && scope.state.finalizers.delete(key);
	}, scopeMakeUnsafe = (finalizerStrategy = "sequential") => ({
		[ScopeCloseableTypeId]: ScopeCloseableTypeId,
		[ScopeTypeId]: ScopeTypeId,
		strategy: finalizerStrategy,
		state: constScopeEmpty
	}), constScopeEmpty = { _tag: "Empty" }, scope = scopeTag, provideScope = /*#__PURE__*/ provideService(scopeTag), addFinalizer$2 = (finalizer) => flatMap$3(scope, (scope) => contextWith((context) => scopeAddFinalizerExit(scope, (exit) => provideContext(finalizer(exit), context)))), onExitPrimitive = /*#__PURE__*/ makePrimitive({
		op: "OnExit",
		single: !1,
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args][0];
		},
		[contAll](fiber) {
			fiber.interruptible && this[args][2] !== !0 && (fiber._stack.push(setInterruptibleTrue), fiber.interruptible = !1);
		},
		[contA](value, _, exit) {
			exit ??= exitSucceed(value);
			let eff = this[args][1](exit);
			return eff ? flatMap$3(eff, (_) => exit) : exit;
		},
		[contE](cause, _, exit) {
			exit ??= exitFailCause(cause);
			let eff = this[args][1](exit);
			return eff ? flatMap$3(eff, (_) => exit) : exit;
		}
	}), onExit$1 = /*#__PURE__*/ dual(2, onExitPrimitive), onExitFilter = /*#__PURE__*/ dual(3, (self, filter, f) => onExit$1(self, (exit) => {
		let b = filter(exit);
		return isFailure(b) ? void_$2 : f(b.success, exit);
	})), onError$1 = /*#__PURE__*/ dual(2, (self, f) => onExitFilter(self, exitFilterCause, f)), cachedInvalidateWithTTL = /*#__PURE__*/ dual(2, (self, ttl) => sync$1(() => {
		let ttlMillis = toMillis(fromInputUnsafe(ttl)), isFinite = Number.isFinite(ttlMillis), latch = makeLatchUnsafe(!1), expiresAt = 0, running = !1, exit, wait = flatMap$3(latch.await, () => exit);
		return [withFiber((fiber) => {
			let clock = fiber.getRef(ClockRef), now = isFinite ? clock.currentTimeMillisUnsafe() : 0;
			return running || now < expiresAt ? exit ?? wait : (running = !0, latch.closeUnsafe(), exit = void 0, onExit$1(self, (exit_) => sync$1(() => {
				running = !1, expiresAt = clock.currentTimeMillisUnsafe() + ttlMillis, exit = exit_, latch.openUnsafe();
			})));
		}), sync$1(() => {
			expiresAt = 0, latch.closeUnsafe(), exit = void 0;
		})];
	})), cachedWithTTL = /*#__PURE__*/ dual(2, (self, timeToLive) => map$2(cachedInvalidateWithTTL(self, timeToLive), (tuple) => tuple[0])), cached$1 = (self) => cachedWithTTL(self, infinity), uninterruptible = (self) => withFiber((fiber) => fiber.interruptible ? (fiber.interruptible = !1, fiber._stack.push(setInterruptibleTrue), self) : self), setInterruptible = /*#__PURE__*/ makePrimitive({
		op: "SetInterruptible",
		[contAll](fiber) {
			if (fiber.interruptible = this[args], fiber._interruptedCause && fiber.interruptible) return () => failCause$3(fiber._interruptedCause);
		}
	}), setInterruptibleTrue = /*#__PURE__*/ setInterruptible(!0), setInterruptibleFalse = /*#__PURE__*/ setInterruptible(!1), setFiberInterruptible = (fiber) => {
		if (fiber.interruptible = !0, fiber._stack.push(setInterruptibleFalse), fiber._interruptedCause) return failCause$3(fiber._interruptedCause);
	}, interruptible = (self) => withFiber((fiber) => fiber.interruptible ? self : setFiberInterruptible(fiber) ?? self), uninterruptibleMask = (f) => withFiber((fiber) => fiber.interruptible ? (fiber.interruptible = !1, fiber._stack.push(setInterruptibleTrue), f(interruptible)) : f(identity)), whileLoop = /*#__PURE__*/ makePrimitive({
		op: "While",
		[contA](value, fiber) {
			return this[args].step(value), this[args].while() ? (fiber._stack.push(this), this[args].body()) : exitVoid;
		},
		[evaluate](fiber) {
			return this[args].while() ? (fiber._stack.push(this), this[args].body()) : exitVoid;
		}
	}), forkChild$1 = /*#__PURE__*/ dual((args) => isEffect(args[0]), (self, options) => withFiber((fiber) => (interruptChildrenPatch(), succeed$4(forkUnsafe$1(fiber, self, options?.startImmediately, !1, options?.uninterruptible ?? !1))))), forkUnsafe$1 = (parent, effect, immediate = !1, daemon = !1, uninterruptible = !1) => {
		let parentRuntime = parent, interruptible = uninterruptible === "inherit" ? parentRuntime.interruptible : !uninterruptible, child = new FiberImpl(parentRuntime.context, interruptible);
		return immediate ? child.evaluate(effect) : parentRuntime.currentDispatcher.scheduleTask(() => child.evaluate(effect), 0), !daemon && !child._exit && (parentRuntime.children().add(child), child.addObserver(() => parentRuntime._children.delete(child))), child;
	}, forkIn$1 = /*#__PURE__*/ dual((args) => isEffect(args[0]), (self, scope, options) => withFiber((parent) => {
		let fiber = forkUnsafe$1(parent, self, options?.startImmediately, !0, options?.uninterruptible);
		if (!fiber._exit) {
			if (scope.state._tag !== "Closed") {
				let key = {};
				scopeAddFinalizerUnsafe(scope, key, () => withFiberId((interruptor) => interruptor === fiber.id ? void_$2 : fiberInterrupt(fiber))), fiber.addObserver(() => scopeRemoveFinalizerUnsafe(scope, key));
			} else fiber.interruptUnsafe(parent.id, fiberStackAnnotations(parent));
		}
		return succeed$4(fiber);
	})), runForkWith$1 = (context) => (effect, options) => {
		let fiber = new FiberImpl(options?.scheduler ? add(context, Scheduler, options.scheduler) : context, options?.uninterruptible !== !0);
		if (fiber.evaluate(effect), fiber._exit) return fiber;
		if (options?.signal) {
			if (options.signal.aborted) fiber.interruptUnsafe();
			else {
				let abort = () => fiber.interruptUnsafe();
				options.signal.addEventListener("abort", abort, { once: !0 }), fiber.addObserver(() => options.signal.removeEventListener("abort", abort));
			}
		}
		return options?.onFiberStart && options.onFiberStart(fiber), fiber;
	}, fiberRunIn = /*#__PURE__*/ dual(2, (self, scope) => {
		if (self._exit) return self;
		if (scope.state._tag === "Closed") return self.interruptUnsafe(self.id), self;
		let key = {};
		return scopeAddFinalizerUnsafe(scope, key, () => fiberInterrupt(self)), self.addObserver(() => scopeRemoveFinalizerUnsafe(scope, key)), self;
	}), runFork$1 = /*#__PURE__*/ runForkWith$1(/*#__PURE__*/ empty$3()), runSyncExitWith = (context) => {
		let runFork = runForkWith$1(context);
		return (effect) => {
			if (effectIsExit(effect)) return effect;
			let scheduler = new MixedScheduler("sync"), fiber = runFork(effect, { scheduler });
			return fiber._dispatcher?.flush(), fiber._exit ?? exitDie(new AsyncFiberError(fiber));
		};
	}, runSync$1 = /*#__PURE__*/ ((context) => {
		let runSyncExit = runSyncExitWith(context);
		return (effect) => {
			let exit = runSyncExit(effect);
			if (exit._tag === "Failure") throw causeSquash(exit.cause);
			return exit.value;
		};
	})(/*#__PURE__*/ empty$3()), succeedTrue = /*#__PURE__*/ succeed$4(!0), succeedFalse = /*#__PURE__*/ succeed$4(!1);
	var Latch = class {
		waiters = [];
		scheduled = void 0;
		_isOpen;
		constructor(isOpen) {
			this._isOpen = isOpen;
		}
		scheduleUnsafe(fiber) {
			if (this.waiters.length === 0) return succeedTrue;
			if (this.scheduled === void 0) this.scheduled = this.waiters, fiber.currentDispatcher.scheduleTask(this.flushScheduled, 0);
			else for (let i = 0; i < this.waiters.length; i++) this.scheduled.push(this.waiters[i]);
			return this.waiters = [], succeedTrue;
		}
		flushScheduled = () => {
			if (this.scheduled === void 0) return;
			let waiters = this.scheduled;
			this.scheduled = void 0;
			for (let i = 0; i < waiters.length; i++) waiters[i](exitVoid);
		};
		flushWaiters() {
			let waiters = this.waiters;
			this.waiters = [], this.flushScheduled();
			for (let i = 0; i < waiters.length; i++) waiters[i](exitVoid);
		}
		open = /*#__PURE__*/ withFiber((fiber) => this._isOpen ? succeedFalse : (this._isOpen = !0, this.scheduleUnsafe(fiber)));
		release = /*#__PURE__*/ withFiber((fiber) => this._isOpen ? succeedFalse : this.scheduleUnsafe(fiber));
		openUnsafe() {
			return !this._isOpen && (this._isOpen = !0, this.flushWaiters(), !0);
		}
		await = /*#__PURE__*/ callback$1((resume) => this._isOpen ? resume(void_$2) : (this.waiters.push(resume), sync$1(() => {
			let index = this.waiters.indexOf(resume);
			index === -1 ? this.scheduled !== void 0 && (index = this.scheduled.indexOf(resume), index !== -1 && this.scheduled.splice(index, 1)) : this.waiters.splice(index, 1);
		})));
		closeUnsafe() {
			return this._isOpen ? (this._isOpen = !1, !0) : !1;
		}
		close = /*#__PURE__*/ sync$1(() => this.closeUnsafe());
		whenOpen = (self) => flatMap$3(this.await, () => self);
		isOpen() {
			return this._isOpen;
		}
	};
	/** @internal */
	let makeLatchUnsafe = (open) => new Latch(open ?? !1), makeLatch = (open) => sync$1(() => makeLatchUnsafe(open)), ClockRef = /*#__PURE__*/ Reference("effect/Clock", { defaultValue: () => new ClockImpl() }), MAX_TIMER_MILLIS = 2 ** 31 - 1;
	var ClockImpl = class {
		currentTimeMillisUnsafe() {
			return Date.now();
		}
		currentTimeMillis = /*#__PURE__*/ sync$1(() => this.currentTimeMillisUnsafe());
		currentTimeNanosUnsafe() {
			return wallTimeNanos();
		}
		currentTimeNanos = /*#__PURE__*/ sync$1(() => this.currentTimeNanosUnsafe());
		monotonicTimeNanosUnsafe() {
			return monotonicNowNanos();
		}
		monotonicTimeNanos = /*#__PURE__*/ sync$1(() => this.monotonicTimeNanosUnsafe());
		sleep(duration) {
			return this.sleepMillis(toMillis(duration));
		}
		sleepMillis(millis) {
			return millis <= 0 ? yieldNow$1 : Number.isFinite(millis) ? callback$1((resume) => {
				let continuation = millis > MAX_TIMER_MILLIS ? this.sleepMillis(millis - MAX_TIMER_MILLIS) : void_$2, handle = setTimeout(() => resume(continuation), Math.min(millis, MAX_TIMER_MILLIS));
				return sync$1(() => clearTimeout(handle));
			}) : never$1;
		}
	};
	let nanosPerMilli = /*#__PURE__*/ BigInt(1e6), monotonicNowNanos = /*#__PURE__*/ function() {
		let processHrtime = globalThis.process?.hrtime;
		if (typeof processHrtime?.bigint == "function") return () => processHrtime.bigint();
		if (typeof performance < "u" && typeof performance.now == "function") return () => BigInt(Math.round(performance.now() * 1e6));
		let previous = /*#__PURE__*/ BigInt(0);
		return () => {
			let current = BigInt(Date.now()) * nanosPerMilli;
			return current > previous && (previous = current), previous;
		};
	}(), wallTimeNanos = /*#__PURE__*/ function() {
		let reanchorThresholdNanos = /*#__PURE__*/ BigInt(1e9), origin;
		return () => {
			let monotonic = monotonicNowNanos(), wall = BigInt(Date.now()) * nanosPerMilli;
			if (origin === void 0) origin = wall - monotonic;
			else {
				let projected = origin + monotonic;
				(wall > projected ? wall - projected : projected - wall) > reanchorThresholdNanos && (origin = wall - monotonic);
			}
			return origin + monotonic;
		};
	}();
	TaggedError("TimeoutError"), TaggedError("IllegalArgumentError"), TaggedError("ExceededCapacityError");
	/** @internal */
	let AsyncFiberErrorTypeId = "~effect/Cause/AsyncFiberError";
	/** @internal */
	var AsyncFiberError = class extends TaggedError("AsyncFiberError") {
		[AsyncFiberErrorTypeId] = AsyncFiberErrorTypeId;
		constructor(fiber) {
			super({
				message: "An asynchronous Effect was executed with Effect.runSync",
				fiber
			});
		}
	};
	TaggedError("UnknownError");
	let colors = {
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
	colors.gray, colors.blue, colors.green, colors.yellow, colors.red, colors.bgBrightRed, colors.black;
	/** @internal */
	function interruptChildrenPatch() {
		fiberMiddleware.interruptChildren ??= fiberInterruptChildren;
	}
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Exit.js
	/**
	* Creates a successful Exit containing the given value.
	*
	* **When to use**
	*
	* Use when you need an Exit that contains a known success value.
	*
	* **Details**
	*
	* Returns a `Success<A>` with the provided value. Does not perform any
	* computation.
	*
	* **Example** (Creating a successful Exit)
	*
	* ```ts import.meta.vitest
	* import { Exit } from "effect"
	*
	* Exit.succeed(42) // => Exit.succeed(42)
	* ```
	*
	* @see {@link fail} to create a failed Exit
	* @see {@link void_ void} for a pre-allocated success with no value
	*
	* @category constructors
	* @since 2.0.0
	*/
	let succeed$3 = exitSucceed, failCause$2 = exitFailCause, void_$1 = exitVoid, makeUnsafe$1 = scopeMakeUnsafe, provide = provideScope, addFinalizer$1 = scopeAddFinalizer, forkUnsafe = scopeForkUnsafe, close = scopeClose, findError = findError$1, isDone = isDone$1, done = done$1;
	Service()("effect/Cause/StackTrace"), Service()("effect/Cause/InterruptorStackTrace");
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Pull.js
	/**
	* Models one low-level pull step for stream-like consumers.
	*
	* A `Pull<A, E, Done, R>` is an `Effect` that can produce one `A`, fail with an
	* ordinary error `E`, or signal end-of-input with `Cause.Done<Done>`. The
	* separate done signal lets low-level consumers distinguish normal completion
	* from failure. This module includes type extractors and helpers for detecting,
	* filtering, catching, converting, and matching done signals separately from
	* ordinary failures.
	*
	* @since 4.0.0
	*/
	/**
	* Handles `Cause.Done` failures in an effect while leaving ordinary failures
	* in the error channel.
	*
	* **When to use**
	*
	* Use to recover from a `Cause.Done` completion signal in an effect, such as
	* turning a pull leftover value into a successful recovery effect while
	* preserving ordinary failures.
	*
	* **Details**
	*
	* The handler receives the done leftover value and may recover with a new
	* effect. Non-done errors are preserved.
	*
	* @see {@link matchEffect} for handling success, ordinary failure, and done outcomes explicitly
	* @see {@link filterDoneLeftover} for extracting a done leftover from an existing `Cause`
	*
	* @category error handling
	* @since 4.0.0
	*/
	let catchDone = /*#__PURE__*/ dual(2, (effect, f) => catchCauseFilter(effect, filterDoneLeftover, (l) => f(l))), isDoneCause = (cause) => cause.reasons.some(isDoneFailure), isDoneFailure = (failure) => failure._tag === "Fail" && isDone(failure.error), filterDone = /*#__PURE__*/ composePassthrough(findError, (e) => isDone(e) ? succeed$5(e) : fail(e)), filterDoneLeftover = /*#__PURE__*/ composePassthrough(findError, (e) => isDone(e) ? succeed$5(e.value) : fail(e)), doneExitFromCause = (cause) => {
		let halt = filterDone(cause);
		return isFailure(halt) ? failCause$2(halt.failure) : succeed$3(halt.success.value);
	}, promise = promise$1, succeed$2 = succeed$4, suspend = suspend$1, sync = sync$1, void_ = void_$2, never = never$1, gen = gen$1, failCause$1 = failCause$3, yieldNow = yieldNow$1, flatMap$2 = flatMap$3, flatten$1 = flatten$2, andThen = andThen$1, tap$1 = tap$2, exit = exit$1, map$1 = map$2, as = as$1, catchCause = catchCause$1, raceFirst = raceFirst$1, matchCauseEffect = matchCauseEffect$1, context = context$1, addFinalizer = addFinalizer$2, onError = onError$1, onExit = onExit$1, cached = cached$1, forever = forever$1, forkChild = forkChild$1, forkIn = forkIn$1, runFork = runFork$1, runForkWith = runForkWith$1, runSync = runSync$1, fnUntraced = fnUntraced$1;
	Service()("effect/Effect/Transaction");
	/**
	* Applies `flatMap` eagerly when an effect is already resolved.
	*
	* **When to use**
	*
	* Use when an already-resolved successful effect should bind immediately to the
	* next effect while pending effects still use regular flat mapping.
	*
	* **Details**
	*
	* Success effects apply the flatMap function immediately. Failure effects pass
	* through unchanged, and pending effects fall back to regular `flatMap`
	* behavior.
	*
	* **Example** (Flat mapping eagerly when possible)
	*
	* ```ts import.meta.vitest
	* import { Effect } from "effect"
	*
	* // For resolved effects, the flatMap is applied immediately
	* const resolved = Effect.succeed(5)
	* const flatMapped = Effect.flatMapEager(resolved, (n) => Effect.succeed(n * 2)) // Applied eagerly
	*
	* // For pending effects, behaves like regular flatMap
	* const pending = Effect.delay(Effect.succeed(5), 0)
	* const flatMappedPending = Effect.flatMapEager(
	*   pending,
	*   (n) => Effect.succeed(n * 2)
	* ) // Uses regular flatMap
	*
	* await Effect.runPromise(Effect.all([flatMapped, flatMappedPending])) // => [10, 10]
	* ```
	*
	* @category sequencing
	* @since 4.0.0
	*/
	let flatMapEager = flatMapEager$1, Empty = /*#__PURE__*/ Symbol.for("effect/MutableList/Empty"), make$2 = () => ({
		head: void 0,
		tail: void 0,
		length: 0
	}), emptyBucket = () => ({
		array: [],
		mutable: !0,
		offset: 0,
		next: void 0
	}), append = (self, message) => {
		self.tail ? self.tail.mutable || (self.tail.next = emptyBucket(), self.tail = self.tail.next) : self.head = self.tail = emptyBucket(), self.tail.array.push(message), self.length++;
	}, appendAll = (self, messages) => appendAllUnsafe(self, fromIterable(messages), !Array.isArray(messages)), appendAllUnsafe = (self, messages, mutable = !1) => {
		if (messages.length === 0) return 0;
		let chunk = {
			array: messages,
			mutable,
			offset: 0,
			next: void 0
		};
		return self.head ? self.tail = self.tail.next = chunk : self.head = self.tail = chunk, self.length += messages.length, messages.length;
	}, clear = (self) => {
		self.head = self.tail = void 0, self.length = 0;
	}, takeN = (self, n) => {
		if (n <= 0 || !self.head) return [];
		if (n = Math.min(n, self.length), n === self.length && self.head?.offset === 0 && !self.head.next) {
			let array = self.head.array;
			return clear(self), array;
		}
		let array = Array(n), index = 0, chunk = self.head;
		for (; chunk;) {
			for (; chunk.offset < chunk.array.length;) if (array[index++] = chunk.array[chunk.offset], chunk.mutable && (chunk.array[chunk.offset] = void 0), chunk.offset++, index === n) return self.head = chunk, self.length -= n, self.length === 0 && clear(self), array;
			chunk = chunk.next;
		}
		return clear(self), array;
	}, take$1 = (self) => {
		if (!self.head) return Empty;
		let message = self.head.array[self.head.offset];
		return self.head.mutable && (self.head.array[self.head.offset] = void 0), self.head.offset++, self.length--, self.head.offset === self.head.array.length && (self.head.next ? self.head = self.head.next : clear(self)), message;
	}, variance = {
		_A: identity,
		_E: identity
	}, QueueProto = {
		"~effect/Queue": variance,
		"~effect/Queue/Enqueue": variance,
		"~effect/Queue/Dequeue": variance,
		...PipeInspectableProto,
		toJSON() {
			return {
				_id: "effect/Queue",
				state: this.state._tag,
				size: sizeUnsafe(this)
			};
		}
	}, make$1 = (options) => withFiber((fiber) => {
		let self = Object.create(QueueProto);
		return self.dispatcher = fiber.currentDispatcher, self.capacity = options?.capacity ?? Infinity, self.strategy = options?.strategy ?? "suspend", self.messages = make$2(), self.scheduleRunning = !1, self.state = {
			_tag: "Open",
			takers: /* @__PURE__ */ new Set(),
			offers: /* @__PURE__ */ new Set(),
			awaiters: /* @__PURE__ */ new Set()
		}, succeed$4(self);
	}), bounded = (capacity) => make$1({ capacity }), offer = (self, message) => suspend$1(() => {
		if (self.state._tag !== "Open") return exitFalse;
		if (self.messages.length >= self.capacity) switch (self.strategy) {
			case "dropping": return exitFalse;
			case "suspend": return self.capacity <= 0 && self.state.takers.size > 0 ? (append(self.messages, message), releaseTakers(self), exitTrue) : offerRemainingSingle(self, message);
			case "sliding": return take$1(self.messages), append(self.messages, message), exitTrue;
		}
		return append(self.messages, message), scheduleReleaseTaker(self), exitTrue;
	}), offerAllUnsafe = (self, messages) => {
		if (self.state._tag !== "Open") return fromIterable(messages);
		if (self.capacity === Infinity || self.strategy === "sliding") return appendAll(self.messages, messages), self.strategy === "sliding" && takeN(self.messages, self.messages.length - self.capacity), scheduleReleaseTaker(self), [];
		let free = self.capacity <= 0 ? self.state.takers.size : self.capacity - self.messages.length;
		if (free === 0) return fromIterable(messages);
		let remaining = [], i = 0;
		for (let message of messages) i < free ? append(self.messages, message) : remaining.push(message), i++;
		return scheduleReleaseTaker(self), remaining;
	}, failCause = /*#__PURE__*/ dual(2, (self, cause) => sync$1(() => failCauseUnsafe(self, cause))), failCauseUnsafe = (self, cause) => {
		if (self.state._tag !== "Open") return !1;
		let exit = exitFailCause(cause), fail = exitZipRight(exit, exitFailDone);
		return self.state.offers.size === 0 && self.messages.length === 0 ? (finalize(self, fail), !0) : (self.state = {
			...self.state,
			_tag: "Closing",
			exit: fail
		}, !0);
	}, shutdown = (self) => sync$1(() => {
		if (self.state._tag === "Done") return !0;
		clear(self.messages);
		let offers = self.state.offers;
		if (finalize(self, self.state._tag === "Open" ? exitInterrupt : self.state.exit), offers.size > 0) {
			for (let entry of offers) entry._tag === "Single" ? entry.resume(exitFalse) : entry.resume(exitSucceed(entry.remaining.slice(entry.offset)));
			offers.clear();
		}
		return !0;
	}), takeAll = (self) => takeBetween(self, 1, Infinity), takeBetween = (self, min, max) => suspend$1(() => takeBetweenUnsafe(self, min, max) ?? andThen$1(awaitTake(self), takeBetween(self, 1, max))), take = (self) => suspend$1(() => takeUnsafe(self) ?? andThen$1(awaitTake(self), take(self))), takeUnsafe = (self) => {
		if (self.state._tag === "Done") return self.state.exit;
		if (self.messages.length > 0) {
			let message = take$1(self.messages);
			return releaseCapacity(self), exitSucceed(message);
		}
		if (self.capacity <= 0 && self.state.offers.size > 0) {
			self.capacity = 1, releaseCapacity(self), self.capacity = 0;
			let message = take$1(self.messages);
			return releaseCapacity(self), exitSucceed(message);
		}
	}, sizeUnsafe = (self) => self.state._tag === "Done" ? 0 : self.messages.length, exitFalse = /*#__PURE__*/ exitSucceed(!1), exitTrue = /*#__PURE__*/ exitSucceed(!0), exitFailDone = /*#__PURE__*/ exitFail(/*#__PURE__*/ Done()), exitInterrupt = /*#__PURE__*/ exitInterrupt$1(), releaseTakers = (self) => {
		if (self.scheduleRunning = !1, self.state._tag !== "Done" && self.state.takers.size !== 0) {
			for (let taker of self.state.takers) if (self.state.takers.delete(taker), taker(exitVoid), self.messages.length === 0) break;
		}
	}, scheduleReleaseTaker = (self) => {
		self.scheduleRunning || self.state._tag === "Done" || self.state.takers.size === 0 || (self.scheduleRunning = !0, self.dispatcher.scheduleTask(() => releaseTakers(self), 0));
	}, takeBetweenUnsafe = (self, min, max) => {
		if (self.state._tag === "Done") return self.state.exit;
		if (max <= 0 || min <= 0) return exitSucceed([]);
		if (self.capacity <= 0 && self.state.offers.size > 0) {
			self.capacity = 1, releaseCapacity(self), self.capacity = 0;
			let messages = [take$1(self.messages)];
			return releaseCapacity(self), exitSucceed(messages);
		}
		if (min = Math.min(min, self.capacity || 1), min <= self.messages.length) {
			let messages = takeN(self.messages, max);
			return releaseCapacity(self), exitSucceed(messages);
		}
	}, offerRemainingSingle = (self, message) => callback$1((resume) => {
		if (self.state._tag !== "Open") return resume(exitFalse);
		let entry = {
			_tag: "Single",
			message,
			resume
		};
		return self.state.offers.add(entry), sync$1(() => {
			self.state._tag === "Open" && self.state.offers.delete(entry);
		});
	}), releaseCapacity = (self) => {
		if (self.state._tag === "Done") return isDoneCause(self.state.exit.cause);
		if (self.state.offers.size === 0) return self.state._tag === "Closing" && self.messages.length === 0 && (finalize(self, self.state.exit), isDoneCause(self.state.exit.cause));
		let n = self.capacity - self.messages.length;
		for (let entry of self.state.offers) if (n === 0) break;
		else if (entry._tag === "Single") append(self.messages, entry.message), n--, entry.resume(exitTrue), self.state.offers.delete(entry);
		else {
			for (; entry.offset < entry.remaining.length; entry.offset++) {
				if (n === 0) return !1;
				append(self.messages, entry.remaining[entry.offset]), n--;
			}
			entry.resume(exitSucceed([])), self.state.offers.delete(entry);
		}
		return !1;
	}, awaitTake = (self) => callback$1((resume) => self.state._tag === "Done" ? resume(self.state.exit) : (self.state.takers.add(resume), sync$1(() => {
		self.state._tag !== "Done" && self.state.takers.delete(resume);
	}))), finalize = (self, exit) => {
		if (self.state._tag === "Done") return;
		let openState = self.state;
		self.state = {
			_tag: "Done",
			exit
		};
		for (let taker of openState.takers) taker(exit);
		openState.takers.clear();
		for (let awaiter of openState.awaiters) awaiter(exit);
		openState.awaiters.clear();
	}, join = fiberJoin, interrupt = fiberInterrupt, runIn = fiberRunIn, make = makeLatch, makeUnsafe = (permits) => new SemaphoreImpl(permits), waitForPermits = (self, n, effect) => callback$1((resume) => {
		if (self.free >= n) return resume(effect);
		let observer = () => {
			self.free < n || (self.waiters.delete(observer), resume(effect));
		};
		return self.waiters.add(observer), sync$1(() => {
			self.waiters.delete(observer);
		});
	});
	var SemaphoreImpl = class {
		waiters = /*#__PURE__*/ new Set();
		taken = 0;
		permits;
		constructor(permits) {
			this.permits = permits;
		}
		get free() {
			return this.permits - this.taken;
		}
		take(n) {
			let take = suspend$1(() => this.free < n ? waitForPermits(this, n, take) : (this.taken += n, succeed$4(n)));
			return take;
		}
		takeIfAvailable(n) {
			return suspend$1(() => this.free < n ? succeed$4(!1) : (this.taken += n, succeed$4(!0)));
		}
		releaseUnsafe(fiber, n) {
			return this.taken -= n, this.waiters.size > 0 && fiber.currentDispatcher.scheduleTask(() => {
				for (let observer of this.waiters) {
					if (this.free <= 0) break;
					observer();
				}
			}, 0), this.free;
		}
		resize(permits) {
			return withFiber((fiber) => (this.permits = permits, this.free < 0 || this.releaseUnsafe(fiber, 0), void_$2));
		}
		release(n) {
			return withFiber((fiber) => succeed$4(this.releaseUnsafe(fiber, n)));
		}
		get releaseAll() {
			return withFiber((fiber) => succeed$4(this.releaseUnsafe(fiber, this.taken)));
		}
		withPermits(n) {
			return (self) => uninterruptibleMask((restore) => {
				let acquire = suspend$1(() => {
					if (this.free < n) {
						let wait = waitForPermits(this, n, void_$2);
						return flatMap$3(restore(wait), () => acquire);
					}
					return this.taken += n, onExitPrimitive(restore(self), () => {
						this.releaseUnsafe(getCurrentFiber(), n);
					}, !0);
				});
				return acquire;
			});
		}
		withPermit = /*#__PURE__*/ this.withPermits(1);
		withPermitsIfAvailable(n) {
			return (self) => uninterruptibleMask((restore) => this.free < n ? succeedNone : (this.taken += n, onExitPrimitive(restore(asSome(self)), () => {
				this.releaseUnsafe(getCurrentFiber(), n);
			}, !0)));
		}
	};
	//#endregion
	//#region node_modules/.pnpm/effect@4.0.0-rc.109/node_modules/effect/dist/Channel.js
	/**
	* Runtime identifier stored on `Channel` values and used by `isChannel` to
	* recognize them.
	*
	* @category type IDs
	* @since 4.0.0
	*/
	let TypeId$2 = "~effect/Channel", isChannel = (u) => hasProperty(u, TypeId$2), ChannelProto = {
		[TypeId$2]: {
			_Env: identity,
			_InErr: identity,
			_InElem: identity,
			_OutErr: identity,
			_OutElem: identity
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	}, fromTransform = (transform) => {
		let self = Object.create(ChannelProto);
		return self.transform = (upstream, scope) => catchCause(transform(upstream, scope), (cause) => succeed$2(failCause$1(cause))), self;
	}, transformPull = (self, f) => fromTransform((upstream, scope) => flatMap$2(toTransform(self)(upstream, scope), (pull) => f(pull, scope))), fromPull = (effect) => fromTransform((_, __) => effect), fromTransformBracket = (f) => fromTransform(fnUntraced(function* (upstream, scope) {
		let closableScope = forkUnsafe(scope), onCause = (cause) => close(closableScope, doneExitFromCause(cause)), pull = yield* onError(f(upstream, scope, closableScope), onCause);
		return onError(pull, onCause);
	})), toTransform = (channel) => channel.transform, asyncQueue = (scope, f, options) => make$1({
		capacity: options?.bufferSize,
		strategy: options?.strategy
	}).pipe(tap$1((queue) => addFinalizer$1(scope, shutdown(queue))), tap$1((queue) => forkIn(provide(f(queue), scope), scope))), callbackArray = (f, options) => fromTransform((_, scope) => map$1(asyncQueue(scope, f, options), takeAll)), succeed$1 = (value) => fromEffect(succeed$2(value)), empty$1 = /*#__PURE__*/ fromPull(/*#__PURE__*/ succeed$2(/*#__PURE__*/ done())), fromEffect = (effect) => fromPull(sync(() => {
		let done$13 = !1;
		return suspend(() => done$13 ? done() : (done$13 = !0, effect));
	})), map = /*#__PURE__*/ dual(2, (self, f) => transformPull(self, (pull) => sync(() => {
		let i = 0;
		return map$1(pull, (o) => f(o, i++));
	}))), concurrencyIsSequential = (concurrency) => concurrency === void 0 || concurrency !== "unbounded" && concurrency <= 1, mapEffect$1 = /*#__PURE__*/ dual((args) => isChannel(args[0]), (self, f, options) => concurrencyIsSequential(options?.concurrency) ? mapEffectSequential(self, f) : mapEffectConcurrent(self, f, options)), mapEffectSequential = (self, f) => fromTransform((upstream, scope) => {
		let i = 0;
		return map$1(toTransform(self)(upstream, scope), flatMap$2((o) => f(o, i++)));
	}), mapEffectConcurrent = (self, f, options) => fromTransformBracket(fnUntraced(function* (upstream, scope, forkedScope) {
		let i = 0, pull = yield* toTransform(self)(upstream, scope), concurrencyN = options.concurrency === "unbounded" ? 2 ** 53 - 1 : options.concurrency, queue = yield* bounded(0);
		yield* addFinalizer$1(forkedScope, shutdown(queue));
		let runFork = runForkWith(yield* context()), trackFiber = runIn(forkedScope);
		if (options.unordered) {
			let semaphore = makeUnsafe(concurrencyN), release = constant(semaphore.release(1)), handle = matchCauseEffect({
				onFailure: (cause) => flatMap$2(failCause(queue, cause), release),
				onSuccess: (value) => flatMap$2(offer(queue, value), release)
			});
			yield* semaphore.take(1).pipe(flatMap$2(() => pull), flatMap$2((value) => (trackFiber(runFork(handle(f(value, i++)))), void_)), forever({ disableYield: !0 }), catchCause((cause) => semaphore.withPermits(concurrencyN - 1)(failCause(queue, cause))), forkIn(forkedScope));
		} else {
			let effects = yield* bounded(concurrencyN - 2);
			yield* addFinalizer$1(forkedScope, shutdown(queue)), yield* take(effects).pipe(flatten$1, flatMap$2((value) => offer(queue, value)), forever({ disableYield: !0 }), catchCause((cause) => failCause(queue, cause)), forkIn(forkedScope));
			let errorCause, onExit = (exit) => {
				exit._tag !== "Success" && (errorCause = exit.cause, failCauseUnsafe(queue, exit.cause));
			};
			yield* pull.pipe(flatMap$2((value) => {
				if (errorCause) return failCause$1(errorCause);
				let fiber = runFork(f(value, i++));
				return trackFiber(fiber), fiber.addObserver(onExit), offer(effects, join(fiber));
			}), forever({ disableYield: !0 }), catchCause((cause) => offer(effects, failCause$2(cause)).pipe(andThen(failCause(effects, cause)))), forkIn(forkedScope));
		}
		return take(queue);
	})), flatMap$1 = /*#__PURE__*/ dual((args) => isChannel(args[0]), (self, f, options) => concurrencyIsSequential(options?.concurrency) ? flatMapSequential(self, f) : flatMapConcurrent(self, f, options)), flatMapSequential = (self, f) => fromTransform((upstream, scope) => map$1(toTransform(self)(upstream, scope), (pull) => {
		let childPull, childScope, makePull = flatMap$2(pull, (value) => (childScope ??= forkUnsafe(scope), flatMapEager(toTransform(f(value))(upstream, childScope), (pull) => (childPull = catchHalt(pull), childPull)))), catchHalt = catchDone((_) => {
			if (childPull = void 0, childScope.state._tag === "Open" && childScope.state.finalizers.size === 1) return makePull;
			let close$2 = close(childScope, void_$1);
			return childScope = void 0, flatMap$2(close$2, () => makePull);
		});
		return suspend(() => childPull ?? makePull);
	})), flatMapConcurrent = (self, f, options) => self.pipe(map(f), mergeAll(options)), flattenArray = (self) => transformPull(self, (pull) => {
		let array, index = 0, pump = suspend(function loop() {
			if (array === void 0) return flatMap$2(pull, (array_) => {
				switch (array_.length) {
					case 0: return loop();
					case 1: return succeed$2(array_[0]);
					default: return array = array_, succeed$2(array_[index++]);
				}
			});
			let next = array[index++];
			return index >= array.length && (array = void 0, index = 0), succeed$2(next);
		});
		return succeed$2(pump);
	}), mergeAll = /*#__PURE__*/ dual(2, (channels, { bufferSize = 16, concurrency, switch: switch_ = !1 }) => fromTransformBracket(fnUntraced(function* (upstream, scope, forkedScope) {
		let concurrencyN = concurrency === "unbounded" ? 2 ** 53 - 1 : Math.max(1, concurrency), semaphore = switch_ ? void 0 : makeUnsafe(concurrencyN), doneLatch = yield* make(!0), fibers = /* @__PURE__ */ new Set(), queue = yield* bounded(bufferSize);
		yield* addFinalizer$1(forkedScope, shutdown(queue));
		let pull = yield* toTransform(channels)(upstream, scope);
		return yield* gen(function* () {
			for (;;) {
				let pullFiber;
				semaphore && (fibers.size < concurrencyN ? yield* semaphore.take(1) : (pullFiber = yield* forkChild(pull), yield* raceFirst(semaphore.take(1), andThen(join(pullFiber), never))));
				let channel = pullFiber === void 0 ? yield* pull : yield* join(pullFiber), childScope = forkUnsafe(forkedScope), childPull = yield* toTransform(channel)(upstream, childScope);
				for (; fibers.size >= concurrencyN;) {
					let fiber = headUnsafe(fibers);
					fibers.delete(fiber), fibers.size === 0 && (yield* doneLatch.open), yield* interrupt(fiber);
				}
				let fiber = yield* childPull.pipe(tap$1(() => yieldNow), flatMap$2((value) => offer(queue, value)), forever({ disableYield: !0 }), onError(fnUntraced(function* (cause) {
					let halt = filterDone(cause);
					if (yield* exit(close(childScope, isFailure(halt) ? failCause$2(halt.failure) : succeed$3(halt.success.value))), fibers.has(fiber) && (fibers.delete(fiber), semaphore && (yield* semaphore.release(1)), fibers.size === 0 && (yield* doneLatch.open), !isSuccess(halt))) return yield* failCause(queue, cause);
				})), forkChild);
				doneLatch.closeUnsafe(), fibers.add(fiber);
			}
		}).pipe(catchCause((cause) => {
			let halt = filterDone(cause);
			return isSuccess(halt) ? doneLatch.whenOpen(failCause(queue, cause)) : failCause(queue, cause);
		}), forkIn(forkedScope)), take(queue);
	}))), runWith = (self, f, onHalt) => suspend(() => {
		let scope = makeUnsafe$1(), makePull = toTransform(self)(done(), scope);
		return catchDone(flatMap$2(makePull, f), onHalt || succeed$2).pipe(onExit((exit) => close(scope, exit)));
	}), runDrain$1 = (self) => runWith(self, (pull) => forever(pull, { disableYield: !0 })), StreamProto = {
		"~effect/Stream": {
			_R: identity,
			_E: identity,
			_A: identity
		},
		pipe() {
			return pipeArguments(this, arguments);
		}
	}, fromChannel$1 = (channel) => {
		let self = Object.create(StreamProto);
		return self.channel = channel, self;
	}, isStream = (u) => hasProperty(u, "~effect/Stream"), fromChannel = fromChannel$1, callback = (f, options) => fromChannel(callbackArray(f, options)), empty = /*#__PURE__*/ fromChannel(empty$1), succeed = (value) => fromChannel(succeed$1(of(value))), fromArray = (array) => isReadonlyArrayNonEmpty(array) ? fromChannel(succeed$1(array)) : empty, mapEffect = /*#__PURE__*/ dual((args) => isStream(args[0]), (self, f, options) => self.channel.pipe(flattenArray, mapEffect$1(f, options), map(of), fromChannel)), tap = /*#__PURE__*/ dual((args) => isStream(args[0]), (self, f, options) => mapEffect(self, (a) => as(f(a), a), options)), flatMap = /*#__PURE__*/ dual((args) => isStream(args[0]), (self, f, options) => self.channel.pipe(flattenArray, flatMap$1((a) => f(a).channel, options), fromChannel)), flatten = /*#__PURE__*/ dual((args) => isStream(args[0]), (self, options) => flatMap(self, identity, options)), concat = /*#__PURE__*/ dual(2, (self, that) => flatten(fromArray([self, that]))), runDrain = (self) => runDrain$1(self.channel);
	//#endregion
	//#region src/github-fix.ts
	GM_addStyle("\n  .copilotPreview__container, .feed-right-column[aria-label=\"Explore\"] {\n    display: none !important;\n  }\n  .feed-right-column li.notifications-list-item, .feed-right-column li.notifications-list-item.notification-read {\n    background-color: transparent !important;\n  }\n");
	let fetchNotifications = promise(() => fetch("/notifications").then((res) => res.text())).pipe(cached, runSync);
	location.pathname === "/" && runFork(fetchNotifications);
	let processed = /* @__PURE__ */ new WeakSet(), addNotifications = fnUntraced(function* (parent) {
		if (processed.has(parent)) return;
		processed.add(parent);
		let html = yield* fetchNotifications, dom = new DOMParser().parseFromString(html, "text/html");
		Array.from(dom.querySelectorAll("link[rel=stylesheet]")).filter((link) => link.href.includes("notifications")).forEach((link) => document.head.appendChild(link.cloneNode()));
		let aside = document.createElement("aside");
		aside.className = "feed-notifications feed-right-column d-block mb-5 mt-7";
		let container = dom.querySelector("ul.js-active-navigation-container");
		container.classList.remove("color-bg-subtle"), container.classList.add("border", "color-border-muted", "rounded-3", "overflow-hidden"), container.querySelectorAll("[class*='-md']").forEach((el) => {
			Array.from(el.classList).forEach((cls) => {
				cls.includes("-md") && el.classList.remove(cls);
			});
		}), container.querySelectorAll(".notification-list-item-actions").forEach((el) => el.remove()), container.querySelectorAll(".notification-list-item-actions-responsive").forEach((el) => el.remove()), container.querySelectorAll(".notification-list-item-unread-indicator").forEach((el) => el.parentNode.remove()), container.querySelectorAll(".notification-is-starred-icon").forEach((el) => el.remove()), aside.appendChild(container), parent.appendChild(aside);
	});
	function findParentWithClass(element, className) {
		for (; element;) {
			if (element.className.includes(className)) return element;
			element = element.parentElement;
		}
		return null;
	}
	succeed(void 0).pipe(concat(callback(fnUntraced(function* (queue) {
		let observer = new MutationObserver((records) => {
			offerAllUnsafe(queue, records);
		});
		observer.observe(document.body, {
			attributes: !1,
			childList: !0,
			subtree: !0
		}), yield* addFinalizer(() => sync(() => observer.disconnect()));
	}))), tap(fnUntraced(function* () {
		let heading = Array.from(document.querySelectorAll("h3")).find((h) => h.textContent?.includes("Agent sessions"));
		if (heading) {
			let cont = findParentWithClass(heading, "DashboardListView-module__List");
			cont && cont.remove();
		}
		let repoButton = document.querySelector("button[data-testid=\"dynamic-side-panel-items-search-button\"]");
		repoButton && repoButton.click();
		let feedContent = document.querySelector(".feed-content");
		feedContent && (yield* forkChild(addNotifications(feedContent)));
	})), runDrain, runFork);
	//#endregion
})();
