/*
 * @Author: 吴晓晴
 * @Date: 2021-06-10 21:50:21
 * @LastEditTime: 2021-06-10 23:43:04
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\api\login.js
 */
import request from '@/utils/request'

export function reqLogin(data) {
  return request({
    url: '/admin/checkLogin',
    method: 'post',
    data
  })
}

export function reqLogout(data) {
  return request({
    url: '/logout',
    method: 'post',
    data
  })
}