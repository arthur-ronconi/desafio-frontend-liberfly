<template>
  <div class="space-y-8">
    <hero />
    <product-list />
  </div>
</template>

<script>
import hero from "../components/home/hero.vue";
import ProductList from "../components/home/product-list.vue";
// @ is an alias to /src

export default {
  components: { hero, ProductList },
};
</script>