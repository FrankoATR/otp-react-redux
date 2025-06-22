# Installation Guide

> Host OS used in screenshots: **Windows 10 22H2**.

## 1. Requirements

| Name | Version | URL |
|------|---------|-----|
| **Java JDK** | 17 LTS | <https://adoptium.net> |
| **Node JS** | ≥ 20.19 | <https://nodejs.org> |
| **Yarn Classic** | 1.22 | `npm i -g yarn` |
| **Git** | latest | — |

## 2. Clone Source & Install

```bash
git clone https://github.com/FrankoATR/otp-react-redux.git
cd otp-react-redux
git checkout feature/weather-cards
yarn install
```

## 3. Start OTP API

You need to have GTFS/OSM files to feed OTP-API, if you don't have one, you can use test data for Michigan area that is generated in `https://ucaedusv-my.sharepoint.com/:f:/g/personal/00046821_uca_edu_sv/EtD8WdrX-AxBjxNmHTiDyioBhy4e01pnby_eG0xK9lTbgw?e=NoxbuP`

```bash
java -Xmx4G -jar otp‑2.7.0-shaded.jar --load graphs/default --serve
# → http://localhost:8080/
```

## 4. Run Dev Server

```bash
yarn start      # http://localhost:9966/
```

OTP and React automatically connect (CORS enabled by default).

## 5. Common issues

| Symptom | Fix |
|---------|-----|
| Blank map tiles | Check that you have an internet connection |
| Weather says “No data found” | Check that selected date/time is within supported range |
| OTP not responding | Check graph path and `--serve` flag |
| It doesn't generate a route | Make sure you're feeding GTFS/OSM to the OTP-API correctly |