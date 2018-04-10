import Vue from 'vue'
import Router from 'vue-router'
import container from '@/components/container.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: container
    }
  ]
})
