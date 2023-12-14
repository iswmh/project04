<template>
  <div class="common-layout">
    <el-container class="box">
      <el-aside :width="isOpen ? '210px' : '60px'">
        <Aside :isOpen="isOpen" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header @isOpenBtn="isOpenBtn"/>
        </el-header>
        <el-main class="mainuse">
            <MainUser />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script setup lang="ts">
import Aside from '../../components/aside/aside.vue';
import Header from '../../components/header/header.vue';
import MainUser from '../../components/mainuser/mainuser.vue'
import { ref } from 'vue'
// import MyRequest from '../../service/request/myindex';
// const myRequest = new MyRequest({
//   baseURL: 'http://codercba.com:5000',
//   timeout: 10000
// })
// async function nh() {
//   const res = await myRequest.post({
//     url: '/login',
//     data: {
//       name: 'coderwhy',
//       password: '123456'
//     }
//   })
//   console.log(res);
// }
// nh()

//aside的展开关闭

let isOpen = ref(true)
const isOpenBtn = (val:boolean)=>{
  isOpen.value = val
}

</script>
  
<style scoped lang="less">

.common-layout {
  background-color: #eaeef1;
}
.box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.el-aside {
  text-align: center;
  background-color: #183252 !important;
  transition: all .3s;
}

.header {
  display: flex;
  justify-content: space-between;
  margin: 10px 20px -10px;
  border-radius: 6px;
  align-items: center;
  background-color: #fff;
}

</style>