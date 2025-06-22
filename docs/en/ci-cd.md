# Continuous-Integration Pipeline

> **Goal:** guarantee that the Open-Meteo layer never breaks OTP-Redux  
> and let only *green* commits land in the main branch.

## Overview

| Item | Value |
|------|-------|
| Orchestrator | **GitHub Actions** |
| Watched branch | `feature/weather-cards` <br/>(extensible to `main` once merged) |
| Runner | `windows-latest` (mirrors most dev machines) |
| Node.js | v 20.19.0 |

## Triggers

| Event | Description |
|-------|-------------|
| `push` | Any direct commit on `feature/weather-cards` |
| `pull_request` | PR targeting the same branch |

---

## Workflow steps

| # | Step | Tool | Purpose |
|---|------|------|---------|
| 1 | **Checkout** | `actions/checkout@v4` | Clone repository |
| 2 | **Node + Yarn cache** | `actions/setup-node@v4` (`cache: yarn`) | Install Node 20 & re-use dependencies |
| 3 | **Install deps** | `yarn --frozen-lockfile` | Fails if lock-file mismatch |
| 4 | **Type check** | `yarn typecheck:weather` | Runs `tsc` with a weather-only `tsconfig` |
| 5 | **Unit tests** | `yarn test:openweather --ci --maxWorkers=2` | Jest on `__tests__/weather/`, outputs coverage |

!!! tip "Speed"
    Only new weather files are analysed → full build **< 1 min** with warm cache.

!!! note "Focus"
    Any CI failure is **weather-related**, never legacy OTP-Redux code.

!!! info "Future-proof"
    A second global job (ESLint / `tsc`) can be added later without touching this workflow.

---

## YAML definition (excerpt)

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

**Outcome:** any error or coverage < 90 % fails the build and blocks merging into main.