import {
	init,
	getCategory,
	getGoods,
	getBanner
} from "@/common/api"
const app = {
	namespaced: true,
	state: {
		setting: {},
		cate: [],
		goods: {
			page: 1,
			items: []
		},
		banner: []
	},
	mutations: {
		set_setting: (state, setting) => {
			state.setting = setting;
		},
		set_cate: (state, cate) => {
			state.cate = cate;
		},
		add_goods: (state, data) => {
			state.goods.page = data.page;
			if (data.page == 1) {
				state.goods.items = [];
			}
			state.goods.items.push.apply(state.goods.items, data.goods);
		
		},
		set_banner: (state, banner) => {
			state.banner = banner;
		},

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
		},

		get_goods({
			commit
		}, options) {
			return new Promise((resolve, reject) => {
				getGoods(options).then(res => {
					const data = res.data;
					if(res.data.goods.length > 0){
						commit('add_goods', data);
						resolve();
					}else{
						reject();
					}
					
				}).catch(error => {
					reject(error)
				})
			})
		},
		get_banner({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getBanner().then(res => {
					const data = res.data;
					commit('set_banner', data.banner);
					resolve();
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
		},
		goods: (state, getter, rootState) => {
			return state.goods;
		},
		banners: (state, getter, rootState) => {
			return state.banner.filter(b => {
				return b.type == 0;
			});
		},
		banner_one: (state, getter, rootState) => {
			return state.banner.filter(b => {
				return b.type == 1;
			});
		}
	}
}
export default app
