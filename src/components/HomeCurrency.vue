<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ "ExchangeRates" | localizeFilter }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ "Currency" | localizeFilter }}</th>
              <th>{{ "Rate" | localizeFilter }}</th>
              <th>{{ "Date" | localizeFilter }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="currency of currencies" :key="currency">
              <td>{{ currency }}</td>
              <td>{{ (rates["UAH"] / rates[currency]).toFixed(2) }}</td>
              <td>{{ date | dateFilter() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",
  props: ["rates", "date"],
  data: () => ({
    currencies: ["UAH", "USD", "EUR"]
  })
};
</script>

<style lang="scss" scoped></style>
