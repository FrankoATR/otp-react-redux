// lib/reducers/weather.ts
import { AnyAction } from 'redux'
import { WeatherPayload } from '../actions/weather' // desde el archivo que ya corregimos

interface WeatherData {
  lat: number
  lon: number
  data: WeatherPayload
}

interface WeatherState {
  byId: Record<string, WeatherData>
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  byId: {},
  loading: false,
  error: null
}

export default function weatherReducer(
  state: WeatherState = initialState,
  action: AnyAction
): WeatherState {
  switch (action.type) {
    case 'REQUEST_WEATHER':
      return { ...state, loading: true }

    case 'RECEIVE_WEATHER': {
      const { payload, lat, lon, id } = action as unknown as {
        payload: WeatherPayload
        lat: number
        lon: number
        id: string
      }

      return {
        ...state,
        loading: false,
        byId: {
          ...state.byId,
          [id]: { lat, lon, data: payload }
        }
      }
    }

    case 'WEATHER_ERROR':
      return { ...state, loading: false, error: action.error ?? 'Error desconocido' }

    case 'CLEAR_WEATHER':
      return { ...state, byId: {}, loading: false, error: null }

    default:
      return state
  }
}