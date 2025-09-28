import '@kdcloudjs/kwc-synthetic-shadow';
import { createElement } from '@kdcloudjs/kwc';

(async () => {
    const { default: App } = await import('x/app');
    const elm = createElement('x-app', { is: App });
    elm.testApi = '1';
    document.body.appendChild(elm);
})();