<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ "BillCurrency" | localizeFilter }}</span>

        <p class="currency-line" v-for="currency of currencies" :key="currency">
          <span>{{ getCurrency(currency) | currencyFilter(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBill",
  data: () => ({
    currencies: ["UAH", "USD", "EUR"]
  }),
  props: ["rates"],
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["UAH"] / this.rates["EUR"])
      );
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    }
  }
};
</script>

<style lang="scss" scoped></style>
