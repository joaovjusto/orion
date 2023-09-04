import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from "../store";

const routes = [
  {
    path: "/",
    redirect: { path: "/login" },
    component: () => import("../components/Login.vue"),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home.vue'),
    meta: { requiresLogin: true }
  },
  {
    path: '/propostas',
    name: 'propostas',
    component: () => import('../components/Proposals.vue'),
    meta: { requiresLogin: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = Object.keys(store.getters.getUserFromCache).length > 0;
  if (to.matched.some(record => record.meta.requiresLogin) && !isAuthenticated) {
    next("/login")
  } else {
    next()
  }
})

export default router