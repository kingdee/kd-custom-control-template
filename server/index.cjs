const express = require('express')
const app = express()
const path = require('path')
const serveIndex = require('serve-index')
const fs = require('fs-extra')
const config = require('./config.cjs')
const isvDir = path.join(__dirname, 'isv')
const { isvId, moduleId, schemaId } = config

// 检查配置文件中的值是否为空
if (!isvId || !moduleId || !schemaId) {
  console.error('配置文件 server/config.js 缺少必要的字段。')
  process.exit(1) // 退出进程
}
// 创建目录的路径
const targetDir = path.join(__dirname, 'isv', isvId, moduleId, schemaId)
// 定义源目录，即 dist 目录
const sourceDir = path.join(__dirname, '../dist')
// 检查 dist 目录是否存在
if (!fs.existsSync(sourceDir)) {
  console.warn('请先执行 "yarn build"。')
  process.exit(1) // 终止进程
}

fs.ensureDir(targetDir) // 确保目录存在
  .then(() => {
    return fs.copy(sourceDir, targetDir) // 拷贝文件
  })
  .then(() => {
    //设置跨域访问
    app.all('*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', 'https://feature.kingdee.com:1026')
      res.header('Access-Control-Allow-Credentials', true)
      res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
      res.header('Content-Type', 'text/css;text/javascript;text/html;application/json;application/x-img')
      next()
    })
    // 启动 Express 服务
    app.use('/', express.static(path.join(__dirname, '../server')))
    app.use('/', serveIndex(path.join(__dirname, '../server'), { icons: true }))

    // http://localhost:3001/
    app.listen(3001, () => {
      console.log('CustomControl Static Server is Running! http://localhost:3001')
    })
    process.on('SIGINT', () => {
      fs.remove(isvDir)
        .then(() => {
          process.exit(0)
        })
        .catch((err) => {
          console.error('Error removing directory:', err)
          process.exit(1)
        })
    })
  })
  .catch((err) => {
    console.error('Error copying files:', err)
  })
