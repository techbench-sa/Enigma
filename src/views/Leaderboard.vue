<template lang="pug">
#Users
  .container
    header
      h1  Leaderboard
    table
      colgroup
        col(width="0%")
        col(width="90%")
        col(width="10%")
      thead
        tr
          th.center RANK
          th NAME
      tbody
        //- Button(@click="test(0, true)") Show All
        //- Button.red(@click="test(-1, false)") Hide All
        tr(v-for="user in users")
          td.center(style="font-size: 3.2rem") {{user.id}}
          td {{user.name}}
</template>

<script>
import api from '../api'
export default {
  name: 'Leaderboard',
  data () {
    return {
      users: {}
    }
  },
  methods: {
    getUsers () {
      api.getUsers().then(res => {
        this.users = res.data.sort((a, b) => a.id - b.id)
      })
      this.timeout = setTimeout(this.getUsers, 1000)
    },
    changeUserType (id, type) {
      api.changeUserType(id, type)
    }
  },
  mounted () {
    this.getUsers()
  },
  destroyed () {
    clearTimeout(this.timeout)
  }
}
</script>

<style lang="sass" scoped>
#Users
  .container
    padding: 64px 36px
    header
      text-align: center
      padding: 24px 0
      h3
        color: rgba(#fff, .7)
        span
          color: #fff
          padding: 0 12px
  table
    width: 100%
    margin: 64px 0
    font-size: 14px
    border-radius: 4px
    overflow: hidden
    box-shadow: 0 2px 8px rgba(0, 0, 0, .2)
    thead
    th, td
      padding-left: 16px !important
      padding-right: 16px !important
      text-align: left
      color: #fff
      white-space: nowrap
      border: 1px solid #383838
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    .center
      text-align: center
    th
      color: rgba(255, 255, 255, .7)
    td
      font-size: 2rem
  .Button
    //width: 50%
    font-size: 14px
    font-weight: 400
    margin: 0
    padding: 4px 6px
    //background: transparent
  .red
    background-color: rgba(#D32F2F, .5) !important
    border: 1px solid rgba(#B71C1C, .5) !important
    &:hover
      background-color: rgba(#F44336, .5) !important
      border: 1px solid rgba(#D32F2F, .5) !important
</style>
