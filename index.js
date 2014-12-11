module.exports = garr

function garr(generator) {
  return function(arguments) {
    var g = new generator(arguments)
    handleGenerator(g, null, false)
  }
}

function handleGenerator(generator, asyncFunc, done) {
  if (done) {
    return
  } if (asyncFunc) {
    asyncFunc(function(err, result) {
      if (err)
        generator.throw(err)
      else {
        var result = generator.next(result)
        handleGenerator(generator, result.value, result.done)
      }
    })
  } else {
    var result = generator.next()
    handleGenerator(generator, result.value, result.done)
  }
}
