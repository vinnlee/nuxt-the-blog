<template>
  <a-layout class="layout">
    <the-header />
    <a-layout-content class="main-content">
      <div class="wrapper">
        <nuxt />
      </div>
    </a-layout-content>
    <the-footer />
  </a-layout>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<style>
#__nuxt {
  min-height: 100%;
  position: relative;
}

#__layout {
  height: 100%;
}

.layout {
  background: #ffffff;
}

.main-content {
  padding: 20px;
}

.main-content .wrapper {
  max-width: 1140px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 80px;
}
</style>
