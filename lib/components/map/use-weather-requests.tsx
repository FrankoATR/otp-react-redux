// src/hooks/use-weather-requests.tsx

import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import polyline from '@mapbox/polyline'
import { clearWeather, fetchWeather } from '../../actions/weather'
import { getActiveItinerary } from '../../util/state'

const MODES_WITH_WEATHER = ['WALK', 'BICYCLE', 'CAR']
const STEP_KM = 2.5

type LatLon = [number, number]
const toLatLon = ([lon, lat]: [number, number]): LatLon => [lat, lon]
const haversineKm = ([la1, lo1]: LatLon, [la2, lo2]: LatLon) => {
  const R = 6371, rad = (d: number) => d * Math.PI / 180
  const dLat = rad(la2 - la1), dLon = rad(lo2 - lo1)
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

const sampleRouteUniform = (points: LatLon[], maxGapKm = STEP_KM): LatLon[] => {
  if (points.length < 2) return []
  const cumul = [0]
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
    const prevD = cumul[seg - 1]
    const ratio = (t - prevD) / (cumul[seg] - prevD)
    const [la1, lo1] = points[seg - 1]
    const [la2, lo2] = points[seg]
    out.push([la1 + (la2 - la1) * ratio, lo1 + (lo2 - lo1) * ratio])
  })
  return out
}

export default function useWeatherRequests() {
  const dispatch = useDispatch()
  const searchId = useSelector((s: any) => s.otp.activeSearchId)
  const { from, to } = useSelector((s: any) => s.otp.currentQuery)
  const itinerary = useSelector(getActiveItinerary) as any | null
  const datetime = useSelector((s: any) => s.weather.datetime)

  const prevItinId = useRef<string | null>(null)
  const fetchPoint = (lat: number, lon: number, id: string) =>
    dispatch(fetchWeather({ lat, lon, id, datetime }))

  useEffect(() => {
    const changed = itinerary?.id && itinerary.id !== prevItinId.current
    if (changed || prevItinId.current === null || datetime) {
      dispatch(clearWeather())
      if (from) fetchPoint(from.lat, from.lon, 'from')
      if (to) fetchPoint(to.lat, to.lon, 'to')
      prevItinId.current = itinerary?.id ?? null
    }
    if (!itinerary?.legs?.length) return

    const route: LatLon[] = itinerary.legs
      .filter((l: any) => MODES_WITH_WEATHER.includes(l.mode))
      .flatMap((l: any) =>
        l.legGeometry?.points
          ? polyline.decode(l.legGeometry.points)
          : l.geometry?.coordinates.map(toLatLon) || []
      )

    if (route.length < 2) return
    sampleRouteUniform(route).forEach(([lat, lon], i) =>
      fetchPoint(lat, lon, `sample-${i + 1}`)
    )
  }, [searchId, itinerary, datetime])
}
