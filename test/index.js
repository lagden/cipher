import test from 'ava'
import {encrypt, decrypt} from '../src/cipher.js'

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
		_lenKey: 32,
		_lenIV: 16,
		_useHex: true
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
	t.throws(() => {
		decrypt('pA0oAi5PPYPwCy/3QaIg+3qKX/DRS1O9PxsjYZDie2pDQjKYfZshAz32y+R8pdoExFPEp8jeC/HLb/YV/CyPnw==')
	}, {instanceOf: Error, message: 'error:06065064:digital envelope routines:EVP_DecryptFinal_ex:bad decrypt'})
})

test('decrypt md5', t => {
	const msg = 'MBNimbk%r4B$a4'
	const options = {
		_algKey: 'md5',
		_key: 'NimbleRulezz',
		_useHex: true
	}
	const encryptedMsg = 'EKSP4pUeu77b/RFsD1UpMynX8LPfqLIvwMDlOmFbap4Km9IuX10AxSfdOsOucAZggdH2mqutMo/zLl1ta9dSVg=='
	const r = decrypt(encryptedMsg, options)
	t.is(r, msg)
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

test('chat test', t => {
	const encryptedMsg = 'LXPxb+Failp9DxQtsy5Zqsr8UZ8TBKkQz69hhglajXsZ/Ql8zXA9In2fO/J6d0h63CWrdyXeqHA41IgcPRQnHQ=='
	const r = decrypt(encryptedMsg, {
		_algKey: 'md5',
		_key: '37046_222855',
		_useHex: true
	})
	t.is(r, 'Hi!')
})
