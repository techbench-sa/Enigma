<template lang="pug">
#Tokens
  .container
    .row
      .column.column-60.column-offset-20
        table
          colgroup
            col(width="40%")
            col(width="40%")
            col(width="20%")
          thead
            tr
              th Token
              th User ID
              th.center Used
          tbody
            tr(v-for="token in tokens")
              td.center {{token.string}}
              td {{token.user_id}}
              td.center
                Button.red(v-if="token.is_used" disabled) Yes
                Button(v-if="!token.is_used" disabled) No
</template>

<script>
import api from '../api'
export default {
  name: 'Tokens',
  data () {
    return {
      tokens: {}
    }
  },
  methods: {
    getTokens () {
      api.getTokens().then(res => {
        this.tokens = res.data //.sort((a, b) => a.id - b.id)
      })
      this.timeout = setTimeout(this.getTokens, 1000)
    }
  },
  mounted () {
    this.getTokens()
  },
  destroyed () {
    clearTimeout(this.timeout)
  }
}
</script>

<style lang="sass" scoped>
#Tokens
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
