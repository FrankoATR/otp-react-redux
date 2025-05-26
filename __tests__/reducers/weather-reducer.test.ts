// Tipos para los datos del clima
interface WeatherData {
  temperature: number
  weathercode: number
  windspeed: number
  winddirection: number
  [key: string]: any
}

// Cada entrada del clima en el store
interface WeatherEntry {
  lat: number
  lon: number
  data: WeatherData
}

// Estado completo del reducer
interface WeatherState {
  byId: Record<string, WeatherEntry>
  loading: boolean
  error: string | null
}

// Estado inicial tipado
const initialState: WeatherState = {
  byId: {},
  loading: false,
  error: null
}

// Reducer
export default function weatherReducer(
  state: WeatherState = initialState,
  action: any
): WeatherState {
  switch (action.type) {
    case 'REQUEST_WEATHER':
      return {
        ...state,
        loading: true
      }

    case 'RECEIVE_WEATHER':
      return {
        ...state,
        loading: false,
        byId: {
          ...state.byId,
          [action.id]: {
            lat: action.lat,
            lon: action.lon,
            data: action.payload
          }
        }
      }

    case 'WEATHER_ERROR':
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case 'CLEAR_WEATHER':
      return {
        ...state,
        byId: {},
        loading: false,
        error: null
      }

    default:
      return state
  }
}