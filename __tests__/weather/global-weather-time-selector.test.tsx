import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import GlobalWeatherTimeSelector from '../../lib/components/map/global-weather-time-selector'

/* --- mocks --- */
jest.mock('react-redux', () => {
  const real = jest.requireActual('react-redux')
  return { ...real, useDispatch: jest.fn() }
})

import { setWeatherDatetime } from '../../lib/reducers/weather'
jest.mock('../../lib/reducers/weather', () => ({
  setWeatherDatetime: jest.fn((payload: string) => ({
    type: 'SET_WEATHER_DATETIME',
    payload
  }))
}))

const mockStore = configureStore([thunk])

describe('GlobalWeatherTimeSelector', () => {
  const renderWithStore = (state: any) =>
    render(
      <Provider store={mockStore(state)}>
        <GlobalWeatherTimeSelector />
      </Provider>
    )

  it('no se muestra si faltan coordenadas', () => {
    const { container } = renderWithStore({
      otp: { currentQuery: {} },
      weather: { datetime: '2025-01-01T12:00:00' }
    })
    expect(container.firstChild).toBeNull()
  })

  it('despacha setWeatherDatetime al cambiar fecha', () => {
    const dispatch = jest.fn()
    const { useDispatch } = require('react-redux')
    useDispatch.mockReturnValue(dispatch)

    const { getByText, getByLabelText } = renderWithStore({
      otp: { currentQuery: { from: { lat: 1, lon: 2 }, to: { lat: 3, lon: 4 } } },
      weather: { datetime: '2025-01-01T12:00:00' }
    })

    fireEvent.click(getByText('📅'))

    fireEvent.change(getByLabelText(/date/i), { target: { value: '2025-02-02' } })

    expect(setWeatherDatetime).toHaveBeenCalledWith('2025-02-02T12:00:00')
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_WEATHER_DATETIME',
      payload: '2025-02-02T12:00:00'
    })
  })
})
