import Vue from 'vue'
import VueRouter from 'vue-router'

import cinemaRouter from '@/router/cinema'
import mineRouter from '@/router/mine'
import movieRouter from '@/router/movie'

Vue.use(VueRouter)

const routes = [
  cinemaRouter,
  mineRouter,
  movieRouter,
  {
    path: '/',
    redirect : '/movie'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
