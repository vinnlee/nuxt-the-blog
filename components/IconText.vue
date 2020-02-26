<template>
  <a-tooltip v-if="tooltip" placement="top">
    <span slot="title">{{ tooltipTitle }}</span>
    <span>
      <a-icon :type="type" :style="{ marginRight: '5px' }" :theme="theme" />
      {{ text }}
    </span>
  </a-tooltip>
  <span v-else>
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
    },
    tooltip: {
      type: Boolean,
      default: false
    },
    tooltipTitle: {
      type: [String, Number],
      default: 'Title'
    }
  }
}
</script>

<style></style>
