<template lang="pug">
.ChallengeCard
    .title Challenge 1
    .body test testadsfsdgfdkflsdfkdsfodk
    .actions
        Button(@click="onClick") solve in java
        Button solve in python
</template>

<script>

export default {
  name: 'ChallengeCard',
  methods: {
    onClick () {
      this.$router.history.push(`challenge/1`)
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.ChallengeCard
  display: flex
  flex-direction: column
  width: 100%
  height: 216px
  border-radius: 2px
  background-color: #333 
  box-shadow: 0 2px 8px rgba(0, 0, 0, .2)
  border: 1px solid #383838
  background-image: linear-gradient(#282828, #242424)
  background-position: center
  background-repeat: no-repeat
  background-size: 100%
  outline: none
  .title
    height: 48px
    margin: 0 12px
    border-bottom: 1px solid #383838
    line-height: 48px
    text-align: center
    font-size: 20px
  .body
    flex: 1
    padding: 24px
    color: rgba(255, 255, 255, .7)
    text-align: center
    font-weight: 400
  .actions
    height: 48px
    display: flex
    background: rgba(73,80,87, .2)
    border-top: 1px solid rgba(255, 255, 255, .1)
    .Button
      width: 50%
      font-size: 14px
      font-weight: 400
      border: 0
      border-radius: 0
      margin: 6px 0
      padding: 0
      background: transparent
      &:not(:last-of-type)
        border-inline-end: 1px solid rgba(255, 255, 255, .1)
      

</style>