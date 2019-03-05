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
            .result(v-for="result in results" :class="result.type")
              .content {{ result.message }}
              Icon
          Button(@click="submit" :disabled="checking") {{ checking ? 'checking...' : 'submit' }}
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
      error: '',
      checking: false
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
      this.checking = true
      const { id, lang } = this.$route.params
      const submission = this.value.split('\n').slice(3, -3).join('\n')
      api.submit(id, lang, submission).then(res => {
        this.checking = false
        const { error, results, code } = res.data
        if (code === 0) {
          this.results = results.map(({ type, payload }) => {
            switch (type) {
              case 'test':
                const method = this.challenge.method_name
                const { inputs, outputs } = this.tests
                return {
                  message: `${method}(${inputs.map(v => v[payload.test])}) ==> ${outputs[payload.test]}`,
                  type: payload.value ? 'correct' : 'wrong'
                }
              default:
                return {
                  message: payload.message,
                  type: 'warning'
                }
            }
          })
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
  }
}
</script>

<style lang="sass">
#Solve
  height: 100%
  padding-bottom: 24px
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
            line-height: 24px
            padding: 12px 12px
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
            &.warning
              border-left: 2px solid  #e67700
              .Icon::before
                content: "error_outline"
                color: #fcc419
            &:not(:last-of-type)
              border-bottom: 1px solid rgba(#fff, .1)
</style>
