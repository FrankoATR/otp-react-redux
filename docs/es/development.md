# Guía de desarrollo

## Estructura de carpetas nuevas o modificadas.

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

### Detalles de los archivos

| Archivo                                               | Estado         | Propósito (resumido)                                                                                                                                                                                    |
| ----------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lib/api/weather-api.ts`                              | **Nuevo**      | Decisor de endpoint (*archive* o *forecast*) según la fecha solicitada; arma la URL con lat/lon y variables horarias, normaliza la respuesta.                                                           |
| `lib/actions/weather.ts`                              | **Nuevo**      | Thunk: dispara `REQUEST_WEATHER`, llama a `weather-api.ts`, recibe datos y lanza `RECEIVE_WEATHER`, manteniendo la carga útil homogénea.                                                                |
| `lib/reducers/weather.ts`                             | **Nuevo**      | Slice normalizado: `byId` + `datetime`; maneja clear/request/receive, indica carga por punto y expone selectores.                                                                                       |
| `lib/main.js`                                         | **Modificado** | Integra el slice `weather` en el `Store`, haciéndolo accesible de forma global.                                                                                                                         |
| `lib/components/map/use-weather-requests.tsx`         | **Nuevo**      | Hook que toma la geometría del itinerario OTP, muestrea cada ≈ 2.5 km y despacha `fetchWeather()` para **origen**, **destino** y puntos intermedios; limpia marcadores obsoletos cuando cambia la ruta. |
| `lib/components/map/weather-marker.tsx`               | **Nuevo**      | Marker presentacional (React-Map-GL `<Marker>`). Muestra icono, temperatura, viento y dirección; gestiona estados *loading* y *no-data*.                                                                |
| `lib/components/map/weather-overlay.tsx`              | **Nuevo**      | Lee `weather.byId` y renderiza múltiples `<WeatherMarker>`: siempre en **from/to** y, si el modo es WALK/BIKE/CAR, a intervalos uniformes del trayecto.                                                 |
| `lib/components/map/global-weather-time-selector.tsx` | **Nuevo**      | Botón flotante de calendario 📅 + formulario. El usuario elige fecha y hora; actualiza `weather.datetime`, lo que fuerza nuevas peticiones.                                                             |
| `lib/components/map/default-map.tsx`                  | **Modificado** | Añade `<WeatherOverlay>` al mapa de OTP, de modo que los marcadores de clima se dibujen en contexto.                                                                                                    |
| `lib/components/narrative/narrative-itineraries.js`   | **Modificado** | Consulta el slice `weather`: si está lloviendo y el itinerario contiene WALK o BIKE, muestra un banner de advertencia; de lo contrario, un aviso de buen tiempo.                                        |

### Normas

* TypeScript estricto.  
* ESLint + Prettier.  
* Solo hooks, sin componentes de clase.
