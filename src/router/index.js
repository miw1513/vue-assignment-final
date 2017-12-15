import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import draw from '@/components/draw'
import hello from '@/components/HelloWorld'
import lobby from '@/components/lobby'
import scoreboard from '@/components/scoreboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/draw',
      name: 'draw',
      component: draw
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: lobby
    },
    {
      path: '/scoreboard',
      name: 'scoreboard',
      component: scoreboard
    }

  ]
})
