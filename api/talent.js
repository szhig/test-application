import Request from "../utils/request.js"
let request = new Request().http


/**
 * 获取所有人才区域
 */
export const talentList = (data) => request({
	url: '/prod-api/api/youth-inn/talent-policy-area/list',
	method: 'get',
	data: data
})

/**
 * 获取人才区域详细信息
 */
export const talentInfo = (data) => request({
	url: '/prod-api/api/youth-inn/talent-policy-area/' + data,
	method: 'get'
})

/**
 * 获取驿站列表
 */
export const youthAllList = (data) => request({
	url: "/prod-api/api/youth-inn/youth-inn/list",
	method: 'get',
	data: data
})


/**
 * 获取驿站详情
 */
export const youthInfo = (data) => request({
	url: '/prod-api/api/youth-inn/youth-inn/' + data,
	method: 'get'
})


/**
 * 获取某个区的人才政策列表
 */
export const talentPolicy = (data) => request({
	url: "/prod-api/api/youth-inn/talent-policy/list",
	method:"get",
	data: data
})

/**
 * 获取人才政策的详细信息
 */
export const talentPolicyInfo = (data) => request({
	url: '/prod-api/api/youth-inn/talent-policy/' + data,
	method: 'get'
})