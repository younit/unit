import axios from 'axios'
// axios.defaults.withCredentials = true

// let base = 'http://192.168.1.103:3000' //  local Address
let base = 'http://58.37.57.242:3000' //  out Address

let config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
//  用户登录
export const userslogin = params => { return axios.post(`${ base }/users/login`, params, config).then(res => res.data) }
//  用户列表
export const userslist = params => { return axios.get(`${base}/users`, { params: params }) }
//  城市列表
export const cityslist = params => { return axios.get(`${base}/citys`, { params: params }) }
//  增加景点
export const citysadd = params => { return axios.post(`${ base }/citys/add`, params, config).then(res => res.data) }
//  修改景点
export const citysedit = params => { return axios.post(`${ base }/citys/edit`, params, config).then(res => res.data) }
//  删除景点
export const citysdelete = params => { return axios.post(`${ base }/citys/delete`, params, config).then(res => res.data) }
//  列表
export const articleslist = params => { return axios.get(`${base}/articles`, { params: params }) }
//  添加文章
export const articlesadd = params => { return axios.post(`${ base }/articles/add`, params, config).then(res => res.data) }
//  编辑
export const articlesedit = params => { return axios.post(`${ base }/articles/edit`, params, config).then(res => res.data) }
//  删除
export const articlesdelete = params => { return axios.post(`${ base }/articles/delete`, params, config).then(res => res.data) }

