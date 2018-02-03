# type-check [![Build Status](https://travis-ci.org/karimsa/type-check.svg?branch=master)](https://travis-ci.org/karimsa/type-check) [![codecov](https://codecov.io/gh/karimsa/type-check/branch/master/graph/badge.svg)](https://codecov.io/gh/karimsa/type-check) [![Greenkeeper badge](https://badges.greenkeeper.io/karimsa/type-check.svg)](https://greenkeeper.io/)

Assert-style non-intrusive type checks.

## Usage

It works similar to `assert()` where you simply state what should happen and then continue
to operate. If the type check fails, a valid `TypeError` is thrown and your function will halt.

Simple example:

```javascript
function add (a, b) {
  typeCheck('number', a)
  typeCheck('number', b)

  return a + b
}

add(1, 1) // returns 2
add('1', 1) // throws TypeError
add('1') // throws TypeError
add(1) // throws TypeError
// etc.
```

## Available Types

Type detection is handled by [type-detect](https://npmjs.org/type-detect) by the lovely team over at
chaijs. If you would like to use your own type detection, you can swap it out by replacing the function
at `typeCheck.typeOf`:

```javascript
const typeCheck = require('@karimsa/type-check')

// this replaces the type-detect typeOf function with just a native
// use of typeof (which is faster but less useful)
typeCheck.typeOf = function (value) {
  return typeof value
}
```

*If you would like to make types optional (i.e. the type, undefined, or null) - just append `?` to the end
of the type name.*

Example with optional types:

```javascript
// all valid
typeCheck('number?', 2)
typeCheck('number?', undefined)
typeCheck('number?', null)

// invalid
typeCheck('number?', '2')
```

## License

Licensed under MIT license.
