/**
 * @file test/helpers/index.js
 * @license MIT
 * @copyright 2018-present Karim Alibhai.
 */

'use strict'

const typeCheck = require('../../')

const samples = [
  true,
  false,
  undefined,
  null,
  '',
  '123',
  'hello',
  123,
  0,
  -123,
  {},
  [],
  /a/,
]

function getInvalid (valid) {
  const invalid = []

  for (const v of samples) {
    if (valid.indexOf(v) === -1) {
      invalid.push(v)
    }
  }

  return invalid
}

export function validate (t, type, valid, testOptional = true) {
  const invalid = getInvalid(valid)

  for (const value of valid) {
    t.notThrows(() => typeCheck(type, value))
  }

  for (const value of invalid) {
    const err = t.throws(() => typeCheck(type, value), TypeError)

    t.regex(String(err).split('\n')[0], (function () {
      if (typeof type === 'string') {
        return new RegExp(type)
      }

      return new RegExp(type.join('|'))
    }()), 'error message should contain expected type')
  }

  if (testOptional) {
    return validate(
      t,
      (
        typeof type === 'string'
        ? type + '?'
        : type.slice(0, type.length - 1).concat([ type[type.length - 1] + '?' ])
      ),
      valid.concat([ undefined, null ]),
      false
    )
  }
}
