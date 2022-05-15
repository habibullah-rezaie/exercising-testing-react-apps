// testing custom hooks
// http://localhost:3000/counter-hook

import {act, render} from '@testing-library/react'
import * as React from 'react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  const result = setup(useCounter)

  if (!('count' in result || 'increment' in result || 'decrement' in result)) {
    throw new Error(
      'Cannot find one of (count, increment, or decrement) in object returned by useCounter',
    )
  }

  expect(result.count).toBe(0)

  console.log(result.increment)
  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test(`Allows to customize initial count`, () => {
  const initialCount = 2

  const result = setup(useCounter, {initialCount})

  if (!('count' in result || 'increment' in result || 'decrement' in result)) {
    throw new Error(
      'Cannot find one of (count, increment, or decrement) in object returned by useCounter',
    )
  }

  expect(result?.count).toBe(initialCount)

  console.log(result?.increment)
  act(() => result?.increment())
  expect(result?.count).toBe(initialCount + 1)

  act(() => result?.decrement())
  expect(result?.count).toBe(initialCount)
})

test(`Allows to customize step`, () => {
  const step = 2

  const result = setup(useCounter, {step})

  if (!('count' in result || 'increment' in result || 'decrement' in result)) {
    throw new Error(
      'Cannot find one of count, increment, or decrement, or either all of them in object returned by useCounter',
    )
  }

  expect(result?.count).toBe(0)

  console.log(result?.increment)
  act(() => result?.increment())
  expect(result?.count).toBe(step)

  act(() => result?.decrement())
  expect(result?.count).toBe(0)
})

function setup<HookType extends (...args: any) => any>(
  hook: HookType,
  hookConfig?: Partial<Parameters<HookType>[0]>,
): ReturnType<HookType> | {} {
  let result: ReturnType<HookType> | {} = {}

  render(<TestComponent {...hookConfig} />)

  function TestComponent({
    initialCount,
    step,
  }: {
    initialCount?: number
    step?: number
  }) {
    const counterOptions = {
      initialCount: initialCount ?? initialCount,
      step: step ?? step,
    }
    Object.assign(result, hook(counterOptions))

    return null
  }

  return result
}
