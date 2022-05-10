// form testing
// http://localhost:3000/login

import {render, screen} from '@testing-library/react'
import * as faker from 'faker'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const {
    handleSubmit,
    passwordField,
    usernameField,
    loginTestData,
    submitBtn,
  } = buildLoginForm()

  console.dir(loginTestData)
  await userEvent.type(passwordField, loginTestData.password)
  await userEvent.type(usernameField, loginTestData.username)

  await userEvent.click(submitBtn)
  expect(handleSubmit).toHaveBeenCalledWith(loginTestData)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

function buildLoginForm() {
  const loginTestData = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }

  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const usernameField = screen.getByRole('textbox', {name: /username/i})
  const passwordField = screen.getByLabelText('Password')
  const submitBtn = screen.getByRole('button', {name: /submit/i})

  return {handleSubmit, loginTestData, usernameField, passwordField, submitBtn}
}
