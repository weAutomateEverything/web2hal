// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueResource from 'vue-resource'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm = new Vue({
  router,
  components: { App },
  template: '<App/>'
})

Vue.http.interceptors.push((request, next) => {
  /**
   * Here we will fecth the token from local storage and
   * attach it (if exists) to the Authorization header on EVERY request.
   */
  let token = window.localStorage.getItem('token')

  if (token) {
    request.headers.set('Authorization', token)
  }

  /**
   * Here is where we can refresh the token.
   */
  next((response) => {
    /**
     * If we get a 401 response from the API means that we are Unauthorized to
     * access the requested end point.
     * This means that probably our token has expired and we need to get a new one.
     */
    if (response.status === 401) {
      return Vue.http.get('http://api.dev/refresh-token').then((result) => {
        // Save the new token on local storage
        window.localStorage.setItem('token', result.data.token)

        // Resend the failed request whatever it was (GET, POST, PATCH) and return its resposne
        return Vue.http(request).then((response) => {
          return response
        })
      })
        .catch(() => {
          /**
           * We weren't able to refresh the token so the best thing to do is
           * logout the user (removing any user information from storage)
           * and redirecting to login page
           */
          return router.go({name: 'login'})
        })
    }
  })
})

vm.$mount('#app')
