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
                  option Integer Array
                  option String Array
                  option Double Array
                  option Boolean Array
                  option Char Array
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
                option Integer Array
                option String Array
                option Double Array
                option Boolean Array
                option Char Array
        Button(@click="addParam") add parameter
    br
    br
    br
    h2 Test cases
    .row(style="margin-top: 64px")
      .column.column-20(v-for="(param, n) in params")
        Button(@click="uploadFile(n)" :class="{red: isUploaded[n + 1]}") {{param.name || '_'}}
        input(type="file" style="display:none" :id="'create-file-upload-' + n")
      .column(style="padding: 0")
      .column.column-20
        Button(@click="uploadFile(-1)" :class="{red: isUploaded[0]}") Output
        input(type="file" style="display:none" id="create-file-upload--1")
    Button.submit(@click="submit") submit
</template>

<script>
import api from '@/api'
import Toastify from 'toastify-js'

const createToast = (text, type) => Toastify({ text, duration: 3000, newWindow: true, close: true, className: type })

export default {
  name: 'Create',
  data () {
    return {
      challenge: {
        name: "",
        description: "",
        score: 0
      },
      method: {
        name: "",
        type: "Integer"
      },
      tests: {
        inputs: [
          []
        ],
        outputs: []
      },
      params: [
        { name: "", type: "Integer" }
      ],
      submitted: false,
      error: '',
      isUploaded: []
    }
  },
  methods: {
    uploadFile (n) {
      const el = document.querySelector("#create-file-upload-" + n)
      el.click()
      this.isUploaded[n + 1] = false
      const that = this
      that.isUploaded = [...that.isUploaded]
      el.addEventListener('change', function () {
        const file = this.files[0]
        const reader = new FileReader()
        reader.onload = e => {
          createToast('File Uploaded!', 'success').showToast()
          that.isUploaded[n + 1] = true
          that.isUploaded = [...that.isUploaded]
          if (n == -1)
            that.tests.outputs = reader.result.split('\n')
          else
            that.tests.inputs[n] = reader.result.split('\n')
          console.log(that)
        }
        reader.readAsText(file)
      }, false)
    },
    addParam () {
      if (this.params.length === 4) {
        return false
      } else if (this.params.length === 0 || this.params[this.params.length - 1].name !== '') {
        this.params.push({ name: '', type: 'Integer' })
      }
    },
    submit (e) {
      this.error = ''
      this.submitted = false
      const data = {
        challenge: this.challenge,
        method: this.method,
        tests: this.tests,
        params: this.params
      }
      console.log(data)
      api.addChallenge(data).then(_ => {
        this.submitted = true
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
      }).catch(err => {
        this.error = err.response.data.message
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
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
  .submit
    width: 192px
    margin: 48px auto
  .red
    background-color: rgba(#D32F2F, .5) !important
    border: 1px solid rgba(#B71C1C, .5) !important
    &:hover
      background-color: rgba(#F44336, .5) !important
      border: 1px solid rgba(#D32F2F, .5) !important
</style>
