// lib/actions/weather.js
import { createAction } from 'redux-actions'

export const requestWeather  = createAction('REQUEST_WEATHER')
// lib/actions/weather.ts
export const receiveWeather = (payload, { lat, lon, id }) => ({
  type   : 'RECEIVE_WEATHER',
  payload,
  lat,
  lon,
  id
})
export const weatherError    = createAction('WEATHER_ERROR')

/**
 * Thunk que consulta Open-Meteo y guarda el resultado.
 * @param {{lat:number, lon:number, id:string}} p
 */
export const fetchWeather = ({ lat, lon, id }) => async (dispatch) => {
  dispatch(requestWeather())
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    const res  = await fetch(url)
    const json = await res.json()
    dispatch(receiveWeather(json.current_weather, { lat, lon, id}))
  } catch (err) {
    dispatch(weatherError(err.message))
  }
}

export const clearWeather = () => ({ type: 'CLEAR_WEATHER' })
