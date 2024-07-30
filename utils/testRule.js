import { deepEqual } from "node:assert/strict"
import { describe, it } from "node:test"

import stylelint from "stylelint"

/**
 * Test the specified rule with its configuration from the `stylelint.config.js` file.
 *
 * @param {Object} test - Test run parameters.
 * @param {string} test.description - The description of the test.
 * @param {string} [test.rule] - The name of the rule under test. If not specified, stylelint will use all the rules in the `stylelint.config.js` file.
 * @param {Object} [test.plugin] - The plugin required for the rule under test.
 * @param {string} test.code - The code for the rule under test.
 * @param {Array} test.expectedWarnings - Full data of the warnings expected in the test.
 * @returns {Promise} A promise that resolves when the test is complete.
 */
export async function testRule ({ description, rule, plugin, code, expectedWarnings }) {
	let config = rule
		? {
			plugins: plugin?.name,
			rules: {
				[rule]: await getRuleConfig(rule),
			},
		}
		: undefined

	describe(rule, () => {
		it(description, async () => {
			let warnings = await stylelint.lint({ code, config }).then((r) => r.results[0].warnings)

			deepEqual(warnings, expectedWarnings)
		})
	})
}

/**
 * Get the rule config from the `stylelint.config.js` file.
 *
 * @param {string} rule - The name of the rule.
 * @returns {any} The config of the specified rule.
 */
async function getRuleConfig (rule) {
	let configObject = await import(`../stylelint.config.js`).then((m) => m.default)

	return configObject.rules[rule]
}
