<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{ "HomeBookkeeping" | localizeFilter }}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email)
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >
          {{ "EnterEmail" | localizeFilter }}
        </small>
        <small
          class="helper-text invalid"
          v-else-if="$v.email.$dirty && !$v.email.email"
        >
          {{ "CorrectEmail" | localizeFilter }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength)
          }"
        />
        <label for="password">{{ "Password" | localizeFilter }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >{{ "EnterPassword" | localizeFilter }}</small
        >
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
          >{{ "PasswordLimitMore" | localizeFilter }}
          {{ $v.password.$params.minLength.min }}</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required
          }"
        />
        <label for="name">{{ "UserName" | localizeFilter }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ "EnterUserName" | localizeFilter }}</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{ "RulesAgree" | localizeFilter }}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ "Registration" | localizeFilter }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "HaveAccount" | localizeFilter }}
        <router-link to="/login">{{ "Enter" | localizeFilter }}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  name: "RegisterPage",
  data: () => ({
    email: "",
    password: "",
    name: "",
    agree: false
  }),
  validations: {
    email: { email, required },
    name: { required },
    agree: { checked: v => v },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch("register", formData);
        this.$router.push("/");
      } catch (err) {
        throw new Error("err");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
