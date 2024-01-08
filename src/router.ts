import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import StatsPage from "./pages/StatsPage.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import GamePage from "./pages/GamePage.vue";

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
    {
      path: "/categories/:id",
      name: "categories",
      component: CategoryPage,
    },
    {
      path: "/games/:id",
      name: "games",
      component: GamePage,
    },
  ],
});

export default router;
