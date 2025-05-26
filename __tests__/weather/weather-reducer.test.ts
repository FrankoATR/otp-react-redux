import weatherReducer from '../../lib/reducers/weather'

const initialState = {
  byId: {},
  loading: false,
  error: null
}

describe('weatherReducer', () => {
  it('devuelve el estado inicial por defecto', () => {
    const newState = weatherReducer(undefined, { type: '@@INIT' })
    expect(newState).toEqual(initialState)
  })

  it('maneja REQUEST_WEATHER', () => {
    const action = { type: 'REQUEST_WEATHER' }
    const newState = weatherReducer(initialState, action)
    expect(newState.loading).toBe(true)
  })

  it('maneja RECEIVE_WEATHER', () => {
    const action = {
      type: 'RECEIVE_WEATHER',
      id: 'test',
      lat: 1,
      lon: 2,
      payload: { temperature: 20, weathercode: 0, windspeed: 5, winddirection: 90 }
    }
    const newState = weatherReducer(initialState, action)
    expect(newState.loading).toBe(false)
    expect(newState.byId.test).toEqual({
      lat: 1,
      lon: 2,
      data: action.payload
    })
  })

  it('maneja WEATHER_ERROR', () => {
    const action = { type: 'WEATHER_ERROR', error: 'fail' }
    const newState = weatherReducer({ ...initialState, loading: true }, action)
    expect(newState.loading).toBe(false)
    expect(newState.error).toBe('fail')
  })
})
