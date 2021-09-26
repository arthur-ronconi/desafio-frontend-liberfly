const cart = {
  namespaced: true,
  state: {
    cart: [],
  },
  getters: {
    getCartLength(state) {
      return state.cart.length;
    },
    getCart(state) {
      return state.cart;
    },
  },
  mutations: {
    ADD_TO_CART(state, payload) {
      state.cart.push(payload);
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit("ADD_TO_CART", payload);
    },
  },
};

export default cart;
