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


function getWeatherDescription(code: number): string {
  if (code === 0) return '☀️ Clear sky'
  if ([1, 2].includes(code)) return '🌤 Partly cloudy'
  if (code === 3) return '☁️ Overcast'
  if ([45, 48].includes(code)) return '🌫 Fog'
  if ([51, 53, 55].includes(code)) return '🌦 Light drizzle'
  if ([56, 57].includes(code)) return '🌦 Freezing drizzle'
  if ([61, 63, 65].includes(code)) return '🌧 Rain'
  if ([66, 67].includes(code)) return '🌧 Freezing rain'
  if ([71, 73, 75].includes(code)) return '❄️ Snow'
  if ([77].includes(code)) return '🌨 Snow grains'
  if ([80, 81, 82].includes(code)) return '🌧 Showers'
  if ([85, 86].includes(code)) return '❄️ Snow showers'
  if ([95].includes(code)) return '⛈ Thunderstorm'
  if ([96, 99].includes(code)) return '⛈ Thunderstorm with hail'
  return '🔍 Unknown'
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

  const hasData =
    (data !== null) &&
    (data.temperature !== null) &&
    (data.winddirection !== null) &&
    (data.windspeed !== null) &&
    (data.weathercode !== null)

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
            {getWeatherDescription(data!.weathercode)} — {data!.temperature} °C
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
