import axios from 'axios';
import qs from 'querystring';
import Storage from './storage';
import * as RootNavigation from '../utils/navigateAuth';
axios.defaults.baseURL = 'https://8696230.iidingyun.com/'
axios.defaults.timeout = 15000
// // axios拦截器

axios.interceptors.request.use(async config => { //拦截器处理
  // config.headers['Authorization'] = "12233334"
  // config.headers['token'] = "rreebjjj"
  const info = await Storage.load({key: 'userInfo', autoSync: false}).catch(err => {
    console.log('没有找到token')
  })
  if (info) {
    if (info.token) {
      config.headers['Authorization'] = info.token
    }
  }
  return config
})

axios.interceptors.response.use(response => { //请求返回数据处理
  if (response.status === '200' || response.status === 200) {
    if (response.data.code === 'jwt_token_expired') { // 登录过期
      Storage.remove({
        key: 'userInfo'
      }); // 清除token
      RootNavigation.navigate('Login')
      throw Error(response.data.msg || '登录过期')
    } else {
      return response.data
    }
  } else {
    // 非200请求抱错
    throw Error(response.opt || '服务异常')
  }
})
export default class http {
  static async get(url, params) {
    /**
    * params{
    * goods：id，
    * name：string
    * } ==> ?goods=id&name=string
    */
    try {
      let query = await qs.stringify(params)
      let res = null;
      if (!params) {
        res = await axios.get(url)
      } else {
        res = await axios.get(url + '?' + query)
      }
      return res
    } catch (error) {
      return error
    }
  }
  static async post(url, params) {
    try {
      let res = await axios.post(url, params)
      return res
    } catch (error) {
      return error
    }
  }
  static async patch(url, params) {
    try {
      let res = await axios.patch(url, params)
      return res
    } catch (error) {
      return error
    }
  }
  static async put(url, params) {
    try {
      let res = await axios.put(url, params)
      return res
    } catch (error) {
      return error
    }
  }
  static async delete(url, params) {
    /**
    * params默认为数组
    */
    try {
      let res = await axios.post(url, params)
      return res
    } catch (error) {
      return error
    }
  }
}