import http from '@/common/http'

export function init(params) {
	return http.post('/api/app/init', params)
}

export function checkVersion(params) {
	return http.post('/api/app/check_version', params)
}

export function getCategory() {
	return http.get('/api/category', {})
}

export function getGoods(params) {
	return http.get('/api/goods', params)
}
