"use strict";
/**
 * update on 2019/4/10
 * create from Xu
 */
var joint2 = {
    add: function (name, param) {
        if (!this.get(name)) {
            var theParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(param));
            window.location.hash += window.location.hash ? window.location.hash == '#' ? theParam : '&' + theParam : '#' + theParam;
        }
    },
    remove: function (name) {
        if (this.get(name)) {
            var temp = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(this.get(name)));
            var params = window.location.hash.indexOf(temp) > -1 ?
                window.location.hash.replace((window.location.hash.substring(window.location.hash.indexOf(temp) - 1, window.location.hash.indexOf(temp))) + temp, '') : '';
                window.location.hash = params ? '#' + params.substr(1) : '';
        }
    },
    replace: function (name, param) {
        if (this.get(name)) {
            var oldParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(this.get(name)));
            var newParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(param));
            var params = window.location.hash.indexOf(oldParam) > -1 ? window.location.hash.replace(oldParam, newParam) : '';
            window.location.hash = params ? params : window.location.pathname;
        }
    },
    get: function (name) {
        var reg = new RegExp("(^|&)" + encodeURI(encodeURI(name)) + "=([^&]*)(&|$)");
        var r = window.location.hash.substr(1).match(reg);
        if (r != null) return decodeURI(unescape(r[2])); return null;
    },
    all: function () {
        var list = window.location.hash? window.location.hash =='#' ? [] : window.location.hash.substr(1).split('&') : [], map = {}, flag = false;
        for (var i = 0; i < list.length; i++) {
            map[decodeURI(unescape(list[i].split('=')[0]))] = decodeURI(unescape(list[i].split('=')[1]))
        }
        for (i in map) {flag = true; break;};
        if(flag) return map; return null;
    },
    clear: function () {
        window.location.hash = '';
    }
}