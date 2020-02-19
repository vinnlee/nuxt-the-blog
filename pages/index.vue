<template>
  <articles-feed :articles="articles"></articles-feed>
</template>

<script>
import ArticlesFeed from '@/components/ArticlesFeed'

export default {
  components: {
    ArticlesFeed
  },
  asyncData({ store }) {
    return store.dispatch('fetchAllArticles').then((articles) => articles)
  }
}
</script>
