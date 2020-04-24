<template>
	<view>
		<!--首页-->
		<home :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==0?true:false" v-if="loadOn.home" />

		<!--发现-->
		<find :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==1?true:false" v-if="loadOn.find" />

		<!--卖二手-->
		<sell :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==2?true:false" v-if="loadOn.sell" @closeTap="sellCloseTap" />

		<!--消息-->
		<news :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==3?true:false" v-if="loadOn.news" />

		<!--我的-->
		<my :scrollY="scrollY" :scrollBottom="scrollBottom" :show="tabID==4?true:false" v-if="loadOn.my" />

		<!--底部导航-->
		<footer-tabbar :tabID='tabID' :msgDot='true' @tabTap='tabTap' />
	</view>
</template>

<script>
	//加载组件
	import home from '@/components/view/home';
	import find from '@/components/view/find';
	import sell from '@/components/view/sell';
	import news from '@/components/view/news';
	import my from '@/components/view/my';

	import utils from '@/common/utils.js';

	//固定组件
	import footerTabbar from '@/components/footer/footer-tabbar';

	export default {
		components: {
			home,
			find,
			sell,
			news,
			my,
			footerTabbar,
		},
		created() {
			this.getData();
		},
		data() {
			return {
				loadOn: {
					home: true,
					find: false,
					sell: false,
					news: false,
					my: false
				},
				scrollY: 0,
				scrollBottom: 0,
				tabID: 0,
				tabIndex: 0,
			}
		},
		onLoad() {

		},
		onReady() {
			utils.setBarColor(true);
		},
		methods: {
			async getData() {
				await this.$store.dispatch('app/get_cate');
			},
			tabTap(index) {
				this.tabIndex = this.tabID;
				if (index == 1 && !this.loadOn.find) {
					this.loadOn.find = true;
				}
				if (index == 2 && !this.loadOn.sell) {
					this.loadOn.sell = true;
				}
				if (index == 3 && !this.loadOn.news) {
					this.loadOn.news = true;
				}
				if (index == 4 && !this.loadOn.my) {
					this.loadOn.my = true;
				}
				this.tabID = index;
				//设置颜色
				if (index == 0) {
					utils.setBarColor(false);
				}
				if (index == 1 || index == 2 || index == 3) {
					utils.setBarColor(true);
				}
				if (index == 4) {
					utils.setBarColor(false);
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			sellCloseTap() {
				this.tabTap(this.tabIndex);
			},
		},
		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			//console.log(e.scrollTop);
		},
		onReachBottom(e) {
			let timestamp = new Date().getTime();
			this.scrollBottom = timestamp;
		},

	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
	@import "../../static/colorui/main.css";
	@import "../../static/colorui/icon.css";
	@import "../../static/app/style/app.scss";
	/* #endif */
</style>
