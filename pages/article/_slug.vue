<template>
  <div class="post-entry">
    <a-alert
      v-if="this.$store.state.isAuth && deleted"
      message="This article is now deleted. but you can continue to view it 😋."
      banner
    />
    <h2 class="post-title">{{ title }}</h2>
    <div class="post-meta">
      <icon-text type="user" :text="username" />
      <icon-text type="calendar" :text="date" />
      <icon-text type="star" theme="filled" :text="favoritesCount" />
      <icon-text type="tags" theme="filled" :text="tagList" />
      <template
        v-if="
          this.$store.state.isAuth &&
            username === this.$store.state.user.username &&
            !deleted
        "
      >
        <nuxt-link
          :to="`/article/edit/${$route.params.slug}`"
          class="edit-article"
        >
          <icon-text
            type="edit"
            text="Edit"
            :tooltip="true"
            tooltip-title="Edit this article."
          />
        </nuxt-link>
        <span class="delete-article" @click="deleteArticle">
          <icon-text
            type="delete"
            text="Delete"
            :tooltip="true"
            tooltip-title="Delete this article."
          />
        </span>
      </template>
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="post-content" v-html="markdown(content)"></div>

    <div class="post-comment">
      <template v-if="this.$store.state.isAuth">
        <comment-form v-if="!deleted"></comment-form>
        <comment-list :comments="commentsList"></comment-list>
      </template>
      <template v-else>
        <p class="no-comment">
          Please <nuxt-link to="/login">log in</nuxt-link> or
          <nuxt-link to="/register">register</nuxt-link> to add comments.
        </p>
      </template>
    </div>
  </div>
</template>

<script>
import Showdown from 'showdown'
import IconText from '@/components/IconText'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'

export default {
  components: {
    IconText,
    CommentForm,
    CommentList
  },
  async asyncData({ params, store }) {
    const { article } = await store
      .dispatch('fetchSingleArticle', params.slug)
      .then((article) => article)
    const { comments } = await store
      .dispatch('fetchSingleArticleComments', params.slug)
      .then((comments) => comments)
    return {
      title: article.title,
      content: article.body,
      date: new Date(article.updatedAt).toLocaleDateString(),
      username: article.author.username,
      favoritesCount: article.favoritesCount,
      tagList: article.tagList.length
        ? article.tagList.join(', ')
        : 'Uncategorized',
      commentsList: comments
    }
  },
  data() {
    return {
      deleted: false
    }
  },
  methods: {
    markdown(content) {
      const md = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
        simpleLineBreaks: true
      })
      return md.makeHtml(content)
    },
    deleteArticle() {
      return this.$store
        .dispatch('deleteUserArticle', this.$route.params.slug)
        .then(() => {
          this.$nextTick(function() {
            this.deleted = true
          })
        })
    }
  }
}
</script>

<style scoped>
.post-title {
  text-align: center;
  font-size: 45px;
  margin-top: 20px;
  margin-bottom: 22px;
  font-family: Chivo, sans-serif;
}

.post-meta {
  border-top: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  padding: 5px 0;
}

.post-meta > span {
  margin-right: 20px;
}

.post-content {
  padding: 25px 0 0;
}

.post-content:after {
  content: '';
  display: block;
  height: 1px;
  margin-top: 25px;
  border-bottom: 1px solid #e2e2e2;
  border-top: 2px solid #e2e2e2;
  box-sizing: content-box;
}

.post-comment {
  margin-top: 30px;
}

.no-comment {
  margin-bottom: 0;
  margin-top: 20px;
  text-align: center;
}

.edit-article,
.delete-article {
  color: inherit;
  cursor: pointer;
  margin-right: 20px;
}
</style>
