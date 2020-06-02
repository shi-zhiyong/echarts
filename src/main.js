import Vue from 'vue'
import App from './App'
import router from './router'
import _ from 'lodash'
Vue.prototype._ = _;
// todo vue-amap 插件
// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);

// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   ak: 'pT6uUXISbgdTd8NF8yOhGl0VjsQF6Z73'
// });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
