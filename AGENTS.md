# AGENTS.md

Guidance for AI coding agents working in this repository. `CLAUDE.md` only points here; keep all guidance in this file.

## What this is

`@stylistic/stylelint-config` is a single-file shareable Stylelint config. The whole published package is `stylelint.config.js`: it loads `@stylistic/stylelint-plugin` and sets 66 `@stylistic/*` rules, restoring the stylistic rules removed from `stylelint-config-standard` 30 and `stylelint-config-recommended` 10.0.1. There is no build step and no source directory.

## Commands

Tooling runs through `make`; the Makefile puts `node_modules/.bin` on `PATH` and is the source of truth for dev commands, so read it rather than relying on a list here (`make help` prints the targets). Package manager is pnpm, runtime — node, both auto-downloaded via `devEngines` on failure.

Run a single test file directly:

```shell
node --test test/declaration-colon-newline-after.js
```

The pre-commit hook (`.githooks/pre-commit`) stashes unstaged changes and runs lint and tests, so a commit fails if either does.

## Tests

Tests use the built-in `node:test` runner and `node:assert/strict`, no test framework. Each file in `test/` covers one rule and calls `testRule()` from `utils/testRule.js`, which:

1. Reads the rule's option value from `stylelint.config.js` itself (via `getRuleConfig`), so the test always checks the option actually shipped rather than a copy of it.
2. Lints the `code` string with only that rule and the plugin enabled.
3. Deep-compares the full warnings array against `expectedWarnings` (including `line`/`column`/`endLine`/`endColumn`, `text` with the rule name in parentheses, and explicit `url: undefined`, `fix: undefined`).

A test for a new rule follows the same shape: `rule`, `plugin: { name: "@stylistic/stylelint-plugin" }`, a `code` snippet with `.valid` and `.invalid` blocks, and exact expected warnings. Passing no `rule` lints with the whole config. The `no-undefined` oxlint rule is disabled for `test/**` precisely because of the `url: undefined` fields.

## Conventions

- ESM only (`"type": "module"`), `let` for variables and `const` only for true constants (top-level, `SCREAM_CASE`), no semicolons, tabs for indentation (see `.editorconfig`), template literals for plain strings (backticks even without interpolation). Linting comes from `@firefoxic/oxlint-config` (syntactic + stylistic presets); run `make fix` rather than hand-formatting.
- Every user-facing change (a rule value in `stylelint.config.js`, a required `stylelint`, plugin, or Node version) gets an entry under `## [Unreleased]` in `CHANGELOG.md` (Keep a Changelog format), in the same commit that brings the change. Internal changes are not logged.
- Heading of a commit messages are imperative English sentences.

## Release flow

Releasing is fully automated by `@firefoxic/release-it` (versioning, changelog, tagging, publishing). It needs only two things: a run from the release branch (normally a push to `release` or `release-*`, which triggers `.github/workflows/release.yaml`) and a non-empty `## [Unreleased]` section in `CHANGELOG.md`. Don't bump `version` in `package.json` by hand.
