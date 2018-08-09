'use strict'

import test from 'ava'
import {encrypt, decrypt, randomBytes, generateKey} from '..'

test('encrypt and decrypt', t => {
	const msg = 'secrect message'
	const encryptedMsg = encrypt(msg)
	const r = decrypt(encryptedMsg)
	t.is(r, msg)
})

test('[options] encrypt and decrypt', t => {
	const options = {
		_algHmac: 'sha1',
		_algCypher: 'aes-256-cbc',
		_key: 'apenas um show',
		_outputEncoding: 'hex',
		_sizeKey: 32,
		_sizeIV: 16
	}
	const msg = 'secrect message'
	const encryptedMsg = encrypt(msg, options)
	const r = decrypt(encryptedMsg, options)
	t.is(r, msg)
})

test('decrypt invalid', t => {
	const r = decrypt('31iYCFe7Vvf2eqL527cJdyFsauA6kRI4z9umescFHxjTh4Sc7Vw9Fliga2Sy4QdwA3TP0uMmtGvF1B3pZ4dbwg==')
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

test('generateKey', t => {
	const buf = generateKey('my key')
	t.is(buf.length, 16)
	t.is(buf.toString('hex'), '6acd55361508378a866422bf737beae6')
})

test('encrypt and decrypt with quotes', t => {
	const msg = 'secrect message "with" "quotes" "more quotes"'
	const encryptedMsg = encrypt(msg)
	const r = decrypt(encryptedMsg)
	t.is(r, msg)
})

test('more quotes', t => {
	const msg = '"foo" bar "foo" baz "foo" bar'
	const encryptedMsg = encrypt(msg)
	const r = decrypt(encryptedMsg)
	t.is(r, msg)
})
