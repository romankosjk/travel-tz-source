import Vue from 'vue'
import ElementUI from 'element-ui';
import ElSearchTablePagination from 'el-search-table-pagination'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'


Vue.use(ElementUI);
Vue.use(ElSearchTablePagination)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
