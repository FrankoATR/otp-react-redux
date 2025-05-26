// lib/components/map/weather-overlay.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import WeatherMarker from './weather-marker'

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

interface RootState {
  otp: {
    currentQuery: {
      from: { lat: number; lon: number } | null
      to: { lat: number; lon: number } | null
    }
  }
  weather: {
    byId: Record<string, WeatherData>
  }
}

export default function WeatherOverlay () {
  const weatherById = useSelector((s: RootState) => s.weather.byId)
  const from = useSelector((s: RootState) => s.otp.currentQuery.from)
  const to   = useSelector((s: RootState) => s.otp.currentQuery.to)

  return (
    <>
      {from && weatherById.from && (
        <WeatherMarker lat={from.lat} lon={from.lon} weather={weatherById.from} />
      )}

      {to && weatherById.to && (
        <WeatherMarker lat={to.lat} lon={to.lon} weather={weatherById.to} />
      )}

      {Object.entries(weatherById).map(([id, w]) => {
        if (id === 'from' || id === 'to') return null
        return (
          <WeatherMarker
            key={id}
            lat={w.lat}
            lon={w.lon}
            weather={w}
          />
        )
      })}
    </>
  )
}