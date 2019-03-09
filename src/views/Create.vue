<template lang="pug">
#Create
  form.container(style='padding-top:100px')
    h1 Create New Challenge
    .row
      Alert(v-if="submitted" type="success") A new challenge has been created successfully.
      Alert(v-if="error" type="error") {{ error }}
    .row
      textarea(v-model="data" placeholder=`{
  "challenge": {
    "name": "Factorial",
    "description": "Return the factorial of the provided integer.\\nOnly integers greater than or equal to zero will be supplied to the function.",
    "score": 4
  },
  "method": {
    "name": "factorialize",
    "type": "Integer"
  },
  "tests": {
    "inputs": [
      ["5", "10", "4", "0"]
    ],
    "outputs": ["120", "3628800", "24", "1"]
  },
  "params": [
    { "name": "num", "type": "Integer" }
  ]
}`)

    Button.submit(@click="submit") submit
</template>

<script>
import api from '@/api'

export default {
  name: 'Create',
  data () {
    return {
      error: '',
      submitted: false,
      data: ''
    }
  },
  methods: {
    submit (e) {
      this.error = ''
      this.submitted = false
      console.log(this.data)
      api.addChallenge(this.data).then(_ => {
        this.submitted = true
        this.emptyForm()
      }).catch(err => {
        console.log(err.response.data)
        this.error = err.response.data.message[0].message
      })
      e.preventDefault()
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
    font-family: monospace
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
