import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import StatsPage from "./pages/StatsPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/stats",
      name: "stats",
      component: StatsPage,
    },
  ],
});

export default router;
