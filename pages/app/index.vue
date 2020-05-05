<template>
	<view>
		<home></home>
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
				barIndex: 0
			}
		},
		onLoad() {

		},
		methods: {
			tabTap(index) {
				this.barIndex = index;
			}
		}
	}
</script>

<style>
</style>
