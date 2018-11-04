import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routerOptions = [
  { path: '*', component: 'NotFound' },
  { path: '/', component: 'Top' },
  { path: '/new-post', component: 'NewPost' },
  { path: '/detail-post', component: 'Signup' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

export default new Router({
  // http://unitopi.com/html5-historyapi/
  mode: 'history',
  routes
})
