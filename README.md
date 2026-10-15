# Stylelint Stylistic Config

[![License: MIT][license-image]][license-url]
[![Changelog][changelog-image]][changelog-url]
[![Test Status][test-image]][test-url]

The stylistic shareable config for Stylelint.

> [!IMPORTANT]
>
> This config reproduces the stylistic settings of the old `stylelint-config-standard`, for a migration that changes nothing. This config will not be developed, only maintained.
>
> The plugin's own opinion is its built-in recommended preset [`@stylistic/stylelint-plugin/recommended`](https://stylelint-stylistic.github.io/user-guide/configs). It already contains more settings and will continue to evolve with the plugin.

## Installation and usage

Add `@stylistic/stylelint-config` to your project (this assumes your project already has `stylelint` and `stylelint-config-standard`):

```shell
npm add -D @stylistic/stylelint-config
```

Set your `stylelint.config.js` to:

```js
export default {
	extends: [
		"stylelint-config-standard",
		"@stylistic/stylelint-config",
	],
}
```

[`@stylistic/stylelint-plugin`](https://stylelint-stylistic.github.io), on which this config is based, contains many more stylistic rules. Using this config you can add and override rules from the plugin. But if you need to override more than one or two rules, it might make sense to try replacing this config with [recommended preset](https://stylelint-stylistic.github.io/user-guide/configs).

## Need more?

ESLint removed stylistic rules, too. But you can continue to use them by [ESLint Stylistic](https://eslint.style).

[license-url]: https://github.com/stylelint-stylistic/stylelint-config/blob/main/LICENSE.md
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[changelog-url]: https://github.com/stylelint-stylistic/stylelint-config/blob/main/CHANGELOG.md
[changelog-image]: https://img.shields.io/badge/Change-log-limegreen

[test-url]: https://github.com/stylelint-stylistic/stylelint-config/actions
[test-image]: https://github.com/stylelint-stylistic/stylelint-config/actions/workflows/test.yaml/badge.svg?branch=main
