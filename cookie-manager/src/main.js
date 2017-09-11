import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import Datepicker from './Datepicker.vue'

Vue.use(VueResource)

let vm = new Vue({
  el: '#app',
  components: { 'Datepicker': Datepicker },
  render: h => h(App)
})
