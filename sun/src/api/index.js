import axios from 'axios'
axios.defaults.withCredentials = true

let base = 'http://127.0.0.1:3000' //  local Address

let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//  登录
export const login = params => { return axios.post(`${ base }/users/login`, params, config).then(res => res.data) }

export const users = params => { return axios.get(`${base}/users`, { params: params }) }

export const goods = params => { return axios.get(`${base}/goods`, { params: params }) }