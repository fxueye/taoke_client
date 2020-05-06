<template>
	<view>
		<view class="home-header">
			<view class="home-nav">
				<skw-search></skw-search>
				<skw-nav :index="navIndex" @navSelect="navSelect"></skw-nav>
			</view>
		</view>
		<view></view>
		<skw-swiper></skw-swiper>
	
	</view>
</template>

<script>
	import skwSearch from '@/components/skw-seach/skw-search'
	import skwNav from '@/components/skw-nav/skw-nav'
	import skwSwiper from '@/components/skw-swiper/skw-swiper'
	export default {
		name: "home",
		components: {
			skwSearch,
			skwNav,
			skwSwiper
		},
		data() {
			return {
				inputBottom: 0,
				navIndex: 0,
			};
		},
		methods: {
			inputFocus(e) {
				this.inputBottom = e.detail.height
			},
			inputBlur(e) {
				this.inputBottom = 0
			},
			navSelect(index) {
				console.log(index);
				this.navIndex = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-header{
		height: 164rpx;
		display: block;
		position: relative;
		.home-nav {
			position: fixed;
			width: 100%;
			top: 0;
			z-index: 9999;
			padding-top: var(--status-bar-height);
		}
	}
	
</style>
