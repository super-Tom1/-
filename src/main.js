// 入口文件
import "./mock";
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import showMessage from "./utils/showMessage";
import store from "./store/index";
import "./eventBus";

store.dispatch("setting/fetchSetting")

Vue.prototype.$showMessage = showMessage;

// 注册全局指令
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy"
Vue.directive("lazy", vLazy)
Vue.directive("loading", vLoading);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

// 测试一下
