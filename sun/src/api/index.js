import axios from 'axios'
// axios.defaults.withCredentials = true

// let base = 'http://192.168.1.103:3000' //  local Address
let base = 'http://58.37.57.242:3000' //  out Address
let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//  登录
export const userslogin = params => { return axios.post(`${ base }/users/login`, params, config).then(res => res.data) }

export const users = params => { return axios.get(`${base}/users`, { params: params }) }
//  注册用户
export const usersadd = params => { return axios.post(`${ base }/users/add`, params, config).then(res => res.data) }
