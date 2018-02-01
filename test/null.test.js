import test from 'ava'
import { validate } from './helpers'

test(t => validate(t, 'null', [
  null,
]))
