<template lang="pug">
#Home
  .container
    header
      h1  Welcome, {{ user.name }}
      h3 Your current score is
        span {{ user.score }}
        | points
      .row
        .column.column-33.column-offset-33
    Grid(:cols="4")
      Card( v-for="(challenge, i) in challenges" :key="i" v-bind="challenge")
      Card( v-for="(challenge, i) in challenges" :key="i" v-bind="challenge")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: { ...mapGetters(['challenges', 'user']) },
  mounted () {
    this.$store.dispatch('fetchChallenges')
    this.$store.dispatch('fetchUser')
  }
}
</script>

<style lang="sass" scoped>
#Home
  .container
    padding: 64px 36px
  header
    text-align: center
    padding: 64px 0
    h3
      color: rgba(#fff, .7)
      span
        color: #fff
        padding: 0 12px

</style>
