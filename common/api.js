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
	return http.post('/api/goods', params)
}

export function getBanner() {
	return http.get('/api/banner')
}

export function getGoodDetails(params) {
	return http.post('/api/goods/details', params)
}

export function search(params) {
	return http.post('/api/search', params);
}

export function words() {
	return http.get('/api/search/words');
}

export function ranking(params) {
	return http.post('/api/goods/ranking', params);
}

export function goodsList(params) {
	return http.post('/api/goods/list', params);
}
