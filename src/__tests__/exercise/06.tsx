// mocking Browser APIs and modules
// http://localhost:3000/location

import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import * as React from 'react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'
import {act} from 'react-dom/test-utils'
import {mocked} from 'ts-jest/utils'

jest.mock('react-use-geolocation')
const mockedUseCurrentPosition = mocked(useCurrentPosition)

test('displays the users current location', async () => {
  const fakePosition = {coords: {latitude: 0, longitude: 3}}

  type Position = {coords: {latitude: number; longitude: number}}

  let setCurrentPosition: React.Dispatch<React.SetStateAction<Position | null>>
  mockedUseCurrentPosition.mockImplementation(() => {
    const [position, setPosition] = React.useState<Position | null>(null)

    setCurrentPosition = setPosition
    return [position, null]
  })

  render(<Location />)
  const loadingSpinner = screen.getByLabelText(/loading/i)
  expect(loadingSpinner).toBeInTheDocument()

  act(() => {
    setCurrentPosition(fakePosition)
  })

  expect(loadingSpinner).not.toBeInTheDocument()

  screen.debug()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})
