// form testing
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Login from '../../components/login'
import {build, fake} from '@jackfranklin/test-data-bot'

const buildTestLoginData = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const {username, password} = buildTestLoginData({
    overrides: {
      username: 'hikjlk'
    }
  }) // Overwrite the password to have a strong password

  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByRole('textbox', {name: /username/i})
  const passwordField = screen.getByLabelText('Password')
  const submitBtn = screen.getByRole('button', {name: /submit/i})

  await userEvent.type(passwordField, password)
  await userEvent.type(usernameField, username)
  await userEvent.click(submitBtn)

  console.log(username, password)
  expect(handleSubmit).toHaveBeenCalledWith({username, password})
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})
