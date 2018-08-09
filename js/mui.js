 
/*!
 * =====================================================
 * Mui v3.7.2 (http://dev.dcloud.net.cn/mui)
 * =====================================================
 */
/**
 * MUI鏍稿績JS
 * @type _L4.$|Function
 */
var mui = (function(document, undefined) {
	var readyRE = /complete|loaded|interactive/;
	var idSelectorRE = /^#([\w-]+)$/;
	var classSelectorRE = /^\.([\w-]+)$/;
	var tagSelectorRE = /^[\w-]+$/;
	var translateRE = /translate(?:3d)?\((.+?)\)/;
	var translateMatrixRE = /matrix(3d)?\((.+?)\)/;

	var $ = function(selector, context) {
		context = context || document;
		if (!selector)
			return wrap();
		if (typeof selector === 'object')
			if ($.isArrayLike(selector)) {
				return wrap($.slice.call(selector), null);
			} else {
				return wrap([selector], null);
			}
		if (typeof selector === 'function')
			return $.ready(selector);
		if (typeof selector === 'string') {
			try {
				selector = selector.trim();
				if (idSelectorRE.test(selector)) {
					var found = document.getElementById(RegExp.$1);
					return wrap(found ? [found] : []);
				}
				return wrap($.qsa(selector, context), selector);
			} catch (e) {}
		}
		return wrap();
	};

	var wrap = function(dom, selector) {
		dom = dom || [];
		Object.setPrototypeOf(dom, $.fn);
		dom.selector = selector || '';
		return dom;
	};

	$.uuid = 0;

	$.data = {};
	/**
	 * extend(simple)
	 * @param {type} target
	 * @param {type} source
	 * @param {type} deep
	 * @returns {unresolved}
	 */
	$.extend = function() { //from jquery2
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		if (typeof target === "boolean") {
			deep = target;

			target = arguments[i] || {};
			i++;
		}

		if (typeof target !== "object" && !$.isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && $.isArray(src) ? src : [];

						} else {
							clone = src && $.isPlainObject(src) ? src : {};
						}

						target[name] = $.extend(deep, clone, copy);

					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	};
	/**
	 * mui noop(function)
	 */
	$.noop = function() {};
	/**
	 * mui slice(array)
	 */
	$.slice = [].slice;
	/**
	 * mui filter(array)
	 */
	$.filter = [].filter;

	$.type = function(obj) {
		return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || "object";
	};
	/**
	 * mui isArray
	 */
	$.isArray = Array.isArray ||
		function(object) {
			return object instanceof Array;
		};
	/**
	 * mui isArrayLike 
	 * @param {Object} obj
	 */
	$.isArrayLike = function(obj) {
		var length = !!obj && "length" in obj && obj.length;
		var type = $.type(obj);
		if (type === "function" || $.isWindow(obj)) {
			return false;
		}
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && (length - 1) in obj;
	};
	/**
	 * mui isWindow(闇€鑰冭檻obj涓簎ndefined鐨勬儏鍐�)
	 */
	$.isWindow = function(obj) {
		return obj != null && obj === obj.window;
	};
	/**
	 * mui isObject
	 */
	$.isObject = function(obj) {
		return $.type(obj) === "object";
	};
	/**
	 * mui isPlainObject
	 */
	$.isPlainObject = function(obj) {
		return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	};
	/**
	 * mui isEmptyObject
	 * @param {Object} o
	 */
	$.isEmptyObject = function(o) {
		for (var p in o) {
			if (p !== undefined) {
				return false;
			}
		}
		return true;
	};
	/**
	 * mui isFunction
	 */
	$.isFunction = function(value) {
		return $.type(value) === "function";
	};
	/**
	 * mui querySelectorAll
	 * @param {type} selector
	 * @param {type} context
	 * @returns {Array}
	 */
	$.qsa = function(selector, context) {
		context = context || document;
		return $.slice.call(classSelectorRE.test(selector) ? context.getElementsByClassName(RegExp.$1) : tagSelectorRE.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector));
	};
	/**
	 * ready(DOMContentLoaded)
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.ready = function(callback) {
		if (readyRE.test(document.readyState)) {
			callback($);
		} else {
			document.addEventListener('DOMContentLoaded', function() {
				callback($);
			}, false);
		}
		return this;
	};
	/**
	 * 灏� fn 缂撳瓨涓€娈垫椂闂村悗, 鍐嶈璋冪敤鎵ц
	 * 姝ゆ柟娉曚负浜嗛伩鍏嶅湪 ms 娈垫椂闂村唴, 鎵ц fn 澶氭. 甯哥敤浜� resize , scroll , mousemove 绛夎繛缁€т簨浠朵腑;
	 * 褰� ms 璁剧疆涓� -1, 琛ㄧず绔嬪嵆鎵ц fn, 鍗冲拰鐩存帴璋冪敤 fn 涓€鏍�;
	 * 璋冪敤杩斿洖鍑芥暟鐨� stop 鍋滄鏈€鍚庝竴娆＄殑 buffer 鏁堟灉
	 * @param {Object} fn
	 * @param {Object} ms
	 * @param {Object} context
	 */
	$.buffer = function(fn, ms, context) {
		var timer;
		var lastStart = 0;
		var lastEnd = 0;
		var ms = ms || 150;

		function run() {
			if (timer) {
				timer.cancel();
				timer = 0;
			}
			lastStart = $.now();
			fn.apply(context || this, arguments);
			lastEnd = $.now();
		}

		return $.extend(function() {
			if (
				(!lastStart) || // 浠庢湭杩愯杩�
				(lastEnd >= lastStart && $.now() - lastEnd > ms) || // 涓婃杩愯鎴愬姛鍚庡凡缁忚秴杩噈s姣
				(lastEnd < lastStart && $.now() - lastStart > ms * 8) // 涓婃杩愯鎴栨湭瀹屾垚锛屽悗8*ms姣
			) {
				run.apply(this, arguments);
			} else {
				if (timer) {
					timer.cancel();
				}
				timer = $.later(run, ms, null, $.slice.call(arguments));
			}
		}, {
			stop: function() {
				if (timer) {
					timer.cancel();
					timer = 0;
				}
			}
		});
	};
	/**
	 * each
	 * @param {type} elements
	 * @param {type} callback
	 * @returns {_L8.$}
	 */
	$.each = function(elements, callback, hasOwnProperty) {
		if (!elements) {
			return this;
		}
		if (typeof elements.length === 'number') {
			[].every.call(elements, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
		} else {
			for (var key in elements) {
				if (hasOwnProperty) {
					if (elements.hasOwnProperty(key)) {
						if (callback.call(elements[key], key, elements[key]) === false) return elements;
					}
				} else {
					if (callback.call(elements[key], key, elements[key]) === false) return elements;
				}
			}
		}
		return this;
	};
	$.focus = function(element) {
		if ($.os.ios) {
			setTimeout(function() {
				element.focus();
			}, 10);
		} else {
			element.focus();
		}
	};
	/**
	 * trigger event
	 * @param {type} element
	 * @param {type} eventType
	 * @param {type} eventData
	 * @returns {_L8.$}
	 */
	$.trigger = function(element, eventType, eventData) {
		element.dispatchEvent(new CustomEvent(eventType, {
			detail: eventData,
			bubbles: true,
			cancelable: true
		}));
		return this;
	};
	/**
	 * getStyles
	 * @param {type} element
	 * @param {type} property
	 * @returns {styles}
	 */
	$.getStyles = function(element, property) {
		var styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
		if (property) {
			return styles.getPropertyValue(property) || styles[property];
		}
		return styles;
	};
	/**
	 * parseTranslate
	 * @param {type} translateString
	 * @param {type} position
	 * @returns {Object}
	 */
	$.parseTranslate = function(translateString, position) {
		var result = translateString.match(translateRE || '');
		if (!result || !result[1]) {
			result = ['', '0,0,0'];
		}
		result = result[1].split(",");
		result = {
			x: parseFloat(result[0]),
			y: parseFloat(result[1]),
			z: parseFloat(result[2])
		};
		if (position && result.hasOwnProperty(position)) {
			return result[position];
		}
		return result;
	};
	/**
	 * parseTranslateMatrix
	 * @param {type} translateString
	 * @param {type} position
	 * @returns {Object}
	 */
	$.parseTranslateMatrix = function(translateString, position) {
		var matrix = translateString.match(translateMatrixRE);
		var is3D = matrix && matrix[1];
		if (matrix) {
			matrix = matrix[2].split(",");
			if (is3D === "3d")
				matrix = matrix.slice(12, 15);
			else {
				matrix.push(0);
				matrix = matrix.slice(4, 7);
			}
		} else {
			matrix = [0, 0, 0];
		}
		var result = {
			x: parseFloat(matrix[0]),
			y: parseFloat(matrix[1]),
			z: parseFloat(matrix[2])
		};
		if (position && result.hasOwnProperty(position)) {
			return result[position];
		}
		return result;
	};
	$.hooks = {};
	$.addAction = function(type, hook) {
		var hooks = $.hooks[type];
		if (!hooks) {
			hooks = [];
		}
		hook.index = hook.index || 1000;
		hooks.push(hook);
		hooks.sort(function(a, b) {
			return a.index - b.index;
		});
		$.hooks[type] = hooks;
		return $.hooks[type];
	};
	$.doAction = function(type, callback) {
		if ($.isFunction(callback)) { //鎸囧畾浜哻allback
			$.each($.hooks[type], callback);
		} else { //鏈寚瀹歝allback锛岀洿鎺ユ墽琛�
			$.each($.hooks[type], function(index, hook) {
				return !hook.handle();
			});
		}
	};
	/**
	 * setTimeout灏佽
	 * @param {Object} fn
	 * @param {Object} when
	 * @param {Object} context
	 * @param {Object} data
	 */
	$.later = function(fn, when, context, data) {
		when = when || 0;
		var m = fn;
		var d = data;
		var f;
		var r;

		if (typeof fn === 'string') {
			m = context[fn];
		}

		f = function() {
			m.apply(context, $.isArray(d) ? d : [d]);
		};

		r = setTimeout(f, when);

		return {
			id: r,
			cancel: function() {
				clearTimeout(r);
			}
		};
	};
	$.now = Date.now || function() {
		return +new Date();
	};
	var class2type = {};
	$.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	if (window.JSON) {
		$.parseJSON = JSON.parse;
	}
	/**
	 * $.fn
	 */
	$.fn = {
		each: function(callback) {
			[].every.call(this, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
			return this;
		}
	};

	/**
	 * 鍏煎 AMD 妯″潡
	 **/
	if (typeof define === 'function' && define.amd) {
		define('mui', [], function() {
			return $;
		});
	}

	return $;
})(document);
//window.mui = mui;
//'$' in window || (window.$ = mui);
/**
 * $.os
 * @param {type} $
 * @returns {undefined}
 */
(function($, window) {
	function detect(ua) {
		this.os = {};
		var funcs = [

			function() { //wechat
				var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);
				if (wechat) { //wechat
					this.os.wechat = {
						version: wechat[2].replace(/_/g, '.')
					};
				}
				return false;
			},
			function() { //android
				var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
				if (android) {
					this.os.android = true;
					this.os.version = android[2];

					this.os.isBadAndroid = !(/Chrome\/\d/.test(window.navigator.appVersion));
				}
				return this.os.android === true;
			},
			function() { //ios
				var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
				if (iphone) { //iphone
					this.os.ios = this.os.iphone = true;
					this.os.version = iphone[2].replace(/_/g, '.');
				} else {
					var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
					if (ipad) { //ipad
						this.os.ios = this.os.ipad = true;
						this.os.version = ipad[2].replace(/_/g, '.');
					}
				}
				return this.os.ios === true;
			}
		];
		[].every.call(funcs, function(func) {
			return !func.call($);
		});
	}
	detect.call($, navigator.userAgent);
})(mui, window);
/**
 * $.os.plus
 * @param {type} $
 * @returns {undefined}
 */
(function($, document) {
	function detect(ua) {
		this.os = this.os || {};
		var plus = ua.match(/Html5Plus/i); //TODO 5\+Browser?
		if (plus) {
			this.os.plus = true;
			$(function() {
				document.body.classList.add('mui-plus');
			});
			if (ua.match(/StreamApp/i)) { //TODO 鏈€濂芥湁娴佸簲鐢ㄨ嚜宸辩殑鏍囪瘑
				this.os.stream = true;
				$(function() {
					document.body.classList.add('mui-plus-stream');
				});
			}
		}
	}
	detect.call($, navigator.userAgent);
})(mui, document);
/**
 * 浠呮彁渚涚畝鍗曠殑on锛宱ff(浠呮敮鎸佷簨浠跺鎵橈紝涓嶆敮鎸佸綋鍓嶅厓绱犵粦瀹氾紝褰撳墠鍏冪礌缁戝畾璇风洿鎺ヤ娇鐢╝ddEventListener,removeEventListener)
 * @param {Object} $
 */
(function($) {
	if ('ontouchstart' in window) {
		$.isTouchable = true;
		$.EVENT_START = 'touchstart';
		$.EVENT_MOVE = 'touchmove';
		$.EVENT_END = 'touchend';
	} else {
		$.isTouchable = false;
		$.EVENT_START = 'mousedown';
		$.EVENT_MOVE = 'mousemove';
		$.EVENT_END = 'mouseup';
	}
	$.EVENT_CANCEL = 'touchcancel';
	$.EVENT_CLICK = 'click';

	var _mid = 1;
	var delegates = {};
	//闇€瑕亀rap鐨勫嚱鏁�
	var eventMethods = {
		preventDefault: 'isDefaultPrevented',
		stopImmediatePropagation: 'isImmediatePropagationStopped',
		stopPropagation: 'isPropagationStopped'
	};
	//榛樿true杩斿洖鍑芥暟
	var returnTrue = function() {
		return true
	};
	//榛樿false杩斿洖鍑芥暟
	var returnFalse = function() {
		return false
	};
	//wrap娴忚鍣ㄤ簨浠�
	var compatible = function(event, target) {
		if (!event.detail) {
			event.detail = {
				currentTarget: target
			};
		} else {
			event.detail.currentTarget = target;
		}
		$.each(eventMethods, function(name, predicate) {
			var sourceMethod = event[name];
			event[name] = function() {
				this[predicate] = returnTrue;
				return sourceMethod && sourceMethod.apply(event, arguments)
			}
			event[predicate] = returnFalse;
		}, true);
		return event;
	};
	//绠€鍗曠殑wrap瀵硅薄_mid
	var mid = function(obj) {
		return obj && (obj._mid || (obj._mid = _mid++));
	};
	//浜嬩欢濮旀墭瀵硅薄缁戝畾鐨勪簨浠跺洖璋冨垪琛�
	var delegateFns = {};
	//杩斿洖浜嬩欢濮旀墭鐨剋rap浜嬩欢鍥炶皟
	var delegateFn = function(element, event, selector, callback) {
		return function(e) {
			//same event
			var callbackObjs = delegates[element._mid][event];
			var handlerQueue = [];
			var target = e.target;
			var selectorAlls = {};
			for (; target && target !== document; target = target.parentNode) {
				if (target === element) {
					break;
				}
				if (~['click', 'tap', 'doubletap', 'longtap', 'hold'].indexOf(event) && (target.disabled || target.classList.contains('mui-disabled'))) {
					break;
				}
				var matches = {};
				$.each(callbackObjs, function(selector, callbacks) { //same selector
					selectorAlls[selector] || (selectorAlls[selector] = $.qsa(selector, element));
					if (selectorAlls[selector] && ~(selectorAlls[selector]).indexOf(target)) {
						if (!matches[selector]) {
							matches[selector] = callbacks;
						}
					}
				}, true);
				if (!$.isEmptyObject(matches)) {
					handlerQueue.push({
						element: target,
						handlers: matches
					});
				}
			}
			selectorAlls = null;
			e = compatible(e); //compatible event
			$.each(handlerQueue, function(index, handler) {
				target = handler.element;
				var tagName = target.tagName;
				if (event === 'tap' && (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && tagName !== 'SELECT')) {
					e.preventDefault();
					e.detail && e.detail.gesture && e.detail.gesture.preventDefault();
				}
				$.each(handler.handlers, function(index, handler) {
					$.each(handler, function(index, callback) {
						if (callback.call(target, e) === false) {
							e.preventDefault();
							e.stopPropagation();
						}
					}, true);
				}, true)
				if (e.isPropagationStopped()) {
					return false;
				}
			}, true);
		};
	};
	var findDelegateFn = function(element, event) {
		var delegateCallbacks = delegateFns[mid(element)];
		var result = [];
		if (delegateCallbacks) {
			result = [];
			if (event) {
				var filterFn = function(fn) {
					return fn.type === event;
				}
				return delegateCallbacks.filter(filterFn);
			} else {
				result = delegateCallbacks;
			}
		}
		return result;
	};
	var preventDefaultException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
	/**
	 * mui delegate events
	 * @param {type} event
	 * @param {type} selector
	 * @param {type} callback
	 * @returns {undefined}
	 */
	$.fn.on = function(event, selector, callback) { //浠呮敮鎸佺畝鍗曠殑浜嬩欢濮旀墭,涓昏鏄痶ap浜嬩欢浣跨敤锛岀被浼糾ouse,focus涔嬬被鏆備笉灏佽鏀寔
		return this.each(function() {
			var element = this;
			mid(element);
			mid(callback);
			var isAddEventListener = false;
			var delegateEvents = delegates[element._mid] || (delegates[element._mid] = {});
			var delegateCallbackObjs = delegateEvents[event] || ((delegateEvents[event] = {}));
			if ($.isEmptyObject(delegateCallbackObjs)) {
				isAddEventListener = true;
			}
			var delegateCallbacks = delegateCallbackObjs[selector] || (delegateCallbackObjs[selector] = []);
			delegateCallbacks.push(callback);
			if (isAddEventListener) {
				var delegateFnArray = delegateFns[mid(element)];
				if (!delegateFnArray) {
					delegateFnArray = [];
				}
				var delegateCallback = delegateFn(element, event, selector, callback);
				delegateFnArray.push(delegateCallback);
				delegateCallback.i = delegateFnArray.length - 1;
				delegateCallback.type = event;
				delegateFns[mid(element)] = delegateFnArray;
				element.addEventListener(event, delegateCallback);
				if (event === 'tap') { //TODO 闇€瑕佹壘涓洿濂界殑瑙ｅ喅鏂规
					element.addEventListener('click', function(e) {
						if (e.target) {
							var tagName = e.target.tagName;
							if (!preventDefaultException.test(tagName)) {
								if (tagName === 'A') {
									var href = e.target.href;
									if (!(href && ~href.indexOf('tel:'))) {
										e.preventDefault();
									}
								} else {
									e.preventDefault();
								}
							}
						}
					});
				}
			}
		});
	};
	$.fn.off = function(event, selector, callback) {
		return this.each(function() {
			var _mid = mid(this);
			if (!event) { //mui(selector).off();
				delegates[_mid] && delete delegates[_mid];
			} else if (!selector) { //mui(selector).off(event);
				delegates[_mid] && delete delegates[_mid][event];
			} else if (!callback) { //mui(selector).off(event,selector);
				delegates[_mid] && delegates[_mid][event] && delete delegates[_mid][event][selector];
			} else { //mui(selector).off(event,selector,callback);
				var delegateCallbacks = delegates[_mid] && delegates[_mid][event] && delegates[_mid][event][selector];
				$.each(delegateCallbacks, function(index, delegateCallback) {
					if (mid(delegateCallback) === mid(callback)) {
						delegateCallbacks.splice(index, 1);
						return false;
					}
				}, true);
			}
			if (delegates[_mid]) {
				//濡傛灉off鎺変簡鎵€鏈夊綋鍓峞lement鐨勬寚瀹氱殑event浜嬩欢锛屽垯remove鎺夊綋鍓峞lement鐨刣elegate鍥炶皟
				if ((!delegates[_mid][event] || $.isEmptyObject(delegates[_mid][event]))) {
					findDelegateFn(this, event).forEach(function(fn) {
						this.removeEventListener(fn.type, fn);
						delete delegateFns[_mid][fn.i];
					}.bind(this));
				}
			} else {
				//濡傛灉delegates[_mid]宸蹭笉瀛樺湪锛屽垹闄ゆ墍鏈�
				findDelegateFn(this).forEach(function(fn) {
					this.removeEventListener(fn.type, fn);
					delete delegateFns[_mid][fn.i];
				}.bind(this));
			}
		});

	};
})(mui);
/**
 * mui target(action>popover>modal>tab>toggle)
 */
(function($, window, document) {
	/**
	 * targets
	 */
	$.targets = {};
	/**
	 * target handles
	 */
	$.targetHandles = [];
	/**
	 * register target
	 * @param {type} target
	 * @returns {$.targets}
	 */
	$.registerTarget = function(target) {

		target.index = target.index || 1000;

		$.targetHandles.push(target);

		$.targetHandles.sort(function(a, b) {
			return a.index - b.index;
		});

		return $.targetHandles;
	};
	window.addEventListener($.EVENT_START, function(event) {
		var target = event.target;
		var founds = {};
		for (; target && target !== document; target = target.parentNode) {
			var isFound = false;
			$.each($.targetHandles, function(index, targetHandle) {
				var name = targetHandle.name;
				if (!isFound && !founds[name] && targetHandle.hasOwnProperty('handle')) {
					$.targets[name] = targetHandle.handle(event, target);
					if ($.targets[name]) {
						founds[name] = true;
						if (targetHandle.isContinue !== true) {
							isFound = true;
						}
					}
				} else {
					if (!founds[name]) {
						if (targetHandle.isReset !== false)
							$.targets[name] = false;
					}
				}
			});
			if (isFound) {
				break;
			}
		}
	});
	window.addEventListener('click', function(event) { //瑙ｅ喅touch涓巆lick鐨則arget涓嶄竴鑷寸殑闂(姣斿閾炬帴杈圭紭鐐瑰嚮鏃讹紝touch鐨則arget涓篽tml锛岃€宑lick鐨則arget涓篈)
		var target = event.target;
		var isFound = false;
		for (; target && target !== document; target = target.parentNode) {
			if (target.tagName === 'A') {
				$.each($.targetHandles, function(index, targetHandle) {
					var name = targetHandle.name;
					if (targetHandle.hasOwnProperty('handle')) {
						if (targetHandle.handle(event, target)) {
							isFound = true;
							event.preventDefault();
							return false;
						}
					}
				});
				if (isFound) {
					break;
				}
			}
		}
	});
})(mui, window, document);
/**
 * fixed trim
 * @param {type} undefined
 * @returns {undefined}
 */
(function(undefined) {
	if (String.prototype.trim === undefined) { // fix for iOS 3.2
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
		obj['__proto__'] = proto;
		return obj;
	};

})();
/**
 * fixed CustomEvent
 */
(function() {
	if (typeof window.CustomEvent === 'undefined') {
		function CustomEvent(event, params) {
			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};
			var evt = document.createEvent('Events');
			var bubbles = true;
			for (var name in params) {
				(name === 'bubbles') ? (bubbles = !!params[name]) : (evt[name] = params[name]);
			}
			evt.initEvent(event, bubbles, true);
			return evt;
		};
		CustomEvent.prototype = window.Event.prototype;
		window.CustomEvent = CustomEvent;
	}
})();
/*
	A shim for non ES5 supporting browsers.
	Adds function bind to Function prototype, so that you can do partial application.
	Works even with the nasty thing, where the first word is the opposite of extranet, the second one is the profession of Columbus, and the version number is 9, flipped 180 degrees.
*/

Function.prototype.bind = Function.prototype.bind || function(to) {
	// Make an array of our arguments, starting from second argument
	var partial = Array.prototype.splice.call(arguments, 1),
		// We'll need the original function.
		fn = this;
	var bound = function() {
			// Join the already applied arguments to the now called ones (after converting to an array again).
			var args = partial.concat(Array.prototype.splice.call(arguments, 0));
			// If not being called as a constructor
			if (!(this instanceof bound)) {
				// return the result of the function called bound to target and partially applied.
				return fn.apply(to, args);
			}
			// If being called as a constructor, apply the function bound to self.
			fn.apply(this, args);
		}
		// Attach the prototype of the function to our newly created function.
	bound.prototype = fn.prototype;
	return bound;
};
/**
 * mui fixed classList
 * @param {type} document
 * @returns {undefined}
 */
(function(document) {
    if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {

        Object.defineProperty(HTMLElement.prototype, 'classList', {
            get: function() {
                var self = this;
                function update(fn) {
                    return function(value) {
                        var classes = self.className.split(/\s+/),
                                index = classes.indexOf(value);

                        fn(classes, index, value);
                        self.className = classes.join(" ");
                    };
                }

                var ret = {
                    add: update(function(classes, index, value) {
                        ~index || classes.push(value);
                    }),
                    remove: update(function(classes, index) {
                        ~index && classes.splice(index, 1);
                    }),
                    toggle: update(function(classes, index, value) {
                        ~index ? classes.splice(index, 1) : classes.push(value);
                    }),
                    contains: function(value) {
                        return !!~self.className.split(/\s+/).indexOf(value);
                    },
                    item: function(i) {
                        return self.className.split(/\s+/)[i] || null;
                    }
                };

                Object.defineProperty(ret, 'length', {
                    get: function() {
                        return self.className.split(/\s+/).length;
                    }
                });

                return ret;
            }
        });
    }
})(document);

/**
 * mui fixed requestAnimationFrame
 * @param {type} window
 * @returns {undefined}
 */
(function(window) {
	if (!window.requestAnimationFrame) {
		var lastTime = 0;
		window.requestAnimationFrame = window.webkitRequestAnimationFrame || function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || function(id) {
			clearTimeout(id);
		};
	};
}(window));
/**
 * fastclick(only for radio,checkbox)
 */
(function($, window, name) {
	if (!$.os.android && !$.os.ios) { //鐩墠浠呰瘑鍒玜ndroid鍜宨os
		return;
	}
	if (window.FastClick) {
		return;
	}

	var handle = function(event, target) {
		if (target.tagName === 'LABEL') {
			if (target.parentNode) {
				target = target.parentNode.querySelector('input');
			}
		}
		if (target && (target.type === 'radio' || target.type === 'checkbox')) {
			if (!target.disabled) { //disabled
				return target;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 40,
		handle: handle,
		target: false
	});
	var dispatchEvent = function(event) {
		var targetElement = $.targets.click;
		if (targetElement) {
			var clickEvent, touch;
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
			touch = event.detail.gesture.changedTouches[0];
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
			event.detail && event.detail.gesture.preventDefault();
		}
	};
	window.addEventListener('tap', dispatchEvent);
	window.addEventListener('doubletap', dispatchEvent);
	//鎹曡幏
	window.addEventListener('click', function(event) {
		if ($.targets.click) {
			if (!event.forwardedTouchEvent) { //stop click
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation
					event.propagationStopped = true;
				}
				event.stopPropagation();
				event.preventDefault();
				return false;
			}
		}
	}, true);

})(mui, window, 'click');
(function($, document) {
	$(function() {
		if (!$.os.ios) {
			return;
		}
		var CLASS_FOCUSIN = 'mui-focusin';
		var CLASS_BAR_TAB = 'mui-bar-tab';
		var CLASS_BAR_FOOTER = 'mui-bar-footer';
		var CLASS_BAR_FOOTER_SECONDARY = 'mui-bar-footer-secondary';
		var CLASS_BAR_FOOTER_SECONDARY_TAB = 'mui-bar-footer-secondary-tab';
		// var content = document.querySelector('.' + CLASS_CONTENT);
		// if (content) {
		// 	document.body.insertBefore(content, document.body.firstElementChild);
		// }
		document.addEventListener('focusin', function(e) {
			if ($.os.plus) { //鍦ㄧ埗webview閲岃竟涓峟ix
				if (window.plus) {
					if (plus.webview.currentWebview().children().length > 0) {
						return;
					}
				}
			}
			var target = e.target;
			//TODO 闇€鑰冭檻鎵€鏈夐敭鐩樺脊璧风殑鎯呭喌
			if (target.tagName && (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && (target.type === 'text' || target.type === 'search' || target.type === 'number')))) {
				if (target.disabled || target.readOnly) {
					return;
				}
				document.body.classList.add(CLASS_FOCUSIN);
				var isFooter = false;
				for (; target && target !== document; target = target.parentNode) {
					var classList = target.classList;
					if (classList && classList.contains(CLASS_BAR_TAB) || classList.contains(CLASS_BAR_FOOTER) || classList.contains(CLASS_BAR_FOOTER_SECONDARY) || classList.contains(CLASS_BAR_FOOTER_SECONDARY_TAB)) {
						isFooter = true;
						break;
					}
				}
				if (isFooter) {
					var scrollTop = document.body.scrollHeight;
					var scrollLeft = document.body.scrollLeft;
					setTimeout(function() {
						window.scrollTo(scrollLeft, scrollTop);
					}, 20);
				}
			}
		});
		document.addEventListener('focusout', function(e) {
			var classList = document.body.classList;
			if (classList.contains(CLASS_FOCUSIN)) {
				classList.remove(CLASS_FOCUSIN);
				setTimeout(function() {
					window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
				}, 20);
			}
		});
	});
})(mui, document);
/**
 * mui namespace(optimization)
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.namespace = 'mui';
	$.classNamePrefix = $.namespace + '-';
	$.classSelectorPrefix = '.' + $.classNamePrefix;
	/**
	 * 杩斿洖姝ｇ‘鐨刢lassName
	 * @param {type} className
	 * @returns {String}
	 */
	$.className = function(className) {
		return $.classNamePrefix + className;
	};
	/**
	 * 杩斿洖姝ｇ‘鐨刢lassSelector
	 * @param {type} classSelector
	 * @returns {String}
	 */
	$.classSelector = function(classSelector) {
		return classSelector.replace(/\./g, $.classSelectorPrefix);
	};
	/**
         * 杩斿洖姝ｇ‘鐨別ventName
         * @param {type} event
         * @param {type} module
         * @returns {String}
         */
	$.eventName = function(event, module) {
		return event + ($.namespace ? ('.' + $.namespace) : '') + ( module ? ('.' + module) : '');
	};
})(mui);

/**
 * mui gestures
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	$.gestures = {
		session: {}
	};
	/**
	 * Gesture preventDefault
	 * @param {type} e
	 * @returns {undefined}
	 */
	$.preventDefault = function(e) {
		e.preventDefault();
	};
	/**
	 * Gesture stopPropagation
	 * @param {type} e
	 * @returns {undefined}
	 */
	$.stopPropagation = function(e) {
		e.stopPropagation();
	};

	/**
	 * register gesture
	 * @param {type} gesture
	 * @returns {$.gestures}
	 */
	$.addGesture = function(gesture) {
		return $.addAction('gestures', gesture);

	};

	var round = Math.round;
	var abs = Math.abs;
	var sqrt = Math.sqrt;
	var atan = Math.atan;
	var atan2 = Math.atan2;
	/**
	 * distance
	 * @param {type} p1
	 * @param {type} p2
	 * @returns {Number}
	 */
	var getDistance = function(p1, p2, props) {
		if (!props) {
			props = ['x', 'y'];
		}
		var x = p2[props[0]] - p1[props[0]];
		var y = p2[props[1]] - p1[props[1]];
		return sqrt((x * x) + (y * y));
	};
	/**
	 * scale
	 * @param {Object} starts
	 * @param {Object} moves
	 */
	var getScale = function(starts, moves) {
		if (starts.length >= 2 && moves.length >= 2) {
			var props = ['pageX', 'pageY'];
			return getDistance(moves[1], moves[0], props) / getDistance(starts[1], starts[0], props);
		}
		return 1;
	};
	/**
	 * angle
	 * @param {type} p1
	 * @param {type} p2
	 * @returns {Number}
	 */
	var getAngle = function(p1, p2, props) {
		if (!props) {
			props = ['x', 'y'];
		}
		var x = p2[props[0]] - p1[props[0]];
		var y = p2[props[1]] - p1[props[1]];
		return atan2(y, x) * 180 / Math.PI;
	};
	/**
	 * direction
	 * @param {Object} x
	 * @param {Object} y
	 */
	var getDirection = function(x, y) {
		if (x === y) {
			return '';
		}
		if (abs(x) >= abs(y)) {
			return x > 0 ? 'left' : 'right';
		}
		return y > 0 ? 'up' : 'down';
	};
	/**
	 * rotation
	 * @param {Object} start
	 * @param {Object} end
	 */
	var getRotation = function(start, end) {
		var props = ['pageX', 'pageY'];
		return getAngle(end[1], end[0], props) - getAngle(start[1], start[0], props);
	};
	/**
	 * px per ms
	 * @param {Object} deltaTime
	 * @param {Object} x
	 * @param {Object} y
	 */
	var getVelocity = function(deltaTime, x, y) {
		return {
			x: x / deltaTime || 0,
			y: y / deltaTime || 0
		};
	};
	/**
	 * detect gestures
	 * @param {type} event
	 * @param {type} touch
	 * @returns {undefined}
	 */
	var detect = function(event, touch) {
		if ($.gestures.stoped) {
			return;
		}
		$.doAction('gestures', function(index, gesture) {
			if (!$.gestures.stoped) {
				if ($.options.gestureConfig[gesture.name] !== false) {
					gesture.handle(event, touch);
				}
			}
		});
	};
	/**
	 * 鏆傛椂鏃犵敤
	 * @param {Object} node
	 * @param {Object} parent
	 */
	var hasParent = function(node, parent) {
		while (node) {
			if (node == parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	};

	var uniqueArray = function(src, key, sort) {
		var results = [];
		var values = [];
		var i = 0;

		while (i < src.length) {
			var val = key ? src[i][key] : src[i];
			if (values.indexOf(val) < 0) {
				results.push(src[i]);
			}
			values[i] = val;
			i++;
		}

		if (sort) {
			if (!key) {
				results = results.sort();
			} else {
				results = results.sort(function sortUniqueArray(a, b) {
					return a[key] > b[key];
				});
			}
		}

		return results;
	};
	var getMultiCenter = function(touches) {
		var touchesLength = touches.length;
		if (touchesLength === 1) {
			return {
				x: round(touches[0].pageX),
				y: round(touches[0].pageY)
			};
		}

		var x = 0;
		var y = 0;
		var i = 0;
		while (i < touchesLength) {
			x += touches[i].pageX;
			y += touches[i].pageY;
			i++;
		}

		return {
			x: round(x / touchesLength),
			y: round(y / touchesLength)
		};
	};
	var multiTouch = function() {
		return $.options.gestureConfig.pinch;
	};
	var copySimpleTouchData = function(touch) {
		var touches = [];
		var i = 0;
		while (i < touch.touches.length) {
			touches[i] = {
				pageX: round(touch.touches[i].pageX),
				pageY: round(touch.touches[i].pageY)
			};
			i++;
		}
		return {
			timestamp: $.now(),
			gesture: touch.gesture,
			touches: touches,
			center: getMultiCenter(touch.touches),
			deltaX: touch.deltaX,
			deltaY: touch.deltaY
		};
	};

	var calDelta = function(touch) {
		var session = $.gestures.session;
		var center = touch.center;
		var offset = session.offsetDelta || {};
		var prevDelta = session.prevDelta || {};
		var prevTouch = session.prevTouch || {};

		if (touch.gesture.type === $.EVENT_START || touch.gesture.type === $.EVENT_END) {
			prevDelta = session.prevDelta = {
				x: prevTouch.deltaX || 0,
				y: prevTouch.deltaY || 0
			};

			offset = session.offsetDelta = {
				x: center.x,
				y: center.y
			};
		}
		touch.deltaX = prevDelta.x + (center.x - offset.x);
		touch.deltaY = prevDelta.y + (center.y - offset.y);
	};
	var calTouchData = function(touch) {
		var session = $.gestures.session;
		var touches = touch.touches;
		var touchesLength = touches.length;

		if (!session.firstTouch) {
			session.firstTouch = copySimpleTouchData(touch);
		}

		if (multiTouch() && touchesLength > 1 && !session.firstMultiTouch) {
			session.firstMultiTouch = copySimpleTouchData(touch);
		} else if (touchesLength === 1) {
			session.firstMultiTouch = false;
		}

		var firstTouch = session.firstTouch;
		var firstMultiTouch = session.firstMultiTouch;
		var offsetCenter = firstMultiTouch ? firstMultiTouch.center : firstTouch.center;

		var center = touch.center = getMultiCenter(touches);
		touch.timestamp = $.now();
		touch.deltaTime = touch.timestamp - firstTouch.timestamp;

		touch.angle = getAngle(offsetCenter, center);
		touch.distance = getDistance(offsetCenter, center);

		calDelta(touch);

		touch.offsetDirection = getDirection(touch.deltaX, touch.deltaY);

		touch.scale = firstMultiTouch ? getScale(firstMultiTouch.touches, touches) : 1;
		touch.rotation = firstMultiTouch ? getRotation(firstMultiTouch.touches, touches) : 0;

		calIntervalTouchData(touch);

	};
	var CAL_INTERVAL = 25;
	var calIntervalTouchData = function(touch) {
		var session = $.gestures.session;
		var last = session.lastInterval || touch;
		var deltaTime = touch.timestamp - last.timestamp;
		var velocity;
		var velocityX;
		var velocityY;
		var direction;

		if (touch.gesture.type != $.EVENT_CANCEL && (deltaTime > CAL_INTERVAL || last.velocity === undefined)) {
			var deltaX = last.deltaX - touch.deltaX;
			var deltaY = last.deltaY - touch.deltaY;

			var v = getVelocity(deltaTime, deltaX, deltaY);
			velocityX = v.x;
			velocityY = v.y;
			velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
			direction = getDirection(deltaX, deltaY) || last.direction;

			session.lastInterval = touch;
		} else {
			velocity = last.velocity;
			velocityX = last.velocityX;
			velocityY = last.velocityY;
			direction = last.direction;
		}

		touch.velocity = velocity;
		touch.velocityX = velocityX;
		touch.velocityY = velocityY;
		touch.direction = direction;
	};
	var targetIds = {};
	var convertTouches = function(touches) {
		for (var i = 0; i < touches.length; i++) {
			!touches['identifier'] && (touches['identifier'] = 0);
		}
		return touches;
	};
	var getTouches = function(event, touch) {
		var allTouches = convertTouches($.slice.call(event.touches || [event]));

		var type = event.type;

		var targetTouches = [];
		var changedTargetTouches = [];

		//褰搕ouchstart鎴杢ouchmove涓攖ouches闀垮害涓�1锛岀洿鎺ヨ幏寰梐ll鍜宑hanged
		if ((type === $.EVENT_START || type === $.EVENT_MOVE) && allTouches.length === 1) {
			targetIds[allTouches[0].identifier] = true;
			targetTouches = allTouches;
			changedTargetTouches = allTouches;
			touch.target = event.target;
		} else {
			var i = 0;
			var targetTouches = [];
			var changedTargetTouches = [];
			var changedTouches = convertTouches($.slice.call(event.changedTouches || [event]));

			touch.target = event.target;
			var sessionTarget = $.gestures.session.target || event.target;
			targetTouches = allTouches.filter(function(touch) {
				return hasParent(touch.target, sessionTarget);
			});

			if (type === $.EVENT_START) {
				i = 0;
				while (i < targetTouches.length) {
					targetIds[targetTouches[i].identifier] = true;
					i++;
				}
			}

			i = 0;
			while (i < changedTouches.length) {
				if (targetIds[changedTouches[i].identifier]) {
					changedTargetTouches.push(changedTouches[i]);
				}
				if (type === $.EVENT_END || type === $.EVENT_CANCEL) {
					delete targetIds[changedTouches[i].identifier];
				}
				i++;
			}

			if (!changedTargetTouches.length) {
				return false;
			}
		}
		targetTouches = uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true);
		var touchesLength = targetTouches.length;
		var changedTouchesLength = changedTargetTouches.length;
		if (type === $.EVENT_START && touchesLength - changedTouchesLength === 0) { //first
			touch.isFirst = true;
			$.gestures.touch = $.gestures.session = {
				target: event.target
			};
		}
		touch.isFinal = ((type === $.EVENT_END || type === $.EVENT_CANCEL) && (touchesLength - changedTouchesLength === 0));

		touch.touches = targetTouches;
		touch.changedTouches = changedTargetTouches;
		return true;

	};
	var handleTouchEvent = function(event) {
		var touch = {
			gesture: event
		};
		var touches = getTouches(event, touch);
		if (!touches) {
			return;
		}
		calTouchData(touch);
		detect(event, touch);
		$.gestures.session.prevTouch = touch;
		if (event.type === $.EVENT_END && !$.isTouchable) {
			$.gestures.touch = $.gestures.session = {};
		}
	};
	window.addEventListener($.EVENT_START, handleTouchEvent);
	window.addEventListener($.EVENT_MOVE, handleTouchEvent);
	window.addEventListener($.EVENT_END, handleTouchEvent);
	window.addEventListener($.EVENT_CANCEL, handleTouchEvent);
	//fixed hashchange(android)
	window.addEventListener($.EVENT_CLICK, function(e) {
		//TODO 搴旇鍒ゆ柇褰撳墠target鏄笉鏄湪targets.popover鍐呴儴锛岃€屼笉鏄潪瑕佺浉绛�
		if (($.os.android || $.os.ios) && (($.targets.popover && e.target === $.targets.popover) || ($.targets.tab) || $.targets.offcanvas || $.targets.modal)) {
			e.preventDefault();
		}
	}, true);


	//澧炲姞鍘熺敓婊氬姩璇嗗埆
	$.isScrolling = false;
	var scrollingTimeout = null;
	window.addEventListener('scroll', function() {
		$.isScrolling = true;
		scrollingTimeout && clearTimeout(scrollingTimeout);
		scrollingTimeout = setTimeout(function() {
			$.isScrolling = false;
		}, 250);
	});
})(mui, window);
/**
 * mui gesture flick[left|right|up|down]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var flickStartTime = 0;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		var now = $.now();
		switch (event.type) {
			case $.EVENT_MOVE:
				if (now - flickStartTime > 300) {
					flickStartTime = now;
					session.flickStart = touch.center;
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				touch.flick = false;
				if (session.flickStart && options.flickMaxTime > (now - flickStartTime) && touch.distance > options.flickMinDistince) {
					touch.flick = true;
					touch.flickTime = now - flickStartTime;
					touch.flickDistanceX = touch.center.x - session.flickStart.x;
					touch.flickDistanceY = touch.center.y - session.flickStart.y;
					$.trigger(session.target, name, touch);
					$.trigger(session.target, name + touch.direction, touch);
				}
				break;
		}

	};
	/**
	 * mui gesture flick
	 */
	$.addGesture({
		name: name,
		index: 5,
		handle: handle,
		options: {
			flickMaxTime: 200,
			flickMinDistince: 10
		}
	});
})(mui, 'flick');
/**
 * mui gesture swipe[left|right|up|down]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var session = $.gestures.session;
		if (event.type === $.EVENT_END || event.type === $.EVENT_CANCEL) {
			var options = this.options;
			touch.swipe = false;
			//TODO 鍚庣画鏍规嵁velocity璁＄畻
			if (touch.direction && options.swipeMaxTime > touch.deltaTime && touch.distance > options.swipeMinDistince) {
				touch.swipe = true;
				$.trigger(session.target, name, touch);
				$.trigger(session.target, name + touch.direction, touch);
			}
		}
	};
	/**
	 * mui gesture swipe
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			swipeMaxTime: 300,
			swipeMinDistince: 18
		}
	});
})(mui, 'swipe');
/**
 * mui gesture drag[start|left|right|up|down|end]
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var session = $.gestures.session;
		switch (event.type) {
			case $.EVENT_START:
				break;
			case $.EVENT_MOVE:
				if (!touch.direction || !session.target) {
					return;
				}
				//淇direction,鍙湪session鏈熼棿鑷閿佸畾鎷栨嫿鏂瑰悜锛屾柟渚垮紑鍙憇croll绫讳笉鍚屾柟鍚戞嫋鎷芥彃浠跺祵濂�
				if (session.lockDirection && session.startDirection) {
					if (session.startDirection && session.startDirection !== touch.direction) {
						if (session.startDirection === 'up' || session.startDirection === 'down') {
							touch.direction = touch.deltaY < 0 ? 'up' : 'down';
						} else {
							touch.direction = touch.deltaX < 0 ? 'left' : 'right';
						}
					}
				}

				if (!session.drag) {
					session.drag = true;
					$.trigger(session.target, name + 'start', touch);
				}
				$.trigger(session.target, name, touch);
				$.trigger(session.target, name + touch.direction, touch);
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if (session.drag && touch.isFinal) {
					$.trigger(session.target, name + 'end', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture drag
	 */
	$.addGesture({
		name: name,
		index: 20,
		handle: handle,
		options: {
			fingers: 1
		}
	});
})(mui, 'drag');
/**
 * mui gesture tap and doubleTap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var lastTarget;
	var lastTapTime;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_END:
				if (!touch.isFinal) {
					return;
				}
				var target = session.target;
				if (!target || (target.disabled || (target.classList && target.classList.contains('mui-disabled')))) {
					return;
				}
				if (touch.distance < options.tapMaxDistance && touch.deltaTime < options.tapMaxTime) {
					if ($.options.gestureConfig.doubletap && lastTarget && (lastTarget === target)) { //same target
						if (lastTapTime && (touch.timestamp - lastTapTime) < options.tapMaxInterval) {
							$.trigger(target, 'doubletap', touch);
							lastTapTime = $.now();
							lastTarget = target;
							return;
						}
					}
					$.trigger(target, name, touch);
					lastTapTime = $.now();
					lastTarget = target;
				}
				break;
		}
	};
	/**
	 * mui gesture tap
	 */
	$.addGesture({
		name: name,
		index: 30,
		handle: handle,
		options: {
			fingers: 1,
			tapMaxInterval: 300,
			tapMaxDistance: 5,
			tapMaxTime: 250
		}
	});
})(mui, 'tap');
/**
 * mui gesture longtap
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var timer;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_START:
				clearTimeout(timer);
				timer = setTimeout(function() {
					$.trigger(session.target, name, touch);
				}, options.holdTimeout);
				break;
			case $.EVENT_MOVE:
				if (touch.distance > options.holdThreshold) {
					clearTimeout(timer);
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				clearTimeout(timer);
				break;
		}
	};
	/**
	 * mui gesture longtap
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			fingers: 1,
			holdTimeout: 500,
			holdThreshold: 2
		}
	});
})(mui, 'longtap');
/**
 * mui gesture hold
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var timer;
	var handle = function(event, touch) {
		var session = $.gestures.session;
		var options = this.options;
		switch (event.type) {
			case $.EVENT_START:
				if ($.options.gestureConfig.hold) {
					timer && clearTimeout(timer);
					timer = setTimeout(function() {
						touch.hold = true;
						$.trigger(session.target, name, touch);
					}, options.holdTimeout);
				}
				break;
			case $.EVENT_MOVE:
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if (timer) {
					clearTimeout(timer) && (timer = null);
					$.trigger(session.target, 'release', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture hold
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			fingers: 1,
			holdTimeout: 0
		}
	});
})(mui, 'hold');
/**
 * mui gesture pinch
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var handle = function(event, touch) {
		var options = this.options;
		var session = $.gestures.session;
		switch (event.type) {
			case $.EVENT_START:
				break;
			case $.EVENT_MOVE:
				if ($.options.gestureConfig.pinch) {
					if (touch.touches.length < 2) {
						return;
					}
					if (!session.pinch) { //start
						session.pinch = true;
						$.trigger(session.target, name + 'start', touch);
					}
					$.trigger(session.target, name, touch);
					var scale = touch.scale;
					var rotation = touch.rotation;
					var lastScale = typeof touch.lastScale === 'undefined' ? 1 : touch.lastScale;
					var scaleDiff = 0.000000000001; //闃叉scale涓巐astScale鐩哥瓑锛屼笉瑙﹀彂浜嬩欢鐨勬儏鍐点€�
					if (scale > lastScale) { //out
						lastScale = scale - scaleDiff;
						$.trigger(session.target, name + 'out', touch);
					} //in
					else if (scale < lastScale) {
						lastScale = scale + scaleDiff;
						$.trigger(session.target, name + 'in', touch);
					}
					if (Math.abs(rotation) > options.minRotationAngle) {
						$.trigger(session.target, 'rotate', touch);
					}
				}
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				if ($.options.gestureConfig.pinch && session.pinch && touch.touches.length === 2) {
					session.pinch = false;
					$.trigger(session.target, name + 'end', touch);
				}
				break;
		}
	};
	/**
	 * mui gesture pinch
	 */
	$.addGesture({
		name: name,
		index: 10,
		handle: handle,
		options: {
			minRotationAngle: 0
		}
	});
})(mui, 'pinch');
/**
 * mui.init
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.global = $.options = {
		gestureConfig: {
			tap: true,
			doubletap: false,
			longtap: false,
			hold: false,
			flick: true,
			swipe: true,
			drag: true,
			pinch: false
		}
	};
	/**
	 *
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.initGlobal = function(options) {
		$.options = $.extend(true, $.global, options);
		return this;
	};
	var inits = {};

	/**
	 * 鍗曢〉閰嶇疆 鍒濆鍖�
	 * @param {object} options
	 */
	$.init = function(options) {
		$.options = $.extend(true, $.global, options || {});
		$.ready(function() {
			$.doAction('inits', function(index, init) {
				var isInit = !!(!inits[init.name] || init.repeat);
				if (isInit) {
					init.handle.call($);
					inits[init.name] = true;
				}
			});
		});
		return this;
	};

	/**
	 * 澧炲姞鍒濆鍖栨墽琛屾祦绋�
	 * @param {function} init
	 */
	$.addInit = function(init) {
		return $.addAction('inits', init);
	};
	/**
	 * 澶勭悊html5鐗堟湰subpages 
	 */
	$.addInit({
		name: 'iframe',
		index: 100,
		handle: function() {
			var options = $.options;
			var subpages = options.subpages || [];
			if (!$.os.plus && subpages.length) {
				//鏆傛椂鍙鐞嗗崟涓猻ubpage銆傚悗缁彲浠ヨ€冭檻鏀寔澶氫釜subpage
				createIframe(subpages[0]);
			}
		}
	});
	var createIframe = function(options) {
		var wrapper = document.createElement('div');
		wrapper.className = 'mui-iframe-wrapper';
		var styles = options.styles || {};
		if (typeof styles.top !== 'string') {
			styles.top = '0px';
		}
		if (typeof styles.bottom !== 'string') {
			styles.bottom = '0px';
		}
		wrapper.style.top = styles.top;
		wrapper.style.bottom = styles.bottom;
		var iframe = document.createElement('iframe');
		iframe.src = options.url;
		iframe.id = options.id || options.url;
		iframe.name = iframe.id;
		wrapper.appendChild(iframe);
		document.body.appendChild(wrapper);
		//鐩墠浠呭鐞嗗井淇�
		$.os.wechat && handleScroll(wrapper, iframe);
	};

	function handleScroll(wrapper, iframe) {
		var key = 'MUI_SCROLL_POSITION_' + document.location.href + '_' + iframe.src;
		var scrollTop = (parseFloat(localStorage.getItem(key)) || 0);
		if (scrollTop) {
			(function(y) {
				iframe.onload = function() {
					window.scrollTo(0, y);
				};
			})(scrollTop);
		}
		setInterval(function() {
			var _scrollTop = window.scrollY;
			if (scrollTop !== _scrollTop) {
				localStorage.setItem(key, _scrollTop + '');
				scrollTop = _scrollTop;
			}
		}, 100);
	};
	$(function() {
		var classList = document.body.classList;
		var os = [];
		if ($.os.ios) {
			os.push({
				os: 'ios',
				version: $.os.version
			});
			classList.add('mui-ios');
		} else if ($.os.android) {
			os.push({
				os: 'android',
				version: $.os.version
			});
			classList.add('mui-android');
		}
		if ($.os.wechat) {
			os.push({
				os: 'wechat',
				version: $.os.wechat.version
			});
			classList.add('mui-wechat');
		}
		if (os.length) {
			$.each(os, function(index, osObj) {
				var version = '';
				var classArray = [];
				if (osObj.version) {
					$.each(osObj.version.split('.'), function(i, v) {
						version = version + (version ? '-' : '') + v;
						classList.add($.className(osObj.os + '-' + version));
					});
				}
			});
		}
	});
})(mui);
/**
 * mui.init 5+
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	var defaultOptions = {
		swipeBack: false,
		preloadPages: [], //5+ lazyLoad webview
		preloadLimit: 10, //棰勫姞杞界獥鍙ｇ殑鏁伴噺闄愬埗(涓€鏃﹁秴鍑猴紝鍏堣繘鍏堝嚭)
		keyEventBind: {
			backbutton: true,
			menubutton: true
		},
		titleConfig: {
			height: "44px",
			backgroundColor: "#f7f7f7", //瀵艰埅鏍忚儗鏅壊
			bottomBorderColor: "#cccccc", //搴曢儴杈圭嚎棰滆壊
			title: { //鏍囬閰嶇疆
				text: "", //鏍囬鏂囧瓧
				position: {
					top: 0,
					left: 0,
					width: "100%",
					height: "100%"
				},
				styles: {
					color: "#000000",
					align: "center",
					family: "'Helvetica Neue',Helvetica,sans-serif",
					size: "17px",
					style: "normal",
					weight: "normal",
					fontSrc: ""
				}
			},
			back: {
				image: {
					base64Data: '',
					imgSrc: '',
					sprite: {
						top: '0px',
						left: '0px',
						width: '100%',
						height: '100%'
					},
					position: {
						top: "10px",
						left: "10px",
						width: "24px",
						height: "24px"
					}
				}
			}
		}
	};

	//榛樿椤甸潰鍔ㄧ敾
	var defaultShow = {
		event:"titleUpdate",
		autoShow: true,
		duration: 300,
		aniShow: 'slide-in-right',
		extras:{}
	};
	//鑻ユ墽琛屼簡鏄剧ず鍔ㄧ敾鍒濆鍖栨搷浣滐紝鍒欒瑕嗙洊榛樿閰嶇疆
	if($.options.show) {
		defaultShow = $.extend(true, defaultShow, $.options.show);
	}

	$.currentWebview = null;

	$.extend(true, $.global, defaultOptions);
	$.extend(true, $.options, defaultOptions);
	/**
	 * 绛夊緟鍔ㄧ敾閰嶇疆
	 * @param {type} options
	 * @returns {Object}
	 */
	$.waitingOptions = function(options) {
		return $.extend(true, {}, {
			autoShow: true,
			title: '',
			modal: false
		}, options);
	};
	/**
	 * 绐楀彛鏄剧ず閰嶇疆
	 * @param {type} options
	 * @returns {Object}
	 */
	$.showOptions = function(options) {
		return $.extend(true, {}, defaultShow, options);
	};
	/**
	 * 绐楀彛榛樿閰嶇疆
	 * @param {type} options
	 * @returns {Object}
	 */
	$.windowOptions = function(options) {
		return $.extend({
			scalable: false,
			bounce: "" //vertical
		}, options);
	};
	/**
	 * plusReady
	 * @param {type} callback
	 * @returns {_L6.$}
	 */
	$.plusReady = function(callback) {
		if(window.plus) {
			setTimeout(function() { //瑙ｅ喅callback涓巔lusready浜嬩欢鐨勬墽琛屾椂鏈洪棶棰�(鍏稿瀷妗堜緥:showWaiting,closeWaiting)
				callback();
			}, 0);
		} else {
			document.addEventListener("plusready", function() {
				callback();
			}, false);
		}
		return this;
	};
	/**
	 * 5+ event(5+娌℃彁渚涗箣鍓嶆垜鑷繁瀹炵幇)
	 * @param {type} webview
	 * @param {type} eventType
	 * @param {type} data
	 * @returns {undefined}
	 */
	$.fire = function(webview, eventType, data) {
		if(webview) {
			if(typeof data === 'undefined') {
				data = '';
			} else if(typeof data === 'boolean' || typeof data === 'number') {
				webview.evalJS("typeof mui!=='undefined'&&mui.receive('" + eventType + "'," + data + ")");
				return;
			} else if($.isPlainObject(data) || $.isArray(data)) {
				data = JSON.stringify(data || {}).replace(/\'/g, "\\u0027").replace(/\\/g, "\\u005c");
			}
			webview.evalJS("typeof mui!=='undefined'&&mui.receive('" + eventType + "','" + data + "')");
		}
	};
	/**
	 * 5+ event(5+娌℃彁渚涗箣鍓嶆垜鑷繁瀹炵幇)
	 * @param {type} eventType
	 * @param {type} data
	 * @returns {undefined}
	 */
	$.receive = function(eventType, data) {
		if(eventType) {
			try {
				if(data && typeof data === 'string') {
					data = JSON.parse(data);
				}
			} catch(e) {}
			$.trigger(document, eventType, data);
		}
	};
	var triggerPreload = function(webview) {
		if(!webview.preloaded) { //淇濊瘉浠呰Е鍙戜竴娆�
			$.fire(webview, 'preload');
			var list = webview.children();
			for(var i = 0; i < list.length; i++) {
				$.fire(list[i], 'preload');
			}
			webview.preloaded = true;
		}
	};
	var trigger = function(webview, eventType, timeChecked) {
		if(timeChecked) {
			if(!webview[eventType + 'ed']) {
				$.fire(webview, eventType);
				var list = webview.children();
				for(var i = 0; i < list.length; i++) {
					$.fire(list[i], eventType);
				}
				webview[eventType + 'ed'] = true;
			}
		} else {
			$.fire(webview, eventType);
			var list = webview.children();
			for(var i = 0; i < list.length; i++) {
				$.fire(list[i], eventType);
			}
		}

	};
	/**
	 * 鎵撳紑鏂扮獥鍙�
	 * @param {string} url 瑕佹墦寮€鐨勯〉闈㈠湴鍧€
	 * @param {string} id 鎸囧畾椤甸潰ID
	 * @param {object} options 鍙€�:鍙傛暟,绛夊緟,绐楀彛,鏄剧ず閰嶇疆{params:{},waiting:{},styles:{},show:{}}
	 */
	$.openWindow = function(url, id, options) {
		if(typeof url === 'object') {
			options = url;
			url = options.url;
			id = options.id || url;
		} else {
			if(typeof id === 'object') {
				options = id;
				id = options.id || url;
			} else {
				id = id || url;
			}
		}
		if(!$.os.plus) {
			//TODO 鍏堜复鏃惰繖涔堝鐞嗭細鎵嬫満涓婇《灞傝烦锛孭C涓妏arent璺�
			if($.os.ios || $.os.android) {
				window.top.location.href = url;
			} else {
				window.parent.location.href = url;
			}
			return;
		}
		if(!window.plus) {
			return;
		}

		options = options || {};
		var params = options.params || {};
		var webview = null,
			webviewCache = null,
			nShow, nWaiting;

		if($.webviews[id]) {
			webviewCache = $.webviews[id];
			//webview鐪熷疄瀛樺湪锛屾墠鑳借幏鍙�
			if(plus.webview.getWebviewById(id)) {
				webview = webviewCache.webview;
			}
		} else if(options.createNew !== true) {
			webview = plus.webview.getWebviewById(id);
		}

		if(webview) { //宸茬紦瀛�
			//姣忔show閮介渶瑕佷紶閫掑姩鐢诲弬鏁帮紱
			//棰勫姞杞界殑鍔ㄧ敾鍙傛暟浼樺厛绾э細openWindow閰嶇疆>preloadPages閰嶇疆>mui榛樿閰嶇疆锛�
			nShow = webviewCache ? webviewCache.show : defaultShow;
			nShow = options.show ? $.extend(nShow, options.show) : nShow;
			nShow.autoShow && webview.show(nShow.aniShow, nShow.duration, function() {
				triggerPreload(webview);
				trigger(webview, 'pagebeforeshow', false);
			});
			if(webviewCache) {
				webviewCache.afterShowMethodName && webview.evalJS(webviewCache.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
			}
			return webview;
		} else { //鏂扮獥鍙�
			if(!url) {
				throw new Error('webview[' + id + '] does not exist');
			}

			//鏄剧ずwaiting
			var waitingConfig = $.waitingOptions(options.waiting);
			if(waitingConfig.autoShow) {
				nWaiting = plus.nativeUI.showWaiting(waitingConfig.title, waitingConfig.options);
			}

			//鍒涘缓椤甸潰
			options = $.extend(options, {
				id: id,
				url: url
			});

			webview = $.createWindow(options);

			//鏄剧ず
			nShow = $.showOptions(options.show);
			if(nShow.autoShow) {
				var showWebview = function() {
					//鍏抽棴绛夊緟妗�
					if(nWaiting) {
						nWaiting.close();
					}
					//鏄剧ず椤甸潰
					webview.show(nShow.aniShow, nShow.duration, function() {},nShow.extras);
					options.afterShowMethodName && webview.evalJS(options.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
				};
				//titleUpdate瑙﹀彂鏃舵満鏃╀簬loaded锛屾洿鎹负titleUpdate鍚庯紝鍙互鏇存棭鐨勬樉绀簑ebview
				webview.addEventListener(nShow.event, showWebview, false);
				//loaded浜嬩欢鍙戠敓鍚庯紝瑙﹀彂棰勫姞杞藉拰pagebeforeshow浜嬩欢
				webview.addEventListener("loaded", function() {
					triggerPreload(webview);
					trigger(webview, 'pagebeforeshow', false);
				}, false);
			}
		}
		return webview;
	};

	$.openWindowWithTitle = function(options, titleConfig) {
		options = options || {};
		var url = options.url;
		var id = options.id || url;

		if(!$.os.plus) {
			//TODO 鍏堜复鏃惰繖涔堝鐞嗭細鎵嬫満涓婇《灞傝烦锛孭C涓妏arent璺�
			if($.os.ios || $.os.android) {
				window.top.location.href = url;
			} else {
				window.parent.location.href = url;
			}
			return;
		}
		if(!window.plus) {
			return;
		}

		var params = options.params || {};
		var webview = null,
			webviewCache = null,
			nShow, nWaiting;

		if($.webviews[id]) {
			webviewCache = $.webviews[id];
			//webview鐪熷疄瀛樺湪锛屾墠鑳借幏鍙�
			if(plus.webview.getWebviewById(id)) {
				webview = webviewCache.webview;
			}
		} else if(options.createNew !== true) {
			webview = plus.webview.getWebviewById(id);
		}

		if(webview) { //宸茬紦瀛�
			//姣忔show閮介渶瑕佷紶閫掑姩鐢诲弬鏁帮紱
			//棰勫姞杞界殑鍔ㄧ敾鍙傛暟浼樺厛绾э細openWindow閰嶇疆>preloadPages閰嶇疆>mui榛樿閰嶇疆锛�
			nShow = webviewCache ? webviewCache.show : defaultShow;
			nShow = options.show ? $.extend(nShow, options.show) : nShow;
			nShow.autoShow && webview.show(nShow.aniShow, nShow.duration, function() {
				triggerPreload(webview);
				trigger(webview, 'pagebeforeshow', false);
			});
			if(webviewCache) {
				webviewCache.afterShowMethodName && webview.evalJS(webviewCache.afterShowMethodName + '(\'' + JSON.stringify(params) + '\')');
			}
			return webview;
		} else { //鏂扮獥鍙�
			if(!url) {
				throw new Error('webview[' + id + '] does not exist');
			}

			//鏄剧ずwaiting
			var waitingConfig = $.waitingOptions(options.waiting);
			if(waitingConfig.autoShow) {
				nWaiting = plus.nativeUI.showWaiting(waitingConfig.title, waitingConfig.options);
			}

			//鍒涘缓椤甸潰
			options = $.extend(options, {
				id: id,
				url: url
			});

			webview = $.createWindow(options);

			if(titleConfig) { //澶勭悊鍘熺敓澶�
				$.extend(true, $.options.titleConfig, titleConfig);
				var tid = $.options.titleConfig.id ? $.options.titleConfig.id : id + "_title";
				var view = new plus.nativeObj.View(tid, {
					top: 0,
					height: $.options.titleConfig.height,
					width: "100%",
					dock: "top",
					position: "dock"
				});
				view.drawRect($.options.titleConfig.backgroundColor); //缁樺埗鑳屾櫙鑹�
				var _b = parseInt($.options.titleConfig.height) - 1;
				view.drawRect($.options.titleConfig.bottomBorderColor, {
					top: _b + "px",
					left: "0px"
				}); //缁樺埗搴曢儴杈圭嚎

				//缁樺埗鏂囧瓧
				if($.options.titleConfig.title.text){
					var _title = $.options.titleConfig.title;
					view.drawText(_title.text,_title.position , _title.styles);
				}
				
				//杩斿洖鍥炬爣缁樺埗
				var _back = $.options.titleConfig.back;
				var backClick = null;
				//浼樺厛瀛椾綋

				//鍏舵鏄浘鐗�
				var _backImage = _back.image;
				if(_backImage.base64Data || _backImage.imgSrc) {
					//TODO 姝ゅ闇€瑕佸鐞嗙櫨鍒嗘瘮鐨勬儏鍐�
					backClick = {
						left:parseInt(_backImage.position.left),
						right:parseInt(_backImage.position.left) + parseInt(_backImage.position.width)
					};
					var bitmap = new plus.nativeObj.Bitmap(id + "_back");
					if(_backImage.base64Data) { //浼樺厛base64缂栫爜瀛楃涓�
						bitmap.loadBase64Data(_backImage.base64Data);
					} else { //鍏舵鍔犺浇鍥剧墖鏂囦欢
						bitmap.load(_backImage.imgSrc);
					}
					view.drawBitmap(bitmap,_backImage.sprite , _backImage.position);
				}

				//澶勭悊鐐瑰嚮浜嬩欢
				view.setTouchEventRect({
					top: "0px",
					left: "0px",
					width: "100%",
					height: "100%"
				});
				view.interceptTouchEvent(true);
				view.addEventListener("click", function(e) {
					var x = e.clientX;
					
					//杩斿洖鎸夐挳鐐瑰嚮
					if(backClick&& x > backClick.left && x < backClick.right){
						if( _back.click && $.isFunction(_back.click)){
							_back.click();
						}else{
							webview.evalJS("window.mui&&mui.back();");
						}
					}
				}, false);
				webview.append(view);

			}

			//鏄剧ず
			nShow = $.showOptions(options.show);
			if(nShow.autoShow) {
				//titleUpdate瑙﹀彂鏃舵満鏃╀簬loaded锛屾洿鎹负titleUpdate鍚庯紝鍙互鏇存棭鐨勬樉绀簑ebview
				webview.addEventListener(nShow.event, function () {
					//鍏抽棴绛夊緟妗�
					if(nWaiting) {
						nWaiting.close();
					}
					//鏄剧ず椤甸潰
					webview.show(nShow.aniShow, nShow.duration, function() {},nShow.extras);
				}, false);
			}
		}
		return webview;
	};

	/**
	 * 鏍规嵁閰嶇疆淇℃伅鍒涘缓涓€涓獁ebview
	 * @param {type} options
	 * @param {type} isCreate
	 * @returns {webview}
	 */
	$.createWindow = function(options, isCreate) {
		if(!window.plus) {
			return;
		}
		var id = options.id || options.url;
		var webview;
		if(options.preload) {
			if($.webviews[id] && $.webviews[id].webview.getURL()) { //宸茬粡cache
				webview = $.webviews[id].webview;
			} else { //鏂板棰勫姞杞界獥鍙�
				//鍒ゆ柇鏄惁鎼哄甫createNew鍙傛暟锛岄粯璁や负false
				if(options.createNew !== true) {
					webview = plus.webview.getWebviewById(id);
				}

				//涔嬪墠娌℃湁锛岄偅灏辨柊鍒涘缓	
				if(!webview) {
					webview = plus.webview.create(options.url, id, $.windowOptions(options.styles), $.extend({
						preload: true
					}, options.extras));
					if(options.subpages) {
						$.each(options.subpages, function(index, subpage) {
							var subpageId = subpage.id || subpage.url;
							if(subpageId) { //杩囨护绌哄璞�
								var subWebview = plus.webview.getWebviewById(subpageId);
								if(!subWebview) { //濡傛灉璇ebview涓嶅瓨鍦紝鍒欏垱寤�
									subWebview = plus.webview.create(subpage.url, subpageId, $.windowOptions(subpage.styles), $.extend({
										preload: true
									}, subpage.extras));
								}
								webview.append(subWebview);
							}
						});
					}
				}
			}

			//TODO 鐞嗚涓婏紝瀛恮ebview涔熷簲璇ヨ绠楀埌棰勫姞杞介槦鍒椾腑锛屼絾杩欐牱灏遍夯鐑︿簡锛岃閫€蹇呴』閫€鏁翠綋锛屽惁鍒欏彲鑳藉嚭鐜伴棶棰橈紱
			$.webviews[id] = {
				webview: webview, //鐩墠浠卲reload鐨勭紦瀛榳ebview
				preload: true,
				show: $.showOptions(options.show),
				afterShowMethodName: options.afterShowMethodName //灏变笉搴旇鐢╡valJS銆傚簲璇ユ槸閫氳繃浜嬩欢娑堟伅閫氳
			};
			//绱㈠紩璇ラ鍔犺浇绐楀彛
			var preloads = $.data.preloads;
			var index = preloads.indexOf(id);
			if(~index) { //鍒犻櫎宸插瓨鍦ㄧ殑(鍙樼浉璋冩暣鎻掑叆浣嶇疆)
				preloads.splice(index, 1);
			}
			preloads.push(id);
			if(preloads.length > $.options.preloadLimit) {
				//鍏堣繘鍏堝嚭
				var first = $.data.preloads.shift();
				var webviewCache = $.webviews[first];
				if(webviewCache && webviewCache.webview) {
					//闇€瑕佸皢鑷繁鎵撳紑鐨勬墍鏈夐〉闈紝鍏ㄩ儴close锛�
					//鍏抽棴璇ラ鍔犺浇webview	
					$.closeAll(webviewCache.webview);
				}
				//鍒犻櫎缂撳瓨
				delete $.webviews[first];
			}
		} else {
			if(isCreate !== false) { //鐩存帴鍒涘缓闈為鍔犺浇绐楀彛
				webview = plus.webview.create(options.url, id, $.windowOptions(options.styles), options.extras);
				if(options.subpages) {
					$.each(options.subpages, function(index, subpage) {
						var subpageId = subpage.id || subpage.url;
						var subWebview = plus.webview.getWebviewById(subpageId);
						if(!subWebview) {
							subWebview = plus.webview.create(subpage.url, subpageId, $.windowOptions(subpage.styles), subpage.extras);
						}
						webview.append(subWebview);
					});
				}
			}
		}
		return webview;
	};

	/**
	 * 棰勫姞杞�
	 */
	$.preload = function(options) {
		//璋冪敤棰勫姞杞藉嚱鏁帮紝涓嶇鏄惁浼犻€抪reload鍙傛暟锛屽己鍒跺彉涓簍rue
		if(!options.preload) {
			options.preload = true;
		}
		return $.createWindow(options);
	};

	/**
	 *鍏抽棴褰撳墠webview鎵撳紑鐨勬墍鏈墂ebview锛�
	 */
	$.closeOpened = function(webview) {
		var opened = webview.opened();
		if(opened) {
			for(var i = 0, len = opened.length; i < len; i++) {
				var openedWebview = opened[i];
				var open_open = openedWebview.opened();
				if(open_open && open_open.length > 0) {
					//鍏抽棴鎵撳紑鐨剋ebview
					$.closeOpened(openedWebview);
					//鍏抽棴鑷繁
					openedWebview.close("none");
				} else {
					//濡傛灉鐩存帴瀛╁瓙鑺傜偣锛屽氨涓嶇敤鍏抽棴浜嗭紝鍥犱负鐖跺叧闂殑鏃跺€欙紝浼氳嚜鍔ㄥ叧闂瓙锛�
					if(openedWebview.parent() !== webview) {
						openedWebview.close('none');
					}
				}
			}
		}
	};
	$.closeAll = function(webview, aniShow) {
		$.closeOpened(webview);
		if(aniShow) {
			webview.close(aniShow);
		} else {
			webview.close();
		}
	};

	/**
	 * 鎵归噺鍒涘缓webview
	 * @param {type} options
	 * @returns {undefined}
	 */
	$.createWindows = function(options) {
		$.each(options, function(index, option) {
			//鍒濆鍖栭鍔犺浇绐楀彛(鍒涘缓)鍜岄潪棰勫姞杞界獥鍙�(浠呴厤缃紝涓嶅垱寤�)
			$.createWindow(option, false);
		});
	};
	/**
	 * 鍒涘缓褰撳墠椤甸潰鐨勫瓙webview
	 * @param {type} options
	 * @returns {webview}
	 */
	$.appendWebview = function(options) {
		if(!window.plus) {
			return;
		}
		var id = options.id || options.url;
		var webview;
		if(!$.webviews[id]) { //淇濊瘉鎵ц涓€閬�
			//TODO 杩欓噷涔熸湁闅愭偅锛屾瘮濡傛煇涓獁ebview涓嶆槸浣滀负subpage鍒涘缓鐨勶紝鑰屾槸浣滀负target webview鐨勮瘽锛�
			if(!plus.webview.getWebviewById(id)) {
				webview = plus.webview.create(options.url, id, options.styles, options.extras);
			}
			//涔嬪墠鐨勫疄鐜版柟妗堬細瀛愮獥鍙oaded涔嬪悗鍐峚ppend鍒扮埗绐楀彛涓紱
			//闂锛氶儴鍒嗗瓙绐楀彛loaded浜嬩欢鍙戠敓杈冩櫄锛屾鏃舵墽琛岀埗绐楀彛鐨刢hildren鏂规硶浼氳繑鍥炵┖锛屽鑷寸埗瀛愰€氳澶辫触锛�
			//     姣斿鐖堕〉闈㈡墽琛屽畬preload浜嬩欢鍚庯紝闇€瑙﹀彂瀛愰〉闈㈢殑preload浜嬩欢锛屾鏃舵湭append鐨勮瘽锛屽氨鏃犳硶瑙﹀彂锛�
			//淇敼鏂瑰紡锛氫笉鍐嶇洃鎺oaded浜嬩欢锛岀洿鎺ppend
			//by chb@20150521
			// webview.addEventListener('loaded', function() {
			plus.webview.currentWebview().append(webview);
			// });
			$.webviews[id] = options;

		}
		return webview;
	};

	//鍏ㄥ眬webviews
	$.webviews = {};
	//棰勫姞杞界獥鍙ｇ储寮�
	$.data.preloads = [];
	//$.currentWebview
	$.plusReady(function() {
		$.currentWebview = plus.webview.currentWebview();
	});
	$.addInit({
		name: '5+',
		index: 100,
		handle: function() {
			var options = $.options;
			var subpages = options.subpages || [];
			if($.os.plus) {
				$.plusReady(function() {
					//TODO  杩欓噷闇€瑕佸垽鏂竴涓嬶紝鏈€濂界瓑瀛愮獥鍙ｅ姞杞藉畬姣曞悗锛屽啀璋冪敤涓荤獥鍙ｇ殑show鏂规硶锛�
					//鎴栬€咃細鍦╫penwindow鏂规硶涓紝鐩戝惉瀹炵幇锛�
					$.each(subpages, function(index, subpage) {
						$.appendWebview(subpage);
					});
					//鍒ゆ柇鏄惁棣栭〉
					if(plus.webview.currentWebview() === plus.webview.getWebviewById(plus.runtime.appid)) {
						//棣栭〉闇€瑕佽嚜宸辨縺娲婚鍔犺浇锛�
						//timeout鍥犱负瀛愰〉闈oaded涔嬪悗鎵峚ppend鐨勶紝闃叉瀛愰〉闈㈠皻鏈猘ppend銆佷粠鑰屽鑷村叾preload鏈Е鍙戠殑闂锛�
						setTimeout(function() {
							triggerPreload(plus.webview.currentWebview());
						}, 300);
					}
					//璁剧疆ios椤堕儴鐘舵€佹爮棰滆壊锛�
					if($.os.ios && $.options.statusBarBackground) {
						plus.navigator.setStatusBarBackground($.options.statusBarBackground);
					}
					if($.os.android && parseFloat($.os.version) < 4.4) {
						//瑙ｅ喅Android骞冲彴4.4鐗堟湰浠ヤ笅锛宺esume鍚庯紝鐖剁獥浣撴爣棰樺欢杩熸覆鏌撶殑闂锛�
						if(plus.webview.currentWebview().parent() == null) {
							document.addEventListener("resume", function() {
								var body = document.body;
								body.style.display = 'none';
								setTimeout(function() {
									body.style.display = '';
								}, 10);
							});
						}
					}
				});
			} else {
				//宸叉敮鎸乮frame宓屽叆
				//				if (subpages.length > 0) {
				//					var err = document.createElement('div');
				//					err.className = 'mui-error';
				//					//鏂囧瓧鎻忚堪
				//					var span = document.createElement('span');
				//					span.innerHTML = '鍦ㄨ娴忚鍣ㄤ笅锛屼笉鏀寔鍒涘缓瀛愰〉闈紝鍏蜂綋鍙傝€�';
				//					err.appendChild(span);
				//					var a = document.createElement('a');
				//					a.innerHTML = '"mui妗嗘灦閫傜敤鍦烘櫙"';
				//					a.href = 'http://ask.dcloud.net.cn/article/113';
				//					err.appendChild(a);
				//					document.body.appendChild(err);
				//					console.log('鍦ㄨ娴忚鍣ㄤ笅锛屼笉鏀寔鍒涘缓瀛愰〉闈�');
				//				}

			}

		}
	});
	window.addEventListener('preload', function() {
		//澶勭悊棰勫姞杞介儴鍒�
		var webviews = $.options.preloadPages || [];
		$.plusReady(function() {
			$.each(webviews, function(index, webview) {
				$.createWindow($.extend(webview, {
					preload: true
				}));
			});

		});
	});
	$.supportStatusbarOffset = function() {
		return $.os.plus && $.os.ios && parseFloat($.os.version) >= 7;
	};
	$.ready(function() {
		//鏍囪瘑褰撳墠鐜鏀寔statusbar
		if($.supportStatusbarOffset()) {
			document.body.classList.add('mui-statusbar');
		}
	});
})(mui);

/**
 * mui back
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	/**
	 * register back
	 * @param {type} back
	 * @returns {$.gestures}
	 */
	$.addBack = function(back) {
		return $.addAction('backs', back);
	};
	/**
	 * default
	 */
	$.addBack({
		name: 'browser',
		index: 100,
		handle: function() {
			if (window.history.length > 1) {
				window.history.back();
				return true;
			}
			return false;
		}
	});
	/**
	 * 鍚庨€€
	 */
	$.back = function() {
		if (typeof $.options.beforeback === 'function') {
			if ($.options.beforeback() === false) {
				return;
			}
		}
		$.doAction('backs');
	};
	window.addEventListener('tap', function(e) {
		var action = $.targets.action;
		if (action && action.classList.contains('mui-action-back')) {
			$.back();
			$.targets.action = false;
		}
	});
	window.addEventListener('swiperight', function(e) {
		var detail = e.detail;
		if ($.options.swipeBack === true && Math.abs(detail.angle) < 3) {
			$.back();
		}
	});

})(mui, window);
/**
 * mui back 5+
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */
(function($, window) {
	if ($.os.plus && $.os.android) {
		$.addBack({
			name: 'mui',
			index: 5,
			handle: function() {
				//鍚庣画閲嶆柊璁捐姝ゅ锛屽皢back鏀惧埌鍚勪釜绌洪棿鍐呴儴瀹炵幇
				//popover
				if ($.targets._popover && $.targets._popover.classList.contains('mui-active')) {
					$($.targets._popover).popover('hide');
					return true;
				}
				//offcanvas
				var offCanvas = document.querySelector('.mui-off-canvas-wrap.mui-active');
				if (offCanvas) {
					$(offCanvas).offCanvas('close');
					return true;
				}
				var previewImage = $.isFunction($.getPreviewImage) && $.getPreviewImage();
				if (previewImage && previewImage.isShown()) {
					previewImage.close();
					return true;
				}
				//popup
				return $.closePopup();
			}
		});
	}
	//棣栨鎸変笅back鎸夐敭鐨勬椂闂�
	$.__back__first = null;
	/**
	 * 5+ back
	 */
	$.addBack({
		name: '5+',
		index: 10,
		handle: function() {
			if (!window.plus) {
				return false;
			}
			var wobj = plus.webview.currentWebview();
			var parent = wobj.parent();
			if (parent) {
				parent.evalJS('mui&&mui.back();');
			} else {
				wobj.canBack(function(e) {
					//by chb 鏆傛椂娉ㄩ噴锛屽湪纰板埌绫讳技popover涔嬬被鐨勯敋鐐圭殑鏃跺€欙紝闇€澶氭鐐瑰嚮鎵嶈兘杩斿洖锛�
					if (e.canBack) { //webview history back
						window.history.back();
					} else { //webview close or hide
						//fixed by fxy 姝ゅ涓嶅簲璇ョ敤opener鍒ゆ柇锛屽洜涓虹敤鎴锋湁鍙兘鑷繁close鎺夊綋鍓嶇獥鍙ｇ殑opener銆傝繖鏍风殑璇濄€俹pener灏变负绌轰簡锛屽鑷翠笉鑳芥墽琛宑lose
						if (wobj.id === plus.runtime.appid) { //棣栭〉
							//棣栭〉涓嶅瓨鍦╫pener鐨勬儏鍐典笅锛屽悗閫€瀹為檯涓婂簲璇ユ槸閫€鍑哄簲鐢紱
							//棣栨鎸夐敭锛屾彁绀衡€樺啀鎸変竴娆￠€€鍑哄簲鐢ㄢ€�
							if (!$.__back__first) {
								$.__back__first = new Date().getTime();
								mui.toast('鍐嶆寜涓€娆￠€€鍑哄簲鐢�');
								setTimeout(function() {
									$.__back__first = null;
								}, 2000);
							} else {
								if (new Date().getTime() - $.__back__first < 2000) {
									plus.runtime.quit();
								}
							}
						} else { //鍏朵粬椤甸潰锛�
							if (wobj.preload) {
								wobj.hide("auto");
							} else {
								//鍏抽棴椤甸潰鏃讹紝闇€瑕佸皢鍏舵墦寮€鐨勬墍鏈夊瓙椤甸潰鍏ㄩ儴鍏抽棴锛�
								$.closeAll(wobj);
							}
						}
					}
				});
			}
			return true;
		}
	});


	$.menu = function() {
		var menu = document.querySelector('.mui-action-menu');
		if (menu) {
			$.trigger(menu, $.EVENT_START); //涓存椂澶勭悊menu鏃爐ouchstart鐨勮瘽锛屾壘涓嶅埌褰撳墠targets鐨勯棶棰�
			$.trigger(menu, 'tap');
		} else { //鎵ц鐖剁獥鍙ｇ殑menu
			if (window.plus) {
				var wobj = $.currentWebview;
				var parent = wobj.parent();
				if (parent) { //鍙堝緱evalJS
					parent.evalJS('mui&&mui.menu();');
				}
			}
		}
	};
	var __back = function() {
		$.back();
	};
	var __menu = function() {
		$.menu();
	};
	//榛樿鐩戝惉
	$.plusReady(function() {
		if ($.options.keyEventBind.backbutton) {
			plus.key.addEventListener('backbutton', __back, false);
		}
		if ($.options.keyEventBind.menubutton) {
			plus.key.addEventListener('menubutton', __menu, false);
		}
	});
	//澶勭悊鎸夐敭鐩戝惉浜嬩欢
	$.addInit({
		name: 'keyEventBind',
		index: 1000,
		handle: function() {
			$.plusReady(function() {
				//濡傛灉涓嶄负true锛屽垯绉婚櫎榛樿鐩戝惉
				if (!$.options.keyEventBind.backbutton) {
					plus.key.removeEventListener('backbutton', __back);
				}
				if (!$.options.keyEventBind.menubutton) {
					plus.key.removeEventListener('menubutton', __menu);
				}
			});
		}
	});
})(mui, window);
/**
 * mui.init pulldownRefresh
 * @param {type} $
 * @returns {undefined}
 */
(function($) {
	$.addInit({
		name: 'pullrefresh',
		index: 1000,
		handle: function() {
			var options = $.options;
			var pullRefreshOptions = options.pullRefresh || {};
			var hasPulldown = pullRefreshOptions.down && pullRefreshOptions.down.hasOwnProperty('callback');
			var hasPullup = pullRefreshOptions.up && pullRefreshOptions.up.hasOwnProperty('callback');
			if(hasPulldown || hasPullup) {
				var container = pullRefreshOptions.container;
				if(container) {
					var $container = $(container);
					if($container.length === 1) {
						if($.os.plus) { //5+鐜
							if(hasPulldown && pullRefreshOptions.down.style == "circle") { //鍘熺敓杞湀
								$.plusReady(function() {
									//杩欓噷鏀瑰啓$.fn.pullRefresh
									$.fn.pullRefresh = $.fn.pullRefresh_native;
									$container.pullRefresh(pullRefreshOptions);
								});

							} else if($.os.android) { //闈炲師鐢熻浆鍦堬紝浣嗘槸Android鐜
								$.plusReady(function() {
									//杩欓噷鏀瑰啓$.fn.pullRefresh
									$.fn.pullRefresh = $.fn.pullRefresh_native
									var webview = plus.webview.currentWebview();
									if(window.__NWin_Enable__ === false) { //涓嶆敮鎸佸webview
										$container.pullRefresh(pullRefreshOptions);
									} else {
										if(hasPullup) {
											//褰撳墠椤甸潰鍒濆鍖杙ullup
											var upOptions = {};
											upOptions.up = pullRefreshOptions.up;
											upOptions.webviewId = webview.id || webview.getURL();
											$container.pullRefresh(upOptions);
										}
										if(hasPulldown) {
											var parent = webview.parent();
											var id = webview.id || webview.getURL();
											if(parent) {
												if(!hasPullup) { //濡傛灉娌℃湁涓婃媺鍔犺浇锛岄渶瑕佹墜鍔ㄥ垵濮嬪寲涓€涓粯璁ょ殑pullRefresh锛屼互渚垮綋鍓嶉〉闈㈠鍣ㄥ彲浠ヨ皟鐢╡ndPulldownToRefresh绛夋柟娉�
													$container.pullRefresh({
														webviewId: id
													});
												}
												var downOptions = {
													webviewId: id//瀛愰〉闈d
												};
												downOptions.down = $.extend({}, pullRefreshOptions.down);
												downOptions.down.callback = '_CALLBACK';
												//鏀瑰啓鐖堕〉闈㈢殑$.fn.pullRefresh
												parent.evalJS("mui.fn.pullRefresh=mui.fn.pullRefresh_native");
												//鐖堕〉闈㈠垵濮嬪寲pulldown
												parent.evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify(downOptions) + "')");
											}
										}
									}
								});
							} else { //闈炲師鐢熻浆鍦堬紝iOS鐜
								$container.pullRefresh(pullRefreshOptions);
							}
						} else {
							$container.pullRefresh(pullRefreshOptions);
						}
					}
				}
			}
		}
	});
})(mui);
/**
 * mui ajax
 * @param {type} $
 * @returns {undefined}
 */
(function($, window, undefined) {

	var jsonType = 'application/json';
	var htmlType = 'text/html';
	var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	var scriptTypeRE = /^(?:text|application)\/javascript/i;
	var xmlTypeRE = /^(?:text|application)\/xml/i;
	var blankRE = /^\s*$/;

	$.ajaxSettings = {
		type: 'GET',
		beforeSend: $.noop,
		success: $.noop,
		error: $.noop,
		complete: $.noop,
		context: null,
		xhr: function(protocol) {
			return new window.XMLHttpRequest();
		},
		accepts: {
			script: 'text/javascript, application/javascript, application/x-javascript',
			json: jsonType,
			xml: 'application/xml, text/xml',
			html: htmlType,
			text: 'text/plain'
		},
		timeout: 0,
		processData: true,
		cache: true
	};
	var ajaxBeforeSend = function(xhr, settings) {
		var context = settings.context
		if(settings.beforeSend.call(context, xhr, settings) === false) {
			return false;
		}
	};
	var ajaxSuccess = function(data, xhr, settings) {
		settings.success.call(settings.context, data, 'success', xhr);
		ajaxComplete('success', xhr, settings);
	};
	// type: "timeout", "error", "abort", "parsererror"
	var ajaxError = function(error, type, xhr, settings) {
		settings.error.call(settings.context, xhr, type, error);
		ajaxComplete(type, xhr, settings);
	};
	// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	var ajaxComplete = function(status, xhr, settings) {
		settings.complete.call(settings.context, xhr, status);
	};

	var serialize = function(params, obj, traditional, scope) {
		var type, array = $.isArray(obj),
			hash = $.isPlainObject(obj);
		$.each(obj, function(key, value) {
			type = $.type(value);
			if(scope) {
				key = traditional ? scope :
					scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
			}
			// handle data in serializeArray() format
			if(!scope && array) {
				params.add(value.name, value.value);
			}
			// recurse into nested objects
			else if(type === "array" || (!traditional && type === "object")) {
				serialize(params, value, traditional, key);
			} else {
				params.add(key, value);
			}
		});
	};
	var serializeData = function(options) {
		if(options.processData && options.data && typeof options.data !== "string") {
			var contentType = options.contentType;
			if(!contentType && options.headers) {
				contentType = options.headers['Content-Type'];
			}
			if(contentType && ~contentType.indexOf(jsonType)) { //application/json
				options.data = JSON.stringify(options.data);
			} else {
				options.data = $.param(options.data, options.traditional);
			}
		}
		if(options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
			options.url = appendQuery(options.url, options.data);
			options.data = undefined;
		}
	};
	var appendQuery = function(url, query) {
		if(query === '') {
			return url;
		}
		return(url + '&' + query).replace(/[&?]{1,2}/, '?');
	};
	var mimeToDataType = function(mime) {
		if(mime) {
			mime = mime.split(';', 2)[0];
		}
		return mime && (mime === htmlType ? 'html' :
			mime === jsonType ? 'json' :
			scriptTypeRE.test(mime) ? 'script' :
			xmlTypeRE.test(mime) && 'xml') || 'text';
	};
	var parseArguments = function(url, data, success, dataType) {
		if($.isFunction(data)) {
			dataType = success, success = data, data = undefined;
		}
		if(!$.isFunction(success)) {
			dataType = success, success = undefined;
		}
		return {
			url: url,
			data: data,
			success: success,
			dataType: dataType
		};
	};
	$.ajax = function(url, options) {
		if(typeof url === "object") {
			options = url;
			url = undefined;
		}
		var settings = options || {};
		settings.url = url || settings.url;
		for(var key in $.ajaxSettings) {
			if(settings[key] === undefined) {
				settings[key] = $.ajaxSettings[key];
			}
		}
		serializeData(settings);
		var dataType = settings.dataType;

		if(settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
			settings.url = appendQuery(settings.url, '_=' + $.now());
		}
		var mime = settings.accepts[dataType && dataType.toLowerCase()];
		var headers = {};
		var setHeader = function(name, value) {
			headers[name.toLowerCase()] = [name, value];
		};
		var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
		var xhr = settings.xhr(settings);
		var nativeSetHeader = xhr.setRequestHeader;
		var abortTimeout;

		setHeader('X-Requested-With', 'XMLHttpRequest');
		setHeader('Accept', mime || '*/*');
		if(!!(mime = settings.mimeType || mime)) {
			if(mime.indexOf(',') > -1) {
				mime = mime.split(',', 2)[0];
			}
			xhr.overrideMimeType && xhr.overrideMimeType(mime);
		}
		if(settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
			setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
		}
		if(settings.headers) {
			for(var name in settings.headers)
				setHeader(name, settings.headers[name]);
		}
		xhr.setRequestHeader = setHeader;

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				xhr.onreadystatechange = $.noop;
				clearTimeout(abortTimeout);
				var result, error = false;
				var isLocal = protocol === 'file:';
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && isLocal && xhr.responseText)) {
					dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
					result = xhr.responseText;
					try {
						// http://perfectionkills.com/global-eval-what-are-the-options/
						if(dataType === 'script') {
							(1, eval)(result);
						} else if(dataType === 'xml') {
							result = xhr.responseXML;
						} else if(dataType === 'json') {
							result = blankRE.test(result) ? null : $.parseJSON(result);
						}
					} catch(e) {
						error = e;
					}

					if(error) {
						ajaxError(error, 'parsererror', xhr, settings);
					} else {
						ajaxSuccess(result, xhr, settings);
					}
				} else {
					var status = xhr.status ? 'error' : 'abort';
					var statusText = xhr.statusText || null;
					if(isLocal) {
						status = 'error';
						statusText = '404';
					}
					ajaxError(statusText, status, xhr, settings);
				}
			}
		};
		if(ajaxBeforeSend(xhr, settings) === false) {
			xhr.abort();
			ajaxError(null, 'abort', xhr, settings);
			return xhr;
		}

		if(settings.xhrFields) {
			for(var name in settings.xhrFields) {
				xhr[name] = settings.xhrFields[name];
			}
		}

		var async = 'async' in settings ? settings.async : true;

		xhr.open(settings.type.toUpperCase(), settings.url, async, settings.username, settings.password);

		for(var name in headers) {
			if(headers.hasOwnProperty(name)) {
				nativeSetHeader.apply(xhr, headers[name]);
			}
		}
		if(settings.timeout > 0) {
			abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = $.noop;
				xhr.abort();
				ajaxError(null, 'timeout', xhr, settings);
			}, settings.timeout);
		}
		xhr.send(settings.data ? settings.data : null);
		return xhr;
	};

	$.param = function(obj, traditional) {
		var params = [];
		params.add = function(k, v) {
			this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
		};
		serialize(params, obj, traditional);
		return params.join('&').replace(/%20/g, '+');
	};
	$.get = function( /* url, data, success, dataType */ ) {
		return $.ajax(parseArguments.apply(null, arguments));
	};

	$.post = function( /* url, data, success, dataType */ ) {
		var options = parseArguments.apply(null, arguments);
		options.type = 'POST';
		return $.ajax(options);
	};

	$.getJSON = function( /* url, data, success */ ) {
		var options = parseArguments.apply(null, arguments);
		options.dataType = 'json';
		return $.ajax(options);
	};

	$.fn.load = function(url, data, success) {
		if(!this.length)
			return this;
		var self = this,
			parts = url.split(/\s/),
			selector,
			options = parseArguments(url, data, success),
			callback = options.success;
		if(parts.length > 1)
			options.url = parts[0], selector = parts[1];
		options.success = function(response) {
			if(selector) {
				var div = document.createElement('div');
				div.innerHTML = response.replace(rscript, "");
				var selectorDiv = document.createElement('div');
				var childs = div.querySelectorAll(selector);
				if(childs && childs.length > 0) {
					for(var i = 0, len = childs.length; i < len; i++) {
						selectorDiv.appendChild(childs[i]);
					}
				}
				self[0].innerHTML = selectorDiv.innerHTML;
			} else {
				self[0].innerHTML = response;
			}
			callback && callback.apply(self, arguments);
		};
		$.ajax(options);
		return this;
	};

})(mui, window);
/**
 * 5+ ajax
 */
(function($) {
	var originAnchor = document.createElement('a');
	originAnchor.href = window.location.href;
	$.plusReady(function() {
		$.ajaxSettings = $.extend($.ajaxSettings, {
			xhr: function(settings) {
				if (settings.crossDomain) { //寮哄埗浣跨敤plus璺ㄥ煙
					return new plus.net.XMLHttpRequest();
				}
				//浠呭湪webview鐨剈rl涓鸿繙绋嬫枃浠讹紝涓攁jax璇锋眰鐨勮祫婧愪笉鍚屾簮涓嬩娇鐢╬lus.net.XMLHttpRequest
				if (originAnchor.protocol !== 'file:') {
					var urlAnchor = document.createElement('a');
					urlAnchor.href = settings.url;
					urlAnchor.href = urlAnchor.href;
					settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host);
					if (settings.crossDomain) {
						return new plus.net.XMLHttpRequest();
					}
				}
				if ($.os.ios && window.webkit && window.webkit.messageHandlers) { //wkwebview涓嬪悓鏍蜂娇鐢�5+ xhr
                    return new plus.net.XMLHttpRequest();
                }
				return new window.XMLHttpRequest();
			}
		});
	});
})(mui);
/**
 * mui layout(offset[,position,width,height...])
 * @param {type} $
 * @param {type} window
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, undefined) {
	$.offset = function(element) {
		var box = {
			top : 0,
			left : 0
		};
		if ( typeof element.getBoundingClientRect !== undefined) {
			box = element.getBoundingClientRect();
		}
		return {
			top : box.top + window.pageYOffset - element.clientTop,
			left : box.left + window.pageXOffset - element.clientLeft
		};
	};
})(mui, window); 
/**
 * mui animation
 */
(function($, window) {
	/**
	 * scrollTo
	 */
	$.scrollTo = function(scrollTop, duration, callback) {
		duration = duration || 1000;
		var scroll = function(duration) {
			if (duration <= 0) {
				window.scrollTo(0, scrollTop);
				callback && callback();
				return;
			}
			var distaince = scrollTop - window.scrollY;
			setTimeout(function() {
				window.scrollTo(0, window.scrollY + distaince / duration * 10);
				scroll(duration - 10);
			}, 16.7);
		};
		scroll(duration);
	};
	$.animationFrame = function(cb) {
		var args, isQueued, context;
		return function() {
			args = arguments;
			context = this;
			if (!isQueued) {
				isQueued = true;
				requestAnimationFrame(function() {
					cb.apply(context, args);
					isQueued = false;
				});
			}
		};
	};

})(mui, window);
(function($) {
	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	var Class = function() {};
	Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for (var name in prop) {
			prototype[name] = typeof prop[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;

						this._super = _super[name];

						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
	$.Class = Class;
})(mui);
(function($, document, undefined) {
    var CLASS_PULL_TOP_POCKET = 'mui-pull-top-pocket';
    var CLASS_PULL_BOTTOM_POCKET = 'mui-pull-bottom-pocket';
    var CLASS_PULL = 'mui-pull';
    var CLASS_PULL_LOADING = 'mui-pull-loading';
    var CLASS_PULL_CAPTION = 'mui-pull-caption';
    var CLASS_PULL_CAPTION_DOWN = 'mui-pull-caption-down';
    var CLASS_PULL_CAPTION_REFRESH = 'mui-pull-caption-refresh';
    var CLASS_PULL_CAPTION_NOMORE = 'mui-pull-caption-nomore';

    var CLASS_ICON = 'mui-icon';
    var CLASS_SPINNER = 'mui-spinner';
    var CLASS_ICON_PULLDOWN = 'mui-icon-pulldown';

    var CLASS_BLOCK = 'mui-block';
    var CLASS_HIDDEN = 'mui-hidden';
    var CLASS_VISIBILITY = 'mui-visibility';

    var CLASS_LOADING_UP = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_ICON_PULLDOWN;
    var CLASS_LOADING_DOWN = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_ICON_PULLDOWN;
    var CLASS_LOADING = CLASS_PULL_LOADING + ' ' + CLASS_ICON + ' ' + CLASS_SPINNER;

    var pocketHtml = ['<div class="' + CLASS_PULL + '">', '<div class="{icon}"></div>', '<div class="' + CLASS_PULL_CAPTION + '">{contentrefresh}</div>', '</div>'].join('');

    var PullRefresh = {
        init: function(element, options) {
            this._super(element, $.extend(true, {
                scrollY: true,
                scrollX: false,
                indicators: true,
                deceleration: 0.003,
                down: {
                    height: 50,
                    contentinit: '涓嬫媺鍙互鍒锋柊',
                    contentdown: '涓嬫媺鍙互鍒锋柊',
                    contentover: '閲婃斁绔嬪嵆鍒锋柊',
                    contentrefresh: '姝ｅ湪鍒锋柊...'
                },
                up: {
                    height: 50,
                    auto: false,
                    contentinit: '涓婃媺鏄剧ず鏇村',
                    contentdown: '涓婃媺鏄剧ず鏇村',
                    contentrefresh: '姝ｅ湪鍔犺浇...',
                    contentnomore: '娌℃湁鏇村鏁版嵁浜�',
                    duration: 300
                }
            }, options));
        },
        _init: function() {
            this._super();
            this._initPocket();
        },
        _initPulldownRefresh: function() {
            this.pulldown = true;
            if (this.topPocket) {
                this.pullPocket = this.topPocket;
                this.pullPocket.classList.add(CLASS_BLOCK);
                this.pullPocket.classList.add(CLASS_VISIBILITY);
                this.pullCaption = this.topCaption;
                this.pullLoading = this.topLoading;
            }
        },
        _initPullupRefresh: function() {
            this.pulldown = false;
            if (this.bottomPocket) {
                this.pullPocket = this.bottomPocket;
                this.pullPocket.classList.add(CLASS_BLOCK);
                this.pullPocket.classList.add(CLASS_VISIBILITY);
                this.pullCaption = this.bottomCaption;
                this.pullLoading = this.bottomLoading;
            }
        },
        _initPocket: function() {
            var options = this.options;
            if (options.down && options.down.hasOwnProperty('callback')) {
                this.topPocket = this.scroller.querySelector('.' + CLASS_PULL_TOP_POCKET);
                if (!this.topPocket) {
                    this.topPocket = this._createPocket(CLASS_PULL_TOP_POCKET, options.down, CLASS_LOADING_DOWN);
                    this.wrapper.insertBefore(this.topPocket, this.wrapper.firstChild);
                }
                this.topLoading = this.topPocket.querySelector('.' + CLASS_PULL_LOADING);
                this.topCaption = this.topPocket.querySelector('.' + CLASS_PULL_CAPTION);
            }
            if (options.up && options.up.hasOwnProperty('callback')) {
                this.bottomPocket = this.scroller.querySelector('.' + CLASS_PULL_BOTTOM_POCKET);
                if (!this.bottomPocket) {
                    this.bottomPocket = this._createPocket(CLASS_PULL_BOTTOM_POCKET, options.up, CLASS_LOADING);
                    this.scroller.appendChild(this.bottomPocket);
                }
                this.bottomLoading = this.bottomPocket.querySelector('.' + CLASS_PULL_LOADING);
                this.bottomCaption = this.bottomPocket.querySelector('.' + CLASS_PULL_CAPTION);
                //TODO only for h5
                this.wrapper.addEventListener('scrollbottom', this);
            }
        },
        _createPocket: function(clazz, options, iconClass) {
            var pocket = document.createElement('div');
            pocket.className = clazz;
            pocket.innerHTML = pocketHtml.replace('{contentrefresh}', options.contentinit).replace('{icon}', iconClass);
            return pocket;
        },
        _resetPullDownLoading: function() {
            var loading = this.pullLoading;
            if (loading) {
                this.pullCaption.innerHTML = this.options.down.contentdown;
                loading.style.webkitTransition = "";
                loading.style.webkitTransform = "";
                loading.style.webkitAnimation = "";
                loading.className = CLASS_LOADING_DOWN;
            }
        },
        _setCaptionClass: function(isPulldown, caption, title) {
            if (!isPulldown) {
                switch (title) {
                    case this.options.up.contentdown:
                        caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
                        break;
                    case this.options.up.contentrefresh:
                        caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_REFRESH
                        break;
                    case this.options.up.contentnomore:
                        caption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_NOMORE;
                        break;
                }
            }
        },
        _setCaption: function(title, reset) {
            if (this.loading) {
                return;
            }
            var options = this.options;
            var pocket = this.pullPocket;
            var caption = this.pullCaption;
            var loading = this.pullLoading;
            var isPulldown = this.pulldown;
            var self = this;
            if (pocket) {
                if (reset) {
                    setTimeout(function() {
                        caption.innerHTML = self.lastTitle = title;
                        if (isPulldown) {
                            loading.className = CLASS_LOADING_DOWN;
                        } else {
                            self._setCaptionClass(false, caption, title);
                            loading.className = CLASS_LOADING;
                        }
                        loading.style.webkitAnimation = "";
                        loading.style.webkitTransition = "";
                        loading.style.webkitTransform = "";
                    }, 100);
                } else {
                    if (title !== this.lastTitle) {
                        caption.innerHTML = title;
                        if (isPulldown) {
                            if (title === options.down.contentrefresh) {
                                loading.className = CLASS_LOADING;
                                loading.style.webkitAnimation = "spinner-spin 1s step-end infinite";
                            } else if (title === options.down.contentover) {
                                loading.className = CLASS_LOADING_UP;
                                loading.style.webkitTransition = "-webkit-transform 0.3s ease-in";
                                loading.style.webkitTransform = "rotate(180deg)";
                            } else if (title === options.down.contentdown) {
                                loading.className = CLASS_LOADING_DOWN;
                                loading.style.webkitTransition = "-webkit-transform 0.3s ease-in";
                                loading.style.webkitTransform = "rotate(0deg)";
                            }
                        } else {
                            if (title === options.up.contentrefresh) {
                                loading.className = CLASS_LOADING + ' ' + CLASS_VISIBILITY;
                            } else {
                                loading.className = CLASS_LOADING + ' ' + CLASS_HIDDEN;
                            }
                            self._setCaptionClass(false, caption, title);
                        }
                        this.lastTitle = title;
                    }
                }

            }
        }
    };
    $.PullRefresh = PullRefresh;
})(mui, document);
(function($, window, document, undefined) {
	var CLASS_SCROLL = 'mui-scroll';
	var CLASS_SCROLLBAR = 'mui-scrollbar';
	var CLASS_INDICATOR = 'mui-scrollbar-indicator';
	var CLASS_SCROLLBAR_VERTICAL = CLASS_SCROLLBAR + '-vertical';
	var CLASS_SCROLLBAR_HORIZONTAL = CLASS_SCROLLBAR + '-horizontal';

	var CLASS_ACTIVE = 'mui-active';

	var ease = {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function(k) {
				return k * (2 - k);
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
			fn: function(k) {
				return Math.sqrt(1 - (--k * k));
			}
		},
		outCirc: {
			style: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
		},
		outCubic: {
			style: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
		}
	}
	var Scroll = $.Class.extend({
		init: function(element, options) {
			this.wrapper = this.element = element;
			this.scroller = this.wrapper.children[0];
			this.scrollerStyle = this.scroller && this.scroller.style;
			this.stopped = false;

			this.options = $.extend(true, {
				scrollY: true, //鏄惁绔栧悜婊氬姩
				scrollX: false, //鏄惁妯悜婊氬姩
				startX: 0, //鍒濆鍖栨椂婊氬姩鑷硏
				startY: 0, //鍒濆鍖栨椂婊氬姩鑷硑

				indicators: true, //鏄惁鏄剧ず婊氬姩鏉�
				stopPropagation: false,
				hardwareAccelerated: true,
				fixedBadAndorid: false,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
				},
				momentum: true,

				snapX: 0.5, //妯悜鍒囨崲璺濈(浠ュ綋鍓嶅鍣ㄥ搴︿负鍩哄噯)
				snap: false, //鍥剧墖杞挱锛屾嫋鎷藉紡閫夐」鍗�

				bounce: true, //鏄惁鍚敤鍥炲脊
				bounceTime: 500, //鍥炲脊鍔ㄧ敾鏃堕棿
				bounceEasing: ease.outCirc, //鍥炲脊鍔ㄧ敾鏇茬嚎

				scrollTime: 500,
				scrollEasing: ease.outCubic, //杞挱鍔ㄧ敾鏇茬嚎

				directionLockThreshold: 5,

				parallaxElement: false, //瑙嗗樊鍏冪礌
				parallaxRatio: 0.5
			}, options);

			this.x = 0;
			this.y = 0;
			this.translateZ = this.options.hardwareAccelerated ? ' translateZ(0)' : '';

			this._init();
			if (this.scroller) {
				this.refresh();
				//				if (this.options.startX !== 0 || this.options.startY !== 0) { //闇€瑕佸垽鏂悧锛熷悗缁牴鎹疄闄呮儏鍐靛啀鐪嬬湅
				this.scrollTo(this.options.startX, this.options.startY);
				//				}
			}
		},
		_init: function() {
			this._initParallax();
			this._initIndicators();
			this._initEvent();
		},
		_initParallax: function() {
			if (this.options.parallaxElement) {
				this.parallaxElement = document.querySelector(this.options.parallaxElement);
				this.parallaxStyle = this.parallaxElement.style;
				this.parallaxHeight = this.parallaxElement.offsetHeight;
				this.parallaxImgStyle = this.parallaxElement.querySelector('img').style;
			}
		},
		_initIndicators: function() {
			var self = this;
			self.indicators = [];
			if (!this.options.indicators) {
				return;
			}
			var indicators = [],
				indicator;

			// Vertical scrollbar
			if (self.options.scrollY) {
				indicator = {
					el: this._createScrollBar(CLASS_SCROLLBAR_VERTICAL),
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if (this.options.scrollX) {
				indicator = {
					el: this._createScrollBar(CLASS_SCROLLBAR_HORIZONTAL),
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			for (var i = indicators.length; i--;) {
				this.indicators.push(new Indicator(this, indicators[i]));
			}

		},
		_initSnap: function() {
			this.currentPage = {};
			this.pages = [];
			var snaps = this.snaps;
			var length = snaps.length;
			var m = 0;
			var n = -1;
			var x = 0;
			var leftX = 0;
			var rightX = 0;
			var snapX = 0;
			for (var i = 0; i < length; i++) {
				var snap = snaps[i];
				var offsetLeft = snap.offsetLeft;
				var offsetWidth = snap.offsetWidth;
				if (i === 0 || offsetLeft <= snaps[i - 1].offsetLeft) {
					m = 0;
					n++;
				}
				if (!this.pages[m]) {
					this.pages[m] = [];
				}
				x = this._getSnapX(offsetLeft);
				snapX = Math.round((offsetWidth) * this.options.snapX);
				leftX = x - snapX;
				rightX = x - offsetWidth + snapX;
				this.pages[m][n] = {
					x: x,
					leftX: leftX,
					rightX: rightX,
					pageX: m,
					element: snap
				}
				if (snap.classList.contains(CLASS_ACTIVE)) {
					this.currentPage = this.pages[m][0];
				}
				if (x >= this.maxScrollX) {
					m++;
				}
			}
			this.options.startX = this.currentPage.x || 0;
		},
		_getSnapX: function(offsetLeft) {
			return Math.max(Math.min(0, -offsetLeft + (this.wrapperWidth / 2)), this.maxScrollX);
		},
		_gotoPage: function(index) {
			this.currentPage = this.pages[Math.min(index, this.pages.length - 1)][0];
			for (var i = 0, len = this.snaps.length; i < len; i++) {
				if (i === index) {
					this.snaps[i].classList.add(CLASS_ACTIVE);
				} else {
					this.snaps[i].classList.remove(CLASS_ACTIVE);
				}
			}
			this.scrollTo(this.currentPage.x, 0, this.options.scrollTime);
		},
		_nearestSnap: function(x) {
			if (!this.pages.length) {
				return {
					x: 0,
					pageX: 0
				};
			}
			var i = 0;
			var length = this.pages.length;
			if (x > 0) {
				x = 0;
			} else if (x < this.maxScrollX) {
				x = this.maxScrollX;
			}
			for (; i < length; i++) {
				var nearestX = this.direction === 'left' ? this.pages[i][0].leftX : this.pages[i][0].rightX;
				if (x >= nearestX) {
					return this.pages[i][0];
				}
			}
			return {
				x: 0,
				pageX: 0
			};
		},
		_initEvent: function(detach) {
			var action = detach ? 'removeEventListener' : 'addEventListener';
			window[action]('orientationchange', this);
			window[action]('resize', this);

			this.scroller[action]('webkitTransitionEnd', this);

			this.wrapper[action]($.EVENT_START, this);
			this.wrapper[action]($.EVENT_CANCEL, this);
			this.wrapper[action]($.EVENT_END, this);
			this.wrapper[action]('drag', this);
			this.wrapper[action]('dragend', this);
			this.wrapper[action]('flick', this);
			this.wrapper[action]('scrollend', this);
			if (this.options.scrollX) {
				this.wrapper[action]('swiperight', this);
			}
			var segmentedControl = this.wrapper.querySelector('.mui-segmented-control');
			if (segmentedControl) { //闈狅紝杩欎釜bug鎺掓煡浜嗕竴涓嬪崍锛岄樆姝ash璺宠浆锛屼竴鏃ash璺宠浆浼氬鑷村彲鎷栨嫿閫夐」鍗＄殑tab涓嶈
				mui(segmentedControl)[detach ? 'off' : 'on']('click', 'a', $.preventDefault);
			}

			this.wrapper[action]('scrollstart', this);
			this.wrapper[action]('refresh', this);
		},
		_handleIndicatorScrollend: function() {
			this.indicators.map(function(indicator) {
				indicator.fade();
			});
		},
		_handleIndicatorScrollstart: function() {
			this.indicators.map(function(indicator) {
				indicator.fade(1);
			});
		},
		_handleIndicatorRefresh: function() {
			this.indicators.map(function(indicator) {
				indicator.refresh();
			});
		},
		handleEvent: function(e) {
			if (this.stopped) {
				this.resetPosition();
				return;
			}

			switch (e.type) {
				case $.EVENT_START:
					this._start(e);
					break;
				case 'drag':
					this.options.stopPropagation && e.stopPropagation();
					this._drag(e);
					break;
				case 'dragend':
				case 'flick':
					this.options.stopPropagation && e.stopPropagation();
					this._flick(e);
					break;
				case $.EVENT_CANCEL:
				case $.EVENT_END:
					this._end(e);
					break;
				case 'webkitTransitionEnd':
					this.transitionTimer && this.transitionTimer.cancel();
					this._transitionEnd(e);
					break;
				case 'scrollstart':
					this._handleIndicatorScrollstart(e);
					break;
				case 'scrollend':
					this._handleIndicatorScrollend(e);
					this._scrollend(e);
					e.stopPropagation();
					break;
				case 'orientationchange':
				case 'resize':
					this._resize();
					break;
				case 'swiperight':
					e.stopPropagation();
					break;
				case 'refresh':
					this._handleIndicatorRefresh(e);
					break;

			}
		},
		_start: function(e) {
			this.moved = this.needReset = false;
			this._transitionTime();
			if (this.isInTransition) {
				this.needReset = true;
				this.isInTransition = false;
				var pos = $.parseTranslateMatrix($.getStyles(this.scroller, 'webkitTransform'));
				this.setTranslate(Math.round(pos.x), Math.round(pos.y));
				//				this.resetPosition(); //reset
				$.trigger(this.scroller, 'scrollend', this);
				//				e.stopPropagation();
				e.preventDefault();
			}
			this.reLayout();
			$.trigger(this.scroller, 'beforescrollstart', this);
		},
		_getDirectionByAngle: function(angle) {
			if (angle < -80 && angle > -100) {
				return 'up';
			} else if (angle >= 80 && angle < 100) {
				return 'down';
			} else if (angle >= 170 || angle <= -170) {
				return 'left';
			} else if (angle >= -35 && angle <= 10) {
				return 'right';
			}
			return null;
		},
		_drag: function(e) {
			//			if (this.needReset) {
			//				e.stopPropagation(); //disable parent drag(nested scroller)
			//				return;
			//			}
			var detail = e.detail;
			if (this.options.scrollY || detail.direction === 'up' || detail.direction === 'down') { //濡傛灉鏄珫鍚戞粴鍔ㄦ垨鎵嬪娍鏂瑰悜鏄笂鎴栦笅
				//ios8 hack
				if ($.os.ios && parseFloat($.os.version) >= 8) { //澶歸ebview鏃讹紝绂诲紑褰撳墠webview浼氬鑷村悗缁璽ouch浜嬩欢涓嶈Е鍙�
					var clientY = detail.gesture.touches[0].clientY;
					//涓嬫媺鍒锋柊 or 涓婃媺鍔犺浇
					if ((clientY + 10) > window.innerHeight || clientY < 10) {
						this.resetPosition(this.options.bounceTime);
						return;
					}
				}
			}
			var isPreventDefault = isReturn = false;
			var direction = this._getDirectionByAngle(detail.angle);
			if (detail.direction === 'left' || detail.direction === 'right') {
				if (this.options.scrollX) {
					isPreventDefault = true;
					if (!this.moved) { //璇嗗埆瑙掑害(璇ヨ搴﹀鑷磋疆鎾笉鐏垫晱)
						//						if (direction !== 'left' && direction !== 'right') {
						//							isReturn = true;
						//						} else {
						$.gestures.session.lockDirection = true; //閿佸畾鏂瑰悜
						$.gestures.session.startDirection = detail.direction;
						//						}
					}
				} else if (this.options.scrollY && !this.moved) {
					isReturn = true;
				}
			} else if (detail.direction === 'up' || detail.direction === 'down') {
				if (this.options.scrollY) {
					isPreventDefault = true;
					//					if (!this.moved) { //璇嗗埆瑙掑害,绔栧悜婊氬姩浼间箮娌″繀瑕佽繘琛屽皬瑙掑害楠岃瘉
					//						if (direction !== 'up' && direction !== 'down') {
					//							isReturn = true;
					//						}
					//					}
					if (!this.moved) {
						$.gestures.session.lockDirection = true; //閿佸畾鏂瑰悜
						$.gestures.session.startDirection = detail.direction;
					}
				} else if (this.options.scrollX && !this.moved) {
					isReturn = true;
				}
			} else {
				isReturn = true;
			}
			if (this.moved || isPreventDefault) {
				e.stopPropagation(); //闃绘鍐掓场(scroll绫诲祵濂�)
				detail.gesture && detail.gesture.preventDefault();
			}
			if (isReturn) { //绂佹闈炴硶鏂瑰悜婊氬姩
				return;
			}
			if (!this.moved) {
				$.trigger(this.scroller, 'scrollstart', this);
			} else {
				e.stopPropagation(); //move鏈熼棿闃绘鍐掓场(scroll宓屽)
			}
			var deltaX = 0;
			var deltaY = 0;
			if (!this.moved) { //start
				deltaX = detail.deltaX;
				deltaY = detail.deltaY;
			} else { //move
				deltaX = detail.deltaX - $.gestures.session.prevTouch.deltaX;
				deltaY = detail.deltaY - $.gestures.session.prevTouch.deltaY;
			}
			var absDeltaX = Math.abs(detail.deltaX);
			var absDeltaY = Math.abs(detail.deltaY);
			if (absDeltaX > absDeltaY + this.options.directionLockThreshold) {
				deltaY = 0;
			} else if (absDeltaY >= absDeltaX + this.options.directionLockThreshold) {
				deltaX = 0;
			}

			deltaX = this.hasHorizontalScroll ? deltaX : 0;
			deltaY = this.hasVerticalScroll ? deltaY : 0;
			var newX = this.x + deltaX;
			var newY = this.y + deltaY;
			// Slow down if outside of the boundaries
			if (newX > 0 || newX < this.maxScrollX) {
				newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
			}
			if (newY > 0 || newY < this.maxScrollY) {
				newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
			}

			if (!this.requestAnimationFrame) {
				this._updateTranslate();
			}
			this.direction = detail.deltaX > 0 ? 'right' : 'left';
			this.moved = true;
			this.x = newX;
			this.y = newY;
			$.trigger(this.scroller, 'scroll', this);
		},
		_flick: function(e) {
			//			if (!this.moved || this.needReset) {
			//				return;
			//			}
			if (!this.moved) {
				return;
			}
			e.stopPropagation();
			var detail = e.detail;
			this._clearRequestAnimationFrame();
			if (e.type === 'dragend' && detail.flick) { //dragend
				return;
			}

			var newX = Math.round(this.x);
			var newY = Math.round(this.y);

			this.isInTransition = false;
			// reset if we are outside of the boundaries
			if (this.resetPosition(this.options.bounceTime)) {
				return;
			}

			this.scrollTo(newX, newY); // ensures that the last position is rounded

			if (e.type === 'dragend') { //dragend
				$.trigger(this.scroller, 'scrollend', this);
				return;
			}
			var time = 0;
			var easing = '';
			// start momentum animation if needed
			if (this.options.momentum && detail.flickTime < 300) {
				momentumX = this.hasHorizontalScroll ? this._momentum(this.x, detail.flickDistanceX, detail.flickTime, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
					destination: newX,
					duration: 0
				};
				momentumY = this.hasVerticalScroll ? this._momentum(this.y, detail.flickDistanceY, detail.flickTime, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
					destination: newY,
					duration: 0
				};
				newX = momentumX.destination;
				newY = momentumY.destination;
				time = Math.max(momentumX.duration, momentumY.duration);
				this.isInTransition = true;
			}

			if (newX != this.x || newY != this.y) {
				if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
					easing = ease.quadratic;
				}
				this.scrollTo(newX, newY, time, easing);
				return;
			}

			$.trigger(this.scroller, 'scrollend', this);
			//			e.stopPropagation();
		},
		_end: function(e) {
			this.needReset = false;
			if ((!this.moved && this.needReset) || e.type === $.EVENT_CANCEL) {
				this.resetPosition();
			}
		},
		_transitionEnd: function(e) {
			if (e.target != this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			if (!this.resetPosition(this.options.bounceTime)) {
				this.isInTransition = false;
				$.trigger(this.scroller, 'scrollend', this);
			}
		},
		_scrollend: function(e) {
			if ((this.y === 0 && this.maxScrollY === 0) || (Math.abs(this.y) > 0 && this.y <= this.maxScrollY)) {
				$.trigger(this.scroller, 'scrollbottom', this);
			}
		},
		_resize: function() {
			var that = this;
			clearTimeout(that.resizeTimeout);
			that.resizeTimeout = setTimeout(function() {
				that.refresh();
			}, that.options.resizePolling);
		},
		_transitionTime: function(time) {
			time = time || 0;
			this.scrollerStyle['webkitTransitionDuration'] = time + 'ms';
			if (this.parallaxElement && this.options.scrollY) { //鐩墠浠呮敮鎸佺珫鍚戣宸晥鏋�
				this.parallaxStyle['webkitTransitionDuration'] = time + 'ms';
			}
			if (this.options.fixedBadAndorid && !time && $.os.isBadAndroid) {
				this.scrollerStyle['webkitTransitionDuration'] = '0.001s';
				if (this.parallaxElement && this.options.scrollY) { //鐩墠浠呮敮鎸佺珫鍚戣宸晥鏋�
					this.parallaxStyle['webkitTransitionDuration'] = '0.001s';
				}
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTime(time);
				}
			}
			if (time) { //鑷畾涔塼imer锛屼繚璇亀ebkitTransitionEnd濮嬬粓瑙﹀彂
				this.transitionTimer && this.transitionTimer.cancel();
				this.transitionTimer = $.later(function() {
					$.trigger(this.scroller, 'webkitTransitionEnd');
				}, time + 100, this);
			}
		},
		_transitionTimingFunction: function(easing) {
			this.scrollerStyle['webkitTransitionTimingFunction'] = easing;
			if (this.parallaxElement && this.options.scrollY) { //鐩墠浠呮敮鎸佺珫鍚戣宸晥鏋�
				this.parallaxStyle['webkitTransitionDuration'] = easing;
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].transitionTimingFunction(easing);
				}
			}
		},
		_translate: function(x, y) {
			this.x = x;
			this.y = y;
		},
		_clearRequestAnimationFrame: function() {
			if (this.requestAnimationFrame) {
				cancelAnimationFrame(this.requestAnimationFrame);
				this.requestAnimationFrame = null;
			}
		},
		_updateTranslate: function() {
			var self = this;
			if (self.x !== self.lastX || self.y !== self.lastY) {
				self.setTranslate(self.x, self.y);
			}
			self.requestAnimationFrame = requestAnimationFrame(function() {
				self._updateTranslate();
			});
		},
		_createScrollBar: function(clazz) {
			var scrollbar = document.createElement('div');
			var indicator = document.createElement('div');
			scrollbar.className = CLASS_SCROLLBAR + ' ' + clazz;
			indicator.className = CLASS_INDICATOR;
			scrollbar.appendChild(indicator);
			if (clazz === CLASS_SCROLLBAR_VERTICAL) {
				this.scrollbarY = scrollbar;
				this.scrollbarIndicatorY = indicator;
			} else if (clazz === CLASS_SCROLLBAR_HORIZONTAL) {
				this.scrollbarX = scrollbar;
				this.scrollbarIndicatorX = indicator;
			}
			this.wrapper.appendChild(scrollbar);
			return scrollbar;
		},
		_preventDefaultException: function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		},
		_reLayout: function() {
			if (!this.hasHorizontalScroll) {
				this.maxScrollX = 0;
				this.scrollerWidth = this.wrapperWidth;
			}

			if (!this.hasVerticalScroll) {
				this.maxScrollY = 0;
				this.scrollerHeight = this.wrapperHeight;
			}

			this.indicators.map(function(indicator) {
				indicator.refresh();
			});

			//浠ラ槻slider绫诲祵濂椾娇鐢�
			if (this.options.snap && typeof this.options.snap === 'string') {
				var items = this.scroller.querySelectorAll(this.options.snap);
				this.itemLength = 0;
				this.snaps = [];
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i];
					if (item.parentNode === this.scroller) {
						this.itemLength++;
						this.snaps.push(item);
					}
				}
				this._initSnap(); //闇€瑕佹瘡娆￠兘_initSnap涔堛€傚叾瀹瀒nit鐨勬椂鍊欐墽琛屼竴娆★紝鍚庣画resize鐨勬椂鍊欐墽琛屼竴娆″氨琛屼簡鍚�.鍏堣繖涔堝仛鍚э紝濡傛灉褰卞搷鎬ц兘锛屽啀璋冩暣
			}
		},
		_momentum: function(current, distance, time, lowerMargin, wrapperSize, deceleration) {
			var speed = parseFloat(Math.abs(distance) / time),
				destination,
				duration;

			deceleration = deceleration === undefined ? 0.0006 : deceleration;
			destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
			duration = speed / deceleration;
			if (destination < lowerMargin) {
				destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
				distance = Math.abs(destination - current);
				duration = distance / speed;
			} else if (destination > 0) {
				destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
				distance = Math.abs(current) + destination;
				duration = distance / speed;
			}

			return {
				destination: Math.round(destination),
				duration: duration
			};
		},
		_getTranslateStr: function(x, y) {
			if (this.options.hardwareAccelerated) {
				return 'translate3d(' + x + 'px,' + y + 'px,0px) ' + this.translateZ;
			}
			return 'translate(' + x + 'px,' + y + 'px) ';
		},
		//API
		setStopped: function(stopped) {
			// this.stopped = !!stopped;

			// fixed ios鍙寃ebview妯″紡涓嬫媺鍒锋柊
			if(stopped) {
				this.disablePullupToRefresh();
				this.disablePulldownToRefresh();
			} else {
				this.enablePullupToRefresh();
				this.enablePulldownToRefresh();
			}
		},
		setTranslate: function(x, y) {
			this.x = x;
			this.y = y;
			this.scrollerStyle['webkitTransform'] = this._getTranslateStr(x, y);
			if (this.parallaxElement && this.options.scrollY) { //鐩墠浠呮敮鎸佺珫鍚戣宸晥鏋�
				var parallaxY = y * this.options.parallaxRatio;
				var scale = 1 + parallaxY / ((this.parallaxHeight - parallaxY) / 2);
				if (scale > 1) {
					this.parallaxImgStyle['opacity'] = 1 - parallaxY / 100 * this.options.parallaxRatio;
					this.parallaxStyle['webkitTransform'] = this._getTranslateStr(0, -parallaxY) + ' scale(' + scale + ',' + scale + ')';
				} else {
					this.parallaxImgStyle['opacity'] = 1;
					this.parallaxStyle['webkitTransform'] = this._getTranslateStr(0, -1) + ' scale(1,1)';
				}
			}
			if (this.indicators) {
				for (var i = this.indicators.length; i--;) {
					this.indicators[i].updatePosition();
				}
			}
			this.lastX = this.x;
			this.lastY = this.y;
			$.trigger(this.scroller, 'scroll', this);
		},
		reLayout: function() {
			this.wrapper.offsetHeight;

			var paddingLeft = parseFloat($.getStyles(this.wrapper, 'padding-left')) || 0;
			var paddingRight = parseFloat($.getStyles(this.wrapper, 'padding-right')) || 0;
			var paddingTop = parseFloat($.getStyles(this.wrapper, 'padding-top')) || 0;
			var paddingBottom = parseFloat($.getStyles(this.wrapper, 'padding-bottom')) || 0;

			var clientWidth = this.wrapper.clientWidth;
			var clientHeight = this.wrapper.clientHeight;

			this.scrollerWidth = this.scroller.offsetWidth;
			this.scrollerHeight = this.scroller.offsetHeight;

			this.wrapperWidth = clientWidth - paddingLeft - paddingRight;
			this.wrapperHeight = clientHeight - paddingTop - paddingBottom;

			this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0);
			this.maxScrollY = Math.min(this.wrapperHeight - this.scrollerHeight, 0);
			this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
			this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
			this._reLayout();
		},
		resetPosition: function(time) {
			var x = this.x,
				y = this.y;

			time = time || 0;
			if (!this.hasHorizontalScroll || this.x > 0) {
				x = 0;
			} else if (this.x < this.maxScrollX) {
				x = this.maxScrollX;
			}

			if (!this.hasVerticalScroll || this.y > 0) {
				y = 0;
			} else if (this.y < this.maxScrollY) {
				y = this.maxScrollY;
			}

			if (x == this.x && y == this.y) {
				return false;
			}
			this.scrollTo(x, y, time, this.options.scrollEasing);

			return true;
		},
		_reInit: function() {
			var groups = this.wrapper.querySelectorAll('.' + CLASS_SCROLL);
			for (var i = 0, len = groups.length; i < len; i++) {
				if (groups[i].parentNode === this.wrapper) {
					this.scroller = groups[i];
					break;
				}
			}
			this.scrollerStyle = this.scroller && this.scroller.style;
		},
		refresh: function() {
			this._reInit();
			this.reLayout();
			$.trigger(this.scroller, 'refresh', this);
			this.resetPosition();
		},
		scrollTo: function(x, y, time, easing) {
			var easing = easing || ease.circular;
			//			this.isInTransition = time > 0 && (this.lastX != x || this.lastY != y);
			//鏆備笉涓ユ牸鍒ゆ柇x,y锛屽惁鍒欎細瀵艰嚧閮ㄥ垎鐗堟湰涓婁笉姝ｅ父瑙﹀彂杞挱
			this.isInTransition = time > 0;
			if (this.isInTransition) {
				this._clearRequestAnimationFrame();
				this._transitionTimingFunction(easing.style);
				this._transitionTime(time);
				this.setTranslate(x, y);
			} else {
				this.setTranslate(x, y);
			}

		},
		scrollToBottom: function(time, easing) {
			time = time || this.options.scrollTime;
			this.scrollTo(0, this.maxScrollY, time, easing);
		},
		gotoPage: function(index) {
			this._gotoPage(index);
		},
		destroy: function() {
			this._initEvent(true); //detach
			delete $.data[this.wrapper.getAttribute('data-scroll')];
			this.wrapper.setAttribute('data-scroll', '');
		}
	});
	//Indicator
	var Indicator = function(scroller, options) {
		this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.wrapperStyle = this.wrapper.style;
		this.indicator = this.wrapper.children[0];
		this.indicatorStyle = this.indicator.style;
		this.scroller = scroller;

		this.options = $.extend({
			listenX: true,
			listenY: true,
			fade: false,
			speedRatioX: 0,
			speedRatioY: 0
		}, options);

		this.sizeRatioX = 1;
		this.sizeRatioY = 1;
		this.maxPosX = 0;
		this.maxPosY = 0;

		if (this.options.fade) {
			this.wrapperStyle['webkitTransform'] = this.scroller.translateZ;
			this.wrapperStyle['webkitTransitionDuration'] = this.options.fixedBadAndorid && $.os.isBadAndroid ? '0.001s' : '0ms';
			this.wrapperStyle.opacity = '0';
		}
	}
	Indicator.prototype = {
		handleEvent: function(e) {

		},
		transitionTime: function(time) {
			time = time || 0;
			this.indicatorStyle['webkitTransitionDuration'] = time + 'ms';
			if (this.scroller.options.fixedBadAndorid && !time && $.os.isBadAndroid) {
				this.indicatorStyle['webkitTransitionDuration'] = '0.001s';
			}
		},
		transitionTimingFunction: function(easing) {
			this.indicatorStyle['webkitTransitionTimingFunction'] = easing;
		},
		refresh: function() {
			this.transitionTime();

			if (this.options.listenX && !this.options.listenY) {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
			} else if (this.options.listenY && !this.options.listenX) {
				this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
			} else {
				this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
			}

			this.wrapper.offsetHeight; // force refresh

			if (this.options.listenX) {
				this.wrapperWidth = this.wrapper.clientWidth;
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';

				this.maxPosX = this.wrapperWidth - this.indicatorWidth;

				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;

				this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
			}

			if (this.options.listenY) {
				this.wrapperHeight = this.wrapper.clientHeight;
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';

				this.maxPosY = this.wrapperHeight - this.indicatorHeight;

				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;

				this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
			}

			this.updatePosition();
		},

		updatePosition: function() {
			var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
				y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

			if (x < this.minBoundaryX) {
				this.width = Math.max(this.indicatorWidth + x, 8);
				this.indicatorStyle.width = this.width + 'px';
				x = this.minBoundaryX;
			} else if (x > this.maxBoundaryX) {
				this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
				this.indicatorStyle.width = this.width + 'px';
				x = this.maxPosX + this.indicatorWidth - this.width;
			} else if (this.width != this.indicatorWidth) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if (y < this.minBoundaryY) {
				this.height = Math.max(this.indicatorHeight + y * 3, 8);
				this.indicatorStyle.height = this.height + 'px';
				y = this.minBoundaryY;
			} else if (y > this.maxBoundaryY) {
				this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
				this.indicatorStyle.height = this.height + 'px';
				y = this.maxPosY + this.indicatorHeight - this.height;
			} else if (this.height != this.indicatorHeight) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}

			this.x = x;
			this.y = y;

			this.indicatorStyle['webkitTransform'] = this.scroller._getTranslateStr(x, y);

		},
		fade: function(val, hold) {
			if (hold && !this.visible) {
				return;
			}

			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;

			var time = val ? 250 : 500,
				delay = val ? 0 : 300;

			val = val ? '1' : '0';

			this.wrapperStyle['webkitTransitionDuration'] = time + 'ms';

			this.fadeTimeout = setTimeout((function(val) {
				this.wrapperStyle.opacity = val;
				this.visible = +val;
			}).bind(this, val), delay);
		}
	};

	$.Scroll = Scroll;

	$.fn.scroll = function(options) {
		var scrollApis = [];
		this.each(function() {
			var scrollApi = null;
			var self = this;
			var id = self.getAttribute('data-scroll');
			if (!id) {
				id = ++$.uuid;
				var _options = $.extend({}, options);
				if (self.classList.contains('mui-segmented-control')) {
					_options = $.extend(_options, {
						scrollY: false,
						scrollX: true,
						indicators: false,
						snap: '.mui-control-item'
					});
				}
				$.data[id] = scrollApi = new Scroll(self, _options);
				self.setAttribute('data-scroll', id);
			} else {
				scrollApi = $.data[id];
			}
			scrollApis.push(scrollApi);
		});
		return scrollApis.length === 1 ? scrollApis[0] : scrollApis;
	};
})(mui, window, document);
(function($, window, document, undefined) {

    var CLASS_VISIBILITY = 'mui-visibility';
    var CLASS_HIDDEN = 'mui-hidden';

    var PullRefresh = $.Scroll.extend($.extend({
        handleEvent: function(e) {
            this._super(e);
            if (e.type === 'scrollbottom') {
                if (e.target === this.scroller) {
                    this._scrollbottom();
                }
            }
        },
        _scrollbottom: function() {
            if (!this.pulldown && !this.loading) {
                this.pulldown = false;
                this._initPullupRefresh();
                this.pullupLoading();
            }
        },
        _start: function(e) {
            //浠呬笅鎷夊埛鏂板湪start闃绘榛樿浜嬩欢
            if (e.touches && e.touches.length && e.touches[0].clientX > 30) {
                e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
            }
            if (!this.loading) {
                this.pulldown = this.pullPocket = this.pullCaption = this.pullLoading = false
            }
            this._super(e);
        },
        _drag: function(e) {
            if (this.y >= 0 && this.disablePulldown && e.detail.direction === 'down') { //绂佺敤涓嬫媺鍒锋柊
                return;
            }
            this._super(e);
            if (!this.pulldown && !this.loading && this.topPocket && e.detail.direction === 'down' && this.y >= 0) {
                this._initPulldownRefresh();
            }
            if (this.pulldown) {
                this._setCaption(this.y > this.options.down.height ? this.options.down.contentover : this.options.down.contentdown);
            }
        },

        _reLayout: function() {
            this.hasVerticalScroll = true;
            this._super();
        },
        //API
        resetPosition: function(time) {
            if (this.pulldown && !this.disablePulldown) {
                if (this.y >= this.options.down.height) {
                    this.pulldownLoading(undefined, time || 0);
                    return true;
                } else {
                    !this.loading && this.topPocket.classList.remove(CLASS_VISIBILITY);
                }
            }
            return this._super(time);
        },
        pulldownLoading: function(y, time) {
            typeof y === 'undefined' && (y = this.options.down.height); //榛樿楂樺害
            this.scrollTo(0, y, time, this.options.bounceEasing);
            if (this.loading) {
                return;
            }
            //			if (!this.pulldown) {
            this._initPulldownRefresh();
            //			}
            this._setCaption(this.options.down.contentrefresh);
            this.loading = true;
            this.indicators.map(function(indicator) {
                indicator.fade(0);
            });
            var callback = this.options.down.callback;
            callback && callback.call(this);
        },
        endPulldownToRefresh: function() {
            var self = this;
            if (self.topPocket && self.loading && this.pulldown) {
                self.scrollTo(0, 0, self.options.bounceTime, self.options.bounceEasing);
                self.loading = false;
                self._setCaption(self.options.down.contentdown, true);
                setTimeout(function() {
                    self.loading || self.topPocket.classList.remove(CLASS_VISIBILITY);
                }, 350);
            }
        },
        pullupLoading: function(callback, x, time) {
            x = x || 0;
            this.scrollTo(x, this.maxScrollY, time, this.options.bounceEasing);
            if (this.loading) {
                return;
            }
            this._initPullupRefresh();
            this._setCaption(this.options.up.contentrefresh);
            this.indicators.map(function(indicator) {
                indicator.fade(0);
            });
            this.loading = true;
            callback = callback || this.options.up.callback;
            callback && callback.call(this);
        },
        endPullupToRefresh: function(finished) {
            var self = this;
            if (self.bottomPocket) { // && self.loading && !this.pulldown
                self.loading = false;
                if (finished) {
                    this.finished = true;
                    self._setCaption(self.options.up.contentnomore);
                    //					self.bottomPocket.classList.remove(CLASS_VISIBILITY);
                    //					self.bottomPocket.classList.add(CLASS_HIDDEN);
                    self.wrapper.removeEventListener('scrollbottom', self);
                } else {
                    self._setCaption(self.options.up.contentdown);
                    //					setTimeout(function() {
                    self.loading || self.bottomPocket.classList.remove(CLASS_VISIBILITY);
                    //					}, 300);
                }
            }
        },
        disablePullupToRefresh: function() {
            this._initPullupRefresh();
            this.bottomPocket.className = 'mui-pull-bottom-pocket' + ' ' + CLASS_HIDDEN;
            this.wrapper.removeEventListener('scrollbottom', this);
        },
        disablePulldownToRefresh: function() {
            this._initPulldownRefresh();
            this.topPocket.className = 'mui-pull-top-pocket' + ' ' + CLASS_HIDDEN;
            this.disablePulldown = true;
        },
        enablePulldownToRefresh: function() {
            this._initPulldownRefresh();
            this.topPocket.classList.remove(CLASS_HIDDEN);
            this._setCaption(this.options.down.contentdown);
            this.disablePulldown = false;
        },
        enablePullupToRefresh: function() {
            this._initPullupRefresh();
            this.bottomPocket.classList.remove(CLASS_HIDDEN);
            this._setCaption(this.options.up.contentdown);
            this.wrapper.addEventListener('scrollbottom', this);
        },
        refresh: function(isReset) {
            if (isReset && this.finished) {
                this.enablePullupToRefresh();
                this.finished = false;
            }
            this._super();
        },
    }, $.PullRefresh));
    $.fn.pullRefresh = function(options) {
        if (this.length === 1) {
            var self = this[0];
            var pullRefreshApi = null;
            var id = self.getAttribute('data-pullrefresh');
            if (!id && typeof options === 'undefined') {
                return false;
            }
            options = options || {};
            if (!id) {
                id = ++$.uuid;
                $.data[id] = pullRefreshApi = new PullRefresh(self, options);
                self.setAttribute('data-pullrefresh', id);
            } else {
                pullRefreshApi = $.data[id];
            }
            if (options.down && options.down.auto) { //濡傛灉璁剧疆浜哸uto锛屽垯鑷姩涓嬫媺涓€娆�
                pullRefreshApi.pulldownLoading(options.down.autoY);
            } else if (options.up && options.up.auto) { //濡傛灉璁剧疆浜哸uto锛屽垯鑷姩涓婃媺涓€娆�
                pullRefreshApi.pullupLoading();
            }
            //鏆備笉鎻愪緵杩欑璋冪敤鏂瑰紡鍚�			
            //			if (typeof options === 'string') {
            //				var methodValue = pullRefreshApi[options].apply(pullRefreshApi, $.slice.call(arguments, 1));
            //				if (methodValue !== undefined) {
            //					return methodValue;
            //				}
            //			}
            return pullRefreshApi;
        }
    };
})(mui, window, document);
/**
 * snap 閲嶆瀯
 * @param {Object} $
 * @param {Object} window
 */
(function($, window) {
	var CLASS_SLIDER = 'mui-slider';
	var CLASS_SLIDER_GROUP = 'mui-slider-group';
	var CLASS_SLIDER_LOOP = 'mui-slider-loop';
	var CLASS_SLIDER_INDICATOR = 'mui-slider-indicator';
	var CLASS_ACTION_PREVIOUS = 'mui-action-previous';
	var CLASS_ACTION_NEXT = 'mui-action-next';
	var CLASS_SLIDER_ITEM = 'mui-slider-item';

	var CLASS_ACTIVE = 'mui-active';

	var SELECTOR_SLIDER_ITEM = '.' + CLASS_SLIDER_ITEM;
	var SELECTOR_SLIDER_INDICATOR = '.' + CLASS_SLIDER_INDICATOR;
	var SELECTOR_SLIDER_PROGRESS_BAR = '.mui-slider-progress-bar';

	var Slider = $.Slider = $.Scroll.extend({
		init: function(element, options) {
			this._super(element, $.extend(true, {
				fingers: 1,
				interval: 0, //璁剧疆涓�0锛屽垯涓嶅畾鏃惰疆鎾�
				scrollY: false,
				scrollX: true,
				indicators: false,
				scrollTime: 1000,
				startX: false,
				slideTime: 0, //婊戝姩鍔ㄧ敾鏃堕棿
				snap: SELECTOR_SLIDER_ITEM
			}, options));
			if (this.options.startX) {
				//				$.trigger(this.wrapper, 'scrollend', this);
			}
		},
		_init: function() {
			this._reInit();
			if (this.scroller) {
				this.scrollerStyle = this.scroller.style;
				this.progressBar = this.wrapper.querySelector(SELECTOR_SLIDER_PROGRESS_BAR);
				if (this.progressBar) {
					this.progressBarWidth = this.progressBar.offsetWidth;
					this.progressBarStyle = this.progressBar.style;
				}
				//蹇樿杩欎釜浠ｇ爜鏄共浠€涔堢殑浜嗭紵
				//				this.x = this._getScroll();
				//				if (this.options.startX === false) {
				//					this.options.startX = this.x;
				//				}
				//鏍规嵁active淇startX

				this._super();
				this._initTimer();
			}
		},
		_triggerSlide: function() {
			var self = this;
			self.isInTransition = false;
			var page = self.currentPage;
			self.slideNumber = self._fixedSlideNumber();
			if (self.loop) {
				if (self.slideNumber === 0) {
					self.setTranslate(self.pages[1][0].x, 0);
				} else if (self.slideNumber === self.itemLength - 3) {
					self.setTranslate(self.pages[self.itemLength - 2][0].x, 0);
				}
			}
			if (self.lastSlideNumber != self.slideNumber) {
				self.lastSlideNumber = self.slideNumber;
				self.lastPage = self.currentPage;
				$.trigger(self.wrapper, 'slide', {
					slideNumber: self.slideNumber
				});
			}
			self._initTimer();
		},
		_handleSlide: function(e) {
			var self = this;
			if (e.target !== self.wrapper) {
				return;
			}
			var detail = e.detail;
			detail.slideNumber = detail.slideNumber || 0;
			var temps = self.scroller.querySelectorAll(SELECTOR_SLIDER_ITEM);
			var items = [];
			for (var i = 0, len = temps.length; i < len; i++) {
				var item = temps[i];
				if (item.parentNode === self.scroller) {
					items.push(item);
				}
			}
			var _slideNumber = detail.slideNumber;
			if (self.loop) {
				_slideNumber += 1;
			}
			if (!self.wrapper.classList.contains('mui-segmented-control')) {
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i];
					if (item.parentNode === self.scroller) {
						if (i === _slideNumber) {
							item.classList.add(CLASS_ACTIVE);
						} else {
							item.classList.remove(CLASS_ACTIVE);
						}
					}
				}
			}
			var indicatorWrap = self.wrapper.querySelector('.mui-slider-indicator');
			if (indicatorWrap) {
				if (indicatorWrap.getAttribute('data-scroll')) { //scroll
					$(indicatorWrap).scroll().gotoPage(detail.slideNumber);
				}
				var indicators = indicatorWrap.querySelectorAll('.mui-indicator');
				if (indicators.length > 0) { //鍥剧墖杞挱
					for (var i = 0, len = indicators.length; i < len; i++) {
						indicators[i].classList[i === detail.slideNumber ? 'add' : 'remove'](CLASS_ACTIVE);
					}
				} else {
					var number = indicatorWrap.querySelector('.mui-number span');
					if (number) { //鍥炬枃琛ㄦ牸
						number.innerText = (detail.slideNumber + 1);
					} else { //segmented controls
						var controlItems = indicatorWrap.querySelectorAll('.mui-control-item');
						for (var i = 0, len = controlItems.length; i < len; i++) {
							controlItems[i].classList[i === detail.slideNumber ? 'add' : 'remove'](CLASS_ACTIVE);
						}
					}
				}
			}
			e.stopPropagation();
		},
		_handleTabShow: function(e) {
			var self = this;
			self.gotoItem((e.detail.tabNumber || 0), self.options.slideTime);
		},
		_handleIndicatorTap: function(event) {
			var self = this;
			var target = event.target;
			if (target.classList.contains(CLASS_ACTION_PREVIOUS) || target.classList.contains(CLASS_ACTION_NEXT)) {
				self[target.classList.contains(CLASS_ACTION_PREVIOUS) ? 'prevItem' : 'nextItem']();
				event.stopPropagation();
			}
		},
		_initEvent: function(detach) {
			var self = this;
			self._super(detach);
			var action = detach ? 'removeEventListener' : 'addEventListener';
			self.wrapper[action]('slide', this);
			self.wrapper[action]($.eventName('shown', 'tab'), this);
		},
		handleEvent: function(e) {
			this._super(e);
			switch (e.type) {
				case 'slide':
					this._handleSlide(e);
					break;
				case $.eventName('shown', 'tab'):
					if (~this.snaps.indexOf(e.target)) { //閬垮厤宓屽鐩戝惉閿欒鐨則ab show
						this._handleTabShow(e);
					}
					break;
			}
		},
		_scrollend: function(e) {
			this._super(e);
			this._triggerSlide(e);
		},
		_drag: function(e) {
			this._super(e);
			var direction = e.detail.direction;
			if (direction === 'left' || direction === 'right') {
				//鎷栨嫿鏈熼棿鍙栨秷瀹氭椂
				var slidershowTimer = this.wrapper.getAttribute('data-slidershowTimer');
				slidershowTimer && window.clearTimeout(slidershowTimer);

				e.stopPropagation();
			}
		},
		_initTimer: function() {
			var self = this;
			var slider = self.wrapper;
			var interval = self.options.interval;
			var slidershowTimer = slider.getAttribute('data-slidershowTimer');
			slidershowTimer && window.clearTimeout(slidershowTimer);
			if (interval) {
				slidershowTimer = window.setTimeout(function() {
					if (!slider) {
						return;
					}
					//浠卻lider鏄剧ず鐘舵€佽繘琛岃嚜鍔ㄨ疆鎾�
					if (!!(slider.offsetWidth || slider.offsetHeight)) {
						self.nextItem(true);
						//涓嬩竴涓�
					}
					self._initTimer();
				}, interval);
				slider.setAttribute('data-slidershowTimer', slidershowTimer);
			}
		},

		_fixedSlideNumber: function(page) {
			page = page || this.currentPage;
			var slideNumber = page.pageX;
			if (this.loop) {
				if (page.pageX === 0) {
					slideNumber = this.itemLength - 3;
				} else if (page.pageX === (this.itemLength - 1)) {
					slideNumber = 0;
				} else {
					slideNumber = page.pageX - 1;
				}
			}
			return slideNumber;
		},
		_reLayout: function() {
			this.hasHorizontalScroll = true;
			this.loop = this.scroller.classList.contains(CLASS_SLIDER_LOOP);
			this._super();
		},
		_getScroll: function() {
			var result = $.parseTranslateMatrix($.getStyles(this.scroller, 'webkitTransform'));
			return result ? result.x : 0;
		},
		_transitionEnd: function(e) {
			if (e.target !== this.scroller || !this.isInTransition) {
				return;
			}
			this._transitionTime();
			this.isInTransition = false;
			$.trigger(this.wrapper, 'scrollend', this);
		},
		_flick: function(e) {
			if (!this.moved) { //鏃爉oved
				return;
			}
			var detail = e.detail;
			var direction = detail.direction;
			this._clearRequestAnimationFrame();
			this.isInTransition = true;
			//			if (direction === 'up' || direction === 'down') {
			//				this.resetPosition(this.options.bounceTime);
			//				return;
			//			}
			if (e.type === 'flick') {
				if (detail.deltaTime < 200) { //flick锛屽お瀹规槗瑙﹀彂锛岄澶栨牎楠屼竴涓媎eltaTime
					this.x = this._getPage((this.slideNumber + (direction === 'right' ? -1 : 1)), true).x;
				}
				this.resetPosition(this.options.bounceTime);
			} else if (e.type === 'dragend' && !detail.flick) {
				this.resetPosition(this.options.bounceTime);
			}
			e.stopPropagation();
		},
		_initSnap: function() {
			this.scrollerWidth = this.itemLength * this.scrollerWidth;
			this.maxScrollX = Math.min(this.wrapperWidth - this.scrollerWidth, 0);
			this._super();
			if (!this.currentPage.x) {
				//褰搒lider澶勪簬闅愯棌鐘舵€佹椂锛屽鑷磗nap璁＄畻鏄敊璇殑锛屼复鏃跺厛杩欎箞鍒ゆ柇涓€涓嬶紝鍚庣画瑕佽€冭檻瑙ｅ喅鎵€鏈塻croll鍦ㄩ殣钘忕姸鎬佷笅鍒濆鍖栧睘鎬т笉姝ｇ‘鐨勯棶棰�
				var currentPage = this.pages[this.loop ? 1 : 0];
				currentPage = currentPage || this.pages[0];
				if (!currentPage) {
					return;
				}
				this.currentPage = currentPage[0];
				this.slideNumber = 0;
				this.lastSlideNumber = typeof this.lastSlideNumber === 'undefined' ? 0 : this.lastSlideNumber;
			} else {
				this.slideNumber = this._fixedSlideNumber();
				this.lastSlideNumber = typeof this.lastSlideNumber === 'undefined' ? this.slideNumber : this.lastSlideNumber;
			}
			this.options.startX = this.currentPage.x || 0;
		},
		_getSnapX: function(offsetLeft) {
			return Math.max(-offsetLeft, this.maxScrollX);
		},
		_getPage: function(slideNumber, isFlick) {
			if (this.loop) {
				if (slideNumber > (this.itemLength - (isFlick ? 2 : 3))) {
					slideNumber = 1;
					time = 0;
				} else if (slideNumber < (isFlick ? -1 : 0)) {
					slideNumber = this.itemLength - 2;
					time = 0;
				} else {
					slideNumber += 1;
				}
			} else {
				if (!isFlick) {
					if (slideNumber > (this.itemLength - 1)) {
						slideNumber = 0;
						time = 0;
					} else if (slideNumber < 0) {
						slideNumber = this.itemLength - 1;
						time = 0;
					}
				}
				slideNumber = Math.min(Math.max(0, slideNumber), this.itemLength - 1);
			}
			return this.pages[slideNumber][0];
		},
		_gotoItem: function(slideNumber, time) {
			this.currentPage = this._getPage(slideNumber, true); //姝ゅ浼爐rue銆傚彲淇濊瘉绋嬪簭鍒囨崲鏃讹紝鍔ㄧ敾涓庝汉鎵嬫搷浣滀竴鑷�(绗竴寮狅紝鏈€鍚庝竴寮犵殑鍒囨崲鍔ㄧ敾)
			this.scrollTo(this.currentPage.x, 0, time, this.options.scrollEasing);
			if (time === 0) {
				$.trigger(this.wrapper, 'scrollend', this);
			}
		},
		//API
		setTranslate: function(x, y) {
			this._super(x, y);
			var progressBar = this.progressBar;
			if (progressBar) {
				this.progressBarStyle.webkitTransform = this._getTranslateStr((-x * (this.progressBarWidth / this.wrapperWidth)), 0);
			}
		},
		resetPosition: function(time) {
			time = time || 0;
			if (this.x > 0) {
				this.x = 0;
			} else if (this.x < this.maxScrollX) {
				this.x = this.maxScrollX;
			}
			this.currentPage = this._nearestSnap(this.x);
			this.scrollTo(this.currentPage.x, 0, time, this.options.scrollEasing);
			return true;
		},
		gotoItem: function(slideNumber, time) {
			this._gotoItem(slideNumber, typeof time === 'undefined' ? this.options.scrollTime : time);
		},
		nextItem: function() {
			this._gotoItem(this.slideNumber + 1, this.options.scrollTime);
		},
		prevItem: function() {
			this._gotoItem(this.slideNumber - 1, this.options.scrollTime);
		},
		getSlideNumber: function() {
			return this.slideNumber || 0;
		},
		_reInit: function() {
			var groups = this.wrapper.querySelectorAll('.' + CLASS_SLIDER_GROUP);
			for (var i = 0, len = groups.length; i < len; i++) {
				if (groups[i].parentNode === this.wrapper) {
					this.scroller = groups[i];
					break;
				}
			}
			this.scrollerStyle = this.scroller && this.scroller.style;
			if (this.progressBar) {
				this.progressBarWidth = this.progressBar.offsetWidth;
				this.progressBarStyle = this.progressBar.style;
			}
		},
		refresh: function(options) {
			if (options) {
				$.extend(this.options, options);
				this._super();
				this._initTimer();
			} else {
				this._super();
			}
		},
		destroy: function() {
			this._initEvent(true); //detach
			delete $.data[this.wrapper.getAttribute('data-slider')];
			this.wrapper.setAttribute('data-slider', '');
		}
	});
	$.fn.slider = function(options) {
		var slider = null;
		this.each(function() {
			var sliderElement = this;
			if (!this.classList.contains(CLASS_SLIDER)) {
				sliderElement = this.querySelector('.' + CLASS_SLIDER);
			}
			if (sliderElement && sliderElement.querySelector(SELECTOR_SLIDER_ITEM)) {
				var id = sliderElement.getAttribute('data-slider');
				if (!id) {
					id = ++$.uuid;
					$.data[id] = slider = new Slider(sliderElement, options);
					sliderElement.setAttribute('data-slider', id);
				} else {
					slider = $.data[id];
					if (slider && options) {
						slider.refresh(options);
					}
				}
			}
		});
		return slider;
	};
	$.ready(function() {
		//		setTimeout(function() {
		$('.mui-slider').slider();
		$('.mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control').scroll({
			scrollY: false,
			scrollX: true,
			indicators: false,
			snap: '.mui-control-item'
		});
		//		}, 500); //涓存椂澶勭悊slider瀹藉害璁＄畻涓嶆纭殑闂(鍒濇纭鏄痵crollbar瀵艰嚧鐨�)

	});
})(mui, window);
/**
 * pullRefresh 5+
 * @param {type} $
 * @returns {undefined}
 */
(function($, document) {
    if (!($.os.plus)) { //浠呭湪5+android鏀寔澶歸ebview鐨勪娇鐢�
        return;
    }
    $.plusReady(function() {
        if (window.__NWin_Enable__ === false) { //涓嶆敮鎸佸webview锛屽垯涓嶇敤5+涓嬫媺鍒锋柊
            return;
        }
        var CLASS_PLUS_PULLREFRESH = 'mui-plus-pullrefresh';
        var CLASS_VISIBILITY = 'mui-visibility';
        var CLASS_HIDDEN = 'mui-hidden';
        var CLASS_BLOCK = 'mui-block';

        var CLASS_PULL_CAPTION = 'mui-pull-caption';
        var CLASS_PULL_CAPTION_DOWN = 'mui-pull-caption-down';
        var CLASS_PULL_CAPTION_REFRESH = 'mui-pull-caption-refresh';
        var CLASS_PULL_CAPTION_NOMORE = 'mui-pull-caption-nomore';

        var PlusPullRefresh = $.Class.extend({
            init: function(element, options) {
                this.element = element;
                this.options = options;
                this.wrapper = this.scroller = element;
                this._init();
                this._initPulldownRefreshEvent();
            },
            _init: function() {
                var self = this;
                //document.addEventListener('plusscrollbottom', this);
                window.addEventListener('dragup', self);
                document.addEventListener("plusscrollbottom", self);
                self.scrollInterval = window.setInterval(function() {
                    if (self.isScroll && !self.loading) {
                        if (window.pageYOffset + window.innerHeight + 10 >= document.documentElement.scrollHeight) {
                            self.isScroll = false; //鏀惧湪杩欓噷鏄洜涓哄揩閫熸粴鍔ㄧ殑璇濓紝鏈夊彲鑳芥娴嬫椂锛岃繕娌″埌搴曪紝鎵€浠ュ彧瑕佹湁婊氬姩锛屾病鍒板簳涔嬪墠涓€鐩存娴嬮珮搴﹀彉鍖�
                            if (self.bottomPocket) {
                                self.pullupLoading();
                            }
                        }
                    }
                }, 100);
            },
            _initPulldownRefreshEvent: function() {
                var self = this;
                $.plusReady(function() {
                    if (self.options.down.style == "circle") {
                        //鍗晈ebview銆佸師鐢熻浆鍦�
                        self.options.webview = plus.webview.currentWebview();
                        self.options.webview.setPullToRefresh({
                            support: true,
                            color: self.options.down.color || '#2BD009',
                            height: self.options.down.height || '50px',
                            range: self.options.down.range || '100px',
                            style: 'circle',
                            offset: self.options.down.offset || '0px'
                        }, function() {
                            self.options.down.callback();
                        });
                    } else if (self.topPocket && self.options.webviewId) {
                        var webview = plus.webview.getWebviewById(self.options.webviewId); //瀛愮獥鍙�
                        if (!webview) {
                            return;
                        }
                        self.options.webview = webview;
                        var downOptions = self.options.down;
                        var height = downOptions.height;
                        webview.addEventListener('close', function() {
                            var attrWebviewId = self.options.webviewId && self.options.webviewId.replace(/\//g, "_"); //鏇挎崲鎵€鏈�"/" 
                            self.element.removeAttribute('data-pullrefresh-plus-' + attrWebviewId);
                        });
                        webview.addEventListener("dragBounce", function(e) {
                            if (!self.pulldown) {
                                self._initPulldownRefresh();
                            } else {
                                self.pullPocket.classList.add(CLASS_BLOCK);
                            }
                            switch (e.status) {
                                case "beforeChangeOffset": //涓嬫媺鍙埛鏂扮姸鎬�
                                    self._setCaption(downOptions.contentdown);
                                    break;
                                case "afterChangeOffset": //鏉惧紑鍙埛鏂扮姸鎬�
                                    self._setCaption(downOptions.contentover);
                                    break;
                                case "dragEndAfterChangeOffset": //姝ｅ湪鍒锋柊鐘舵€�
                                    //鎵ц涓嬫媺鍒锋柊鎵€鍦╳ebview鐨勫洖璋冨嚱鏁�
                                    webview.evalJS("window.mui&&mui.options.pullRefresh.down.callback()");
                                    self._setCaption(downOptions.contentrefresh);
                                    break;
                                default:
                                    break;
                            }
                        }, false);

                        webview.setBounce({
                            position: {
                                top: height * 2 + 'px'
                            },
                            changeoffset: {
                                top: height + 'px'
                            }
                        });

                    }
                });
            },
            handleEvent: function(e) {
                var self = this;
                if (self.stopped) {
                    return;
                }
                self.isScroll = false;
                if (e.type === 'dragup' || e.type === 'plusscrollbottom') {
                    self.isScroll = true;
                    setTimeout(function() {
                        self.isScroll = false;
                    }, 1000);
                }
            }
        }).extend($.extend({
            setStopped: function(stopped) { //璇ユ柟娉曟槸瀛愰〉闈㈣皟鐢ㄧ殑
                this.stopped = !!stopped;
                // TODO 姝ゅ闇€瑕佽缃綋鍓峸ebview鐨刡ounce涓簄one,鐩墠5+鏈塀UG
                if (this.stopped) {
                    this.disablePullupToRefresh();
                    this.disablePulldownToRefresh();
                } else {
                    this.enablePullupToRefresh();
                    this.enablePulldownToRefresh();
                }
            },
            beginPulldown: function() {
                var self = this;
                $.plusReady(function() {
                    //杩欓噷寤舵椂鐨勭洰鐨勬槸涓轰簡淇濊瘉涓嬫媺鍒锋柊缁勪欢鍒濆鍖栧畬鎴愶紝鍚庣画搴旇鍋氭垚鏈夌姸鎬佺殑
                    setTimeout(function() {
                        if (self.options.down.style == "circle") { //鍗晈ebview涓嬫媺鍒锋柊
                            plus.webview.currentWebview().beginPullToRefresh();
                        } else { //鍙寃ebview妯″紡
                            var webview = self.options.webview;
                            if (webview) {
                                webview.setBounce({
                                    offset: {
                                        top: self.options.down.height + "px"
                                    }
                                });
                            }
                        }
                    }, 15);
                }.bind(this));
            },
            pulldownLoading: function() { //璇ユ柟娉曟槸瀛愰〉闈㈣皟鐢ㄧ殑锛屽吋瀹硅€佺殑鍘嗗彶API
                this.beginPulldown();
            },
            _pulldownLoading: function() { //璇ユ柟娉曟槸鐖堕〉闈㈣皟鐢ㄧ殑
                var self = this;
                $.plusReady(function() {
                    var childWebview = plus.webview.getWebviewById(self.options.webviewId);
                    childWebview && childWebview.setBounce({
                        offset: {
                            top: self.options.down.height + "px"
                        }
                    });
                });
            },
            endPulldown: function() {
                var _wv = plus.webview.currentWebview();
                //鍙寃ebview鐨勪笅鎷夊埛鏂帮紝闇€瑕佷慨鏀圭埗绐楀彛鎻愮ず淇℃伅
                if (_wv.parent() && this.options.down.style !== "circle") {
                    _wv.parent().evalJS("mui&&mui(document.querySelector('.mui-content')).pullRefresh('" + JSON.stringify({
                        webviewId: _wv.id
                    }) + "')._endPulldownToRefresh()");
                } else {
                    _wv.endPullToRefresh();
                }
            },
            endPulldownToRefresh: function() { //璇ユ柟娉曟槸瀛愰〉闈㈣皟鐢ㄧ殑锛屽吋瀹硅€佺殑鍘嗗彶API
                this.endPulldown();
            },
            _endPulldownToRefresh: function() { //璇ユ柟娉曟槸鐖堕〉闈㈣皟鐢ㄧ殑
                var self = this;
                if (self.topPocket && self.options.webview) {
                    self.options.webview.endPullToRefresh(); //涓嬫媺鍒锋柊鎵€鍦╳ebview鍥炲脊
                    self.loading = false;
                    self._setCaption(self.options.down.contentdown, true);
                    setTimeout(function() {
                        self.loading || self.topPocket.classList.remove(CLASS_BLOCK);
                    }, 350);
                }
            },
            beginPullup: function(callback) { //寮€濮嬩笂鎷夊姞杞�
                var self = this;
                if (self.isLoading) return;
                self.isLoading = true;
                if (self.pulldown !== false) {
                    self._initPullupRefresh();
                } else {
                    this.pullPocket.classList.add(CLASS_BLOCK);
                }
                setTimeout(function() {
                    self.pullLoading.classList.add(CLASS_VISIBILITY);
                    self.pullLoading.classList.remove(CLASS_HIDDEN);
                    self.pullCaption.innerHTML = ''; //淇5+閲岃竟绗竴娆″姞杞芥椂锛屾枃瀛楁樉绀虹殑bug(杩樹細鏄剧ず鍑烘潵涓€滃鈥�,鐚滄祴搴旇鏄覆鏌撻棶棰樺鑷寸殑)
                    self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_REFRESH;
                    self.pullCaption.innerHTML = self.options.up.contentrefresh;
                    callback = callback || self.options.up.callback;
                    callback && callback.call(self);
                }, 300);
            },
            pullupLoading: function(callback) { //鍏煎鑰佺殑API
                this.beginPullup(callback);
            },
            endPullup: function(finished) { //涓婃媺鍔犺浇缁撴潫
                var self = this;
                if (self.pullLoading) {
                    self.pullLoading.classList.remove(CLASS_VISIBILITY);
                    self.pullLoading.classList.add(CLASS_HIDDEN);
                    self.isLoading = false;
                    if (finished) {
                        self.finished = true;
                        self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_NOMORE;
                        self.pullCaption.innerHTML = self.options.up.contentnomore;
                        //鍙栨秷5+鐨刾lusscrollbottom浜嬩欢
                        document.removeEventListener('plusscrollbottom', self);
                        window.removeEventListener('dragup', self);
                    } else { //鍒濆鍖栨椂闅愯棌锛屽悗缁笉鍐嶉殣钘�
                        self.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
                        self.pullCaption.innerHTML = self.options.up.contentdown;
                    }
                }
            },
            endPullupToRefresh: function(finished) { //涓婃媺鍔犺浇缁撴潫锛屽吋瀹硅€佺殑API
                this.endPullup(finished);
            },
            disablePulldownToRefresh: function() {
                var webview = plus.webview.currentWebview();
                if (this.options.down.style && this.options.down.style == 'circle') { // 鍗晈ebview妯″紡绂佹鍘熺敓涓嬫媺鍒锋柊
                    this.options.webview.setPullToRefresh({
                        support: false,
                        style: 'circle'
                    });
                } else { // 鍙寃ebview妯″紡绂佹涓嬫媺鍒锋柊
                    webview.setStyle({
                        bounce: 'none'
                    });
                    webview.setBounce({
                        position: {
                            top: 'none'
                        }
                    });
                }
            },
            enablePulldownToRefresh: function() {
                var self = this,
                    webview = plus.webview.currentWebview(),
                    height = this.options.down.height;
                // 鍗晈ebview妯″紡绂佹鍘熺敓涓嬫媺鍒锋柊
                if (this.options.down.style && this.options.down.style == 'circle') {
                    webview.setPullToRefresh({
                        support: true,
                        height: height || '50px',
                        range: self.options.down.range || '100px',
                        style: 'circle',
                        offset: self.options.down.offset || '0px'
                    });
                } else { // 閲嶆柊鍒濆鍖栧弻webview妯″紡涓嬫媺鍒锋柊
                    webview.setStyle({
                        bounce: 'vertical'
                    });
                    webview.setBounce({
                        position: {
                            top: height * 2 + 'px'
                        },
                        changeoffset: {
                            top: height + 'px'
                        }
                    });
                }
            },
            disablePullupToRefresh: function() {
                this._initPullupRefresh();
                this.bottomPocket.className = 'mui-pull-bottom-pocket' + ' ' + CLASS_HIDDEN;
                window.removeEventListener('dragup', this);
            },
            enablePullupToRefresh: function() {
                this._initPullupRefresh();
                this.bottomPocket.classList.remove(CLASS_HIDDEN);
                this.pullCaption.className = CLASS_PULL_CAPTION + ' ' + CLASS_PULL_CAPTION_DOWN;
                this.pullCaption.innerHTML = this.options.up.contentdown;
                document.addEventListener("plusscrollbottom", this);
                window.addEventListener('dragup', this);
            },
            scrollTo: function(x, y, time) {
                $.scrollTo(y, time);
            },
            scrollToBottom: function(time) {
                $.scrollTo(document.documentElement.scrollHeight, time);
            },
            refresh: function(isReset) {
                if (isReset && this.finished) {
                    this.enablePullupToRefresh();
                    this.finished = false;
                }
            }
        }, $.PullRefresh));

        //override h5 pullRefresh
        $.fn.pullRefresh_native = function(options) {
            var self;
            if (this.length === 0) {
                self = document.createElement('div');
                self.className = 'mui-content';
                document.body.appendChild(self);
            } else {
                self = this[0];
            }
            var args = options;
            //涓€涓埗闇€瑕佹敮鎸佸涓瓙涓嬫媺鍒锋柊
            options = options || {}
            if (typeof options === 'string') {
                options = $.parseJSON(options);
            };
            !options.webviewId && (options.webviewId = (plus.webview.currentWebview().id || plus.webview.currentWebview().getURL()));
            var pullRefreshApi = null;
            var attrWebviewId = options.webviewId && options.webviewId.replace(/\//g, "_"); //鏇挎崲鎵€鏈�"/"
            var id = self.getAttribute('data-pullrefresh-plus-' + attrWebviewId);
            if (!id && typeof args === 'undefined') {
                return false;
            }
            if (!id) { //閬垮厤閲嶅鍒濆鍖�5+ pullrefresh
                id = ++$.uuid;
                self.setAttribute('data-pullrefresh-plus-' + attrWebviewId, id);
                document.body.classList.add(CLASS_PLUS_PULLREFRESH);
                $.data[id] = pullRefreshApi = new PlusPullRefresh(self, options);
            } else {
                pullRefreshApi = $.data[id];
            }
            if (options.down && options.down.auto) { //濡傛灉璁剧疆浜哸uto锛屽垯鑷姩涓嬫媺涓€娆�
                //pullRefreshApi._pulldownLoading(); //parent webview
                pullRefreshApi.beginPulldown();
            } else if (options.up && options.up.auto) { //濡傛灉璁剧疆浜哸uto锛屽垯鑷姩涓婃媺涓€娆�
                pullRefreshApi.beginPullup();
            }
            return pullRefreshApi;
        };
    });

})(mui, document);
/**
 * off-canvas
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} action
 * @returns {undefined}
 */
(function($, window, document, name) {
	var CLASS_OFF_CANVAS_LEFT = 'mui-off-canvas-left';
	var CLASS_OFF_CANVAS_RIGHT = 'mui-off-canvas-right';
	var CLASS_ACTION_BACKDROP = 'mui-off-canvas-backdrop';
	var CLASS_OFF_CANVAS_WRAP = 'mui-off-canvas-wrap';

	var CLASS_SLIDE_IN = 'mui-slide-in';
	var CLASS_ACTIVE = 'mui-active';


	var CLASS_TRANSITIONING = 'mui-transitioning';

	var SELECTOR_INNER_WRAP = '.mui-inner-wrap';


	var OffCanvas = $.Class.extend({
		init: function(element, options) {
			this.wrapper = this.element = element;
			this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
			this.classList = this.wrapper.classList;
			if (this.scroller) {
				this.options = $.extend(true, {
					dragThresholdX: 10,
					scale: 0.8,
					opacity: 0.1,
					preventDefaultException: {
						tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
					},
				}, options);
				document.body.classList.add('mui-fullscreen'); //fullscreen
				this.refresh();
				this.initEvent();
			}
		},
		_preventDefaultException: function(el, exceptions) {
			for (var i in exceptions) {
				if (exceptions[i].test(el[i])) {
					return true;
				}
			}
			return false;
		},
		refresh: function(offCanvas) {
			//			offCanvas && !offCanvas.classList.contains(CLASS_ACTIVE) && this.classList.remove(CLASS_ACTIVE);
			this.slideIn = this.classList.contains(CLASS_SLIDE_IN);
			this.scalable = this.classList.contains('mui-scalable') && !this.slideIn;
			this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
			//			!offCanvas && this.scroller.classList.remove(CLASS_TRANSITIONING);
			//			!offCanvas && this.scroller.setAttribute('style', '');
			this.offCanvasLefts = this.wrapper.querySelectorAll('.' + CLASS_OFF_CANVAS_LEFT);
			this.offCanvasRights = this.wrapper.querySelectorAll('.' + CLASS_OFF_CANVAS_RIGHT);
			if (offCanvas) {
				if (offCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT)) {
					this.offCanvasLeft = offCanvas;
				} else if (offCanvas.classList.contains(CLASS_OFF_CANVAS_RIGHT)) {
					this.offCanvasRight = offCanvas;
				}
			} else {
				this.offCanvasRight = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT);
				this.offCanvasLeft = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT);
			}
			this.offCanvasRightWidth = this.offCanvasLeftWidth = 0;
			this.offCanvasLeftSlideIn = this.offCanvasRightSlideIn = false;
			if (this.offCanvasRight) {
				this.offCanvasRightWidth = this.offCanvasRight.offsetWidth;
				this.offCanvasRightSlideIn = this.slideIn && (this.offCanvasRight.parentNode === this.wrapper);
				//				this.offCanvasRight.classList.remove(CLASS_TRANSITIONING);
				//				this.offCanvasRight.classList.remove(CLASS_ACTIVE);
				//				this.offCanvasRight.setAttribute('style', '');
			}
			if (this.offCanvasLeft) {
				this.offCanvasLeftWidth = this.offCanvasLeft.offsetWidth;
				this.offCanvasLeftSlideIn = this.slideIn && (this.offCanvasLeft.parentNode === this.wrapper);
				//				this.offCanvasLeft.classList.remove(CLASS_TRANSITIONING);
				//				this.offCanvasLeft.classList.remove(CLASS_ACTIVE);
				//				this.offCanvasLeft.setAttribute('style', '');
			}
			this.backdrop = this.scroller.querySelector('.' + CLASS_ACTION_BACKDROP);

			this.options.dragThresholdX = this.options.dragThresholdX || 10;

			this.visible = false;
			this.startX = null;
			this.lastX = null;
			this.offsetX = null;
			this.lastTranslateX = null;
		},
		handleEvent: function(e) {
			switch (e.type) {
				case $.EVENT_START:
					e.target && !this._preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
					break;
				case 'webkitTransitionEnd': //鏈変釜bug闇€瑕佸鐞嗭紝闇€瑕佽€冭檻鍋囪娌℃湁瑙﹀彂webkitTransitionEnd鐨勬儏鍐�
					if (e.target === this.scroller) {
						this._dispatchEvent();
					}
					break;
				case 'drag':
					var detail = e.detail;
					if (!this.startX) {
						this.startX = detail.center.x;
						this.lastX = this.startX;
					} else {
						this.lastX = detail.center.x;
					}
					if (!this.isDragging && Math.abs(this.lastX - this.startX) > this.options.dragThresholdX && (detail.direction === 'left' || (detail.direction === 'right'))) {
						if (this.slideIn) {
							this.scroller = this.wrapper.querySelector(SELECTOR_INNER_WRAP);
							if (this.classList.contains(CLASS_ACTIVE)) {
								if (this.offCanvasRight && this.offCanvasRight.classList.contains(CLASS_ACTIVE)) {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								} else {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								}
							} else {
								if (detail.direction === 'left' && this.offCanvasRight) {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								} else if (detail.direction === 'right' && this.offCanvasLeft) {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.scroller = null;
								}
							}
						} else {
							if (this.classList.contains(CLASS_ACTIVE)) {
								if (detail.direction === 'left') {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								}
							} else {
								if (detail.direction === 'right') {
									this.offCanvas = this.offCanvasLeft;
									this.offCanvasWidth = this.offCanvasLeftWidth;
								} else {
									this.offCanvas = this.offCanvasRight;
									this.offCanvasWidth = this.offCanvasRightWidth;
								}
							}
						}
						if (this.offCanvas && this.scroller) {
							this.startX = this.lastX;
							this.isDragging = true;

							$.gestures.session.lockDirection = true; //閿佸畾鏂瑰悜
							$.gestures.session.startDirection = detail.direction;

							this.offCanvas.classList.remove(CLASS_TRANSITIONING);
							this.scroller.classList.remove(CLASS_TRANSITIONING);
							this.offsetX = this.getTranslateX();
							this._initOffCanvasVisible();
						}
					}
					if (this.isDragging) {
						this.updateTranslate(this.offsetX + (this.lastX - this.startX));
						detail.gesture.preventDefault();
						e.stopPropagation();
					}
					break;
				case 'dragend':
					if (this.isDragging) {
						var detail = e.detail;
						var direction = detail.direction;
						this.isDragging = false;
						this.offCanvas.classList.add(CLASS_TRANSITIONING);
						this.scroller.classList.add(CLASS_TRANSITIONING);
						var ratio = 0;
						var x = this.getTranslateX();
						if (!this.slideIn) {
							if (x >= 0) {
								ratio = (this.offCanvasLeftWidth && (x / this.offCanvasLeftWidth)) || 0;
							} else {
								ratio = (this.offCanvasRightWidth && (x / this.offCanvasRightWidth)) || 0;
							}
							if (ratio === 0) {
								this.openPercentage(0);
								this._dispatchEvent(); //姝ゅ涓嶈Е鍙憌ebkitTransitionEnd,鎵€浠ユ墜鍔╠ispatch
								return;
							}
							if (direction === 'right' && ratio >= 0 && (ratio >= 0.5 || detail.swipe)) { //鍙虫粦鎵撳紑
								this.openPercentage(100);
							} else if (direction === 'right' && ratio < 0 && (ratio > -0.5 || detail.swipe)) { //鍙虫粦鍏抽棴
								this.openPercentage(0);
							} else if (direction === 'right' && ratio > 0 && ratio < 0.5) { //鍙虫粦杩樺師鍏抽棴
								this.openPercentage(0);
							} else if (direction === 'right' && ratio < 0.5) { //鍙虫粦杩樺師鎵撳紑
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio <= 0 && (ratio <= -0.5 || detail.swipe)) { //宸︽粦鎵撳紑
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio > 0 && (ratio <= 0.5 || detail.swipe)) { //宸︽粦鍏抽棴
								this.openPercentage(0);
							} else if (direction === 'left' && ratio < 0 && ratio >= -0.5) { //宸︽粦杩樺師鍏抽棴
								this.openPercentage(0);
							} else if (direction === 'left' && ratio > 0.5) { //宸︽粦杩樺師鎵撳紑
								this.openPercentage(100);
							} else { //榛樿鍏抽棴
								this.openPercentage(0);
							}
							if (ratio === 1 || ratio === -1) { //姝ゅ涓嶈Е鍙憌ebkitTransitionEnd,鎵€浠ユ墜鍔╠ispatch
								this._dispatchEvent();
							}
						} else {
							if (x >= 0) {
								ratio = (this.offCanvasRightWidth && (x / this.offCanvasRightWidth)) || 0;
							} else {
								ratio = (this.offCanvasLeftWidth && (x / this.offCanvasLeftWidth)) || 0;
							}
							if (direction === 'right' && ratio <= 0 && (ratio >= -0.5 || detail.swipe)) { //鍙虫粦鎵撳紑
								this.openPercentage(100);
							} else if (direction === 'right' && ratio > 0 && (ratio >= 0.5 || detail.swipe)) { //鍙虫粦鍏抽棴
								this.openPercentage(0);
							} else if (direction === 'right' && ratio <= -0.5) { //鍙虫粦杩樺師鍏抽棴
								this.openPercentage(0);
							} else if (direction === 'right' && ratio > 0 && ratio <= 0.5) { //鍙虫粦杩樺師鎵撳紑
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio >= 0 && (ratio <= 0.5 || detail.swipe)) { //宸︽粦鎵撳紑
								this.openPercentage(-100);
							} else if (direction === 'left' && ratio < 0 && (ratio <= -0.5 || detail.swipe)) { //宸︽粦鍏抽棴
								this.openPercentage(0);
							} else if (direction === 'left' && ratio >= 0.5) { //宸︽粦杩樺師鍏抽棴
								this.openPercentage(0);
							} else if (direction === 'left' && ratio >= -0.5 && ratio < 0) { //宸︽粦杩樺師鎵撳紑
								this.openPercentage(100);
							} else {
								this.openPercentage(0);
							}
							if (ratio === 1 || ratio === -1 || ratio === 0) {
								this._dispatchEvent();
								return;
							}

						}
					}
					break;
			}
		},
		_dispatchEvent: function() {
			if (this.classList.contains(CLASS_ACTIVE)) {
				$.trigger(this.wrapper, 'shown', this);
			} else {
				$.trigger(this.wrapper, 'hidden', this);
			}
		},
		_initOffCanvasVisible: function() {
			if (!this.visible) {
				this.visible = true;
				if (this.offCanvasLeft) {
					this.offCanvasLeft.style.visibility = 'visible';
				}
				if (this.offCanvasRight) {
					this.offCanvasRight.style.visibility = 'visible';
				}
			}
		},
		initEvent: function() {
			var self = this;
			if (self.backdrop) {
				self.backdrop.addEventListener('tap', function(e) {
					self.close();
					e.detail.gesture.preventDefault();
				});
			}
			if (this.classList.contains('mui-draggable')) {
				this.wrapper.addEventListener($.EVENT_START, this); //涓存椂澶勭悊
				this.wrapper.addEventListener('drag', this);
				this.wrapper.addEventListener('dragend', this);
			}
			this.wrapper.addEventListener('webkitTransitionEnd', this);
		},
		openPercentage: function(percentage) {
			var p = percentage / 100;
			if (!this.slideIn) {
				if (this.offCanvasLeft && percentage >= 0) {
					this.updateTranslate(this.offCanvasLeftWidth * p);
					this.offCanvasLeft.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				} else if (this.offCanvasRight && percentage <= 0) {
					this.updateTranslate(this.offCanvasRightWidth * p);
					this.offCanvasRight.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				}
				this.classList[p !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
			} else {
				if (this.offCanvasLeft && percentage >= 0) {
					p = p === 0 ? -1 : 0;
					this.updateTranslate(this.offCanvasLeftWidth * p);
					this.offCanvasLeft.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				} else if (this.offCanvasRight && percentage <= 0) {
					p = p === 0 ? 1 : 0;
					this.updateTranslate(this.offCanvasRightWidth * p);
					this.offCanvasRight.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
				}
				this.classList[percentage !== 0 ? 'add' : 'remove'](CLASS_ACTIVE);
			}
		},
		updateTranslate: function(x) {
			if (x !== this.lastTranslateX) {
				if (!this.slideIn) {
					if ((!this.offCanvasLeft && x > 0) || (!this.offCanvasRight && x < 0)) {
						this.setTranslateX(0);
						return;
					}
					if (this.leftShowing && x > this.offCanvasLeftWidth) {
						this.setTranslateX(this.offCanvasLeftWidth);
						return;
					}
					if (this.rightShowing && x < -this.offCanvasRightWidth) {
						this.setTranslateX(-this.offCanvasRightWidth);
						return;
					}
					this.setTranslateX(x);
					if (x >= 0) {
						this.leftShowing = true;
						this.rightShowing = false;
						if (x > 0) {
							if (this.offCanvasLeft) {
								$.each(this.offCanvasLefts, function(index, offCanvas) {
									if (offCanvas === this.offCanvasLeft) {
										this.offCanvasLeft.style.zIndex = 0;
									} else {
										offCanvas.style.zIndex = -1;
									}
								}.bind(this));
							}
							if (this.offCanvasRight) {
								this.offCanvasRight.style.zIndex = -1;
							}
						}
					} else {
						this.rightShowing = true;
						this.leftShowing = false;
						if (this.offCanvasRight) {
							$.each(this.offCanvasRights, function(index, offCanvas) {
								if (offCanvas === this.offCanvasRight) {
									offCanvas.style.zIndex = 0;
								} else {
									offCanvas.style.zIndex = -1;
								}
							}.bind(this));
						}
						if (this.offCanvasLeft) {
							this.offCanvasLeft.style.zIndex = -1;
						}
					}
				} else {
					if (this.offCanvas.classList.contains(CLASS_OFF_CANVAS_RIGHT)) {
						if (x < 0) {
							this.setTranslateX(0);
							return;
						}
						if (x > this.offCanvasRightWidth) {
							this.setTranslateX(this.offCanvasRightWidth);
							return;
						}
					} else {
						if (x > 0) {
							this.setTranslateX(0);
							return;
						}
						if (x < -this.offCanvasLeftWidth) {
							this.setTranslateX(-this.offCanvasLeftWidth);
							return;
						}
					}
					this.setTranslateX(x);
				}
				this.lastTranslateX = x;
			}
		},
		setTranslateX: $.animationFrame(function(x) {
			if (this.scroller) {
				if (this.scalable && this.offCanvas.parentNode === this.wrapper) {
					var percent = Math.abs(x) / this.offCanvasWidth;
					var zoomOutScale = 1 - (1 - this.options.scale) * percent;
					var zoomInScale = this.options.scale + (1 - this.options.scale) * percent;
					var zoomOutOpacity = 1 - (1 - this.options.opacity) * percent;
					var zoomInOpacity = this.options.opacity + (1 - this.options.opacity) * percent;
					if (this.offCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT)) {
						this.offCanvas.style.webkitTransformOrigin = '-100%';
						this.scroller.style.webkitTransformOrigin = 'left';
					} else {
						this.offCanvas.style.webkitTransformOrigin = '200%';
						this.scroller.style.webkitTransformOrigin = 'right';
					}
					this.offCanvas.style.opacity = zoomInOpacity;
					this.offCanvas.style.webkitTransform = 'translate3d(0,0,0) scale(' + zoomInScale + ')';
					this.scroller.style.webkitTransform = 'translate3d(' + x + 'px,0,0) scale(' + zoomOutScale + ')';
				} else {
					if (this.slideIn) {
						this.offCanvas.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
					} else {
						this.scroller.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
					}
				}
			}
		}),
		getTranslateX: function() {
			if (this.offCanvas) {
				var scroller = this.slideIn ? this.offCanvas : this.scroller;
				var result = $.parseTranslateMatrix($.getStyles(scroller, 'webkitTransform'));
				return (result && result.x) || 0;
			}
			return 0;
		},
		isShown: function(direction) {
			var shown = false;
			if (!this.slideIn) {
				var x = this.getTranslateX();
				if (direction === 'right') {
					shown = this.classList.contains(CLASS_ACTIVE) && x < 0;
				} else if (direction === 'left') {
					shown = this.classList.contains(CLASS_ACTIVE) && x > 0;
				} else {
					shown = this.classList.contains(CLASS_ACTIVE) && x !== 0;
				}
			} else {
				if (direction === 'left') {
					shown = this.classList.contains(CLASS_ACTIVE) && this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE);
				} else if (direction === 'right') {
					shown = this.classList.contains(CLASS_ACTIVE) && this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE);
				} else {
					shown = this.classList.contains(CLASS_ACTIVE) && (this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE) || this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE));
				}
			}
			return shown;
		},
		close: function() {
			this._initOffCanvasVisible();
			this.offCanvas = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT + '.' + CLASS_ACTIVE) || this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_LEFT + '.' + CLASS_ACTIVE);
			this.offCanvasWidth = this.offCanvas.offsetWidth;
			if (this.scroller) {
				this.offCanvas.offsetHeight;
				this.offCanvas.classList.add(CLASS_TRANSITIONING);
				this.scroller.classList.add(CLASS_TRANSITIONING);
				this.openPercentage(0);
			}
		},
		show: function(direction) {
			this._initOffCanvasVisible();
			if (this.isShown(direction)) {
				return false;
			}
			if (!direction) {
				direction = this.wrapper.querySelector('.' + CLASS_OFF_CANVAS_RIGHT) ? 'right' : 'left';
			}
			if (direction === 'right') {
				this.offCanvas = this.offCanvasRight;
				this.offCanvasWidth = this.offCanvasRightWidth;
			} else {
				this.offCanvas = this.offCanvasLeft;
				this.offCanvasWidth = this.offCanvasLeftWidth;
			}
			if (this.scroller) {
				this.offCanvas.offsetHeight;
				this.offCanvas.classList.add(CLASS_TRANSITIONING);
				this.scroller.classList.add(CLASS_TRANSITIONING);
				this.openPercentage(direction === 'left' ? 100 : -100);
			}
			return true;
		},
		toggle: function(directionOrOffCanvas) {
			var direction = directionOrOffCanvas;
			if (directionOrOffCanvas && directionOrOffCanvas.classList) {
				direction = directionOrOffCanvas.classList.contains(CLASS_OFF_CANVAS_LEFT) ? 'left' : 'right';
				this.refresh(directionOrOffCanvas);
			}
			if (!this.show(direction)) {
				this.close();
			}
		}
	});

	//hash to offcanvas
	var findOffCanvasContainer = function(target) {
		parentNode = target.parentNode;
		if (parentNode) {
			if (parentNode.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
				return parentNode;
			} else {
				parentNode = parentNode.parentNode;
				if (parentNode.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
					return parentNode;
				}
			}
		}
	};
	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			var offcanvas = document.getElementById(target.hash.replace('#', ''));
			if (offcanvas) {
				var container = findOffCanvasContainer(offcanvas);
				if (container) {
					$.targets._container = container;
					return offcanvas;
				}
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	window.addEventListener('tap', function(e) {
		if (!$.targets.offcanvas) {
			return;
		}
		//TODO 姝ゅ绫诲瀷鐨勪唬鐮佸悗缁€冭檻缁熶竴浼樺寲(target鏈哄埗)锛岀幇鍦ㄧ殑瀹炵幇璐瑰姏涓嶈濂�
		var target = e.target;
		for (; target && target !== document; target = target.parentNode) {
			if (target.tagName === 'A' && target.hash && target.hash === ('#' + $.targets.offcanvas.id)) {
				e.detail && e.detail.gesture && e.detail.gesture.preventDefault(); //fixed hashchange
				$($.targets._container).offCanvas().toggle($.targets.offcanvas);
				$.targets.offcanvas = $.targets._container = null;
				break;
			}
		}
	});

	$.fn.offCanvas = function(options) {
		var offCanvasApis = [];
		this.each(function() {
			var offCanvasApi = null;
			var self = this;
			//hack old version
			if (!self.classList.contains(CLASS_OFF_CANVAS_WRAP)) {
				self = findOffCanvasContainer(self);
			}
			var id = self.getAttribute('data-offCanvas');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = offCanvasApi = new OffCanvas(self, options);
				self.setAttribute('data-offCanvas', id);
			} else {
				offCanvasApi = $.data[id];
			}
			if (options === 'show' || options === 'close' || options === 'toggle') {
				offCanvasApi.toggle();
			}
			offCanvasApis.push(offCanvasApi);
		});
		return offCanvasApis.length === 1 ? offCanvasApis[0] : offCanvasApis;
	};
	$.ready(function() {
		$('.mui-off-canvas-wrap').offCanvas();
	});
})(mui, window, document, 'offcanvas');
/**
 * actions
 * @param {type} $
 * @param {type} name
 * @returns {undefined}
 */
(function($, name) {
	var CLASS_ACTION = 'mui-action';

	var handle = function(event, target) {
		var className = target.className || '';
		if (typeof className !== 'string') { //svg className(SVGAnimatedString)
			className = '';
		}
		if (className && ~className.indexOf(CLASS_ACTION)) {
			if (target.classList.contains('mui-action-back')) {
				event.preventDefault();
			}
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 50,
		handle: handle,
		target: false,
		isContinue: true
	});

})(mui, 'action');
/**
 * Modals
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @returns {undefined}
 */
(function($, window, document, name) {
	var CLASS_MODAL = 'mui-modal';

	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			var modal = document.getElementById(target.hash.replace('#', ''));
			if (modal && modal.classList.contains(CLASS_MODAL)) {
				return modal;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 50,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	window.addEventListener('tap', function(event) {
		if ($.targets.modal) {
			event.detail.gesture.preventDefault(); //fixed hashchange
			$.targets.modal.classList.toggle('mui-active');
		}
	});
})(mui, window, document, 'modal');
/**
 * Popovers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} name
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name) {

	var CLASS_POPOVER = 'mui-popover';
	var CLASS_POPOVER_ARROW = 'mui-popover-arrow';
	var CLASS_ACTION_POPOVER = 'mui-popover-action';
	var CLASS_BACKDROP = 'mui-backdrop';
	var CLASS_BAR_POPOVER = 'mui-bar-popover';
	var CLASS_BAR_BACKDROP = 'mui-bar-backdrop';
	var CLASS_ACTION_BACKDROP = 'mui-backdrop-action';
	var CLASS_ACTIVE = 'mui-active';
	var CLASS_BOTTOM = 'mui-bottom';



	var handle = function(event, target) {
		if (target.tagName === 'A' && target.hash) {
			$.targets._popover = document.getElementById(target.hash.replace('#', ''));
			if ($.targets._popover && $.targets._popover.classList.contains(CLASS_POPOVER)) {
				return target;
			} else {
				$.targets._popover = null;
			}
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 60,
		handle: handle,
		target: false,
		isReset: false,
		isContinue: true
	});

	var onPopoverShown = function(e) {
		this.removeEventListener('webkitTransitionEnd', onPopoverShown);
		this.addEventListener($.EVENT_MOVE, $.preventDefault);
		$.trigger(this, 'shown', this);
	}
	var onPopoverHidden = function(e) {
		setStyle(this, 'none');
		this.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		this.removeEventListener($.EVENT_MOVE, $.preventDefault);
		$.trigger(this, 'hidden', this);
	};

	var backdrop = (function() {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function(e) {
			var popover = $.targets._popover;
			if (popover) {
				popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
				popover.classList.remove(CLASS_ACTIVE);
				removeBackdrop(popover);
			}
		});

		return element;
	}());
	var removeBackdropTimer;
	var removeBackdrop = function(popover) {
		backdrop.setAttribute('style', 'opacity:0');
		$.targets.popover = $.targets._popover = null; //reset
		removeBackdropTimer = $.later(function() {
			if (!popover.classList.contains(CLASS_ACTIVE) && backdrop.parentNode && backdrop.parentNode === document.body) {
				document.body.removeChild(backdrop);
			}
		}, 350);
	};
	window.addEventListener('tap', function(e) {
		if (!$.targets.popover) {
			return;
		}
		var toggle = false;
		var target = e.target;
		for (; target && target !== document; target = target.parentNode) {
			if (target === $.targets.popover) {
				toggle = true;
			}
		}
		if (toggle) {
			e.detail.gesture.preventDefault(); //fixed hashchange
			togglePopover($.targets._popover, $.targets.popover);
		}

	});

	var togglePopover = function(popover, anchor, state) {
		if ((state === 'show' && popover.classList.contains(CLASS_ACTIVE)) || (state === 'hide' && !popover.classList.contains(CLASS_ACTIVE))) {
			return;
		}
		removeBackdropTimer && removeBackdropTimer.cancel(); //鍙栨秷remove鐨則imer
		//remove涓€閬嶏紝浠ュ厤鏉ュ洖蹇€熷垏鎹紝瀵艰嚧webkitTransitionEnd涓嶈Е鍙戯紝鏃犳硶remove
		popover.removeEventListener('webkitTransitionEnd', onPopoverShown);
		popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		backdrop.classList.remove(CLASS_BAR_BACKDROP);
		backdrop.classList.remove(CLASS_ACTION_BACKDROP);
		var _popover = document.querySelector('.mui-popover.mui-active');
		if (_popover) {
			//			_popover.setAttribute('style', '');
			_popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
			_popover.classList.remove(CLASS_ACTIVE);
			//			_popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
			//鍚屼竴涓脊鍑哄垯鐩存帴杩斿洖锛岃В鍐冲悓涓€涓猵opover鐨則oggle
			if (popover === _popover) {
				removeBackdrop(_popover);
				return;
			}
		}
		var isActionSheet = false;
		if (popover.classList.contains(CLASS_BAR_POPOVER) || popover.classList.contains(CLASS_ACTION_POPOVER)) { //navBar
			if (popover.classList.contains(CLASS_ACTION_POPOVER)) { //action sheet popover
				isActionSheet = true;
				backdrop.classList.add(CLASS_ACTION_BACKDROP);
			} else { //bar popover
				backdrop.classList.add(CLASS_BAR_BACKDROP);
				//				if (anchor) {
				//					if (anchor.parentNode) {
				//						var offsetWidth = anchor.offsetWidth;
				//						var offsetLeft = anchor.offsetLeft;
				//						var innerWidth = window.innerWidth;
				//						popover.style.left = (Math.min(Math.max(offsetLeft, defaultPadding), innerWidth - offsetWidth - defaultPadding)) + "px";
				//					} else {
				//						//TODO anchor is position:{left,top,bottom,right}
				//					}
				//				}
			}
		}
		setStyle(popover, 'block'); //actionsheet transform
		popover.offsetHeight;
		popover.classList.add(CLASS_ACTIVE);
		backdrop.setAttribute('style', '');
		document.body.appendChild(backdrop);
		calPosition(popover, anchor, isActionSheet); //position
		backdrop.classList.add(CLASS_ACTIVE);
		popover.addEventListener('webkitTransitionEnd', onPopoverShown);
	};
	var setStyle = function(popover, display, top, left) {
		var style = popover.style;
		if (typeof display !== 'undefined')
			style.display = display;
		if (typeof top !== 'undefined')
			style.top = top + 'px';
		if (typeof left !== 'undefined')
			style.left = left + 'px';
	};
	var calPosition = function(popover, anchor, isActionSheet) {
		if (!popover || !anchor) {
			return;
		}

		if (isActionSheet) { //actionsheet
			setStyle(popover, 'block')
			return;
		}

		var wWidth = window.innerWidth;
		var wHeight = window.innerHeight;

		var pWidth = popover.offsetWidth;
		var pHeight = popover.offsetHeight;

		var aWidth = anchor.offsetWidth;
		var aHeight = anchor.offsetHeight;
		var offset = $.offset(anchor);

		var arrow = popover.querySelector('.' + CLASS_POPOVER_ARROW);
		if (!arrow) {
			arrow = document.createElement('div');
			arrow.className = CLASS_POPOVER_ARROW;
			popover.appendChild(arrow);
		}
		var arrowSize = arrow && arrow.offsetWidth / 2 || 0;



		var pTop = 0;
		var pLeft = 0;
		var diff = 0;
		var arrowLeft = 0;
		var defaultPadding = popover.classList.contains(CLASS_ACTION_POPOVER) ? 0 : 5;

		var position = 'top';
		if ((pHeight + arrowSize) < (offset.top - window.pageYOffset)) { //top
			pTop = offset.top - pHeight - arrowSize;
		} else if ((pHeight + arrowSize) < (wHeight - (offset.top - window.pageYOffset) - aHeight)) { //bottom
			position = 'bottom';
			pTop = offset.top + aHeight + arrowSize;
		} else { //middle
			position = 'middle';
			pTop = Math.max((wHeight - pHeight) / 2 + window.pageYOffset, 0);
			pLeft = Math.max((wWidth - pWidth) / 2 + window.pageXOffset, 0);
		}
		if (position === 'top' || position === 'bottom') {
			pLeft = aWidth / 2 + offset.left - pWidth / 2;
			diff = pLeft;
			if (pLeft < defaultPadding) pLeft = defaultPadding;
			if (pLeft + pWidth > wWidth) pLeft = wWidth - pWidth - defaultPadding;

			if (arrow) {
				if (position === 'top') {
					arrow.classList.add(CLASS_BOTTOM);
				} else {
					arrow.classList.remove(CLASS_BOTTOM);
				}
				diff = diff - pLeft;
				arrowLeft = (pWidth / 2 - arrowSize / 2 + diff);
				arrowLeft = Math.max(Math.min(arrowLeft, pWidth - arrowSize * 2 - 6), 6);
				arrow.setAttribute('style', 'left:' + arrowLeft + 'px');
			}
		} else if (position === 'middle') {
			arrow.setAttribute('style', 'display:none');
		}
		setStyle(popover, 'block', pTop, pLeft);
	};

	$.createMask = function(callback) {
		var element = document.createElement('div');
		element.classList.add(CLASS_BACKDROP);
		element.addEventListener($.EVENT_MOVE, $.preventDefault);
		element.addEventListener('tap', function() {
			mask.close();
		});
		var mask = [element];
		mask._show = false;
		mask.show = function() {
			mask._show = true;
			element.setAttribute('style', 'opacity:1');
			document.body.appendChild(element);
			return mask;
		};
		mask._remove = function() {
			if (mask._show) {
				mask._show = false;
				element.setAttribute('style', 'opacity:0');
				$.later(function() {
					var body = document.body;
					element.parentNode === body && body.removeChild(element);
				}, 350);
			}
			return mask;
		};
		mask.close = function() {
			if (callback) {
				if (callback() !== false) {
					mask._remove();
				}
			} else {
				mask._remove();
			}
		};
		return mask;
	};
	$.fn.popover = function() {
		var args = arguments;
		this.each(function() {
			$.targets._popover = this;
			if (args[0] === 'show' || args[0] === 'hide' || args[0] === 'toggle') {
				togglePopover(this, args[1], args[0]);
			}
		});
	};

})(mui, window, document, 'popover');
/**
 * segmented-controllers
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @param {type} undefined
 * @returns {undefined}
 */
(function($, window, document, name, undefined) {

    var CLASS_CONTROL_ITEM = 'mui-control-item';
    var CLASS_SEGMENTED_CONTROL = 'mui-segmented-control';
    var CLASS_SEGMENTED_CONTROL_VERTICAL = 'mui-segmented-control-vertical';
    var CLASS_CONTROL_CONTENT = 'mui-control-content';
    var CLASS_TAB_BAR = 'mui-bar-tab';
    var CLASS_TAB_ITEM = 'mui-tab-item';
    var CLASS_SLIDER_ITEM = 'mui-slider-item';

   var handle = function(event, target) {
        if (target.classList && (target.classList.contains(CLASS_CONTROL_ITEM) || target.classList.contains(CLASS_TAB_ITEM))) {
            if (target.parentNode && target.parentNode.classList && target.parentNode.classList.contains(CLASS_SEGMENTED_CONTROL_VERTICAL)) {
                //vertical 濡傛灉preventDefault浼氬鑷存棤娉曟粴鍔�
            } else {

                    event.preventDefault();      
                    // if(target.tagName == 'A') {
                    //     // fixed 搴曢儴閫夐」鍗ref 鏃犳硶璺宠浆 && stop hash change
                    //     var curr_href = location.hostname + location.pathname,
                    //         target_href = target.hostname + target.pathname;
                   
                    //     if (curr_href == target_href && target.hash !== "") {
                    //         event.preventDefault();
                    //         return target;
                    //     }else{
                    //             return false
                    //     }
                    // }
            }
            //          if (target.hash) {
            return target;
            //          }
        }
        return false;
    };

    $.registerTarget({
        name: name,
        index: 80,
        handle: handle,
        target: false
    });

    window.addEventListener('tap', function(e) {

        var targetTab = $.targets.tab;
        if (!targetTab) {
            return;
        }
        var activeTab;
        var activeBodies;
        var targetBody;
        var className = 'mui-active';
        var classSelector = '.' + className;
        var segmentedControl = targetTab.parentNode;

        for (; segmentedControl && segmentedControl !== document; segmentedControl = segmentedControl.parentNode) {
            if (segmentedControl.classList.contains(CLASS_SEGMENTED_CONTROL)) {
                activeTab = segmentedControl.querySelector(classSelector + '.' + CLASS_CONTROL_ITEM);
                break;
            } else if (segmentedControl.classList.contains(CLASS_TAB_BAR)) {
                activeTab = segmentedControl.querySelector(classSelector + '.' + CLASS_TAB_ITEM);
            }
        }

        if (activeTab) {
            activeTab.classList.remove(className);
        }

        var isLastActive = targetTab === activeTab;
        if (targetTab) {
            targetTab.classList.add(className);
        }

        if (!targetTab.hash) {
            return;
        }
        targetBody = document.getElementById(targetTab.hash.replace('#', ''));

        if (!targetBody) {
            return;
        }
        if (!targetBody.classList.contains(CLASS_CONTROL_CONTENT)) { //tab bar popover
            targetTab.classList[isLastActive ? 'remove' : 'add'](className);
            return;
        }
        if (isLastActive) { //same
            return;
        }
        var parentNode = targetBody.parentNode;
        activeBodies = parentNode.querySelectorAll('.' + CLASS_CONTROL_CONTENT + classSelector);
        for (var i = 0; i < activeBodies.length; i++) {
            var activeBody = activeBodies[i];
            activeBody.parentNode === parentNode && activeBody.classList.remove(className);
        }

        targetBody.classList.add(className);

        var contents = [];
        var _contents = parentNode.querySelectorAll('.' + CLASS_CONTROL_CONTENT);
        for (var i = 0; i < _contents.length; i++) { //鏌ユ壘鐩村睘瀛愯妭鐐�
            _contents[i].parentNode === parentNode && (contents.push(_contents[i]));
        }
        $.trigger(targetBody, $.eventName('shown', name), {
            tabNumber: Array.prototype.indexOf.call(contents, targetBody)
        });
        e.detail && e.detail.gesture.preventDefault(); //fixed hashchange
    });

})(mui, window, document, 'tab');
/**
 * Toggles switch
 * @param {type} $
 * @param {type} window
 * @param {type} name
 * @returns {undefined}
 */
(function($, window, name) {

	var CLASS_SWITCH = 'mui-switch';
	var CLASS_SWITCH_HANDLE = 'mui-switch-handle';
	var CLASS_ACTIVE = 'mui-active';
	var CLASS_DRAGGING = 'mui-dragging';

	var CLASS_DISABLED = 'mui-disabled';

	var SELECTOR_SWITCH_HANDLE = '.' + CLASS_SWITCH_HANDLE;

	var handle = function(event, target) {
		if (target.classList && target.classList.contains(CLASS_SWITCH)) {
			return target;
		}
		return false;
	};

	$.registerTarget({
		name: name,
		index: 100,
		handle: handle,
		target: false
	});


	var Toggle = function(element) {
		this.element = element;
		this.classList = this.element.classList;
		this.handle = this.element.querySelector(SELECTOR_SWITCH_HANDLE);
		this.init();
		this.initEvent();
	};
	Toggle.prototype.init = function() {
		this.toggleWidth = this.element.offsetWidth;
		this.handleWidth = this.handle.offsetWidth;
		this.handleX = this.toggleWidth - this.handleWidth - 3;
	};
	Toggle.prototype.initEvent = function() {
		this.element.addEventListener($.EVENT_START, this);
		this.element.addEventListener('drag', this);
		this.element.addEventListener('swiperight', this);
		this.element.addEventListener($.EVENT_END, this);
		this.element.addEventListener($.EVENT_CANCEL, this);

	};
	Toggle.prototype.handleEvent = function(e) {
		if (this.classList.contains(CLASS_DISABLED)) {
			return;
		}
		switch (e.type) {
			case $.EVENT_START:
				this.start(e);
				break;
			case 'drag':
				this.drag(e);
				break;
			case 'swiperight':
				this.swiperight();
				break;
			case $.EVENT_END:
			case $.EVENT_CANCEL:
				this.end(e);
				break;
		}
	};
	Toggle.prototype.start = function(e) {
		this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '.2s';
		this.classList.add(CLASS_DRAGGING);
		if (this.toggleWidth === 0 || this.handleWidth === 0) { //褰搒witch澶勪簬闅愯棌鐘舵€佹椂锛寃idth涓�0锛岄渶瑕侀噸鏂板垵濮嬪寲
			this.init();
		}
	};
	Toggle.prototype.drag = function(e) {
		var detail = e.detail;
		if (!this.isDragging) {
			if (detail.direction === 'left' || detail.direction === 'right') {
				this.isDragging = true;
				this.lastChanged = undefined;
				this.initialState = this.classList.contains(CLASS_ACTIVE);
			}
		}
		if (this.isDragging) {
			this.setTranslateX(detail.deltaX);
			e.stopPropagation();
			detail.gesture.preventDefault();
		}
	};
	Toggle.prototype.swiperight = function(e) {
		if (this.isDragging) {
			e.stopPropagation();
		}
	};
	Toggle.prototype.end = function(e) {
		this.classList.remove(CLASS_DRAGGING);
		if (this.isDragging) {
			this.isDragging = false;
			e.stopPropagation();
			$.trigger(this.element, 'toggle', {
				isActive: this.classList.contains(CLASS_ACTIVE)
			});
		} else {
			this.toggle();
		}
	};
	Toggle.prototype.toggle = function(animate) {
		var classList = this.classList;
		if (animate === false) {
			this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '0s';
		} else {
			this.handle.style.webkitTransitionDuration = this.element.style.webkitTransitionDuration = '.2s';
		}
		if (classList.contains(CLASS_ACTIVE)) {
			classList.remove(CLASS_ACTIVE);
			this.handle.style.webkitTransform = 'translate(0,0)';
		} else {
			classList.add(CLASS_ACTIVE);
			this.handle.style.webkitTransform = 'translate(' + this.handleX + 'px,0)';
		}
		$.trigger(this.element, 'toggle', {
			isActive: this.classList.contains(CLASS_ACTIVE)
		});
	};
	Toggle.prototype.setTranslateX = $.animationFrame(function(x) {
		if (!this.isDragging) {
			return;
		}
		var isChanged = false;
		if ((this.initialState && -x > (this.handleX / 2)) || (!this.initialState && x > (this.handleX / 2))) {
			isChanged = true;
		}
		if (this.lastChanged !== isChanged) {
			if (isChanged) {
				this.handle.style.webkitTransform = 'translate(' + (this.initialState ? 0 : this.handleX) + 'px,0)';
				this.classList[this.initialState ? 'remove' : 'add'](CLASS_ACTIVE);
			} else {
				this.handle.style.webkitTransform = 'translate(' + (this.initialState ? this.handleX : 0) + 'px,0)';
				this.classList[this.initialState ? 'add' : 'remove'](CLASS_ACTIVE);
			}
			this.lastChanged = isChanged;
		}

	});

	$.fn['switch'] = function(options) {
		var switchApis = [];
		this.each(function() {
			var switchApi = null;
			var id = this.getAttribute('data-switch');
			if (!id) {
				id = ++$.uuid;
				$.data[id] = new Toggle(this);
				this.setAttribute('data-switch', id);
			} else {
				switchApi = $.data[id];
			}
			switchApis.push(switchApi);
		});
		return switchApis.length > 1 ? switchApis : switchApis[0];
	};
	$.ready(function() {
		$('.' + CLASS_SWITCH)['switch']();
	});
})(mui, window, 'toggle');
/**
 * Tableviews
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {

	var CLASS_ACTIVE = 'mui-active';
	var CLASS_SELECTED = 'mui-selected';
	var CLASS_GRID_VIEW = 'mui-grid-view';
	var CLASS_RADIO_VIEW = 'mui-table-view-radio';
	var CLASS_TABLE_VIEW_CELL = 'mui-table-view-cell';
	var CLASS_COLLAPSE_CONTENT = 'mui-collapse-content';
	var CLASS_DISABLED = 'mui-disabled';
	var CLASS_TOGGLE = 'mui-switch';
	var CLASS_BTN = 'mui-btn';

	var CLASS_SLIDER_HANDLE = 'mui-slider-handle';
	var CLASS_SLIDER_LEFT = 'mui-slider-left';
	var CLASS_SLIDER_RIGHT = 'mui-slider-right';
	var CLASS_TRANSITIONING = 'mui-transitioning';


	var SELECTOR_SLIDER_HANDLE = '.' + CLASS_SLIDER_HANDLE;
	var SELECTOR_SLIDER_LEFT = '.' + CLASS_SLIDER_LEFT;
	var SELECTOR_SLIDER_RIGHT = '.' + CLASS_SLIDER_RIGHT;
	var SELECTOR_SELECTED = '.' + CLASS_SELECTED;
	var SELECTOR_BUTTON = '.' + CLASS_BTN;
	var overFactor = 0.8;
	var cell, a;

	var isMoved = isOpened = openedActions = progress = false;
	var sliderHandle = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = false;
	var timer = translateX = lastTranslateX = sliderActionLeftWidth = sliderActionRightWidth = 0;



	var toggleActive = function(isActive) {
		if (isActive) {
			if (a) {
				a.classList.add(CLASS_ACTIVE);
			} else if (cell) {
				cell.classList.add(CLASS_ACTIVE);
			}
		} else {
			timer && timer.cancel();
			if (a) {
				a.classList.remove(CLASS_ACTIVE);
			} else if (cell) {
				cell.classList.remove(CLASS_ACTIVE);
			}
		}
	};

	var updateTranslate = function() {
		if (translateX !== lastTranslateX) {
			if (buttonsRight && buttonsRight.length > 0) {
				progress = translateX / sliderActionRightWidth;
				if (translateX < -sliderActionRightWidth) {
					translateX = -sliderActionRightWidth - Math.pow(-translateX - sliderActionRightWidth, overFactor);
				}
				for (var i = 0, len = buttonsRight.length; i < len; i++) {
					var buttonRight = buttonsRight[i];
					if (typeof buttonRight._buttonOffset === 'undefined') {
						buttonRight._buttonOffset = buttonRight.offsetLeft;
					}
					buttonOffset = buttonRight._buttonOffset;
					setTranslate(buttonRight, (translateX - buttonOffset * (1 + Math.max(progress, -1))));
				}
			}
			if (buttonsLeft && buttonsLeft.length > 0) {
				progress = translateX / sliderActionLeftWidth;
				if (translateX > sliderActionLeftWidth) {
					translateX = sliderActionLeftWidth + Math.pow(translateX - sliderActionLeftWidth, overFactor);
				}
				for (var i = 0, len = buttonsLeft.length; i < len; i++) {
					var buttonLeft = buttonsLeft[i];
					if (typeof buttonLeft._buttonOffset === 'undefined') {
						buttonLeft._buttonOffset = sliderActionLeftWidth - buttonLeft.offsetLeft - buttonLeft.offsetWidth;
					}
					buttonOffset = buttonLeft._buttonOffset;
					if (buttonsLeft.length > 1) {
						buttonLeft.style.zIndex = buttonsLeft.length - i;
					}
					setTranslate(buttonLeft, (translateX + buttonOffset * (1 - Math.min(progress, 1))));
				}
			}
			setTranslate(sliderHandle, translateX);
			lastTranslateX = translateX;
		}
		sliderRequestAnimationFrame = requestAnimationFrame(function() {
			updateTranslate();
		});
	};
	var setTranslate = function(element, x) {
		if (element) {
			element.style.webkitTransform = 'translate(' + x + 'px,0)';
		}
	};

	window.addEventListener($.EVENT_START, function(event) {
		if (cell) {
			toggleActive(false);
		}
		cell = a = false;
		isMoved = isOpened = openedActions = false;
		var target = event.target;
		var isDisabled = false;
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList) {
				var classList = target.classList;
				if ((target.tagName === 'INPUT' && target.type !== 'radio' && target.type !== 'checkbox') || target.tagName === 'BUTTON' || classList.contains(CLASS_TOGGLE) || classList.contains(CLASS_BTN) || classList.contains(CLASS_DISABLED)) {
					isDisabled = true;
				}
				if (classList.contains(CLASS_COLLAPSE_CONTENT)) { //collapse content
					break;
				}
				if (classList.contains(CLASS_TABLE_VIEW_CELL)) {
					cell = target;
					//TODO swipe to delete close
					var selected = cell.parentNode.querySelector(SELECTOR_SELECTED);
					if (!cell.parentNode.classList.contains(CLASS_RADIO_VIEW) && selected && selected !== cell) {
						$.swipeoutClose(selected);
						cell = isDisabled = false;
						return;
					}
					if (!cell.parentNode.classList.contains(CLASS_GRID_VIEW)) {
						var link = cell.querySelector('a');
						if (link && link.parentNode === cell) { //li>a
							a = link;
						}
					}
					var handle = cell.querySelector(SELECTOR_SLIDER_HANDLE);
					if (handle) {
						toggleEvents(cell);
						event.stopPropagation();
					}
					if (!isDisabled) {
						if (handle) {
							if (timer) {
								timer.cancel();
							}
							timer = $.later(function() {
								toggleActive(true);
							}, 100);
						} else {
							toggleActive(true);
						}
					}
					break;
				}
			}
		}
	});
	window.addEventListener($.EVENT_MOVE, function(event) {
		toggleActive(false);
	});

	var handleEvent = {
		handleEvent: function(event) {
			switch (event.type) {
				case 'drag':
					this.drag(event);
					break;
				case 'dragend':
					this.dragend(event);
					break;
				case 'flick':
					this.flick(event);
					break;
				case 'swiperight':
					this.swiperight(event);
					break;
				case 'swipeleft':
					this.swipeleft(event);
					break;
			}
		},
		drag: function(event) {
			if (!cell) {
				return;
			}
			if (!isMoved) { //init
				sliderHandle = sliderActionLeft = sliderActionRight = buttonsLeft = buttonsRight = sliderDirection = sliderRequestAnimationFrame = false;
				sliderHandle = cell.querySelector(SELECTOR_SLIDER_HANDLE);
				if (sliderHandle) {
					sliderActionLeft = cell.querySelector(SELECTOR_SLIDER_LEFT);
					sliderActionRight = cell.querySelector(SELECTOR_SLIDER_RIGHT);
					if (sliderActionLeft) {
						sliderActionLeftWidth = sliderActionLeft.offsetWidth;
						buttonsLeft = sliderActionLeft.querySelectorAll(SELECTOR_BUTTON);
					}
					if (sliderActionRight) {
						sliderActionRightWidth = sliderActionRight.offsetWidth;
						buttonsRight = sliderActionRight.querySelectorAll(SELECTOR_BUTTON);
					}
					cell.classList.remove(CLASS_TRANSITIONING);
					isOpened = cell.classList.contains(CLASS_SELECTED);
					if (isOpened) {
						openedActions = cell.querySelector(SELECTOR_SLIDER_LEFT + SELECTOR_SELECTED) ? 'left' : 'right';
					}
				}
			}
			var detail = event.detail;
			var direction = detail.direction;
			var angle = detail.angle;
			if (direction === 'left' && (angle > 150 || angle < -150)) {
				if (buttonsRight || (buttonsLeft && isOpened)) { //瀛樺湪鍙充晶鎸夐挳鎴栧瓨鍦ㄥ乏渚ф寜閽笖鏄凡鎵撳紑鐘舵€�
					isMoved = true;
				}
			} else if (direction === 'right' && (angle > -30 && angle < 30)) {
				if (buttonsLeft || (buttonsRight && isOpened)) { //瀛樺湪宸︿晶鎸夐挳鎴栧瓨鍦ㄥ彸渚ф寜閽笖鏄凡鎵撳紑鐘舵€�
					isMoved = true;
				}
			}
			if (isMoved) {
				event.stopPropagation();
				event.detail.gesture.preventDefault();
				var translate = event.detail.deltaX;
				if (isOpened) {
					if (openedActions === 'right') {
						translate = translate - sliderActionRightWidth;
					} else {
						translate = translate + sliderActionLeftWidth;
					}
				}
				if ((translate > 0 && !buttonsLeft) || (translate < 0 && !buttonsRight)) {
					if (!isOpened) {
						return;
					}
					translate = 0;
				}
				if (translate < 0) {
					sliderDirection = 'toLeft';
				} else if (translate > 0) {
					sliderDirection = 'toRight';
				} else {
					if (!sliderDirection) {
						sliderDirection = 'toLeft';
					}
				}
				if (!sliderRequestAnimationFrame) {
					updateTranslate();
				}
				translateX = translate;
			}
		},
		flick: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		swipeleft: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		swiperight: function(event) {
			if (isMoved) {
				event.stopPropagation();
			}
		},
		dragend: function(event) {
			if (!isMoved) {
				return;
			}
			event.stopPropagation();
			if (sliderRequestAnimationFrame) {
				cancelAnimationFrame(sliderRequestAnimationFrame);
				sliderRequestAnimationFrame = null;
			}
			var detail = event.detail;
			isMoved = false;
			var action = 'close';
			var actionsWidth = sliderDirection === 'toLeft' ? sliderActionRightWidth : sliderActionLeftWidth;
			var isToggle = detail.swipe || (Math.abs(translateX) > actionsWidth / 2);
			if (isToggle) {
				if (!isOpened) {
					action = 'open';
				} else if (detail.direction === 'left' && openedActions === 'right') {
					action = 'open';
				} else if (detail.direction === 'right' && openedActions === 'left') {
					action = 'open';
				}

			}
			cell.classList.add(CLASS_TRANSITIONING);
			var buttons;
			if (action === 'open') {
				var newTranslate = sliderDirection === 'toLeft' ? -actionsWidth : actionsWidth;
				setTranslate(sliderHandle, newTranslate);
				buttons = sliderDirection === 'toLeft' ? buttonsRight : buttonsLeft;
				if (typeof buttons !== 'undefined') {
					var button = null;
					for (var i = 0; i < buttons.length; i++) {
						button = buttons[i];
						setTranslate(button, newTranslate);
					}
					button.parentNode.classList.add(CLASS_SELECTED);
					cell.classList.add(CLASS_SELECTED);
					if (!isOpened) {
						$.trigger(cell, sliderDirection === 'toLeft' ? 'slideleft' : 'slideright');
					}
				}
			} else {
				setTranslate(sliderHandle, 0);
				sliderActionLeft && sliderActionLeft.classList.remove(CLASS_SELECTED);
				sliderActionRight && sliderActionRight.classList.remove(CLASS_SELECTED);
				cell.classList.remove(CLASS_SELECTED);
			}
			var buttonOffset;
			if (buttonsLeft && buttonsLeft.length > 0 && buttonsLeft !== buttons) {
				for (var i = 0, len = buttonsLeft.length; i < len; i++) {
					var buttonLeft = buttonsLeft[i];
					buttonOffset = buttonLeft._buttonOffset;
					if (typeof buttonOffset === 'undefined') {
						buttonLeft._buttonOffset = sliderActionLeftWidth - buttonLeft.offsetLeft - buttonLeft.offsetWidth;
					}
					setTranslate(buttonLeft, buttonOffset);
				}
			}
			if (buttonsRight && buttonsRight.length > 0 && buttonsRight !== buttons) {
				for (var i = 0, len = buttonsRight.length; i < len; i++) {
					var buttonRight = buttonsRight[i];
					buttonOffset = buttonRight._buttonOffset;
					if (typeof buttonOffset === 'undefined') {
						buttonRight._buttonOffset = buttonRight.offsetLeft;
					}
					setTranslate(buttonRight, -buttonOffset);
				}
			}
		}
	};

	function toggleEvents(element, isRemove) {
		var method = !!isRemove ? 'removeEventListener' : 'addEventListener';
		element[method]('drag', handleEvent);
		element[method]('dragend', handleEvent);
		element[method]('swiperight', handleEvent);
		element[method]('swipeleft', handleEvent);
		element[method]('flick', handleEvent);
	};
	/**
	 * 鎵撳紑婊戝姩鑿滃崟
	 * @param {Object} el
	 * @param {Object} direction
	 */
	$.swipeoutOpen = function(el, direction) {
		if (!el) return;
		var classList = el.classList;
		if (classList.contains(CLASS_SELECTED)) return;
		if (!direction) {
			if (el.querySelector(SELECTOR_SLIDER_RIGHT)) {
				direction = 'right';
			} else {
				direction = 'left';
			}
		}
		var swipeoutAction = el.querySelector($.classSelector(".slider-" + direction));
		if (!swipeoutAction) return;
		swipeoutAction.classList.add(CLASS_SELECTED);
		classList.add(CLASS_SELECTED);
		classList.remove(CLASS_TRANSITIONING);
		var buttons = swipeoutAction.querySelectorAll(SELECTOR_BUTTON);
		var swipeoutWidth = swipeoutAction.offsetWidth;
		var translate = (direction === 'right') ? -swipeoutWidth : swipeoutWidth;
		var length = buttons.length;
		var button;
		for (var i = 0; i < length; i++) {
			button = buttons[i];
			if (direction === 'right') {
				setTranslate(button, -button.offsetLeft);
			} else {
				setTranslate(button, (swipeoutWidth - button.offsetWidth - button.offsetLeft));
			}
		}
		classList.add(CLASS_TRANSITIONING);
		for (var i = 0; i < length; i++) {
			setTranslate(buttons[i], translate);
		}
		setTranslate(el.querySelector(SELECTOR_SLIDER_HANDLE), translate);
	};
	/**
	 * 鍏抽棴婊戝姩鑿滃崟
	 * @param {Object} el
	 */
	$.swipeoutClose = function(el) {
		if (!el) return;
		var classList = el.classList;
		if (!classList.contains(CLASS_SELECTED)) return;
		var direction = el.querySelector(SELECTOR_SLIDER_RIGHT + SELECTOR_SELECTED) ? 'right' : 'left';
		var swipeoutAction = el.querySelector($.classSelector(".slider-" + direction));
		if (!swipeoutAction) return;
		swipeoutAction.classList.remove(CLASS_SELECTED);
		classList.remove(CLASS_SELECTED);
		classList.add(CLASS_TRANSITIONING);
		var buttons = swipeoutAction.querySelectorAll(SELECTOR_BUTTON);
		var swipeoutWidth = swipeoutAction.offsetWidth;
		var length = buttons.length;
		var button;
		setTranslate(el.querySelector(SELECTOR_SLIDER_HANDLE), 0);
		for (var i = 0; i < length; i++) {
			button = buttons[i];
			if (direction === 'right') {
				setTranslate(button, (-button.offsetLeft));
			} else {
				setTranslate(button, (swipeoutWidth - button.offsetWidth - button.offsetLeft));
			}
		}
	};

	window.addEventListener($.EVENT_END, function(event) { //浣跨敤touchend鏉ュ彇娑堥珮浜紝閬垮厤涓€娆＄偣鍑绘棦涓嶈Е鍙憈ap锛宒oubletap锛宭ongtap鐨勪簨浠�
		if (!cell) {
			return;
		}
		toggleActive(false);
		sliderHandle && toggleEvents(cell, true);
	});
	window.addEventListener($.EVENT_CANCEL, function(event) { //浣跨敤touchcancel鏉ュ彇娑堥珮浜紝閬垮厤涓€娆＄偣鍑绘棦涓嶈Е鍙憈ap锛宒oubletap锛宭ongtap鐨勪簨浠�
		if (!cell) {
			return;
		}
		toggleActive(false);
		sliderHandle && toggleEvents(cell, true);
	});
	var radioOrCheckboxClick = function(event) {
		var type = event.target && event.target.type || '';
		if (type === 'radio' || type === 'checkbox') {
			return;
		}
		var classList = cell.classList;
		if (classList.contains('mui-radio')) {
			var input = cell.querySelector('input[type=radio]');
			if (input) {
				//				input.click();
				if (!input.disabled && !input.readOnly) {
					input.checked = !input.checked;
					$.trigger(input, 'change');
				}
			}
		} else if (classList.contains('mui-checkbox')) {
			var input = cell.querySelector('input[type=checkbox]');
			if (input) {
				//				input.click();
				if (!input.disabled && !input.readOnly) {
					input.checked = !input.checked;
					$.trigger(input, 'change');
				}
			}
		}
	};
	//fixed hashchange(android)
	window.addEventListener($.EVENT_CLICK, function(e) {
		if (cell && cell.classList.contains('mui-collapse')) {
			e.preventDefault();
		}
	});
	window.addEventListener('doubletap', function(event) {
		if (cell) {
			radioOrCheckboxClick(event);
		}
	});
	var preventDefaultException = /^(INPUT|TEXTAREA|BUTTON|SELECT)$/;
	window.addEventListener('tap', function(event) {
		if (!cell) {
			return;
		}
		var isExpand = false;
		var classList = cell.classList;
		var ul = cell.parentNode;
		if (ul && ul.classList.contains(CLASS_RADIO_VIEW)) {
			if (classList.contains(CLASS_SELECTED)) {
				return;
			}
			var selected = ul.querySelector('li' + SELECTOR_SELECTED);
			if (selected) {
				selected.classList.remove(CLASS_SELECTED);
			}
			classList.add(CLASS_SELECTED);
			$.trigger(cell, 'selected', {
				el: cell
			});
			return;
		}
		if (classList.contains('mui-collapse') && !cell.parentNode.classList.contains('mui-unfold')) {
			if (!preventDefaultException.test(event.target.tagName)) {
				event.detail.gesture.preventDefault();
			}

			if (!classList.contains(CLASS_ACTIVE)) { //灞曞紑鏃�,闇€瑕佹敹缂╁叾浠栧悓绫�
				var collapse = cell.parentNode.querySelector('.mui-collapse.mui-active');
				if (collapse) {
					collapse.classList.remove(CLASS_ACTIVE);
				}
				isExpand = true;
			}
			classList.toggle(CLASS_ACTIVE);
			if (isExpand) {
				//瑙﹀彂灞曞紑浜嬩欢
				$.trigger(cell, 'expand');

				//scroll
				//鏆備笉婊氬姩
				// var offsetTop = $.offset(cell).top;
				// var scrollTop = document.body.scrollTop;
				// var height = window.innerHeight;
				// var offsetHeight = cell.offsetHeight;
				// var cellHeight = (offsetTop - scrollTop + offsetHeight);
				// if (offsetHeight > height) {
				// 	$.scrollTo(offsetTop, 300);
				// } else if (cellHeight > height) {
				// 	$.scrollTo(cellHeight - height + scrollTop, 300);
				// }
			}
		} else {
			radioOrCheckboxClick(event);
		}
	});
})(mui, window, document);
(function($, window) {
	/**
	 * 璀﹀憡娑堟伅妗�
	 */
	$.alert = function(message, title, btnValue, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {
				if (typeof title === 'function') {
					callback = title;
					title = null;
					btnValue = '纭畾';
				} else if (typeof btnValue === 'function') {
					callback = btnValue;
					btnValue = null;
				}
				$.plusReady(function() {
					plus.nativeUI.alert(message, callback, title, btnValue);
				});
			}

		} else {
			//TODO H5鐗堟湰
			window.alert(message);
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 纭娑堟伅妗�
	 */
	$.confirm = function(message, title, btnArray, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {
				if (typeof title === 'function') {
					callback = title;
					title = null;
					btnArray = null;
				} else if (typeof btnArray === 'function') {
					callback = btnArray;
					btnArray = null;
				}
				$.plusReady(function() {
					plus.nativeUI.confirm(message, callback, title, btnArray);
				});
			}

		} else {
			//H5鐗堟湰锛�0涓虹‘璁わ紝1涓哄彇娑�
			if (window.confirm(message)) {
				callback({
					index: 0
				});
			} else {
				callback({
					index: 1
				});
			}
		}
	};

})(mui, window);
(function($, window) {
	/**
	 * 杈撳叆瀵硅瘽妗�
	 */
	$.prompt = function(text, defaultText, title, btnArray, callback) {
		if ($.os.plus) {
			if (typeof message === 'undefined') {
				return;
			} else {

				if (typeof defaultText === 'function') {
					callback = defaultText;
					defaultText = null;
					title = null;
					btnArray = null;
				} else if (typeof title === 'function') {
					callback = title;
					title = null;
					btnArray = null;
				} else if (typeof btnArray === 'function') {
					callback = btnArray;
					btnArray = null;
				}
				$.plusReady(function() {
					plus.nativeUI.prompt(text, callback, title, defaultText, btnArray);
				});
			}

		} else {
			//H5鐗堟湰(纭index涓�0锛屽彇娑坕ndex涓�1)
			var result = window.prompt(text);
			if (result) {
				callback({
					index: 0,
					value: result
				});
			} else {
				callback({
					index: 1,
					value: ''
				});
			}
		}
	};

})(mui, window);
(function($, window) {
	var CLASS_ACTIVE = 'mui-active';
	/**
	 * 鑷姩娑堝け鎻愮ず妗�
	 */
	$.toast = function(message,options) {
		var durations = {
		    'long': 3500,
		    'short': 2000
		};

		//璁＄畻鏄剧ず鏃堕棿
		 options = $.extend({
	        duration: 'short'
	    }, options || {});


		if ($.os.plus && options.type !== 'div') {
			//榛樿鏄剧ず鍦ㄥ簳閮紱
			$.plusReady(function() {
				plus.nativeUI.toast(message, {
					verticalAlign: 'bottom',
					duration:options.duration
				});
			});
		} else {
			if (typeof options.duration === 'number') {
		        duration = options.duration>0 ? options.duration:durations['short'];
		    } else {
		        duration = durations[options.duration];
		    }
		    if (!duration) {
		        duration = durations['short'];
		    }
			var toast = document.createElement('div');
			toast.classList.add('mui-toast-container');
			toast.innerHTML = '<div class="' + 'mui-toast-message' + '">' + message + '</div>';
			toast.addEventListener('webkitTransitionEnd', function() {
				if (!toast.classList.contains(CLASS_ACTIVE)) {
					toast.parentNode.removeChild(toast);
					toast = null;
				}
			});
			//鐐瑰嚮鍒欒嚜鍔ㄦ秷澶�
			toast.addEventListener('click', function() {
		        toast.parentNode.removeChild(toast);
		        toast = null;
		    });
			document.body.appendChild(toast);
			toast.offsetHeight;
			toast.classList.add(CLASS_ACTIVE);
			setTimeout(function() {
				toast && toast.classList.remove(CLASS_ACTIVE);
			}, duration);
			
			return {
		        isVisible: function() {return !!toast;}
		    }
		}   
	};

})(mui, window);
/**
 * Popup(alert,confirm,prompt)  
 * @param {Object} $
 * @param {Object} window
 * @param {Object} document
 */
(function($, window, document) {
    var CLASS_POPUP = 'mui-popup';
    var CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
    var CLASS_POPUP_IN = 'mui-popup-in';
    var CLASS_POPUP_OUT = 'mui-popup-out';
    var CLASS_POPUP_INNER = 'mui-popup-inner';
    var CLASS_POPUP_TITLE = 'mui-popup-title';
    var CLASS_POPUP_TEXT = 'mui-popup-text';
    var CLASS_POPUP_INPUT = 'mui-popup-input';
    var CLASS_POPUP_BUTTONS = 'mui-popup-buttons';
    var CLASS_POPUP_BUTTON = 'mui-popup-button';
    var CLASS_POPUP_BUTTON_BOLD = 'mui-popup-button-bold';
    var CLASS_POPUP_BACKDROP = 'mui-popup-backdrop';
    var CLASS_ACTIVE = 'mui-active';

    var popupStack = [];
    var backdrop = (function() {
        var element = document.createElement('div');
        element.classList.add(CLASS_POPUP_BACKDROP);
        element.addEventListener($.EVENT_MOVE, $.preventDefault);
        element.addEventListener('webkitTransitionEnd', function() {
            if (!this.classList.contains(CLASS_ACTIVE)) {
                element.parentNode && element.parentNode.removeChild(element);
            }
        });
        return element;
    }());

    var createInput = function(placeholder) {
        return '<div class="' + CLASS_POPUP_INPUT + '"><input type="text" autofocus placeholder="' + (placeholder || '') + '"/></div>';
    };
    var createInner = function(message, title, extra) {
        return '<div class="' + CLASS_POPUP_INNER + '"><div class="' + CLASS_POPUP_TITLE + '">' + title + '</div><div class="' + CLASS_POPUP_TEXT + '">' + message.replace(/\r\n/g, "<br/>").replace(/\n/g, "<br/>") + '</div>' + (extra || '') + '</div>';
    };
    var createButtons = function(btnArray) {
        var length = btnArray.length;
        var btns = [];
        for (var i = 0; i < length; i++) {
            btns.push('<span class="' + CLASS_POPUP_BUTTON + (i === length - 1 ? (' ' + CLASS_POPUP_BUTTON_BOLD) : '') + '">' + btnArray[i] + '</span>');
        }
        return '<div class="' + CLASS_POPUP_BUTTONS + '">' + btns.join('') + '</div>';
    };

    var createPopup = function(html, callback) {
        var popupElement = document.createElement('div');
        popupElement.className = CLASS_POPUP;
        popupElement.innerHTML = html;
        var removePopupElement = function() {
            popupElement.parentNode && popupElement.parentNode.removeChild(popupElement);
            popupElement = null;
        };
        popupElement.addEventListener($.EVENT_MOVE, $.preventDefault);
        popupElement.addEventListener('webkitTransitionEnd', function(e) {
            if (popupElement && e.target === popupElement && popupElement.classList.contains(CLASS_POPUP_OUT)) {
                removePopupElement();
            }
        });
        popupElement.style.display = 'block';
        document.body.appendChild(popupElement);
        popupElement.offsetHeight;
        popupElement.classList.add(CLASS_POPUP_IN);

        if (!backdrop.classList.contains(CLASS_ACTIVE)) {
            backdrop.style.display = 'block';
            document.body.appendChild(backdrop);
            backdrop.offsetHeight;
            backdrop.classList.add(CLASS_ACTIVE);
        }
        var btns = $.qsa('.' + CLASS_POPUP_BUTTON, popupElement);
        var input = popupElement.querySelector('.' + CLASS_POPUP_INPUT + ' input');
        var popup = {
            element: popupElement,
            close: function(index, animate) {
                if (popupElement) {
                    var result = callback && callback({
                        index: index || 0,
                        value: input && input.value || ''
                    });
                    if (result === false) { //杩斿洖false鍒欎笉鍏抽棴褰撳墠popup
                        return;
                    }
                    if (animate !== false) {
                        popupElement.classList.remove(CLASS_POPUP_IN);
                        popupElement.classList.add(CLASS_POPUP_OUT);
                    } else {
                        removePopupElement();
                    }
                    popupStack.pop();
                    //濡傛灉杩樻湁鍏朵粬popup锛屽垯涓峳emove backdrop
                    if (popupStack.length) {
                        popupStack[popupStack.length - 1]['show'](animate);
                    } else {
                        backdrop.classList.remove(CLASS_ACTIVE);
                    }
                }
            }
        };
        var handleEvent = function(e) {
            popup.close(btns.indexOf(e.target));
        };
        $(popupElement).on('tap', '.' + CLASS_POPUP_BUTTON, handleEvent);
        if (popupStack.length) {
            popupStack[popupStack.length - 1]['hide']();
        }
        popupStack.push({
            close: popup.close,
            show: function(animate) {
                popupElement.style.display = 'block';
                popupElement.offsetHeight;
                popupElement.classList.add(CLASS_POPUP_IN);
            },
            hide: function() {
                popupElement.style.display = 'none';
                popupElement.classList.remove(CLASS_POPUP_IN);
            }
        });
        return popup;
    };
    var createAlert = function(message, title, btnValue, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof title === 'function') {
                callback = title;
                type = btnValue;
                title = null;
                btnValue = null;
            } else if (typeof btnValue === 'function') {
                type = callback;
                callback = btnValue;
                btnValue = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '鎻愮ず') + createButtons([btnValue || '纭畾']), callback);
        }
        return plus.nativeUI.alert(message, callback, title || '鎻愮ず', btnValue || '纭畾');
    };
    var createConfirm = function(message, title, btnArray, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof title === 'function') {
                callback = title;
                type = btnArray;
                title = null;
                btnArray = null;
            } else if (typeof btnArray === 'function') {
                type = callback;
                callback = btnArray;
                btnArray = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '鎻愮ず') + createButtons(btnArray || ['鍙栨秷', '纭']), callback);
        }
        return plus.nativeUI.confirm(message, callback, title, btnArray || ['鍙栨秷', '纭']);
    };
    var createPrompt = function(message, placeholder, title, btnArray, callback, type) {
        if (typeof message === 'undefined') {
            return;
        } else {
            if (typeof placeholder === 'function') {
                callback = placeholder;
                type = title;
                placeholder = null;
                title = null;
                btnArray = null;
            } else if (typeof title === 'function') {
                callback = title;
                type = btnArray;
                title = null;
                btnArray = null;
            } else if (typeof btnArray === 'function') {
                type = callback;
                callback = btnArray;
                btnArray = null;
            }
        }
        if (!$.os.plus || type === 'div') {
            return createPopup(createInner(message, title || '鎻愮ず', createInput(placeholder)) + createButtons(btnArray || ['鍙栨秷', '纭']), callback);
        }
        return plus.nativeUI.prompt(message, callback, title || '鎻愮ず', placeholder, btnArray || ['鍙栨秷', '纭']);
    };
    var closePopup = function() {
        if (popupStack.length) {
            popupStack[popupStack.length - 1]['close']();
            return true;
        } else {
            return false;
        }
    };
    var closePopups = function() {
        while (popupStack.length) {
            popupStack[popupStack.length - 1]['close']();
        }
    };

    $.closePopup = closePopup;
    $.closePopups = closePopups;
    $.alert = createAlert;
    $.confirm = createConfirm;
    $.prompt = createPrompt;
})(mui, window, document);
(function($, document) {
	var CLASS_PROGRESSBAR = 'mui-progressbar';
	var CLASS_PROGRESSBAR_IN = 'mui-progressbar-in';
	var CLASS_PROGRESSBAR_OUT = 'mui-progressbar-out';
	var CLASS_PROGRESSBAR_INFINITE = 'mui-progressbar-infinite';

	var SELECTOR_PROGRESSBAR = '.mui-progressbar';

	var _findProgressbar = function(container) {
		container = $(container || 'body');
		if (container.length === 0) return;
		container = container[0];
		if (container.classList.contains(CLASS_PROGRESSBAR)) {
			return container;
		}
		var progressbars = container.querySelectorAll(SELECTOR_PROGRESSBAR);
		if (progressbars) {
			for (var i = 0, len = progressbars.length; i < len; i++) {
				var progressbar = progressbars[i];
				if (progressbar.parentNode === container) {
					return progressbar;
				}
			}
		}
	};
	/**
	 * 鍒涘缓骞舵樉绀鸿繘搴︽潯 
	 * @param {Object} container  鍙€夛紝榛樿body锛屾敮鎸乻elector,DOM Node,mui wrapper
	 * @param {Object} progress 鍙€夛紝undefined琛ㄧず寰幆锛屾暟瀛楄〃绀哄叿浣撹繘搴�
	 * @param {Object} color 鍙€夛紝鎸囧畾棰滆壊鏍峰紡(鐩墠鏆傛湭鎻愪緵瀹為檯鏍峰紡锛屽彲鏆傛椂涓嶆毚闇叉鍙傛暟)
	 */
	var showProgressbar = function(container, progress, color) {
		if (typeof container === 'number') {
			color = progress;
			progress = container;
			container = 'body';
		}
		container = $(container || 'body');
		if (container.length === 0) return;
		container = container[0];
		var progressbar;
		if (container.classList.contains(CLASS_PROGRESSBAR)) {
			progressbar = container;
		} else {
			var progressbars = container.querySelectorAll(SELECTOR_PROGRESSBAR + ':not(.' + CLASS_PROGRESSBAR_OUT + ')');
			if (progressbars) {
				for (var i = 0, len = progressbars.length; i < len; i++) {
					var _progressbar = progressbars[i];
					if (_progressbar.parentNode === container) {
						progressbar = _progressbar;
						break;
					}
				}
			}
			if (!progressbar) {
				progressbar = document.createElement('span');
				progressbar.className = CLASS_PROGRESSBAR + ' ' + CLASS_PROGRESSBAR_IN + (typeof progress !== 'undefined' ? '' : (' ' + CLASS_PROGRESSBAR_INFINITE)) + (color ? (' ' + CLASS_PROGRESSBAR + '-' + color) : '');
				if (typeof progress !== 'undefined') {
					progressbar.innerHTML = '<span></span>';
				}
				container.appendChild(progressbar);
			} else {
				progressbar.classList.add(CLASS_PROGRESSBAR_IN);
			}
		}
		if (progress) setProgressbar(container, progress);
		return progressbar;
	};
	/**
	 * 鍏抽棴杩涘害鏉� 
	 * @param {Object} container 鍙€夛紝榛樿body锛屾敮鎸乻elector,DOM Node,mui wrapper
	 */
	var hideProgressbar = function(container) {
		var progressbar = _findProgressbar(container);
		if (!progressbar) {
			return;
		}
		var classList = progressbar.classList;
		if (!classList.contains(CLASS_PROGRESSBAR_IN) || classList.contains(CLASS_PROGRESSBAR_OUT)) {
			return;
		}
		classList.remove(CLASS_PROGRESSBAR_IN);
		classList.add(CLASS_PROGRESSBAR_OUT);
		progressbar.addEventListener('webkitAnimationEnd', function() {
			progressbar.parentNode && progressbar.parentNode.removeChild(progressbar);
			progressbar = null;
		});
		return;
	};
	/**
	 * 璁剧疆鎸囧畾杩涘害鏉¤繘搴� 
	 * @param {Object} container  鍙€夛紝榛樿body锛屾敮鎸乻elector,DOM Node,mui wrapper
	 * @param {Object} progress 鍙€夛紝榛樿0 鍙栧€艰寖鍥碵0-100]
	 * @param {Object} speed 杩涘害鏉″姩鐢绘椂闂�
	 */
	var setProgressbar = function(container, progress, speed) {
		if (typeof container === 'number') {
			speed = progress;
			progress = container;
			container = false;
		}
		var progressbar = _findProgressbar(container);
		if (!progressbar || progressbar.classList.contains(CLASS_PROGRESSBAR_INFINITE)) {
			return;
		}
		if (progress) progress = Math.min(Math.max(progress, 0), 100);
		progressbar.offsetHeight;
		var span = progressbar.querySelector('span');
		if (span) {
			var style = span.style;
			style.webkitTransform = 'translate3d(' + (-100 + progress) + '%,0,0)';
			if (typeof speed !== 'undefined') {
				style.webkitTransitionDuration = speed + 'ms';
			} else {
				style.webkitTransitionDuration = '';
			}
		}
		return progressbar;
	};
	$.fn.progressbar = function(options) {
		var progressbarApis = [];
		options = options || {};
		this.each(function() {
			var self = this;
			var progressbarApi = self.mui_plugin_progressbar;
			if (!progressbarApi) {
				self.mui_plugin_progressbar = progressbarApi = {
					options: options,
					setOptions: function(options) {
						this.options = options;
					},
					show: function() {
						return showProgressbar(self, this.options.progress, this.options.color);
					},
					setProgress: function(progress) {
						return setProgressbar(self, progress);
					},
					hide: function() {
						return hideProgressbar(self);
					}
				};
			} else if (options) {
				progressbarApi.setOptions(options);
			}
			progressbarApis.push(progressbarApi);
		});
		return progressbarApis.length === 1 ? progressbarApis[0] : progressbarApis;
	};
	//	$.setProgressbar = setProgressbar;
	//	$.showProgressbar = showProgressbar;
	//	$.hideProgressbar = hideProgressbar;
})(mui, document);
/**
 * Input(TODO resize)
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {
	var CLASS_ICON = 'mui-icon';
	var CLASS_ICON_CLEAR = 'mui-icon-clear';
	var CLASS_ICON_SPEECH = 'mui-icon-speech';
	var CLASS_ICON_SEARCH = 'mui-icon-search';
	var CLASS_ICON_PASSWORD = 'mui-icon-eye';
	var CLASS_INPUT_ROW = 'mui-input-row';
	var CLASS_PLACEHOLDER = 'mui-placeholder';
	var CLASS_TOOLTIP = 'mui-tooltip';
	var CLASS_HIDDEN = 'mui-hidden';
	var CLASS_FOCUSIN = 'mui-focusin';
	var SELECTOR_ICON_CLOSE = '.' + CLASS_ICON_CLEAR;
	var SELECTOR_ICON_SPEECH = '.' + CLASS_ICON_SPEECH;
	var SELECTOR_ICON_PASSWORD = '.' + CLASS_ICON_PASSWORD;
	var SELECTOR_PLACEHOLDER = '.' + CLASS_PLACEHOLDER;
	var SELECTOR_TOOLTIP = '.' + CLASS_TOOLTIP;

	var findRow = function(target) {
		for (; target && target !== document; target = target.parentNode) {
			if (target.classList && target.classList.contains(CLASS_INPUT_ROW)) {
				return target;
			}
		}
		return null;
	};
	var Input = function(element, options) {
		this.element = element;
		this.options = options || {
			actions: 'clear'
		};
		if (~this.options.actions.indexOf('slider')) { //slider
			this.sliderActionClass = CLASS_TOOLTIP + ' ' + CLASS_HIDDEN;
			this.sliderActionSelector = SELECTOR_TOOLTIP;
		} else { //clear,speech,search
			if (~this.options.actions.indexOf('clear')) {
				this.clearActionClass = CLASS_ICON + ' ' + CLASS_ICON_CLEAR + ' ' + CLASS_HIDDEN;
				this.clearActionSelector = SELECTOR_ICON_CLOSE;
			}
			if (~this.options.actions.indexOf('speech')) { //only for 5+
				this.speechActionClass = CLASS_ICON + ' ' + CLASS_ICON_SPEECH;
				this.speechActionSelector = SELECTOR_ICON_SPEECH;
			}
			if (~this.options.actions.indexOf('search')) {
				this.searchActionClass = CLASS_PLACEHOLDER;
				this.searchActionSelector = SELECTOR_PLACEHOLDER;
			}
			if (~this.options.actions.indexOf('password')) {
				this.passwordActionClass = CLASS_ICON + ' ' + CLASS_ICON_PASSWORD;
				this.passwordActionSelector = SELECTOR_ICON_PASSWORD;
			}
		}
		this.init();
	};
	Input.prototype.init = function() {
		this.initAction();
		this.initElementEvent();
	};
	Input.prototype.initAction = function() {
		var self = this;

		var row = self.element.parentNode;
		if (row) {
			if (self.sliderActionClass) {
				self.sliderAction = self.createAction(row, self.sliderActionClass, self.sliderActionSelector);
			} else {
				if (self.searchActionClass) {
					self.searchAction = self.createAction(row, self.searchActionClass, self.searchActionSelector);
					self.searchAction.addEventListener('tap', function(e) {
						$.focus(self.element);
						e.stopPropagation();
					});
				}
				if (self.speechActionClass) {
					self.speechAction = self.createAction(row, self.speechActionClass, self.speechActionSelector);
					self.speechAction.addEventListener('click', $.stopPropagation);
					self.speechAction.addEventListener('tap', function(event) {
						self.speechActionClick(event);
					});
				}
				if (self.clearActionClass) {
					self.clearAction = self.createAction(row, self.clearActionClass, self.clearActionSelector);
					self.clearAction.addEventListener('tap', function(event) {
						self.clearActionClick(event);
					});
				}
				if (self.passwordActionClass) {
					self.passwordAction = self.createAction(row, self.passwordActionClass, self.passwordActionSelector);
					self.passwordAction.addEventListener('tap', function(event) {
						self.passwordActionClick(event);
					});
				}
			}
		}
	};
	Input.prototype.createAction = function(row, actionClass, actionSelector) {
		var action = row.querySelector(actionSelector);
		if (!action) {
			var action = document.createElement('span');
			action.className = actionClass;
			if (actionClass === this.searchActionClass) {
				action.innerHTML = '<span class="' + CLASS_ICON + ' ' + CLASS_ICON_SEARCH + '"></span><span>' + this.element.getAttribute('placeholder') + '</span>';
				this.element.setAttribute('placeholder', '');
				if (this.element.value.trim()) {
					row.classList.add('mui-active');
				}
			}
			row.insertBefore(action, this.element.nextSibling);
		}
		return action;
	};
	Input.prototype.initElementEvent = function() {
		var element = this.element;

		if (this.sliderActionClass) {
			var tooltip = this.sliderAction;
			var timer = null;
			var showTip = function() { //姣忔閲嶆柊璁＄畻鏄洜涓烘帶浠跺彲鑳借闅愯棌锛屽垵濮嬪寲鏃惰绠楁槸涓嶆纭殑
				tooltip.classList.remove(CLASS_HIDDEN);
				var offsetLeft = element.offsetLeft;
				var width = element.offsetWidth - 28;
				var tooltipWidth = tooltip.offsetWidth;
				var distince = Math.abs(element.max - element.min);
				var scaleWidth = (width / distince) * Math.abs(element.value - element.min);
				tooltip.style.left = (14 + offsetLeft + scaleWidth - tooltipWidth / 2) + 'px';
				tooltip.innerText = element.value;
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(function() {
					tooltip.classList.add(CLASS_HIDDEN);
				}, 1000);
			};
			element.addEventListener('input', showTip);
			element.addEventListener('tap', showTip);
			element.addEventListener($.EVENT_MOVE, function(e) {
				e.stopPropagation();
			});
		} else {
			if (this.clearActionClass) {
				var action = this.clearAction;
				if (!action) {
					return;
				}
				$.each(['keyup', 'change', 'input', 'focus', 'cut', 'paste'], function(index, type) {
					(function(type) {
						element.addEventListener(type, function() {
							action.classList[element.value.trim() ? 'remove' : 'add'](CLASS_HIDDEN);
						});
					})(type);
				});
				element.addEventListener('blur', function() {
					action.classList.add(CLASS_HIDDEN);
				});
			}
			if (this.searchActionClass) {
				element.addEventListener('focus', function() {
					element.parentNode.classList.add('mui-active');
				});
				element.addEventListener('blur', function() {
					if (!element.value.trim()) {
						element.parentNode.classList.remove('mui-active');
					}
				});
			}
		}
	};
	Input.prototype.setPlaceholder = function(text) {
		if (this.searchActionClass) {
			var placeholder = this.element.parentNode.querySelector(SELECTOR_PLACEHOLDER);
			placeholder && (placeholder.getElementsByTagName('span')[1].innerText = text);
		} else {
			this.element.setAttribute('placeholder', text);
		}
	};
	Input.prototype.passwordActionClick = function(event) {
		if (this.element.type === 'text') {
			this.element.type = 'password';
		} else {
			this.element.type = 'text';
		}
		this.passwordAction.classList.toggle('mui-active');
		event.preventDefault();
	};
	Input.prototype.clearActionClick = function(event) {
		var self = this;
		self.element.value = '';
		$.focus(self.element);
		self.clearAction.classList.add(CLASS_HIDDEN);
		event.preventDefault();
	};
	Input.prototype.speechActionClick = function(event) {
		if (window.plus) {
			var self = this;
			var oldValue = self.element.value;
			self.element.value = '';
			document.body.classList.add(CLASS_FOCUSIN);
			plus.speech.startRecognize({
				engine: 'iFly'
			}, function(s) {
				self.element.value += s;
				$.focus(self.element);
				plus.speech.stopRecognize();
				$.trigger(self.element, 'recognized', {
					value: self.element.value
				});
				if (oldValue !== self.element.value) {
					$.trigger(self.element, 'change');
					$.trigger(self.element, 'input');
				}
				// document.body.classList.remove(CLASS_FOCUSIN);
			}, function(e) {
				document.body.classList.remove(CLASS_FOCUSIN);
			});
		} else {
			alert('only for 5+');
		}
		event.preventDefault();
	};
	$.fn.input = function(options) {
		var inputApis = [];
		this.each(function() {
			var inputApi = null;
			var actions = [];
			var row = findRow(this.parentNode);
			if (this.type === 'range' && row.classList.contains('mui-input-range')) {
				actions.push('slider');
			} else {
				var classList = this.classList;
				if (classList.contains('mui-input-clear')) {
					actions.push('clear');
				}
				if (!($.os.android && $.os.stream) && classList.contains('mui-input-speech')) {
					actions.push('speech');
				}
				if (classList.contains('mui-input-password')) {
					actions.push('password');
				}
				if (this.type === 'search' && row.classList.contains('mui-search')) {
					actions.push('search');
				}
			}
			var id = this.getAttribute('data-input-' + actions[0]);
			if (!id) {
				id = ++$.uuid;
				inputApi = $.data[id] = new Input(this, {
					actions: actions.join(',')
				});
				for (var i = 0, len = actions.length; i < len; i++) {
					this.setAttribute('data-input-' + actions[i], id);
				}
			} else {
				inputApi = $.data[id];
			}
			inputApis.push(inputApi);
		});
		return inputApis.length === 1 ? inputApis[0] : inputApis;
	};
	$.ready(function() {
		$('.mui-input-row input').input();
	});
})(mui, window, document);
(function($, window) {
    var CLASS_ACTIVE = 'mui-active';
    var rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/;
    var getColor = function(colorStr) {
        var matches = colorStr.match(rgbaRegex);
        if (matches && matches.length === 5) {
            return [
                matches[1],
                matches[2],
                matches[3],
                matches[4]
            ];
        }
        return [];
    };
    var Transparent = function(element, options) {
        this.element = element;
        this.options = $.extend({
            top: 0, //璺濈椤堕儴楂樺害(鍒拌揪璇ラ珮搴﹀嵆瑙﹀彂)
            offset: 150, //婊氬姩閫忔槑璺濈
            duration: 16, //杩囨浮鏃堕棿
            scrollby: window//鐩戝惉婊氬姩璺濈瀹瑰櫒
        }, options || {});

        this.scrollByElem = this.options.scrollby || window;
        if (!this.scrollByElem) {
            throw new Error("鐩戝惉婊氬姩鐨勫厓绱犱笉瀛樺湪");
        }
        this.isNativeScroll = false;
        if (this.scrollByElem === window) {
            this.isNativeScroll = true;
        } else if (!~this.scrollByElem.className.indexOf('mui-scroll-wrapper')) {
            this.isNativeScroll = true;
        }

        this._style = this.element.style;
        this._bgColor = this._style.backgroundColor;
        var color = getColor(mui.getStyles(this.element, 'backgroundColor'));
        if (color.length) {
            this._R = color[0];
            this._G = color[1];
            this._B = color[2];
            this._A = parseFloat(color[3]);
            this.lastOpacity = this._A;
            this._bufferFn = $.buffer(this.handleScroll, this.options.duration, this);
            this.initEvent();
        } else {
            throw new Error("鍏冪礌鑳屾櫙棰滆壊蹇呴』涓篟GBA");
        }
    };

    Transparent.prototype.initEvent = function() {
        this.scrollByElem.addEventListener('scroll', this._bufferFn);
        if (this.isNativeScroll) { //鍘熺敓scroll
            this.scrollByElem.addEventListener($.EVENT_MOVE, this._bufferFn);
        }
    }
    Transparent.prototype.handleScroll = function(e) {
        var y = window.scrollY;
        if (!this.isNativeScroll && e && e.detail) {
            y = -e.detail.y;
        }
        var opacity = (y - this.options.top) / this.options.offset + this._A;
        opacity = Math.min(Math.max(this._A, opacity), 1);
        this._style.backgroundColor = 'rgba(' + this._R + ',' + this._G + ',' + this._B + ',' + opacity + ')';
        if (opacity > this._A) {
            this.element.classList.add(CLASS_ACTIVE);
        } else {
            this.element.classList.remove(CLASS_ACTIVE);
        }
        if (this.lastOpacity !== opacity) {
            $.trigger(this.element, 'alpha', {
                alpha: opacity
            });
            this.lastOpacity = opacity;
        }
    };
    Transparent.prototype.destory = function() {
        this.scrollByElem.removeEventListener('scroll', this._bufferFn);
        this.scrollByElem.removeEventListener($.EVENT_MOVE, this._bufferFn);
        this.element.style.backgroundColor = this._bgColor;
        this.element.mui_plugin_transparent = null;
    };
    $.fn.transparent = function(options) {
        options = options || {};
        var transparentApis = [];
        this.each(function() {
            var transparentApi = this.mui_plugin_transparent;
            if (!transparentApi) {
                var top = this.getAttribute('data-top');
                var offset = this.getAttribute('data-offset');
                var duration = this.getAttribute('data-duration');
                var scrollby = this.getAttribute('data-scrollby');
                if (top !== null && typeof options.top === 'undefined') {
                    options.top = top;
                }
                if (offset !== null && typeof options.offset === 'undefined') {
                    options.offset = offset;
                }
                if (duration !== null && typeof options.duration === 'undefined') {
                    options.duration = duration;
                }
                if (scrollby !== null && typeof options.scrollby === 'undefined') {
                    options.scrollby = document.querySelector(scrollby) || window;
                }
                transparentApi = this.mui_plugin_transparent = new Transparent(this, options);
            }
            transparentApis.push(transparentApi);
        });
        return transparentApis.length === 1 ? transparentApis[0] : transparentApis;
    };
    $.ready(function() {
        $('.mui-bar-transparent').transparent();
    });
})(mui, window);
/**
 * 鏁板瓧杈撳叆妗�
 * varstion 1.0.1
 * by Houfeng
 * Houfeng@DCloud.io
 */

(function($) {

    var touchSupport = ('ontouchstart' in document);
    var tapEventName = touchSupport ? 'tap' : 'click';
    var changeEventName = 'change';
    var holderClassName = 'mui-numbox';
    var plusClassSelector = '.mui-btn-numbox-plus,.mui-numbox-btn-plus';
    var minusClassSelector = '.mui-btn-numbox-minus,.mui-numbox-btn-minus';
    var inputClassSelector = '.mui-input-numbox,.mui-numbox-input';

    var Numbox = $.Numbox = $.Class.extend({
        /**
         * 鏋勯€犲嚱鏁�
         **/
        init: function(holder, options) {
            var self = this;
            if (!holder) {
                throw "鏋勯€� numbox 鏃剁己灏戝鍣ㄥ厓绱�";
            }
            self.holder = holder;
            options = options || {};
            options.step = parseInt(options.step || 1);
            self.options = options;
            self.input = $.qsa(inputClassSelector, self.holder)[0];
            self.plus = $.qsa(plusClassSelector, self.holder)[0];
            self.minus = $.qsa(minusClassSelector, self.holder)[0];
            self.checkValue();
            self.initEvent();
        },
        /**
         * 鍒濆鍖栦簨浠剁粦瀹�
         **/
        initEvent: function() {
            var self = this;
            self.plus.addEventListener(tapEventName, function(event) {
                var val = parseInt(self.input.value) + self.options.step;
                self.input.value = val.toString();
                $.trigger(self.input, changeEventName, null);
            });
            self.minus.addEventListener(tapEventName, function(event) {
                var val = parseInt(self.input.value) - self.options.step;
                self.input.value = val.toString();
                $.trigger(self.input, changeEventName, null);
            });
            self.input.addEventListener(changeEventName, function(event) {
                self.checkValue();
                var val = parseInt(self.input.value);
                //瑙﹀彂椤跺眰瀹瑰櫒
                $.trigger(self.holder, changeEventName, {
                    value: val
                });
            });
        },
        /**
         * 鑾峰彇褰撳墠鍊�
         **/
        getValue: function() {
            var self = this;
            return parseInt(self.input.value);
        },
        /**
         * 楠岃瘉褰撳墠鍊兼槸娉曞悎娉�
         **/
        checkValue: function() {
            var self = this;
            var val = self.input.value;
            if (val == null || val == '' || isNaN(val)) {
                self.input.value = self.options.min || 0;
                self.minus.disabled = self.options.min != null;
            } else {
                var val = parseInt(val);
                if (self.options.max != null && !isNaN(self.options.max) && val >= parseInt(self.options.max)) {
                    val = self.options.max;
                    self.plus.disabled = true;
                } else {
                    self.plus.disabled = false;
                }
                if (self.options.min != null && !isNaN(self.options.min) && val <= parseInt(self.options.min)) {
                    val = self.options.min;
                    self.minus.disabled = true;
                } else {
                    self.minus.disabled = false;
                }
                self.input.value = val;
            }
        },
        /**
         * 鏇存柊閫夐」
         **/
        setOption: function(name, value) {
            var self = this;
            self.options[name] = value;
        },
        /**
         * 鍔ㄦ€佽缃柊鍊�
         **/
        setValue: function(value) {
            this.input.value = value;
            this.checkValue();
        }
    });

    $.fn.numbox = function(options) {
        var instanceArray = [];
        //閬嶅巻閫夋嫨鐨勫厓绱�
        this.each(function(i, element) {
            if (element.numbox) {
                return;
            }
            if (options) {
                element.numbox = new Numbox(element, options);
            } else {
                var optionsText = element.getAttribute('data-numbox-options');
                var options = optionsText ? JSON.parse(optionsText) : {};
                options.step = element.getAttribute('data-numbox-step') || options.step;
                options.min = element.getAttribute('data-numbox-min') || options.min;
                options.max = element.getAttribute('data-numbox-max') || options.max;
                element.numbox = new Numbox(element, options);
            }
        });
        return this[0] ? this[0].numbox : null;
    }

    //鑷姩澶勭悊 class='mui-locker' 鐨� dom
    $.ready(function() {
        $('.' + holderClassName).numbox();
    });

}(mui));
/**
 * Button
 * @param {type} $
 * @param {type} window
 * @param {type} document
 * @returns {undefined}
 */
(function($, window, document) {
    var CLASS_ICON = 'mui-icon';
    var CLASS_DISABLED = 'mui-disabled';

    var STATE_RESET = 'reset';
    var STATE_LOADING = 'loading';

    var defaultOptions = {
        loadingText: 'Loading...', //鏂囨
        loadingIcon: 'mui-spinner' + ' ' + 'mui-spinner-white', //鍥炬爣锛屽彲涓虹┖
        loadingIconPosition: 'left' //鍥炬爣鎵€澶勪綅缃紝浠呮敮鎸乴eft|right
    };

    var Button = function(element, options) {
        this.element = element;
        this.options = $.extend({}, defaultOptions, options);
        if (!this.options.loadingText) {
            this.options.loadingText = defaultOptions.loadingText;
        }
        if (this.options.loadingIcon === null) {
            this.options.loadingIcon = 'mui-spinner';
            if ($.getStyles(this.element, 'color') === 'rgb(255, 255, 255)') {
                this.options.loadingIcon += ' ' + 'mui-spinner-white';
            }
        }
        this.isInput = this.element.tagName === 'INPUT';
        this.resetHTML = this.isInput ? this.element.value : this.element.innerHTML;
        this.state = '';
    };
    Button.prototype.loading = function() {
        this.setState(STATE_LOADING);
    };
    Button.prototype.reset = function() {
        this.setState(STATE_RESET);
    };
    Button.prototype.setState = function(state) {
        if (this.state === state) {
            return false;
        }
        this.state = state;
        if (state === STATE_RESET) {
            this.element.disabled = false;
            this.element.classList.remove(CLASS_DISABLED);
            this.setHtml(this.resetHTML);
        } else if (state === STATE_LOADING) {
            this.element.disabled = true;
            this.element.classList.add(CLASS_DISABLED);
            var html = this.isInput ? this.options.loadingText : ('<span>' + this.options.loadingText + '</span>');
            if (this.options.loadingIcon && !this.isInput) {
                if (this.options.loadingIconPosition === 'right') {
                    html += '&nbsp;<span class="' + this.options.loadingIcon + '"></span>';
                } else {
                    html = '<span class="' + this.options.loadingIcon + '"></span>&nbsp;' + html;
                }
            }
            this.setHtml(html);
        }
    };
    Button.prototype.setHtml = function(html) {
        if (this.isInput) {
            this.element.value = html;
        } else {
            this.element.innerHTML = html;
        }
    }
    $.fn.button = function(state) {
        var buttonApis = [];
        this.each(function() {
            var buttonApi = this.mui_plugin_button;
            if (!buttonApi) {
                var loadingText = this.getAttribute('data-loading-text');
                var loadingIcon = this.getAttribute('data-loading-icon');
                var loadingIconPosition = this.getAttribute('data-loading-icon-position');
                this.mui_plugin_button = buttonApi = new Button(this, {
                    loadingText: loadingText,
                    loadingIcon: loadingIcon,
                    loadingIconPosition: loadingIconPosition
                });
            }
            if (state === STATE_LOADING || state === STATE_RESET) {
                buttonApi.setState(state);
            }
            buttonApis.push(buttonApi);
        });
        return buttonApis.length === 1 ? buttonApis[0] : buttonApis;
    };
})(mui, window, document);