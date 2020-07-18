<template>
	<view class="app-bar-title-box" >
		<view class="cu-bar bg-gradual-red" :class="[fixed?'fixed':'', shadow?'':'no-shadow', bgColor]" :style="{opacity:opacity}">
			<view class="action" @tap="BackPage" v-if="isBack">
				<text class="cuIcon-back" />
				<text>{{backText}}</text>
			</view>
			<view class="action" @tap="leftTap" v-if="!isBack">
				<slot name="left" />
			</view>
			<view class="content" @tap="contentTap">
				<slot name="content" />
			</view>
			<view class="action" @tap="rightTap">
				<!--小程序端不显示-->
				<!-- #ifndef MP -->
				<slot name="right" />
				<!-- #endif -->
			</view>
		</view>
		<view class="action back-box" :style="{opacity:(1-opacity)}" @tap="BackPage" v-if="isBack">
			<text class="cuIcon-back text-white" />
		</view>
		<!--占位的-->
		<view class="app-seat-height" v-if="standing" />
	</view>
</template>

<script>
	export default {
		name: 'skw-title-bar',
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: Boolean,
				default: true
			},
			backText: {
				type: String,
				default: ""
			},
			fixed: {
				type: Boolean,
				default: true
			},
			standing: {
				type: Boolean,
				default: false,
			},
			shadow: {
				type: Boolean,
				default: false
			},
			opacity:{
				type:Number,
				default:1,
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack();
			},
			leftTap() {
				this.$emit('leftTap');
			},
			contentTap() {
				this.$emit('contentTap');
			},
			rightTap() {
				this.$emit('rightTap');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-bar-title-box {
		z-index: 999;
		.cu-bar {
			padding-top: var(--status-bar-height);
			min-height: calc(var(--status-bar-height) + 101rpx);

			.content {
				top: var(--status-bar-height);

				.cu-tag {
					position: relative;
					top: -2.72rpx;
					padding: 0 5.45rpx;
					
					text {
						position: relative;
						top: 2rpx;
					}
				}
			}
		}

		.cu-bar.fixed.no-shadow {
			box-shadow: inherit;
		}

		.cu-bar.bg-white {
			color: #333333;
		}

		.app-seat-height {
			width: 100%;
			height: calc(var(--status-bar-height) + 101rpx);
		}
		.back-box{
			position: fixed;
			z-index: 99999;
			top: 20rpx;
			left: 14rpx;
			font-size: 36rpx;
			width: 60rpx;
			height: 60rpx;
			background: rgba($color: #000000, $alpha: 0.5);
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			
		}
	}
</style>
