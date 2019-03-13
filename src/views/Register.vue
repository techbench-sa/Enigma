<template lang="pug">
#Login
  .container
    header
      h1 Register
    form(action="register" method="POST").row
      .column.column-33.column-offset-33.column-sm-60.column-sm-offset-20.column-xs-80.column-xs-offset-10
        Alert(v-if="error" :type="this.$route.query.type") {{ error }}
        .row
          .column
            label Full Name
            input(type="text" placeholder="John Smith" name="name" minlength="4" maxlength="25" required)
        .row
          .column
            label Email
            input(type="email" placeholder="john@smith.com" name="email" required)
          .column
            label Phone number
            input(type="text" placeholder="05XXXXXXXX" name="phoneNumber" minlength="9" maxlength="21" required)
        .row
          .column
            label Username
            input(type="text" placeholder="johnSmith" name="username" minlength="4" maxlength="16" required)
          .column.column-33
            label Gender
            select(type="text" placeholder="johnSmith" name="gender" required)
              option(value="male") Male
              option(value="female") Female
        .row
          .column
            label Password
            input(type="password" name="password" required)
          .column
            label Verify password
            input(type="password" name="verifyPassword" minlength="1" maxlength="32" required)
        .row
          .column
            label Token
            input(type="text" placeholder="234A2174B2142FEADE35E3C1337D3ACE" minlength="0" maxlength="1" name="token" required)
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
