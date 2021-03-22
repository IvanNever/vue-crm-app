<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ "Amount" | localizeFilter }}</th>
        <th>{{ "Date" | localizeFilter }}</th>
        <th>{{ "Category" | localizeFilter }}</th>
        <th>{{ "Type" | localizeFilter }}</th>
        <th>{{ "Open" | localizeFilter }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) in records" :key="record.id">
        <td>{{ index + 1 }}</td>
        <td>{{ record.amount | currencyFilter() }}</td>
        <td>{{ record.date | dateFilter("datetime") }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeClass]">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail-record/${record.id}`)"
            v-tooltip="`${goTo} ${record.description}`"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
export default {
  name: "HistoryTable",
  data: () => ({
    goTo: localizeFilter("GoTo")
  }),
  props: {
    records: {
      required: true,
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped></style>
