<template>
    <div class="login">
        <div class="text">
            <h2>后台管理系统</h2>
        </div>
        <div class="tabs">
            <el-tabs type="border-card" :stretch=true>
                <el-tab-pane label="账号登录">
                    <el-form :model="userinfo">
                        <el-form-item label="账号">
                            <el-input v-model="userinfo.name" placeholder="请输入账号" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="userinfo.password" placeholder="请输入密码" type="password" show-password />
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机登录">做个damn</el-tab-pane>
            </el-tabs>
        </div>
        <div class="remPwd">
            <el-checkbox v-model="rempwd" label="记住密码" size="large" />
            <span>忘记密码</span>
        </div>
        <div class="loginBtn">
            <el-button type="primary" style="width: 100%;height: 32px;" @click="loginBtn">立即登录</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../../router';
import userinfoStore from '../../stores/userStore'
import { getUserLogin } from '../../service/login/login'
import { setLocal, getLocal } from '../../utils/getLocal'
import { getUserSubMeun } from '../../utils/getUserSubMeun'
import systemStore from '../../stores/system/system';

const userStore = userinfoStore()
const sysStore = systemStore()

let rempwd = ref(true);
let userinfo = ref({
    name: '',
    password: ''
})



//点击登录
async function loginBtn() {
    const res = await getUserLogin(userinfo.value)
    userStore.userinfo.token = res.data.token
    setLocal('id', res.data.id)
    setLocal('token', res.data.token)
    const token = getLocal('token')
    const id:number = getLocal('id')
    if (token && id) {
        //用户列表
        userStore.getUserList({ offset: 0, size: 100 })
        //获取用户权限菜单
        await userStore.getUserMeun(id)

        const userMeun = userStore.userMeun
        // console.log(userMeun);
        // 获取部门数据/角色数据
        const offset = 0
        const size = 10
        const info = { offset, size }
        sysStore.getDepList({ ...info })
        sysStore.getRoleList({...info})
        if (userMeun) {
            router.push('/main')
            //动态添加子路由
            getUserSubMeun(userMeun.data)
        }
        else {
            console.log(123);
        }
    }
}
</script>

<style scoped lang="less">
.login {
    width: 280px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
}

.text {
    margin: 10px 0;
}

.remPwd {
    display: flex;
    align-items: center;
    font-size: 14px;
    justify-content: space-between;
    color: #409eff;
}
</style>