import axios from 'axios'

// http://localhost:3000/api

const api = axios.create({
  // baseURL: 'http://localhost:3001/api',
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getTokens () {
    return api('/tokens')
  },
  getUser () {
    return api('/user')
  },
  getUsers () {
    return api('/users')
  },
  changeUserType (id, type) {
    return api.post('/changeUserType', { id, type })
  },
  changeUsersType (type) {
    return api.post('/changeUsersType', { type })
  },
  getChallenges () {
    return api('/challenges')
  },
  getChallenge (id) {
    return api(`/challenge/${id}`)
  },
  submit (id, lang, submission) {
    return api.post('/submit', { id, lang, submission })
  },
  addChallenge (data) {
    return api.post('/addChallenge', data)
  },
  login (data) {
    return api.post('/login', data)
  },
  changeVisibility (id, type) {
    return api.post('/changeVisibility', { id, type })
  },
  changeVisibilityForAll (visibility) {
    return api.post('/changeVisibilityForAll', { visibility })
  },
  deleteUser (id) {
    return api.post('/deleteUser', { id })
  },
  deleteChallenge (id) {
    return api.post('/deleteChallenge', { id })
  }
}
