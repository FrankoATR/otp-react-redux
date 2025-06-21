import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

jest.mock('../../lib/components/map/weather-marker', () => () => (
  <div data-testid="marker">marker</div>
))
jest.mock('../../lib/components/map/global-weather-time-selector', () => () => (
  <div data-testid="selector">selector</div>
))

import WeatherOverlay from '../../lib/components/map/weather-overlay'

const mockStore = configureStore([thunk])

describe('WeatherOverlay', () => {
  it('renderiza los marcadores correctos', () => {
    const store = mockStore({
      otp: { currentQuery: { from: { lat: 1, lon: 2 }, to: { lat: 3, lon: 4 } } },
      weather: {
        byId: {
          from: { lat: 1, lon: 2, data: {} },
          to: { lat: 3, lon: 4, data: {} },
          'sample-1': { lat: 5, lon: 6, data: {} }
        }
      }
    })

    render(
      <Provider store={store}>
        <WeatherOverlay />
      </Provider>
    )

    expect(screen.getAllByTestId('marker')).toHaveLength(3)
    expect(screen.getByTestId('selector')).toBeInTheDocument()
  })
})
