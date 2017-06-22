var express = require('express')
var index = require('./controllers/index')
var student = require('./controllers/student')

/**
 * 路由模块：
 *   就是给不同的请求方法+请求路径设定具体的处理函数（处理函数中具体做什么取决于开发人员）
 *   这就是路由映射
 */

var router = express.Router()

router
  .get('/', index.index)

router
  .get('/students', student.index)
  .get('/students/info', student.info)
  .get('/students/list', student.list)
  .get('/students/new', student.new)
  .post('/students/new', student.doNew)
  // /students/remove 的形式
  // /students/remove?xx=xx&xx=xx
  // http://127.0.0.1:3000/students/remove?id=58808f24e7b62d26349274ca
  // Express 这里会自动将请求路径中的查询字符串 xx=xx&xx=xx 解析为一个对象 { key: value, key:value }
  // 然后将解析到的查询字符串对象挂载给 req.query 属性
  // 你在后面的处理函数中就可以直接通过 req.query 来获取当前请求路径中查询字符串中的数据了
  .get('/students/remove', student.remove)
  .get('/students/edit', student.edit)
  .post('/students/edit', student.doEdit)

module.exports = router
