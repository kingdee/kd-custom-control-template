import Vue from 'vue';
import Index from '@/components/Index.vue'
import 'element-ui/lib/theme-chalk/index.css';
import { Option, Select } from 'element-ui';
Vue.use(Select)
Vue.use(Option)
const app = new Vue({
    render: (h) => h(Index),
  });
  app.$mount("#app");
