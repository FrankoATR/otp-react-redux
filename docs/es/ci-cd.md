# Integración continua (CI/CD)

> **Objetivo:** Asegurar que la capa de clima (Open-Meteo) no rompa la base OTP-Redux  
> y que cada _commit_ llegue a la rama principal **solo** si supera la batería de pruebas.

## Visión general

| Aspecto | Detalle |
|---------|---------|
| Orquestador | **GitHub Actions** |
| Rama observada | `feature/weather-cards` <br>*(extensible a `main` cuando la funcionalidad esté fusionada)* |
| VM | `windows-latest` (para replicar el entorno de la mayoría del equipo) |
| Node .js | v 20.19.0 |

## Disparadores

| Evento | Descripción |
|--------|-------------|
| `push` | Cualquier _commit_ directo sobre `feature/weather-cards` |
| `pull_request` | PR cuyo destino sea la misma rama |

---

## Flujo de trabajo

| Orden | Acción | Herramienta | Propósito |
|-------|--------|-------------|-----------|
| 1 | **Checkout** | `actions/checkout@v4` | Clona el repositorio |
| 2 | **Setup Node + Yarn cache** | `actions/setup-node@v4`<br/>con `cache: 'yarn'` | Instala Node 20 y reutiliza dependencias |
| 3 | **Instalación** | `yarn --frozen-lockfile` | Falla si `package.json` ↔ `yarn.lock` divergen |
| 4 | **Chequeo de tipos** | `yarn typecheck:weather` | Ejecuta `tsc` con `tsconfig.weather.json` (solo módulos de clima) |
| 5 | **Pruebas unitarias** | `yarn test:openweather --ci --maxWorkers=2` | Lanza Jest sobre `__tests__/weather/` y genera cobertura |

!!! tip "Velocidad"
    Solo se analizan los archivos recién añadidos: la *build* completa suele tardar **< 1 minuto** con la caché caliente.

!!! note "Enfoque"
    Un fallo en CI proviene **siempre** de la funcionalidad de clima, nunca del legado OTP-Redux.

!!! info "Escalabilidad"
    Cuando el repositorio esté totalmente tipado, bastará añadir un segundo *job* global (ESLint / `tsc`) sin tocar este flujo.

---

## Definición YAML (extracto)

```yaml
# .github/workflows/test.yml
name: CI – Weather feature

on:
  push:
    branches: [feature/weather-cards]
  pull_request:
    branches: [feature/weather-cards]

jobs:
  test:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn
      - run: yarn --frozen-lockfile
      - run: yarn typecheck:weather
      - run: yarn test:openweather --ci --maxWorkers=2
```

**Resultado:** cualquier error / cobertura < 90 % detiene la build y bloquea la fusión en la rama principal.