// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, RenderOptions, screen} from '../../test/test-utils'
import EasyButton from '../../components/easy-button'

type Themes = {
  dark: React.CSSProperties
  light: React.CSSProperties
}
const themeStyles: Themes = {
  dark: {backgroundColor: 'black', color: 'white'},
  light: {
    backgroundColor: 'white',
    color: 'black',
  },
}
test('renders with the light styles for the light theme', () => {
  const lightTheme = 'light'

  render(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: ${themeStyles[lightTheme].backgroundColor};
    color: ${themeStyles[lightTheme].color};
  `)
})

test('renders with the dark styles for the dark theme', () => {
  const darkTheme = 'dark'

  render(<EasyButton>Easy</EasyButton>, {theme: darkTheme})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: ${themeStyles[darkTheme].backgroundColor};
    color: ${themeStyles[darkTheme].color};
  `)
})

test('Changes the theme on demand', () => {
  const lightTheme = 'light'
  const {rerender} = render(<EasyButton>Easy</EasyButton>, {theme: lightTheme})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: ${themeStyles[lightTheme].backgroundColor};
    color: ${themeStyles[lightTheme].color};
  `)

  const secondTheme = 'dark'
  rerender(<EasyButton intialTheme={secondTheme}>Easy</EasyButton>)
  expect(button).toHaveStyle(`
    background-color: ${themeStyles[lightTheme].backgroundColor};
    color: ${themeStyles[lightTheme].color};
  `)
})

/* eslint no-unused-vars:0 */
