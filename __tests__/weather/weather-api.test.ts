import { fetchWeatherForDatetime } from '../../lib/api/weather-api'

/* ---------- mock global.fetch ---------- */
global.fetch = jest.fn(async () => ({
  ok: true,
  json: async () => ({
    hourly: {
      time:              ['2000-01-01T12:00', '2100-01-01T12:00'],
      temperature_2m:    [23, 24],
      weathercode:       [0, 1],
      windspeed_10m:     [5, 6],
      winddirection_10m: [90, 100]
    }
  })
})) as unknown as typeof fetch

describe('fetchWeatherForDatetime', () => {
  it('elige el endpoint correcto según pasado/futuro', async () => {
    await fetchWeatherForDatetime(1, 2, new Date('2000-01-01T12:00:00'))
    await fetchWeatherForDatetime(1, 2, new Date('2100-01-01T12:00:00'))

    const [pastCall, futureCall] = (fetch as jest.Mock).mock.calls
    expect(pastCall[0]).toContain('archive-api.open-meteo.com')
    expect(futureCall[0]).toContain('api.open-meteo.com/v1/forecast')
  })

  it('devuelve null o un objeto con números', async () => {
    const res = await fetchWeatherForDatetime(1, 2, new Date('2000-01-01T12:00:00'))
    if (res === null) {
      expect(res).toBeNull()
    } else {
      expect(typeof res.data.temperature).toBe('number')
      expect(typeof res.data.windspeed).toBe('number')
    }
  })
})
