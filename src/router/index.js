import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import echart from '@/components/echart'
import amap from '@/components/amap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/echart',
      name: 'echart',
      component: echart
    },
    {
      path: '/amap',
      name: 'amap',
      component: amap
    }
  ]
})
