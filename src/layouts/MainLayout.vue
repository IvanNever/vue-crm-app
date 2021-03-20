<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <NavbarMain @click="isOpen = !isOpen" />
      <SidebarMain v-model="isOpen" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          data-position="top"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarMain from "@/components/app/NavbarMain";
import SidebarMain from "@/components/app/SidebarMain";
import messages from "@/utils/messages";

export default {
  name: "MainLayout",
  components: {
    NavbarMain,
    SidebarMain
  },
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }

    this.loading = false;
  },
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
