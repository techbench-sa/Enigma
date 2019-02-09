<template lang="pug">
.Footer Copyright © 2018 TechBench&ensp;&mdash;&ensp;Managed by
    a(href="http://www.samizhioua.com/") Dr. Sami Zhioua
</template>

<script>
export default {
  name: 'tb-footer',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Footer
  width: 100%
  height: 54px
  font-size: 12px
  color: rgba(255, 255, 255, .3)
  display: flex
  align-items: center
  justify-content: center 
  border-top: 1px solid rgba(255, 255, 255, .1)
  clear: both
  position: relative
  a
      font-size: 12px
      color: rgba(255, 255, 255, .5)
      padding: 0 6px
</style>