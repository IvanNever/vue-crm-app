<template>
  <div>
    <div class="page-title">
      <h3>{{ "Menu_Categories" | localizeFilter }}</h3>
    </div>
    <Loader v-if="loading" />
    <section v-else>
      <div class="row">
        <CategoryCreate @created="addCategory" />
        <CategoryUpdate
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategoryList"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">
          {{ "EmptyCategoriesMessage" | localizeFilter }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate";
import CategoryUpdate from "@/components/CategoryUpdate";

export default {
  name: "CategoriesPage",
  metaInfo() {
    return {
      title: this.$title("Menu_Categories")
    };
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  components: {
    CategoryCreate,
    CategoryUpdate
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addCategory(category) {
      this.categories.push(category);
    },
    updateCategoryList(category) {
      const catIndx = this.categories.findIndex(
        item => item.id === category.id
      );
      this.categories[catIndx].name = category.name;
      this.categories[catIndx].limit = category.limit;
      this.updateCount++;
    }
  }
};
</script>

<style lang="scss" scoped></style>
