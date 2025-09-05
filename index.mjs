import configurations from '@plugjs/eslint-plugin'
import vuePlugin from 'eslint-plugin-vue'
import * as espree from 'espree'
import vueParser from 'vue-eslint-parser'

export default [
  // ===== GENERAL JS/TS CONFIGURATIONS FROM PLUGJS AND VUE ====================

  // Any config for TS also applies to VUE files
  ...configurations.map((config) => {
    if (config.files?.includes('**/*.ts')) config.files.push('**/*.vue')
    return config
  }),

  // All VUE configurations are restricted to ".vue" files
  ...vuePlugin.configs['flat/recommended'].map((config) => {
    config.files = [ '**/*.vue' ]
    return config
  }),

  // ===== PARSERS CONFIGURATION FOR VUE ========================================

  // Set the *default* parser, for all files, to be specifically the VUE parser
  // backed by TypeScript ESLint's own parser (all our .vue are in TypeScript)
  {
    name: 'plugjs-vue/parser-vue',
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        extraFileExtensions: [ '.vue' ],
        parser: '@typescript-eslint/parser',
      },
    },
  },

  // Specifically for JavaScript files, use the default "espree" parser, as
  // JavaScript sources (like this file) are not present in "tsconfig.json".
  {
    name: 'plugjs-vue/parser-js',
    files: [ '**/*.mjs', '**/*.cjs', '**/*.js' ],
    languageOptions: {
      parser: espree,
    },
  },

  // ===== RULES CONFIGURATION FOR VUE =========================================

  // For all files, apply some base rules: marking "@/..." imports as internal,
  // and disabling the "no-floating-promises" rule as it exponentially increases
  // the linting time (and in the browser, we normally have a trap globally).
  {
    name: 'plugjs-vue/rules-base',

    settings: { 'import-x/internal-regex': /^@\/.*/ },
    rules: { '@typescript-eslint/no-floating-promises': [ 'off' ] },
  },

  // For Vue files, apply some Vue-specific rules (we don't apply them globally
  // as they are useless outside of Vue files - just a waste of time).
  {
    name: 'plugjs-vue/rules-vue',
    files: [ '**/*.vue' ],
    rules: {
      // We don't care about "multiple words" in components
      'vue/multi-word-component-names': [ 'off' ],
      // Either 3 attributes on a single line, or all attributes on newlines!
      'vue/max-attributes-per-line': [ 'warn', {
        'singleline': 3,
      } ],
      // No unused variables, ever
      'vue/no-unused-vars': 'error',
    },
  },
]
