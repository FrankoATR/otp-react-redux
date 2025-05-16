// lib/components/map/weather-overlay.tsx
import React from 'react'
import { useSelector } from 'react-redux'
import WeatherMarker from './weather-marker'

export default function WeatherOverlay () {
  const weatherById = useSelector(s => s.weather.byId)
  const from = useSelector(s => s.otp.currentQuery.from)
  const to   = useSelector(s => s.otp.currentQuery.to)

  return (
    <>
      {from && weatherById.from && (
        <WeatherMarker lat={from.lat} lon={from.lon} weather={weatherById.from} />
      )}

      {to && weatherById.to && (
        <WeatherMarker lat={to.lat} lon={to.lon} weather={weatherById.to} />
      )}

      {/* cualquier otro punto (leg-0-…, leg-1-…, mid, etc.) */}
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
