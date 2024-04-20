<script lang="ts">
  import { onMount } from 'svelte'
  import type { Rates, ExchangeRateResponse } from '../models/rates'

  let rates: Rates = {}
  let count1: number = 0
  let count2: number = 0
  let currencies: string[] = ['USD', 'RUB', 'EUR']
  // let currencies: string[] = []; // для всех валют
  let currency1: string = 'USD'
  let currency2: string = 'RUB'

  async function fetchRates() {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency1}`
    )
    const data: ExchangeRateResponse = await res.json()
    rates = data.rates
    // currencies = Object.keys(rates); // для всех валют
  }

  function convert(direction: string = '1to2') {
    if (direction === '1to2') {
      count2 = Number((count1 * (rates[currency2] || 0)).toFixed(2))
    } else {
      count1 = Number((count2 / (rates[currency2] || 1)).toFixed(2))
    }
  }

  function updateCurrency(value: string, num: number) {
    if (num === 1) {
      fetchRates()
      convert('2to1')
    } else {
      convert('1to2')
      fetchRates()
    }
  }

  onMount(fetchRates)
</script>

<div>
  <select bind:value={currency1} on:change={() => updateCurrency(currency1, 1)}>
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
      convert('1to2')
    }}
  />
</div>
<div>
  <select bind:value={currency2} on:change={() => updateCurrency(currency2, 2)}>
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
      convert('2to1')
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
