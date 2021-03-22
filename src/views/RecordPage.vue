<template>
  <div>
    <div class="page-title">
      <h3>{{ "Menu_NewRecord" | localizeFilter }}</h3>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      {{ "EmptyCategoriesMessage" | localizeFilter }}
      <router-link to="/categories">{{
        "AddNewCategory" | localizeFilter
      }}</router-link>
    </p>
    <form class="form" v-else @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option
            v-for="category of categories"
            :key="category.id"
            :value="category.id"
            >{{ category.name }}</option
          >
        </select>
        <label>{{ "SelectCategory" | localizeFilter }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ "Income" | localizeFilter }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ "Outcome" | localizeFilter }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{
            invalid:
              ($v.amount.$dirty && !$v.amount.required) ||
              ($v.amount.$dirty && !$v.amount.minValue)
          }"
        />
        <label for="amount">{{ "Amount" | localizeFilter }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.required"
          >{{ "EnterAmount" | localizeFilter }}</span
        >
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >{{ "EnterValueMore" | localizeFilter }}
          {{ $v.amount.$params.minValue.min }} грн.</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
        />
        <label for="description">{{ "Description" | localizeFilter }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
          >{{ "EnterDescription" | localizeFilter }}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "Create" | localizeFilter }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "RecordPage",
  metaInfo() {
    return {
      title: this.$title("Menu_NewRecord")
    };
  },
  data: () => ({
    categories: [],
    select: null,
    loading: true,
    category: null,
    type: "outcome",
    amount: 1,
    description: ""
  }),
  validations: {
    amount: { required, minValue: minValue(1) },
    description: { required }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;

    if (this.categories.length) {
      this.category = this.categories[0].id;
    }

    setTimeout(() => {
      this.select = window.M.FormSelect.init(this.$refs.select);
      window.M.updateTextFields();
    }, 0);
  },
  desctroyed() {
    if (this.select && this.select.destoy) {
      this.select.destoy();
    }
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON()
          });
          const bill =
            this.type === "income"
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;

          await this.$store.dispatch("updateInfo", { bill });
          this.$message("Запись успешно создана");
          this.$v.$reset();
          this.amount = 1;
          this.description = "";
        } catch (err) {
          throw new Error(err);
        }
      } else {
        this.$message(`Нехватает ${this.amount - this.info.bill} грн. 😒`);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
