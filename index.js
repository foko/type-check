/**
 * @file index.js
 * @license MIT
 * @copyright 2018-present Karim Alibhai.
 */

'use strict'

const assert = require('assert')
const debug = require('debug')('type-check')

function createError (expected, given, isOptional) {
  return new TypeError(`Unexpected value of type "${given}" (expected ${expected}${isOptional ? '?' : ''})`)
}

/**
 * Throws a TypeError when value does not match type based
 * on typeOf() value.
 */
function typeAssert (type, value) {
  const isOptional = type[type.length - 1] === '?'
  const givenType = module.exports.typeOf(value)

  // trim the '?'
  if (isOptional) {
    type = type.substr(0, type.length - 1)
  }

  debug('testing %o type for value %o', type, value)

  // types match, everyone is happy
  if (givenType === type) {
    return
  }

  // if its optional, then don't fail for undefined or null
  if (isOptional && (value === undefined || value === null)) {
    return
  }

  // otherwise throw error
  throw createError(type, givenType, isOptional)
}

function typeAssertMany (types, value) {
  debug('trying to match %o to any of %o', value, types)

  for (const type of types) {
    try {
      typeAssert(type, value)

      // if didn't throw error, we have successfully
      // matched a type - exit right away
      return
    } catch (_) {
      debug('failed to match type %o for value %o', type, value)
    }
  }

  // if nothing matched, then die
  throw createError(`any of: ${types.join(', ')}`, module.exports.typeOf(value))
}

function typeCheck (type, value) {
  if (typeof type === 'string') {
    type = [type]
  }

  debug('typeCheck(%o, %o)', type, value)

  assert(type instanceof Array, 'type must be a valid array')
  typeAssertMany(type, value)
}

module.exports = typeCheck
module.exports.typeOf = value => typeof value

// es2015 support
module.exports.typeCheck = typeCheck
