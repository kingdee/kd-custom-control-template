import { lazy } from "react";

/* 
  组件懒加载，避免单文件打包后超过1mb
*/
const App = lazy(() => import(/* webpackChunkName: 'App' */ "./App"));

export { App };