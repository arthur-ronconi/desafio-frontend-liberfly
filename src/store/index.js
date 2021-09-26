import { createStore } from "vuex";
import cart from "./cart.store.js";

export default createStore({
  modules: {
    cart,
  },
});
