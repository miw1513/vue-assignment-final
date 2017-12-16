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
    statusDraw: '0',
    copyDrawALL: {},
    scoreboard: '',
    countQuestion: 0,
    playerSlot: '',
    myscore: 0
  },
  getters: {
    user: state => state.user,
    isReady: state => state.isReady,
    dataQuestion: state => state.dataQuestion,
    keyPlayer: state => state.keyPlayer,
    Partys: state => state.Partys,
    userCreate: state => state.userCreate,
    statusDraw: state => state.statusDraw,
    copyDrawALL: state => state.copyDrawALL,
    scoreboard: state => state.scoreboard,
    countQuestion: state => state.countQuestion,
    myscore: state => state.myscore
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
    },
    setCopyDraw (state, data) {
      state.copyDrawALL = data
    },
    setcountQuestion (state, data) {
      state.countQuestion = data
    },
    setscoreboard (state, data) {
      state.scoreboard = data
    },
    setSlotPlayer (state, data) {
      state.playerSlot = data
    },
    setmyscore (state, data) {
      state.myscore = data
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
          fb: user.providerData[0],
          score: 0
        }
        db.ref('players').child(user.uid).set(tmp)
        context.commit('setKeyplayer', user.uid)
        context.commit('setUser', tmp)
        db.ref('players').child(context.state.keyPlayer + '/status').set('0')
        router.push('/lobby')
      }).catch(function (error) {
        console.log(error)
      })
    },
    logout () {
      firebase.auth().signOut()
      router.push('/login')
    },
    setting (context) {
      var dataQ = []
      var ref = db.ref('question')
      ref.once('value').then(snapshot => {
        const questionData = snapshot.val()
        Object.keys(questionData).map((key, index) => {
          dataQ.push(questionData[key])
        })
        db.ref('partys/' + context.state.CurrentMatch + '/countQuestion').on('value', (snapshot) => {
          context.commit('setcountQuestion', snapshot.val())
          console.log(snapshot.val())
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
      db.ref('players').child(context.state.keyPlayer + '/status').set('1')
      router.push('/draw')
      // db.ref('currentMatch/' + context.state.keyPlayer).set(key)
      // console.log(snapshot.ref.key) ดึง key
    },
    loadpartys (context) {
      var ref = db.ref('partys')
      ref.on('value', (snapshot) => {
        context.commit('setPartys', snapshot.val())
        const playerCreateData = snapshot.val()
        var playerCreateOnce = []
        if (playerCreateData) {
          Object.keys(playerCreateData).map((key, index) => {
            db.ref('players/' + playerCreateData[key].idhost).on('value', (snapshot) => {
              playerCreateOnce.push(snapshot.val())
            })
          })
        }
        context.commit('setUserCreate', playerCreateOnce)
      })
    },
    joinRoom (context, idhost) {
      context.commit('setJoinMatch', idhost)
      for (var z = 1; z <= 4; z++) {
        db.ref('partys/' + context.state.CurrentMatch + '/idplayer' + z).on('value', (snapshot) => {
          if (snapshot.val() === '') {
            db.ref('partys/').child(context.state.CurrentMatch + '/idplayer' + z).set(context.state.keyPlayer)
            db.ref('players').child(context.state.keyPlayer + '/status').set('0')
            context.commit('setSlotPlayer', z)
            db.ref('partys/' + context.state.CurrentMatch + '/countPlayer').once('value', (snapshot) => {
              var countPlayers = snapshot.val() + 1
              db.ref('partys/').child(context.state.CurrentMatch + '/countPlayer').set(countPlayers)
            })
            z = 5
          }
        })
      }
      router.push('/draw')
    },
    checkMatch (context) {
      if (context.state.CurrentMatch === '') {
        router.push('/lobby')
      }
    },
    checkStatus (context) {
      db.ref('players/' + context.state.keyPlayer).once('value', (snapshot) => {
        context.commit('setstatusDraw', snapshot.val().status)
      })
    },
    copyDraw (context) {
      console.log('copyDraw')
      db.ref('partys/' + context.state.CurrentMatch + '/draw').once('value', (snapshot) => {
        if (snapshot.val()) {
          context.commit('setCopyDraw', snapshot.val())
        } else {
          context.commit('setCopyDraw', null)
        }
      })
    },
    nextQuestion (context) {
      db.ref('partys/' + context.state.CurrentMatch + '/countQuestion').set(context.state.countQuestion + 1)
    },
    getscoreboard (context) {
      var DataScore = []
      var DataScoreAll = []
      db.ref('players').on('value', (snapshot) => {
        DataScore = snapshot.val()
        Object.keys(DataScore).map((key, index) => {
          DataScoreAll.push(DataScore[key])
        })
        var length = DataScoreAll.length
        for (var i = 0; i < length - 1; i++) {
          var min = i
          for (var j = i + 1; j < length; j++) {
            if (DataScoreAll[j].score > DataScoreAll[min].score) {
              min = j
            }
          }
          if (min !== i) {
            var tmp = DataScoreAll[i]
            DataScoreAll[i] = DataScoreAll[min]
            DataScoreAll[min] = tmp
          }
        }
        console.log(DataScoreAll)
        //   for (var i = 0; i < DataScoreAll.length; i++) {
        //     for (var u = 0; u < DataScoreAll.length; u++) {
        //     if (DataScoreAll[index] < DataScoreAll[i]) {
        //       DataScoreAll[index] = DataScoreAll[i]
        //     }
        //   }
        // }
        context.commit('setscoreboard', DataScoreAll)
      })
    },
    saveScore (context) {
      db.ref('partys/' + context.state.keyPlayer + '/score').set(context.state.myscore + 1)
      context.commit('setmyscore', context.state.myscore + 1)
    },
    backPage (context) {
      if (context.state.statusDraw === '1') {
        db.ref('partys').child(context.state.CurrentMatch).remove()
        context.commit('setJoinMatch', '')
        context.commit('setstatusDraw', '')
        context.commit('setscoreboard', '')
        router.push('/lobby')
      } else if (context.state.statusDraw === '0') {
        db.ref('partys/' + context.state.CurrentMatch + '/countPlayer').once('value', (snapshot) => {
          console.log(snapshot.val() - 1)
          db.ref('partys/').child(context.state.CurrentMatch + '/countPlayer').set(snapshot.val() - 1)
        })
        db.ref('partys/').child(context.state.CurrentMatch + '/idplayer' + context.state.playerSlot).set('')
        context.commit('setJoinMatch', '')
        context.commit('setstatusDraw', '')
        context.commit('setscoreboard', '')
        router.push('/lobby')
      }
    },
    deleteDraw (context) {
      db.ref('partys').child(context.state.CurrentMatch + '/draw').set(null)
    }
  }
})
