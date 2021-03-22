<template>
  <div>
    <div class="page-title">
      <h3>{{ "Menu_Planning" | localizeFilter }}</h3>
      <h4>{{ info.bill | currencyFilter("UAH") }}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      {{ "EmptyCategoriesMessage" | localizeFilter }}
    </p>
    <section v-else>
      <div v-for="category of categories" :key="category.id">
        <p>
          <strong>{{ category.name }}</strong>
          {{ category.spend | currencyFilter("UAH") }} из
          {{ category.limit | currencyFilter("UAH") }}
        </p>
        <div class="progress" v-tooltip="category.tooltip">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{ width: category.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "PlanningPage",
  metaInfo() {
    return {
      title: this.$title("Menu_Planning")
    };
  },
  data: () => ({
    categories: [],
    records: [],
    total: 0,
    loading: true
  }),
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");

    this.categories = categories.map(cat => {
      const spend = records
        .filter(item => item.categoryId === cat.id)
        .filter(item => item.type === "outcome")
        .reduce((acc, item) => (acc += +item.amount), 0);

      const percent = (spend / cat.limit) * 100;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent > 100 ? "red" : "yellow";

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? localizeFilter("ExcessBy") : localizeFilter("Left")
      } ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });

    this.loading = false;
  }
};
</script>

<style lang="scss" scoped></style>
