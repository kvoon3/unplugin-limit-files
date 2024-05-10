import { rm } from 'node:fs/promises'
import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type { Entry } from 'fast-glob'
import fg from 'fast-glob'
import type { Options } from './types'
import { isTimeAgo } from './utils/time'

export const unpluginFactory: UnpluginFactory<Options> = options => ({
  name: 'unplugin-limit-files',
  buildEnd: async () => {
    const {
      filePattern,
      limit,
      customFilter,
    } = options

    const files = await fg.glob(filePattern, {
      stats: true,
    })

    files
      .sort((a, b) => {
        if (!a.stats || !b.stats)
          return 0

        if (limit?.latestTime === 'access')
          return a.stats.atimeMs - b.stats.atimeMs
        if (limit?.latestTime === 'change')
          return a.stats.ctimeMs - b.stats.ctimeMs
        if (limit?.latestTime === 'create')
          return a.stats.birthtimeMs - b.stats.birthtimeMs
        if (limit?.latestTime === 'modify')
          return a.stats.mtimeMs - b.stats.mtimeMs

        return 0
      })
      // limit num
      .reduce((accu, cur) => {
        if (
          limit?.num
          && accu.length >= limit.num
        )
          return accu

        return [...accu, cur]
      }, [] as Entry[])
      // limit date
      .filter((file) => {
        if (limit && file.stats) {
          let time = file.stats.birthtimeMs
          if (limit.latestTime === 'access')
            time = file.stats.atimeMs
          else if (limit.latestTime === 'change')
            time = file.stats.ctimeMs
          else if (limit.latestTime === 'create')
            time = file.stats.birthtimeMs
          else if (limit.latestTime === 'modify')
            time = file.stats.mtimeMs

          return isTimeAgo(time, {
            unit: limit.date.unit,
            times: limit.date.times,
          })
        }

        if (customFilter)
          return customFilter(file)

        return false
      })

      .forEach(file => rm(file.path))
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
