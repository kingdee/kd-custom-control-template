import Vue from 'vue'
import Index from './Index.vue'

new Vue({
  el: '#app',
  render: (h) =>
    h(Index, {
      props: {},
    }),
})
