// lib/actions/weather.ts
import { createAction } from 'redux-actions'

// Tipo para el payload del clima
export interface WeatherPayload {
  temperature: number
  weathercode: number
  windspeed: number
  winddirection: number
}

// Parámetros para fetchWeather
export interface WeatherRequest {
  lat: number
  lon: number
  id: string
}

// Acciones básicas
export const requestWeather = createAction('REQUEST_WEATHER')
export const weatherError = createAction<string>('WEATHER_ERROR')
export const clearWeather = () => ({ type: 'CLEAR_WEATHER' })

// Acción completa cuando se recibe clima
export const receiveWeather = (
  payload: WeatherPayload,
  meta: WeatherRequest
) => ({
  type: 'RECEIVE_WEATHER',
  payload,
  ...meta
})

// Thunk asíncrono principal
export const fetchWeather = ({ lat, lon, id }: WeatherRequest) => async (dispatch: any) => {
  dispatch(requestWeather())
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    const res = await fetch(url)
    const json = await res.json()
    dispatch(receiveWeather(json.current_weather, { lat, lon, id }))
  } catch (err: any) {
    dispatch(weatherError(err.message))
  }
}