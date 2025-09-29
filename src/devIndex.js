import '@kdcloudjs/kwc-synthetic-shadow';
import { createElement } from '@kdcloudjs/kwc';

(async () => {
    const { default: App } = await import('x/app');
    const elm = createElement('x-app', { is: App });
    document.body.appendChild(elm);
})();