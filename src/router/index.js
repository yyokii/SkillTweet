import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import DetailPost from '@/components/DetailPost'
import NewPost from '@/components/NewPost'

Vue.use(Router)

export default new Router({
  // http://unitopi.com/html5-historyapi/
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/new-post', component: NewPost },
    { path: '/detail-post', component: DetailPost }
  ]
})
