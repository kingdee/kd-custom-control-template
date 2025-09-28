# KWC + webpack5

#### 开发
```
yarn install
yarn dev
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
    |-- .vscode  
    |-- .gitignore -配置git上传时忽略文件
    |-- package.json -项目描述文件
    |-- eslint.config.js - eslint配置
    |-- kwc.config.json - kwc配置
    |-- README.md
    |-- jsconfig.json
    |-- build - 打包配置
    |   |-- webpack.common.js
    |   |-- webpack.dev.js
    |   |-- webpack.prod.js
    |-- server - 本地调试
    |   |-- config.js
    |   |-- index.js
    |-- src
    |   |-- devIndex.js - 本地启动入口文件，用于本地实时预览样式
    |   |-- index.js - 项目主要入口文件，与苍穹交互相关逻辑
    |   |-- components - 组件
    |   |   |-- [name]  - 组件命名空间
    |   |       |-- App.html
    |   |       |-- App.js
    |   |       |-- App.css
    |-- static
        |-- lang - 多语言词条
            |-- zh_CN.json