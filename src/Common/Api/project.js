import api from './index'

export function getProjectTree() {
  return api.getProjectTree()
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}

export function getArticleByTreeId(page = 0, cid) {
  return api.getArticleByTreeId(page, cid)
    .then((response) => {
      return Promise.resolve(JSON.parse(response.data).data)
    }).catch((err) => {
      return Promise.reject(err)
    })
}