import Request from "../utils/request.js"
let request = new Request().http

export const allServerList = () => request({
	url: '/prod-api/api/service/list',
	method: 'get'
})


/**
 * 获取轮播图
 */
export const swiperList = () => request({
	url: '/prod-api/api/rotation/list',
	method: 'get'
})

/**
 * 登陆
 */
export const login = (data) => request({
	url: '/prod-api/api/login',
	method: 'post',
	data: data
})

export const upload = (data) => request({
	url: '/prod-api/common/upload',
	method: 'post',
	data: data
})

