<template>
  <div>
    <div class="profile">
      <div class="profile-avatar">
        <a-avatar :size="84" :src="profile.image" />
      </div>
      <div class="profile-body">
        <h3 class="profile-username">{{ profile.username }}</h3>
        <p class="profile-bio">{{ profile.bio }}</p>
      </div>
    </div>
    <a-divider orientation="left" class="divide-line">
      {{ profile.username }}'s article
    </a-divider>
    <articles-feed :articles="articles"></articles-feed>
  </div>
</template>

<script>
import ArticlesFeed from '@/components/ArticlesFeed'

export default {
  validate({ params }) {
    return /@\w/.test(params.username)
  },
  components: {
    ArticlesFeed
  },
  async asyncData({ params, store }) {
    const { profile } = await store
      .dispatch('fetchUserProfile', params.username.replace('@', ''))
      .then((profile) => profile)
    const { articles } = await store
      .dispatch('fetchAllArticles', params.username.replace('@', ''))
      .then((articles) => articles)
    return { profile, articles }
  }
}
</script>

<style scoped>
.profile {
  text-align: center;
  margin-top: 20px;
}

.profile-avatar {
  margin-bottom: 15px;
}

.profile-username {
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 24px;
  line-height: 1.35;
}

.profile-bio {
  width: 90%;
  margin: 0 auto;
}

.divide-line {
  font-size: 20px;
  margin-top: 30px;
}
</style>
