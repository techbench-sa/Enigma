<template lang="pug">
#Solve(:class="{solved}")
  .container
    .wrapper(:style="!((results.length || error) && !isConsoleHidden) ? 'grid-template-rows: 100% 0' : ''")
      Editor(:value="value" v-on:update:value="value = $event")
      Icon.hide(v-if="results.length || error" :class="{isConsoleHidden}" @click="toggleConsole") {{ isConsoleHidden ? 'expand_less' : 'expand_more' }}
      .console(v-if="(results.length || error) && !isConsoleHidden")
        .result.wrong(v-if="error")
          .content {{ error }}
            Icon
        .result(v-for="result in results" :class="result.type")
          .content(v-html="result.message")
          Icon
      .panel
          .title {{ challenge.name }}
          .body(v-html="challenge.description.replace(/\\n/g, '<br />')")
          Button(@click="submit" :disabled="checking || solved") {{ solved ? 'solved' : checking ? 'checking...' : 'submit' }}
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
      isConsoleHidden: false,
      checking: false,
      solved: false
    }
  },
  watch: {
    challenge ({ name, signatures }) {
      switch (this.$route.params.lang) {
        case 'java':
          this.value = `class ${name.replace(/ /g, '')} {\n\n` +
            `\t${signatures.java} {\n\n` +
            '\t\t/* write your code here */\n\n' +
            '\t}\n\n' +
            '}'
          break
        case 'python':
          this.value = `# ${name.replace(/ /g, '')}.py\n\n` +
            `${signatures.python}:\n\n` +
            '\t# write your code here #\n\n' +
            '#### please write above this line ####\n\n'
          break
      }
    },
    results (results) {
      const errors = results.filter(res => res.type === 'warning' || res.type === 'wrong').length
      const correct = results.filter(res => res.type === 'correct').length
      this.solved = !errors && !!correct
      if (this.solved) {
        setTimeout(() => { this.$router.history.push(`/`) }, 1000)
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
    toggleConsole () {
      this.isConsoleHidden = !this.isConsoleHidden
    },
    submit () {
      this.error = ''
      this.results = []
      this.checking = true
      this.isConsoleHidden = false
      const { id, lang } = this.$route.params
      const submission = this.value.split('\n').slice(3, -3).join('\n')
      api.submit(id, lang, submission).then(res => {
        this.checking = false
        const { error, results, code } = res.data
        if (code === 0) {
          this.results = results.map(({ type, payload }) => {
            switch (type) {
              case 'test':
                const { method_name: method, method_type: outputType } = this.challenge
                const parameters = JSON.parse(this.challenge.parameters)
                const { inputs, outputs } = this.tests
                const { test, result, value } = payload
                const t = i => parameters[i].type
                const args = inputs.map((v, i) => {
                  if (t(i).indexOf('Array') != -1)
                    return `<span class="${t(i)}">${v[test]}</span>`
                  const isString = t(i).indexOf('String') != -1
                  const isChar = t(i).indexOf('char') != -1
                  const hasQoutes = v[test].length >= 2 && (v[test][0] == '"' || v[test][0] == "'")
                  if (isString && !hasQoutes)
                    return `<span class="${t(i)}">"${v[test]}"</span>`
                  if (isChar && !hasQoutes)
                    return `<span class="${t(i)}">'${v[test]}'</span>`
                  return `<span class="${t(i)}">${v[test]}</span>`
                })
                const out = val => {
                  if (outputType.indexOf('Array') != -1)
                    return `<span class="${outputType}">${val}</span>`
                  const isString = outputType.indexOf('String') != -1
                  const isChar = outputType.indexOf('Char') != -1
                  const hasQoutes = val.length >= 2 && (val[0] == '"' || val[0] == "'")
                      if (isString && !hasQoutes)
                        return `<span class="${outputType}">"${val}"</span>`
                      if (isChar && !hasQoutes)
                        return `<span class="${outputType}">'${val}'</span>`
                      return `<span class="${outputType}">${val}</span>`
                }
                if (value) {
                  return {
                    message: `${method}(${args.join(', ')}) <i>returns</i> ${out(result)}`,
                    type: 'correct'
                  }
                } else {
                  return {
                    message: `${method}(${args.join(', ')}) <i>should return</i> ${out(outputs[test])} <i>but it returns</i> ${out(result)}`,
                    type: 'wrong'
                  }
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
    > .wrapper
      background: #272822
      height: 100%
      border-radius: 6px
      border: 1px solid #484848
      background: #282828
      overflow: hidden
      background-image: linear-gradient(#282828, #242424)
      display: grid
      grid-template-columns: calc(100% - 480px) 480px
      grid-template-rows: calc(100% - 320px) 320px
      position: relative
      .hide
        position: absolute
        left: .6rem
        bottom: 29.4rem
        z-index: 100000
        font-size: 1.8rem
        color: rgba(255, 255, 255, .7)
        cursor: pointer
        &.isConsoleHidden
          bottom: 0.6rem
    .console
      height: 320px
      padding: 2px 0 0 31px
      background-color:
      //border-left: 29px solid #363636
      box-shadow: inset 0 1px 0 #484848, inset 29px 0 0 #363636, inset 30px 0 0 #484848
      display: block
      overflow-y: auto
      $scroll-shadow: #1a1a1a
      background: linear-gradient(to bottom, #212121 30%, rgba(#212121, 0)), linear-gradient(to bottom, rgba(#212121,0), #212121 70%) 0 100%, linear-gradient(to bottom, rgba($scroll-shadow, 1) 30%, rgba($scroll-shadow, 0)), linear-gradient(to bottom, rgba($scroll-shadow, 0), rgba($scroll-shadow, 1) 70%) 0 100%
      background-color: #212121
      background-repeat: no-repeat
      background-size: 100% 64px, 100% 64px, 100% 32px, 100% 32px
      background-position: 0 0, 0  100%, 0 0, 0 100%
      background-attachment: local, local, scroll, scroll
      position: relative
      .result
        font-size: 14px
        line-height: 24px
        padding: 12px 12px
        position: relative
        font-family: monospace
        padding-right: 4.8rem
        .String
          color: #e6db74
        i
          color: rgba(#fff, .7)
        span
          color: #ae81ff
        .Array
          color: #ae81ff
        .Icon
          content: ""

          display: inline-block
          position: absolute
          right: 1.5rem
          top: 1.5rem
          font-size: 1.8rem
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
    .panel
      width: 100%
      grid-column: 2
      grid-row: 1 / span 2
      background: #363636
      border-left: 1px solid #484848
      padding: 12px 12px 24px
      box-sizing: border-box
      display: flex
      flex-direction: column
      user-select: none
      display: grid
      grid-template-columns: 100%
      grid-template-rows: min-content auto min-content
      .title
        border-bottom: 1px solid rgba(#fff, .1)
        padding: 12px 0
        text-align: center
        font-size: 24px
      .body
        padding: 24px
        color: rgba(#fff, .87)
        font-weight: 300
  &.solved
    .container
      > .wrapper
        transition: background .1s ease-in-out, border .1s ease-in-out
        background: rgba(55, 178, 77, 0.2)
        border: 1px solid rgba(81, 207, 102, 0.1)
    .panel
      transition: background .1s ease-in-out, border .1s ease-in-out
      border-left: 1px solid rgba(81, 207, 102, 0.1)
      background: rgba(81, 207, 102, 0.1)
    .Editor
      transition: box-shadow .1s ease-in-out
      box-shadow: inset 29px 0 0 rgb(45, 69, 44), inset 30px 0 0 rgb(51, 81, 51)
      .CodeMirror
        &-scroll
        &-linenumbers
          transition: background .1s ease-in-out, border .1s ease-in-out
          background: rgb(45, 69, 44)
          border-right: 1px solid rgb(51, 81, 51)
    .console
      transition: background-color .1s ease-in-out, box-shadow .1s ease-in-out
      box-shadow: inset 0 1px 0 rgb(51, 81, 51), inset 29px 0 0 rgb(45, 69, 44), inset 30px 0 0 rgb(51, 81, 51)
      background: rgb(32, 43, 31)
</style>
