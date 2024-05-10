import type { Entry } from 'fast-glob'
import { TimeUnit } from './utils/time'

export interface Options {
  filePattern: string[]
  limit?: {
    latestTime: 'modify' | 'change' | 'create' | 'access'
    date: {
      unit: TimeUnit
      times: number
    }
    num: number
  }
  customFilter?: (fileName: Entry) => boolean
}

export {
  TimeUnit,
}
