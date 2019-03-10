import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getUser () {
    return api('/user')
  },
  getUsers () {
    return api('/users')
  },
  changeUserType (id, type) {
    return api.post('/changeUserType', { id, type })
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
  }
}
