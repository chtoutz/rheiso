import Vue from 'vue'
import axios from 'axios'
import Settings from 'electron-store'

import App from '@/App'
import router from '@/router'
import store from '@/store'
import conf from '@/conf'

import Notification from '@/components/Layout/Notification'

/***************
 * Load styles *
 ***************/

import '@/assets/styles.sass'

/*****************
 * Load settings *
 *****************/

// TODO: Create and call a boot loader that applies default values for all general settings (projects folder, shortcuts...), init database (?)
const settings = new Settings(conf.settings)

/**********************
 * Load notifications *
 **********************/

// TODO: Use _.merge(notifySettings, settings.get('notifications'))
const NotificationComponent = Vue.extend(Notification)
const openNotification = (notifySettings = settings.get('notifications')) => {
  return new NotificationComponent({
    el: document.createElement('div'),
    notifySettings
  })
}

/*********************
 * Load core objects *
 *********************/

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.settings = Vue.prototype.$settings = settings
Vue.openNotification = Vue.prototype.$openNotification = openNotification
Vue.config.productionTip = false

/*****************************
 * Init bootstrap of the app *
 *****************************/

conf.bootstrap._init((err, data) => {
  if (err) {
    console.log(`Error wile bootstrapping: ${err}`)
  } else {
    console.log('Bootstrap ended successfully')
    Vue.DB = Vue.prototype.$DB = data.collections

    /* eslint-disable no-new */
    new Vue({
      components: { App },
      router,
      store,
      template: '<App/>'
    }).$mount('#app')
  }
})
