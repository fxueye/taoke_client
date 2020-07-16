<template>
	<view>
		<home v-show="barIndex == 0" :scrollY="scrollY" :scrollBottom="scrollBottom"></home>
		<category v-show="barIndex == 1"></category>
		<message v-show="barIndex == 2"></message>
		<center v-show="barIndex == 3"></center>

		<view class="cu-tabbar-height" />
		<skw-floating-button :visible="showFloatingButton" @click="goTop"></skw-floating-button>
		<skw-bar :index="barIndex" @tabTap="tabTap"></skw-bar>
	</view>
</template>

<script>
	import skwBar from '@/components/skw-bar/skw-bar';
	import skwFloatingButton from '@/components/skw-floating-button/skw-floating-button.vue';
	import home from '@/pages/home/home'
	import category from '@/pages/category/category'
	import center from '@/pages/user/center'
	import message from '@/pages/user/message'
	import utils from '@/common/utils.js';
	// #ifdef APP-PLUS
	import plugin from '@/common/plugin.js';
	// #endif
	


	export default {
		created() {
			this.$bus.$on('tabTap',(index)=>{
				console.log(index);
				this.tabTap(index);
			});
		},
		components: {
			skwBar,
			home,
			category,
			center,
			message,
			skwFloatingButton
		},
		data() {
			return {
				barIndex: 0,
				scrollY: 0,
				scrollBottom: 0,
				showFloatingButton: false
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			plugin.alibcsdk.init(res => {
				console.log(res);
			})
			//#endif
		},
		methods: {
			tabTap(index) {
				this.barIndex = index;
				console.log(this.barIndex);
			},
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			},
		},

		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			if (this.scrollY > 350) {
				this.showFloatingButton = true;
			} else {
				this.showFloatingButton = false;
			}
			//console.log(e.scrollTop);
		},
		onReachBottom(e) {

			this.scrollBottom = this.scrollY;
		},
	}
</script>

<style lang="scss">

</style>
