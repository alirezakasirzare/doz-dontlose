import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index.js";
// views
import HomeView from "../views/HomeView.vue";
import EndView from "../views/EndView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/endofgame",
    name: "end",
    component: EndView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  // console.log(from.path, to.path);
  if (to.path == "/") {
    if (store.state.turn != "enemy") {
      return "/endofgame";
    }
  } else if (to.path == "/endofgame") {
    if (store.state.turn != "end") {
      return "/";
    }
  }
  return true;
});

export default router;
