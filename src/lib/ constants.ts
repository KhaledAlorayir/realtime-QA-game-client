export const Default = {
  pageSize: "20",
  counterInSeconds: 10,
  SecondsBeforeShowingNextQuestion: 2,
  SecondsBeforeStartingGame: 4,
};

export const RoutesNames = {
  home: "home",
  stats: "stats",
  categories: "categories",
  games: "games",
};

export const ProtectedRoutes = [RoutesNames.stats, RoutesNames.games];

export const SERVER_ORIGIN = "http://localhost:3000/";
