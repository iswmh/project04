<template>
  <div class="changeUser">

    <el-form :model="userinfo" ref="form" label-position="right" label-width="70px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input v-model="userinfo.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="真实姓名">
            <el-input v-model="userinfo.realname" placeholder="请输入真实姓名" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="手机号">
            <el-input v-model="userinfo.phone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="状态">
            <el-select v-model="userinfo.enable" placeholder="选择状态">
              <el-option label="启用" :value="1" />
              <el-option label="禁止" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间">
            <el-date-picker v-model="userinfo.createAt" type="daterange" range-separator="-"
              start-placeholder="Start date" end-placeholder="End date" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <div class="userbtn">
      <el-button @click="resetUser">
        重置
      </el-button>
      <el-button type="primary" @click="checkUser">
        查询
      </el-button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import userinfoStore from "../../../../../stores/userStore";

import systemStore from '../../../../../stores/system/system'

const userStore = userinfoStore()
const sysStore = systemStore()

// 用户输入数据
const userinfo: any = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

// 查询用户
userStore.findUserInfo(userinfo)

//点击查询按钮
const checkUser = async() => {
  const offset = 0
  const size = 10
  const info = {offset,size}
  sysStore.findUserInfo({...info,...userinfo})
}
//点击重置按钮
const resetUser = ()=>{
  const offset = 0
  const size = 10
  const info = {offset,size}
  sysStore.findUserInfo({...info})
}

</script>

<style scoped>
.changeUser {
  text-align: center;
  border-radius: 6px;
  background-color: #fff;
}

.el-input {
  width: 100% !important;
}

.el-form-item {
  width: 80% !important;
  margin: 10px 10px;
}

.el-select {
  width: 100%;
}

.userbtn {
  margin: 10px 74px;
  padding: 10px 0;
  text-align: right;
}

.title {
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
}

.table {
  padding: 5px;
}
</style>