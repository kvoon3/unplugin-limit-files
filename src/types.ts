import type { Entry } from 'fast-glob'

export interface Options {
  filePattern: string[]
  limit?: {
    latestTime: 'modify' | 'change' | 'create' | 'access'
    baseTime?: Date
    time?: {
      month?: number
      weekend?: number
      day?: number
      minute?: number
    }
    num?: number
  }
  customFilter?: (fileName: Entry) => boolean
}
