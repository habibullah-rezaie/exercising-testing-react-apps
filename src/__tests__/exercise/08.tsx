// testing custom hooks
// http://localhost:3000/counter-hook

import { act, render } from '@testing-library/react'
import * as React from 'react'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', async () => {
  let count: number | undefined = undefined
  let increment: () => void = () => {}
  let decrement: () => void = () => {}

  function TestComponent({
    initialCount = 0,
    step = 1,
  }: {
    initialCount?: number
    step?: number
  }) {
    ;({count, increment, decrement} = useCounter({initialCount, step}))

    return null
  }

  render(<TestComponent />)

  expect(count).toBe(0)

  console.log(increment)
  act(() => increment())
  expect(count).toBe(1)

  act(() => decrement())
  expect(count).toBe(0)
})
