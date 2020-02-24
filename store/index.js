import Cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { requests } from '@/common/api'
import { setCookie, clearCookie } from '@/common/auth'

export const state = () => {
  return {
    user: null,
    isAuth: false,
    isUpdated: false
  }
}

export const mutations = {
  setAuth(state, user) {
    state.user = user
    state.isAuth = true
  },
  clearAuth(state) {
    state.user = null
    state.isAuth = false
  },
  updateUser(state, user) {
    state.isUpdated = true
    state.user = user
  }
}

export const actions = {
  fetchAllArticles(context) {
    return requests.get(
      this.$axios,
      '/articles?limit=70',
      context.getters.authHeader
    )
  },
  fetchSingleArticle(context, slug) {
    return requests.get(
      this.$axios,
      `/articles/${slug}`,
      context.getters.authHeader
    )
  },
  fetchSingleArticleComments(context, slug) {
    return requests.get(
      this.$axios,
      `/articles/${slug}/comments`,
      context.getters.authHeader
    )
  },
  authentication(context, user) {
    return requests
      .post(this.$axios, '/users/login', user, context.getters.authHeader)
      .then((data) => {
        this.$router.push('/')
        context.dispatch('setAuthentication', data.user)
      })
  },
  registration(context, user) {
    return requests
      .post(this.$axios, '/users', user, context.getters.authHeader)
      .then((data) => {
        this.$router.push('/')
        context.dispatch('setAuthentication', data.user)
      })
  },
  setAuthentication(context, userData) {
    setCookie(userData.token)
    context.commit('setAuth', userData)
  },
  revokeSession(context) {
    context.commit('clearAuth')
    clearCookie()
    this.$router.push('/login')
  },
  fetchUserInfo(context) {
    return requests.get(this.$axios, '/user', context.getters.authHeader)
  },
  setUserInfo(context, user) {
    return requests
      .put(this.$axios, '/user', user, context.getters.authHeader)
      .then((data) => context.commit('updateUser', data.user))
  },
  setUserArticle(context, article) {
    return requests
      .post(this.$axios, '/articles', article, context.getters.authHeader)
      .then((data) => this.$router.push(`/article/${data.article.slug}`))
  },
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const cookie = Cookie.parse(req.headers.cookie)
      if (cookie.auth) {
        const info = jwt.decode(cookie.auth)
        const user = {
          ...info,
          token: cookie.auth
        }
        commit('setAuth', user)
      }
    }
  }
}

export const getters = {
  authHeader(state) {
    if (state.isAuth) {
      return {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${state.user.token}`
        }
      }
    } else {
      return {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    }
  }
}
