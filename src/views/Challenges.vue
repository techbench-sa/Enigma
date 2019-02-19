<template lang="pug">
#Challenges
  .container
    table
      colgroup
        col(width="0%")
        col(width="0%")
        col(width="100%")
        col(width="0%")
        col(width="0%")
      thead
        tr
          th ID
          th Title
          th Description
          th Points
          th Visibility
      tbody
        tr(v-for="challenge in challenges")
          td.center {{challenge.id}}
          td {{challenge.name}}
          td(style="max-width: 1px") {{challenge.description}}
          td.center {{challenge.points}}
          td.center {{challenge.isHidden}}
              //- .add(@click="addCourse(section.crn)" v-if="!isInTable(section.crn)")
              //- .remove(@click="removeCourse(section.crn)" v-if="isInTable(section.crn)")
  
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
#Challenges
  .container
    padding: 64px 36px
  .card
    background-color: #343a40
    border: 1px solid #495057
    border-radius: 4px
    box-shadow: 0 2px 4px rgba(173, 181, 189, 0.1)
    overflow: hidden
    margin-bottom: 24px
    position: relative
    color: #ced4da

  table
    width: 100%
    margin: 64px 0
    font-size: 14px
    border-radius: 4px
    overflow: hidden
    box-shadow: 0 2px 8px rgba(0, 0, 0, .2)
    background-image: linear-gradient(#282828, #242424)
    thead
      background-color: rgba(73, 80, 87, 0.2)
    th, td
      padding-left: 16px !important
      padding-right: 16px !important
      text-align: left
      color: #fff
      white-space: nowrap
      border: 1px solid #383838
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    .center
      text-align: center
    th
      color: rgba(255, 255, 255, .7)
.c
  background: red

.table
  background: red
  
.grid
  display: grid
  grid-template-columns: repeat(5, auto)
  border-top: 1px solid black
  border-right: 1px solid black
  margin: 64px 0

  border-radius: 2px
  box-shadow: 0 2px 8px rgba(0, 0, 0, .2)
  border: 1px solid #383838
  background-image: linear-gradient(#282828, #242424)
  background-size: 100%
  outline: none
  span
    padding: 12px 24px
    border-right: 1px solid #383838
    border-bottom: 1px solid #383838
    &:nth-child(-n+5)
      background-color: #383838
      box-shadow: 0 0
    &:nth-last-child(-n+5)
      //background-color: blue
      border-bottom: 0
    &:nth-child(5n)
      border-right: 0
      //background-color: green


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
    .Button
      width: 50%
      background: red
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
