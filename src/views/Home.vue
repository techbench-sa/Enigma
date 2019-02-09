<template lang="pug">
#Home
  .container
    header
      h1  Welcome, John Allen
      h3
        | Your current score is
        span 128
        | points
    Grid(:cols="4")
      ChallengeCard( v-for="(_, i) in Array(24)" :key="i")
</template>

<script>
import CodeMirror from 'codemirror'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/clike/clike'

export default {
  name: 'Home',
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
