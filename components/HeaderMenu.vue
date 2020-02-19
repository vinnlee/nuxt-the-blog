<template>
  <a-menu
    theme="dark"
    mode="horizontal"
    class="header-menu"
    :default-selected-keys="[selectedKey]"
    :selected-keys="[selectedKey]"
  >
    <a-menu-item key="home">
      <nuxt-link to="/">
        <a-icon type="home" theme="filled" />
        Home
      </nuxt-link>
    </a-menu-item>
    <template v-if="!this.$store.state.isAuth">
      <a-menu-item key="login">
        <nuxt-link to="/login">
          <a-icon type="login" />
          Log In
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="register">
        <nuxt-link to="/register">
          <a-icon type="user-add" />
          Sign Up
        </nuxt-link>
      </a-menu-item>
    </template>
    <template v-else>
      <a-menu-item key="setting">
        <nuxt-link to="/setting">
          <a-icon type="setting" theme="filled" />
          Setting
        </nuxt-link>
      </a-menu-item>
      <a-menu-item key="signout">
        <a-button type="link" class="signout" icon="logout" @click="signOut">
          Sign Out
        </a-button>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
export default {
  computed: {
    selectedKey() {
      let key = ''
      switch (this.$route.path) {
        case '/login':
          key = 'login'
          break
        case '/register':
          key = 'register'
          break
        case '/':
          key = 'home'
          break
        default:
          key = 'article'
          break
      }
      return key
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('revokeSession')
    }
  }
}
</script>

<style>
.signout {
  color: rgba(255, 255, 255, 0.65);
  padding: 0;
}

.signout:hover {
  color: #ffffff;
}

.signout .anticon + span {
  margin-left: 0;
}
</style>
