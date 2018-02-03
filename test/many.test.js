import test from 'ava'
import { validate } from './helpers'

test(t => validate(t, ['string', 'number'], [
  '',
  '123',
  'hello',
  123,
  0,
  -123,
]))
