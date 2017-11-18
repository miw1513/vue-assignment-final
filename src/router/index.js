import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import draw from '@/components/draw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'draw',
      component: draw
    }
  ]
})
