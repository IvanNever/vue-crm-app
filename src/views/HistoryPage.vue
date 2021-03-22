<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">У вас еще нет записей</p>

    <section v-else>
      <HistoryTable :records="items" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginationMixin from "@/mixins/pagination.mixin";
import { Pie } from "vue-chartjs";

export default {
  name: "HistoryPage",
  extends: Pie,
  mixins: [paginationMixin],
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
    this.records = await this.$store.dispatch("fetchRecords");

    this.setup();

    this.loading = false;
  },
  methods: {
    setup() {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: this.categories.find(
              category => category.id === record.categoryId
            ).name,
            typeClass: record.type === "income" ? "green" : "red",
            typeText: record.type === "income" ? "Доход" : "Расход"
          };
        })
      );

      this.renderChart({
        labels: this.categories.map(category => category.name),
        datasets: [
          {
            label: "Расходы по категориям",
            data: this.categories.map(category => {
              return this.records
                .filter(
                  item =>
                    item.categoryId === category.id && item.type === "outcome"
                )
                .reduce((total, record) => (total += +record.amount), 0);
            }),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
