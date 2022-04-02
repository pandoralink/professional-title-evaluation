import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Temp from "../views/Temp.vue";
import * as path from "path";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("../views/common/404.vue"),
  },
  // {
  //   path: "/",
  //   name: "Temp",
  //   component: Temp,
  // },
  {
    path: "/",
    redirect: "/person/login",
  },
  {
    path: "/person",
    redirect: "/person/login",
  },
  {
    path: "/person/login",
    name: "PersonLogin",
    component: () => import("../views/person/Login.vue"),
  },
  {
    path: "/person/manage",
    name: "PersonManage",
    component: () => import("../views/person/Layout.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/person/Title.vue"),
      },
      {
        path: "/person/title",
        name: "Title",
        component: () => import("../views/person/Title.vue"),
      },
      {
        path: "/person/title/apply",
        name: "Apply",
        component: () => import("../views/person/Apply.vue"),
      },
      {
        path: "/person/404",
        component: () => import("../views/common/404.vue"),
      },
    ],
  },
  {
    path: "/company",
    redirect: "/company/login",
  },
  {
    path: "/company/login",
    name: "CompanyLogin",
    component: () => import("../views/person/Login.vue"),
  },
  {
    path: "/manage",
    name: "Manage",
    component: () => import("../views/common/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
  },
});

export default router;
