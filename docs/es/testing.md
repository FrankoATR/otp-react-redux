# Pruebas

> **Cobertura mínima exigida:** ≥ 90 % de líneas y ramas (informe *Jest — coverage*).

## Pila de herramientas

| Capa                               | Librería                       | Motivo                                                                                        |
|------------------------------------|--------------------------------|------------------------------------------------------------------------------------------------|
| Pruebas unitarias / integración    | **Jest**                       | Ejecución rápida, soporte de *snapshots* y cobertura integrada                                |
| Pruebas de componentes React (UI)  | **React Testing Library**      | Enfoque en la interacción del usuario, no en la implementación                                |

Todas las pruebas nuevas se encuentran en **`__tests__/weather/`**, manteniendo intacto el set heredado de OTP‑Redux y concentrando los errores de CI en la funcionalidad de clima.

---

## Ejecución

```bash
yarn test:openweather      # alias definido en package.json
```

Genera un informe de cobertura para los archivos modificados o añadidos con Open‑Meteo:

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

Depurar un archivo concreto:

```bash
yarn jest __tests__/weather/weather-marker.test.tsx --watch
```

---

## Matriz de pruebas

| Archivo de test                         | Alcance        | Verificación clave                                                                                   |
|-----------------------------------------|---------------|-------------------------------------------------------------------------------------------------------|
| `weather-actions.test.ts`               | **Unidad**    | Orden de *dispatch* (`REQUEST_WEATHER → RECEIVE_WEATHER / WEATHER_ERROR`)                             |
| `weather-reducer.test.ts`               | **Unidad**    | Transiciones de estado (`loading`, `byId`, `error`)                                                   |
| `weather-api.test.ts`                   | **Unidad**    | Selección de endpoint (*archive* vs *forecast*) y mapeo de JSON                                       |
| `weather-set-datetime.test.ts`          | **Unidad**    | Normaliza `Date` → `YYYY-MM-DDTHH:00:00` y devuelve acción Redux                                      |
| `use-weather-requests.test.tsx`         | **Integración** | Despacha CLEAR + N×FETCH al montar; sin efecto si no hay itinerario activo                            |
| `weather-marker.test.tsx`               | **UI**        | Renderiza: texto de carga; “☔ Raining” si `weathercode ≥ 60`; “🌤” en caso contrario                   |
| `weather-overlay.test.tsx`              | **Integración** | Agrega marcadores (`from`, `to`, muestras) y muestra selector global                                  |
| `global-weather-time-selector.test.tsx` | **Integración** | Montaje condicional; cambio de fecha conserva la hora original                                        |
| `default-map.test.tsx`                  | **Smoke**     | Mapa base se monta; `useWeatherRequests` se ejecuta exactamente una vez                               |

> `react-map-gl`, overlays pesados de OTP y WebGL se **mockean** para garantizar ejecución confiable en JSDOM.

---

## Buenas prácticas adoptadas

!!! tip "Aislamiento"
    Las pruebas heredadas quedan intactas; cualquier fallo de CI es **exclusivo** de la funcionalidad de clima.

!!! example "Cobertura dirigida"
    Solo los archivos nuevos o modificados cuentan para el umbral del 90 %; el proyecto base mantiene su propia métrica.

