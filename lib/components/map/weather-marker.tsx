// src/components/map/weather-marker.tsx

import { Marker } from 'react-map-gl'
import React from 'react'
import styled from 'styled-components'

interface WeatherData {
  lat: number
  lon: number
  loading?: boolean
  data?: {
    temperature: number
    weathercode: number
    winddirection: number
    windspeed: number
  } | null
}

interface Props {
  lat: number
  lon: number
  weather?: WeatherData
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
  border: 1px solid ${(p) => (p.raining ? '#3498db' : '#f39c12')};
`

export default function WeatherMarker({ lat, lon, weather }: Props) {
  if (!weather) {
    return (
      <Marker anchor="bottom" latitude={lat} longitude={lon}>
        <Card raining={false}>🔄 Searching info...</Card>
      </Marker>
    )
  }

  const { loading = false, data = null } = weather
  const isLoading = loading
  const hasData = data !== null
  const raining = hasData && data!.weathercode >= 60

  return (
    <Marker anchor="bottom" latitude={lat} longitude={lon}>
      <Card raining={raining}>
        {isLoading ? (
          '🔄 Searching info...'
        ) : !hasData ? (
          '⚠ No data for weather found'
        ) : (
          <>
            {raining ? '☔ Raining' : '🌤'} {data!.temperature} °C
            <br />
            💨 {data!.windspeed} km/h
            <br />
            🧭 Wind direction: {data!.winddirection}°
          </>
        )}
      </Card>
    </Marker>
  )
}
