import Vue from 'vue'
import App from './App.vue'
import 'windi.css'

// https://day.js.org/docs/en/plugin/advanced-format
import dayjs from "dayjs"
import advancedFormat from 'dayjs/plugin/advancedFormat' // to get format in milliseconds
dayjs.extend(advancedFormat)

// https://vuejs.org/v2/cookbook/adding-instance-properties.html#The-Context-of-Prototype-Methods
// https://medium.com/spemer/using-axios-in-vue-js-17f186756a8b
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
