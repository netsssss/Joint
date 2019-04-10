"use strict";
/**
 * update on 2019/4/10
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
                window.location.search = params ? '?' + params.substr(1) : '';
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
        var list = window.location.search ? window.location.search.substr(1).split('&') : [], map = {}, flag = false;
        for (var i = 0; i < list.length; i++) {
            map[decodeURI(unescape(list[i].split('=')[0]))] = decodeURI(unescape(list[i].split('=')[1]))
        }
        for (i in map) {flag = true; break;};
        if(flag) return map; return null;
    },
    clear: function () {
        window.location.href = window.location.href.replace(window.location.href.substr(window.location.href.indexOf('?'), window.location.search.length), '');
    }
}