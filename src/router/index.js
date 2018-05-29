import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import waitForLogin from '@/components/waitForLogin'
import dashboard from '@/components/dashboard'
import dashhome from '@/components/dashhome'
import httpsmoke from '@/components/httpsmoke'
import addhttpsmoke from '@/components/addhttpsmoke'
import calloutGroup from '@/components/calloutGroup'
import chefRecipeList from '@/components/chef/chefRecipeList'
import chefEnvironment from '@/components/chef/chefEnvironment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login/:id',
      name: 'Login Auth',
      component: waitForLogin
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: dashboard,
      children: [
        {
          path: '',
          component: dashhome
        },
        {
          path: 'http',
          component: httpsmoke
        },
        {
          path: 'http/add',
          component: addhttpsmoke
        },
        {
          path: 'firstcall',
          component: calloutGroup
        },
        {
          path: 'chef/recipe',
          component: chefRecipeList
        },
        {
          path: 'chef/environment',
          component: chefEnvironment
        }

      ]

    }
  ]
})
