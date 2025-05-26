// lib/components/map/weather-marker.tsx
import { Marker } from 'react-map-gl'
import React from 'react'
import styled from 'styled-components'

interface WeatherData {
  lat: number
  lon: number
  data: {
    temperature: number
    weathercode: number
    windspeed: number
    winddirection: number
  }
}

interface Props {
  lat: number
  lon: number
  weather: WeatherData
}

// mover fuera para evitar crear el styled-component en cada render
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
  border: 1px solid ${props => (props.raining ? '#3498db' : '#f39c12')};
`

export default function WeatherMarker({ lat, lon, weather }: Props) {
  if (!weather?.data) return null

  const { temperature, weathercode, windspeed, winddirection } = weather.data
  const raining = weathercode >= 60

  return (
    <Marker anchor="bottom" latitude={lat} longitude={lon}>
      <Card raining={raining}>
        {raining ? '☔ Lluvia' : '🌤'} {temperature} °C
        <br />
        💨 {windspeed} km/h
        <br />
        🧭 Dirección del viento: {winddirection}°
      </Card>
    </Marker>
  )
}