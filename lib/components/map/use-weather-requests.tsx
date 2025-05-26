import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearWeather, fetchWeather } from '../../actions/weather'
import { getActiveItinerary } from '../../util/state'
import polyline from '@mapbox/polyline'

/* ───── CONFIG ───────────────────────────── */
const MODES_WITH_WEATHER = ['WALK', 'BICYCLE', 'CAR']
const STEP_KM = 6                              // cada 6 km
/* ─────────────────────────────────────────── */

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
  const dispatch  = useDispatch()

  /* datos del estado OTP ------------------------------------ */
  const searchId  = useSelector(s => s.otp.activeSearchId)
  const from      = useSelector(s => s.otp.currentQuery.from)
  const to        = useSelector(s => s.otp.currentQuery.to)
  const itinerary = useSelector(getActiveItinerary)

  /* recordamos el último itinerary.id que pintamos ---------- */
  const prevItinId = useRef<string | null>(null)

  /* =========================================================
   * 1. Origen y destino (¡siempre presentes!)
   * ========================================================= */
  const fetchFromTo = () => {
    if (from?.lat && from?.lon)
      dispatch(fetchWeather({ lat: from.lat, lon: from.lon, id: 'from' }))
    if (to?.lat && to?.lon)
      dispatch(fetchWeather({ lat: to.lat, lon: to.lon, id: 'to' }))
  }

  /* cada vez que cambien coords de from/to … */
  useEffect(fetchFromTo, [from?.lat, from?.lon, to?.lat, to?.lon])

  /* =========================================================
   * 2. Detectar NUEVA ruta
   *    (cambia searchId o itinerary.id)
   * ========================================================= */
  useEffect(() => {
    const routeChanged =
      itinerary && prevItinId.current !== itinerary.id

    if (routeChanged || !prevItinId.current) {
      /* 2-A  limpiamos todo lo anterior ------- */
      dispatch(clearWeather())

      /* 2-B  volvemos a pintar origen/destino -- */
      fetchFromTo()

      /* 2-C  guardamos este itinerary.id ------- */
      prevItinId.current = itinerary?.id ?? null
    }

    /* si aún no hay itinerario, salimos */
    if (!itinerary) return

    /* =======================================================
     * 3. Globos intermedios cada 1 km en los legs elegidos
     * ======================================================= */
    itinerary.legs?.forEach((leg, legIdx) => {
      if (!MODES_WITH_WEATHER.includes(leg.mode)) return

      /* decodifica polilínea */
      const raw = leg.legGeometry?.points
        ? polyline.decode(leg.legGeometry.points)                 // OTP1
        : leg.geometry?.coordinates?.map(([lon, lat]) => [lat, lon]) // OTP2

      if (!raw?.length) return

      /* recorre la línea acumulando distancia */
      let acc = 0
      let last = raw[0]

      raw.forEach((cur, ptIdx) => {
        acc += haversine(last, cur)
        const isLast = ptIdx === raw.length - 1

        if (acc >= STEP_KM || isLast) {
          const [lat, lon] = cur
          const id = `leg-${legIdx}-pt-${ptIdx}`
          dispatch(fetchWeather({ lat, lon, id }))
          acc = 0              // reinicia cada km
        }
        last = cur
      })
    })
  }, [searchId, itinerary])
}
