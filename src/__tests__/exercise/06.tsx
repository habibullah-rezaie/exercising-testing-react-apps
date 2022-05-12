// mocking Browser APIs and modules
// http://localhost:3000/location

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import * as React from 'react'
import Location from '../../examples/location'

const mockedGeolocation = {getCurrentPosition: jest.fn()}

beforeAll(() => {
  Object.defineProperty(window.navigator, 'geolocation', {
    value: mockedGeolocation,
  })
})

function deferred() {
  let resolve: undefined | ((value?: unknown) => void)
  let reject: undefined | ((value?: unknown) => void)

  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {coords: {latitude: 0, longitude: 3}}

  const {promise, resolve} = deferred()

  mockedGeolocation.getCurrentPosition.mockImplementation(onSuccess => {
    promise.then(() => {
      onSuccess(fakePosition)
    })
  })

  render(<Location />)
  const loadingSpinner = screen.getByLabelText(/loading/i)
  expect(loadingSpinner).toBeInTheDocument()

  resolve && resolve()

  await waitForElementToBeRemoved(loadingSpinner)

  expect(loadingSpinner).not.toBeInTheDocument()

  screen.debug()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})
