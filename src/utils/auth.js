/*
 * @Author: 吴晓晴
 * @Date: 2021-06-10 21:50:21
 * @LastEditTime: 2021-06-10 22:21:54
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\utils\auth.js
 */
import Cookies from 'js-cookie'
import {base64encode} from './base64Code'

const TokenKey = 'Token'
const RoleKey = 'Role'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setRole(role) {
  return Cookies.set(RoleKey,base64encode(role))
}

export function getRole() {
  return Cookies.get(RoleKey)
}

export function removeRole() {
  return Cookies.remove(RoleKey)
}
