/**
 * Módulo Cipher
 * @module index
 */

import crypto from 'node:crypto'

/**
 * Criptografa um valor
 *
 * @param {string} value                                           - Valor
 * @param {object} [options={}]                                    - Opções
 * @param {string} [options._algHmac=sha256]                       - Algoritmo para o HMAC
 * @param {string} [options._algCypher=aes-128-cbc]                - Algoritmo para cifra
 * @param {string} [options._algKey=sha512]                        - Algoritmo para chave
 * @param {string} [options._key=08406a6e18bdf83010ddd1187251454d] - Chave
 * @param {string} [options._outputEncoding=base64]                - Codificação de caracteres
 * @param {int}    [options._lenKey=16]                            - Tamanho da chave
 * @param {int}    [options._lenIV=16]                             - Tamanho do IV
 * @param {int}    [options._useHex=false]                         - Utiliza no formato hexadecimal
 * @returns {string}                                               - Retorna o valor criptografado
 */
export function encrypt(value, options = {}) {
	const {
		_algHmac = 'sha256',
		_algCypher = 'aes-128-cbc',
		_algKey = 'sha512',
		_key = '08406a6e18bdf83010ddd1187251454d',
		_outputEncoding = 'base64',
		_lenKey = 16,
		_lenIV = 16,
		_useHex = false
	} = options
	const keyBuff = crypto.createHash(_algKey).update(_key).digest()
	const keyHash = _useHex ? keyBuff.toString('hex') : keyBuff
	// _lenKey = crypto.cipherkeyLength(_algCypher)
	const key = keyHash.slice(0, _lenKey)
	const iv = crypto.randomBytes(_lenIV)
	const cipher = crypto.createCipheriv(_algCypher, key, iv)
	const encryptedUpdate = cipher.update(value)
	const encryptedFinal = cipher.final()
	const encrypted = Buffer.concat([encryptedUpdate, encryptedFinal], encryptedUpdate.length + encryptedFinal.length)
	const hmac = crypto.createHmac(_algHmac, keyHash).update(encrypted).digest()
	const result = Buffer.concat([iv, hmac, encrypted], iv.length + hmac.length + encrypted.length)
	return result.toString(_outputEncoding)
}

/**
 * Descriptografa um valor
 *
 * @param {string} encryptedValue                                  - Valor criptografado
 * @param {object} [options={}]                                    - Opções
 * @param {string} [options._algHmac=sha256]                       - Algoritmo para o HMAC
 * @param {string} [options._algCypher=aes-128-cbc]                - Algoritmo para cifra
 * @param {string} [options._algKey=sha512]                        - Algoritmo para chave
 * @param {string} [options._key=08406a6e18bdf83010ddd1187251454d] - Chave
 * @param {string} [options._outputEncoding=base64]                - Codificação de caracteres
 * @param {int}    [options._lenKey=16]                            - Tamanho da chave
 * @param {int}    [options._lenIV=16]                             - Tamanho do IV
 * @param {int}    [options._useHex=false]                         - Utiliza no formato hexadecimal
 * @returns {(string|boolean)}                                     - Retorna o valor descriptografado ou false
 */
export function decrypt(encryptedValue, options = {}) {
	const {
		_algHmac = 'sha256',
		_algCypher = 'aes-128-cbc',
		_algKey = 'sha512',
		_key = '08406a6e18bdf83010ddd1187251454d',
		_outputEncoding = 'base64',
		_lenKey = 16,
		_lenIV = 16,
		_useHex = false
	} = options
	const _lenAlg = {sha1: 20, sha256: 32, sha512: 64}
	const keyBuff = crypto.createHash(_algKey).update(_key).digest()
	const keyHash = _useHex ? keyBuff.toString('hex') : keyBuff
	// _lenKey = crypto.cipherkeyLength(_algCypher)
	const key = keyHash.slice(0, _lenKey)
	const buf = Buffer.from(encryptedValue, _outputEncoding)
	const iv = buf.slice(0, _lenIV)
	const hmac = buf.slice(_lenIV, _lenIV + _lenAlg[_algHmac])
	const encrypted = buf.slice(_lenIV + _lenAlg[_algHmac])
	const _hmac = crypto.createHmac(_algHmac, keyHash).update(encrypted).digest()
	const decipher = crypto.createDecipheriv(_algCypher, key, iv)
	const decryptedUpdate = decipher.update(encrypted)
	const decryptedFinal = decipher.final()
	const decrypted = Buffer.concat([decryptedUpdate, decryptedFinal], decryptedUpdate.length + decryptedFinal.length)
	return crypto.timingSafeEqual(hmac, _hmac) && decrypted.toString('utf8')
}
