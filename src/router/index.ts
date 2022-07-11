import { createRouter, createWebHistory } from "vue-router";
import Overview from "../views/Overview.vue";
import Transactions from "@/views/Transactions.vue";
import Insights from "@/views/Insights.vue";
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
import { getAuth } from "@firebase/auth";
import useFirebase from "@/firebase/firebase";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "overview",
      component: Overview,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/transactions",
      name: "transactions",
      component: Transactions,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/insights",
      name: "insights",
      component: Insights,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

const { getCurrentUser } = useFirebase();

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      console.log("you do not have access");
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
