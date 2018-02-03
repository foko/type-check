import test from 'ava'
import { validate } from './helpers'

function getValue (code) {
  try {
    /* eslint no-eval: off */
    return [eval(`
      (function () {
        return ${code}
      }())
    `)]
  } catch (e) {
    return []
  }
}

test(t => validate(t, 'function', [
  function () {}, // unnamed func
  function a () {}, // named func

  () => 0, // arrow func

  function * () {}, // unnamed generator
  function * b () {}, // named generator
].concat(
  getValue(`async function () {}`), // named async function
  getValue(`async function a () {}`), // unnamed async function

  getValue(`async function * () {}`), // named async generator function
  getValue(`async function * b () {}`) // unnamed async generator function
)))
