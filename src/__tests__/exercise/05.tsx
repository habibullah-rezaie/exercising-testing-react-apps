// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import Login from '../../components/login-submission'
import {setupServer} from 'msw/node'
import {rest, RestRequest} from 'msw'

const buildLoginForm = build<{username: string; password: string}>({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(
  rest.post(
    'https://auth-provider.example.com/api/login',
    async (
      req: RestRequest<{username: string; password: string}>,
      res,
      ctx,
    ) => {
      const {username, password} = req.body
      return res(ctx.json({username}), ctx.status(200))
    },
  ),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
beforeEach(() => server.resetHandlers())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  await userEvent.click(screen.getByRole('button', {name: /submit/i}))

  await waitForElementToBeRemoved(
    () => screen.getByRole('generic', {name: 'loading...'})
  )

  expect(screen.getByText(RegExp(`${username}`, 'i'))).toBeInTheDocument()
})
