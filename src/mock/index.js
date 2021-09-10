/*
 * @Author: 吴晓晴
 * @Date: 2021-06-06 17:33:26
 * @LastEditTime: 2021-06-10 22:59:43
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\mock\index.js
 */
import Mock from "mockjs";
import loginAPI from "./login";
import adminApi from './admin'

// 登录与用户相关
Mock.mock(/\/logout/, "post", loginAPI.logout);
Mock.mock(/\/userInfo/, "post", loginAPI.userInfo);
Mock.mock(/\/adminList/, "post", adminApi.adminList);


export default Mock;
