<template>
  <div class="user">
    <div class="title">
      <h3>用户列表</h3>
      <el-button type="primary" @click="createBtn">新建用户</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table table-layout="auto" :data="currentShowList" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="140" align="center" />
        <el-table-column prop="name" label="用户名" width="130" align="center" />
        <el-table-column prop="realname" label="真实姓名" width="130" align="center" />
        <el-table-column prop="cellphone" label="手机号码" align="center" />
        <el-table-column prop="enable" label="状态" width="70" align="center">
          <template #default="scope">
            <el-button type="primary" v-if="scope.row.enable === 1">启用</el-button>
            <el-button type="danger" v-else>禁止</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" :formatter="format" label="创建时间" align="center" />
        <el-table-column prop="updateAt" :formatter="format" label="更新时间" align="center" />
        <el-table-column prop="address" label="操作" width="133" align="center">
          <template #default="scope">
            <el-button size="small" type="primary" @click="changeUser(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建用户弹出框 -->
    <el-dialog v-model="visible" :show-close="false" width="500px" title="新建用户" center>
      <template #default>
        <div>
          <el-form ref="formRef" :model="newUserDate" label-width="80px" label-position="right" style="max-width: 90%">
            <el-form-item label="姓名">
              <el-input v-model="newUserDate.name" />
            </el-form-item>
            <el-form-item label="真实名字">
              <el-input v-model="newUserDate.realname" />
            </el-form-item>
            <el-form-item label="密码" v-if="isChange">
              <el-input v-model="newUserDate.password" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="newUserDate.cellphone" />
            </el-form-item>
            <el-form-item label="部门ID">
              <el-select v-model="newUserDate.departmentId" class="m-2" placeholder="Select" size="default">
                <el-option v-for="item in depList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="角色ID">
              <el-select v-model="newUserDate.roleId" class="m-2" placeholder="Select" size="default">
                <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item class="formButton">
              <el-button @click="exitBtn">取消</el-button>
              <el-button type="primary" @click="sendBtn">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import userinfoStore from "../../../../../stores/userStore"
import systemStore from '../../../../../stores/system/system'
import * as dayjs from 'dayjs'
import { storeToRefs } from "pinia"
import { watch } from "vue"
import { getLocal } from "../../../../../utils/getLocal"

// store
const userStore = userinfoStore()
const sysStore = systemStore()

// 用户列表
const { userList } = storeToRefs(sysStore)

// 部门/角色 列表
const depList: any = getLocal('department') || []
const roleList: any = getLocal('roleList') || []

// 编辑那 不改密码
let isChange = ref(true)

// 展示的列表
let currentShowList = ref()
currentShowList.value = userStore.userList

//用户的id
let id = ref(0)

// 监听列表发生改变就赋新值
watch(userList, (newval) => {
  currentShowList.value = newval
})
//监听会~
watch(currentShowList.value, (newval) => {
  console.log(newval);
  currentShowList.value = newval
})

//新建用户
let visible = ref(false)
let newUserDate = ref({
  name: '',
  realname: '',
  password: '',
  cellphone: null,
  departmentId: 1,
  roleId: 1
})

// 新建用户按钮
const createBtn = () => {
  visible.value = true
  isChange.value = true
  newUserDate.value = {
    name: '',
    realname: '',
    password: '',
    cellphone: null,
    departmentId: 1,
    roleId: 1
  }
  // 哥们不管啦写的就是屎
}

//取消按钮
const exitBtn = () => {
  visible.value = !visible.value
}

//确定按钮
const sendBtn = () => {
  //创建用户
  if (isChange.value === true) {
    sysStore.createNewUser({ ...newUserDate.value })
    visible.value = !visible.value
  }
  //编辑用户
  else {
    sysStore.changeUser({ ...newUserDate.value }, id.value)
    visible.value = !visible.value
  }
}

// 删除按钮
const delUser = (data: any) => {
  console.log(data.id);
  // 传id删除数据
  sysStore.deleteUser(data.id)
  // 重新渲染数据
  // sysStore.findUserInfo({})
}

// 编辑按钮
const changeUser = (data: any) => {
  console.log(data, 'data');
  console.log(newUserDate.value, 'new');
  for (const key in data) {
    for (const k in newUserDate.value) {
      if (key === k) {
        newUserDate.value[k] = data[k]
      }
    }
  }
  visible.value = !visible.value
  isChange.value = false
  id.value = data.id
}

//格式化时间
const format = (row, column, cellvallue) => {
  if (cellvallue) {
    return dayjs(cellvallue).format('YYYY-MM-DD--HH:mm:ss')
  }
  else return 0
}


</script>

<style scoped>
.user {
  background-color: #fff;
}

.title {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.formButton {
  margin-left: 190px;
}

.el-select {
  width: 100%;
}

.el-pagination {
  margin: 30px 10px 10px;
  display: flex;
  justify-content: flex-end;
}
</style>