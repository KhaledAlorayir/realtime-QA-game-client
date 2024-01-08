import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import StatsPage from "./pages/StatsPage.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import GamePage from "./pages/GamePage.vue";
import { authGuard } from "./lib/auth";
import { RoutesNames } from "./lib/ constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RoutesNames.home,
      component: HomePage,
    },
    {
      path: "/stats",
      name: RoutesNames.stats,
      component: StatsPage,
    },
    {
      path: "/categories/:id",
      name: RoutesNames.categories,
      component: CategoryPage,
    },
    {
      path: "/games/:id",
      name: RoutesNames.games,
      component: GamePage,
    },
  ],
});

router.beforeEach(authGuard);

export default router;
