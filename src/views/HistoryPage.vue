<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">У вас еще нет записей</p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "HistoryPage",
  components: {
    HistoryTable
  },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    const records = await this.$store.dispatch("fetchRecords");
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(
          category => category.id === record.categoryId
        ).name,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход"
      };
    });

    this.loading = false;
  }
};
</script>

<style lang="scss" scoped></style>
