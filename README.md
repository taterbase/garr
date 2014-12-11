#garr
*Easy array iteration with async generators*

##Installation
`npm install --save garr`

##Usage
```javascript
var garr = require('garr')
  , thunkify = require('thunkify')
  , func = thunkify(asyncFunc)
  , otherFunc = thunkify(otherAsyncFunc)

/* ... */

someArray.forEach(garr(function*(val) {
  var result = yield func(val)
  var otherResult = yield otherFunc(result)
}))
```

___

Made with ⚡️ by [@taterbase](https://twitter.com/taterbase)
