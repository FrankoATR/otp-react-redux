// src/reducers/weather.ts

import {
  REQUEST_WEATHER,
  RECEIVE_WEATHER,
  CLEAR_WEATHER
} from '../actions/weather'

export interface WeatherData {
  lat: number
  lon: number
  loading?: boolean
  data?: {
    temperature:   number
    weathercode:   number
    windspeed:     number
    winddirection: number
  } | null
}

export interface WeatherState {
  byId:    Record<string, WeatherData>
  datetime: string
}

const initialState: WeatherState = {
  byId: {},
  datetime: new Date().toISOString().slice(0, 13) + ':00:00'
}

export default function weatherReducer(
  state: WeatherState = initialState,
  action: any
): WeatherState {
  switch (action.type) {
    case CLEAR_WEATHER:
      return { ...state, byId: {} }

    case REQUEST_WEATHER: {
      const { id, lat, lon } = action.payload
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: { lat, lon, loading: true, data: undefined }
        }
      }
    }

    case RECEIVE_WEATHER: {
      const { id, lat, lon, data } = action.payload
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: { lat, lon, loading: false, data: data ?? null }
        }
      }
    }

    case 'SET_WEATHER_DATETIME':
      return { ...state, datetime: action.payload }

    default:
      return state
  }
}

export function setWeatherDatetime(datetime: string) {
  return { type: 'SET_WEATHER_DATETIME' as const, payload: datetime }
}
