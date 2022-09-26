import 	operate from "./operate.js"
import { forEach } from "./forEach.js"

export default class Request {
	http(param) {
		var url = param.url,
			method = param.method,
			header = param.header || {},
			data = param.data || {}

		var requestUrl = operate.api + url

		header['Authorization'] = uni.getStorageSync("token") || ""

		if (method) {
			method = method.toUpperCase()
			if (method == "POST") {
				header['content-type'] = "application/json"
			} else if (method == "GET") {
				
				let getData = ""
				forEach(data, (value, key) => {
					getData = key + "=" + value + "&&"
				})
				
				requestUrl = requestUrl + "?" + getData
				header['content-type'] = "applicatin/json"
			}
		}

		// 封装promise
		return new Promise((resolve, reject) => {
			uni.request({
				url: requestUrl,
				method: method,
				header: header,
				data: data,
				success: (res) => {
					
					console.log(res);
					
					if (res.data.code == 401) {
						uni.navigateTo({
							url: "/pages/login/login"
						})
						return
					}
					
					if (res.statusCode && res.statusCode != 200) {
						uni.showToast({
							title: "api错误" + res.data.msg,
							icon: 'none'
						})
					}
					// code判断:200成功,不等于200错误
					if (res.data.code) {
						if (res.data.code != '200') {
							uni.showToast({
								title: "" + res.data.msg,
								icon: 'none'
							});
							return;
						}
					} else {
						uni.showToast({
							title: "code!=200" + res.data.msg,
							icon: 'none'
						});
						return;
					}
					
					resolve(res.data)
				},

				fail: (e) => {
					uni.showToast({
						title: "" + e.data.msg,
						icon: 'none'
					});
					resolve(e.data);
				}
			})
		})
	}
}
