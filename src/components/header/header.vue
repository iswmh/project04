<template>
    <div class="left">
        <div class="icon" @click="isOpenBtn">
            <el-icon size="28px" v-if="isOpen">
                <Fold />
            </el-icon>
            <el-icon size="28px" v-else>
                <Expand />
            </el-icon>
        </div>
        <div class="Bread">
            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item>{{Menu}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{subMenu}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
    <div class="right">
        <div class="icon">
            <el-icon size="20px">
                <Message />
            </el-icon>
            <el-icon size="20px">
                <ChatDotRound />
            </el-icon>
            <el-icon size="20px">
                <Search />
            </el-icon>
        </div>
        <div class="avatar">
            <el-dropdown>
                <span class="el-dropdown-link">
                    头像-{{ username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item :icon="Plus" @click="exitBtn">退出系统</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import {
    ArrowDown,
    Plus,
} from '@element-plus/icons-vue'
import { delLocal } from '../../utils/delLocal'
import { getLocal } from '../../utils/getLocal'
import { ref, defineEmits } from 'vue'
import router from '../../router';
import { watch } from 'vue'
import systemStore from '../../stores/system/system'
import { storeToRefs } from 'pinia'

let isOpen = ref(true)
let theMenu = ref()
let thesubMenu = ref()

const sysStore = systemStore()

const {Menu,subMenu} = storeToRefs(sysStore)


theMenu.value = Menu.value
thesubMenu.value = subMenu.value

const username = getLocal('name');
const emits = defineEmits(['isOpenBtn'])
const isOpenBtn = () => {
    isOpen.value = !isOpen.value
    emits('isOpenBtn', isOpen.value)
}

//退出按钮
const exitBtn = () => {
    delLocal()
    router.push('/login')
}


watch(Menu,(newval)=>{
    theMenu.value = newval
})
watch(subMenu,(newval)=>{
    thesubMenu.value = newval
})

</script>

<style scoped>
.left {
    display: flex;
    align-items: center;
}

.icon>.el-icon {
    margin: 5px 8px;
}

.right {
    display: flex;
    align-items: center;
}
</style>