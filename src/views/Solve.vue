<template lang="pug">
#Solve
  .container
    .wrapper
      Editor(:value="value" v-on:update:value="value = $event")
      .panel
          .title {{ challenge.name }}
          .body {{ challenge.description }}
          code.results(v-if="results")
            .result.wrong(v-if="error")
              .content {{ error }}
                icon
            .result(v-for="result in results" :class="result.payload.value ? 'correct':'wrong'")
              .content
                | {{ challenge.method_name }}({{ `${tests.inputs.map(v => v[result.payload.test])}` }})
                | ==> {{ tests.outputs[result.payload.test] }}
              Icon
          Button(@click="submit") submit
</template>

<script>
import api from '@/api'
import { mapGetters } from 'vuex'

export default {
  name: 'Challenge',
  data () {
    return {
      results: [],
      value: '',
      error: ''
    }
  },
  watch: {
    challenge ({ name, signatures }) {
      switch (this.$route.params.lang) {
        case 'java':
          this.value = `class ${name.replace(' ', '')} {\n\n` +
            `\t${signatures.java} {\n\n` +
            '\t\t/* write your code here */\n\n' +
            '\t}\n\n' +
            '}'
          break
        case 'python':
          this.value = `# ${name.replace(' ', '')}.py\n\n` +
            `${signatures.python}:\n\n` +
            '\t# write your code here #\n\n' +
            '#### please write above this line ####\n\n'
          break
      }
    }
  },
  computed: {
    ...mapGetters(['challenges']),
    challenge () {
      const challenge = this.challenges.find(c => c.id === +this.$route.params.id)
      return challenge || {}
    },
    tests () {
      return this.challenge.tests ? JSON.parse(this.challenge.tests) : []
    }
  },
  methods: {
    submit () {
      this.error = ''
      this.results = []
      const { id, lang } = this.$route.params
      const submission = this.value.split('\n').slice(3, -3).join('\n')
      api.submit(id, lang, submission).then(res => {
        const { error, results, code } = res.data
        if (code === 0) {
          this.results = results.filter(r => r.type === 'test')
        }
        if (code === 1) {
          this.error = error
          console.warn('Error: Please print a presentable message here!')
        }
      })
    }
  },
  mounted () {
    const id = this.$route.params.id
    this.$store.dispatch('fetchChallenge', id)
    // api.getChallenge(id).then(res => {
    //   console.log(res.data)
    //   this.challenge = res.data
    //   console.log('test')

    // })
  }
}
</script>

<style lang="sass">
#Solve
  height: 100%
  .container
    height: 100%
  .wrapper
    background: #272822
    height: 100%
    border-radius: 6px
    border: 1px solid #484848
    background: #282828
    overflow: hidden
    background-image: linear-gradient(#282828, #242424)
    display: flex
    .panel
      width: 480px
      background: #363636
      border-left: 1px solid #484848
      padding: 12px 12px 24px
      box-sizing: border-box
      display: flex
      flex-direction: column
      .title
        border-bottom: 1px solid rgba(#fff, .1)
        padding: 12px 0
        text-align: center
        font-size: 24px
      .body
        flex: 1
        padding: 24px
        color: rgba(#fff, .87)
        font-weight: 300
      .results
          display: block
          background: rgba(#fff, .1)
          width: 100%
          margin: 24px 0
          padding: 0
          white-space: inherit
          .result
            font-size: 14px
            line-height: 48px
            padding: 0 12px
            position: relative
            padding-right: 32px
            .Icon
              content: ""
              display: inline-block
              position: absolute
              right: 12px
              top: 12px
              font-size: 24px
              border-radius: 50%
              background-position: center
              background-repeat: no-repeat
            &.correct
              border-left: 2px solid #2b8a3e
              .Icon::before
                content: "check"
                color: #51cf66
            &.wrong
              border-left: 2px solid  #c92a2a
              .Icon::before
                content: "close"
                color: #ff6b6b
            &:not(:last-of-type)
              border-bottom: 1px solid rgba(#fff, .1)
</style>
