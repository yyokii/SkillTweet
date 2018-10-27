import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import DetailPost from '@/components/DetailPost'
import NewPost from '@/components/NewPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'new-post',
      component: NewPost
    },
    {
      path: '/:person',
      name: 'detail-post',
      component: DetailPost
    }
  ]
})
