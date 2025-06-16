// src/components/weather-overlay.tsx

import React from 'react'
import { useSelector } from 'react-redux'
import WeatherMarker from './weather-marker'
import GlobalWeatherTimeSelector from './global-weather-time-selector'

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

export default function WeatherOverlay() {
  const weatherById = useSelector((s: any) => s.weather.byId)
  const { from, to } = useSelector((s: any) => s.otp.currentQuery)

  return (
    <>
      {from && <WeatherMarker lat={from.lat} lon={from.lon} weather={weatherById.from} />}
      {to && <WeatherMarker lat={to.lat} lon={to.lon} weather={weatherById.to} />}

      {Object.entries(weatherById).map(([id, w]: any) => {
        if (id === 'from' || id === 'to') return null
        return <WeatherMarker key={id} lat={w.lat} lon={w.lon} weather={w} />
      })}

      <GlobalWeatherTimeSelector />
    </>
  )
}
