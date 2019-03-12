<template lang="pug">
#Users
  .container
    header
      img.crown(src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxOTIgMTkyIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxOTJ2LTE5MmgxOTJ2MTkyeiIgZmlsbD0ibm9uZSI+PC9wYXRoPjxnIGlkPSJvcmlnaW5hbC1pY29uIiBmaWxsPSIjZmFiOTE1Ij48cGF0aCBkPSJNOTYsMjRjLTQuNDE4MjgsMCAtOCwzLjU4MTcyIC04LDhjLTAuMDAzMzIsMi41ODQ0OSAxLjI0MjEzLDUuMDExMzcgMy4zNDM3NSw2LjUxNTYybC0yNC41NzgxMywzNC40MDYyNWwtNDMuMTg3NSwtMTQuMzkwNjNjMC4yNzU5MiwtMC44MTU1NSAwLjQxODM3LC0xLjY3MDMgMC40MjE4OCwtMi41MzEyNWMwLC00LjQxODI4IC0zLjU4MTcyLC04IC04LC04Yy00LjQxODI4LDAgLTgsMy41ODE3MiAtOCw4YzAsNC40MTgyOCAzLjU4MTcyLDggOCw4YzAuNTgzOCwtMC4wMDQyMiAxLjE2NTM5LC0wLjA3MjMzIDEuNzM0MzgsLTAuMjAzMTJsMTQuMjY1NjIsNjQuMjAzMTJoMTI4bDE0LjI2NTYyLC02NC4xODc1YzAuNTY5NTYsMC4xMjU1MyAxLjE1MTE0LDAuMTg4NDEgMS43MzQzOCwwLjE4NzVjNC40MTgyOCwwIDgsLTMuNTgxNzIgOCwtOGMwLC00LjQxODI4IC0zLjU4MTcyLC04IC04LC04Yy00LjQxODI4LDAgLTgsMy41ODE3MiAtOCw4YzAuMDAzNSwwLjg2MDk1IDAuMTQ1OTYsMS43MTU3IDAuNDIxODcsMi41MzEyNWwtNDMuMTg3NSwxNC4zOTA2M2wtMjQuNTkzNzUsLTM0LjQyMTg4YzIuMTAzMDUsLTEuNDk3NjUgMy4zNTQwNSwtMy45MTgxOSAzLjM1OTM4LC02LjVjMCwtNC40MTgyOCAtMy41ODE3MiwtOCAtOCwtOHpNMzIsMTQ0djE2aDEyOHYtMTZ6Ij48L3BhdGg+PC9nPjxwYXRoIGQ9Ik05NiwxOTJjLTUzLjAxOTM0LDAgLTk2LC00Mi45ODA2NiAtOTYsLTk2djBjMCwtNTMuMDE5MzQgNDIuOTgwNjYsLTk2IDk2LC05NnYwYzUzLjAxOTM0LDAgOTYsNDIuOTgwNjYgOTYsOTZ2MGMwLDUzLjAxOTM0IC00Mi45ODA2Niw5NiAtOTYsOTZ6IiBmaWxsPSJub25lIj48L3BhdGg+PHBhdGggZD0iTTk2LDE4OC4xNmMtNTAuODk4NTYsMCAtOTIuMTYsLTQxLjI2MTQ0IC05Mi4xNiwtOTIuMTZ2MGMwLC01MC44OTg1NiA0MS4yNjE0NCwtOTIuMTYgOTIuMTYsLTkyLjE2djBjNTAuODk4NTYsMCA5Mi4xNiw0MS4yNjE0NCA5Mi4xNiw5Mi4xNnYwYzAsNTAuODk4NTYgLTQxLjI2MTQ0LDkyLjE2IC05Mi4xNiw5Mi4xNnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PC9zdmc+")
      h1  Leader Board
    table
      colgroup
        col(width="0%")
        col(width="10%")
        col(width="100%")
      thead
        tr
          th.center RANK
          th PLAYER'S NAME
          th PROGRESS
          th.center POINTS
          th.center SOLVED
      transition-group(name="leaderboard-animation" tag="tbody")
        //- Button(@click="test(0, true)") Show All
        //- Button.red(@click="test(-1, false)") Hide All
        
        tr(v-for="(user, i) in users" :key="user.id")
          td.center(style="font-size: 3.2rem") {{i + 1}}
          td {{user.name}}
          td
            .progress-bar
              .bar
                .progress(:style="'width:' + (user.score / total * 100) + '%'")
          td.center(style="font-size: 2.4rem") {{user.score}} pts
          td.center(style="font-size: 3.2rem") {{user.solved}}
</template>

<script>
import api from '../api'
import Vue from 'vue'

export default {
  name: 'Leaderboard',
  data () {
    return {
      users: []
    }
  },
  computed: {
    total () {
      return this.users.length ? this.users.reduce((max, user) => user.score > max ? user.score : max, 0) : 0
    }
  },
  methods: {
    getUsers () {
      api.getUsers().then(res => {
        this.users = res.data.sort((a, b) => b.score - a.score)
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
    padding: 16px 36px
    header
      text-align: center
      padding: 12px 0
      .crown
        width: 3.6rem
        height: 3.6rem
      h1
        font-weight: 300
  table
    width: 100%
    margin: 16px 0
    font-size: 14px
    border-radius: 4px
    overflow: hidden
    thead
    th, td
      padding: 16px 32px !important
      text-align: left
      color: #fff
      white-space: nowrap
      border: 0
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

  .progress-bar 
    border-radius: 4px
    overflow: hidden
    width: 100%
    span
      display: block
  .bar
    background: #212121
  .progress
    animation: loader 8s ease infinite
    background: rgb(250, 185, 21)
    color: #fff
    padding: 2px
  .leaderboard-animation-move
    transition: transform .5s
</style>
