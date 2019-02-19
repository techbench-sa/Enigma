<template lang="pug">
.Button(
    @click="$emit('click', $event)"
    :class="{hover}"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :disabled="disabled")
  Icon {{icon}}
  | {{hover ? hoverMessage : ''}}
  slot(v-if="!hoverMessage || !hover")
</template>

<script>
export default {
  name: 'Button',
  props: ['hoverMessage', 'name', 'icon', 'disabled'],
  data () {
    return {
      hover: false
    }
  },
  methods: {
    onMouseEnter () {
      if (!this.disabled) {
        this.hover = true
      }
    },
    onMouseLeave () {
      this.hover = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '@/assets/sass/_Color.sass'

.Button
  display: grid
  padding: 1.2rem 2.4rem
  grid-template-columns: repeat(2, auto)
  grid-column-gap: .8rem
  align-items: center
  justify-content: center
  white-space: nowrap
  cursor: pointer
  font-size: 1.6rem
  font-weight: 500
  text-transform: uppercase
  background-color: rgba(127, 127, 127, .4)
  border: 1px solid $color-primary
  border-radius: 4px
  user-select: none
  &:hover
    background-color: $color-secondary
  &[disabled="disabled"]
    opacity: .7
    pointer-events: none
  .Icon
    opacity: .75
    font-size: 16px
</style>
