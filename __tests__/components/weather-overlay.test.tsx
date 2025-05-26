import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import WeatherOverlay from '../../lib/components/map/weather-overlay'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

test('renderiza todos los marcadores de clima', () => {
  const store = mockStore({
    weather: {
      byId: {
        from: { lat: 1, lon: 2, data: { temperature: 20, weathercode: 0 } },
        to: { lat: 3, lon: 4, data: { temperature: 25, weathercode: 0 } },
        'leg-1-pt-5': { lat: 5, lon: 6, data: { temperature: 27, weathercode: 61 } }
      }
    },
    otp: {
      currentQuery: {
        from: { lat: 1, lon: 2 },
        to: { lat: 3, lon: 4 }
      }
    }
  })

  render(
    <Provider store={store}>
      <WeatherOverlay />
    </Provider>
  )

  expect(screen.getAllByText(/°C/i).length).toBe(3)
})
