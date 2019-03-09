<template lang="pug">
#Create
  form.container(style='padding-top:100px')
    h1 Create New Challenge
    .row
      Alert(v-if="submitted" type="success") A new challenge has been created successfully.
      Alert(v-if="error" type="error") {{ error }}
    .row
      .column
        .row
          .column.column-50
              label Challenge Title
              input(type="text" v-model="challenge.name" required)
          .column.column-40
                label Score
                input(type="text" v-model="challenge.score" required)
        .row
          .column
              label Challenge Description
              textarea(v-model="challenge.description")
      .column
        .row
          .column.column-60
              label Method name
              input(type="text" v-model="method.name" required)
          .column.column-40
                label Return Type
                select(v-model="method.type" required)
                  option Integer
                  option String
                  option Double
                  option Boolean
                  option Char
        .row
          h4 Parameters
        .row
          .column.column-60
            label Name
          .column.column-40
            label Type
        .params(name="test" style="padding: 12px")
          .row(v-for="param in params")
            .column.column-60
              input(type="text" v-model="param.name" required)
            .column.column-40
              select(v-model="param.type" required)
                option Integer
                option String
                option Double
                option Boolean
                option Char
        Button(@click="addParam") add parameter
    .row(style="margin-top: 64px")
      .column
        h2 Tests
      .column.column-25
        Button(@click="addTest") add test
    .row.test(v-for="(test, i) in tests[0]" :key="i")
      .column
        label Test {{ i + 1 }}
        .row
          .column.column-20(v-for="(param, j) in params")
            input(type="text" :placeholder="param.name" v-model="tests[j][i]" required)
          .column(style="padding: 0")
          .column.column-20
            input(type="text" placeholder="output" v-model="output[i]" required)
    Button.submit(@click="submit") submit
</template>

<script>
import api from '@/api'

export default {
  name: 'Create',
  data () {
    return {
      challenge: {
        name: '',
        description: '',
        score: 1
      },
      method: {
        name: '',
        type: 'Integer'
      },
      params: [{ name: '', type: 'Integer' }],
      output: [''],
      tests: [['']],
      error: '',
      submitted: false
    }
  },
  methods: {
    addParam () {
      if (this.params.length === 4) {
        return false
      } else if (this.params.length === 0 || this.params[this.params.length - 1].name !== '') {
        this.params.push({ name: '', type: 'Integer' })
        this.tests.push(','.repeat(this.tests[0].length - 1).split(','))
      }
    },
    addTest () {
      this.tests.forEach(test => test.push(''))
      this.output.push('')
      this.challenge.score = this.output.length
    },
    submit (e) {
      this.error = ''
      this.submitted = false
      const data = {
        challenge: this.challenge,
        method: this.method,
        tests: {
          inputs: this.tests,
          outputs: this.output
        },
        params: this.params
      }
      api.addChallenge(data).then(_ => {
        this.submitted = true
        this.emptyForm()
      }).catch(err => {
        this.error = err.response.data.message[0].message
      })
      e.preventDefault()
    },

    emptyForm () {
      this.challenge = {
        name: '',
        description: '',
        score: 1
      }
      this.method = {
        name: '',
        type: 'Integer'
      }
      this.params = [{ name: '', type: 'Integer' }]
      this.output = ['']
      this.tests = [['']]
    }
  }
}
</script>

<style lang="sass">
#Create
  .alert
    background: red
    width: 100%
    height: 4.8rem
    display: flex
    align-items: center
    padding: 0 1.2rem
    margin: 0 .6rem 2.4rem
    background: rgba(#f03e3e, .1)
    border: 1px solid rgba(#ff6b6b, .3)
    border-radius: .4rem
    .Icon
      color: #ff6b6b
      font-size: 2.4rem
      margin-right: 1.2rem
  .container
    max-width: 936px
  h1
    text-align: center
    margin-bottom: 64px
  h4
    margin: 24px 0
    width: 100%
    text-align: center
  input, textarea, select
    cursor: pointer
    font-size: 16px
    font-weight: 400
    padding: 12px 24px
    background-color: rgba(63, 63, 63, 0.4)
    border: 1px solid rgba(255, 255, 255, 0.1)
    border-radius: 4px
  input
    height: 48px
  textarea
    padding: 12px 24px
    height: 420px
    resize: vertical
  select
    height: 48px
    padding: 0 24px
    box-sizing: border-box
  .params
    margin: 0 -1.0rem
    .row
    input, select
      font-size: 18px
      height: 42px
  .test
    margin-bottom: 12px
    &:not(:last-of-type)
      border-bottom: 1px solid rgba(255, 255, 255, .05)
  .submit
    width: 192px
    margin: 48px auto
</style>
