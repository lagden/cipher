/**
 * Módulo Cipher
 * @module index
 */

/* eslint camelcase: 0 */

'use strict'

const crypto = require('crypto')

/**
 * Gera um hash
 *
 * @param {string} salt - Valor
 * @param {int} [size=16] size - Tamanho de bytes
 * @param {string} [alg='sha512'] - Algoritmo
 * @returns {buffer} - Retorna um bufer
 */
function _genKey(salt, size = 16, alg = 'sha512') {
	const buf = crypto.createHash(alg).update(salt).digest()
	return buf.slice(0, size)
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
 * @param {string} value                             - Valor
 * @param {object} [options={}]                      - Opções
 * @param {string} [options._algHmac=HMAC_ALG]       - Algoritmo para o HMAC
 * @param {string} [options._alg=CIPHER_ALG]         - Algoritmo para cifra
 * @param {string} [options._key=CIPHER_KEY]         - Chave
 * @param {string} [options._outputEncoding=base64]  - Codificação de caracteres
 * @param {int}    [options._sizeKey=16]             - Tamanho da chave
 * @param {int}    [options._sizeIV=16]              - Tamanho do IV
 * @returns {string}                                 - Retorna o valor criptografado
 */
function encrypt(value, options = {}) {
	const {
		_algHmac = HMAC_ALG,
		_algCypher = CIPHER_ALG,
		_key = CIPHER_KEY,
		_outputEncoding = 'base64',
		_sizeKey = 16,
		_sizeIV = 16
	} = options
	const key = _genKey(_key, _sizeKey)
	const iv = randomBytes(_sizeIV)
	const cipher = crypto.createCipheriv(_algCypher, key, iv)
	const encryptedUpdate = cipher.update(value)
	const encryptedFinal = cipher.final()
	const encrypted = Buffer.concat([encryptedUpdate, encryptedFinal], encryptedUpdate.length + encryptedFinal.length)
	const hmac = crypto.createHmac(_algHmac, key).update(encrypted).digest()
	const totalLength = iv.length + hmac.length + encrypted.length
	const resultBuff = Buffer.concat([iv, hmac, encrypted], totalLength)
	return resultBuff.toString(_outputEncoding)
}

/**
 * Descriptografa um valor
 *
 * @param {string} encrypted                        - Valor criptografado
 * @param {object} [options={}]                      - Opções
 * @param {string} [options._algHmac=HMAC_ALG]       - Algoritmo para o HMAC
 * @param {string} [options._alg=CIPHER_ALG]         - Algoritmo para cifra
 * @param {string} [options._key=CIPHER_KEY]         - Chave
 * @param {string} [options._outputEncoding=base64]  - Codificação de caracteres
 * @param {int}    [options._sizeKey=16]             - Tamanho da chave
 * @param {int}    [options._sizeIV=16]              - Tamanho do IV
 * @returns {(string|boolean)}                      - Retorna o valor descriptografado ou false
 */
function decrypt(encrypted, options = {}) {
	const {
		_algHmac = HMAC_ALG,
		_algCypher = CIPHER_ALG,
		_key = CIPHER_KEY,
		_outputEncoding = 'base64',
		_sizeKey = 16,
		_sizeIV = 16
	} = options
	const _algSize = {sha1: 20, sha256: 32, sha512: 64}
	const buf = Buffer.from(encrypted, _outputEncoding)
	const key = _genKey(_key, _sizeKey)
	const iv = buf.slice(0, _sizeIV)
	const hmac = buf.slice(_sizeIV, _algSize[_algHmac] + _sizeIV)
	const encrypted_value = buf.slice(_sizeIV + _algSize[_algHmac])
	const _hmac = crypto.createHmac(_algHmac, key).update(encrypted_value).digest()
	const decipher = crypto.createDecipheriv(_algCypher, key, iv)
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
exports.generateKey = _genKey
