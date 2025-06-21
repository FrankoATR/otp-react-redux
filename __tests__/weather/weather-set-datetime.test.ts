import reducer, { setWeatherDatetime } from '../../lib/reducers/weather'

describe('setWeatherDatetime action', () => {
  it('actualiza el campo datetime en el reducer', () => {
    const init = reducer(undefined, { type: '@@INIT' } as any)
    const action = setWeatherDatetime('2030-01-01T15:00:00')
    const state  = reducer(init, action)
    expect(state.datetime).toBe('2030-01-01T15:00:00')
  })
})
