/*
 * @Author: 吴晓晴
 * @Date: 2021-05-26 23:01:01
 * @LastEditTime: 2021-06-11 00:03:47
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\api\article.js
 */
import request from '@/utils/request'



//获取类别信息
export function getTypeInfo(data) {
  return request({
    url: '/admin/getTypeInfo',
    method: 'get',
    data
  })
}
//添加文章
export function addArticle(data) {
  return request({
    url: '/admin/addArticle',
    method: 'post',
    data
  })
}
//修改文章
export function updateArticle(data) {
  return request({
    url: '/admin/updateArticle',
    method: 'post',
    data
  })
}

export function getArticleList(data) {
  return request({
    url: '/admin/getArticleList',
    method: 'get',
    data

  })
}

export function deleteArticle(data) {
  return request({
    url: '/admin/delArticle/' + data.id,
    method: 'get',
    data
  })
}

export function getArticleById(data) {
  return request({
    url: '/admin/getArticleById/' + data.id,
    method: 'get',
    data

  })
}