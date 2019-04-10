"use strict";
/**
 * update on 2019/4/8
 * create from Xu
 */
var joint2 = {
    add: function (name, param) {
        if (!this.get(name)) {
            var theParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(param));
            this._init();
            this._search += this._search ? this._search == '#' ? theParam : '&' + theParam : '#' + theParam;
            this._join();
        }
    },
    remove: function (name) {
        if (this.get(name)) {
            var temp = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(this.get(name)));
            this._init();
            var params = this._search.indexOf(temp) > -1 ? this._search.replace((this._search.substring(this._search.indexOf(temp) - 1, this._search.indexOf(temp))) + temp, '') : '';
            this._search = params ? '#' + params.substr(1) : '#';
            this._join();
        }
    },
    replace: function (name, param) {
        if (this.get(name)) {
            var oldParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(this.get(name)));
            var newParam = encodeURI(encodeURI(name)) + '=' + encodeURI(encodeURI(param));
            this._init()
            this._search = this._search.indexOf(oldParam) > -1 ? this._search.replace(oldParam, newParam) : '';
            this._join();
        }
    },
    get: function (name) {
        this._init();
        var reg = new RegExp("(^|&)" + encodeURI(encodeURI(name)) + "=([^&]*)(&|$)");
        var r = this._search.substr(1).match(reg);
        if (r != null) return decodeURI(unescape(r[2])); return null;
    },
    all: function () {
        this._init();
        var list = this._search ? this._search == '#' ? [] : this._search.substr(1).split('&') : [], map = {};
        for (var i = 0; i < list.length; i++) {
            map[decodeURI(unescape(list[i].split('=')[0]))] = decodeURI(unescape(list[i].split('=')[1]))
        }
        if (Object.keys(map).length > 0) return map; return null;
    },
    clear: function () {
        this._search = '#';
        this._join();
    },
    _init: function () {
        var num = window.location.href.indexOf('#') > -1 ? window.location.href.indexOf('#') : window.location.href.length;
        this._search = window.location.href.substr(num);
    },
    _join: function () {
        var num = window.location.href.indexOf('#') > -1 ? window.location.href.indexOf('#') : window.location.href.length;
        window.location.href = window.location.href.substring(0, num) + this._search;
    },
    _search: ''
}