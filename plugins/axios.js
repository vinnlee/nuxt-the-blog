const API_ROOT = 'https://conduit.productionready.io/api'

export default function({ $axios }) {
  $axios.defaults.baseURL = API_ROOT
}
