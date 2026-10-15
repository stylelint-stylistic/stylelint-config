import { defineStylistic } from "@stylistic/stylelint-plugin"

/**
 * The settings by short name, written once and named under each namespace below, so that every
 * option here is one every namespace takes.
 */
let rules = {
	"at-rule-name-case": `lower`,
	"at-rule-name-space-after": `always-single-line`,
	"at-rule-semicolon-newline-after": `always`,
	"block-closing-brace-empty-line-before": `never`,
	"block-closing-brace-newline-after": `always`,
	"block-closing-brace-newline-before": `always-multi-line`,
	"block-closing-brace-space-before": `always-single-line`,
	"block-opening-brace-newline-after": `always-multi-line`,
	"block-opening-brace-space-after": `always-single-line`,
	"block-opening-brace-space-before": `always`,
	"color-hex-case": `lower`,
	"declaration-bang-space-after": `never`,
	"declaration-bang-space-before": `always`,
	"declaration-block-semicolon-newline-after": `always-multi-line`,
	"declaration-block-semicolon-space-after": `always-single-line`,
	"declaration-block-semicolon-space-before": `never`,
	"declaration-block-single-line-max-declarations": 1,
	"declaration-block-trailing-semicolon": `always`,
	"declaration-colon-newline-after": `always-multi-line`,
	"declaration-colon-space-after": `always-single-line`,
	"declaration-colon-space-before": `never`,
	"function-comma-newline-after": `always-multi-line`,
	"function-comma-space-after": `always-single-line`,
	"function-comma-space-before": `never`,
	"function-max-empty-lines": 0,
	"function-parentheses-newline-inside": `always-multi-line`,
	"function-parentheses-space-inside": `never-single-line`,
	"function-whitespace-after": `always`,
	"indentation": 2,
	"max-empty-lines": 1,
	"max-line-length": 120,
	"media-feature-colon-space-after": `always`,
	"media-feature-colon-space-before": `never`,
	"media-feature-name-case": `lower`,
	"media-feature-parentheses-space-inside": `never`,
	"media-feature-range-operator-space-after": `always`,
	"media-feature-range-operator-space-before": `always`,
	"media-query-list-comma-newline-after": `always-multi-line`,
	"media-query-list-comma-space-after": `always-single-line`,
	"media-query-list-comma-space-before": `never`,
	"no-empty-first-line": true,
	"no-eol-whitespace": true,
	"no-extra-semicolons": true,
	"no-missing-end-of-source-newline": true,
	"number-leading-zero": `always`,
	"number-no-trailing-zeros": true,
	"property-case": `lower`,
	"selector-attribute-brackets-space-inside": `never`,
	"selector-attribute-operator-space-after": `never`,
	"selector-attribute-operator-space-before": `never`,
	"selector-combinator-space-after": `always`,
	"selector-combinator-space-before": `always`,
	"selector-descendant-combinator-no-non-space": true,
	"selector-list-comma-newline-after": `always`,
	"selector-list-comma-space-before": `never`,
	"selector-max-empty-lines": 0,
	"selector-pseudo-class-case": `lower`,
	"selector-pseudo-class-parentheses-space-inside": `never`,
	"selector-pseudo-element-case": `lower`,
	"string-quotes": `double`,
	"unit-case": `lower`,
	"value-list-comma-newline-after": `always-multi-line`,
	"value-list-comma-space-after": `always-single-line`,
	"value-list-comma-space-before": `never`,
	"value-list-max-empty-lines": 0,
}

/** @type {import('stylelint').Config} */
export default {
	plugins: [`@stylistic/stylelint-plugin`],
	rules: {
		// The plugin passes a `@charset` over, so a CSS file holding one is asked for this rule rather than for a spelling it will not judge.
		"at-charset-rule-no-invalid": true,
		...defineStylistic({ rules }),
	},
	overrides: [
		// The core names read plain CSS alone, so the copies of the same rules under each namespace are set over the files of that syntax. No entry names a package: an `.scss` file is read by the `scss/` copies as soon as the project tells Stylelint to parse it as SCSS, and is read as CSS by the `@stylistic/` ones until then, which is where it stood before the namespaces.
		{ files: `**/*.scss`, rules: defineStylistic({ syntax: `scss`, rules }) },
		{ files: `**/*.less`, rules: defineStylistic({ syntax: `less`, rules }) },
	],
}

export { rules }
