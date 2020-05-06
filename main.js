import Vue from 'vue'
import App from './App'
import store from './store'
import config from './common/config.js'
import {
	getOpenId,
	setOpenId,
	getToken,
	setToken,
	setNetwork
} from './common/auth.js'
import {
	checkVersion,
	init
} from './common/api'
Vue.prototype.$store = store
Vue.prototype.$config = config

Vue.prototype.init = function() {

	const _this = this;
	return new Promise((resolve, reject) => {
		try {
			let systemInfo = uni.getSystemInfoSync();


			let openId = getOpenId();

			let params = {};
			params['open_id'] = openId;
			if (systemInfo) {
				params['brand'] = systemInfo.brand ? systemInfo.brand : '';
				params['model'] = systemInfo.model ? systemInfo.model : '';
				params['system'] = systemInfo.system ? systemInfo.system : '';
				params['platform'] = systemInfo.platform ? systemInfo.platform : '';
			}

			// #ifdef APP-PLUS
			params['imei'] = plus.device.imei ? plus.device.imei : '';
			params['uuid'] = plus.device.uuid ? plus.device.uuid : '';
			params['imsi'] = plus.device.imsi ? plus.device.imsi : '';
			params['vendor'] = plus.device.vendor ? plus.device.vendor : '';
			// params['channel'] = plus.runtime.channel;
			// #endif
			params['channel'] = config.channel;

			store.dispatch('app/init', params).then(response => {
				setOpenId(response.data.open_id);
			}).catch(error => {
				reject(error)
			})
		} catch (e) {
			//TODO handle the exception
		}
	});
}
//清理缓存不清理openid token
Vue.prototype.clearStorageSync = function() {
	let openId = getOpenId();
	let token = getToken();
	uni.clearStorageSync();
	setOpenId(openId);
	setToken(token);
}

Vue.prototype.checkVersion = function() {
	return new Promise((resolve, reject) => {
		try {
			let channel = config.channel;
			let versionCode = config.versionCode;
			// #ifdef APP-PLUS
			channel = plus.runtime.channel;
			checkVersion({
				channel: channel,
				vcode: versionCode
			}).then(response => {
				if (response.data.app) {
					let app = response.data.app;
					if (app.flag == 1) {
						uni.showModal({
							title: '更新提示',
							content: app.msg,
							success: (res) => {
								if (res.confirm) {
									plus.runtime.openURL(app.down_url);
								}
							}
						})
					}
					resolve()
				} else {
					reject()
				}
			}).catch(error => {
				reject(error)
			})
			// #endif

			// reject()

		} catch (e) {
			reject(e)
		}
	});
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
