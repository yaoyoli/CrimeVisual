// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import '../theme/index.css';
// import { Button, Select } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'//自动扫描里面的路由配置
import './assets/css/iconfont.css'
import './assets/css/bootstrap.min.css'
import * as echarts from 'echarts'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
// 项目中所有拥有 size 属性的组件的默认尺寸均为 'small'，弹框的初始 z-index 为 3000
Vue.use(ElementUI);
/*Vue.use(Button)
Vue.use(Select)*/
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}
)
