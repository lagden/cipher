/* eslint unicorn/prefer-module: 0 */

module.exports = {
	env: {
		es2021: true,
		node: true,
		browser: true
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	extends: ['plugin:unicorn/recommended'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'no-console': 0,
		'no-debugger': 0,
		'no-unused-expressions': 0,
		// 'no-unused-expressions': [
		// 	'error',
		// 	{allowShortCircuit: true, allowTernary: true}
		// ],
		camelcase: 0,
		'capitalized-comments': 0,
		'spaced-comment': 0,
		'padding-line-between-statements': 0,
		'no-new-func': 0,
		'no-undef-init': 0,
		'unicorn/filename-case': 0,
		'unicorn/prevent-abbreviations': 0,
		'unicorn/no-reduce': 0,
		'unicorn/no-array-reduce': 0,
		'unicorn/prefer-includes': 0,
		'unicorn/no-useless-undefined': 0,
		'unicorn/no-zero-fractions': 0,
		'unicorn/prefer-query-selector': 0,
		'unicorn/consistent-function-scoping': [
			'error',
			{checkArrowFunctions: false}
		],
		'unicorn/import-style': [
			'error',
			{
				styles: {
					util: false,
					path: {
						named: true
					}
				}
			}
		],
		// 'unicorn/no-abusive-eslint-disable': 0,
		// Bug do svelte lint
		'no-multiple-empty-lines': ['error', {max: 2, maxBOF: 2, maxEOF: 0}]
	}
}
