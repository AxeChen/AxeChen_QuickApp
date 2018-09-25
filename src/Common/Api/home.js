import api from './index'

export function getArticle(page = 0) {
  return api.getArticle(page)
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}