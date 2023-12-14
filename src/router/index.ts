import { createRouter, createWebHashHistory } from 'vue-router'
import { getLocal } from '@/utils/getLocal'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'main'
    },
    {
      path: '/login',
      name:'login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/main',
      name:'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathmatch(.*)',
      component: () => import('@/views/notFound/notFound.vue')
    }
  ]
})

// 路由导航守卫  没token和菜单不给进
router.beforeEach((to, from, next) => {
  const token = getLocal('token') || ''
  const userMeun = getLocal('userMeun')
  if (token || userMeun || to.name === 'login') {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
