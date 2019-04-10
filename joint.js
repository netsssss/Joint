"use strict";
/**
 * update on 2019/4/8
 * create from Xu
 */
var joint = {
    add: function (name, param) {
        if (!this.get(name)) {
            var theParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(param));
            window.location.search += window.location.search ? '&' + theParam : '?' + theParam;
        }
    },
    remove: function (name) {
        if (this.get(name)) {
            var temp = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(this.get(name)));
            var params = window.location.search.indexOf(temp) > -1 ?
                window.location.search.replace((window.location.search.substring(window.location.search.indexOf(temp) - 1, window.location.search.indexOf(temp))) + temp, '') : '';
            params ? window.location.search = '?' + params.substr(1) : window.location = window.location.pathname;
        }
    },
    replace: function (name, param) {
        if (this.get(name)) {
            var oldParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(this.get(name)));
            var newParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(param));
            var params = window.location.search.indexOf(oldParam) > -1 ? window.location.search.replace(oldParam, newParam) : '';
            window.location.search = params ? params : window.location.pathname;
        }
    },
    get: function (name) {
        var reg = new RegExp("(^|&)" + encodeURI(encodeURI(name)) + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(unescape(r[2])); return null;
    },
    all: function () {
        var list = window.location.search ? window.location.search.substr(1).split('&') : [], map = {};
        for (var i = 0; i < list.length; i++) {
            map[decodeURI(unescape(list[i].split('=')[0]))] = decodeURI(unescape(list[i].split('=')[1]))
        }
        if (Object.keys(map).length > 0) return map; return null;
    },
    clear: function () {
        window.location = window.location.pathname;
    }
}