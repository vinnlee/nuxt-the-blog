<template>
  <a-form :form="form" class="signup-form" @submit="handleSubmit">
    <h1 class="signup-form-title">Sign up</h1>
    <a-form-item>
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'It\'s is not valid email!'
              },
              {
                required: true,
                message: 'Please enter your email!'
              }
            ]
          }
        ]"
        placeholder="Email"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          {
            rules: [{ required: true, message: 'Please enter your username!' }]
          }
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please enter your password!' }]
          }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="signup-form-button">
        Sign up
      </a-button>
      Or
      <nuxt-link to="/register">
        log in
      </nuxt-link>
      if you already have an account.
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_register' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          const payload = {
            user: values
          }

          return this.$store.dispatch('registration', payload)
        }
      })
    }
  }
}
</script>

<style scoped>
.signup-form {
  max-width: 450px;
  margin: 0 auto;
}

.signup-form-title {
  font-size: 60px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 25px;
  font-family: 'Chivo', sans-serif;
}

.signup-form-button {
  width: 100%;
}
</style>
