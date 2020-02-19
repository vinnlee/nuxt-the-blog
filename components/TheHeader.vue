<template>
  <a-layout-header class="header">
    <div class="header-wrapper">
      <header-logo></header-logo>
      <header-menu></header-menu>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu'
import HeaderLogo from '@/components/HeaderLogo'

export default {
  components: {
    HeaderMenu,
    HeaderLogo
  }
}
</script>

<style>
.header .header-wrapper {
  max-width: 1140px;
  margin: 0 auto;
}

.header .header-logo {
  float: left;
  font-size: 35px;
  color: #ffffff;
  font-weight: 700;
}

.header .header-menu {
  float: right;
  line-height: 64px;
}
</style>
