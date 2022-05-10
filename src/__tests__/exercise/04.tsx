// form testing
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import * as faker from 'faker'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const {username, password} = buildTestLoginData({
    password: 'Akjfslkfew909809rw.kljf',
  }) // Overwrite the password to have a strong password

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByRole('textbox', {name: /username/i})
  const passwordField = screen.getByLabelText('Password')
  const submitBtn = screen.getByRole('button', {name: /submit/i})

  await userEvent.type(passwordField, password)
  await userEvent.type(usernameField, username)
  await userEvent.click(submitBtn)

  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

function buildTestLoginData(loginData?: {username?: string; password?: string}) {
  const loginTestData = {
    username: loginData?.username || faker.internet.userName(),
    password: loginData?.password || faker.internet.password(),
  }

  return {...loginTestData}
}
