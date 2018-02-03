/**
 * @file test/helpers/index.js
 * @license MIT
 * @copyright 2018-present Karim Alibhai.
 */

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

    t.regex(String(err).split('\n')[0], new RegExp(type), 'error message should contain expected type')
  }

  if (testOptional) {
    return validate(t, type + '?', valid.concat([ undefined, null ]), false)
  }
}
