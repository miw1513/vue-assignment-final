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
    keyPlayer: '',
    Partys: '',
    userCreate: [],
    CurrentMatch: '',
    statusDraw: '0'
  },
  getters: {
    user: state => state.user,
    isReady: state => state.isReady,
    dataQuestion: state => state.dataQuestion,
    keyPlayer: state => state.keyPlayer,
    Partys: state => state.Partys,
    userCreate: state => state.userCreate,
    statusDraw: state => state.statusDraw
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
    },
    setPartys (state, data) {
      state.Partys = data
    },
    setUserCreate (state, data) {
      state.userCreate = data
    },
    setJoinMatch (state, data) {
      state.CurrentMatch = data
    },
    setstatusDraw (state, data) {
      state.statusDraw = data
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
        router.push('/lobby')
      }).catch(function (error) {
        console.log(error)
      })
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
      db.ref('partys').child(context.state.CurrentMatch + '/draw').push(picture)
    },
    createparty (context, Object) {
      var key = db.ref('partys').push(Object).getKey()
      context.commit('setJoinMatch', key)
      context.commit('setstatusDraw', '1')
      // db.ref('currentMatch/' + context.state.keyPlayer).set(key)
      // console.log(snapshot.ref.key) ดึง key
    },
    loadpartys (context) {
      var ref = db.ref('partys')
      ref.on('value', (snapshot) => {
        context.commit('setPartys', snapshot.val())
        const playerCreateData = snapshot.val()
        var playerCreateOnce = []
        Object.keys(playerCreateData).map((key, index) => {
          db.ref('players/' + playerCreateData[key].idhost).on('value', (snapshot) => {
            playerCreateOnce.push(snapshot.val())
          })
        })
        context.commit('setUserCreate', playerCreateOnce)
      })
    },
    joinRoom (context, idhost) {
      context.commit('setJoinMatch', idhost)
      router.push('/draw')
    },
    checkMatch (context) {
      if (context.state.CurrentMatch === '') {
        router.push('/lobby')
      }
    }
  }
})
