import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

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
    'CHALLENGES_FAILURE': () => {},
    'USER_REQUEST': () => {},
    'USER_SUCCESS': (state, payload) => {
      state.user = payload
    },
    'USER_FAILURE': () => {},
    'CHALLENGE_REQUEST': () => {},
    'CHALLENGE_SUCCESS': (state, payload) => {
      const i = state.challenges.findIndex(challenge => challenge.number === payload.number)
      const challenge = state.challenges[i]
      if (i !== -1) {
        state.challenges.splice(i, 1, { ...challenge, ...payload })
      } else {
        state.challenges.push(payload)
      }
    },
    'CHALLENGE_FAILURE': () => {}
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
    login: (context, { username, password }) => {
      context.commit('LOGIN_REQUEST')
      return api.login({ username, password })
        .then(res => {
          console.log(res)
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
