import { createRouter, createWebHistory } from "vue-router";
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

export default router;
