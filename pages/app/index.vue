<template>
	<view>
		<home :scrollY="scrollY" :scrollBottom="scrollBottom"></home>
		<view class="cu-tabbar-height" />
		<skw-floating-button :visible="showFloatingButton" @click="goTop"></skw-floating-button>
		<skw-bar :index="barIndex" @tabTap="tabTap"></skw-bar>
	</view>
</template>

<script>
	import skwBar from '@/components/skw-bar/skw-bar';
	import skwFloatingButton from '@/components/skw-floating-button/skw-floating-button.vue';
	import home from '@/pages/app/home'
	import utils from '@/common/utils.js';
	export default {
		components: {
			skwBar,
			home,
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

		},
		methods: {
			tabTap(index) {
				this.barIndex = index;
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

<style>
</style>
