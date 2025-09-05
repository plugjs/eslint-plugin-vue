PlugJS ESLint (v9) Shared Configuration for Vue
===============================================

This package exports simple configurations for linting our Vue projects.

Just add in your `eslint.config.mjs` something similar to:

```javascript
// import { defineConfig } from 'eslint/config'
import configurations from '@plugjs/eslint-plugin-vue'

export default [
  ...configurations,

  // ===== IGNORED FILES =======================================================
  // REMEMBER! Ignores *must* be in its own configuration, they can not coexist
  // with "rules", "languageOptions", "files", ... or anything else, otherwise
  // ESLint will blaantly ignore the ignore files!
  {
    name: 'local/ignores',
    ignores: [
      'dist/',
      'public/',
    ],
  },
]
```


Legal Stuff
-----------

* [Copyright Notice](NOTICE.md)
* [License](LICENSE.md)
