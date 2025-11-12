
import { createElement } from '@kdcloudjs/kwc';

// 连接符
const CONNECTOR = '__$$__';
const ctxMap = new Map();

const getInstanceId = (m) => `${m.pageId}${CONNECTOR}${m.key}`;

(function (KDApi) {
    function MyComponent (model) {
        this._initInternalState(model);
    }

    MyComponent.prototype = {
        _initInternalState: function (model) {
            this.model = model;
            this.instanceId = getInstanceId(model);
            this._isDestroyed = false; // 异步加载完成前就可能被销毁
        },
        init: function (props) {
            const ctx = { model: this.model, props };
            ctxMap.set(this.instanceId, ctx);
            const { dom } = this.model;
            // 异步加载
            import('x/app').then(({ default: App }) => {
                if (this._isDestroyed) { return; }
                const elm = createElement('x-app', { is: App });
                elm.instanceId = this.instanceId;
                dom.appendChild(elm);
            });
        },
        update: function (props) {
            const ctx = ctxMap.get(this.instanceId);
            if (ctx) { ctx.props = props; }
        },
        handleDirective: function () {
            // 参数：customProps, methodname, args
            // 这里的methodname 对应的是指令发过来定义的methodname，可根据方法名拿到对应的参数args
        },
        destoryed: function () {
            this._isDestroyed = true;
            ctxMap.delete(this.instanceId);
        }
    };

    // 注册自定义组件
    KDApi.register('${CONTROL_NAME}', MyComponent, {
        isMulLang: false
    });
})(window.KDApi);

/**
 * 获取组件上下文信息
 * @param {string} instanceId  pageId__$$__componentId
 * @returns {object|null} 返回组件上下文，包含 model 和 props 属性；如果未找到对应上下文，则返回 null
 */
export function getComponentContext(instanceId) {
    return ctxMap.get(instanceId) || null;
}
