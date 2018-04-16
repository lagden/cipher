# Cipher

[![NPM version][npm-img]][npm]
[![XO code style][xo-img]][xo]


[npm-img]:         https://img.shields.io/npm/v/@xet/cipher.svg
[npm]:             https://www.npmjs.com/package/@xet/cipher
[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo

-----

Encrypt and decrypt

## Install

```
$ npm i -S @xet/cipher
```


## Usage

```js
const {encrypt, decrypt} = require('@xet/cipher')

const msg = 'secrect message'
const encryptedMsg = encrypt(msg)
// => R6Sgvs8UdiPhPiHwyH+5REMEhK2NTsRT+tRjnhfAyN3skLc1vALrvQVk229rq3fHuopncGb+fiQSUfkuWc7W8A==

const r = decrypt(encryptedMsg)
// => secrect message
```


## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Thiago Lagden" width="100">](http://lagden.in)


## License

MIT © [Thiago Lagden](http://lagden.in)
