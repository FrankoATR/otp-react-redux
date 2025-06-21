import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import WeatherMarker from '../../lib/components/map/weather-marker'

jest.mock('react-map-gl', () => ({
  Marker: ({ children }: any) => <div data-testid="marker">{children}</div>
}))

describe('WeatherMarker', () => {
  it('muestra “searching info” sin datos', () => {
    render(<WeatherMarker lat={1} lon={2} />)
    expect(screen.getByText(/searching info/i)).toBeInTheDocument()
  })

  it('muestra datos de lluvia (weathercode ≥ 60)', () => {
    render(
      <WeatherMarker
        lat={1}
        lon={2}
        weather={{
          lat: 1,
          lon: 2,
          data: { temperature: 22, weathercode: 61, windspeed: 15, winddirection: 180 }
        }}
      />
    )
    expect(screen.getByText(/raining/i)).toBeInTheDocument()
  })

  it('muestra ícono soleado (weathercode < 60)', () => {
    render(
      <WeatherMarker
        lat={1}
        lon={2}
        weather={{
          lat: 1,
          lon: 2,
          data: { temperature: 25, weathercode: 1, windspeed: 5, winddirection: 270 }
        }}
      />
    )
    expect(screen.queryByText(/raining/i)).not.toBeInTheDocument()
    expect(screen.getByText((c) => c.includes('🌤'))).toBeInTheDocument()
  })
})
