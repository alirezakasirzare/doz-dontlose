import { createStore } from "vuex";

export default createStore({
  state: {
    turn: "me",
    statusGame: "",
    myScore: 0,
    enemyScore: 0,
  },
  getters: {},
  mutations: {
    chnageTurn(state, newValue) {
      state.turn = newValue;
    },
    clearStatus(state) {
      state.statusGame = "";
    },
    chnageStatus(state, newValue) {
      state.statusGame = newValue;
    },
    addMyScore(state) {
      state.myScore = state.myScore + 1;
    },
    addEnemyScore(state) {
      state.enemyScore = state.enemyScore + 1;
    },
    restartScores(state) {
      state.enemyScore = 0;
      state.myScore = 0;
    },
  },
  actions: {},
  modules: {},
});
