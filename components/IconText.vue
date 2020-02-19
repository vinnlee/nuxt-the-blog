<template>
  <span>
    <a-icon :type="type" :style="{ marginRight: '5px' }" :theme="theme" />
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: [String, Number],
      required: true
    },
    theme: {
      type: String,
      default: 'outlined'
    }
  }
}
</script>

<style></style>
