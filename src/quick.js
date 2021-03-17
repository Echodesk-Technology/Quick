"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var quick_error_1 = require("quick-error");
var snabbdom = require("snabbdom");
var props_1 = require("snabbdom/modules/props");
var reconcile = snabbdom.init([props_1["default"]]);
var root = document.getElementById('app');
var snabbdom_1 = require("snabbdom");
var init = require('snabbdom-to-html/init');
var modules = require('snabbdom-to-html/modules');
var toHTML = init([modules["class"], modules.props, modules.attributes, modules.style]);
// interface IQuick {
//     readonly $el: Element,
// }
// function watchEffect(fn:P any) {
//     this.activeEffect = fn
//     fn()
//     this.activeEffect = null
// }
var Dep = /** @class */ (function () {
    function Dep() {
        this.subscribers = new Set();
    }
    Dep.prototype.depend = function (activeEffect) {
        if (activeEffect)
            this.subscribers.add(activeEffect);
    };
    Dep.prototype.notify = function () {
        this.subscribers.forEach(function (sub) {
            sub();
        });
    };
    return Dep;
}());
var Component = /** @class */ (function () {
    function Component(params) {
        var t = this;
        t.params = params;
    }
    Component.prototype.componentDidMount = function () { };
    Component.prototype.setState = function (partialState) {
        var _this = this;
        _this.state = __assign(__assign({}, _this.state), partialState);
        Quick.__updater(_this);
    };
    Component.prototype.render = function (el, r) {
        reconcile(root, el);
    };
    return Component;
}());
var _pt = Component.prototype;
_pt.isQuickClassComponent = true;
var render = function (el, r) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        reconcile(root, el);
        return [2 /*return*/];
    });
}); };
var _init = function () {
    var fav = document.createElement('link');
    fav.href = '/favicon.ico';
    fav.rel = 'icon';
    var h = document.getElementsByTagName('head');
};
var listener = function (target, type, fn, prevent) {
    document.addEventListener(type, function (e) {
        if (e.target.id === target) {
            fn();
        }
        if (e.target.className === target) {
            fn();
        }
        else {
            return false;
        }
    });
    if (prevent) {
        document.addEventListener(type, function (e) {
            e.preventDefault();
            if (target === '' || !target) {
                new quick_error_1["default"]("target not passed to listener");
            }
            if (e.target.id === target) {
                e.preventDefault();
                fn();
            }
            if (e.target.className === target) {
                e.preventDefault();
                fn();
            }
            else {
                return false;
            }
        });
    }
};
var runBeforeDomLoaded = function (func) {
    document.addEventListener('DOMContentLoaded', function () {
        func;
    });
};
var view = function (view) {
    var renderViewtoHTML = toHTML(view);
    document.querySelector('#app').innerHTML = renderViewtoHTML;
};
var createElement = function (type, props) {
    if (props === void 0) { props = {}; }
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    children = children.flat();
    if (type.prototype && type.prototype.isQndReactClassComponent) {
        var componentInstance = new type(props);
        return componentInstance.render();
    }
    if (typeof type == 'function') {
        return type(props);
    }
    props = props || {};
    var dataProps = {};
    var eventProps = {};
    for (var propKey in props) {
        // event props always startwith on eg. onClick, onChange etc.
        if (propKey.startsWith('on')) {
            // onClick -> click
            var event_1 = propKey.substring(2).toLowerCase();
            eventProps[event_1] = props[propKey];
        }
        else {
            dataProps[propKey] = props[propKey];
        }
    }
    return snabbdom_1.h(type, { props: props }, children);
};
var __updater = function (instance) {
    return instance;
};
var config = function (env) {
    if (env === 'production') {
    }
    if (env === 'development') {
    }
    if (!env || env === '') {
    }
};
var Quick = {
    Component: Component,
    runBeforeDomLoaded: runBeforeDomLoaded,
    view: view,
    createElement: createElement,
    __updater: __updater,
    config: config,
    render: render,
    _init: _init,
    listener: listener
};
Quick.runBeforeDomLoaded(Quick._init);
Quick.runBeforeDomLoaded(Quick.listener);
exports["default"] = Quick;
