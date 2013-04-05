(function(owner) {
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
	 * 验证一个对象是否为NULL
	 * @param  {Object}  obj 要验证的对象
	 * @return {Boolean}     结果
	 */
	owner.isNull = function(obj) {
		return obj == null;
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
		return typeof obj === 'string';
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
		return typeof obj === 'number';
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
	owner.each = function(obj, fn) {
		if (!owner.$helper.isFunction(fn)) return obj;
		if (this.isArray(obj)) {
			for (var i = 0; i < obj.length; i++) {
				if (fn.call(obj[i], i)) break;
			}
		} else {
			for (var i in obj) {
				if (fn.call(obj[i], i)) break;
			}
		}
		return obj;
	};
	
	//兼容AMD模块
	if (typeof define === 'function' && define.amd) {
        define('$utils', [], function() {
            return owner;
        });
    }
    
})((typeof exports === 'undefined') ? (window.$utils = {}) : exports);

//-