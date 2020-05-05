<template>
	<view>
		<view class="home-top">
			<skw-search></skw-search>
			<skw-nav :index="navIndex" @navSelect="navSelect"></skw-nav>
		</view>
	
	</view>
</template>

<script>
	import skwSearch from '@/components/skw-seach/skw-search'
	import skwNav from '@/components/skw-nav/skw-nav'
	export default {
		name: "home",
		components: {
			skwSearch,
			skwNav
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
	.home-top {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 9999;
		padding-top: var(--status-bar-height);
	}
</style>
