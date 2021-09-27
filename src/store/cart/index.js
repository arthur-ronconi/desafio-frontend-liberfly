const cart = {
  namespaced: true,
  state: {
    cart: [],
    itemToAdd: {},
  },
  getters: {
    getCartLength(state) {
      return state.cart.length;
    },
    getCart(state) {
      return state.cart;
    },
    getItemToAdd(state) {
      return state.itemToAdd;
    },
  },
  mutations: {
    ADD_TO_CART(state, payload) {
      state.cart.push(payload);
    },
    SET_ITEM_TO_ADD(state, payload) {
      state.itemToAdd = payload;
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
  },
  actions: {
    addToCart({ commit }, payload) {
      commit("ADD_TO_CART", payload);
    },
    setItemToAdd({ commit }, payload) {
      commit("SET_ITEM_TO_ADD", payload);
    },
    clearCart({ commit }) {
      commit("CLEAR_CART");
    },
  },
};

export default cart;
