<template>
  <div class="editpost">
    <h2 class="form-title">Edit Post</h2>
    <blog-editor action="editArticle" :data-source="article"></blog-editor>
  </div>
</template>

<script>
import BlogEditor from '@/components/Editor'

export default {
  components: {
    BlogEditor
  },
  async asyncData({ params, store }) {
    const { article } = await store
      .dispatch('fetchSingleArticle', params.slug)
      .then((article) => article)
    return { article }
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
