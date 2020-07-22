<template>
	<view class="skw-load load-modal" v-if="show">
		<view class="skw-load-bg" ></view>
		<view class="cuIcon-emojifill text-orange"></view>
		<view class="gray-text">加载中...</view>
	</view>
</template>

<script>
export default{
	name: "skw-loading",
	props:{
		show:{
			type:Boolean,
			default:false
		}
	}
}
</script>

<style lang="scss" scoped>
	.skw-load.load-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 140upx;
		left: 0;
		margin: auto;
		width: 260upx;
		height: 260upx;
		background-color: #ffffff;
		border-radius: 10upx;
		box-shadow: 0 0 0upx 2000upx rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		font-size: 28upx;
		z-index: 1;
		line-height: 2.4em;
		.skw-load-bg{
			position: fixed;
			top: 0;
			right: 0;
			bottom: 140upx;
			left: 0;
			margin: auto;
			font-size: 28upx;
			background-color: #ffffff;
			border-radius: 50%;
			width: 200upx;
			height: 200upx;
			font-size: 10px;
			border-top: 6upx solid rgba(0, 0, 0, 0.05);
			border-right: 6upx solid rgba(0, 0, 0, 0.05);
			border-bottom: 6upx solid rgba(0, 0, 0, 0.05);
			border-left: 6upx solid #f37b1d;
			animation: cuIcon-spin 1s infinite linear;
			z-index: -1;
		}
	}
	
	.skw-load.load-modal [class*="cuIcon-"] {
		font-size: 60upx;
	}
</style>
