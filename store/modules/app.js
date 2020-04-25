import {
	init,
	getCategory
} from "@/common/api"
const app = {
	namespaced: true,
	state: {
		setting: {},
		cate: []
	},
	mutations: {
		set_setting: (state, setting) => {
			state.setting = setting;
		},
		set_cate: (state, cate) => {
			state.cate = cate;
		}
	},
	actions: {
		init({
			commit
		}, options) {

			return new Promise((resolve, reject) => {
				init(options).then(response => {
					const data = response.data.setting
					commit('set_setting', data)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		get_cate({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getCategory().then(response => {
					const data = response.data.cate
					commit('set_cate', data)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		cate: (state, getters, rootState) => {
			let temp = state.cate.slice()
			temp.unshift({
				id: '0',
				name: "精选",
				sub_cate: []
			})
			return temp;
		}
		

	}
}
export default app
