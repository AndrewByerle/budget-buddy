import { createRouter, createWebHistory } from "vue-router";
import Overview from "../views/Overview.vue";
import Transactions from "@/views/Transactions.vue";
import Insights from "@/views/Insights.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "overview",
      component: Overview,
    },
    {
      path: "/transactions",
      name: "transactions",
      component: Transactions,
    },
    {
      path: "/insights",
      name: "insights",
      component: Insights,
    },
  ],
});

export default router;
