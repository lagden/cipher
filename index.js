/**
 * Módulo Cipher
 * @module index
 */

/* eslint camelcase: 0 */

'use strict'

const crypto = require('crypto')

/**
 * Gera um buffer md5
 *
 * @param {string} value - valor
 * @returns {buffer}
 */
function md5(value) {
	return crypto.createHash('md5').update(value).digest()
}

/**
 * Gera um buffer randômico
 *
 * @param {int} size - Tamanho de bytes
 * @returns {buffer}
 */
function randomBytes(size = 16) {
	return crypto.randomBytes(size)
}

/**
 * Environment variables
 * @constant {string}  [CIPHER_KEY=abc1234]     - Chave utilizado para gerar a cifra e asinatura
 * @constant {string}  [CIPHER_ALG=aes-128-cbc] - Algoritmo para 'encrypt' e 'decrypt'
 */
const {
	CIPHER_KEY = '08406a6e18bdf83010ddd1187251454d',
	CIPHER_ALG = 'aes-128-cbc'
} = process.env

/**
 * Criptografa um valor
 *
 * @param {string} value             - valor
 * @param {string} [_key=CIPHER_KEY] - Chave utilizado para gerar a cifra e asinatura
 * @returns {string}
 */
function encrypt(value, _key = CIPHER_KEY) {
	const fullkey = md5(_key).toString('hex')
	const key = fullkey.slice(0, 16)
	const iv = crypto.randomBytes(16)
	const cipher = crypto.createCipheriv(CIPHER_ALG, key, iv)
	cipher.update(Buffer.from(value, 'utf8'))
	const encrypted_value = cipher.final()
	const hmac = crypto.createHmac('sha256', fullkey).update(encrypted_value).digest()
	const totalLength = iv.length + hmac.length + encrypted_value.length
	const encrypted_buf = Buffer.concat([iv, hmac, encrypted_value], totalLength)
	return encrypted_buf.toString('base64')
}

/**
 * Descriptografa um valor
 *
 * @param {string} encrypted         - valor criptografado
 * @param {string} [_key=CIPHER_KEY] - Chave utilizado para gerar a cifra e asinatura
 * @returns {string}
 */
function decrypt(encrypted, _key = CIPHER_KEY) {
	const fullkey = md5(_key).toString('hex')
	const key = fullkey.slice(0, 16)
	const buf = Buffer.from(encrypted, 'base64')
	const iv = buf.slice(0, 16)
	const hmac = buf.slice(16, 48)
	const encrypted_value = buf.slice(48)
	const _hmac = crypto.createHmac('sha256', fullkey).update(encrypted_value).digest()
	const decipher = crypto.createDecipheriv(CIPHER_ALG, key, iv)
	let decrypted = decipher.update(encrypted_value)
	decrypted += decipher.final()
	if (crypto.timingSafeEqual(hmac, _hmac)) {
		return decrypted
	}
	return false
}

exports.encrypt = encrypt
exports.decrypt = decrypt
exports.randomBytes = randomBytes
exports.md5 = md5
