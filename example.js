var arr = ['index.js', 'example.js']
  , thunkify = require('thunkify')
  , fs = require('fs')
  , read = thunkify(fs.readFile)
  , garr = require('./index')

arr.forEach(garr(function*(val) {
  try {
    var data = yield read('./' + val, 'utf8')
    console.log(data)
  } catch (e) {
    console.log(e)
    console.log("Got an error")
  }
}))
