var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var router = require('./router')

var app = express()

// 将 node_modules 开放为公共资源，可以以路径的形式直接访问该目录中任意资源
app.use('/node_modules/', express.static(path.join(__dirname, 'node_modules')))

// 配置使用 ejs 模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 配置 body-parser 插件，用来解析表单 POST 请求体
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 挂载路由
app.use(router)

app.listen(3000,'127.0.0.1', function () {
  console.log('running...')
})
