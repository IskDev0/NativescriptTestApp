import Vue from 'nativescript-vue'

import Home from './components/Home'
// 6f60f9ad

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()
