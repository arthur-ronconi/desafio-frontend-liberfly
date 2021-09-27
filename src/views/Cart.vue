<template>
  <div class="bg-gray-300 rounded-lg p-8 space-y-4">
    <h1 class="text-3xl font-bold text-red-500">Carrinho</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="divide-y divide-gray-400">
        <div
          v-for="item in data"
          :key="item.id"
          class="flex items-start justify-start py-4 space-x-4"
        >
          <img
            :src="item.thumbnail.path + '.' + item.thumbnail.extension"
            :alt="item.title"
            class="max-h-32"
          />
          <div class="space-y-2">
            <div class="flex flex-col">
              <p class="text-red-500 text-xl font-bold">
                {{ item.title }}
              </p>
              <div>
                <span
                  v-if="item.isRare"
                  class="
                    bg-yellow-500
                    rounded
                    px-2
                    py-1
                    uppercase
                    font-bold
                    text-white text-xs
                  "
                  >Rare</span
                >
              </div>
            </div>
            <div class="text-xs text-gray-500">ID: {{ item.id }}</div>
            <div class="space-x-2">
              <span class="text-xs text-gray-500">USD</span>
              <span class="text-xl text-red-500 font-bold">
                {{ item.price }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-8">
        <div>
          <h2 class="text-lg">
            <span class="font-bold"> Total: </span>
            USD
            <span class="text-red-500 text-2xl font-bold">
              {{
                data.length === 1
                  ? data[0].price
                  : data.reduce((acc, val) => acc.price + val.price)
              }}
            </span>
          </h2>
        </div>
        <div>
          <h3 class="text-lg font-bold">Payment</h3>
          <div class="">
            <label class="block mt-2">Credit card:</label>
            <input
              type="text"
              v-model="creditCard"
              class="bg-gray-200 rounded-lg px-4 py-3"
              placeholder="Input yout credit card number"
            />
          </div>
        </div>
        <btn class="text-white bg-red-500 w-full" @click="buy">Buy</btn>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import btn from "../components/shared/btn.vue";
import swal from "sweetalert2";
import { useRouter } from "vue-router";
export default {
  components: {
    btn,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const data = computed(() => store.getters["cart/getCart"]);
    const state = reactive({
      creditCard: undefined,
    });

    const buy = () => {
      if (state.creditCard && state.creditCard.length === 16) {
        swal.fire("Success", "Purchase, successfull", "success");
        store.dispatch("cart/clearCart");
        router.push({ name: "Home" });
      } else {
        swal.fire(
          "Error",
          "Input your credit card information (16 digit number)",
          "error"
        );
      }
    };
    return {
      ...toRefs(state),
      data,
      buy,
    };
  },
};
</script>

<style>
</style>