import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

/* ---- mocks globales ---- */
global.URL.createObjectURL = jest.fn()
jest.mock('maplibre-gl', () => ({}), { virtual: true })
jest.mock('@opentripplanner/otp2-tile-overlay', () => () => null, { virtual: true })

jest.mock('react-intl', () => ({
  IntlProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  injectIntl: (Cmp: any) => Cmp
}))

jest.mock('react-redux', () => ({
  connect: () =>
    (Cmp: any) =>
      (props: any) => (
        <Cmp
          {...props}
          config={{ api: { host: '', path: '', port: '' } }}
          bikeRentalStations={[]}
          vehicleRentalStations={[]}
          mapConfig={{ overlays: [] }}
          query={{ mode: '' }}
        />
      ),
  Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}))

jest.mock('@opentripplanner/base-map', () => () => <div data-testid="basemap" />)
jest.mock('../../lib/connected-endpoints-overlay', () => () => null, { virtual: true })
jest.mock('../../lib/components/map/use-weather-requests', () => jest.fn())
jest.mock('../../lib/actions/api', () => ({ assembleBasePath: () => '' }))

import useWeatherRequests from '../../lib/components/map/use-weather-requests'
import DefaultMap from '../../lib/components/map/default-map'

describe('DefaultMap smoke test', () => {
  it('renderiza BaseMap y llama useWeatherRequests', () => {
    const hook = useWeatherRequests as jest.Mock
    render(<DefaultMap />)

    expect(document.querySelector('[data-testid="basemap"]')).toBeInTheDocument()
    expect(hook).toHaveBeenCalled()
  })
})
