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
 * @param {string} v - Valor
 * @returns {buffer} - Retorna um bufer
 */
function md5(v) {
	return crypto.createHash('md5').update(v).digest()
}

/**
 * Gera um buffer randômico
 *
 * @param {int} size - Tamanho de bytes
 * @returns {buffer} - Retorna um bufer
 */
function randomBytes(size = 16) {
	return crypto.randomBytes(size)
}

/**
 * Environment variables
 * @constant {string}  [CIPHER_KEY=abc1234]     - Chave utilizado para gerar a cifra
 * @constant {string}  [CIPHER_ALG=aes-128-cbc] - Algoritmo para cifra
 * @constant {string}  [HMAC_ALG=sha256]        - Algoritmo para o HMAC
 */
const {
	CIPHER_KEY = '08406a6e18bdf83010ddd1187251454d',
	CIPHER_ALG = 'aes-128-cbc',
	HMAC_ALG = 'sha256'
} = process.env

/**
 * Criptografa um valor
 *
 * @param {string} value                            - Valor
 * @param {object} [options={}]                     - Opções
 * @param {string} [options._algHmac=HMAC_ALG]      - Algoritmo para o HMAC
 * @param {string} [options._alg=CIPHER_ALG]        - Algoritmo para cifra
 * @param {string} [options._key=CIPHER_KEY]        - Chave
 * @param {string} [options._encoding=base64]       - Codificação de caracteres
 * @param {int}    [options._size=16]               - Tamanho do IV
 * @param {int}    [options._sizeKey=16]            - Tamanho da chave
 * @returns {string}                                - Retorna o valor criptografado
 */
function encrypt(value, options = {}) {
	const {_algHmac = HMAC_ALG, _alg = CIPHER_ALG, _key = CIPHER_KEY, _encoding = 'base64', _size = 16, _sizeKey = 16} = options
	const fullkey = md5(_key).toString('hex')
	const key = fullkey.slice(0, _sizeKey)
	const iv = crypto.randomBytes(_size)
	const cipher = crypto.createCipheriv(_alg, key, iv)
	const encryptedText = cipher.update(value)
	const encryptedFinal = cipher.final()
	const encryptedValue = Buffer.concat([encryptedText, encryptedFinal], encryptedText.length + encryptedFinal.length)
	const hmac = crypto.createHmac(_algHmac, fullkey).update(encryptedValue).digest()
	const totalLength = iv.length + hmac.length + encryptedValue.length
	const encryptedBuf = Buffer.concat([iv, hmac, encryptedValue], totalLength)
	return encryptedBuf.toString(_encoding)
}

/**
 * Descriptografa um valor
 *
 * @param {string} encrypted                        - Valor criptografado
 * @param {object} [options={}]                     - Opções
 * @param {string} [options._algHmac=HMAC_ALG]      - Algoritmo para o HMAC
 * @param {string} [options._alg=CIPHER_ALG]        - Algoritmo para cifra
 * @param {string} [options._key=CIPHER_KEY]        - Chave
 * @param {string} [options._encoding=base64]       - Codificação de caracteres
 * @param {int}    [options._size=16]               - Tamanho do IV
 * @param {int}    [options._sizeKey=16]            - Tamanho da chave
 * @returns {(string|boolean)}                      - Retorna o valor descriptografado ou false
 */
function decrypt(encrypted, options = {}) {
	const _algSize = {
		sha1: 20,
		sha256: 32
	}
	const {_algHmac = HMAC_ALG, _alg = CIPHER_ALG, _key = CIPHER_KEY, _encoding = 'base64', _size = 16, _sizeKey = 16} = options
	const fullkey = md5(_key).toString('hex')
	const key = fullkey.slice(0, _sizeKey)
	const buf = Buffer.from(encrypted, _encoding)
	const iv = buf.slice(0, _size)
	const hmac = buf.slice(_size, _algSize[_algHmac] + _size)
	const encrypted_value = buf.slice(_algSize[_algHmac] + _size)
	const _hmac = crypto.createHmac(_algHmac, fullkey).update(encrypted_value).digest()
	const decipher = crypto.createDecipheriv(_alg, key, iv)
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
