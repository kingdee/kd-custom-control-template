# Vue 2 + TypeScript + Vite

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
    |-- .gitignore -配置git上传时忽略文件
    |-- .prettierrc - 代码格式化相关
    |-- auto-imports.d.ts
    |-- components.d.ts
    |-- index.html - html模板文件
    |-- package.json -项目描述文件
    |-- postcss.config.cjs - postcss插件配置
    |-- README.md
    |-- tsconfig.app.json -typescript相关配置
    |-- tsconfig.json
    |-- vite.config.ts- 打包配置
    |-- server - 本地调试
    |   |-- config.cjs
    |   |-- index.cjs
    |-- src
        |-- devIndex.ts - 本地启动入口文件，用于本地实时预览样式
        |-- index.ts - 项目主要入口文件，与苍穹交互相关逻辑
        |-- vite-env.d.ts
        |-- components - 组件
        |   |-- App.vue
        |   |-- Index.vue
        |-- types - ts类型
        |   |-- index.d.ts
        |-- utils
            |-- eventBus.ts