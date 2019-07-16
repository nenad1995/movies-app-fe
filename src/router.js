import Vue from 'vue'
import Router from 'vue-router'
import AppMovies from './components/AppMovies.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/movies' }, 
    { path: '/movies', component: AppMovies, name: 'movies' },
  ]
})
