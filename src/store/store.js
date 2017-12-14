
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  todos: [],
  number: 0
}

const mutations = {
  addText: (state, name) => {
    state.todos.push({ name: name })
  },
  addNum: (state, num) => {
    state.number += num
  }
}

const getters = {
  todos: state => state.todos,
  number: state => state.number
}

const actions = {
  addTodo: (state, name) => {
    store.commit('addText', name)
  },
  addNumber: (state, num) => {
    store.commit('addNum', num)
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
