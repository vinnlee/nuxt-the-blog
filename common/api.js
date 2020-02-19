const responseBody = (res) => res.data

export const requests = {
  get: (axios, url, header) => axios.get(url, header).then(responseBody),
  post: (axios, url, body, header) =>
    axios.post(url, body, header).then(responseBody),
  delete: (axios, url, header) => axios.delete(url, header).then(responseBody),
  put: (axios, url, body, header) =>
    axios.put(url, body, header).then(responseBody)
}
