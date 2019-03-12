<template lang="pug">
.Navbar(:class="{collapsed}")
  .container
    router-link.brand(:to="'/'")
      Icon.back(:class="{showBack}") arrow_back_ios
      | Enigma
    .list(v-if="$store.state.user.id && $route.name != 'leaderboard'")
      router-link.item(:to="'/challenges'" v-if="$store.state.user.type == 0")
        Icon assignment
        | Challenges
      router-link.item(:to="'/users'" v-if="$store.state.user.type == 0")
        Icon people
        | Users
      router-link.item(:to="'/tokens'" v-if="$store.state.user.type == 0")
        Icon people
        | Tokens
      router-link.item(:to="'/leaderboard'" v-if="$store.state.user.type == 0")
        Icon show_chart
        | Leaderbaord
      router-link.item(:to="'/create'"  v-if="$store.state.user.type == 0")
        Icon add
        | Create
    .list(v-if="!$store.state.user.id || $route.name == 'leaderboard'")
    .list(v-if="$store.state.user.id")
      a.item(href="/logout")
        Icon power_settings_new
        | Logout
    .list(v-if="!$store.state.user.id")
      .item(@click="$router.history.push($route.name == 'login' ? '/register' : '/login')")
        Icon power_settings_new
        | {{ $route.name == 'login' ? 'Register' : 'Login' }}
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      scrollTop: 0
    }
  },
  computed: {
    collapsed () {
      return this.scrollTop > 64
    },
    showBack () {
      return ['/', '/logout', '/login', '/register'].indexOf(this.$route.fullPath) === -1
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.scrollTop = scrollY
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '@/assets/sass/_Color.sass'

.Navbar
  width: 100%
  z-index: 100
  top: 0
  position: fixed
  font-size: 1.2rem
  user-select: none
  transition: height .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out
  height: 7.2rem
  background-color: $color-background
  box-shadow: 0 0 .4rem rgba(0, 0, 0, 0)
  .back
    opacity: 0
    font-size: 1.8rem
    margin-left: -0.6rem
    margin-right: 0.6rem
    transition: opacity .2s ease-in-out, margin .2s ease-in-out
    &.showBack
      opacity: 1
      margin: 0
  &.collapsed
    height: 4.8rem
    background-color: #101010
    box-shadow: 0 .1rem .2rem rgba(0, 0, 0, .5)
  .container
    height: 100%
    display: flex
    .brand
      display: flex
      align-items: center
      padding: 0 1.2rem
      font-size: 2.0rem
      text-shadow: 0 .3rem .6rem rgba(23, 23, 23, .5)
      color: $color-initial
      direction: ltr
    .list
      display: flex
      text-shadow: 0 2px 4px rgba(23, 23, 23, 1)
      &:first-of-type
        flex: 1
      .item
        color: $color-initial
        display: flex
        align-items: center
        text-align: center
        padding: 0 1.2rem
        margin: 0
        opacity: .7
        transition: color .2s ease-in-out
        cursor: pointer
        &:hover
          opacity: 1
        &.selected
          font-weight: 500
          color: #fff
        .Icon
          line-height: inherit
          padding: 0 .4rem
          opacity: .7
</style>
