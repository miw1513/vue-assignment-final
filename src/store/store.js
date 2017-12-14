import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '../router/index'

let config = {
  apiKey: 'AIzaSyDLfM_hgjwzB9VAuso7gIkYnPq4OuCfAJE',
  authDomain: 'drawsomething-21394.firebaseapp.com',
  databaseURL: 'https://drawsomething-21394.firebaseio.com',
  projectId: 'drawsomething-21394',
  storageBucket: 'drawsomething-21394.appspot.com',
  messagingSenderId: '948399402337'
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
    dataQuestion: [],
    keyPlayer: ''
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
    },
    setKeyplayer (state, data) {
      state.keyPlayer = data
    }
  },
  actions: {
    init ({ commit, dispatch, bindFirebaseRef }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user && user.uid) {
          let profile = {
            name: user.displayName,
            picture: user.photoURL,
            fb: user.providerData[0]
          }
          commit('setKeyplayer', user.uid)
          commit('setUser', profile)
          router.push('/lobby')
        } else {
          commit('setUser', null)
          router.push('/login')
          commit('setReady')
        }
      })
    },
    login (context) {
      var vm = this
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user
        vm.displayName = user.displayName
        vm.photoURL = user.photoURL
        var tmp = {
          name: user.displayName,
          picture: user.photoURL,
          fb: user.providerData[0]
        }
        
        db.ref('players').child(user.uid).set(tmp)
        context.commit('setKeyplayer', user.uid)
        context.commit('setUser', tmp)
        console.log(context.state.keyPlayer)
        router.push('/lobby')
      }).catch(function (error) {
        console.log(error)
      })
    },
    logout () {
      console.log('asdsad')
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
