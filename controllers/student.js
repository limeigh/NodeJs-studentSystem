var db = require('./db')


exports.index = function (req, res) {
  res.render('student/list', {
    foo: 'bar'
  })
}

exports.list = function (req, res) {
  db.find('students', {}, function (err, docs) {
    if (err) {
      return res.json({
        err_no: 500,
        message: '查询数据失败，请稍后重试'
      })
    }
    // res.json 就相当于：
    // res.end(JSON.stringify(Object))
    res.json({
      err_no: 0,
      data: docs
    })
  })
}

exports.new = function (req, res) {
  res.render('student/new')
}

exports.doNew = function (req, res) {
  db.insertOne('students', req.body, function (err, result) {
    if (err) {
      return res.json({
        err_no: 500,
        message: '服务器忙，请稍后重试'
      })
    }
    res.json({
      err_no: 0,
      message: 'insert success'
    })
  })
}

exports.info = function (req, res) {
  var id = req.query.id
  db.findOne('students', {
    _id: db.ObjectID(id)
  }, function (err, doc) {
    if (err) {
      return res.json({
        err_no: 500,
        message: '操作数据库失败了'
      })
    }
    console.log(doc)
    res.render('student/info', {
      student: doc
    })
  })
}

exports.remove = function (req, res) {
  // Express 框架中的路由已经自动帮你把请求路径中的查询字符串解析处理过了
  // 也就是说 Express 中的路由判断的请求路径部分（不包含查询字符串）
  // 由于你自己知道你的请求路径中有一个 id 查询字符串，所以这里可以直接获取那个 id
  // 如果你的请求路径中查询字符串的键名不叫 id ，例如是 ?abx=xx
  // 则你获取的时候就需要 req.query.abc 来获取 abc 在查询字符串中对应的值了
  var id = req.query.id
  db.deleteOne('students', {
    _id: db.ObjectID(id)
  }, function (err, result) {
    if (err) {
      return res.json({
        err_no: 500,
        message: '操作数据库失败'
      })
    }

    res.json({
      err_no: 0,
      message: 'success'
    })

    // res.redirect 就是重定向方法
    // 用来告诉客户端浏览器，你重新请求这个路径吧
    // 对于异步请求来说，服务端的 redirect 是不管用的
    // res.redirect('/students')
  })
}

exports.edit = function (req, res) {
  var id = req.query.id
  db.findOne('students', {
    _id: db.ObjectID(id)
  }, function (err, doc) {
    if (err) {
      return res.json({
        err_no: 500,
        message: '读取数据失败，请稍后重试'
      })
    }
    res.render('student/edit', {
      student: doc,
      majors: [
        'Java',
        'UI',
        'IOS',
        '前端与移动开发',
        '全干'
      ]
    })
  })
}

exports.doEdit = function (req, res) {
  var body = req.body
  var id = body.id

  // 这里把请求体中的 id 删除，目的是下面要把请求体整体更新到原来的数据对象中
  // 如果不删除这个 id ，那么 id 会作为一个普通数据字段被添加到原来的数据对象中
  // 虽然把 id 作为普通字段放进去也没有影响，但是会造成数据结构不统一
  delete body.id
  db.updateOne('students', {
    _id: db.ObjectID(id)
  }, {
    $set: body
  }, function (err, result) {
    if (err) {
      return res.json({
        err_no: 500,
        message: '更新失败，请稍后重试'
      })
    }
    res.json({
      err_no: 0,
      message: 'success'
    })
  })
}
