import hyRequest from '../index'

export function getUserLogin(userinfo: any[string]) {
  return hyRequest.post({
    url: '/login',
    data: userinfo
  })
}
