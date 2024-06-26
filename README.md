# unplugin-limit-files

[![NPM version](https://img.shields.io/npm/v/unplugin-limit-files?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-limit-files)

## Install

```bash
pnpm i -D unplugin-limit-files
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import LimitFiles from 'unplugin-limit-files/vite'
import { TimeUnit } from 'unplugin-limit-files/types'

export default defineConfig({
  plugins: [
    LimitFiles({
      filePattern: ['./pkg/*.zip'],
      limit: {
        latestTime: 'create',
        time: {
          month: 1,
          weekend: 2,
          day: 5,
          minute: 30,
        },
        num: 3,
      },
    })
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import LimitFiles from 'unplugin-limit-files/rollup'

export default {
  plugins: [
    LimitFiles({
      /* options */
    })
  ],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-limit-files/rspack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-limit-files/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-limit-files/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import LimitFiles from 'unplugin-limit-files/esbuild'

build({
  plugins: [
    LimitFiles(
    /* options */
    )
  ],
})
```

<br></details>
