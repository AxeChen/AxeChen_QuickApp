var fetch = require('@system.fetch')
var storage = require('@system.storage')

var API_ROOT = 'http://www.wanandroid.com/'

var headers = {}

function getAuth() {
  return new Promise((resolve, reject) => {
    storage.get({
      key: 'auth',
      success: function(data) {
        headers.Cookie = data
        resolve(true)
      },
      fail: function(data, code) {
        resolve(false)
      }
    })
  })
}

function realFetch(url, data = null, method = 'get') {

  return new Promise((resolve, reject) => {
    fetch.fetch({
      url: API_ROOT + url,
      data: data,
      header: headers,
      method: method,
      success: function(data) {
        resolve(data)
      },
      fail: function(data, code) {
        reject(data)
      }
    })
  })
}

function withAuth(url, data = null, method = 'get', canSkip = false) {
  return getAuth().then((auth) => {
    if(auth || canSkip) {
      return realFetch(url, data, method)
    } else {
      return new Promise((resolve, reject) => {
        reject('请先登录！')
      })
    }
  })
}

function post(url, data = null, config = {}) {
  if(config.withAuth) {
    return withAuth(url, data, 'post', config.canSkip)
  } else {
    return realFetch(url, data, 'post')
  }
}

function get(url, data = null, config = {}) {
  if(config.withAuth) {
    return withAuth(url, data, 'get', config.canSkip)
  } else {
    return realFetch(url, data, 'get')
  }
}

export default {
  /**
   * 获取首页文章列表
   */
  getArticle(page) {
    return get('article/list/' + page + '/json', null, {
      withAuth: true,
      canSkip: true
    })
  },
  /**
   * 获取项目分类
   */
  getProjectTree() {
    return get('project/tree/json', null)
  },
  /**
   * 根据项目分类获取列表
   */
  getArticleByTreeId(page, cid) {
    return get('project/list/' + page + '/json?cid=' + cid, null, {
      withAuth: true,
      canSkip: true
    })
  }
}