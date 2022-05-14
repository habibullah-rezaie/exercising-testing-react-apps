// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

function Counter({initialCount = 0, step = 1}: {initialCount?: number, step?: number}) {
  const {count, increment, decrement} = useCounter({initialCount, step})

  return (
    <div>
      <button aria-label="increment" onClick={increment}>+</button>
      <div>count: {count}</div>
      <button aria-label="decrement" onClick={decrement}>-</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  render(<Counter />)

  const increment = screen.getByLabelText(/increment/i)
  const decrement = screen.getByLabelText(/decrement/i)
  const count = screen.getByText(/count:/i)

  expect(count).toHaveTextContent(`count: 0`)

  await userEvent.click(increment)
  expect(count).toHaveTextContent(`count: ${1}`)

  screen.debug()

  await userEvent.click(decrement)
  expect(count).toHaveTextContent(`count: ${0}`)
})
