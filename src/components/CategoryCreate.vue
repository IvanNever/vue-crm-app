<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ "Create" | localizeFilter }}</h4>
      </div>

      <form @submit.prevent="submitHandler">
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
          {{ "Create" | localizeFilter }}
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
  name: "CategoryCreate",
  data() {
    return {
      name: "",
      limit: 100
    };
  },
  validations: {
    name: { required },
    limit: { required, minValue: minValue(100) }
  },
  mounted() {
    window.M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        name: this.name,
        limit: this.limit
      };
      try {
        const category = await this.$store.dispatch("addCategory", formData);
        this.name = "";
        this.limit = 100;
        setTimeout(() => {
          this.$v.$reset();
        }, 0);
        this.$message(localizeFilter("CreateCategorySuccess"));
        this.$emit("created", category);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
