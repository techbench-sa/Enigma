<template lang="pug">
#Challenges
  .container
    Button.float-right.red.center(@click="changeVisibilityForAll(3)") Hide All
    Button.float-right.center(@click="changeVisibilityForAll(1)") Show All
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
          th.center Delete
          th.center State
      tbody
        tr(v-for="challenge in challenges")
          td.center(@click="solve(challenge.id)") {{challenge.id}}
          td {{challenge.name}}
          td(style="max-width: 1px") {{challenge.description}}
          td.center {{challenge.points}}
          td.center
            Button.red(@click="deleteChallenge(challenge.id)") Delete
          td.center
            Button(v-if="challenge.type == 1" hoverMessage="Hide" @click="changeVisibility(challenge.id, true)") Visible
            Button.red(v-if="challenge.type == 3"  hoverMessage="Show" @click="changeVisibility(challenge.id, false)") Hidden
            .span(v-if="challenge.type != 3 && challenge.type != 1") {{challenge.type}}
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
  name: 'Challenges',
  computed: { ...mapGetters(['challenges', 'user']) },
  methods: {
    changeVisibility (id) {
      this.$store.dispatch('changeVisibility', id)
    },
    solve(id) {
      this.$router.history.push(`solve/java/${id}`)
    },
    changeVisibilityForAll (visibility) {
      this.$store.dispatch('changeVisibilityForAll', visibility)
    },
    deleteChallenge (id) {
      this.$store.dispatch('deleteChallenge', id)
      
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
    > .Button
      padding: .6rem 1.2rem
      margin: 0.8rem 0 1.2rem 1.2rem
  table
    width: 100%
    margin: 32px 0
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
