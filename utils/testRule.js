import { deepEqual } from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { describe, it } from "node:test"

import stylelint from "stylelint"

/**
 * Executes a test for a specified linting rule using stylelint.
 *
 * @param {Object} test - Test parameters.
 * @param {string} test.description - The test description.
 * @param {string} [test.rule] - The name of the rule under test. If not specified, stylelint will use all the rules in the `.stylelintrc` file.
 * @param {Object} [test.plugin] - The plugin required for the rule under test.
 * @param {string} test.code - The code for the rule under test.
 * @param {Array} test.expectedWarnings - Full data of the warnings expected in the test.
 * @returns {Promise<void>} A promise that resolves when the test is complete.
 */
export async function testRule ({ description, rule, plugin, code, expectedWarnings }) {
	if (!Array.isArray(expectedWarnings)) throw new TypeError(`expectedWarnings must be an array`)

	const pluginName = plugin?.name
	const config = await getConfig(rule, pluginName)

	describe(rule, () => {
		it(description, async () => {
			const result = await stylelint.lint({ code, config })
			const warnings = result.results[0].warnings

			deepEqual(warnings, expectedWarnings)
		})
	})
}

/**
 * Retrieves specific rule configuration for stylelint.
 *
 * @param {string} ruleName - Name of the rule to get config for.
 * @param {string} [pluginName] - Optional name of the plugin.
 * @return {Promise<Object|undefined>} Promise that resolves to an object with plugins and rules if ruleName is provided, otherwise undefined.
 */
async function getConfig (ruleName, pluginName) {
	if (!ruleName) return

	let configObject = JSON.parse(await readFile(`./.stylelintrc.json`, { encoding: `utf8` }))

	return {
		plugins: pluginName ? [pluginName] : undefined,
		rules: {
			[ruleName]: configObject.rules[ruleName],
		},
	}
}
