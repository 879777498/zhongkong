import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/api'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

Vue.use(ElementUI);
//定义全局变量
Vue.prototype.$api=api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
