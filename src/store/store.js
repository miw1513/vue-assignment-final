
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: {},
  isReady: false
}

const mutations = {
  setReady (state) {
    state.isReady = true
  },
  setUser (state, user) {
    state.user = user
  }
}

const getters = {
  user: state => state.user,
  isReady: state => state.isReady
}

const actions = {
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
        router.push('/')
      } else {
        commit('setUser', null)
        router.push('/login')
        commit('setReady')
      }
    })
  },
  login () {
    let provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithRedirect(provider)
  },
  logout () {
    firebase.auth().signOut()
  }
}

let store = new Vuex.Store({
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions
})

global.store = store
export default store
