import { defineAsyncComponent } from "vue";
const App = defineAsyncComponent(
  () => import(/* webpackChunkName: "App" */ "./App.vue")
);

export { App };
