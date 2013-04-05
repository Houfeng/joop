/**
 * 类模块
 */
(function(owner) {
    /**
     * 定义一个class(类)
     * @param  {Object} params 类的实现
     * @return {Class}         类型
     */
    owner.$class = function(params) {
        /**
         * 类
         * @return {Object} 返回值
         */
        var newClass = function() {
            var me = this;
            //改变父类的作用域，判断父类类型的向个系统函数不能改变作用域
            if (me.$base) {
                for (var name in me.$base) {
                    if (name != "$is" && name != "$base" && name != "$type" && name != "$baseType" && owner.$helper.isFunction(me.$base[name])) {
                        var _func = me.$base[name];
                        //alert(name);
                        me.$base[name] = function() {
                            return _func.apply(me, arguments);
                        };
                    }
                    //if (!me[name]) { //如果子类没有重写，直接指向父类
                    //me[name] = me.$base[name];
                    //}
                }
            }
            //定义$type
            me.$type = newClass;
            /**
             * 判断实例是否是指定class(类)
             * @param  {Class} t   类型
             * @return {Boolern}   bool结果
             */
            me.$is = function(t) {
                return me.$type === t || me.$baseType === t || (me.$base != null && me.$base.$is != null && me.$base.$is(t));
            }
            //调用构造
            var rs = null;
            if (me.$init && owner.$helper.isFunction(me.$init)) {
                rs = me.$init.apply(me, arguments);
            }
            //调用扩展构造（可以理解为初始化执行的函数）
            if (me.$initList) {
                for (var i in me.$initList) {
                    if (me.$initList[i] && owner.$helper.isFunction(me.$initList[i])) {
                        me.$initList[i].apply(me, arguments);
                    }
                }
            }
            //返回构造函数据的返回值
            return rs;
        };
        /**
         * 扩展实例功能，此方法可扩展类的实例功能
         * @param  {Object} fns       扩展对象，包含要添加到实例的成员
         * @param  {Boolern} internal 是否为内部调用
         * @param  {Boolern} keepfn   如果fns是函数，是否将Function本身作为扩展
         * @return {void}             无返回值
         */
        var _extend = function(fns, internal, keepfn) { //私有
            if (owner.$helper.isFunction(fns) && !keepfn) {
                var _body = new fns();
                fns = _body;
            }
            if (!newClass.prototype.$initList) {
                newClass.prototype.$initList = [];
            }
            for (var name in fns) {
                if (!internal && name == "$init" && owner.$helper.isFunction(fns[name])) {
                    newClass.prototype.$initList.push(fns[name]);
                } else {
                    newClass.prototype[name] = fns[name];
                    //alert("成员："+name+": "+newClass.prototype[name] );
                }
            }
            return newClass;
        };
        /**
         * 扩展实例功能，此方法可扩展类的实例功能
         * @param  {Object} fns     扩展对象，包含要添加到实例的成员
         * @param  {Boolern} keepfn 如果fns是函数，是否将Function本身作为扩展
         * @return {void}           无返回值
         */
        newClass.$extend = function(fns, keepfn) {
            return _extend(fns, false, keepfn);
        };
        /**
         * 扩展类功能，此方法可扩展类的静态方法
         * @param  {Object} fns     扩展对象，包含要添加到类的成员
         * @param  {Boolern} keepfn 如果fns是函数，是否将Function本身作为扩展
         * @return {void}           无返回值
         */
        newClass.$static = function(fns, keepfn) {
            if (owner.$helper.isFunction(fns) && !keepfn) {
                var _body = new fns();
                fns = _body;
            }
            for (var name in fns) {
                newClass[name] = fns[name];
                if (name == "$init" && owner.$helper.isFunction(fns[name])) {
                    newClass[name].apply(newClass);
                }
            }
            return newClass;
        };
        /**
         * 将成员附加到当前类中
         */
        if (params.$base) {
            var _base = params.$base;
            params.$baseType = _base;
            params.$base = new _base();
            //alert('子类');
            //添加       
            newClass.$static(params.$baseType, true); //添加静态成员
            newClass = _extend(params.$base, true); //添加父类成员
            newClass = _extend(params, true); //添加当前类成员
        } else {
            //alert('父类');
            newClass = _extend(params, true);
        }
        //返回新类型
        return newClass;
    };

    //兼容CommonJS
    if (typeof exports !== 'undefined') exports = owner.$class;
    //兼容AMD模块
    if (typeof define === 'function' && define.amd) {
        define('$class', [], function() {
            return owner.$class;
        });
    }

})(window || {});
//