import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import messagePlugin from "./utils/message.plugin";
import Loader from "./components/app/Loader";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";

import firebase from "firebase/app";
require("firebase/auth");
require("firebase/database");

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter("dateFilter", dateFilter);
Vue.filter("currencyFilter", currencyFilter);
Vue.component("Loader", Loader);

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "crm-app-e4603.firebaseapp.com",
  databaseURL:
    "https://crm-app-e4603-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crm-app-e4603",
  storageBucket: "crm-app-e4603.appspot.com",
  messagingSenderId: "817268931897",
  appId: "1:817268931897:web:4bbea3503e9a0a86b7fce8"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
