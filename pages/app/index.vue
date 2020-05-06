<template>
	<view>
		<home :scrollY="scrollY" :scrollBottom="scrollBottom"></home>
		<view class="cu-tabbar-height" />
		<skw-bar :index="barIndex" @tabTap="tabTap"></skw-bar>
	</view>
</template>

<script>
	import skwBar from '@/components/skw-bar/skw-bar';
	import home from '@/pages/app/home'
	import utils from '@/common/utils.js';
	export default {
		components: {
			skwBar,
			home
		},
		data() {
			return {
				barIndex: 0,
				scrollY:0,
				scrollBottom:0,
			}
		},
		onLoad() {

		},
		methods: {
			tabTap(index) {
				this.barIndex = index;
			}
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

<style>
</style>
