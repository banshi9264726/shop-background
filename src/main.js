// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 导入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';

import '@/assets/css/index.css';
import MyAxios from '@/plugins/myaxios';

import MyBreadcrumb from '@/components/mybreadcrumb';

Vue.use(ElementUI);
Vue.use(MyAxios);
// 全局组件
Vue.component(MyBreadcrumb.name, MyBreadcrumb);

Vue.filter('fmtDate', (value, fmtStr) => {
  return moment(value).format(fmtStr);
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
