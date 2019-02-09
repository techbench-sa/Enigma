import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Challenge from '@/views/Challenge'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:lang',
      name: 'Home',
      component: {render (c) { return c('router-view') }},
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        }, {
          path: '/:lang/challenge/:id',
          name: 'Challenge',
          component: Challenge
        }
      ]
    }
  ]
})

/*
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/search/:search',
      name: 'Search',
      component: Search
    }, {
      path: '/show/:id',
      name: 'showDetails',
      component: showDetails
    }, {
      path: '/show/:id/season/:season',
      name: 'SeasonDetails',
      component: SeasonDetails
    }, {
      path: '/show/:id/season/:season/episode/:episode',
      name: 'Episode',
      component: Episode
    }
  ]
})
*/
