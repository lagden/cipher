'use strict'

import test from 'ava'
import {encrypt, decrypt, randomBytes} from '../.'

test('encrypt and decrypt', t => {
	const msg = 'secrect message'
	const encryptedMsg = encrypt(msg)
	const r = decrypt(encryptedMsg)
	t.is(r, msg)
})

test('decrypt invalid', t => {
	const r = decrypt('uXEA3zxqr2TGfttsEE5IkXOzQXhvYdkLrBE92Wchaau40Aqu+EKJFEjwrF6YPulDfqglkEkXSvLW7qmHj48oIA==')
	t.false(r)
})

test('decrypt bad', t => {
	const error = t.throws(() => {
		decrypt('pA0oAi5PPYPwCy/3QaIg+3qKX/DRS1O9PxsjYZDie2pDQjKYfZshAz32y+R8pdoExFPEp8jeC/HLb/YV/CyPnw==')
	}, Error)
	t.is(error.message, 'error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt')
})

test('randomBytes', t => {
	const buf = randomBytes()
	t.is(buf.length, 16)
})
