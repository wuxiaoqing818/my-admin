import request from '@/utils/request'

export function getAdminList(data) {
  return request({
    url: '/adminList',
    method: 'post',
    data
  })
}
