# Development Guide

## Repository layout

```
otp-react-redux/
└── lib
    ├── actions
    │   └── weather.ts
    ├── api
    |   └── weather-api.ts
    ├── components
    │   ├── map
    │   │   ├── default-map.tsx
    │   │   ├── global-weather-time-selector.tsx
    │   │   ├── use-weather-request.tsx
    │   │   ├── weather-marker.tsx
    │   │   └── weather-overlay.tsx
    │   └── narrative
    │       └── narrative-itineraries.js
    ├── main.js
    └── reducers
        └── weather.ts
```

### File details

| File                                                  | Status       | Responsibility (concise)                                                                                                                                                                                         |
| ----------------------------------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/api/weather-api.ts`                              | **New**      | Single point of contact with **Open-Meteo**. Chooses *archive* vs *forecast* endpoint (past × future ≤ 16 days), builds URL with latitude/longitude and requested hourly variables, returns a normalized object. |
| `lib/actions/weather.ts`                              | **New**      | Thunk wrapper that: 1) dispatches `REQUEST_WEATHER`, 2) invokes `weather-api.ts`, 3) dispatches `RECEIVE_WEATHER`. Keeps payload shape consistent for the reducer.                                               |
| `lib/reducers/weather.ts`                             | **New**      | Normalised slice: `byId` (all points) + `datetime`. Handles clear/request/receive, flags loading state per point, derives selectors (`selectWeatherByPoint`, `selectIsRaining`).                                 |
| `lib/main.js`                                         | **Modified** | Store composition — registers the new `weather` slice, exposing it application-wide.                                                                                                                             |
| `lib/components/map/use-weather-requests.tsx`         | **New**      | Hook that samples the OTP itinerary geometry (every ≈ 2.5 km) and dispatches `fetchWeather()` for **from**, **to** and intermediate points; also cleans stale markers when itinerary changes.                    |
| `lib/components/map/weather-marker.tsx`               | **New**      | Presentational marker (React-Map-GL `<Marker>`). Shows weather icon, temp, wind & direction; handles *loading* and *no-data* states gracefully.                                                                  |
| `lib/components/map/weather-overlay.tsx`              | **New**      | Reads `weather.byId` from the store and renders a cluster of `<WeatherMarker>` for the active query (always at **from/to**, plus samples when WALK / BIKE / CAR legs are present).                               |
| `lib/components/map/global-weather-time-selector.tsx` | **New**      | Floating calendar 📅 button + form. Lets the user pick date & hour; writes to `weather.datetime` which triggers a full refresh of all weather calls.                                                             |
| `lib/components/map/default-map.tsx`                  | **Modified** | Adds the `<WeatherOverlay>` component to the existing OTP map, so markers appear in context.                                                                                                                     |
| `lib/components/narrative/narrative-itineraries.js`   | **Modified** | Reads `weather` slice: if `selectIsRaining` is *true* and the itinerary includes WALK or BIKE, injects a contextual banner (*⚠ It is raining …*) otherwise a “Good weather” notice.                              |


### Coding standards

* ESLint + Prettier (Airbnb / TypeScript).  
* No `any` except in legacy wrapper code.  
* Import order enforced by eslint‑plugin‑import.
