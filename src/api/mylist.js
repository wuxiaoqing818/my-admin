/*
 * @Author: 吴晓晴
 * @Date: 2021-05-24 21:49:42
 * @LastEditTime: 2021-06-10 23:58:10
 * @FilePath: \webDevelopment\blogDev\jspang-blog\react-blog\my-admin\src\api\mylist.js
 */
import request from '@/utils/request'



export function getListById(data) {
    return request({
        url: '/default/getListById/' + data.id,
        method: 'get',
    })
}