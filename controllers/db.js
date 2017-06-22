var mongo = require('mongodb')
var MongoClient = mongo.MongoClient

exports.ObjectID = mongo.ObjectID

var url = 'mongodb://localhost:27017/itcast'

// 一个函数内部，需要 3 秒之后返回一个数据
// 我希望调用这个函数，拿到该函数 3 秒之后的返回结果

// function getResult(callback) {
//   setTimeout(function () {
//     var result = 'hello world'
//     callback(result)
//   }, 3000)
// }
// getResult(function (data) {
//   console.log(data)
// })

function _connect(callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      return callback(err)
    }
    callback(null, db)
  })
}

exports.insertOne = function (collectionName, doc, callback) {
  _connect(function (err, db) {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .insertOne(doc, function (err, result) {
        if (err) {
          return callback(err)
        }
        callback(null, result)
        db.close()
      })
  })
}

exports.findOne = function (collectionName, conditionDoc, callback) {
  _connect(function (err, db) {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .findOne(conditionDoc, function (err, result) {
        if (err) {
          return callback(err)
        }
        callback(null, result)
        db.close()
      })
  })
}

exports.find = function (collectionName, conditionDoc, callback) {
  _connect(function (err, db) {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .find(conditionDoc)
      .toArray(function (err, docs) {
        if (err) {
          return callback(err)
        }
        callback(null, docs)
        db.close()
      })
  })
}

exports.deleteOne = function (collectionName, conditionDoc, callback) {
  _connect(function (err, db) {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .deleteOne(conditionDoc, function (err, result) {
        if (err) {
          return callback(err)
        }
        callback(null, result)
      })
  })
}

exports.updateOne = function (collectionName, conditionDoc, doc, callback) {
  _connect(function (err, db) {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .updateOne(conditionDoc, doc, function (err, result) {
        if (err) {
          return callback(err)
        }
        callback(null, result)
      })
  })
}
