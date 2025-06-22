# Urbano Libre – Planificación de rutas con alerta meteorológica

Urbano Libre incorpora datos meteorológicos **en tiempo real y de pronóstico**
de **Open‑Meteo** dentro de la UI de **OpenTripPlanner** (OTP).  
El usuario recibe alertas (lluvia, viento fuerte, tormenta) tanto en el mapa
como en el panel de itinerarios.

---

## ¿Por qué?

1. **Seguridad** – Sugerir modos alternativos cuando el clima es adverso.  
2. **Precisión** – Permitir al viajero adelantar o retrasar su salida si se
   pronostica lluvia.  
3. **Software libre** – Tanto OTP 2 como Open‑Meteo son gratuitos y abiertos.

---

## Arquitectura de alto nivel

![Diagrama general](../assets/system-diagram.png)

| Capa | Componente | Rol |
|------|------------|-----|
| Frontend | Fork `otp-react-redux` | Mapa, UI de itinerarios, overlays |
| Acceso a datos | Middleware Weather | Llama a Open‑Meteo `forecast` o `archive` |
| Backend | OTP 2.7 | Calcula itinerarios multimodales |
| API externa | **Open‑Meteo** | Datos horarios de clima |

---

## Historias de usuario clave

| ID | Historia | Comportamiento |
|----|----------|----------------|
| U‑01 | *Como ciclista deseo evitar la lluvia* | Si un tramo es `BICYCLE` y `weathercode ≥ 60`, se muestra “⚠ Lluvia – considere transporte público”. |
| U‑02 | *Como peatón deseo alertas de viento* | Viento a 45 km/h es mostrado en la tarjeta|
| U‑03 | *Como planificador deseo consultar clima en fecha/hora arbitraria* | El reloj global permite ± 7 días pronóstico e historial de dias anteriores|

