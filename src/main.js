import Vue from "vue";
import ElementUI from "element-ui";
import "./assets/scss/element-variables.scss";
import BootstrapVue from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "material-icons/iconfont/material-icons.css";

import locale from "element-ui/lib/locale/lang/pt-br";

import store from "./store";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
