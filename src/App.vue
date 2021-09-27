<template>
  <div class="relative">
    <navbar />
    <div class="container pt-16">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import navbar from "../src/components/navbar.vue";
import Footer from "./components/shared/footer.vue";

export default {
  components: {
    navbar,
    Footer,
  },
};
</script>

<style lang="scss">
/* body {
  @apply bg-gray-200;
} */
</style>
