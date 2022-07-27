import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import SignIn from '../views/SignIn.vue';
import Register from '../views/Register.vue';

const routes = [
   /* eslint-disable */
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  }
  ,{
    path: "/about",
    
    name: "about",
    component: function () {
      return import("../views/About.vue");
    },
  },
  {
    path: "/posts",
    name: "posts",
    component: function () {
      return import("../views/Posts.vue");
    },
    children: [
      {
        path: "/postContext",
        component: null,
        children: [
          {
            path: "/posts",
            component: null,
            children: [{ path: "/posts/:postId", component: null }],
          },
        ],
      },
    ],
  },
  {
    path: "/:notFOund(.*)",
    component: null,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
