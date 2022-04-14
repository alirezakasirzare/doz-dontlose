import { createStore } from "vuex";

export default createStore({
  state: {
    turn: "me",
  },
  getters: {},
  mutations: {
    chnageTurn(state, newValue) {
      state.turn = newValue;
    },
  },
  actions: {},
  modules: {},
});
