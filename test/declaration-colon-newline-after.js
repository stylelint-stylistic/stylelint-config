import { testRule } from "../utils/testRule.js"

let rule = `@stylistic/declaration-colon-newline-after`

let plugin = {
	name: `@stylistic/stylelint-plugin`,
}

let code = `
.valid {
	background:
		url("foo.png"),
		url("bar.png");
	transform:
		translate(
			1px,
			1px
		);
}

.invalid {
	background: url("foo.png"),
		url("bar.png");
	transform: translate(
		1px,
		1px
	);
}
`

testRule({
	description: `should include a new line after a colon in multiline declarations`,
	rule,
	plugin,
	code,
	expectedWarnings: [
		{
			line: 14,
			column: 12,
			endLine: 14,
			endColumn: 13,
			rule,
			severity: `error`,
			text: `Expected newline after ":" with a multi-line declaration (${rule})`,
			url: undefined,
		},
		{
			line: 16,
			column: 11,
			endLine: 16,
			endColumn: 12,
			rule,
			severity: `error`,
			text: `Expected newline after ":" with a multi-line declaration (${rule})`,
			url: undefined,
		},
	],
})
