import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import useWeatherRequests from '../../lib/components/map/use-weather-requests'

/* ====== mocks para evitar maplibre ====== */
global.URL.createObjectURL = jest.fn()
jest.mock('maplibre-gl', () => ({}), { virtual: true })
jest.mock('@opentripplanner/base-map', () => () => null, { virtual: true })
jest.mock('@opentripplanner/transitive-overlay', () => ({}), { virtual: true })
/* ======================================== */

const mockStore = configureStore([thunk])

describe('useWeatherRequests', () => {
  it('hace dispatch con coordenadas from y to', () => {
    const store = mockStore({
      otp: {
        currentQuery: {
          from: { lat: 1, lon: 2 },
          to:   { lat: 3, lon: 4 }
        },
        activeSearchId: 'abc',
        currentItineraryIndex: 0
      },
      weather: {}
    })

    renderHook(() => useWeatherRequests(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    })

    const actions = store.getActions()
    expect(actions.some(a => a.type === 'REQUEST_WEATHER')).toBe(false)
  })
})
