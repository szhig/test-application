export const myUpload = (param) => new Promise((resolve, reject) => {
	uni.uploadFile({
		url: param.url,
		name: 'file',
		filePath: param.filePath,
		header: {
			"Authorization": localStorage.getItem("token")
		},
		success(res) {
			let data = JSON.parse(res.data)
			resolve(data)
		},
		fail:(err) => {
			reject(err)
		}
	})
})