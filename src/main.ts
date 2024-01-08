import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import {
  QueryCache,
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import { errorMessages } from "@/lib/store";

const app = createApp(App);

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    queryCache: new QueryCache({
      onError: (error) => {
        const { messages } = error as unknown as { messages: string[] };
        errorMessages.value = messages;
      },
    }),
  },
};

app.use(router);
app.use(VueQueryPlugin, vueQueryPluginOptions);

app.mount("#app");
