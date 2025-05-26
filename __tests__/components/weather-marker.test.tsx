import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import WeatherMarker from '../../lib/components/map/weather-marker'

// Mock de react-map-gl
jest.mock('react-map-gl', () => ({
  Marker: ({ children }: any) => <div>{children}</div>
}))

test('muestra clima con ícono de lluvia', () => {
  render(
    <WeatherMarker
      lat={1}
      lon={2}
      weather={{
        data: {
          temperature: 22,
          weathercode: 61, // lluvia
          windspeed: 10,
          winddirection: 180
        }
      }}
    />
  )

  // Busca el texto “Raining” (inglés) sin distinción de mayúsculas
  expect(screen.getByText(/raining/i)).toBeInTheDocument()

  // Temperatura
  expect(screen.getByText(/22/)).toBeInTheDocument()
})
