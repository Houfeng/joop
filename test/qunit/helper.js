var $Tool = {
    $iframe: function(_url, callback, _width, _height) {
        var me = this;
        _width = _width || 0;
        _height = _height || 0;
        var _iframe = $("<iframe frameborder='0'></iframe>");
        $(document.body).append(_iframe);
        _iframe.width(_width).height(_height).load(function() {
            if (callback) {
                var _contentWindow = $(this)[0].contentWindow || $(this)[0].window;
                callback.call(_contentWindow, _contentWindow);
            }
        }).attr('src', _url);
    },
    $getQueryString: function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
        return svalue ? svalue[1] : svalue;
    },
    $init: function() {
        var me = this;
        window.$iframe = me.$iframe;
        var tests = me.$getQueryString('tests');
        if (!tests) return;
        tests = tests.split('.');
        if (tests && tests.length > 0) {
            for (var i = 0; i < tests.length; i++)
            $import(tests[i] + ".js");
        }
    }
};

$(function() {
    $Tool.$init();
});

