import { createHistoryRouter, createRoute, createRouterControls } from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";
import { appStarted } from "@/shared/config/init";

export const routes = {
  main: createRoute(),
  templates: createRoute()
};
export const controls = createRouterControls();
export const router = createHistoryRouter({
  routes: [
    {
      path: "/templates",
      route: routes.templates,
    },
    {
      path: "/",
      route: routes.main,
    },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});