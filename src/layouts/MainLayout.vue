<template>
  <div class="app-main-layout">
    <NavbarMain @click="isOpen = !isOpen" />
    <SidebarMain v-model="isOpen" />

    <main class="app-content" :class="{ full: !isOpen }">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import NavbarMain from "@/components/app/NavbarMain";
import SidebarMain from "@/components/app/SidebarMain";
export default {
  name: "MainLayout",
  components: {
    NavbarMain,
    SidebarMain
  },
  data: () => ({
    isOpen: true
  })
};
</script>

<style lang="scss" scoped></style>
