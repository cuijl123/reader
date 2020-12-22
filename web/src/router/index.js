import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/Home'], resolve)
    },
    {
      path: '/category',
      name: 'category',
      component: resolve => require(['@/components/Category'], resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/components/Search'], resolve)
    },
    {
      path: '/bookDetail',
      name: 'bookDetail',
      component: resolve => require(['@/components/bookDetail'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/register'], resolve)
    },
    {
      path: '/person',
      name: 'person',
      component: resolve => require(['@/components/person'], resolve)
    },
    {
      path: '/myShelf',
      name: 'myShelf',
      component: resolve => require(['@/components/myShelf'], resolve)
    },
    {
      path: '/bookContent/:id',
      name: 'bookContent',
      component: resolve => require(['@/components/bookContent'], resolve)
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return {x: 0, y: 0}
}
})
