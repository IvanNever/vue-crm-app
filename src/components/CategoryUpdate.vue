<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Edit" | localizeFilter }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="currentCategory">
            <option
              v-for="category of categories"
              :key="category.id"
              :value="category.id"
              >{{ category.name }}</option
            >
          </select>
          <label>{{ "SelectCategory" | localizeFilter }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{
              invalid: $v.name.$dirty && !$v.name.required
            }"
          />
          <label for="name">{{ "Title" | localizeFilter }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.name.$dirty && !$v.name.required"
          >
            {{ "EnterCategoryName" | localizeFilter }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{
              invalid:
                ($v.limit.$dirty && !$v.limit.required) ||
                ($v.limit.$dirty && !$v.limit.minValue)
            }"
          />
          <label for="limit">{{ "Limit" | localizeFilter }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.required"
            >{{ "EnterCategoryLimit" | localizeFilter }}</span
          >
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            >{{ "CategoryLimitMore" | localizeFilter }}
            {{ $v.limit.$params.minValue.min }} грн.</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ "Update" | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "CategoryUpdate",
  data: () => ({
    select: null,
    name: "",
    limit: 100,
    currentCategory: null
  }),
  props: ["categories"],
  validations: {
    name: { required },
    limit: { required, minValue: minValue(100) }
  },
  watch: {
    currentCategory(id) {
      const { name, limit } = this.categories.find(
        category => category.id === id
      );
      this.name = name;
      this.limit = limit;
    }
  },
  created() {
    const { name, limit, id } = this.categories[0];
    this.name = name;
    this.limit = limit;
    this.currentCategory = id;
  },
  mounted() {
    this.select = window.M.FormSelect.init(this.$refs.select);
    window.M.updateTextFields();
  },
  desctroyed() {
    if (this.select && this.select.destoy) {
      this.select.destoy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        id: this.currentCategory,
        name: this.name,
        limit: this.limit
      };
      try {
        await this.$store.dispatch("updateCategory", formData);
        this.$message(localizeFilter("UpdateCategorySuccess"));
        this.$emit("updated", formData);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
