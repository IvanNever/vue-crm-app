<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Список категорий пуст.
      <router-link to="/categories">Добавить новую категорию</router-link>
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
        <label>Выберите категорию</label>
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
          <span>Доход</span>
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
          <span>Расход</span>
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
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.required"
          >Укажите сумму</span
        >
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          >Введите значение больше
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
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
          >Введите описание</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
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
