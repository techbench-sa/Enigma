<template lang="pug">
#Users
  .container
    Button.float-right.red.center(@click="changeUsersType(2)") Disable All
    Button.float-right.center(@click="changeUsersType(1)") Activate All
    table
      colgroup
        col(width="0%")
        col(width="15%")
        col(width="15%")
        col(width="15%")
        col(width="15%")
        col(width="10%")
        col(width="10%")
        col(width="10%")
        col(width="10%")
      thead
        tr
          th ID
          th Name
          th Username
          th Email
          th Phone number
          th submissions
          th score
          th.center state
      tbody
        tr(v-for="user in users")
          td.center {{user.id}}
          td {{user.name}}
          td {{user.username}}
          td {{user.email}}
          td {{user.phone_number}}
          td {{user.submissions}}
          td {{user.score}}
          td.center
            Button(v-if="user.type == 0" disabled) Admin
            Button(v-if="user.type == 1" hoverMessage="disable" @click="changeUserType(user.id, 2)") Active
            Button.red(v-if="user.type == 2" hoverMessage="activate" @click="changeUserType(user.id, 1)") Disabled
</template>

<script>
import api from '../api'
export default {
  name: 'Users',
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
    },
    changeUsersType (type) {
      api.changeUsersType(type)
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
    > .Button
      padding: .6rem 1.2rem
      margin: 0.8rem 0 1.2rem 1.2rem
  table
    width: 100%
    margin: 32px 0
    font-size: 14px
    border-radius: 4px
    overflow: hidden
    box-shadow: 0 2px 8px rgba(0, 0, 0, .2)
    background-image: linear-gradient(#282828, #242424)
    thead
      background-color: rgba(73, 80, 87, 0.2)
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
