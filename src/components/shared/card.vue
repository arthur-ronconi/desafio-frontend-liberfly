<template>
  <div>
    <div class="h-96 w-full overflow-hidden rounded-lg">
      <img
        :src="data.thumbnail.path + '.jpg'"
        :alt="data.title"
        class="image max-w-full h-auto"
      />
    </div>
    <div class="py-2 flex flex-col space-y-2">
      <div class="flex items-center justify-between space-x-4">
        <p class="text-lg font-bold text-red-500 truncate">
          {{ data.title }}
        </p>
        <span
          v-if="data.isRare"
          class="
            py-1
            px-2
            text-sm
            bg-yellow-500
            rounded
            font-bold
            text-white
            uppercase
          "
          >Rare</span
        >
      </div>
      <p class="line-clamp-2 text-sm">
        {{ data.description }}
      </p>
      <div class="flex datas-center justify-between">
        <rating />
        <p class="font-bold text-xl">
          <span class="font-normal text-xs">USD</span>
          {{ data.price }}
        </p>
      </div>
      <btn
        class="text-white bg-red-500 hover:bg-red-600 transition"
        @click="goToProduct(data)"
        >Add to cart</btn
      >
    </div>
  </div>
</template>

<script>
import Rating from "../shared/rating.vue";
import btn from "../shared/btn.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  components: {
    Rating,
    btn,
  },
  props: {
    data: {
      type: Object,
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const goToProduct = (item) => {
      store.dispatch("cart/setItemToAdd", item);
      router.push({ name: "Product", params: { id: item.id } });
    };

    return {
      goToProduct,
    };
  },
};
</script>

<style>
</style>