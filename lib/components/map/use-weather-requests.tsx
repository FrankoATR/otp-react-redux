// lib/components/map/use-weather-requests.tsx
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearWeather, fetchWeather } from '../../actions/weather'
import { getActiveItinerary } from '../../util/state'
import polyline from '@mapbox/polyline'

/* ───── CONFIG ───────────────────────────── */
const MODES_WITH_WEATHER = ['WALK', 'BICYCLE', 'CAR']
const STEP_KM = 6
/* ─────────────────────────────────────────── */

// tipos locales
interface Leg {
  mode: string
  legGeometry?: { points: string }
  geometry?: { coordinates: [number, number][] }
}

interface Itinerary {
  id: string
  legs?: Leg[]
}

interface RootState {
  otp: {
    activeSearchId: string
    currentQuery: {
      from: { lat: number; lon: number } | null
      to: { lat: number; lon: number } | null
    }
  }
  weather: any
}

/* distancia Haversine (km) */
const haversine = ([lat1, lon1]: number[], [lat2, lon2]: number[]) => {
  const R = 6371
  const rad = (d: number) => (d * Math.PI) / 180
  const dLat = rad(lat2 - lat1)
  const dLon = rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

export default function useWeatherRequests () {
  const dispatch = useDispatch()
  const searchId = useSelector((s: RootState) => s.otp.activeSearchId)
  const from     = useSelector((s: RootState) => s.otp.currentQuery.from)
  const to       = useSelector((s: RootState) => s.otp.currentQuery.to)
  const itinerary = useSelector(getActiveItinerary) as Itinerary | null

  const prevItinId = useRef<string | null>(null)

  const fetchFromTo = () => {
    if (from?.lat && from?.lon)
      dispatch(fetchWeather({ lat: from.lat, lon: from.lon, id: 'from' }))
    if (to?.lat && to?.lon)
      dispatch(fetchWeather({ lat: to.lat, lon: to.lon, id: 'to' }))
  }

  useEffect(fetchFromTo, [from?.lat, from?.lon, to?.lat, to?.lon])

  useEffect(() => {
    const routeChanged = itinerary && prevItinId.current !== itinerary.id

    if (routeChanged || !prevItinId.current) {
      dispatch(clearWeather())
      fetchFromTo()
      prevItinId.current = itinerary?.id ?? null
    }

    if (!itinerary?.legs?.length) return

    itinerary.legs.forEach((leg: Leg, legIdx: number) => {
      if (!MODES_WITH_WEATHER.includes(leg.mode)) return

      const raw: number[][] | undefined =
        leg.legGeometry?.points
          ? polyline.decode(leg.legGeometry.points)
          : leg.geometry?.coordinates?.map(([lon, lat]) => [lat, lon])

      if (!raw?.length) return

      let acc = 0
      let last = raw[0]

      raw.forEach(([lat, lon]: number[], ptIdx: number) => {
        acc += haversine(last, [lat, lon])
        const isLast = ptIdx === raw.length - 1

        if (acc >= STEP_KM || isLast) {
          const id = `leg-${legIdx}-pt-${ptIdx}`
          dispatch(fetchWeather({ lat, lon, id }))
          acc = 0
        }
        last = [lat, lon]
      })
    })
  }, [searchId, itinerary])
}