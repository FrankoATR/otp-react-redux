// lib/components/map/weather-marker.tsx
import { Marker } from 'react-map-gl'
import React from 'react'
import styled from 'styled-components'

export default function WeatherMarker({
  lat,
  lon,
  weather // <- objeto completo guardado en el store
}: {
  lat: number
  lon: number
  weather: any
}) {
  if (!weather?.data) return null

  const { temperature, weathercode, windspeed, winddirection } = weather.data
  const raining = weathercode >= 60
  const Card = styled.div`
    background: #fff;
    padding: 8px 10px;
    border-radius: 16px;
    font-size: 13px;
    font-weight: bold;
    color: #333;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    pointer-events: none;
    white-space: nowrap;
    border: 1px solid ${raining ? '#3498db' : '#f39c12'};
  `
  return (
    <Marker anchor="bottom" latitude={lat} longitude={lon}>
      <Card>
        {raining ? '☔ Lluvia' : '🌤'} {temperature} °C
        <br />
        💨 {windspeed} km/h
        <br />
        🧭 Dirección del viento: {winddirection}°<br />
      </Card>
    </Marker>
  )
}
