<template>
  <div class="text-2xl text-red-500" v-if="loading">Loading...</div>
  <div class="flex items-center pb-4" v-else>
    <button
      class="flex items-center space-x-2 text-red-500"
      @click="router.go(-1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Back</span>
    </button>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="flex justify-center">
      <img
        v-if="data.thumbnail"
        :src="`${data.thumbnail.path}.${data.thumbnail.extension}`"
        :alt="data.title"
        class="max-h-96"
      />
      <span v-else> Loading... </span>
    </div>
    <div class="space-y-4">
      <div class="flex items-center space-x-2">
        <span
          v-if="data.isRare"
          class="
            bg-yellow-500
            px-2
            py-1
            text-white
            font-bold
            uppercase
            rounded-lg
            text-xs
          "
        >
          Rare
        </span>
        <h1 class="text-3xl font-bold text-red-500">
          {{ data.title }}
        </h1>
      </div>
      <span class="text-xs text-gray-500"> ID: {{ data.id }} </span>
      <p>
        {{ data.description }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <btn
            class="text-red-500 border border-red-500"
            @click="generateCoupon"
            >Look for coupons</btn
          >
        </div>
        <div class="relative flex flex-col space-y-2">
          <div class="flex items-center">
            <label class="font-bold">Coupon:</label>
            <input
              type="text"
              maxlength="5"
              v-model="couponValue"
              placeholder="Input discount coupon"
              class="bg-gray-300 rounded-lg px-4 py-3"
            />
          </div>
          <span
            v-if="couponValue.length === 5"
            class="absolute -bottom-12 right-0 text-green-500"
          >
            <span v-if="couponIsRare && data.isRare && couponIsValid"
              >Rare coupon applied to rare item</span
            >
            <span v-else-if="couponIsRare && !data.isRare && couponIsValid"
              >Rare coupon applied to commom item</span
            >
            <span
              v-else-if="!couponIsRare && data.isRare && couponIsValid"
              class="text-red-500"
              >Cannot apply commom coupon to rare item</span
            >
            <span v-else-if="!couponIsRare && !data.isRare && couponIsValid"
              >Commom coupon applied</span
            >
            <span v-else-if="!couponIsValid" class="text-red-500">
              Invalid coupon
            </span>
          </span>
        </div>
      </div>
      <p>
        USD
        <span class="text-2xl font-bold text-red-500">
          {{ finalPrice }}
        </span>
      </p>
      <btn class="text-white bg-red-500 w-full" @click="addToCart(data)"
        >Add to cart</btn
      >
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import btn from "../components/shared/btn.vue";
import { watch } from "@vue/runtime-core";
import get from "../composables/get";
export default {
  components: {
    btn,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const state = reactive({
      data: {},
      loading: true,
      couponValue: "",
      couponIsRare: false,
      couponIsValid: false,
    });
    // const data = computed(() => store.getters["cart/getItemToAdd"]);
    const itemToAdd = computed(() => store.getters["cart/getItemToAdd"]);
    const getData = async () => {
      state.loading = true;
      let res = await get("comics/" + route.params.id);
      state.data = {
        ...res.data.data.results[0],
        price: 5.99,
        isRare: itemToAdd.value.isRare,
      };
      state.loading = false;
    };
    getData();

    const setCouponIsRare = () => {
      if (Math.random() > 0.5) {
        state.couponIsRare = true;
      } else {
        state.couponIsRare = false;
      }
    };

    const setCouponIsValid = () => {
      if (Math.random() > 0.5) {
        state.couponIsValid = true;
      } else {
        state.couponIsValid = false;
      }
    };

    const generateCoupon = () => {
      state.couponIsValid = true;
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      state.couponValue = result;
    };

    const addToCart = (data) => {
      store.dispatch("cart/addToCart", { ...data, price: finalPrice });
      router.push({ name: "Home" });
    };

    const finalPrice = computed(() => {
      if (state.couponValue.length === 5 && state.couponIsValid) {
        return state.data.price - 1;
      } else {
        return state.data.price;
      }
    });

    watch(
      () => state.couponValue,
      () => {
        if (state.couponValue.length === 5) {
          setCouponIsRare();
          setCouponIsValid();
        }
      }
    );

    return {
      router,
      ...toRefs(state),
      generateCoupon,
      finalPrice,
      store,
      addToCart,
    };
  },
};
</script>

<style>
</style>