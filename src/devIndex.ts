import Vue from 'vue';
import Index from '@/components/Index.vue'

const app = new Vue({
    render: (h) => h(Index),
  });
  app.$mount("#app");
