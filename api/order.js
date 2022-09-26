import Request from "../utils/request.js"
let request = new Request().http

export const orderAll = (data) => request({
	url: '/prod-api/api/takeout/order/list',
	method: 'get',
	data: data
})