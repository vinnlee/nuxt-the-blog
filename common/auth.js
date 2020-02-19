import jscookie from 'js-cookie'

export const setCookie = (content) => {
  jscookie.set('auth', content)
}

export const getCookie = () => {
  jscookie.get('auth')
}

export const clearCookie = () => {
  jscookie.remove('auth')
}
