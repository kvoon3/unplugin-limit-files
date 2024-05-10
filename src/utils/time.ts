export enum TimeUnit {
  MONTH = 2592000000,
  DAY = 86400000,
  MINUTE = 60000,
}

export function isTimeAgo(date: Date | number, opt: { now?: Date, unit: TimeUnit, times?: number }) {
  const time = typeof date === 'number' ? date : date.getTime()

  const {
    now = new Date(),
    unit,
    times = 1,
  } = opt

  const diff = now.getTime() - time

  return diff > unit * (times)
}
