<template>
  <div class="flex flex-col space-y-4">
    <div class="text-2xl font-bold text-red-500">Comics</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="item in data" :key="item.id">
        <card :data="item" />
      </div>
    </div>
    <div class="flex justify-center py-8">
      <btn
        class="
          text-red-500
          hover:underline
          transform
          hover:scale-105
          transition
          border-2 border-red-500
        "
        @click="loadMore"
      >
        {{ loading ? "Loading..." : "Load more" }}
      </btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";
import { reactive, toRefs } from "@vue/reactivity";
import btn from "../shared/btn.vue";
import card from "../shared/card.vue";
import get from "../../composables/get";
export default {
  components: { btn, card },
  setup() {
    const state = reactive({
      data: [],
      offset: 0,
      limit: 20,
      loading: false,
    });
    const getData = async () => {
      try {
        state.loading = true;
        let res = await get("comics", {
          offset: state.offset,
          limit: state.limit,
        });
        res.data.data.results
          .filter(
            (item) => !item.thumbnail.path.includes("image_not_available")
          )
          .filter((i) => i.description)
          .map((prop) => {
            return {
              ...prop,
              price: 5.99,
              isRare: Math.random() <= 0.1 ? true : false,
            };
          })
          .forEach((element) => {
            state.data.push(element);
          });
        console.log(res);
        console.log(res.data.data.results);
        state.loading = false;
      } catch (err) {
        console.error(err);
        state.loading = false;
      }
    };
    getData();

    const loadMore = () => {
      state.offset += 20;
      getData();
    };
    return {
      ...toRefs(state),
      loadMore,
    };
  },
};
</script>

<style lang="scss" scoped>
.image {
}
</style>