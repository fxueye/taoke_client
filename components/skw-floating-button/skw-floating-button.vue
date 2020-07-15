<template>
	<view v-if="visible" @click="onClick" class="bottom-right-box">
		<view class="fab-btn bg-red">
			<view>
				<text class="cuIcon-top"></text>
			</view>	
		</view>
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
		z-index: 9999;
		bottom: 181rpx;
		right: 27rpx;
		opacity: .7;
		.fab-btn {
			width: 82rpx;
			height: 82rpx;
			border-radius: 50%;
			font-size: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
