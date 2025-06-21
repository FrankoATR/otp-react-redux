import reducer from '../../lib/reducers/weather'
import {
  REQUEST_WEATHER,
  RECEIVE_WEATHER
} from '../../lib/actions/weather'

const baseState = reducer(undefined, { type: '@@INIT' } as any)

describe('weatherReducer', () => {
  it('retorna su estado inicial', () => {
    expect(baseState.byId).toEqual({})
  })

  it('maneja REQUEST_WEATHER', () => {
    const action = {
      type: REQUEST_WEATHER,
      payload: { id: 'pt', lat: 1, lon: 2 }
    }
    const state = reducer(baseState, action)
    expect(state.byId.pt?.loading).toBe(true)
  })

  it('maneja RECEIVE_WEATHER', () => {
    const action = {
      type: RECEIVE_WEATHER,
      payload: {
        id: 'pt',
        lat: 1,
        lon: 2,
        data: { temperature: 18, weathercode: 0, windspeed: 4, winddirection: 100 }
      }
    }
    const state = reducer(baseState, action)
    expect(state.byId.pt?.data?.temperature).toBe(18)
  })
})
