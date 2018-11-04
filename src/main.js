// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// lint設定： https://qiita.com/taqm/items/316e7fe51ad9d9a21244

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router'
import App from './App'

Vue.config.productionTip = false

// https://vuetifyjs.com/ja/style/theme
Vue.use(Vuetify, {
  theme: {
    primary: '#2C2E7D',
    secondary: '#A9A9A9',
    accent: '#F11743'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
