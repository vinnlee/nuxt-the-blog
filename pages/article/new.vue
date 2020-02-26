<template>
  <div class="newpost">
    <h2 class="form-title">Add New Post</h2>
    <blog-editor></blog-editor>
  </div>
</template>

<script>
import BlogEditor from '@/components/Editor'

export default {
  components: {
    BlogEditor
  }
}
</script>

<style scoped>
.form-title {
  font-size: 60px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 25px;
  font-family: Chivo, sans-serif;
}
</style>
