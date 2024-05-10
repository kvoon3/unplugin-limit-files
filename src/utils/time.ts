import { objectEntries } from '@antfu/utils'

export const timeMap = {
  month: 2592000000,
  weekend: 604800000,
  day: 86400000,
  hour: 3600000,
  minute: 60000,
}

export function isTimeAgo(date: Date | number, opt?: { baseTime?: Date, gap?: number }) {
  const time = typeof date === 'number' ? date : date.getTime()

  const {
    baseTime = new Date(),
    gap = 0,
  } = opt || {}

  return baseTime.getTime() - time > gap
}

export function countTime(opt: {
  month?: number
  weekend?: number
  day?: number
  minute?: number
}) {
  return objectEntries(opt).reduce((count, [key, val]) => {
    return count + (timeMap[key] || 1) * (val || 1)
  }, 0)
}
