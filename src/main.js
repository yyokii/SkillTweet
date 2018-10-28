// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// lint設定： https://qiita.com/taqm/items/316e7fe51ad9d9a21244

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import router from './router'
import App from './App'
import RadarChart from './components/RadarChart.vue'
import EditSkillDialog from './components/EditSkillDialog.vue'

Vue.config.productionTip = false

Vue.component('radarChart', RadarChart)
Vue.component('edit-skill-dialog', EditSkillDialog)

Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken1,
    secondary: colors.blue.lighten1,
    accent: colors.cyan.accent1
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
