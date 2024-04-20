<script lang="ts">
  import { onMount } from 'svelte'
  import type { Rates, ExchangeRateResponse } from '../models/rates'

  let rates: Rates = {}
  let count1: number = 1
  let count2: number = 0
  let currencies: string[] = ['USD', 'RUB', 'EUR']
  // let currencies: string[] = []; // для всех валют
  let currency1: string = 'USD'
  let currency2: string = 'RUB'

  async function fetchRates(currency: string, mount?: boolean) {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency}`
    )
    const data: ExchangeRateResponse = await res.json()
    rates = data.rates
    // currencies = Object.keys(rates); // для всех валют

    mount && convert1to2()
  }

  function convert1to2() {
    count2 = Number(((count1 * rates[currency2]) / rates[currency1]).toFixed(2))
  }

  function convert2to1() {
    count1 = Number(((count2 * rates[currency1]) / rates[currency2]).toFixed(2))
  }

  async function updateCurrency1() {
    await fetchRates(currency1)
    convert1to2()
  }

  async function updateCurrency2() {
    await fetchRates(currency2)
    convert1to2()
  }

  onMount(() => fetchRates(currency1, true))
</script>

<div>
  <select bind:value={currency1} on:change={updateCurrency1}>
    {#each currencies as currency}
      {#if currency !== currency2}
        <option value={currency}>{currency}</option>
      {/if}
    {/each}
  </select>
  <input
    type="number"
    bind:value={count1}
    on:input={() => {
      convert1to2()
    }}
  />
</div>
<div>
  <select bind:value={currency2} on:change={updateCurrency2}>
    {#each currencies as currency}
      {#if currency !== currency1}
        <option value={currency}>{currency}</option>
      {/if}
    {/each}
  </select>
  <input
    type="number"
    bind:value={count2}
    on:input={() => {
      convert2to1()
    }}
  />
</div>

<style>
  input,
  select {
    padding: 10px;
    font-size: 16px;
  }
</style>
