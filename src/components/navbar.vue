<template>
  <nav class="fixed w-full z-50 h-14 text-red-500 bg-white">
    <div class="container flex items-center justify-between h-full">
      <router-link to="/" class="text-lg font-bold">Comix</router-link>
      <router-link to="/cart">
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span
            v-if="cartLength"
            class="
              absolute
              -bottom-0
              -right-4
              text-xs
              h-4
              w-4
              bg-red-500
              text-white
              font-bold
              rounded-full
              flex
              items-center
              justify-center
            "
          >
            {{ cartLength }}
          </span>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const cartLength = computed(() => store.getters["cart/getCartLength"]);
    return {
      cartLength,
    };
  },
};
</script>

<style>
</style>