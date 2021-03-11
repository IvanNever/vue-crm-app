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
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
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
