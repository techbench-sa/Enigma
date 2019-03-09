<template lang="pug">
.ChallengeCard(:class="`${color} ${type == 0 ? 'hidden': ''}`")
    .title {{ name }}
    .body {{ description }}
    .actions(v-if="color == 'green'")
      span solved
    .actions(v-else)
        Button(@click="solveWith('java')") solve in java
        Button(@click="solveWith('python')") solve in python
</template>

<script>

export default {
  name: 'Card',
  props: ['id', 'name', 'description', 'points', 'score', 'type'],
  computed: {
    color () {
      return this.score >= this.points ? 'green' : this.score > 0 ? 'yellow' : ''
    }
  },
  methods: {
    solveWith (lang) {
      this.$router.history.push(`solve/${lang}/${this.id}`)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
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
  &.hidden
    opacity: .5
  &.green
    background: green
  &.yellow
    background: rgba(#f59f00, .2)
    border: 1px solid rgba(#fcc419, .1)
    .title
      border-bottom: 1px solid rgba(#fcc419, .1)
    .actions
      border-top: 1px solid rgba(#fcc419, .1)
      background: rgba(#fcc419, .1)
  &.green
    background: rgba(#37b24d, .2)
    border: 1px solid rgba(#51cf66, .1)
    .title
      border-bottom: 1px solid rgba(#51cf66, .1)
    .actions
      border-top: 1px solid rgba(#51cf66, .1)
      background: rgba(#51cf66, .1)
  .title
    height: 48px
    margin: 0 12px
    border-bottom: 1px solid #383838
    line-height: 48px
    text-align: center
    font-size: 20px
  .body
    height: 118px
    padding: 24px
    overflow: hidden
    color: rgba(255, 255, 255, .7)
    text-align: center
    font-weight: 400
    position: relative
    mask-image: linear-gradient(to top, rgba(black, 0) .1rem, black 1.8rem)
    &::after
      content: ""
      display: block
      width: 100%
      height: 8px
      position: absolute
      z-index: 10
      bottom: 0
      left: 0
  .actions
    height: 48px
    display: flex
    background: rgba(73,80,87, .2)
    border-top: 1px solid rgba(255, 255, 255, .1)
    span
      height: 100%
      width: 100%
      font-size: 16px
      font-weight: 400
      border: 0
      border-radius: 0
      padding: 0
      background: transparent
      text-transform: uppercase
      display: flex
      align-items: center
      justify-content: center
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
