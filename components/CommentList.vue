<template>
  <div v-if="commentsList.length" class="comment-list">
    <h2 class="comment-list-title">
      {{ commentsList.length }}
      {{ commentsList.length > 1 ? 'comments' : 'comment' }}
    </h2>
    <a-list :data-source="commentsList" item-layout="horizontal">
      <a-list-item slot="renderItem" slot-scope="comment">
        <a-comment
          :author="comment.author"
          :avatar="comment.avatar"
          :content="comment.content"
          :datetime="comment.date"
        >
        </a-comment>
      </a-list-item>
    </a-list>
  </div>
  <div v-else class="comment-list">
    <p class="no-comment">Be the first one who comments to this article.</p>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  computed: {
    commentsList() {
      return this.comments.map((comment) => {
        return {
          author: comment.author.username,
          avatar: comment.author.image,
          content: comment.body,
          date: new Date(comment.updatedAt).toLocaleDateString()
        }
      })
    }
  }
}
</script>

<style scoped>
.comment-list-title {
  font-size: 30px;
  margin: 0;
  font-family: Chivo, sans-serif;
}

.no-comment {
  margin-bottom: 0;
  margin-top: 20px;
  text-align: center;
}
</style>
