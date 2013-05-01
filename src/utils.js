(function(owner) {
	"use strict";

	/**
	 * 除去字符串两端的空格
	 * @param  {String} str 源字符串
	 * @return {String}     结果字符串
	 */
	owner.trim = function(str) {
		if (str && str.trim) return str.trim();
		else return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
	};
	/**
	 * 替换所有
	 */
	owner.replace = function(str, str1, str2) {
		return str.replace(new RegExp(str1, 'g'), str2);
	};
	/**
	 * 从字符串开头匹配
	 */
	owner.startWith = function(str1, str2) {
		return str1 && str2 && str1.indexOf(str2) === 0;
	};
	/**
	 * 是否包含
	 */
	owner.contains = function(str1, str2) {
		return str1 && str2 && str1.indexOf(str2) > -1;
	};
	/**
	 * 从字符串结束匹配
	 */
	owner.endWith = function(str1, str2) {
		return str1 && str2 && str1.indexOf(str2) === (str1.length - str2.length);
	};
	/**
	 * 验证一个对象是否为NULL
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isNull = function(obj) {
		return obj === null || typeof obj === "undefined";
	};
	/**
	 * 验证一个对象是否为Function
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isFunction = function(obj) {
		return typeof obj === "function";
	};
	/**
	 * 验证一个对象是否为String
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isString = function(obj) {
		return typeof obj === 'string' || obj instanceof String;
	};
	/**
	 * 验证一个字符串是否包含另一个字符串
	 * @param  {String} str1 原始字符串
	 * @param  {String} str2 要检查的字符串
	 * @return {Boolern}     结果
	 */
	owner.contains = function(str1, str2) {
		return str1.indexOf(str2) > -1;
	};
	/**
	 * 验证一个对象是否为Number
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isNumber = function(obj) {
		return typeof obj === 'number' || obj instanceof Number;
	};
	/**
	 * 验证一个对象是否为HTML Element
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isElement = function(obj) {
		if (window.Element) return obj instanceof Element;
		else return (obj.tagName && obj.nodeType && obj.nodeName && obj.attributes && obj.ownerDocument);
	};
	/**
	 * 验证一个对象是否为HTML Text Element
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isText = function(obj) {
		return obj instanceof Text;
	};
	/**
	 * 验证一个对象是否为Object
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isObject = function(obj) {
		return typeof obj === "object";
	};
	/**
	 * 验证一个对象是否为Array或伪Array
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isArray = function(obj) {
		if (!obj) return false;
		var _isArray = ((obj instanceof Array) || (!this.isString(obj) && obj.length && this.isNumber(obj.length)));
		return _isArray;
	};
	/**
	 * 遍历一个对像或数组
	 * @param  {Object or Array}   obj  要遍历的数组或对象
	 * @param  {Function} fn            处理函数
	 * @return {void}                   无返回值
	 */
	owner.each = function(list, handler) {
		if (!list || !handler) return;
		if (this.isArray(list)) {
			var listLength = list.length;
			for (var i = 0; i < listLength; i++) {
				if (this.isNull(list[i])) continue;
				var rs = handler.call(list[i], i, list[i]);
				if (!this.isNull(rs)) return rs;
			}
		} else {
			for (var key in list) {
				if (this.isNull(list[key])) continue;
				var rs = handler.call(list[key], key, list[key]);
				if (!this.isNull(rs)) return rs;
			}
		}
	};

	/**
	 * 深度克隆对象
	 */
	owner.clone = function(obj) {
		var objClone = new obj.constructor();
		for (var key in obj) {
			if (objClone[key] != obj[key]) {
				if (typeof(obj[key]) === 'object') {
					objClone[key] = this.clone(obj[key]);
				} else {
					objClone[key] = obj[key];
				}
			}
		}
		objClone.toString = obj.toString;
		objClone.valueOf = obj.valueOf;
		return objClone;
	};

	/**
	 * 生成一个Guid
	 */
	owner.newGuid = function() {
		var S4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	};

	/**
	 * 定义属性
	 */
	owner.defineProperty = function(obj, name, context) {
		if (!obj || !name || !context) return;
		if (obj.__defineGetter__ && obj.__defineSetter__) {
			obj.__defineSetter__(name, context.set);
			obj.__defineGetter__(name, context.get);
		} else if (Object.defineProperty) {
			Object.defineProperty(obj, name, context);
		} else {
			obj[name] = context;
		}
	};

	/**
	 * 处理URL
	 * @param  {String} _url 原始URL
	 * @return {String}      处理过的URL
	 */
	owner.wrapUrl = function(url) {
		if (url.indexOf('?') > -1) {
			url += "&__t=" + this.newGuid();
		} else {
			url += "?__t=" + this.newGuid();
		}
		return url;
	};

	/**
	 * 休眼
	 */
	owner.sleep = function(s) {
		var time = (new Date()).getTime() + s;
		while ((new Date()).getTime() + 1 < time);
		return;
	};

	/**
	 * 模拟多线程
	 */
	owner.async = function(fn, delay) {
		if (!this.isFunction(fn)) return;
		delay = delay || 13;
		if (this.asyncTimer) clearTimeout(this.asyncTimer);
		this.asyncTimer = setTimeout(fn, delay);
		return this.asyncTimer;
	};

	//----

	//兼容AMD模块
	if (typeof define === 'function' && define.amd) {
		define('$utils', [], function() {
			return owner;
		});
	}

})((typeof exports === 'undefined') ? (window.$utils = {}) : exports);

//-