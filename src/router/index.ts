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
  {
    path: "/test",
    name: "Temp",
    component: Temp,
  },
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
        name: "Title",
        alias: "/person/title",
        component: () => import("../views/person/title/Title.vue"),
        children: [
          {
            path: "",
            component: () => import("../views/person/title/TitleOption.vue"),
            alias: "title-option",
          },
          {
            path: "review-meeting",
            name: "ReviewMeeting",
            component: () => import("../views/person/title/ReviewMeeting.vue"),
          },
          {
            path: "review-form-record",
            name: "ReviewFormRecord",
            component: () =>
              import("../views/person/title/ReviewFormRecord.vue"),
          },
        ],
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
      {
        path: "/person/personSite",
        name: "PersonSite",
        component: () => import("../views/person/PersonSite.vue"),
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
