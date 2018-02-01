/**
 * @file index.js
 * @license MIT
 * @copyright 2018-present Karim Alibhai.
 */

function typeOf (value) {
  if (value === null) {
    return 'null'
  }

  if (Array.isArray(value)) {
    return 'array'
  }

  return typeof value
}

/**
 * Throws a TypeError when value does not match type based
 * on typeOf() value.
 */
function typeAssert (type, value) {
  if (typeOf(value) !== type) {
    throw new TypeError(`Unexpected value of type: ${type}`)
  }
}

const PRIMITIVES = {
  // native types
  undefined: 1,
  object: 1,
  boolean: 1,
  number: 1,
  string: 1,
  symbol: 1,
  function: 1,

  // special typeof checks
  null: 1,
  array: 1,
}

// checks that cannot be completed through usual typeOf check
const TYPES = {
  any (value) {
    return value !== undefined && value !== null
  },
}

function typeCheck (type, value) {
  typeAssert('string', type)

  /**
   * Primitives are easy. Just use typeof.
   */
  if (PRIMITIVES[type] === 1) {
    return typeAssert(type, value)
  }

  /**
   * Get special typechecker.
   */
  const typeChecker = TYPES[type]

  if (!typeChecker) {
    throw new Error(`Unsupported type: ${type}`)
  }

  if (!typeChecker(value)) {
    throw new TypeError(`Unexpected value of type: ${typeOf(value)}`)
  }
}

module.exports = typeCheck
