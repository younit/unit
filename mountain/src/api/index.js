import axios from 'axios'
// axios.defaults.withCredentials = true

let base = 'http://127.0.0.1:3000' //  local Address

let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }

//  用户登录
export const userslogin = params => { return axios.post(`${ base }/users/login`, params, config).then(res => res.data) }

//  用户列表
export const userslist = params => { return axios.get(`${base}/users`, { params: params }) }

export const goods = params => { return axios.get(`${base}/goods`, { params: params }) }
