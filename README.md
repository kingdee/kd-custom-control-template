# Vue3 + TypeScript + Vite

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
    |-- .gitignore
    |-- auto-imports.d.ts
    |-- components.d.ts
    |-- env.d.ts
    |-- index.html - html模板文件
    |-- package.json -项目描述文件
    |-- postcss.config.cjs - postcss插件配置
    |-- README.md
    |-- tsconfig.app.json -typescript相关配置
    |-- tsconfig.json
    |-- tsconfig.node.json
    |-- vite.config.ts
    |-- server - 本地调试
    |   |-- config.cjs
    |   |-- index.cjs
    |-- src
        |-- devIndex.ts - 本地启动入口文件，用于本地实时预览样式
        |-- index.ts - 项目主要入口文件，与苍穹交互相关逻辑
        |-- components - 组件
        |   |-- App.vue
        |   |-- Index.vue
        |-- types
        |   |-- index.d.ts
        |-- utils
            |-- eventBus.ts