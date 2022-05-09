// simple test with React Testing Library
// http://localhost:3000/counter

import {fireEvent, render} from '@testing-library/react'
import * as React from 'react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container: divElement} = render(<Counter />)

  const [decrement, increment] = divElement.querySelectorAll('button')

  const msgDiv = divElement.firstElementChild?.querySelector('div')

  expect(msgDiv).toHaveTextContent('Current count: 0')

  fireEvent.click(increment)
  expect(msgDiv).toHaveTextContent('Current count: 1')

  fireEvent.click(decrement)
  expect(msgDiv).toHaveTextContent('Current count: 0')
})
