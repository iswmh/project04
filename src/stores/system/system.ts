import { getUserList,getDepartmentList, getRoleList, createUser, delUser, changeUser } from '@/service/main/user'
import { getLocal , setLocal } from '@/utils/getLocal'
import { defineStore } from 'pinia'
import type { CreateUser,ChangeUser } from '../../type/user/user'


const systemStore = defineStore('systemStore', {
  state: () => ({
    // 用户列表
    userList: getLocal('userList') ?? [],
    //部门列表
    department:getLocal('department') ?? [],
    //角色列表
    roleList:getLocal('roleList') ?? [],
    //菜单面包屑
    Menu:getLocal('Menu') ?? '',
    subMenu:getLocal('subMenu') ?? '',
  }),

  actions: {
    // 面包屑
    setBreadcrumb(Menu:any,subMenu:any) {
      console.log(Menu,subMenu);
      setLocal('Menu',Menu)
      setLocal('subMenu',subMenu)
    },
    //搜索用户
    async findUserInfo(data?:any) {
      const findDate = await getUserList(data)
      console.log(findDate,'用户');
      this.userList = findDate.data.list
      setLocal('userList',this.userList)
    },
    //获取部门数据
    async getDepList(data?:any) {
      const depData = await getDepartmentList(data)
      console.log(depData,'部门');
      this.department = depData.data.list
      setLocal('department',this.department)
    },
    //获取角色数据
    async getRoleList(data?:any){
      const roleList = await getRoleList(data)
      console.log(roleList,'角色');
      this.roleList = roleList.data.list
      setLocal('roleList',this.roleList)
    },
    //新建用户 
    async createNewUser(data:CreateUser){
      const res = await createUser(data)
      console.log(res,'createNewUser');
      this.findUserInfo({})
    },
    // 删除用户
    async deleteUser(id:number){
      const res = await delUser(id)
      console.log(res,'deleteUser');
      this.findUserInfo({})
    },
    //编辑用户
    async changeUser(data:ChangeUser,id:number) {
      const res = await changeUser(data,id)
      console.log(res,'changeUser');
      this.findUserInfo({})
    }
  }
})

export default systemStore
