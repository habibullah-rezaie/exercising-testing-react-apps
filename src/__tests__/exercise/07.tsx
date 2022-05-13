// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
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
  const initialTheme = 'light'
  function Wrapper({children}: React.PropsWithChildren<{}>) {
    return <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
  }

  render(<EasyButton>Easy</EasyButton>, {wrapper: Wrapper})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: ${themeStyles[initialTheme].backgroundColor};
    color: ${themeStyles[initialTheme].color};
  `)
})

/* eslint no-unused-vars:0 */
