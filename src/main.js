import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'material-icons/iconfont/material-icons.css';


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
Vue.use(ElementUI);

import App from './App.vue';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
