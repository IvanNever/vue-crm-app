<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <CategoryCreate @created="addCategory" />
        <CategoryUpdate />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryUpdate from "@/components/CategoryUpdate";
export default {
  name: "CategoriesPage",
  data: () => ({
    categories: []
  }),
  components: {
    CategoryCreate,
    CategoryUpdate
  },
  methods: {
    addCategory(category) {
      this.categories.push(category);
    }
  }
};
</script>

<style lang="scss" scoped></style>
