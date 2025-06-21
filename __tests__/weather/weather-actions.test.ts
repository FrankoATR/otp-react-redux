import {
  fetchWeather,
  REQUEST_WEATHER,
  RECEIVE_WEATHER
} from '../../lib/actions/weather'

jest.mock('../../lib/api/weather-api', () => ({
  fetchWeatherForDatetime: jest.fn(async () => ({
    temperature: 20,
    weathercode: 0,
    windspeed: 5,
    winddirection: 90,
    lat: 1,
    lon: 2
  }))
}))

describe('weather actions (thunk)', () => {
  it('despacha REQUEST_WEATHER y luego RECEIVE_WEATHER', async () => {
    const dispatch = jest.fn()

    await fetchWeather({
      id: 'from',
      lat: 1,
      lon: 2,
      datetime: '2025-01-01T12:00:00'
    })(dispatch, () => ({}), {})

    expect(dispatch.mock.calls[0][0].type).toBe(REQUEST_WEATHER)
    expect(dispatch.mock.calls[1][0].type).toBe(RECEIVE_WEATHER)

    const receive = dispatch.mock.calls[1][0]
    expect(receive.payload.data.temperature).toBe(20)
  })
})
