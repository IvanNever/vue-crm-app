<template>
  <div>
    <Loader v-if="loading" />
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          "Menu_History" | localizeFilter
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.recordType }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="record.type === 'outcome' ? 'red' : 'green'"
          >
            <div class="card-content white-text">
              <p>
                {{ "Description" | localizeFilter }}: {{ record.description }}
              </p>
              <p>
                {{ "Amount" | localizeFilter }}:
                {{ record.amount | currencyFilter() }}
              </p>
              <p>
                {{ "Category" | localizeFilter }}: {{ record.categoryName }}
              </p>

              <small>{{ record.date | dateFilter("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "DetailRecordPage",
  metaInfo() {
    return {
      title: this.$title("Record")
    };
  },
  data: () => ({
    record: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );
    const recordType =
      record.type === "outcome"
        ? localizeFilter("Outcome")
        : localizeFilter("Income");

    this.record = { ...record, categoryName: category.name, recordType };
    this.loading = false;
  }
};
</script>

<style lang="scss" scoped></style>
