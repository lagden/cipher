# Cipher

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![XO code style][xo-img]][xo]


[npm-img]:         https://img.shields.io/npm/v/@xet/cipher.svg
[npm]:             https://www.npmjs.com/package/@xet/cipher
[ci-img]:          https://travis-ci.org/lagden/cipher.svg
[ci]:              https://travis-ci.org/lagden/cipher
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo

-----

Encrypt and decrypt


## Install

```
$ npm i -S @xet/cipher
```


## Usage

Simple usage

```js
const {encrypt, decrypt} = require('@xet/cipher')

const msg = 'secrect message'
const encrypted = encrypt(msg)
// => JkE4Mu4CBw3uaG1b6/1KQ118k2zBzARN/vyyaXmXxRtf1cjMCjhltvsJVd2wGnd90mTowHvc1h8JqCT1VbJVNw==

const decrypted = decrypt(encryptedMsg)
// => secrect message
```

With options

```js
const {encrypt, decrypt} = require('@xet/cipher')

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
const encrypted = encrypt(msg, options)
// => aa4ec6cb1747a3b6ad161aeeba3ace7e16e11866c3eedea0c994329d250d275be3a43011ff9ac5fba62510cf60eafaeb3617507b

const decrypted = decrypt(encryptedMsg, options)
// => secrect message
```


## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Thiago Lagden" width="100">](http://lagden.in)
[<img src="https://avatars.githubusercontent.com/u/31932885?s=390" alt="Thin" width="100">](https://github.com/ThinMingLeongChen)


## License

MIT © [Thiago Lagden](http://lagden.in)
