import Vue from 'vue'
import Index from '@/components/Index.vue'

new Vue({
  el: '#app',
  render: (h) =>
    h(Index, {
      props: {},
    }),
})
