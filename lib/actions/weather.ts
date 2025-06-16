// src/actions/weather.ts

import { fetchWeatherForDatetime, WeatherResponse } from '../api/weather-api'

export const REQUEST_WEATHER  = 'REQUEST_WEATHER'
export const RECEIVE_WEATHER  = 'RECEIVE_WEATHER'
export const CLEAR_WEATHER    = 'CLEAR_WEATHER'

export const clearWeather = () => ({ type: CLEAR_WEATHER })

export function fetchWeather(params: {
  lat: number
  lon: number
  id: string
  datetime: string   // ISO "YYYY-MM-DDTHH:00:00"
}) {
  return async (dispatch: any) => {
    const { lat, lon, id, datetime } = params

    dispatch({
      type: REQUEST_WEATHER,
      payload: { id, lat, lon }
    })

    const dt   = new Date(datetime)
    const data = await fetchWeatherForDatetime(lat, lon, dt)

    dispatch({
      type: RECEIVE_WEATHER,
      payload: { id, lat, lon, data: data as WeatherResponse | null }
    })
  }
}
