import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Secret from '../views/Secret.vue';
const routes = [
  /* eslint-disable */
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/secret",
    name: "secret",
    component: Secret,
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/about",
    name: "about",
    component: function () {
      return import("../views/About.vue");
    },
    meta: {
      requiresAuth: true
    }
  },

  {
    path: "/post",
    name: "post",
    component: function () {
      return import("../views/Posts.vue");
    },
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/postContext",
        component: null,
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: "/posts",
            component: null,
            children: [{ path: "/posts/:postId", component: null }],
            meta: {
              requiresAuth: true
            }
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
router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})


export default router;
