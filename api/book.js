import Request from "../utils/request.js"
let request = new Request().http

/**
 * 获取图书管列表
 */
export const bookAllList = (data) => request({
	url: '/prod-api/api/digital-library/library/list',
	method: 'get',
	data: data
})

/**
 * 获取图书馆详情
	url: '/prod-api/api/digital-library/library/'
 */
export const bookInfo = (data) => request({ 
	url: '/prod-api/api/digital-library/library/' + data,
	method:'get'
})


/**
 * 获取评论列表
 */
export const commentList = (data) => request({
	url: '/prod-api/api/digital-library/library-comment/list',
	method: 'get',
	data: data
})

/**
 * 点赞和取消点赞
 */
export const like = (data) => request({
	url: "/prod-api/api/digital-library/library-comment/like",
	method: 'post',
	data: data
})

/**
 * 提交对某个图书馆的评论
 */
export const comment = (data) => request({
	url: "/prod-api/api/digital-library/library-comment",
	method: 'post',
	data: data
})