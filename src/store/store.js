import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'

let config = {
  apiKey: 'AIzaSyDdq92cBZ4Mv5VdbHGfVnE0q4ZlTctvIeg',
  authDomain: 'vue-assignment.firebaseapp.com',
  databaseURL: 'https://vue-assignment.firebaseio.com',
  projectId: 'vue-assignment',
  storageBucket: 'vue-assignment.appspot.com',
  messagingSenderId: '812344967443'
}
var firebaseApp = firebase.initializeApp(config)
let provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})
var db = firebaseApp.database()
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    user: {},
    isReady: false,
    dataQuestion: []
  },
  getters: {
    user: state => state.user,
    isReady: state => state.isReady,
    dataQuestion: state => state.dataQuestion
  },
  mutations: {
    setReady (state) {
      state.isReady = true
    },
    setUser (state, user) {
      state.user = user
    },
    setQuestion (state, data) {
      state.dataQuestion = data
    }
  },
  actions: {
    init ({ commit, dispatch, bindFirebaseRef }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user && user.uid) {
          let { displayName, uid } = user
          let profile = {
            displayName,
            uid,
            fb: user.providerData[0]
          }
          commit('setUser', profile)
          router.push('/hello')
        } else {
          commit('setUser', null)
          router.push('/login')
          commit('setReady')
        }
      })
    },
    login () {
      console.log('asd')
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    setting (context) {
      var dataQ = []
      var ref = db.ref('question')
      ref.once('value').then(snapshot => {
        const questionData = snapshot.val()
        Object.keys(questionData).map((key, index) => {
          dataQ.push(questionData[key])
        })
      }
      )
      context.commit('setQuestion', dataQ)
    },
    saveData (context, picture) {
      db.ref('draw/match').push(picture)
    }
  }
})
