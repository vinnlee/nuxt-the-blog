<template>
  <a-list
    item-layout="vertical"
    size="large"
    :pagination="pagination"
    :data-source="articlesList"
    class="article-list"
  >
    <a-list-item slot="renderItem" key="article.title" slot-scope="article">
      <template slot="actions">
        <span key="createdAt">
          <a-icon type="calendar" style="margin-right: 8px" />
          {{ article.date }}
        </span>
      </template>
      <template slot="actions">
        <span key="favoritesCount">
          <a-icon type="star" theme="filled" style="margin-right: 8px" />
          {{ article.favoritesCount }}
        </span>
      </template>
      <template slot="actions">
        <span key="tagList">
          <a-icon type="tags" theme="filled" style="margin-right: 8px" />
          {{ article.tagList }}
        </span>
      </template>
      <a-list-item-meta :description="article.author.username">
        <nuxt-link slot="title" :to="article.slug">
          {{ article.title }}
        </nuxt-link>
        <a-avatar slot="avatar" size="large" :src="article.author.avatar" />
      </a-list-item-meta>
      {{ article.excerpt }}
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      pagination: {
        // onChange: (page) => {
        //   console.log(page)
        // },
        pageSize: 15
      }
    }
  },
  computed: {
    articlesList() {
      return this.articles.map((article) => {
        return {
          slug: `article/${article.slug}`,
          title: article.title,
          excerpt: article.description,
          tagList: article.tagList.length
            ? article.tagList.join(', ')
            : 'Uncategorized',
          date: new Date(article.updatedAt).toLocaleDateString(),
          favoritesCount: article.favoritesCount,
          author: {
            username: `by ${article.author.username}`,
            avatar: article.author.image
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.article-list .ant-list-item-meta-title {
  margin-bottom: 0;
}
</style>
