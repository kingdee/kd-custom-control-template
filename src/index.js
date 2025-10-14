import { createElement } from '@kdcloudjs/kwc';

(function (KDApi) {
    const setHtml = (model) => {
        const { dom } = model;
        // 异步加载
        import('x/app').then(({ default: App }) => {
            const elm = createElement('x-app', { is: App });
            dom.appendChild(elm);
        });
    };
    function MyComponent (model) {
        this._setModel(model);
    }

    MyComponent.prototype = {
        _setModel: function (model) {
            this.model = model;
        },
        init: function (props) {
            setHtml(this.model, props);
        },
        update: function () {
        },
        handleDirective: function () {
            // 参数：customProps, methodname, args
            // 这里的methodname 对应的是指令发过来定义的methodname，可根据方法名拿到对应的参数args
        },
        destoryed: function () {
        }
    };

    // 注册自定义组件
    KDApi.register('${CONTROL_NAME}', MyComponent, {
        isMulLang: false
    });
})(window.KDApi);
