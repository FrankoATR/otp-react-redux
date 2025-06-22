# Testing

> **Required coverage:** ≥ 90 % lines & branches (Jest coverage report).

## Tooling stack

| Layer                         | Library                    | Rationale                                                                            |
|-------------------------------|----------------------------|--------------------------------------------------------------------------------------|
| Unit / integration tests      | **Jest**                   | Fast runner with snapshot support & built‑in coverage                                |
| React component testing (UI)  | **React Testing Library**  | Focus on user interaction rather than implementation details                         |

All new tests reside in **`__tests__/weather/`** so the legacy OTP‑Redux suite remains untouched and CI feedback stays focused.

---

## How to run

```bash
yarn test:openweather      # alias in package.json
```

This produces a coverage report for the files touched by the Open‑Meteo feature:

```
lib/actions/weather.ts
lib/api/weather-api.ts
lib/reducers/weather.ts
lib/components/map/use-weather-requests.tsx
lib/components/map/global-weather-time-selector.tsx
lib/components/map/weather-marker.tsx
lib/components/map/weather-overlay.tsx
lib/components/map/default-map.tsx
```

Debug a specific file:

```bash
yarn jest __tests__/weather/weather-marker.test.tsx --watch
```

---

## Test matrix

| Test file                              | Scope        | Main assertion                                                                                 |
|----------------------------------------|--------------|------------------------------------------------------------------------------------------------|
| `weather-actions.test.ts`              | **Unit**     | Correct dispatch order (`REQUEST_WEATHER → RECEIVE_WEATHER / WEATHER_ERROR`)                   |
| `weather-reducer.test.ts`              | **Unit**     | State transitions (`loading`, `byId`, `error`)                                                 |
| `weather-api.test.ts`                  | **Unit**     | Chooses *archive* vs *forecast* endpoint & maps JSON                                           |
| `weather-set-datetime.test.ts`         | **Unit**     | Normalises `Date` → `YYYY-MM-DDTHH:00:00` and returns Redux action                             |
| `use-weather-requests.test.tsx`        | **Integration** | Dispatches CLEAR + N×FETCH on mount; inert without active itinerary                            |
| `weather-marker.test.tsx`              | **UI**       | Renders: loading text; “☔ Raining” for `weathercode ≥ 60`; “🌤” otherwise                       |
| `weather-overlay.test.tsx`             | **Integration** | Aggregates markers (`from`, `to`, samples) and mounts global selector                          |
| `global-weather-time-selector.test.tsx`| **Integration** | Conditional mount; changing date preserves original hour                                       |
| `default-map.test.tsx`                 | **Smoke**    | Base map renders; `useWeatherRequests` executes exactly once                                   |

> `react-map-gl`, heavy OTP overlays and WebGL are **mocked** so the suite runs reliably in JSDOM.

---

## Adopted best practices

!!! tip "Isolation"
    Legacy OTP‑Redux tests are left untouched; CI failures are **always** weather‑related.

!!! example "Focused coverage"
    Only modified or new files count toward the 90 % target; the upstream project keeps its own metrics.

