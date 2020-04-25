<template>
	<view class="app-cate-box" :class="show?'show':''">
		
		<view class="app-bar-view-box">
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<view class="text-center text-black app-small-routine-title">卖二手</view>
			<!-- #endif -->
			
			<!--标题栏-->
			<view class="text-gray app-bar-box">
				<text class="text-black text-lg">9.9包邮</text>
				
				<text class="cuIcon-close text-right close" @tap="closeTap"></text>
			</view>
		</view>
		
		
		<!--占位的-->
		<view class="app-seat-height"></view>
		
		<!--中间内容区域-->
		<view class="app-view-content">
			<type-list :list_data="typeListData" @listTap="typeListTap"></type-list>
		</view>
	</view>
</template>

<script>
	import typeList from '@/components/list/type-list';
	
	import _sell_data from '@/static/data/sell.js';	//虚拟数据
	import utils from '@/common/utils.js';	//工具函数
	
	export default {
		name: 'nine',
		components: { 
			typeList
		},
		data() {
			return {
				typeListData: [],
			}
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			scrollY: {
				type: Number,
				default: 0
			},
			scrollBottom: {
				type: Number,
				default: 0
			}
		},
		watch: {
			scrollY() {

				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if(this.scrollBottom != 0) {
					this.setReachBottom();
				}
			},
		},
		created() {
			//加载虚拟数据
			this.typeListData = _sell_data.typeListData();
		},
		mounted() {
			utils.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			closeTap() {
				this.$emit('closeTap');
			},
			typeListTap(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-cate-box {
		background: #FAFAFA;
		position: relative;
		min-height: 100vh;
		z-index: 99999;
		width: 100%;
		display: none;
		.app-bar-view-box {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 999999;
			background: #FAFAFA;
			
			/* #ifndef MP */
			height: calc(var(--status-bar-height) + 99.99rpx);
			/* #endif */
			
			/* #ifdef MP */
			height: calc(var(--status-bar-height) + 189.99rpx);
			/* #endif */
			
			padding: var(--status-bar-height) 27.27rpx 0 27.27rpx;
			align-items: center;
			.app-bar-box {
				position: relative;
				width: 100%;
				align-items: center;
				line-height: 99.99rpx;
				.close {
					position: absolute;
					right: 27.27rpx;
					font-size: 40rpx;
					bottom: 9.09rpx;
				}
			}
		}
		
		.app-seat-height {
			width: 100%;
			
			/* #ifndef MP */
			height: calc(var(--status-bar-height) + 99.99rpx);
			/* #endif */
			
			/* #ifdef MP */
			height: calc(var(--status-bar-height) + 199.99rpx);
			/* #endif */
		}
		.app-view-content {
			padding: 0 27.27rpx 27.27rpx;
		}
	}
	.app-cate-box.show {
		display: block;
	}
</style>
