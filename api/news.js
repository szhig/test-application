import Request from "../utils/request.js"
let request = new Request().http

export const newsType = () => request({
	url: "/prod-api/press/category/list",
	method: 'get'
})

export const newsList = (data) => request({
	url: "/prod-api/press/press/list",
	method: 'get',
	data: data
})