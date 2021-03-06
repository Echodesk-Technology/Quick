import QuickError from 'quick-error';
import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';

const reconcile = snabbdom.init([propsModule]);

const root: any = document.getElementById('app');
import { h } from 'snabbdom';
const init = require('snabbdom-to-html/init');
const modules = require('snabbdom-to-html/modules');
const toHTML = init([modules.class, modules.props, modules.attributes, modules.style]);
declare global {
    interface Window {
        state: any;
    }
}
// interface IQuick {
//     readonly $el: Element,
// }
// function watchEffect(fn:P any) {
//     this.activeEffect = fn
//     fn()
//     this.activeEffect = null
// }

class Dep {
    subscribers = new Set();
    depend(activeEffect?: any) {
        if (activeEffect) this.subscribers.add(activeEffect);
    }
    notify() {
        this.subscribers.forEach((sub: any | void) => {
            sub();
        });
    }
}

class Component {
    constructor(params: any) {
        let t: any = this;
        t.params = params;
    }

    componentDidMount() {}

    setState(partialState: any) {
        const _this: any = this;
        _this.state = {
            ..._this.state,
            ...partialState,
        };
        Quick.__updater(_this);
    }

    render(el: any, r?: any) {
        reconcile(root, el);
    }
}
const _pt: any = Component.prototype;
_pt.isQuickClassComponent = true;

const render = (component: any, root: any) => {
    if (!component) {
        new QuickError('Cannot render without component');
    }
    if (!root) {
        new QuickError('Cannot render without DOM element');
    }
    if (!component && !root) {
        new QuickError('Cannot render without Component and DOM element');
    }
    reconcile(root, component);
};
const _init = () => {
    const fav = document.createElement('link');
    fav.href = '/favicon.ico';
    fav.rel = 'icon';
    const h = document.getElementsByTagName('head');
};

const $ = function (selector) {
    return document.querySelector(selector);
};

const componentLoaded = (callback: Function) => {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            callback();
        }, 100);
    });
};

const listener = (target: any, type: any, fn: any, prevent: boolean) => {
    document.addEventListener(type, (e) => {
        if (e.target.id === target) {
            fn();
        }
        if (e.target.className === target) {
            fn();
        }
    });
};

const runBeforeDomLoaded = (func: any) => {
    document.addEventListener('DOMContentLoaded', () => {
        func;
    });
};

const view = (view: any) => {
    const renderViewtoHTML = toHTML(view);
    document.querySelector('#app').innerHTML = renderViewtoHTML;
};

const createElement = (type: any, props = {}, ...children: any) => {
    children = children.flat();
    if (type.prototype && type.prototype.isQndReactClassComponent) {
        const componentInstance = new type(props);

        return componentInstance.render();
    }
    if (typeof type == 'function') {
        return type(props);
    }
    props = props || {};
    let dataProps: any = {};
    let eventProps: any = {};
    for (let propKey in props) {
        // event props always startwith on eg. onClick, onChange etc.
        if (propKey.startsWith('on')) {
            // onClick -> click
            const event = propKey.substring(2).toLowerCase();

            eventProps[event] = props[propKey];
        } else {
            dataProps[propKey] = props[propKey];
        }
    }
    return h(type, { props }, children);
};

const __updater = (instance: any) => {
    return instance;
};

const config = (env: any) => {
    if (env === 'production') {
    }
    if (env === 'development') {
    }
    if (!env || env === '') {
    }
};

const Quick = {
    Component,
    runBeforeDomLoaded,
    view,
    createElement,
    __updater,
    config,
    render,
    _init,
    listener,
    $,
    componentLoaded,
};

Quick.runBeforeDomLoaded(Quick._init);
Quick.runBeforeDomLoaded(Quick.listener);
export default Quick;
