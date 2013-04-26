/**
 * 类模块
 */
(function(owner) {
    "use strict";

    var utils = null;

    /**
     * 复制对象
     */
    var copyApply = function(src, tag, scope) {
        tag = tag || {};
        utils.each(src, function(name) {
            if (utils.isFunction(src[name])) {
                tag[name] = function() {
                    return src[name].apply(scope || this, arguments);
                };
            } else {
                tag[name] = src[name];
            }
        });
        return tag;
    };

    var rootClass = function() {};

    /**
     * 定义一个class(类)
     */
    owner.create = function(_super, _class) {
        if (!_class) {
            _class = _super;
            _super = null;
        };
        _super = _super || rootClass;
        _class = _class || {};
        var _superInstanse = utils.isFunction(_super) ? new _super() : _super;
        var _classInstanse = utils.isFunction(_class) ? new _class() : _class;
        //创建类型
        var theClass = function() {
            if (this.initialize) {
                return this.initialize.apply(this, arguments);
            }
        };
        //处理父子关系，通过prototype将父类成员添加到原型，可以使typeof instanseOf有效;
        theClass.super = _super;
        theClass.prototype = _superInstanse;
        theClass.prototype.super = copyApply(utils.clone(_superInstanse), {}, theClass.prototype); //clone一份父类的成员；;
        //定义实例扩展函数
        theClass.extend = function(context) {
            return copyApply(context, this.prototype);
        };
        //定义类扩展函数
        theClass.static = function(context) {
            return copyApply(context, this);
        };
        //将类成员及静态添加添加到实例
        theClass.extend(_classInstanse);
        if (utils.isFunction(_super)) theClass.static(_super);
        if (utils.isFunction(_class)) theClass.static(_class);
        //返回创建好的类型
        return theClass;
    };

    //兼容AMD模块
    if (typeof define === 'function' && define.amd) {
        define('$class', 'utils', function($utils) {
            utils = $utils;
            return owner;
        });
    } else {
        utils = $utils;
    }

})((typeof exports === 'undefined') ? (window.$class = {}) : exports);
//