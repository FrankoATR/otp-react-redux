import { fetchWeather, weatherError, receiveWeather, requestWeather } from '../../lib/actions/weather'

describe('weather actions', () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn() as jest.Mock
  })

  it('debe hacer dispatch de clima exitoso', async () => {
    const mockResponse = { current_weather: { temperature: 28 } }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse)
    })

    await fetchWeather({ lat: 1, lon: 2, id: 'test' })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(requestWeather())
    expect(dispatch).toHaveBeenCalledWith(receiveWeather(mockResponse.current_weather, { lat: 1, lon: 2, id: 'test' }))
  })

  it('debe manejar errores de API', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Fallo'))

    await fetchWeather({ lat: 1, lon: 2, id: 'test' })(dispatch)

    expect(dispatch).toHaveBeenCalledWith(weatherError('Fallo'))
  })
})