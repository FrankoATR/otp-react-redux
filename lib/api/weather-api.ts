// src/lib/api/weather-api.ts

const API_FORECAST = 'https://api.open-meteo.com/v1/forecast'
const API_ARCHIVE  = 'https://archive-api.open-meteo.com/v1/archive'

export interface WeatherResponse {
  temperature:   number
  weathercode:   number
  windspeed:     number
  winddirection: number
}

/**
 * Consulta Open-Meteo para la fecha/hora dada.
 * Si la fecha es pasada, usa el endpoint histórico; si no, usa forecast.
 */
export async function fetchWeatherForDatetime(
  lat: number,
  lon: number,
  datetime: Date
): Promise<WeatherResponse | null> {
  const now    = new Date()
  const isPast = datetime < now

  const dateStr = datetime.toISOString().slice(0, 10)          // "YYYY-MM-DD"
  const hourStr = datetime.toISOString().slice(0, 13) + ':00' // "YYYY-MM-DDTHH:00"

  const endpoint = isPast ? API_ARCHIVE : API_FORECAST
  const url = new URL(endpoint)
  url.searchParams.set('latitude',  lat.toString())
  url.searchParams.set('longitude', lon.toString())
  url.searchParams.set(
    'hourly',
    'temperature_2m,weathercode,windspeed_10m,winddirection_10m'
  )
  url.searchParams.set('start_date', dateStr)
  url.searchParams.set('end_date',   dateStr)
  url.searchParams.set('timezone',   'auto')

  const res = await fetch(url.toString())
  if (!res.ok) return null
  const json = await res.json()

  const idx = json.hourly.time.findIndex((t: string) =>
    t.startsWith(hourStr)
  )
  if (idx === -1) return null

  return {
    temperature:   json.hourly.temperature_2m[idx],
    weathercode:   json.hourly.weathercode[idx],
    windspeed:     json.hourly.windspeed_10m[idx],
    winddirection: json.hourly.winddirection_10m[idx],
  }
}
