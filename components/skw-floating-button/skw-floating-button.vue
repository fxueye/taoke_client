<template>
	<view v-if="visible" @click="onClick" class="bottom-right-box">
		<button class="cu-btn cuIcon-top bg-red"></button>
	</view>
</template>

<script>
	export default {
		name: 'skw-floating-button',
		props: {
			visible: {
				type: Boolean,
				default: false
			}
		},
		watch: {

		},
		created() {},
		computed: {},
		methods: {
			onClick() {
				this.$emit('click');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.bottom-right-box {
		position: fixed;
		z-index: 999999;
		bottom: 181.81rpx;
		right: 27.27rpx;

		.cu-btn {
			margin: auto;
			width: 81.81rpx;
			height: 81.81rpx;
			font-weight: 800;
			border-radius: 50%;
			font-size: 36.36rpx;
			border: 9.09rpx solid #fff;
			box-shadow: 0 0 14.54rpx 7.27rpx #d0d0d0;
		}
	}
</style>
