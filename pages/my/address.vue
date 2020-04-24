<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">我的地址</block>
		</bar-title>
		
		<!--列表-->
		<view class="bg-white app-address-card-view">
			<view class="flex text-black text-lg" @tap="editAddressTap">
				<view class="flex-sub text-left">仔仔</view>
				<view class="flex-sub text-right">138****8000</view>
			</view>
			<view class="margin-tb-sm text-gray" @tap="editAddressTap">
				重庆是 渝北区 网络购买专用虚拟地址
			</view>
			<view class="app-line-view"/>
			<view class="app-right-view">
				<text class="cuIcon-write" @tap="editAddressTap">编辑</text>
				<text class="cuIcon-delete">删除</text>
			</view>
		</view>
		
		<view class="bg-white app-address-card-view">
			<view class="flex text-black text-lg" @tap="editAddressTap">
				<view class="flex-sub text-left">仔仔1</view>
				<view class="flex-sub text-right">138****8000</view>
			</view>
			<view class="margin-tb-sm text-gray" @tap="editAddressTap">
				重庆是 渝北区 网络购买专用虚拟地址1
			</view>
			<view class="app-line-view"/>
			<view class="app-right-view">
				<text class="cuIcon-write" @tap="editAddressTap">编辑</text>
				<text class="cuIcon-delete">删除</text>
			</view>
		</view>
		
		<!--按钮-->
		<view class="bg-white wecanui-footer-fixed foot-pb">
			<view class="flex flex-direction">
				<button class="cu-btn bg-red" @tap="AddAddressTap">添加新地址</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/basics/bar-title';
	import utils from '@/common/utils.js';	//工具函数
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		onReady() {
			utils.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			editAddressTap() {
				uni.navigateTo({
					url: '/pages/my/edit-address'
				});
			},
			AddAddressTap() {
				uni.navigateTo({
					url: '/pages/my/add-address'
				});
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/app/style/app.scss";
	/* #endif */
	.app-address-card-view {
	    position: relative;
	    margin: 36.36rpx 27.27rpx;
		border-radius: 10.9rpx;
		padding: 18.18rpx;
		.app-line-view {
		    position: relative;
		    background: #f9f9f9;
			margin-bottom: 20rpx;
		    height: 2rpx;
		}
		.app-right-view {
			position: relative;
			text-align: right;
			text {
				&:before {
				    margin-right: 5px;
				}
			}
			text + text {
			    margin-left: 20px;	
			}
		}
	}
	.wecanui-footer-fixed .flex-direction {
		padding: 18.18rpx;
	}
</style>
