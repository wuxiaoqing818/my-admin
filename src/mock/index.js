/*
 * @Author: 吴晓晴
 * @Date: 2021-06-06 17:33:26
 * @LastEditTime: 2021-06-10 22:59:43
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\mock\index.js
 */
import Mock from "mockjs";
import loginAPI from "./login";

// 登录与用户相关
Mock.mock(/\/logout/, "post", loginAPI.logout);
Mock.mock(/\/userInfo/, "post", loginAPI.userInfo);


export default Mock;
