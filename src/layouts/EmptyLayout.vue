<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from "@/utils/messages";

export default {
  name: "EmptyLayout",
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(firebaseError) {
      this.$error(
        messages[firebaseError.code] || "Произошла неизвестная ошибка🙄"
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
