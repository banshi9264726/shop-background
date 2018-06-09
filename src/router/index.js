import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Login from '@/views/login'
import Home from '@/views/home'
import Users from '@/views/users/users'
import Rights from '@/views/roles/rights'
import Roles from '@/views/roles/roles'

Vue.use(Router)

export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'rights',
          path: 'rights',
          component: Rights
        },
        {
          name: 'roles',
          path: 'roles',
          component: Roles
        }
      ]
    }
  ]
})
