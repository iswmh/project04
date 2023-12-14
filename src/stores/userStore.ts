import { defineStore } from 'pinia'
import { getUserList,getUserAllMeun } from '../service/main/user'
import { getLocal, setLocal } from '@/utils/getLocal'
import { getUserSubMeun } from '@/utils/getUserSubMeun'

const userinfoStore = defineStore('userinfoStore', {
  state: () => ({
    userinfo: {
      name: getLocal('name') || '',
      id: getLocal('id') as number || 0 ,
      token: getLocal('token') || ''
    },
    // 用户列表
    userList: getLocal('userList') ?? [],
    //用户菜单
    userMeun:getLocal('userMeun') ?? [],
  }),
  getters: {
    // doublecount: (state) => {
    //   return state.count * 2
    // }
  },
  actions: {
    //获取人员列表
    async getUserList(data:any) {
      const userList = await getUserList(data)
      this.userList = userList.data.list
      setLocal('userList',this.userList)
      console.log(this.userList,'人员列表');
    },

    //获取用户权限菜单
    async getUserMeun(id:number) {
      console.log(id);
      const meunList = await getUserAllMeun(id)
      // console.log(meunList);
      this.userMeun = meunList
      setLocal('userMeun',meunList)
      console.log(this.userMeun,'权限菜单');
    },

    // 刷新获取动态路由
    localSubmeun() {
      const token = getLocal('token')
      const userMeun = getLocal('userMeun')
      if(token && userMeun){
        console.log(123);
        getUserSubMeun(userMeun) 
      }
    },

    //搜索用户
    async findUserInfo(data?:any) {
      const findDate = await getUserList(data)
      this.userList = findDate.data.list
      setLocal('userList',this.userList)
      console.log(this.userList );
    }


  }
})

export default userinfoStore
