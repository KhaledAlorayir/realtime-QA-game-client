import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  QueryCache,
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import { apiErrorHandler } from "@/lib/util";

const app = createApp(App);

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    queryCache: new QueryCache({
      onError: (error) =>
        apiErrorHandler(error as unknown as { messages: string[] }),
    }),
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  },
};

app.use(router);
app.use(VueQueryPlugin, vueQueryPluginOptions);

app.mount("#app");
