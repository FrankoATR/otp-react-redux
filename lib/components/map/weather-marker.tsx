// lib/components/map/weather-marker.tsx
import React from 'react'
import { Marker } from 'react-map-gl'
import styled from 'styled-components'

const Card = styled.div`
  background: #fff;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: 0 0 4px rgba(0,0,0,.2);
  pointer-events: none;
  white-space: nowrap;
`

export default function WeatherMarker ({
  lat,
  lon,
  weather // <- objeto completo guardado en el store
}: {
  lat: number
  lon: number
  weather: any
}) {
  if (!weather?.data) return null

  const { temperature, weathercode } = weather.data
  const raining = weathercode >= 60

  return (
    <Marker longitude={lon} latitude={lat} anchor="bottom">
      <Card>
        {raining ? '☔ Lluvia' : '🌤️'} {temperature} °C
      </Card>
    </Marker>
  )
}
