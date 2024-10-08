const express = require('express')
const app = express()
const path = require('path')
const serveIndex = require('serve-index')
const fs = require('fs-extra')
const isvDir = path.join(__dirname, 'isv')

// 定义源目录，即 dist 目录
const sourceDir = path.join(__dirname, '../dist')
// 检查 dist 目录是否存在
if (!fs.existsSync(sourceDir)) {
  console.warn('请先执行 "yarn build"。')
  process.exit(1) // 终止进程
}

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
  console.log('CustomControl Static Server: http://localhost:3001 is Running!')
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
