# React + TypeScript + webpack5

#### 开发
```
yarn install
yarn start
```

#### 打包
```
yarn build
```

#### 本地调试
```
yarn server
```
启动服务后在苍穹项目地址栏后加上`&kdcus_cdn=http://localhost:3001`

#### 目录结构
    |-- .babelrc -babel相关配置
    |-- .gitignore -配置git上传时忽略文件
    |-- package.json -项目描述文件
    |-- postcss.config.js - postcss插件配置
    |-- README.md
    |-- tsconfig.json -typescript相关配置
    |-- typings.d.ts
    |-- build - 打包配置
    |   |-- webpack.common.js
    |   |-- webpack.dev.js
    |   |-- webpack.prod.js
    |-- server - 本地调试
    |   |-- config.js
    |   |-- index.js
    |-- src
    |   |-- devIndex.tsx - 本地启动入口文件，用于本地实时预览样式
    |   |-- index.tsx - 项目主要入口文件，与苍穹交互相关逻辑
    |   |-- components - 组件
    |   |   |-- App.less
    |   |   |-- App.tsx
    |   |-- types
    |   |   |-- index.d.ts
    |   |-- utils
    |       |-- eventBus.ts
    |-- static
        |-- index.html - html模板文件