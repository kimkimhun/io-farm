import Vue from 'vue'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueI18n from 'vue-i18n'

import App from './App'
import router from './router'
import {store} from './store'
import firebase from 'firebase'
import {firebaseConfig} from './config'
import messages from './language'

Vue.use(Vuetify)
Vue.use(VueI18n)
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
const LANGUAGE = 'language'
const local = localStorage.getItem(LANGUAGE)
const i18n = new VueI18n({
  locale: (local === null || local === '' || local === undefined) ? 'th' : local,
  messages
})

const unsubscribe = firebase
  .auth()
  .onAuthStateChanged((firebaseUser) => {
    new Vue({
      el: '#app', router, store, template: '<App/>', components: {
        App
      },
      i18n,
      created() {
        store.dispatch('autoSignIn', firebaseUser)
      },
    })
    unsubscribe()
  })


