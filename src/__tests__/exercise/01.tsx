// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)

interface IglobalThis {
  [key: string]: any
}

declare var global: IglobalThis
global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {
  const divElement = document.createElement('div')
  console.log(document)
  document.body.append(divElement)

  const reactRoot = createRoot(divElement)

  act(() => reactRoot.render(<Counter />))
  const buttons = divElement.querySelectorAll('button')
  const decrement = buttons.item(0)
  const increment = buttons.item(1)
  const counterMsg = divElement?.firstElementChild?.querySelector('div')

  expect(counterMsg?.textContent).toBe('Current count: 0')

  act(() => increment.click())
  expect(counterMsg?.textContent).toBe('Current count: 1')

  act(() => decrement.click())
  expect(counterMsg?.textContent).toBe('Current count: 0')

  divElement.remove()
})

/* eslint no-unused-vars:0 */
