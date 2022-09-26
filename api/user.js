import Request from "../utils/request.js"
let request = new Request().http

export const userInfo = () => request({
	url: '/prod-api/api/common/user/getInfo',
	method: 'get'
})

/**
 * 保存用户信息
 */
export const editUserInfo = (data) => request({
	url: '/prod-api/api/common/user',
	method: 'put',
	data:data
})

export const feedback = (data) => request({
	url: '/prod-api/api/common/feedback',
	method: 'post',
	data: data
})

export const resetPwd = (data) => request({
	url: '/prod-api/api/common/user/resetPwd',
	method: 'put',
	data: data
})

/**
 * 用户退出
 */
export const logout = (data) => request({
	url: '/prod-api/api/logout',
	method: 'post'
})