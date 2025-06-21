import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

/* -------- mocks -------- */
jest.mock('@mapbox/polyline', () => ({ decode: () => [] }))

jest.mock('../../lib/util/state', () => ({
  getActiveItinerary: jest.fn(() => null)
}))

jest.mock('../../lib/actions/weather', () => ({
  clearWeather: () => ({ type: 'CLEAR_WEATHER' }),
  fetchWeather: jest.fn(({ id }) => ({ type: 'FETCH_WEATHER', payload: { id } }))
}))

import useWeatherRequests from '../../lib/components/map/use-weather-requests'
import { fetchWeather } from '../../lib/actions/weather'

const mockStore = configureStore([thunk])

describe('useWeatherRequests', () => {
  it('despacha clearWeather y dos fetchWeather', () => {
    const store = mockStore({
      otp: {
        activeSearchId: 'abc',
        currentQuery: { from: { lat: 1, lon: 2 }, to: { lat: 3, lon: 4 } }
      },
      weather: { datetime: '2025-01-01T12:00:00' }
    })

    renderHook(() => useWeatherRequests(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    const actions = store.getActions()
    expect(actions).toContainEqual({ type: 'CLEAR_WEATHER' })
    expect(fetchWeather).toHaveBeenCalledTimes(2)
    const ids = actions
      .filter(a => a.type === 'FETCH_WEATHER')
      .map(a => a.payload.id)
      .sort()
    expect(ids).toEqual(['from', 'to'])
  })
})
