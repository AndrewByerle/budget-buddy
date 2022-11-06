import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import {
  faHouse,
  faList,
  faAngleDown,
  faXmark,
  faCirclePlus,
  faChartPie,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

library.add(
  faHouse,
  faList,
  faAngleDown,
  faXmark,
  faCirclePlus,
  faChartPie,
  faUser
);
app.component("Datepicker", Datepicker);

app.use(createPinia());
app.use(router);

app.mount("#app");
