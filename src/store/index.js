import { createStore } from "vuex";

export default createStore({
  state: {
    turn: "me",
    myScore: 0,
    enemyScore: 0,
  },
  getters: {},
  mutations: {
    chnageTurn(state, newValue) {
      state.turn = newValue;
    },
    addMyScore(state) {
      state.myScore = state.myScore + 1;
    },
    addEnemyScore(state) {
      state.enemyScore = state.enemyScore + 1;
    },
  },
  actions: {},
  modules: {},
});
