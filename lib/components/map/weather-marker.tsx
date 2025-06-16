// src/components/weather-marker.tsx

import { Marker } from 'react-map-gl'
import React from 'react'
import styled from 'styled-components'

interface WeatherData {
  lat: number
  lon: number
  loading?: boolean
  data?: {
    temperature:   number
    weathercode:   number
    winddirection: number
    windspeed:     number
  } | null
}

interface Props {
  lat: number
  lon: number
  weather: WeatherData
}

const Card = styled.div<{ raining: boolean }>`
  background: #fff;
  padding: 8px 10px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: bold;
  color: #333;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  white-space: nowrap;
  border: 1px solid ${(props) => (props.raining ? '#3498db' : '#f39c12')};
`

export default function WeatherMarker({ lat, lon, weather }: Props) {
  const isLoading = weather.loading
  const hasData   = weather.data != null

  const raining = hasData && weather.data!.weathercode >= 60

  return (
    <Marker anchor="bottom" latitude={lat} longitude={lon}>
      <Card raining={raining}>
        {isLoading ? (
          'Searching...'
        ) : !hasData ? (
          '⚠ No weather data found'
        ) : (
          <>
            {raining ? '☔ Raining' : '🌤'} {weather.data!.temperature} °C
            <br />
            💨 {weather.data!.windspeed} km/h
            <br />
            🧭 Wind direction: {weather.data!.winddirection}°
          </>
        )}
      </Card>
    </Marker>
  )
}
