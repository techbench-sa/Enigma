<template lang="pug">
.Alert
  Icon highlight_off
  | {{ message }}
</template>

<script>
export default {
  name: 'Alert',
  props: ['message']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.Alert
  background: red
  width: 100%
  height: 4.8rem
  display: flex
  align-items: center
  padding: 0 1.2rem
  margin-bottom: 2.4rem
  background: rgba(#f03e3e, .1)
  border: 1px solid rgba(#ff6b6b, .3)
  border-radius: .4rem
  .Icon
    color: #ff6b6b
    font-size: 2.4rem
    margin-right: 1.2rem
</style>
