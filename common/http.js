import Request from '@/common/request'
import Config from '@/common/config'
import {
	getToken,
	removeToken,
	getNetwork
} from '@/common/auth'
const http = new Request()

http.setConfig((config) => {
	if (process.env.NODE_ENV === 'development') {
		config.baseUrl = Config.stage
	}
	if (process.env.NODE_ENV === 'production') {
		config.baseUrl = Config.server
	}
	// config.baseUrl = Config.server
	config.responseType = "text"
	return config
})

// 拦截器
http.interceptor.request((config, cancel) => {
	// config.header['X-Token'] = getToken();
	return config;
})
http.interceptor.response((response) => {
	// console.log(response)
	if (response.statusCode) {
		if (response.statusCode == 200) {
			const res = response.data;
			// console.log(res)
			if (res.code !== '20000') {
				if (res.code === '50008') {
					removeToken();
					return;
				}
				//TODO
				uni.showModal({
					title: '提示',
					content: res.msg,
					showCancel: false
				})
				return Promise.reject(res);
			} else {
				return response.data;
			}
		} else {
			// return Promise.reject(response)
			uni.showToast({
				title: '服务器异常！',
				duration: 1000
			});
			return Promise.reject('server error!')
		}
	} else {
		uni.showToast({
			title: '网络异常！',
			duration: 1000
		});
		return Promise.reject('network error!')
	}


})

export default http
