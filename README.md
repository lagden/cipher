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
// => 3GiXInSVcUt4ycYWTEG64YRYAik02hCg6K+L0abtEtII/Fj7NzFSkx0BsOZElOBP8iWwfjXcwpZrCAVdnSViMg==

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
  _sizeKey: 32,
  _sizeIV: 16
}

const msg = 'secrect message'
const encrypted = encrypt(msg, options)
// => 55e163eedaecff78fb278f247376bcddbaddbd98a4d3a7c2ab79d142a1f572f7eed3dbede31af5bbbfadeee9356449c5d5b25103

const decrypted = decrypt(encryptedMsg, options)
// => secrect message
```


## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Thiago Lagden" width="100">](http://lagden.in)
[<img src="https://avatars.githubusercontent.com/u/31932885?s=390" alt="Thin" width="100">](https://github.com/ThinMingLeongChen)


## License

MIT © [Thiago Lagden](http://lagden.in)
