import Vue from 'vue'
import Vuex from 'vuex'
import Toastify from 'toastify-js'
import api from '@/api'

Vue.use(Vuex)

const createToast = (text, type) => Toastify({ text, duration: 3000, newWindow: true, close: true, className: type})

const connectionLostToast = createToast('Connection lost!', 'error')

export default new Vuex.Store({
  state: {
    challenges: [],
    solutions: [],
    user: {}
  },
  mutations: {
    'CHALLENGES_REQUEST': () => {},
    'CHALLENGES_SUCCESS': (state, payload) => {
      state.challenges = payload
    },
    'CHALLENGES_FAILURE': () => { connectionLostToast.showToast() },
    'USER_REQUEST': () => {},
    'USER_SUCCESS': (state, payload) => {
      state.user = payload
    },
    'USER_FAILURE': () => { connectionLostToast.showToast() },
    'CHALLENGE_REQUEST': () => {},
    'CHALLENGE_SUCCESS': (state, payload) => {
      const i = state.challenges.findIndex(challenge => challenge.id === payload.id)
      const challenge = state.challenges[i]
      if (i !== -1) {
        state.challenges.splice(i, 1, { ...challenge, ...payload })
      } else {
        state.challenges.push(payload)
      }
    },
    'CHALLENGE_FAILURE': () => { connectionLostToast.showToast() },
    'CHANGE_VISIBILITY_REQUEST': () => {},
    'CHANGE_VISIBILITY_SUCCESS': (state, payload) => {
      const i = state.challenges.findIndex(challenge => challenge.id === payload)
      const challenge = state.challenges[i]
      if (i !== -1) {
        state.challenges.splice(i, 1, { ...challenge, type: !challenge.type })
      }
    },
    'CHANGE_VISIBILITY_FAILURE': () => { connectionLostToast.showToast() }
  },
  actions: {
    fetchChallenges: context => {
      context.commit('CHALLENGES_REQUEST')
      api.getChallenges()
        .then(res => context.commit('CHALLENGES_SUCCESS', res.data))
        .catch(err => context.commit('CHALLENGES_FAILURE', err))
    },
    fetchChallenge: (context, id) => {
      context.commit('CHALLENGE_REQUEST')
      api.getChallenge(id)
        .then(res => context.commit('CHALLENGE_SUCCESS', res.data))
        .catch(err => context.commit('CHALLENGE_FAILURE', err))
    },
    fetchUser: context => {
      context.commit('USER_REQUEST')
      return api.getUser()
        .then(res => {
          context.commit('USER_SUCCESS', res.data)
          return res.data
        }).catch(err => {
          context.commit('USER_FAILURE', err)
          return {}
        })
    },
    changeVisibility: (context, id) => {
      context.commit('CHANGE_VISIBILITY_REQUEST', id)
      const i = context.getters.challenges.findIndex(challenge => challenge.id === id)
      const challenge = context.getters.challenges[i]
      return api.changeVisibility(id, !challenge.type)
        .then(res => {
          context.commit('CHANGE_VISIBILITY_SUCCESS', id)
          return res.data
        }).catch(() => {
          context.commit('CHANGE_VISIBILITY_FAILURE')
          return {}
        })
    },
    login: (context, { username, password }) => {
      context.commit('LOGIN_REQUEST')
      return api.login({ username, password })
        .then(res => {
          context.commit('LOGIN_SUCCESS', res.data)
          return res.data
        }).catch(err => {
          context.commit('LOGIN_FAILURE', err)
          return {}
        })
    }
  },
  getters: {
    challenges: state => state.challenges,
    user: state => state.user
  }
})
