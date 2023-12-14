<template>
    <div>
        <el-row class="tac">
            <el-col :span="24">
                <h2 class="text">
                    <img src="../../../public/favicon.ico" alt="">
                    <i v-if="isOpen">后台管理系统</i>
                </h2>
                <el-menu mode="vertical" :collapse="!isOpen" :collapse-transition=true default-active="2"
                    background-color="#183252" text-color="#fff">
                    <template v-for="item in userMeun.data" :key="item.id">
                        <el-sub-menu :index="item.id + ''" >
                            <template #title>
                                <el-icon>
                                    <component :is="item.icon.split('-icon-')[1]" />
                                </el-icon>
                                <span>{{ item.name }}</span>
                            </template>
                            <template v-for="iten in item.children" :key="iten.id">
                                <el-menu-item :index="iten.id + ''" @click="menuShow(item,iten)">
                                    {{ iten.name }}
                                </el-menu-item>
                            </template>
                        </el-sub-menu>
                    </template>

                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import userinfoStore from '../../stores/userStore';
import systemStore from '../../stores/system/system'

const store = storeToRefs(userinfoStore())
const sysStore = systemStore()
const router = useRouter()
const userMeun = store.userMeun.value

defineProps({
    isOpen: {
        type: Boolean,
        default: true
    }
})


// 点击submenu展示不同页面
 const menuShow = (item:any,iten:any)=>{
    // console.log(router.options.routes);
    // console.log(item.name);
    // console.log(iten.name);
    
    sysStore.setBreadcrumb(item.name,iten.name)
    // 传不了一点  用组件传值

    console.log(iten.url);
    // 跳转不同小页面
    router.push({
        path:iten.url
    })

 }



</script>

<style scoped>
.el-menu-item {
    background-color: #192A40;
}

.el-menu-item:hover {
    background-color: #125EB8;

}

.text {
    padding: 15px;
    color: #fff;
    white-space: nowrap;
}
</style>