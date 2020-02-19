<template>
  <a-form :form="form" class="login-form" @submit="handleSubmit">
    <h1 class="login-form-title">Login</h1>
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
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
      Or
      <nuxt-link to="/register">
        register
      </nuxt-link>
      if you don't have an account.
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  middleware: ['notAuthenticated'],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_login' })
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
          return this.$store.dispatch('authentication', payload)
        }
      })
    }
  },
  head() {
    return {
      title: 'Login - The Blog'
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 450px;
  margin: 0 auto;
}

.login-form-title {
  font-size: 60px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 25px;
  font-family: 'Chivo', sans-serif;
}

.login-form-button {
  width: 100%;
}
</style>
