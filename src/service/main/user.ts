import type { CreateUser,RootObject,ChangeUser } from '../../type/user/user'
import hyRequest from '../index'

// 获取用户列表
export function getUserList(data?: any[]) {
  return hyRequest.post({
    url: '/users/list',
    data: data
  })
}

// 获取菜单
export function getUserAllMeun(id: number = 1) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}

// 创建用户
export function createUser(data:CreateUser) {
  return hyRequest.post({
    url:'/users',
    data
  })
}

// 获取部门数据
export function getDepartmentList(data?:RootObject){
  return hyRequest.post({
    url:'/department/list',
    data
  })
}

// 获取角色数据
export function getRoleList(data?:any){
  return hyRequest.post({
    url:'/role/list',
    data
  })
}

// 删除用户
export function delUser(id:number){
  return hyRequest.delete({
    url:`/users/${id}`,  
  })
}

// 修改用户
export function changeUser(data:ChangeUser,id:number){
  console.log(id);
  
  return hyRequest.patch({
    url:`/users/${id}`,
    data
  })
}