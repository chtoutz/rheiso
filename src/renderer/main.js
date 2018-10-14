import Vue from 'vue'
import axios from 'axios'
import Settings from 'electron-store'

import App from './App'
import router from './router'
import store from './store'

import Notification from '@/components/Layout/Notification'

/***************
 * Load styles *
 ***************/

import './assets/styles.sass'

/*****************
 * Load settings *
 *****************/

// TODO: Create and call a boot loader that applies default values for all general settings (projects folder, shortcuts...), init database (?)
let settingsData = {
  name: 'rheiso-settings',
  encryptionKey: 'InG€ocachingWeTru$t',
  defaults: {
    general: {
      projectsSource: '',
      projectsSaving: ''
    },
    plugins: {},
    projects: {}
  }
}
const settings = new Settings(settingsData)

/**********************
 * Load notifications *
 **********************/

const NotificationComponent = Vue.extend(Notification)
const openNotification = (propsData = {
  title: '',
  message: '',
  type: 'primary',
  direction: 'Down',
  duration: 4500,
  container: '.notifications'
}) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    propsData
  })
}

/**************************************************
 * Init db files loading from DataBase VueX store *
 **************************************************/

store.commit('initDatabase')

/*********************
 * Load core objects *
 *********************/

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.DB = Vue.prototype.$DB = store.state.DataBase
Vue.http = Vue.prototype.$http = axios
Vue.settings = Vue.prototype.$settings = settings
Vue.openNotification = Vue.prototype.$openNotification = openNotification
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
