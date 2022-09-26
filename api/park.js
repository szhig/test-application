import Request from "../utils/request.js"
let request = new Request().http

/**
 * 查询停车场列表
 */
export const parkList = (data) => request({
	url: '/prod-api/api/park/lot/list',
	method: 'get',
	data: data
})


/**
 * 查询停车场详情
 */
export const parkInfo = (id) => request({
	url: '/prod-api/api/park/lot/' + id,
	method: 'get'
})

/**
 * 查询停车记录
 */
export const parkHistory = (data) => request({
	url: '/prod-api/api/park/lot/record/list',
	method: 'get',
	data: data
})