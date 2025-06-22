# Guía de instalación

> Capturas realizadas en **Windows 10 22H2**.

## 1. Requisitos

| Software | Versión | URL |
|----------|---------|-----|
| **Java JDK** | 17 LTS | <https://adoptium.net> |
| **Node JS** | ≥ 20.19 | <https://nodejs.org> |
| **Yarn Classic** | 1.22 | `npm i -g yarn` |
| **Git** | latest | — |

## 2. Clonar y preparar dependencias

```bash
git clone https://github.com/FrankoATR/otp-react-redux.git
cd otp-react-redux
git checkout feature/weather-cards
yarn install
```

## 3. Iniciar OTP
Es necesario tener archivos GTFS/OSM Para alimentar OTP-API, si no tienes, puedes utilizar los datos de prueba para el area de Michigan que estan generados en `https://ucaedusv-my.sharepoint.com/:f:/g/personal/00046821_uca_edu_sv/EtD8WdrX-AxBjxNmHTiDyioBhy4e01pnby_eG0xK9lTbgw?e=NoxbuP`

```bash
java -Xmx4G -jar otp-2.7.0-shaded.jar --load graphs/default --serve
# → http://localhost:8080/
```

OTP queda escuchando en `http://localhost:8080/`.

## 4. Levantar servidor de desarrollo

```bash
yarn start   # abre http://localhost:9966
```

## 5. Problemas frecuentes

| Síntoma | Solución |
|---------|----------|
| Mapa en blanco | Check that you have an internet connection |
| “No data found” | Verificar que la fecha/hora esté en rango soportado |
| OTP no responde | Comprobar ruta del grafo y flag `--serve` |
| No me genera una ruta | Asegúrate de alimentar con GTFS/OSM a OTP-API correctamente |