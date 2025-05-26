import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import polyline from '@mapbox/polyline'

import { clearWeather, fetchWeather } from '../../actions/weather'
import { getActiveItinerary } from '../../util/state'

const MODES_WITH_WEATHER = ['WALK', 'BICYCLE', 'CAR']
const STEP_KM = 2.5

interface RootState {
  otp: {
    activeSearchId: string
    currentQuery: {
      from: { lat: number; lon: number } | null
      to: { lat: number; lon: number } | null
    }
  }
}

export type LatLon = [number, number]

const toLatLon = ([lon, lat]: [number, number]): LatLon => [lat, lon]

const haversineKm = ([la1, lo1]: LatLon, [la2, lo2]: LatLon) => {
  const R = 6371
  const rad = (d: number) => d * Math.PI / 180
  const dLat = rad(la2 - la1)
  const dLon = rad(lo2 - lo1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

const sampleRouteUniform = (
  points: LatLon[],
  maxGapKm = 2
): LatLon[] => {
  if (points.length < 2) return []

  const cumul: number[] = [0]
  for (let i = 1; i < points.length; i++) {
    cumul[i] = cumul[i - 1] + haversineKm(points[i - 1], points[i])
  }
  const totalKm = cumul.at(-1)!
  if (totalKm <= maxGapKm) return []

  const gaps = Math.ceil(totalKm / maxGapKm)
  const spacing = totalKm / gaps

  const targets: number[] = []
  for (let d = spacing; d < totalKm; d += spacing) targets.push(d)

  const out: LatLon[] = []
  let seg = 1
  targets.forEach(t => {
    while (cumul[seg] < t) seg++
    const distPrev = cumul[seg - 1]
    const ratio = (t - distPrev) / (cumul[seg] - distPrev)
    const [la1, lo1] = points[seg - 1]
    const [la2, lo2] = points[seg]
    out.push([la1 + (la2 - la1) * ratio, lo1 + (lo2 - lo1) * ratio])
  })

  return out
}


export default function useWeatherRequests() {
  const dispatch = useDispatch()
  const searchId = useSelector((s: RootState) => s.otp.activeSearchId)
  const { from, to } = useSelector((s: RootState) => s.otp.currentQuery)
  const itinerary = useSelector(getActiveItinerary) as any | null

  const prevItinId = useRef<string | null>(null)

  const fetchFromTo = () => {
    if (from) dispatch(fetchWeather({ ...from, id: 'from' }))
    if (to) dispatch(fetchWeather({ ...to, id: 'to' }))
  }

  useEffect(() => {
    const changed = itinerary?.id && itinerary.id !== prevItinId.current
    if (changed || prevItinId.current === null) {
      dispatch(clearWeather())
      fetchFromTo()
      prevItinId.current = itinerary?.id ?? null
    }
    if (!itinerary?.legs?.length) return

    const route: LatLon[] = itinerary.legs
      .filter((l: any) => MODES_WITH_WEATHER.includes(l.mode))
      .flatMap((l: any) => {
        if (l.legGeometry?.points) return polyline.decode(l.legGeometry.points)
        if (l.geometry?.coordinates) return l.geometry.coordinates.map(toLatLon)
        return []
      })
    if (route.length < 2) return

    const samples = sampleRouteUniform(route, STEP_KM)

    samples.forEach(([lat, lon], i) =>
      dispatch(fetchWeather({ lat, lon, id: `sample-${i + 1}` }))
    )
  }, [searchId, itinerary])
}
