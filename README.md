# Stylelint Stylistic Config

[![Test Status][test-image]][test-url]
[![License: MIT][license-image]][license-url]
[![NPM version][npm-image]][npm-url]
[![Vulnerabilities count][vulnerabilities-image]][vulnerabilities-url]

> The stylistic shareable config for Stylelint.

Use it to return to your config the 63 stylistic rules [removed in `stylelint-config-standard` 30.0.0](https://github.com/stylelint/stylelint-config-standard/releases/tag/30.0.0), and the one [removed in `stylelint-config-recommended` 10.0.1](https://github.com/stylelint/stylelint-config-recommended/releases/tag/10.0.1).

To see the rules that this config uses, please read the [config itself](./.stylelintrc).

## Installation and usage

Add `@stylistic/stylelint-config` and `stylelint` itself to your project:

```shell
npm add -D @stylistic/stylelint-config stylelint
```

Set your `.stylelintrc.json` to:

```json
{
	"extends": "@stylistic/stylelint-config"
}
```

If you use `stylelint-config-recommended`, `stylelint-config-standard`, or some other config for syntax linting, then list the config names in an array (order matters):

```json
{
	"extends": [
		"stylelint-config-standard",
		"@stylistic/stylelint-config"
	]
}
```

## Rule overrides

If the value of a rule does not suit you, specify that rule in the `"rules"` section with the value you want:

```json
{
	"extends": "@stylistic/stylelint-config",
	"rules": {
		"@stylistic/indentation": "tab"
	}
}
```

You can turn off rules by setting its value to `null`. For example:

```json
{
	"extends": "@stylistic/stylelint-config",
	"rules": {
		"@stylistic/max-line-length": null
	}
}
```

In addition, the config is based on the [`@stylistic/stylelint-plugin`](https://www.npmjs.com/package/@stylistic/stylelint-plugin), which has all 76 stylistic rules [removed in Stylelint 16.0.0](https://github.com/stylelint/stylelint/releases/tag/16.0.0). You can use all these rules, not just the 65 configured in the config. For example:

```json
{
	"extends": "@stylistic/stylelint-config",
	"rules": {
		"@stylistic/at-rule-name-newline-after": "always-multi-line"
	}
}
```

Please refer to [Stylelint docs](https://stylelint.io/user-guide/get-started) for detailed info on using this linter.

## Need more?

ESLint deprecates stylistic rules, too. But you can continue to use them thanks to [ESLint Stylistic](https://eslint.style).

## Important documents

- [Changelog](https://github.com/stylelint-stylistic/stylelint-config/blob/main/CHANGELOG.md)
- [License](./LICENSE)

[test-url]: https://github.com/stylelint-stylistic/stylelint-config/actions
[test-image]: https://github.com/stylelint-stylistic/stylelint-config/actions/workflows/test.yml/badge.svg?branch=main

[npm-url]: https://www.npmjs.com/package/@stylistic/stylelint-config
[npm-image]: https://img.shields.io/npm/v/@stylistic/stylelint-config?logo=npm&logoColor=fff

[license-url]: https://github.com/stylelint-stylistic/stylelint-config/blob/main/LICENSE
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[vulnerabilities-url]: https://snyk.io/test/github/stylelint-stylistic/stylelint-config
[vulnerabilities-image]: https://snyk.io/test/github/stylelint-stylistic/stylelint-config/badge.svg
