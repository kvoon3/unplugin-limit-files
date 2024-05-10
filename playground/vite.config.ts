import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'
import { TimeUnit } from '../src/types'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      filePattern: ['./test/files/*.*'],
      limit: {
        latestTime: 'create',
        date: {
          unit: TimeUnit.MINUTE,
          times: 60,
        },
        num: 3,
      },
    }),
  ],
})
