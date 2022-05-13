// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, RenderOptions, screen} from '@testing-library/react'
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
  const lightTheme = 'light'

  renderWithTheme(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: ${themeStyles[lightTheme].backgroundColor};
    color: ${themeStyles[lightTheme].color};
  `)
})

test('renders with the dark styles for the dark theme', () => {
  const darkTheme = 'dark'

  renderWithTheme(<EasyButton>Easy</EasyButton>, {theme: darkTheme})
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: ${themeStyles[darkTheme].backgroundColor};
    color: ${themeStyles[darkTheme].color};
  `)
})

function renderWithTheme(
  comp: JSX.Element,
  {
    theme = 'light',
    ...options
  }: Omit<RenderOptions, 'wrapper'> & {theme?: string} = {},
) {
  function Wrapper({children}: React.PropsWithChildren<{}>) {
    return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  }
  return render(comp, {wrapper: Wrapper, ...options})
}
/* eslint no-unused-vars:0 */
