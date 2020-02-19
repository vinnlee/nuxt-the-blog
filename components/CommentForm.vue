<template>
  <div class="comment-form">
    <h2 class="comment-form-title">Say something nice</h2>
    <a-comment>
      <a-avatar slot="avatar" icon="user" size="large" />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" placeholder="Type your thought."></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" type="primary">Comment</a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.comment-form-title {
  font-family: Chivo, sans-serif;
  margin-bottom: 0;
}
</style>
