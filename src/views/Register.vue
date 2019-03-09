<template lang="pug">
#Login
  .container
    header
      h1 Register
    form(action="register" method="POST").row
      .column.column-33.column-offset-33
        Alert(v-if="error" :type="this.$route.query.type") {{ error }}
        .row
          .column
            label Name
            input(type="text" name="name" minlength="4" maxlength="25" required)
        .row
          .column
            label Email
            input(type="email" name="email" required)
          .column
            label Phone number
            input(type="text" name="phoneNumber" minlength="9" maxlength="21" required)
        .row
          .column
            label Username
            input(type="text" name="username" minlength="4" maxlength="16" required)
        .row
          .column
            label Password
            input(type="password" name="password" minlength="8" maxlength="32" required)
          .column
            label Verify password
            input(type="password" name="verifyPassword" minlength="8" maxlength="32" required)
        br
        br
        br
        .row
          .column.column-50.column-offset-25
             input(type="submit" value="submit")
</template>

<script>
export default {
  name: 'Login',
  computed: {
    error () {
      return this.$route.query.message
    }
  }
}
</script>

<style lang="sass" scoped>
#Login
  .container
    padding: 32px 36px
  header
    text-align: center
    padding: 48px 0
  input[type="submit"]
    width: 100%
    font-size: 1.6rem
    height: 4.8rem
</style>
