import { expect, it } from 'vitest'
import { countTime, timeMap } from './time'

it('count times', () => {
  expect(
    countTime({ month: 2, day: 1 }),
  ).toBe(timeMap.month * 2 + timeMap.day * 1)

  expect(
    countTime({ weekend: 3, minute: 4 }),
  ).toBe(timeMap.weekend * 3 + timeMap.minute * 4)
})
