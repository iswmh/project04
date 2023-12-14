import { getLocal } from '@/utils/getLocal'
// import userinfoStore from '@/stores/userStore'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import type { InternalAxiosRequestConfig } from 'axios'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config:any):InternalAxiosRequestConfig => {
      
      const token = getLocal('token')
      // 给后面的请求自动加上token
      if(token)config.headers.Authorization = `Bearer ${token}`
      return config
    }
  }
})

export default hyRequest
