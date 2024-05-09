import { readdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

export const unpluginFactory: UnpluginFactory<Options> = options => ({
  name: 'unplugin-limit-files',
  transformInclude(id) {
    return id.endsWith('main.ts')
  },
  transform(code) {
    return code.replace('__UNPLUGIN__', `Hello Unplugin! ${options}`)
  },
  buildEnd: async () => {
    const { path, limit, customFilter } = options
    const fileNames = await readdir(resolve(path))

    if (typeof limit === 'number' && Number.isInteger(limit)) {
      while (fileNames.length >= limit) {
        const fileName = fileNames.shift()
        if (fileName)
          rm(resolve(path, fileName))
      }
    }

    if (customFilter && typeof customFilter === 'function')
      fileNames.filter(customFilter).forEach(fileName => rm(resolve(path, fileName)))
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
