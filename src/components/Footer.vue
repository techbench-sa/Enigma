<template lang="pug">
.Footer Copyright © 2019 Enigma &ensp;&mdash;&ensp;Developed with ❤️ by
    a(href="http://www.twitter.com/tech_bench") TechBench
</template>

<script>
export default {
  name: 'tb-footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Footer
  width: 100%
  height: 4.8rem
  font-size: 12px
  color: rgba(255, 255, 255, .3)
  display: flex
  align-items: center
  justify-content: center
  border-top: .1rem solid rgba(255, 255, 255, .1)
  clear: both
  position: relative
  a
      font-size: 1.2rem
      color: rgba(255, 255, 255, .5)
      padding: 0 .6rem
</style>
