module.exports = garr

function garr(generator) {
  var iteratorIndex = -1
    , iterators = []

  var handleGenerator = function(generator, asyncFunc, done) {
    if (done) {
      var nextFunc = iterators[iteratorIndex].shift()
      if (nextFunc !== undefined) {
        nextFunc()
      }
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

  var iterator = function(arguments) {
    var g = generator(arguments)
    var numOfGenerators = iterators[iteratorIndex].push(handleGenerator.bind(null, g, null, false))
    if (numOfGenerators === 1) {
      (iterators[iteratorIndex].shift())()
    }
  }

  iteratorIndex = iterators.push(iterator) - 1
  iterators[iteratorIndex] = []

  return iterator
}

