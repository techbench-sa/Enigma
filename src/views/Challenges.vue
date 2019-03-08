<template lang="pug">
#Challenges
  .container
    table
      colgroup
        col(width="0%")
        col(width="0%")
        col(width="100%")
        col(width="0%")
        // col(width="0%")
      thead
        tr
          th ID
          th Title
          th Description
          // th Points
          th Visibility
      tbody
        Button.center(@click="test(0, true)") Show All
        Button.red.center(@click="test(-1, false)") Hide All
        tr(v-for="challenge in challenges")
          td.center {{challenge.id}}
          td {{challenge.name}}
          td(style="max-width: 1px") {{challenge.description}}
          // td.center {{challenge.points}}
          td.center
            Button(v-if="challenge.type == 1" hoverMessage="Hide" @click="test(challenge.id, true)") Visible
            Button.red(v-if="challenge.type == 0"  hoverMessage="Show" @click="test(challenge.id, false)") Hidden
                  //- Button(v-if="!addedToLibrary" icon="bookmark" @click="addToLibrary") {{$lang.main.add_to_library}}
                  //- Button.red(v-if="addedToLibrary" icon="bookmark"  @click="removeFromLibrary" :hoverMessage="$lang.main.remove_from_library")
                  //-   | {{$lang.main.added_to_library}}
          //- td.center {{challenge.type ? 'type' : 'visible'}}
              //- .add(@click="addCourse(section.crn)" v-if="!isInTable(section.crn)")
              //- .remove(@click="removeCourse(section.crn)" v-if="isInTable(section.crn)")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: { ...mapGetters(['challenges', 'user']) },
  methods: {
    test (id) {
      this.$store.dispatch('changeVisibility', id)
    }
  },
  mounted () {
    this.$store.dispatch('fetchChallenges')
  }
}
</script>

<style lang="sass" scoped>
#Challenges
  .container
    padding: 64px 36px
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
  .Button
    //width: 50%
    font-size: 14px
    font-weight: 400
    margin: 0
    padding: 4px 12px
    //background: transparent
  .red
    background-color: rgba(#D32F2F, .5) !important
    border: 1px solid rgba(#B71C1C, .5) !important
    &:hover
      background-color: rgba(#F44336, .5) !important
      border: 1px solid rgba(#D32F2F, .5) !important
</style>
