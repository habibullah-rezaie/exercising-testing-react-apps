// form testing
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  const loginTestData = {
    username: 'my-username',
    password: 'my-password',
  }

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByRole('textbox', {name: /username/i})
  const passwordField = screen.getByLabelText('Password')
  const submitBtn = screen.getByRole('button', {name: /submit/i})

  await userEvent.type(passwordField, loginTestData.password)
  await userEvent.type(usernameField, loginTestData.username)

  await userEvent.click(submitBtn)
  expect(handleSubmit).toHaveBeenCalledWith(loginTestData)
})

/*
eslint
  no-unused-vars: "off",
*/
