/*
 * @Author: 吴晓晴
 * @Date: 2021-06-10 21:50:21
 * @LastEditTime: 2021-06-10 22:55:58
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\store\actions\auth.js
 */
import { setUserToken, resetUser } from "./user";
import { reqLogin, reqLogout } from "@/api/login";
import { setToken, removeToken,setRole,removeRole } from "@/utils/auth";
export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ userName: username.trim(), password: password })
      .then((response) => {
        const { data } = response;
        console.log(data)
        if (data.data === '登录成功') {
          const token = data.token;
          const role = {
            wuxiaoqing: 'admin',
            lishanghua: 'editor',
            guest: 'guest'
          }[username]
          dispatch(setUserToken(token));
          setToken(token);
          setRole(role)
          resolve(data);
        } else {
          const msg = data.data;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout(token)
      .then((response) => {
        const { data } = response;
        if (data.status === 0) {
          dispatch(resetUser());
          removeToken();
          removeRole()
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
