// form testing
// http://localhost:3000/login

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  type loginData = {
    password: string
    username: string
  }

  let submittedData: null | loginData = null

  function handleSubmit(data: loginData) {
    submittedData = data
  }

  render(<Login onSubmit={handleSubmit} />)

  screen.debug()
  const usernameField = screen.getByLabelText('Username')
  const passwordField = screen.getByLabelText('Password')
  const submitBtn = screen.getByRole('button')

  await userEvent.type(usernameField, 'my-username')
  await userEvent.type(passwordField, 'my-password')

  await userEvent.click(submitBtn)
  expect(submittedData).toEqual({
    username: 'my-username',
    password: 'my-password',
  })
})

/*
eslint
  no-unused-vars: "off",
*/
