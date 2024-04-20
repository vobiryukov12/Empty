export interface Rates {
  [currencyCode: string]: number
}

export interface ExchangeRateResponse {
  provider: string
  WARNING_UPGRADE_TO_V6: string
  terms: string
  base: string
  date: string
  time_last_updated: number
  rates: Rates
}
