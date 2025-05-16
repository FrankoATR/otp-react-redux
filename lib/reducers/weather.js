// lib/reducers/weather.ts
const initialState = {
  byId: {},   // { [id]: { lat, lon, data } }
  loading: false,
  error: null
}

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_WEATHER':
      return { ...state, loading: true }

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
      return { ...state, loading: false, error: action.error }

    case 'CLEAR_WEATHER':
      return { ...state, byId: {}, loading: false, error: null }

    default:
      return state
  }
}
