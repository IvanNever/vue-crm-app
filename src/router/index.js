import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/HomePage.vue")
  },
  {
    path: "/login",
    name: "LoginPage",
    meta: { layout: "empty" },
    component: () => import("@/views/LoginPage.vue")
  },
  {
    path: "/register",
    name: "RegisterPage",
    meta: { layout: "empty" },
    component: () => import("@/views/RegisterPage.vue")
  },
  {
    path: "/categories",
    name: "CategoriesPage",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/CategoriesPage.vue")
  },
  {
    path: "/detail-record/:id",
    name: "DetailRecordPage",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/DetailRecordPage.vue")
  },
  {
    path: "/history",
    name: "HistoryPage",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/HistoryPage.vue")
  },
  {
    path: "/planning",
    name: "PlanningPage",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/PlanningPage.vue")
  },
  {
    path: "/profile",
    name: "ProfilePage",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/ProfilePage.vue")
  },
  {
    path: "/record",
    name: "RecordPage",
    meta: { layout: "main", auth: true },
    component: () => import("@/views/RecordPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(item => item.meta.auth);

  if (requireAuth && !currentUser) next("/login?message=login");

  next();
});

export default router;
