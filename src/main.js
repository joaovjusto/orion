import Vue from "vue";
import ElementUI from "element-ui";
import "./assets/scss/element-variables.scss";
import BootstrapVue from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "material-icons/iconfont/material-icons.css";

import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import { format } from 'date-fns'

import locale from "element-ui/lib/locale/lang/pt-br";

import store from "./store";

import CKEditor from '@ckeditor/ckeditor5-vue2';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });
Vue.use(VueTheMask)
Vue.use( CKEditor );

// register directive v-money and component <money>
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false /* doesn't work with directive */
})

import VueMq from 'vue-mq'
 
Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})

Vue.filter('formatDate', function(value) {
  if (value) {
    return format(new Date(value), 'dd/MM/yyyy')
  }
})

Vue.filter('formatCurrency', function(value) {
  if (typeof value !== "number") {
    return value;
  }
  const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
  });
  return formatter.format(value);
})

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
