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
	let pipeArguments = (self, args$1) => {
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
	}, isFunction = (input) => typeof input == "function", dual = function(arity, body) {
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
				let args$1 = arguments;
				return function(self) {
					return body(self, ...args$1);
				};
			};
		}
	}, identity = (a) => a, constant = (value) => () => value, constTrue = /* @__PURE__ */ constant(!0), constFalse = /* @__PURE__ */ constant(!1), constVoid = /* @__PURE__ */ constant(void 0);
	function memoize(f) {
		let cache = /* @__PURE__ */ new WeakMap();
		return (a) => {
			if (cache.has(a)) return cache.get(a);
			let result$2 = f(a);
			return cache.set(a, result$2), result$2;
		};
	}
	let isString = (input) => typeof input == "string", isNumber = (input) => typeof input == "number", isBoolean = (input) => typeof input == "boolean", isBigInt = (input) => typeof input == "bigint", isSymbol = (input) => typeof input == "symbol", isFunction$1 = isFunction, isObject = (input) => typeof input == "object" && !!input && !Array.isArray(input), isObjectKeyword = (input) => typeof input == "object" && !!input || isFunction$1(input), hasProperty = /* @__PURE__ */ dual(2, (self, property) => isObjectKeyword(self) && property in self), isTagged = /* @__PURE__ */ dual(2, (self, tag) => hasProperty(self, "_tag") && self._tag === tag), isDate = (input) => input instanceof Date, getAllObjectKeys = (obj) => {
		let keys$1 = new Set(Reflect.ownKeys(obj));
		if (obj.constructor === Object) return keys$1;
		obj instanceof Error && keys$1.delete("stack");
		let proto = Object.getPrototypeOf(obj), current = proto;
		for (; current !== null && current !== Object.prototype;) {
			let ownKeys = Reflect.ownKeys(current);
			for (let i = 0; i < ownKeys.length; i++) keys$1.add(ownKeys[i]);
			current = Object.getPrototypeOf(current);
		}
		return keys$1.has("constructor") && typeof obj.constructor == "function" && proto === obj.constructor.prototype && keys$1.delete("constructor"), keys$1;
	}, byReferenceInstances = /* @__PURE__ */ new WeakSet(), symbol$2 = "~effect/interfaces/Hash", hash = (self) => {
		switch (typeof self) {
			case "number": return number$2(self);
			case "bigint": return string$1(self.toString(10));
			case "boolean": return string$1(String(self));
			case "symbol": return string$1(String(self));
			case "string": return string$1(self);
			case "undefined": return string$1("undefined");
			case "function":
			case "object":
				if (self === null) return string$1("null");
				if (self instanceof Date) return string$1(self.toISOString());
				if (self instanceof RegExp) return string$1(self.toString());
				{
					if (byReferenceInstances.has(self)) return random(self);
					if (hashCache.has(self)) return hashCache.get(self);
					let h = withVisitedTracking$1(self, () => isHash(self) ? self[symbol$2]() : typeof self == "function" ? random(self) : Array.isArray(self) ? array$2(self) : self instanceof Map ? hashMap(self) : self instanceof Set ? hashSet(self) : structure(self));
					return hashCache.set(self, h), h;
				}
			default: throw Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
		}
	}, random = (self) => (randomHashCache.has(self) || randomHashCache.set(self, number$2(Math.floor(Math.random() * (2 ** 53 - 1)))), randomHashCache.get(self)), combine = /* @__PURE__ */ dual(2, (self, b) => self * 53 ^ b), optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824, isHash = (u) => hasProperty(u, symbol$2), number$2 = (n) => {
		if (n !== n) return string$1("NaN");
		if (n === Infinity) return string$1("Infinity");
		if (n === -Infinity) return string$1("-Infinity");
		let h = n | 0;
		for (h !== n && (h ^= n * 4294967295); n > 4294967295;) h ^= n /= 4294967295;
		return optimize(h);
	}, string$1 = (str) => {
		let h = 5381, i = str.length;
		for (; i;) h = h * 33 ^ str.charCodeAt(--i);
		return optimize(h);
	}, structureKeys = (o, keys$1) => {
		let h = 12289;
		for (let key of keys$1) h ^= combine(hash(key), hash(o[key]));
		return optimize(h);
	}, structure = (o) => structureKeys(o, getAllObjectKeys(o)), iterableWith = (seed, f) => (iter) => {
		let h = seed;
		for (let element of iter) h ^= f(element);
		return optimize(h);
	}, array$2 = /* @__PURE__ */ iterableWith(6151, hash), hashMap = /* @__PURE__ */ iterableWith(/* @__PURE__ */ string$1("Map"), ([k, v]) => combine(hash(k), hash(v))), hashSet = /* @__PURE__ */ iterableWith(/* @__PURE__ */ string$1("Set"), hash), randomHashCache = /* @__PURE__ */ new WeakMap(), hashCache = /* @__PURE__ */ new WeakMap(), visitedObjects = /* @__PURE__ */ new WeakSet();
	function withVisitedTracking$1(obj, fn$2) {
		if (visitedObjects.has(obj)) return string$1("[Circular]");
		visitedObjects.add(obj);
		let result$2 = fn$2();
		return visitedObjects.delete(obj), result$2;
	}
	let symbol$1 = "~effect/interfaces/Equal";
	function equals$1() {
		return arguments.length === 1 ? (self) => compareBoth(self, arguments[0]) : compareBoth(arguments[0], arguments[1]);
	}
	function compareBoth(self, that) {
		if (self === that) return !0;
		if (self == null || that == null) return !1;
		let selfType = typeof self;
		return selfType === typeof that ? selfType === "number" && self !== self && that !== that ? !0 : selfType !== "object" && selfType !== "function" || byReferenceInstances.has(self) || byReferenceInstances.has(that) ? !1 : withCache(self, that, compareObjects) : !1;
	}
	function withVisitedTracking(self, that, fn$2) {
		let hasLeft = visitedLeft.has(self), hasRight = visitedRight.has(that);
		if (hasLeft && hasRight) return !0;
		if (hasLeft || hasRight) return !1;
		visitedLeft.add(self), visitedRight.add(that);
		let result$2 = fn$2();
		return visitedLeft.delete(self), visitedRight.delete(that), result$2;
	}
	let visitedLeft = /* @__PURE__ */ new WeakSet(), visitedRight = /* @__PURE__ */ new WeakSet();
	function compareObjects(self, that) {
		if (hash(self) !== hash(that)) return !1;
		if (self instanceof Date) return that instanceof Date ? self.toISOString() === that.toISOString() : !1;
		if (self instanceof RegExp) return that instanceof RegExp ? self.toString() === that.toString() : !1;
		let selfIsEqual = isEqual(self), thatIsEqual = isEqual(that);
		if (selfIsEqual !== thatIsEqual) return !1;
		let bothEquals = selfIsEqual && thatIsEqual;
		return typeof self == "function" && !bothEquals ? !1 : withVisitedTracking(self, that, () => bothEquals ? self[symbol$1](that) : Array.isArray(self) ? !Array.isArray(that) || self.length !== that.length ? !1 : compareArrays(self, that) : self instanceof Map ? !(that instanceof Map) || self.size !== that.size ? !1 : compareMaps(self, that) : self instanceof Set ? !(that instanceof Set) || self.size !== that.size ? !1 : compareSets(self, that) : compareRecords(self, that));
	}
	function withCache(self, that, f) {
		let selfMap = equalityCache.get(self);
		if (!selfMap) selfMap = /* @__PURE__ */ new WeakMap(), equalityCache.set(self, selfMap);
		else if (selfMap.has(that)) return selfMap.get(that);
		let result$2 = f(self, that);
		selfMap.set(that, result$2);
		let thatMap = equalityCache.get(that);
		return thatMap || (thatMap = /* @__PURE__ */ new WeakMap(), equalityCache.set(that, thatMap)), thatMap.set(self, result$2), result$2;
	}
	let equalityCache = /* @__PURE__ */ new WeakMap();
	function compareArrays(self, that) {
		for (let i = 0; i < self.length; i++) if (!compareBoth(self[i], that[i])) return !1;
		return !0;
	}
	function compareRecords(self, that) {
		let selfKeys = getAllObjectKeys(self), thatKeys = getAllObjectKeys(that);
		if (selfKeys.size !== thatKeys.size) return !1;
		for (let key of selfKeys) if (!thatKeys.has(key) || !compareBoth(self[key], that[key])) return !1;
		return !0;
	}
	function makeCompareMap(keyEquivalence, valueEquivalence) {
		return function(self, that) {
			for (let [selfKey, selfValue] of self) {
				let found = !1;
				for (let [thatKey, thatValue] of that) if (keyEquivalence(selfKey, thatKey) && valueEquivalence(selfValue, thatValue)) {
					found = !0;
					break;
				}
				if (!found) return !1;
			}
			return !0;
		};
	}
	let compareMaps = /* @__PURE__ */ makeCompareMap(compareBoth, compareBoth);
	function makeCompareSet(equivalence$1) {
		return function(self, that) {
			for (let selfValue of self) {
				let found = !1;
				for (let thatValue of that) if (equivalence$1(selfValue, thatValue)) {
					found = !0;
					break;
				}
				if (!found) return !1;
			}
			return !0;
		};
	}
	let compareSets = /* @__PURE__ */ makeCompareSet(compareBoth), isEqual = (u) => hasProperty(u, symbol$1), equivalence = () => equals$1, NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom"), toJson = (input) => {
		try {
			if (hasProperty(input, "toJSON") && isFunction$1(input.toJSON) && input.toJSON.length === 0) return input.toJSON();
			if (Array.isArray(input)) return input.map(toJson);
		} catch {
			return "[toJSON threw]";
		}
		return redact(input);
	}, CIRCULAR = "[Circular]";
	function formatPropertyKey(name) {
		return isString(name) ? JSON.stringify(name) : String(name);
	}
	function formatDate(date$1) {
		try {
			return date$1.toISOString();
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
	function format(input, options) {
		let space = options?.space ?? 0, seen = /* @__PURE__ */ new WeakSet(), gap = space ? isNumber(space) ? " ".repeat(space) : space : "", ind = (d) => gap.repeat(d), wrap = (v, body) => {
			let ctor = v?.constructor;
			return ctor && ctor !== Object.prototype.constructor && ctor.name ? `${ctor.name}(${body})` : body;
		}, ownKeys = (o) => {
			try {
				return Reflect.ownKeys(o);
			} catch {
				return ["[ownKeys threw]"];
			}
		};
		function go(v, d = 0) {
			if (Array.isArray(v)) {
				if (seen.has(v)) return CIRCULAR;
				if (seen.add(v), !gap || v.length <= 1) return `[${v.map((x) => go(x, d)).join(",")}]`;
				let inner = v.map((x) => go(x, d + 1)).join(",\n" + ind(d + 1));
				return `[\n${ind(d + 1)}${inner}\n${ind(d)}]`;
			}
			if (isDate(v)) return formatDate(v);
			if (!options?.ignoreToString && hasProperty(v, "toString") && isFunction$1(v.toString) && v.toString !== Object.prototype.toString && v.toString !== Array.prototype.toString) {
				let s = safeToString(v);
				return v instanceof Error && v.cause ? `${s} (cause: ${go(v.cause, d)})` : s;
			}
			if (isString(v)) return JSON.stringify(v);
			if (isNumber(v) || v == null || isBoolean(v) || isSymbol(v)) return String(v);
			if (isBigInt(v)) return String(v) + "n";
			if (v instanceof Set || v instanceof Map) return seen.has(v) ? CIRCULAR : (seen.add(v), `${v.constructor.name}(${go(Array.from(v), d)})`);
			if (isObject(v)) {
				if (seen.has(v)) return CIRCULAR;
				seen.add(v);
				let keys$1 = ownKeys(v);
				return !gap || keys$1.length <= 1 ? wrap(v, `{${keys$1.map((k) => `${formatPropertyKey(k)}:${go(v[k], d)}`).join(",")}}`) : wrap(v, `{\n${keys$1.map((k) => `${ind(d + 1)}${formatPropertyKey(k)}: ${go(v[k], d + 1)}`).join(",\n")}\n${ind(d)}}`);
			}
			return String(v);
		}
		return go(input, 0);
	}
	let formatJson = (obj, options) => {
		let cache = [], retVal = JSON.stringify(obj, (_key, value) => typeof value == "object" && value ? cache.includes(value) ? void 0 : cache.push(value) && (isRedactable(value) ? redact(value) : value) : value, options?.space);
		return cache = void 0, retVal;
	}, symbolRedactable = /* @__PURE__ */ Symbol.for("~effect/Inspectable/redactable"), isRedactable = (u) => typeof u == "object" && !!u && symbolRedactable in u, currentFiberTypeId = "~effect/Fiber/currentFiber", redact = (u) => isRedactable(u) ? u[symbolRedactable](globalThis[currentFiberTypeId]?.services ?? emptyServiceMap$1) : u, emptyServiceMap$1 = {
		"~effect/ServiceMap": {},
		mapUnsafe: /* @__PURE__ */ new Map(),
		pipe() {
			return pipeArguments(this, arguments);
		}
	};
	Symbol.iterator;
	var SingleShotGen = class SingleShotGen {
		called = !1;
		self;
		constructor(self) {
			this.self = self;
		}
		next(a) {
			return this.called ? {
				value: a,
				done: !0
			} : (this.called = !0, {
				value: this.self,
				done: !1
			});
		}
		[Symbol.iterator]() {
			return new SingleShotGen(this.self);
		}
	};
	let InternalTypeId = "~effect/Effect/internal", standard = { [InternalTypeId]: (body) => body() }, forced = { [InternalTypeId]: (body) => {
		try {
			return body();
		} finally {}
	} }, internalCall = /* @__PURE__ */ standard[InternalTypeId](() => (/* @__PURE__ */ Error()).stack)?.includes(InternalTypeId) === !0 ? standard[InternalTypeId] : forced[InternalTypeId];
	(function* () {}).constructor;
	let EffectTypeId = "~effect/Effect/dev", ExitTypeId = "~effect/Exit/dev", effectVariance = {
		_A: identity,
		_E: identity,
		_R: identity
	}, identifier = `${EffectTypeId}/identifier`, args = `${EffectTypeId}/args`, evaluate = `${EffectTypeId}/evaluate`, contA = `${EffectTypeId}/successCont`, contE = `${EffectTypeId}/failureCont`, contAll = `${EffectTypeId}/ensureCont`, Yield = /* @__PURE__ */ Symbol.for("effect/Effect/Yield"), PipeInspectableProto = {
		pipe() {
			return pipeArguments(this, arguments);
		},
		toJSON() {
			return { ...this };
		},
		toString() {
			return format(this, { ignoreToString: !0 });
		},
		[NodeInspectSymbol]() {
			return this.toJSON();
		}
	}, StructuralProto = {
		[symbol$2]() {
			return structureKeys(this, Object.keys(this));
		},
		[symbol$1](that) {
			let selfKeys = Object.keys(this), thatKeys = Object.keys(that);
			if (selfKeys.length !== thatKeys.length) return !1;
			for (let i = 0; i < selfKeys.length; i++) if (selfKeys[i] !== thatKeys[i] && !equals$1(this[selfKeys[i]], that[selfKeys[i]])) return !1;
			return !0;
		}
	}, YieldableProto = { [Symbol.iterator]() {
		return new SingleShotGen(this);
	} }, EffectProto = {
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
	}, isEffect$1 = (u) => hasProperty(u, EffectTypeId), isExit$1 = (u) => hasProperty(u, ExitTypeId), CauseTypeId = "~effect/Cause", CauseFailureTypeId = "~effect/Cause/Failure", isCause$1 = (self) => hasProperty(self, CauseTypeId);
	var CauseImpl = class {
		[CauseTypeId];
		failures;
		constructor(failures) {
			this[CauseTypeId] = CauseTypeId, this.failures = failures;
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
	let annotationsMap = /* @__PURE__ */ new WeakMap();
	var FailureBase = class {
		[CauseFailureTypeId];
		annotations;
		_tag;
		constructor(_tag, annotations$1, originalError) {
			if (this[CauseFailureTypeId] = CauseFailureTypeId, this._tag = _tag, annotations$1 !== constEmptyAnnotations && typeof originalError == "object" && originalError && annotations$1.size > 0) {
				let prevAnnotations = annotationsMap.get(originalError);
				prevAnnotations && (annotations$1 = new Map([...prevAnnotations, ...annotations$1])), annotationsMap.set(originalError, annotations$1);
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
	let constEmptyAnnotations = /* @__PURE__ */ new Map();
	var Fail = class Fail extends FailureBase {
		error;
		constructor(error, annotations$1 = constEmptyAnnotations) {
			super("Fail", annotations$1, error), this.error = error;
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
			return options?.overwrite !== !0 && this.annotations.has(tag.key) ? this : new Fail(this.error, new Map([...this.annotations, [tag.key, value]]));
		}
		[symbol$1](that) {
			return failureIsFail$1(that) && equals$1(this.error, that.error) && equals$1(this.annotations, that.annotations);
		}
		[symbol$2]() {
			return combine(string$1(this._tag))(combine(hash(this.error))(hash(this.annotations)));
		}
	};
	let causeFromFailures = (failures) => new CauseImpl(failures), causeFail = (error) => new CauseImpl([new Fail(error)]);
	var Die = class Die extends FailureBase {
		defect;
		constructor(defect, annotations$1 = constEmptyAnnotations) {
			super("Die", annotations$1, defect), this.defect = defect;
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
			return options?.overwrite !== !0 && this.annotations.has(tag.key) ? this : new Die(this.defect, new Map([...this.annotations, [tag.key, value]]));
		}
		[symbol$1](that) {
			return failureIsDie$1(that) && equals$1(this.defect, that.defect) && equals$1(this.annotations, that.annotations);
		}
		[symbol$2]() {
			return combine(string$1(this._tag))(combine(hash(this.defect))(hash(this.annotations)));
		}
	};
	let causeDie = (defect) => new CauseImpl([new Die(defect)]), causeAnnotate = /* @__PURE__ */ dual((args$1) => isCause$1(args$1[0]), (self, key, value, options) => new CauseImpl(self.failures.map((f) => f.annotate(key, value, options)))), failureIsFail$1 = (self) => self._tag === "Fail", failureIsDie$1 = (self) => self._tag === "Die";
	function defaultEvaluate(_fiber) {
		return exitDie("Effect.evaluate: Not implemented");
	}
	let makePrimitiveProto = (options) => ({
		...EffectProto,
		[identifier]: options.op,
		[evaluate]: options[evaluate] ?? defaultEvaluate,
		[contA]: options[contA],
		[contE]: options[contE],
		[contAll]: options[contAll]
	}), makePrimitive = (options) => {
		let Proto$1 = makePrimitiveProto(options);
		return function() {
			let self = Object.create(Proto$1);
			return self[args] = options.single === !1 ? arguments : arguments[0], self;
		};
	}, makeExit = (options) => {
		let Proto$1 = {
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
			let self = Object.create(Proto$1);
			return self[args] = value, self[contA] = void 0, self[contE] = void 0, self[contAll] = void 0, self;
		};
	}, exitSucceed = /* @__PURE__ */ makeExit({
		op: "Success",
		prop: "value",
		[evaluate](fiber) {
			let cont = fiber.getCont(contA);
			return cont ? cont[contA](this[args], fiber, this) : fiber.yieldWith(this);
		}
	}), CurrentSpanKey = { key: "effect/Cause/CurrentSpan" }, InterruptorSpanKey = { key: "effect/Cause/InterruptorSpan" }, exitFailCause = /* @__PURE__ */ makeExit({
		op: "Failure",
		prop: "cause",
		[evaluate](fiber) {
			let cause = this[args], annotated = !1;
			fiber.currentSpan && fiber.currentSpan._tag === "Span" && (cause = causeAnnotate(cause, CurrentSpanKey, fiber.currentSpan), annotated = !0);
			let cont = fiber.getCont(contE);
			for (; fiber.interruptible && fiber._interruptedCause && cont;) cont = fiber.getCont(contE);
			return cont ? cont[contE](cause, fiber, annotated ? void 0 : this) : fiber.yieldWith(annotated ? this : exitFailCause(cause));
		}
	}), exitFail = (e) => exitFailCause(causeFail(e)), exitDie = (defect) => exitFailCause(causeDie(defect)), withFiber$1 = /* @__PURE__ */ makePrimitive({
		op: "WithFiber",
		[evaluate](fiber) {
			return this[args](fiber);
		}
	}), YieldableError = /* @__PURE__ */ function() {
		class YieldableError$1 extends globalThis.Error {
			asEffect() {
				return exitFail(this);
			}
		}
		return Object.assign(YieldableError$1.prototype, YieldableProto), YieldableError$1;
	}(), Error$1 = /* @__PURE__ */ function() {
		let plainArgsSymbol = /* @__PURE__ */ Symbol.for("effect/Data/Error/plainArgs");
		return class extends YieldableError {
			constructor(args$1) {
				super(args$1?.message, args$1?.cause ? { cause: args$1.cause } : void 0), args$1 && (Object.assign(this, args$1), Object.defineProperty(this, plainArgsSymbol, {
					value: args$1,
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
	}, NoSuchElementErrorTypeId$1 = "~effect/Cause/NoSuchElementError";
	var NoSuchElementError$1 = class extends TaggedError("NoSuchElementError") {
		[NoSuchElementErrorTypeId$1] = NoSuchElementErrorTypeId$1;
		constructor(message) {
			super({ message });
		}
	};
	let TypeId$11 = "~effect/data/Option", CommonProto$1 = {
		[TypeId$11]: { _A: (_) => _ },
		...PipeInspectableProto,
		...YieldableProto
	}, SomeProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
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
	}), NoneHash = /* @__PURE__ */ hash("None"), NoneProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
		_tag: "None",
		_op: "None",
		[symbol$1](that) {
			return isOption$1(that) && isNone$1(that);
		},
		[symbol$2]() {
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
		},
		asEffect() {
			return exitFail(new NoSuchElementError$1());
		}
	}), isOption$1 = (input) => hasProperty(input, TypeId$11), isNone$1 = (fa) => fa._tag === "None", isSome$1 = (fa) => fa._tag === "Some", none$1 = /* @__PURE__ */ Object.create(NoneProto), some$1 = (value) => {
		let a = Object.create(SomeProto);
		return a.value = value, a;
	};
	({
		...PipeInspectableProto,
		...YieldableProto
	});
	let none = () => none$1, some = some$1, headUnsafe = (self) => {
		let result$2 = self[Symbol.iterator]().next();
		if (result$2.done) throw Error("headUnsafe: empty iterable");
		return result$2.value;
	}, FailTypeId = "~effect/data/Filter/fail", fail$4 = (value) => ({
		[FailTypeId]: FailTypeId,
		fail: value
	}), failVoid = /* @__PURE__ */ fail$4(void 0), isFail = (u) => u === failVoid || typeof u == "object" && !!u && FailTypeId in u, isPass = (u) => !isFail(u), composePassthrough = /* @__PURE__ */ dual(2, (left, right) => (input) => {
		let leftOut = left(input);
		if (isFail(leftOut)) return fail$4(input);
		let rightOut = right(leftOut);
		return isFail(rightOut) ? fail$4(input) : rightOut;
	}), isArrayNonEmpty$1 = (self) => self.length > 0, Array$1 = globalThis.Array, fromIterable = (collection) => Array$1.isArray(collection) ? collection : Array$1.from(collection), appendAll$1 = /* @__PURE__ */ dual(2, (self, that) => fromIterable(self).concat(fromIterable(that)));
	Array$1.isArray;
	let isReadonlyArrayNonEmpty = isArrayNonEmpty$1;
	function isOutOfBounds(i, as$2) {
		return i < 0 || i >= as$2.length;
	}
	let headNonEmpty = /* @__PURE__ */ (/* @__PURE__ */ dual(2, (self, index) => {
		let i = Math.floor(index);
		if (isOutOfBounds(i, self)) throw Error(`Index out of bounds: ${i}`);
		return self[i];
	}))(0), tailNonEmpty = (self) => self.slice(1), _equivalence = /* @__PURE__ */ equivalence(), unionWith = /* @__PURE__ */ dual(3, (self, that, isEquivalent) => {
		let a = fromIterable(self), b = fromIterable(that);
		return isReadonlyArrayNonEmpty(a) ? isReadonlyArrayNonEmpty(b) ? dedupeWith(isEquivalent)(appendAll$1(a, b)) : a : b;
	}), union = /* @__PURE__ */ dual(2, (self, that) => unionWith(self, that, _equivalence)), of = (a) => [a], dedupeWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
		let input = fromIterable(self);
		if (isReadonlyArrayNonEmpty(input)) {
			let out = [headNonEmpty(input)], rest = tailNonEmpty(input);
			for (let r of rest) out.every((a) => !isEquivalent(r, a)) && out.push(r);
			return out;
		}
		return [];
	}), TypeId$9 = "~effect/time/Duration", bigint0$1 = /* @__PURE__ */ BigInt(0), bigint1e3 = /* @__PURE__ */ BigInt(1e3), DURATION_REGEX = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/, fromDurationInputUnsafe = (input) => {
		if (isDuration(input)) return input;
		if (isNumber(input)) return millis(input);
		if (isBigInt(input)) return nanos(input);
		if (Array.isArray(input) && input.length === 2 && input.every(isNumber)) return input[0] === -Infinity || input[1] === -Infinity || Number.isNaN(input[0]) || Number.isNaN(input[1]) ? zero : input[0] === Infinity || input[1] === Infinity ? infinity : nanos(BigInt(Math.round(input[0] * 1e9)) + BigInt(Math.round(input[1])));
		if (isString(input)) {
			let match$4 = DURATION_REGEX.exec(input);
			if (match$4) {
				let [_, valueStr, unit] = match$4, value = Number(valueStr);
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
		throw Error(`Invalid DurationInput: ${input}`);
	}, zeroDurationValue = {
		_tag: "Millis",
		millis: 0
	}, infinityDurationValue = { _tag: "Infinity" }, DurationProto = {
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
	}, make$5 = (input) => {
		let duration = Object.create(DurationProto);
		return isNumber(input) ? isNaN(input) || input <= 0 ? duration.value = zeroDurationValue : Number.isFinite(input) ? Number.isInteger(input) ? duration.value = {
			_tag: "Millis",
			millis: input
		} : duration.value = {
			_tag: "Nanos",
			nanos: BigInt(Math.round(input * 1e6))
		} : duration.value = infinityDurationValue : input <= bigint0$1 ? duration.value = zeroDurationValue : duration.value = {
			_tag: "Nanos",
			nanos: input
		}, duration;
	}, isDuration = (u) => hasProperty(u, TypeId$9), zero = /* @__PURE__ */ make$5(0), infinity = /* @__PURE__ */ make$5(Infinity), nanos = (nanos$1) => make$5(nanos$1), micros = (micros$1) => make$5(micros$1 * bigint1e3), millis = (millis$1) => make$5(millis$1), seconds = (seconds$1) => make$5(seconds$1 * 1e3), minutes = (minutes$1) => make$5(minutes$1 * 6e4), hours = (hours$1) => make$5(hours$1 * 36e5), days = (days$1) => make$5(days$1 * 864e5), weeks = (weeks$1) => make$5(weeks$1 * 6048e5), toMillis = (self) => match$3(self, {
		onMillis: identity,
		onNanos: (nanos$1) => Number(nanos$1) / 1e6,
		onInfinity: () => Infinity
	}), toNanosUnsafe = (self) => {
		switch (self.value._tag) {
			case "Infinity": throw Error("Cannot convert infinite duration to nanos");
			case "Nanos": return self.value.nanos;
			case "Millis": return BigInt(Math.round(self.value.millis * 1e6));
		}
	}, match$3 = /* @__PURE__ */ dual(2, (self, options) => {
		switch (self.value._tag) {
			case "Millis": return options.onMillis(self.value.millis);
			case "Nanos": return options.onNanos(self.value.nanos);
			case "Infinity": return options.onInfinity();
		}
	}), matchPair = /* @__PURE__ */ dual(3, (self, that, options) => self.value._tag === "Infinity" || that.value._tag === "Infinity" ? options.onInfinity(self, that) : self.value._tag === "Millis" ? that.value._tag === "Millis" ? options.onMillis(self.value.millis, that.value.millis) : options.onNanos(toNanosUnsafe(self), that.value.nanos) : options.onNanos(self.value.nanos, toNanosUnsafe(that))), Equivalence = (self, that) => matchPair(self, that, {
		onMillis: (self$1, that$1) => self$1 === that$1,
		onNanos: (self$1, that$1) => self$1 === that$1,
		onInfinity: (self$1, that$1) => self$1.value._tag === that$1.value._tag
	}), equals = /* @__PURE__ */ dual(2, (self, that) => Equivalence(self, that)), Service = function() {
		let prevLimit = Error.stackTraceLimit;
		Error.stackTraceLimit = 2;
		let err = /* @__PURE__ */ Error();
		Error.stackTraceLimit = prevLimit;
		function KeyClass() {}
		let self = KeyClass;
		return Object.setPrototypeOf(self, ServiceProto), Object.defineProperty(self, "stack", { get() {
			return err.stack;
		} }), arguments.length > 0 ? (self.key = arguments[0], arguments[1]?.defaultValue && (self[ReferenceTypeId] = ReferenceTypeId, self.defaultValue = arguments[1].defaultValue), self) : function(key, options) {
			return self.key = key, options?.make && (self.make = options.make), self;
		};
	}, ServiceProto = {
		"~effect/ServiceMap/Service": {
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
	}, ReferenceTypeId = "~effect/ServiceMap/Reference", TypeId$8 = "~effect/ServiceMap", makeUnsafe$2 = (mapUnsafe) => {
		let self = Object.create(Proto);
		return self.mapUnsafe = mapUnsafe, self;
	}, Proto = {
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
			if (!isServiceMap(that) || this.mapUnsafe.size !== that.mapUnsafe.size) return !1;
			for (let k of this.mapUnsafe.keys()) if (!that.mapUnsafe.has(k) || !equals$1(this.mapUnsafe.get(k), that.mapUnsafe.get(k))) return !1;
			return !0;
		},
		[symbol$2]() {
			return number$2(this.mapUnsafe.size);
		}
	}, isServiceMap = (u) => hasProperty(u, TypeId$8), isReference = (u) => hasProperty(u, ReferenceTypeId), empty$3 = () => emptyServiceMap, emptyServiceMap = /* @__PURE__ */ makeUnsafe$2(/* @__PURE__ */ new Map()), make$4 = (key, service$2) => makeUnsafe$2(new Map([[key.key, service$2]])), add = /* @__PURE__ */ dual(3, (self, key, service$2) => {
		let map$5 = new Map(self.mapUnsafe);
		return map$5.set(key.key, service$2), makeUnsafe$2(map$5);
	}), addOrOmit = /* @__PURE__ */ dual(3, (self, key, service$2) => {
		let map$5 = new Map(self.mapUnsafe);
		return service$2._tag === "None" ? map$5.delete(key.key) : map$5.set(key.key, service$2.value), makeUnsafe$2(map$5);
	}), get = /* @__PURE__ */ dual(2, (self, service$2) => {
		if (!self.mapUnsafe.has(service$2.key)) {
			if (ReferenceTypeId in service$2) return getDefaultValue(service$2);
			throw serviceNotFoundError(service$2);
		}
		return self.mapUnsafe.get(service$2.key);
	}), getReferenceUnsafe = (self, service$2) => self.mapUnsafe.has(service$2.key) ? self.mapUnsafe.get(service$2.key) : getDefaultValue(service$2), defaultValueCacheKey = "~effect/ServiceMap/defaultValue", getDefaultValue = (ref) => defaultValueCacheKey in ref ? ref[defaultValueCacheKey] : ref[defaultValueCacheKey] = ref.defaultValue(), serviceNotFoundError = (service$2) => {
		let error = /* @__PURE__ */ Error(`Service not found${service$2.key ? `: ${String(service$2.key)}` : ""}`);
		if (service$2.stack) {
			let lines = service$2.stack.split("\n");
			if (lines.length > 2) {
				let afterAt = lines[2].match(/at (.*)/);
				afterAt && (error.message += ` (defined at ${afterAt[1]})`);
			}
		}
		if (error.stack) {
			let lines = error.stack.split("\n");
			lines.splice(1, 3), error.stack = lines.join("\n");
		}
		return error;
	}, getOption = /* @__PURE__ */ dual(2, (self, service$2) => self.mapUnsafe.has(service$2.key) ? some(self.mapUnsafe.get(service$2.key)) : isReference(service$2) ? some(getDefaultValue(service$2)) : none()), merge$1 = /* @__PURE__ */ dual(2, (self, that) => {
		if (self.mapUnsafe.size === 0) return that;
		if (that.mapUnsafe.size === 0) return self;
		let map$5 = new Map(self.mapUnsafe);
		return that.mapUnsafe.forEach((value, key) => map$5.set(key, value)), makeUnsafe$2(map$5);
	}), Reference = Service, Scheduler = /* @__PURE__ */ Reference("effect/Scheduler", { defaultValue: () => new MixedScheduler() }), setImmediate = "setImmediate" in globalThis ? (f) => {
		let timer = globalThis.setImmediate(f);
		return () => globalThis.clearImmediate(timer);
	} : (f) => {
		let timer = setTimeout(f, 0);
		return () => clearTimeout(timer);
	};
	var MixedScheduler = class {
		tasks = [];
		running = void 0;
		executionMode;
		constructor(executionMode = "async") {
			this.executionMode = executionMode;
		}
		scheduleTask(task, _priority) {
			this.tasks.push(task), this.running === void 0 && (this.running = setImmediate(this.afterScheduled));
		}
		afterScheduled = () => {
			this.running = void 0, this.runTasks();
		};
		runTasks() {
			let tasks = this.tasks;
			this.tasks = [];
			for (let i = 0, len = tasks.length; i < len; i++) tasks[i]();
		}
		shouldYield(fiber) {
			return fiber.currentOpCount >= fiber.maxOpsBeforeYield;
		}
		flush() {
			for (; this.tasks.length > 0;) this.running !== void 0 && (this.running(), this.running = void 0), this.runTasks();
		}
	};
	let MaxOpsBeforeYield = /* @__PURE__ */ Reference("effect/Scheduler/MaxOpsBeforeYield", { defaultValue: () => 2048 }), ParentSpanKey = "effect/Tracer/ParentSpan";
	Service()(ParentSpanKey);
	let DisablePropagation = /* @__PURE__ */ Reference("effect/Tracer/DisablePropagation", { defaultValue: constFalse }), CurrentConcurrency = /* @__PURE__ */ Reference("effect/References/CurrentConcurrency", { defaultValue: () => "unbounded" });
	var Interrupt = class Interrupt extends FailureBase {
		fiberId;
		constructor(fiberId, annotations$1 = constEmptyAnnotations) {
			super("Interrupt", annotations$1, "Interrupted"), this.fiberId = fiberId;
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
			return options?.overwrite !== !0 && this.annotations.has(key.key) ? this : new Interrupt(this.fiberId, new Map([...this.annotations, [key.key, value]]));
		}
		[symbol$1](that) {
			return failureIsInterrupt$1(that) && this.fiberId === that.fiberId && this.annotations === that.annotations;
		}
		[symbol$2]() {
			return combine(string$1(`${this._tag}:${this.fiberId}`))(random(this.annotations));
		}
	};
	let causeInterrupt = (fiberId) => new CauseImpl([new Interrupt(fiberId)]), causeFilterError = (self) => {
		for (let i = 0; i < self.failures.length; i++) {
			let failure = self.failures[i];
			if (failure._tag === "Fail") return failure.error;
		}
		return fail$4(self);
	}, causeHasInterrupt = (self) => self.failures.some(failureIsInterrupt$1), failureIsInterrupt$1 = (self) => isTagged(self, "Interrupt"), causeMerge = /* @__PURE__ */ dual(2, (self, that) => {
		let newCause = new CauseImpl(union(self.failures, that.failures));
		return equals$1(self, newCause) ? self : newCause;
	}), causePartition = (self) => {
		let obj = {
			Fail: [],
			Die: [],
			Interrupt: []
		};
		for (let i = 0; i < self.failures.length; i++) obj[self.failures[i]._tag].push(self.failures[i]);
		return obj;
	}, causeSquash = (self) => {
		let partitioned = causePartition(self);
		return partitioned.Fail.length > 0 ? partitioned.Fail[0].error : partitioned.Die.length > 0 ? partitioned.Die[0].defect : partitioned.Interrupt.length > 0 ? new globalThis.Error("All fibers interrupted without error") : new globalThis.Error("Empty cause");
	}, causePrettyError = (original, annotations$1) => {
		let kind = typeof original, error;
		if (original && kind === "object") {
			if (error = new globalThis.Error(causePrettyMessage(original), { cause: original.cause ? causePrettyError(original.cause) : void 0 }), typeof original.name == "string" && (error.name = original.name), typeof original.stack == "string") error.stack = cleanErrorStack(original.stack, error, annotations$1);
			else {
				let stack = `${error.name}: ${error.message}`;
				error.stack = annotations$1 ? addStackAnnotations(stack, annotations$1) : stack;
			}
			for (let key of Object.keys(original)) key in error || (error[key] = original[key]);
		} else error = new globalThis.Error(original ? kind === "string" ? original : formatJson(original) : `Unknown error: ${original}`);
		return error;
	}, causePrettyMessage = (u) => {
		if (typeof u.message == "string") return u.message;
		if (typeof u.toString == "function" && u.toString !== Object.prototype.toString && u.toString !== Array.prototype.toString) try {
			return u.toString();
		} catch {}
		return formatJson(u);
	}, locationRegex = /\((.*)\)/g, cleanErrorStack = (stack, error, annotations$1) => {
		let message = `${error.name}: ${error.message}`, lines = (stack.startsWith(message) ? stack.slice(message.length) : stack).split("\n"), out = [message];
		for (let i = 1; i < lines.length && !/(?:Generator\.next|~effect\/Effect)/.test(lines[i]); i++) out.push(lines[i]);
		return annotations$1 ? addStackAnnotations(out.join("\n"), annotations$1) : out.join("\n");
	}, addStackAnnotations = (stack, annotations$1) => {
		let callsiteStack = annotations$1?.get(callsiteErrorKey.key)?.stack;
		callsiteStack && (stack = `${stack}\n${callsiteStack.split("\n")[2]}`);
		let defStack = annotations$1?.get(defErrorKey.key)?.stack;
		defStack && (stack = `${stack}\n${defStack.split("\n")[2]}`);
		let span = annotations$1?.get(CurrentSpanKey.key);
		return span && (stack = `${stack}\n${currentSpanStack(span)}`), stack;
	}, currentSpanStack = (span) => {
		let out = [], current = span, i = 0;
		for (; current && current._tag === "Span" && i < 10;) {
			let stack = spanToTrace.get(current)?.();
			if (stack) {
				let locationMatchAll = stack.matchAll(locationRegex), match$4 = !1;
				for (let [, location] of locationMatchAll) match$4 = !0, out.push(`    at ${current.name} (${location})`);
				match$4 || out.push(`    at ${current.name} (${stack.replace(/^at /, "")})`);
			} else out.push(`    at ${current.name}`);
			current = current.parent, i++;
		}
		return out.join("\n");
	}, renderErrorCause = (cause, prefix) => {
		let lines = cause.stack.split("\n"), stack = `${prefix}[cause]: ${lines[0]}`;
		for (let i = 1, len = lines.length; i < len; i++) stack += `\n${prefix}${lines[i]}`;
		return cause.cause && (stack += ` {\n${renderErrorCause(cause.cause, `${prefix}  `)}\n${prefix}}`), stack;
	}, FiberTypeId = "~effect/Fiber/dev", fiberVariance = {
		_A: identity,
		_E: identity
	}, fiberIdStore = { id: 0 }, getCurrentFiber = () => globalThis[currentFiberTypeId], keepAlive = /* @__PURE__ */ (() => {
		let count = 0, running;
		return {
			increment() {
				count++, running ??= globalThis.setInterval(constVoid, 2147483647);
			},
			decrement() {
				count--, count === 0 && running !== void 0 && (globalThis.clearInterval(running), running = void 0);
			}
		};
	})();
	var FiberImpl = class {
		constructor(services$2, interruptible$2 = !0) {
			this[FiberTypeId] = fiberVariance, this.setServices(services$2), this.id = ++fiberIdStore.id, this.currentOpCount = 0, this.currentLoopCount = 0, this.interruptible = interruptible$2, this._stack = [], this._observers = [], this._exit = void 0, this._children = void 0, this._interruptedCause = void 0, this._yielded = void 0;
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
			return this._exit ? (cb(this._exit), constVoid) : (this._observers.push(cb), () => {
				let index = this._observers.indexOf(cb);
				index >= 0 && this._observers.splice(index, 1);
			});
		}
		interruptUnsafe(fiberId, span) {
			if (this._exit) return;
			let cause = causeInterrupt(fiberId);
			this.currentSpanLocal && (cause = causeAnnotate(cause, CurrentSpanKey, this.currentSpan)), span && (cause = causeAnnotate(cause, InterruptorSpanKey, span)), this._interruptedCause = this._interruptedCause ? causeMerge(this._interruptedCause, cause) : cause, this.interruptible && this.evaluate(failCause$3(this._interruptedCause));
		}
		pollUnsafe() {
			return this._exit;
		}
		evaluate(effect) {
			if (this.runtimeMetrics?.recordFiberStart(this.services), this._exit) return;
			if (this._yielded !== void 0) {
				let yielded = this._yielded;
				this._yielded = void 0, yielded();
			}
			let exit$2 = this.runLoop(effect);
			if (exit$2 === Yield) return;
			let interruptChildren = fiberMiddleware.interruptChildren && fiberMiddleware.interruptChildren(this);
			if (interruptChildren !== void 0) return this.evaluate(flatMap$3(interruptChildren, () => exit$2));
			this._exit = exit$2, this.runtimeMetrics?.recordFiberEnd(this.services, this._exit);
			for (let i = 0; i < this._observers.length; i++) this._observers[i](exit$2);
			this._observers.length = 0;
		}
		runLoop(effect) {
			let prevFiber = globalThis[currentFiberTypeId];
			globalThis[currentFiberTypeId] = this;
			let yielding = !1, current = effect;
			this.currentOpCount = 0;
			let currentLoop = ++this.currentLoopCount;
			try {
				for (;;) {
					if (this.currentOpCount++, !yielding && this.currentScheduler.shouldYield(this)) {
						yielding = !0;
						let prev = current;
						current = flatMap$3(yieldNow$1, () => prev);
					}
					if (current = this.currentTracerContext ? this.currentTracerContext(() => current[evaluate](this), this) : current[evaluate](this), currentLoop !== this.currentLoopCount) return Yield;
					if (current === Yield) {
						let yielded = this._yielded;
						return ExitTypeId in yielded ? (this._yielded = void 0, yielded) : Yield;
					}
				}
			} catch (error) {
				return hasProperty(current, evaluate) ? this.runLoop(exitDie(error)) : exitDie(`Fiber.runLoop: Not a valid effect: ${String(current)}`);
			} finally {
				globalThis[currentFiberTypeId] = prevFiber;
			}
		}
		getCont(symbol$3) {
			for (;;) {
				let op = this._stack.pop();
				if (!op) return;
				let cont = op[contAll] && op[contAll](this);
				if (cont) return { [symbol$3]: cont };
				if (op[symbol$3]) return op;
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
		setServices(services$2) {
			this.services = services$2, this.currentScheduler = this.getRef(Scheduler), this.currentSpan = services$2.mapUnsafe.get(ParentSpanKey), this.maxOpsBeforeYield = this.getRef(MaxOpsBeforeYield), this.runtimeMetrics = services$2.mapUnsafe.get("effect/observability/Metric/FiberRuntimeMetricsKey");
			let currentTracer = services$2.mapUnsafe.get("effect/Tracer");
			this.currentTracerContext = currentTracer ? currentTracer.context : void 0;
		}
		get currentSpanLocal() {
			return this.currentSpan?._tag === "Span" ? this.currentSpan : void 0;
		}
	};
	let fiberMiddleware = { interruptChildren: void 0 }, fiberInterruptChildren = (fiber) => {
		if (!(fiber._children === void 0 || fiber._children.size === 0)) return fiberInterruptAll(fiber._children);
	}, fiberAwait = (self) => {
		let impl = self;
		return impl._exit ? succeed$4(impl._exit) : callback$2((resume) => impl._exit ? resume(succeed$4(impl._exit)) : sync$1(self.addObserver((exit$2) => resume(succeed$4(exit$2)))));
	}, fiberAwaitAll = (self) => callback$2((resume) => {
		let iter = self[Symbol.iterator](), exits = [], cancel;
		function loop() {
			let result$2 = iter.next();
			for (; !result$2.done;) {
				if (result$2.value._exit) {
					exits.push(result$2.value._exit), result$2 = iter.next();
					continue;
				}
				cancel = result$2.value.addObserver((exit$2) => {
					exits.push(exit$2), loop();
				});
				return;
			}
			resume(succeed$4(exits));
		}
		return loop(), sync$1(() => cancel?.());
	}), fiberJoin = (self) => {
		let impl = self;
		return impl._exit ? impl._exit : callback$2((resume) => impl._exit ? resume(impl._exit) : sync$1(self.addObserver(resume)));
	}, fiberInterrupt = (self) => withFiber$1((fiber) => fiberInterruptAs(self, fiber.id)), fiberInterruptAs = /* @__PURE__ */ dual(2, (self, fiberId) => withFiber$1((parent) => (self.interruptUnsafe(fiberId, parent.currentSpanLocal), asVoid$2(fiberAwait(self))))), fiberInterruptAll = (fibers) => withFiber$1((parent) => {
		let span = parent.currentSpanLocal;
		for (let fiber of fibers) fiber.interruptUnsafe(parent.id, span);
		return asVoid$2(fiberAwaitAll(fibers));
	}), succeed$4 = exitSucceed, failCause$3 = exitFailCause, fail$3 = exitFail, sync$1 = /* @__PURE__ */ makePrimitive({
		op: "Sync",
		[evaluate](fiber) {
			let value = this[args](), cont = fiber.getCont(contA);
			return cont ? cont[contA](value, fiber) : fiber.yieldWith(exitSucceed(value));
		}
	}), suspend$3 = /* @__PURE__ */ makePrimitive({
		op: "Suspend",
		[evaluate](_fiber) {
			return this[args]();
		}
	}), yieldNow$1 = /* @__PURE__ */ (/* @__PURE__ */ makePrimitive({
		op: "Yield",
		[evaluate](fiber) {
			let resumed = !1;
			return fiber.currentScheduler.scheduleTask(() => {
				resumed || fiber.evaluate(exitVoid);
			}, this[args] ?? 0), fiber.yieldWith(() => {
				resumed = !0;
			});
		}
	}))(0), succeedNone$1 = /* @__PURE__ */ succeed$4(/* @__PURE__ */ none()), die$3 = (defect) => exitDie(defect), void_$2 = /* @__PURE__ */ succeed$4(void 0), promise$1 = (evaluate$1) => callbackOptions(function(resume, signal) {
		internalCall(() => evaluate$1(signal)).then((a) => resume(succeed$4(a)), (e) => resume(die$3(e)));
	}, evaluate$1.length !== 0), withFiberId = (f) => withFiber$1((fiber) => f(fiber.id)), callbackOptions = /* @__PURE__ */ makePrimitive({
		op: "Async",
		single: !1,
		[evaluate](fiber) {
			let register = internalCall(() => this[args][0].bind(fiber.currentScheduler)), resumed = !1, yielded = !1, controller = this[args][1] ? new AbortController() : void 0, onCancel = register((effect) => {
				resumed || (resumed = !0, yielded ? fiber.evaluate(effect) : yielded = effect);
			}, controller?.signal);
			return yielded === !1 ? (yielded = !0, keepAlive.increment(), fiber._yielded = () => {
				resumed = !0, keepAlive.decrement();
			}, controller === void 0 && onCancel === void 0 || fiber._stack.push(asyncFinalizer(() => (resumed = !0, controller?.abort(), onCancel ?? exitVoid))), Yield) : yielded;
		}
	}), asyncFinalizer = /* @__PURE__ */ makePrimitive({
		op: "AsyncFinalizer",
		[contAll](fiber) {
			fiber.interruptible && (fiber.interruptible = !1, fiber._stack.push(setInterruptibleTrue));
		},
		[contE](cause, _fiber) {
			return causeHasInterrupt(cause) ? flatMap$3(this[args](), () => failCause$3(cause)) : failCause$3(cause);
		}
	}), callback$2 = (register) => callbackOptions(register, register.length >= 2), gen$1 = (...args$1) => suspend$3(() => fromIteratorUnsafe(args$1.length === 1 ? args$1[0]() : args$1[1].call(args$1[0]))), fnUntraced$1 = (body, ...pipeables) => pipeables.length === 0 ? function() {
		return suspend$3(() => fromIteratorUnsafe(body.apply(this, arguments)));
	} : function() {
		let effect = suspend$3(() => fromIteratorUnsafe(body.apply(this, arguments)));
		for (let pipeable of pipeables) effect = pipeable(effect, ...arguments);
		return effect;
	}, defErrorKey = /* @__PURE__ */ Service("effect/Cause/FnDefinitionTrace"), callsiteErrorKey = /* @__PURE__ */ Service("effect/Cause/FnCallsiteTrace"), fromIteratorUnsafe = /* @__PURE__ */ makePrimitive({
		op: "Iterator",
		single: !1,
		[contA](value, fiber) {
			let iter = this[args][0];
			for (;;) {
				let state = iter.next(value);
				if (state.done) return succeed$4(state.value);
				let eff = state.value.asEffect();
				if (effectIsExit(eff)) {
					if (eff._tag === "Failure") return eff;
				} else return fiber._stack.push(this), eff;
				value = eff.value;
			}
		},
		[evaluate](fiber) {
			return this[contA](this[args][1], fiber);
		}
	}), as$1 = /* @__PURE__ */ dual(2, (self, value) => {
		let b = succeed$4(value);
		return flatMap$3(self, (_) => b);
	}), asSome$1 = (self) => map$4(self, some), andThen$1 = /* @__PURE__ */ dual(2, (self, f) => flatMap$3(self, (a) => {
		if (isEffect$1(f)) return f;
		let value = typeof f == "function" ? internalCall(() => f(a)) : f;
		return isEffect$1(value) ? value : succeed$4(value);
	})), tap$3 = /* @__PURE__ */ dual(2, (self, f) => flatMap$3(self, (a) => {
		let value = isEffect$1(f) ? f : typeof f == "function" ? internalCall(() => f(a)) : f;
		return isEffect$1(value) ? as$1(value, a) : succeed$4(a);
	})), asVoid$2 = (self) => flatMap$3(self, (_) => exitVoid), flatMap$3 = /* @__PURE__ */ dual(2, (self, f) => {
		let onSuccess = Object.create(OnSuccessProto);
		return onSuccess[args] = self, onSuccess[contA] = f.length === 1 ? f : (a) => f(a), onSuccess;
	}), OnSuccessProto = /* @__PURE__ */ makePrimitiveProto({
		op: "OnSuccess",
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args];
		}
	}), effectIsExit = (effect) => ExitTypeId in effect, flatMapEager$1 = /* @__PURE__ */ dual(2, (self, f) => effectIsExit(self) ? self._tag === "Success" ? f(self.value) : self : flatMap$3(self, f)), flatten$2 = (self) => flatMap$3(self, identity), map$4 = /* @__PURE__ */ dual(2, (self, f) => flatMap$3(self, (a) => succeed$4(internalCall(() => f(a))))), exitInterrupt$1 = (fiberId) => exitFailCause(causeInterrupt(fiberId)), exitIsSuccess = (self) => self._tag === "Success", exitFilterCause = (self) => self._tag === "Failure" ? self.cause : fail$4(self), exitVoid = /* @__PURE__ */ exitSucceed(void 0), exitZipRight = /* @__PURE__ */ dual(2, (self, that) => exitIsSuccess(self) ? that : self), exitAsVoidAll = (exits) => {
		let failures = [];
		for (let exit$2 of exits) exit$2._tag === "Failure" && failures.push(...exit$2.cause.failures);
		return failures.length === 0 ? exitVoid : exitFailCause(causeFromFailures(failures));
	}, updateServices$1 = /* @__PURE__ */ dual(2, (self, f) => withFiber$1((fiber) => {
		let prev = fiber.services;
		fiber.setServices(f(prev));
		let newServices = /* @__PURE__ */ new Map();
		for (let [key, value] of fiber.services.mapUnsafe) (!prev.mapUnsafe.has(key) || value !== prev.mapUnsafe.get(key)) && newServices.set(key, value);
		return onExit$1(self, () => {
			let map$5 = new Map(fiber.services.mapUnsafe);
			for (let [key, value] of newServices) value === map$5.get(key) && (prev.mapUnsafe.has(key) ? map$5.set(key, prev.mapUnsafe.get(key)) : map$5.delete(key));
			fiber.setServices(makeUnsafe$2(map$5));
		});
	})), services$1 = () => getServiceMap, getServiceMap = /* @__PURE__ */ withFiber$1((fiber) => succeed$4(fiber.services)), servicesWith$1 = (f) => withFiber$1((fiber) => f(fiber.services)), provideServices$1 = /* @__PURE__ */ dual(2, (self, services$2) => effectIsExit(self) ? self : updateServices$1(self, merge$1(services$2))), provideService$1 = function() {
		return arguments.length === 1 ? dual(2, (self, impl) => provideServiceImpl(self, arguments[0], impl)) : dual(3, (self, service$2, impl) => provideServiceImpl(self, service$2, impl)).apply(this, arguments);
	}, provideServiceImpl = (self, service$2, implementation) => withFiber$1((fiber) => {
		let prev = getOption(fiber.services, service$2);
		return fiber.setServices(add(fiber.services, service$2, implementation)), onExit$1(self, () => fiber.setServices(addOrOmit(fiber.services, service$2, prev)));
	}), forever$2 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, options) => whileLoop$1({
		while: constTrue,
		body: constant(options?.autoYield ? flatMap$3(self, (_) => yieldNow$1) : self),
		step: constVoid
	})), catchCause$1 = /* @__PURE__ */ dual(2, (self, f) => {
		let onFailure = Object.create(OnFailureProto);
		return onFailure[args] = self, onFailure[contE] = f.length === 1 ? f : (cause) => f(cause), onFailure;
	}), OnFailureProto = /* @__PURE__ */ makePrimitiveProto({
		op: "OnFailure",
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args];
		}
	}), catchCauseFilter$1 = /* @__PURE__ */ dual(3, (self, filter$2, f) => catchCause$1(self, (cause) => {
		let eb = filter$2(cause);
		return isFail(eb) ? failCause$3(eb.fail) : internalCall(() => f(eb, cause));
	})), matchCauseEffect$1 = /* @__PURE__ */ dual(2, (self, options) => {
		let primitive = Object.create(OnSuccessAndFailureProto);
		return primitive[args] = self, primitive[contA] = options.onSuccess.length === 1 ? options.onSuccess : (a) => options.onSuccess(a), primitive[contE] = options.onFailure.length === 1 ? options.onFailure : (cause) => options.onFailure(cause), primitive;
	}), OnSuccessAndFailureProto = /* @__PURE__ */ makePrimitiveProto({
		op: "OnSuccessAndFailure",
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args];
		}
	}), exit$1 = (self) => effectIsExit(self) ? exitSucceed(self) : exitPrimitive(self), exitPrimitive = /* @__PURE__ */ makePrimitive({
		op: "Exit",
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args];
		},
		[contA](value, _, exit$2) {
			return succeed$4(exit$2 ?? exitSucceed(value));
		},
		[contE](cause, _, exit$2) {
			return succeed$4(exit$2 ?? exitFailCause(cause));
		}
	}), ScopeTypeId = "~effect/Scope", ScopeCloseableTypeId = "~effect/Scope/Closeable", scopeTag = /* @__PURE__ */ Service("effect/Scope"), scopeClose = (self, exit_) => suspend$3(() => scopeCloseUnsafe(self, exit_) ?? void_$2), scopeCloseUnsafe = (self, exit_) => {
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
	}, scopeCloseFinalizers = /* @__PURE__ */ fnUntraced$1(function* (self, finalizers, exit_) {
		let exits = [], fibers = [], arr = Array.from(finalizers.values()), parent = getCurrentFiber();
		for (let i = arr.length - 1; i >= 0; i--) {
			let finalizer = arr[i];
			self.strategy === "sequential" ? exits.push(yield* exit$1(finalizer(exit_))) : fibers.push(forkUnsafe$1(parent, finalizer(exit_), !0, !0, "inherit"));
		}
		return fibers.length > 0 && (exits = yield* fiberAwaitAll(fibers)), yield* exitAsVoidAll(exits);
	}), scopeForkUnsafe = (scope$2, finalizerStrategy) => {
		let newScope = scopeMakeUnsafe(finalizerStrategy);
		if (scope$2.state._tag === "Closed") return newScope.state = scope$2.state, newScope;
		let key = {};
		return scopeAddFinalizerUnsafe(scope$2, key, (exit$2) => scopeClose(newScope, exit$2)), scopeAddFinalizerUnsafe(newScope, key, (_) => sync$1(() => scopeRemoveFinalizerUnsafe(scope$2, key))), newScope;
	}, scopeAddFinalizerExit = (scope$2, finalizer) => suspend$3(() => scope$2.state._tag === "Closed" ? finalizer(scope$2.state.exit) : (scopeAddFinalizerUnsafe(scope$2, {}, finalizer), void_$2)), scopeAddFinalizer = (scope$2, finalizer) => scopeAddFinalizerExit(scope$2, constant(finalizer)), scopeAddFinalizerUnsafe = (scope$2, key, finalizer) => {
		scope$2.state._tag === "Empty" ? scope$2.state = {
			_tag: "Open",
			finalizers: new Map([[key, finalizer]])
		} : scope$2.state._tag === "Open" && scope$2.state.finalizers.set(key, finalizer);
	}, scopeRemoveFinalizerUnsafe = (scope$2, key) => {
		scope$2.state._tag === "Open" && scope$2.state.finalizers.delete(key);
	}, scopeMakeUnsafe = (finalizerStrategy = "sequential") => ({
		[ScopeCloseableTypeId]: ScopeCloseableTypeId,
		[ScopeTypeId]: ScopeTypeId,
		strategy: finalizerStrategy,
		state: constScopeEmpty
	}), constScopeEmpty = { _tag: "Empty" }, scope$1 = /* @__PURE__ */ scopeTag.asEffect(), provideScope = /* @__PURE__ */ provideService$1(scopeTag), addFinalizer$2 = (finalizer) => flatMap$3(scope$1, (scope$2) => servicesWith$1((services$2) => scopeAddFinalizerExit(scope$2, (exit$2) => provideServices$1(finalizer(exit$2), services$2)))), onExit$1 = /* @__PURE__ */ dual(2, /* @__PURE__ */ makePrimitive({
		op: "OnExit",
		single: !1,
		[evaluate](fiber) {
			return fiber._stack.push(this), this[args][0];
		},
		[contAll](fiber) {
			fiber.interruptible && this[args][2] !== !0 && (fiber._stack.push(setInterruptibleTrue), fiber.interruptible = !1);
		},
		[contA](value, _, exit$2) {
			exit$2 ??= exitSucceed(value);
			let eff = this[args][1](exit$2);
			return isEffect$1(eff) ? flatMap$3(eff, (_$1) => exit$2) : exit$2;
		},
		[contE](cause, _, exit$2) {
			exit$2 ??= exitFailCause(cause);
			let eff = this[args][1](exit$2);
			return isEffect$1(eff) ? flatMap$3(eff, (_$1) => exit$2) : exit$2;
		}
	})), ensuring$1 = /* @__PURE__ */ dual(2, (self, finalizer) => onExit$1(self, (_) => finalizer)), onExitFilter$1 = /* @__PURE__ */ dual(3, (self, filter$2, f) => onExit$1(self, (exit$2) => {
		let b = filter$2(exit$2);
		return isFail(b) ? void 0 : f(b, exit$2);
	})), onError$1 = /* @__PURE__ */ dual(2, (self, f) => onExitFilter$1(self, exitFilterCause, f)), cachedInvalidateWithTTL$1 = /* @__PURE__ */ dual(2, (self, ttl) => sync$1(() => {
		let ttlMillis = toMillis(fromDurationInputUnsafe(ttl)), isFinite = Number.isFinite(ttlMillis), latch = makeLatchUnsafe$1(!1), expiresAt = 0, running = !1, exit$2, wait = flatMap$3(latch.await, () => exit$2);
		return [withFiber$1((fiber) => {
			let now = isFinite ? fiber.getRef(ClockRef).currentTimeMillisUnsafe() : 0;
			return running || now < expiresAt ? exit$2 ?? wait : (running = !0, latch.closeUnsafe(), exit$2 = void 0, onExit$1(self, (exit_) => {
				running = !1, expiresAt = now + ttlMillis, exit$2 = exit_, latch.openUnsafe();
			}));
		}), sync$1(() => {
			expiresAt = 0, latch.closeUnsafe(), exit$2 = void 0;
		})];
	})), cachedWithTTL$1 = /* @__PURE__ */ dual(2, (self, timeToLive) => map$4(cachedInvalidateWithTTL$1(self, timeToLive), (tuple) => tuple[0])), cached$1 = (self) => cachedWithTTL$1(self, infinity), setInterruptible = /* @__PURE__ */ makePrimitive({
		op: "SetInterruptible",
		[contAll](fiber) {
			if (fiber.interruptible = this[args], fiber._interruptedCause && fiber.interruptible) return () => failCause$3(fiber._interruptedCause);
		}
	}), setInterruptibleTrue = /* @__PURE__ */ setInterruptible(!0), setInterruptibleFalse = /* @__PURE__ */ setInterruptible(!1), interruptible$1 = (self) => withFiber$1((fiber) => fiber.interruptible ? self : (fiber.interruptible = !0, fiber._stack.push(setInterruptibleFalse), fiber._interruptedCause ? failCause$3(fiber._interruptedCause) : self)), uninterruptibleMask$1 = (f) => withFiber$1((fiber) => fiber.interruptible ? (fiber.interruptible = !1, fiber._stack.push(setInterruptibleTrue), f(interruptible$1)) : f(identity)), whileLoop$1 = /* @__PURE__ */ makePrimitive({
		op: "While",
		[contA](value, fiber) {
			return this[args].step(value), this[args].while() ? (fiber._stack.push(this), this[args].body()) : exitVoid;
		},
		[evaluate](fiber) {
			return this[args].while() ? (fiber._stack.push(this), this[args].body()) : exitVoid;
		}
	}), forEach$1 = /* @__PURE__ */ dual((args$1) => typeof args$1[1] == "function", (iterable, f, options) => withFiber$1((parent) => {
		let concurrencyOption = options?.concurrency === "inherit" ? parent.getRef(CurrentConcurrency) : options?.concurrency ?? 1, concurrency = concurrencyOption === "unbounded" ? Infinity : Math.max(1, concurrencyOption);
		if (concurrency === 1) return forEachSequential(iterable, f, options);
		let items = fromIterable(iterable), length = items.length;
		if (length === 0) return options?.discard ? void_$2 : succeed$4([]);
		let out = options?.discard ? void 0 : Array(length), index = 0, span = parent.currentSpanLocal;
		return callback$2((resume) => {
			let fibers = /* @__PURE__ */ new Set(), failures = [], failed = !1, inProgress = 0, doneCount = 0, pumping = !1, interrupted = !1;
			function pump() {
				for (pumping = !0; inProgress < concurrency && index < length;) {
					let currentIndex = index, item = items[currentIndex];
					index++, inProgress++;
					try {
						let child = forkUnsafe$1(parent, f(item, currentIndex), !0, !0, "inherit");
						fibers.add(child), child.addObserver((exit$2) => {
							if (!interrupted) {
								if (fibers.delete(child), exit$2._tag === "Failure") if (!failed) failed = !0, length = index, failures.push(...exit$2.cause.failures), fibers.forEach((fiber) => fiber.interruptUnsafe(parent.id, span));
								else for (let f$1 of exit$2.cause.failures) f$1._tag !== "Interrupt" && failures.push(f$1);
								else out !== void 0 && (out[currentIndex] = exit$2.value);
								doneCount++, inProgress--, doneCount === length ? resume(failures.length > 0 ? exitFailCause(causeFromFailures(failures)) : succeed$4(out)) : !pumping && !failed && inProgress < concurrency && pump();
							}
						});
					} catch (err) {
						failed = !0, length = index, failures.push(new Die(err)), fibers.forEach((fiber) => fiber.interruptUnsafe(parent.id, span));
					}
				}
				pumping = !1;
			}
			return pump(), suspend$3(() => (interrupted = !0, index = length, fiberInterruptAll(fibers)));
		});
	})), forEachSequential = (iterable, f, options) => suspend$3(() => {
		let out = options?.discard ? void 0 : [], iterator = iterable[Symbol.iterator](), state = iterator.next(), index = 0;
		return as$1(whileLoop$1({
			while: () => !state.done,
			body: () => f(state.value, index++),
			step: (b) => {
				out && out.push(b), state = iterator.next();
			}
		}), out);
	}), forkChild$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, options) => withFiber$1((fiber) => (interruptChildrenPatch(), succeed$4(forkUnsafe$1(fiber, self, options?.startImmediately, !1, options?.uninterruptible ?? !1))))), forkUnsafe$1 = (parent, effect, immediate = !1, daemon = !1, uninterruptible$2 = !1) => {
		let interruptible$2 = uninterruptible$2 === "inherit" ? parent.interruptible : !uninterruptible$2, child = new FiberImpl(parent.services, interruptible$2);
		return immediate ? child.evaluate(effect) : parent.currentScheduler.scheduleTask(() => child.evaluate(effect), 0), !daemon && !child._exit && (parent.children().add(child), child.addObserver(() => parent._children.delete(child))), child;
	}, forkIn$1 = /* @__PURE__ */ dual((args$1) => isEffect$1(args$1[0]), (self, scope$2, options) => withFiber$1((parent) => {
		let fiber = forkUnsafe$1(parent, self, options?.startImmediately, !0, options?.uninterruptible);
		if (!fiber._exit) if (scope$2.state._tag !== "Closed") {
			let key = {};
			scopeAddFinalizerUnsafe(scope$2, key, () => withFiberId((interruptor) => interruptor === fiber.id ? void_$2 : fiberInterrupt(fiber))), fiber.addObserver(() => scopeRemoveFinalizerUnsafe(scope$2, key));
		} else fiber.interruptUnsafe(parent.id, parent.currentSpanLocal);
		return succeed$4(fiber);
	})), runForkWith$1 = (services$2) => (effect, options) => {
		let scheduler = options?.scheduler || !services$2.mapUnsafe.has(Scheduler.key) && new MixedScheduler(), fiber = new FiberImpl(scheduler ? add(services$2, Scheduler, scheduler) : services$2, options?.uninterruptible !== !0);
		if (fiber.evaluate(effect), fiber._exit) return fiber;
		if (options?.signal) if (options.signal.aborted) fiber.interruptUnsafe();
		else {
			let abort = () => fiber.interruptUnsafe();
			options.signal.addEventListener("abort", abort, { once: !0 }), fiber.addObserver(() => options.signal.removeEventListener("abort", abort));
		}
		return fiber;
	}, fiberRunIn = /* @__PURE__ */ dual(2, (self, scope$2) => {
		if (self._exit) return self;
		if (scope$2.state._tag === "Closed") return self.interruptUnsafe(self.id), self;
		let key = {};
		return scopeAddFinalizerUnsafe(scope$2, key, () => fiberInterrupt(self)), self.addObserver(() => scopeRemoveFinalizerUnsafe(scope$2, key)), self;
	}), runFork$1 = /* @__PURE__ */ runForkWith$1(/* @__PURE__ */ empty$3()), runSyncExitWith$1 = (services$2) => {
		let runFork$2 = runForkWith$1(services$2);
		return (effect) => {
			if (effectIsExit(effect)) return effect;
			let scheduler = new MixedScheduler("sync"), fiber = runFork$2(effect, { scheduler });
			return scheduler.flush(), fiber._exit ?? exitDie(fiber);
		};
	}, runSync$1 = /* @__PURE__ */ ((services$2) => {
		let runSyncExit$2 = runSyncExitWith$1(services$2);
		return (effect) => {
			let exit$2 = runSyncExit$2(effect);
			if (exit$2._tag === "Failure") throw causeSquash(exit$2.cause);
			return exit$2.value;
		};
	})(/* @__PURE__ */ empty$3());
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
				let observer = () => {
					this.free < n || (this.waiters.delete(observer), this.taken += n, resume(succeed$4(n)));
				};
				return this.waiters.add(observer), sync$1(() => {
					this.waiters.delete(observer);
				});
			}
			return this.taken += n, resume(succeed$4(n));
		});
		updateTaken = (f) => withFiber$1((fiber) => (this.taken = f(this.taken), this.waiters.size > 0 && fiber.currentScheduler.scheduleTask(() => {
			let iter = this.waiters.values(), item = iter.next();
			for (; item.done === !1 && this.free > 0;) item.value(), item = iter.next();
		}, 0), succeed$4(this.free)));
		release = (n) => this.updateTaken((taken) => taken - n);
		releaseAll = /* @__PURE__ */ this.updateTaken((_) => 0);
		withPermits = (n) => (self) => uninterruptibleMask$1((restore) => flatMap$3(restore(this.take(n)), (permits) => ensuring$1(restore(self), this.release(permits))));
		withPermit = /* @__PURE__ */ this.withPermits(1);
		withPermitsIfAvailable = (n) => (self) => uninterruptibleMask$1((restore) => suspend$3(() => this.free < n ? succeedNone$1 : (this.taken += n, ensuring$1(restore(asSome$1(self)), this.release(n)))));
	};
	let makeSemaphoreUnsafe$1 = (permits) => new Semaphore(permits), succeedTrue = /* @__PURE__ */ succeed$4(!0), succeedFalse = /* @__PURE__ */ succeed$4(!1);
	var Latch = class {
		waiters = [];
		scheduled = !1;
		isOpen;
		constructor(isOpen) {
			this.isOpen = isOpen;
		}
		scheduleUnsafe(fiber) {
			return this.scheduled || this.waiters.length === 0 ? succeedTrue : (this.scheduled = !0, fiber.currentScheduler.scheduleTask(this.flushWaiters, 0), succeedTrue);
		}
		flushWaiters = () => {
			this.scheduled = !1;
			let waiters = this.waiters;
			this.waiters = [];
			for (let i = 0; i < waiters.length; i++) waiters[i](exitVoid);
		};
		open = /* @__PURE__ */ withFiber$1((fiber) => this.isOpen ? succeedFalse : (this.isOpen = !0, this.scheduleUnsafe(fiber)));
		release = /* @__PURE__ */ withFiber$1((fiber) => this.open ? succeedFalse : this.scheduleUnsafe(fiber));
		openUnsafe() {
			return this.isOpen ? !1 : (this.isOpen = !0, this.flushWaiters(), !0);
		}
		await = /* @__PURE__ */ callback$2((resume) => this.isOpen ? resume(void_$2) : (this.waiters.push(resume), sync$1(() => {
			let index = this.waiters.indexOf(resume);
			index !== -1 && this.waiters.splice(index, 1);
		})));
		closeUnsafe() {
			return this.isOpen ? (this.isOpen = !1, !0) : !1;
		}
		close = /* @__PURE__ */ sync$1(() => this.closeUnsafe());
		whenOpen = (self) => andThen$1(this.await, self);
	};
	let makeLatchUnsafe$1 = (open) => new Latch(open ?? !1), makeLatch$1 = (open) => sync$1(() => makeLatchUnsafe$1(open)), filterDisablePropagation = (span) => {
		if (span) return get(span.context, DisablePropagation) ? span._tag === "Span" ? filterDisablePropagation(span.parent) : void 0 : span;
	}, spanToTrace = /* @__PURE__ */ new WeakMap(), ClockRef = /* @__PURE__ */ Reference("effect/Clock", { defaultValue: () => new ClockImpl() }), MAX_TIMER_MILLIS = 2 ** 31 - 1;
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
			let millis$1 = toMillis(duration);
			return millis$1 <= 0 ? yieldNow$1 : callback$2((resume) => {
				if (millis$1 > MAX_TIMER_MILLIS) return;
				let handle = setTimeout(() => resume(void_$2), millis$1);
				return sync$1(() => clearTimeout(handle));
			});
		}
	};
	let performanceNowNanos = /* @__PURE__ */ function() {
		let bigint1e6 = /* @__PURE__ */ BigInt(1e6);
		if (typeof performance > "u") return () => BigInt(Date.now()) * bigint1e6;
		if (typeof performance.timeOrigin == "number" && performance.timeOrigin === 0) return () => BigInt(Math.round(performance.now() * 1e6));
		let origin = /* @__PURE__ */ BigInt(/* @__PURE__ */ Date.now()) * bigint1e6 - /* @__PURE__ */ BigInt(/* @__PURE__ */ Math.round(/* @__PURE__ */ performance.now() * 1e6));
		return () => origin + BigInt(Math.round(performance.now() * 1e6));
	}(), processOrPerformanceNow = /* @__PURE__ */ function() {
		let processHrtime = typeof process == "object" && "hrtime" in process && typeof process.hrtime.bigint == "function" ? process.hrtime : void 0;
		if (!processHrtime) return performanceNowNanos;
		let origin = /* @__PURE__ */ performanceNowNanos() - /* @__PURE__ */ processHrtime.bigint();
		return () => origin + processHrtime.bigint();
	}();
	TaggedError("TimeoutError"), TaggedError("IllegalArgumentError"), TaggedError("ExceededCapacityError"), TaggedError("UnknownError");
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
	let hasProcessStdout = typeof process == "object" && process !== null && typeof process.stdout == "object" && process.stdout !== null;
	hasProcessStdout && process.stdout.isTTY, hasProcessStdout || "Deno" in globalThis;
	function interruptChildrenPatch() {
		fiberMiddleware.interruptChildren ??= fiberInterruptChildren;
	}
	let filterError$1 = causeFilterError, succeed$3 = exitSucceed, failCause$2 = exitFailCause, void_$1 = exitVoid, makeUnsafe = scopeMakeUnsafe, provide$2 = provideScope, addFinalizer$1 = scopeAddFinalizer, forkUnsafe = scopeForkUnsafe, close = scopeClose;
	({ ...StructuralProto });
	let HaltTypeId = "~effect/stream/Pull/Halt";
	var Halt = class {
		[HaltTypeId] = HaltTypeId;
		leftover;
		constructor(leftover) {
			this.leftover = leftover;
		}
	};
	let catchHalt = /* @__PURE__ */ dual(2, (effect, f) => catchCauseFilter$1(effect, filterHaltLeftover, (l) => f(l))), isHalt = (u) => hasProperty(u, HaltTypeId), isHaltCause = (cause) => cause.failures.some(isHaltFailure), isHaltFailure = (failure) => failure._tag === "Fail" && isHalt(failure.error), filterHalt = /* @__PURE__ */ composePassthrough(filterError$1, (e) => isHalt(e) ? e : fail$4(e)), filterHaltLeftover = /* @__PURE__ */ composePassthrough(filterError$1, (e) => isHalt(e) ? e.leftover : fail$4(e)), haltVoid = /* @__PURE__ */ fail$3(/* @__PURE__ */ new Halt(void 0)), haltExitFromCause = (cause) => {
		let halt$1 = filterHalt(cause);
		return isFail(halt$1) ? failCause$2(halt$1.fail) : succeed$3(halt$1.leftover);
	}, isEffect = (u) => typeof u == "object" && !!u && "~effect/Effect/dev" in u, forEach = forEach$1, promise = promise$1, succeed$2 = succeed$4, suspend$2 = suspend$3, sync = sync$1, void_ = void_$2, gen = gen$1, failCause$1 = failCause$3, yieldNow = yieldNow$1, flatMap$2 = flatMap$3, flatten$1 = flatten$2, andThen = andThen$1, tap$2 = tap$3, exit = exit$1, map$1 = map$4, as = as$1, catchCause = catchCause$1, matchCauseEffect = matchCauseEffect$1, services = services$1, addFinalizer = addFinalizer$2, onError = onError$1, onExit = onExit$1, cached = cached$1, makeSemaphoreUnsafe = makeSemaphoreUnsafe$1, makeLatch = makeLatch$1, forever = forever$2, forkChild = forkChild$1, forkIn = forkIn$1, runFork = runFork$1, runForkWith = runForkWith$1, runSync = runSync$1, fnUntraced = fnUntraced$1, flatMapEager = flatMapEager$1, join = fiberJoin, interrupt = fiberInterrupt, runIn = fiberRunIn, Empty = /* @__PURE__ */ Symbol.for("effect/MutableList/Empty"), make$1 = () => ({
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
			let array$4 = self.head.array;
			return clear(self), array$4;
		}
		let array$3 = Array(n), index = 0, chunk = self.head;
		for (; chunk;) {
			for (; chunk.offset < chunk.array.length;) if (array$3[index++] = chunk.array[chunk.offset], chunk.mutable && (chunk.array[chunk.offset] = void 0), chunk.offset++, index === n) return self.length -= n, self.length === 0 && clear(self), array$3;
			chunk = chunk.next;
		}
		return clear(self), array$3;
	}, take$1 = (self) => {
		if (!self.head) return Empty;
		let message = self.head.array[self.head.offset];
		return self.head.mutable && (self.head.array[self.head.offset] = void 0), self.head.offset++, self.length--, self.head.offset === self.head.array.length && (self.head.next ? self.head = self.head.next : clear(self)), message;
	}, variance = {
		_A: identity,
		_E: identity
	}, QueueProto = {
		"~effect/Queue": variance,
		"~effect/Queue/Dequeue": variance,
		...PipeInspectableProto,
		toJSON() {
			return {
				_id: "effect/Queue",
				state: this.state._tag,
				size: sizeUnsafe(this)
			};
		}
	}, make = (options) => withFiber$1((fiber) => {
		let self = Object.create(QueueProto);
		return self.scheduler = fiber.currentScheduler, self.capacity = options?.capacity ?? Infinity, self.strategy = options?.strategy ?? "suspend", self.messages = make$1(), self.scheduleRunning = !1, self.state = {
			_tag: "Open",
			takers: /* @__PURE__ */ new Set(),
			offers: /* @__PURE__ */ new Set(),
			awaiters: /* @__PURE__ */ new Set()
		}, succeed$4(self);
	}), bounded = (capacity) => make({ capacity }), offer = (self, message) => suspend$3(() => {
		if (self.state._tag !== "Open") return exitFalse;
		if (self.messages.length >= self.capacity) switch (self.strategy) {
			case "dropping": return exitFalse;
			case "suspend": return self.capacity <= 0 && self.state.takers.size > 0 ? (append(self.messages, message), releaseTaker(self), exitTrue) : offerRemainingSingle(self, message);
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
	}, failCause = (self, cause) => done(self, exitFailCause(cause)), end = (self) => done(self, exitVoid), done = (self, exit$2) => sync$1(() => doneUnsafe(self, exit$2)), doneUnsafe = (self, exit$2) => {
		if (self.state._tag !== "Open") return !1;
		let fail$7 = exitZipRight(exit$2, exitFailDone);
		return self.state.offers.size === 0 && self.messages.length === 0 ? (finalize(self, fail$7), !0) : (self.state = {
			...self.state,
			_tag: "Closing",
			exit: fail$7
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
	}), Done = /* @__PURE__ */ new Halt(void 0), takeAll = (self) => takeBetween(self, 1, Infinity), takeBetween = (self, min, max) => suspend$3(() => takeBetweenUnsafe(self, min, max) ?? andThen$1(awaitTake(self), takeBetween(self, 1, max))), take = (self) => suspend$3(() => takeUnsafe(self) ?? andThen$1(awaitTake(self), take(self))), takeUnsafe = (self) => {
		if (self.state._tag === "Done") return self.state.exit;
		if (self.messages.length > 0) {
			let message = take$1(self.messages);
			return releaseCapacity(self), exitSucceed(message);
		} else if (self.capacity <= 0 && self.state.offers.size > 0) {
			self.capacity = 1, releaseCapacity(self), self.capacity = 0;
			let message = take$1(self.messages);
			return releaseCapacity(self), exitSucceed(message);
		}
	}, sizeUnsafe = (self) => self.state._tag === "Done" ? 0 : self.messages.length, into = /* @__PURE__ */ dual(2, (effect, self) => uninterruptibleMask$1((restore) => matchCauseEffect$1(restore(effect), {
		onFailure: (cause) => failCause(self, cause),
		onSuccess: (_) => end(self)
	}))), toPull = take, toPullArray = takeAll, exitFalse = /* @__PURE__ */ exitSucceed(!1), exitTrue = /* @__PURE__ */ exitSucceed(!0), exitFailDone = /* @__PURE__ */ exitFail(Done), exitInterrupt = /* @__PURE__ */ exitInterrupt$1(), releaseTaker = (self) => {
		if (self.scheduleRunning = !1, self.state._tag === "Done" || self.state.takers.size === 0) return;
		let taker = headUnsafe(self.state.takers);
		self.state.takers.delete(taker), taker(exitVoid);
	}, scheduleReleaseTaker = (self) => {
		self.scheduleRunning || self.state._tag === "Done" || self.state.takers.size === 0 || (self.scheduleRunning = !0, self.scheduler.scheduleTask(() => releaseTaker(self), 0));
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
	}, offerRemainingSingle = (self, message) => callback$2((resume) => {
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
		if (self.state._tag === "Done") return isHaltCause(self.state.exit.cause);
		if (self.state.offers.size === 0) return self.state._tag === "Closing" && self.messages.length === 0 ? (finalize(self, self.state.exit), isHaltCause(self.state.exit.cause)) : !1;
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
	}, awaitTake = (self) => callback$2((resume) => self.state._tag === "Done" ? resume(self.state.exit) : (self.state.takers.add(resume), sync$1(() => {
		self.state._tag !== "Done" && self.state.takers.delete(resume);
	}))), finalize = (self, exit$2) => {
		if (self.state._tag === "Done") return;
		let openState = self.state;
		self.state = {
			_tag: "Done",
			exit: exit$2
		};
		for (let taker of openState.takers) taker(exit$2);
		openState.takers.clear();
		for (let awaiter of openState.awaiters) awaiter(exit$2);
		openState.awaiters.clear();
	}, TypeId$1 = "~effect/Channel", isChannel = (u) => hasProperty(u, TypeId$1), ChannelProto = {
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
	}, fromTransform = (transform) => {
		let self = Object.create(ChannelProto);
		return self.transform = transform, self;
	}, transformPull = (self, f) => fromTransform((upstream, scope$2) => flatMap$2(toTransform(self)(upstream, scope$2), (pull) => f(pull, scope$2))), fromPull = (effect) => fromTransform((_, __) => effect), fromTransformBracket = (f) => fromTransform(fnUntraced(function* (upstream, scope$2) {
		let closableScope = forkUnsafe(scope$2), onCause = (cause) => close(closableScope, haltExitFromCause(cause));
		return onError(yield* onError(f(upstream, scope$2, closableScope), onCause), onCause);
	})), toTransform = (channel) => channel.transform, asyncQueue = (scope$2, f, options) => make({
		capacity: options?.bufferSize,
		strategy: options?.strategy
	}).pipe(tap$2((queue) => addFinalizer$1(scope$2, shutdown(queue))), tap$2((queue) => {
		let result$2 = f(queue);
		if (isEffect(result$2)) return forkIn(provide$2(result$2, scope$2), scope$2);
	})), callbackArray = (f, options) => fromTransform((_, scope$2) => map$1(asyncQueue(scope$2, f, options), toPullArray)), suspend$1 = (evaluate$1) => fromTransform((upstream, scope$2) => suspend$2(() => toTransform(evaluate$1())(upstream, scope$2))), succeed$1 = (value) => fromEffect(succeed$2(value)), empty$1 = /* @__PURE__ */ fromPull(/* @__PURE__ */ succeed$2(haltVoid)), fromEffect = (effect) => fromPull(sync(() => {
		let done$2 = !1;
		return suspend$2(() => done$2 ? haltVoid : (done$2 = !0, effect));
	})), map = /* @__PURE__ */ dual(2, (self, f) => transformPull(self, (pull) => sync(() => {
		let i = 0;
		return map$1(pull, (o) => f(o, i++));
	}))), concurrencyIsSequential = (concurrency) => concurrency === void 0 || concurrency !== "unbounded" && concurrency <= 1, mapEffect = /* @__PURE__ */ dual((args$1) => isChannel(args$1[0]), (self, f, options) => concurrencyIsSequential(options?.concurrency) ? mapEffectSequential(self, f) : mapEffectConcurrent(self, f, options)), mapEffectSequential = (self, f) => fromTransform((upstream, scope$2) => {
		let i = 0;
		return map$1(toTransform(self)(upstream, scope$2), flatMap$2((o) => f(o, i++)));
	}), mapEffectConcurrent = (self, f, options) => fromTransformBracket(fnUntraced(function* (upstream, scope$2, forkedScope) {
		let i = 0, pull = yield* toTransform(self)(upstream, scope$2), concurrencyN = options.concurrency === "unbounded" ? 2 ** 53 - 1 : options.concurrency, queue = yield* bounded(0);
		yield* addFinalizer$1(forkedScope, shutdown(queue));
		let runFork$2 = runForkWith(yield* services()), trackFiber = runIn(forkedScope);
		if (options.unordered) {
			let semaphore = makeSemaphoreUnsafe(concurrencyN), release = constant(semaphore.release(1)), handle = matchCauseEffect({
				onFailure: (cause) => flatMap$2(failCause(queue, cause), release),
				onSuccess: (value) => flatMap$2(offer(queue, value), release)
			});
			yield* semaphore.take(1).pipe(flatMap$2(() => pull), flatMap$2((value) => (trackFiber(runFork$2(handle(f(value, i++)))), void_)), forever({ autoYield: !1 }), catchCause((cause) => semaphore.withPermits(concurrencyN - 1)(failCause(queue, cause))), forkIn(forkedScope));
		} else {
			let effects = yield* bounded(concurrencyN - 2);
			yield* addFinalizer$1(forkedScope, shutdown(queue)), yield* take(effects).pipe(flatten$1, flatMap$2((value) => offer(queue, value)), forever({ autoYield: !1 }), into(queue), forkIn(forkedScope));
			let errorCause, onExit$2 = (exit$2) => {
				exit$2._tag !== "Success" && (errorCause = exit$2.cause, doneUnsafe(queue, failCause$2(exit$2.cause)));
			};
			yield* pull.pipe(flatMap$2((value) => {
				if (errorCause) return failCause$1(errorCause);
				let fiber = runFork$2(f(value, i++));
				return trackFiber(fiber), fiber.addObserver(onExit$2), offer(effects, join(fiber));
			}), forever({ autoYield: !1 }), catchCause((cause) => offer(effects, failCause$2(cause)).pipe(andThen(end(effects)))), forkIn(forkedScope));
		}
		return toPull(queue);
	})), tap$1 = /* @__PURE__ */ dual((args$1) => isChannel(args$1[0]), (self, f, options) => mapEffect(self, (a) => as(f(a), a), options)), flatMap$1 = /* @__PURE__ */ dual((args$1) => isChannel(args$1[0]), (self, f, options) => concurrencyIsSequential(options?.concurrency) ? flatMapSequential(self, f) : flatMapConcurrent(self, f, options)), flatMapSequential = (self, f) => fromTransform((upstream, scope$2) => map$1(toTransform(self)(upstream, scope$2), (pull) => {
		let childPull, childScope, makePull = flatMap$2(pull, (value) => (childScope ??= forkUnsafe(scope$2), flatMapEager(toTransform(f(value))(upstream, childScope), (pull$1) => (childPull = catchHalt$1(pull$1), childPull)))), catchHalt$1 = catchHalt((_) => {
			if (childPull = void 0, childScope.state._tag === "Open" && childScope.state.finalizers.size === 1) return makePull;
			let close$1 = close(childScope, void_$1);
			return childScope = void 0, flatMap$2(close$1, () => makePull);
		});
		return suspend$2(() => childPull ?? makePull);
	})), flatMapConcurrent = (self, f, options) => self.pipe(map(f), mergeAll(options)), flattenArray = (self) => transformPull(self, (pull) => {
		let array$3, index = 0;
		return succeed$2(suspend$2(function loop() {
			if (array$3 === void 0) return flatMap$2(pull, (array_) => {
				switch (array_.length) {
					case 0: return loop();
					case 1: return succeed$2(array_[0]);
					default: return array$3 = array_, succeed$2(array_[index++]);
				}
			});
			let next = array$3[index++];
			return index >= array$3.length && (array$3 = void 0, index = 0), succeed$2(next);
		}));
	}), mergeAll = /* @__PURE__ */ dual(2, (channels, { bufferSize = 16, concurrency, switch: switch_ = !1 }) => fromTransformBracket(fnUntraced(function* (upstream, scope$2, forkedScope) {
		let concurrencyN = concurrency === "unbounded" ? 2 ** 53 - 1 : Math.max(1, concurrency), semaphore = switch_ ? void 0 : makeSemaphoreUnsafe(concurrencyN), doneLatch = yield* makeLatch(!0), fibers = /* @__PURE__ */ new Set(), queue = yield* bounded(bufferSize);
		yield* addFinalizer$1(forkedScope, shutdown(queue));
		let pull = yield* toTransform(channels)(upstream, scope$2);
		return yield* gen(function* () {
			for (;;) {
				semaphore && (yield* semaphore.take(1));
				let channel = yield* pull, childScope = forkUnsafe(forkedScope), childPull = yield* toTransform(channel)(upstream, childScope);
				for (; fibers.size >= concurrencyN;) {
					let fiber$1 = headUnsafe(fibers);
					fibers.delete(fiber$1), fibers.size === 0 && (yield* doneLatch.open), yield* interrupt(fiber$1);
				}
				let fiber = yield* childPull.pipe(tap$2(() => yieldNow), flatMap$2((value) => offer(queue, value)), forever({ autoYield: !1 }), onError(fnUntraced(function* (cause) {
					let halt$1 = filterHalt(cause);
					if (yield* exit(close(childScope, isFail(halt$1) ? failCause$2(halt$1.fail) : succeed$3(halt$1.leftover))), fibers.has(fiber) && (fibers.delete(fiber), semaphore && (yield* semaphore.release(1)), fibers.size === 0 && (yield* doneLatch.open), !isPass(halt$1))) return yield* failCause(queue, cause);
				})), forkChild);
				doneLatch.closeUnsafe(), fibers.add(fiber);
			}
		}).pipe(catchCause((cause) => doneLatch.whenOpen(failCause(queue, cause))), forkIn(forkedScope)), toPull(queue);
	}))), runWith = (self, f, onHalt) => suspend$2(() => {
		let scope$2 = makeUnsafe();
		return catchHalt(flatMap$2(toTransform(self)(haltVoid, scope$2), f), onHalt || succeed$2).pipe(onExit((exit$2) => close(scope$2, exit$2)));
	}), runDrain$1 = (self) => runWith(self, (pull) => forever(pull, { autoYield: !1 })), TypeId = "~effect/stream/Stream", streamVariance = {
		_R: identity,
		_E: identity,
		_A: identity
	}, isStream = (u) => hasProperty(u, TypeId), StreamProto = {
		[TypeId]: streamVariance,
		pipe() {
			return pipeArguments(this, arguments);
		}
	}, fromChannel = (channel) => {
		let self = Object.create(StreamProto);
		return self.channel = channel, self;
	}, callback = (f, options) => fromChannel(callbackArray(f, options)), empty = /* @__PURE__ */ fromChannel(empty$1), succeed = (value) => fromChannel(succeed$1(of(value))), suspend = (stream) => fromChannel(suspend$1(() => stream().channel)), fromArray = (array$3) => isReadonlyArrayNonEmpty(array$3) ? fromChannel(succeed$1(array$3)) : empty, tap = /* @__PURE__ */ dual((args$1) => isStream(args$1[0]), (self, f, options) => {
		let concurrency = options?.concurrency ?? 1;
		return concurrency === 1 || concurrency === "unbounded" ? self.channel.pipe(tap$1(forEach(f, {
			discard: !0,
			concurrency
		}), options), fromChannel) : suspend(() => {
			let withPermit = makeSemaphoreUnsafe(concurrency).withPermit;
			return self.channel.pipe(tap$1(forEach((a) => withPermit(f(a)), {
				discard: !0,
				concurrency
			}), options), fromChannel);
		});
	}), flatMap = /* @__PURE__ */ dual((args$1) => isStream(args$1[0]), (self, f, options) => self.channel.pipe(flattenArray, flatMap$1((a) => f(a).channel, options), fromChannel)), flatten = /* @__PURE__ */ dual((args$1) => isStream(args$1[0]), (self, options) => flatMap(self, identity, options)), concat = /* @__PURE__ */ dual(2, (self, that) => flatten(fromArray([self, that]))), runDrain = (self) => runDrain$1(self.channel);
	GM_addStyle("\n  .copilotPreview__container, .feed-right-column[aria-label=\"Explore\"] {\n    display: none !important;\n  }\n  .feed-right-column li.notifications-list-item, .feed-right-column li.notifications-list-item.notification-read {\n    background-color: transparent !important;\n  }\n");
	let addNotifications = memoize(fnUntraced(function* (parent) {
		let html = yield* promise(() => fetch("/notifications").then((res) => res.text())), dom = new DOMParser().parseFromString(html, "text/html");
		Array.from(dom.querySelectorAll("link[rel=stylesheet]")).filter((link) => link.href.includes("notifications")).forEach((link) => document.head.appendChild(link.cloneNode()));
		let aside = document.createElement("aside");
		aside.className = "feed-right-column d-block mb-5 mt-7";
		let container = dom.querySelector("ul.js-active-navigation-container");
		container.classList.remove("color-bg-subtle"), container.classList.add("border", "color-border-muted", "rounded-3", "overflow-hidden"), container.querySelectorAll("[class*='-md']").forEach((el) => {
			Array.from(el.classList).forEach((cls) => {
				cls.includes("-md") && el.classList.remove(cls);
			});
		}), container.querySelectorAll(".notification-list-item-actions").forEach((el) => el.remove()), container.querySelectorAll(".notification-list-item-actions-responsive").forEach((el) => el.remove()), container.querySelectorAll(".notification-list-item-unread-indicator").forEach((el) => el.parentNode.remove()), container.querySelectorAll(".notification-is-starred-icon").forEach((el) => el.remove()), aside.appendChild(container), parent.appendChild(aside);
	}, cached, runSync));
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
})();
