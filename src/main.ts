import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faHouse,
  faList,
  faAngleDown,
  faXmark,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHouse, faList, faAngleDown, faXmark, faCirclePlus);

import App from "./App.vue";
import router from "./router";

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
