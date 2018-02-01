# type-check [![Build Status](https://travis-ci.org/karimsa/type-check.svg?branch=master)](https://travis-ci.org/karimsa/type-check) [![codecov](https://codecov.io/gh/karimsa/type-check/branch/master/graph/badge.svg)](https://codecov.io/gh/karimsa/type-check) [![Greenkeeper badge](https://badges.greenkeeper.io/karimsa/type-check.svg)](https://greenkeeper.io/)

Assert-style intrusive type checks.

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

 - undefined
 - object
 - boolean
 - number
 - string
 - symbol
 - function
 - null
 - array
 - regexp

*If you would like to make any of these "optional" (i.e. any above value, or undefined - simply append "?" to the end)*

### Required vs. Optional

```javascript
function add (a, b) {
  typeCheck('number', a)
  typeCheck('number?', b)

  return a + (b || 1)
}

add(1) // this does not error out anymore, now returns 2
```

## License

Licensed under MIT license.
