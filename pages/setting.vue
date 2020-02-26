<template>
  <a-form
    :form="form"
    class="setting-form"
    layout="horizontal"
    @submit="handleSubmit"
  >
    <h2 class="form-title">Setting</h2>
    <a-form-item label="Email" v-bind="formItemLayout">
      <a-input
        v-decorator="[
          'email',
          {
            initialValue: user.email,
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
      />
    </a-form-item>
    <a-form-item label="Username" v-bind="formItemLayout">
      <a-input
        v-decorator="[
          'username',
          {
            initialValue: user.username,
            rules: [
              {
                required: true,
                message: 'Please enter your username!'
              }
            ]
          }
        ]"
      />
    </a-form-item>
    <a-form-item label="New password" v-bind="formItemLayout">
      <a-input v-decorator="['password']" type="password" />
    </a-form-item>
    <a-form-item label="Avatar" v-bind="formItemLayout">
      <a-input
        v-decorator="[
          'image',
          {
            initialValue: user.image !== null ? user.image : ''
          }
        ]"
        placeholder="Place your avatar URL here."
      />
    </a-form-item>
    <a-form-item label="Biography" v-bind="formItemLayout">
      <a-textarea
        v-decorator="[
          'bio',
          {
            initialValue: user.bio !== null ? user.bio : ''
          }
        ]"
        placeholder="Write a short paragraph to describe yourself."
        :rows="6"
      />
    </a-form-item>
    <a-form-item v-bind="buttonLayout">
      <a-button type="primary" html-type="submit">
        Save
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  asyncData({ store }) {
    return store.dispatch('fetchUserInfo').then((user) => user)
  },
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 12 }, // Extra small devices (<768px)
          sm: { span: 4 } // Small devices (≥768px)
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 20 }
        }
      },
      buttonLayout: {
        wrapperCol: {
          xs: { offset: 0 },
          sm: { offset: 4 }
        }
      }
    }
  },
  middleware: ['authenticated'],
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'form_setting' })
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const payload = {
            user: values
          }
          return this.$store
            .dispatch('setUserInfo', payload)
            .then(() => this.openNotification())
        }
      })
    },
    openNotification() {
      if (this.$store.state.isUpdated) {
        this.$notification.open({
          message: 'Setting',
          description: 'Your setting is updated succesfully!',
          icon: (
            <a-icon type="info-circle" theme="twoTone" style="color: #108ee9" />
          )
        })
      }
    }
  }
}
</script>

<style scoped>
.setting-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-title {
  font-size: 60px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 25px;
  font-family: Chivo, sans-serif;
}
</style>
