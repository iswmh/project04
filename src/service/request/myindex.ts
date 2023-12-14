import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults
} from 'axios'

class MyRequest {
  // static myRequest: MyRequest = new MyRequest({
  //   timeout: 10000,
  //   baseURL: ''
  // })
  instance: AxiosInstance
  constructor(config: CreateAxiosDefaults<any> | undefined) {
    this.instance = axios.create(config)
    //请求拦截器
    this.instance.interceptors.request.use(
      (req) => {
        return req
      },
      (err) => {
        console.error(err)
      }
    )
    //响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        console.log(err)
      }
    )
  }

  request(config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: 'POST' })
  }
}

export default MyRequest

