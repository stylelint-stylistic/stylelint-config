# Stylelint Stylistic Config

[![License: MIT][license-image]][license-url]
[![Changelog][changelog-image]][changelog-url]
[![Test Status][test-image]][test-url]
[![Support the project][support-image]][support-url]

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

## SCSS, Less and other syntaxes

The rules under `@stylistic/` read plain CSS. This config sets the same rules under the `@stylistic/scss/` and `@stylistic/less/` namespaces too, over `**/*.scss` and `**/*.less`, so that they are read as the languages they are written in as soon as Stylelint is told to parse them that way.

It names no parser and depends on none, which cuts both ways. A project of plain CSS installs nothing extra, and a project that names no syntax changes nothing by upgrading: an `.scss` file is parsed as CSS and read by the `@stylistic/` names, exactly as before the namespaces, and nothing warns you that it is being read as less of a stylesheet than it is.

If your files are not plain CSS, name the syntax for them and take the parser:

```js
import { defineStylisticOverride } from "@stylistic/stylelint-plugin"

export default {
	extends: ["@stylistic/stylelint-config"],
	overrides: [
		defineStylisticOverride({ syntax: "scss", files: "**/*.scss", rules: {} }),
		defineStylisticOverride({ syntax: "less", files: "**/*.less", rules: {} }),
	],
}
```

The empty `rules` is deliberate: this config already sets those names over those files, so the entry of yours only has to add the parser. Installing it is yours to do — `npm add -D postcss-scss postcss-less` — and nothing more is required of you after that.

A rule is then read under the name that matches the file, which is also the name to change it by. To change a setting for your SCSS or Less files alone:

```js
export default {
	extends: ["@stylistic/stylelint-config"],
	rules: {
		"@stylistic/scss/indentation": "tab",
		"@stylistic/less/indentation": "tab",
	},
}
```

Turning a rule off takes every name it is configured under, since the copy left behind would ask to be replaced by its namespace:

```js
export default {
	extends: ["@stylistic/stylelint-config"],
	rules: {
		"@stylistic/color-hex-case": null,
		"@stylistic/scss/color-hex-case": null,
		"@stylistic/less/color-hex-case": null,
	},
}
```

A stylesheet embedded in a document is a case of its own, and this config covers none: `<style lang="scss">` in an HTML page and a styled template both live in files that may hold no stylesheet at all, which is yours to say. The settings are exported as `rules`, by short name, so the entry takes the same ones rather than a copy of them:

```js
import { defineStylisticOverride } from "@stylistic/stylelint-plugin"
import { rules } from "@stylistic/stylelint-config"

export default {
	extends: ["@stylistic/stylelint-config"],
	overrides: [
		defineStylisticOverride({ syntax: "styled", files: "**/*.{js,jsx,ts,tsx}", rules }),
	],
}
```

For HTML the entry carries the parser and the rules of one namespace together, since a page may hold a plain `<style>` beside a `<style lang="scss">`:

```js
import { defineStylistic } from "@stylistic/stylelint-plugin"
import { rules } from "@stylistic/stylelint-config"

export default {
	extends: ["@stylistic/stylelint-config"],
	overrides: [
		{
			files: ["**/*.html"],
			customSyntax: "postcss-html",
			rules: { ...defineStylistic({ syntax: "scss", rules }) },
		},
	],
}
```

Either way the parser is a dependency of your project: `npm add -D postcss-styled-syntax` or `npm add -D postcss-html`.

## Need more?

ESLint removed stylistic rules, too. But you can continue to use them by [ESLint Stylistic](https://eslint.style).

[license-url]: https://github.com/stylelint-stylistic/stylelint-config/blob/main/LICENSE.md
[license-image]: https://img.shields.io/badge/License-MIT-limegreen.svg

[changelog-url]: https://github.com/stylelint-stylistic/stylelint-config/blob/main/CHANGELOG.md
[changelog-image]: https://img.shields.io/badge/Change-log-limegreen

[test-url]: https://github.com/stylelint-stylistic/stylelint-config/actions
[test-image]: https://github.com/stylelint-stylistic/stylelint-config/actions/workflows/test.yaml/badge.svg?branch=main

[support-url]: https://pay.payora.money/l/stylelint-stylistic
[support-image]: https://img.shields.io/badge/Support%20the%20project-❤️-pink
