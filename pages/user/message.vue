<template>
	<view class="app-message-box">
		<skw-title-bar :isBack="true" :fixed="true">
			<block slot="content">
				<text>消息中心</text>
			</block>
			<block slot="right">
				<text class="cuIcon-settings white"></text>
			</block>
		</skw-title-bar>
		
		
		<!--卡片区域-->
		<view class="app-cart-view-box">
			<view class="text-gray text-center">3月30日 15:30</view>
			<!--内容-->
			<view class="bg-white margin-top radius card-view" @tap="tapCard">
				<!-- <view class="cu-avatar head-img" :style="[{backgroundImage:'url('+ bgImg +')'}]"/> -->
				<view class="app-content-view">
					<view class="text-black text-cut">全网首发iPhone11系列低至4349</view>
					<view class="text-gray text-sm text-cut margin-tb-sm">苹果官方货源机,送1年苹果原厂配件质保!</view>
					<view class="solid-line"/>
					<view class="text-gray text-sm margin-top-sm view-text-box">
						<text class="text-black">查看详情</text>
						<text class="cuIcon-right"/>
					</view>
				</view>
			</view>
		</view>
		
		<view class="app-cart-view-box">
			<view class="text-gray text-center">3月30日 15:35</view>
			<!--内容-->
			<view class="bg-white margin-top radius card-view">
				<view class="app-content-view">
					<view class="text-black text-cut">品质生活的必备神器</view>
					<view class="text-gray text-sm text-cut margin-tb-sm">都2020了,你也该用上了</view>
					<view class="solid-line"/>
					<view class="text-gray text-sm margin-top-sm view-text-box">
						<text class="text-black">查看详情</text>
						<text class="cuIcon-right"/>
					</view>
				</view>
			</view>
		</view>
		
		<view class="app-cart-view-box">
			<view class="text-gray text-center">3月30日 15:40</view>
			<!--内容-->
			<view class="bg-white margin-top radius card-view">
				<view class="app-content-view">
					<view class="text-black text-cut">买得起的K30 Pro和98寸4K电视来了</view>
					<view class="text-gray text-sm text-cut margin-tb-sm">这次你有借口换个大房子啦!</view>
					<view class="solid-line"/>
					<view class="text-gray text-sm margin-top-sm view-text-box">
						<text class="text-black">查看详情</text>
						<text class="cuIcon-right"/>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import skwTitleBar from '@/components/skw-title-bar/skw-title-bar';

	export default {
		name: "message",
		computed: {
		
		},
		components: {
			skwTitleBar
		},
		props: {
			scrollY: {
				type: Number,
				default: 0
			},
			scrollBottom: {
				type: Number,
				default: 0
			},

		},
		watch: {

		},
		created() {
			this.getData();
		},
		data() {
			return {
				login: false,
				toolsList: [],
			};
		},
		onReady() {
			utils.setBarColor(true);
		},
		methods: {
			async getData() {

			},
			//页面被滚动
			setPageScroll(scrollTop) {
				// console.log(scrollTop);

			},
			//触底了
			setReachBottom() {

			},
			settings(e) {

			}


		}
	}
</script>

<style lang="scss" scoped>
	.app-message-box {
		width: 100%;

	}
	.app-cart-view-box {
		padding: 36.36rpx 27.27rpx;
		.card-view {
			position: relative;
			border-radius: 18.18rpx;
			.head-img {
				width: 100%;
				height: 236.36rpx;
				border-radius: 9.09rpx 9.09rpx 0 0;
			}
			.app-content-view {
				padding: 27.27rpx;
				.view-text-box {
					position: relative;
					.cuIcon-right {
						position: absolute;
						top: 5.45rpx;
						right: 0;
					}
				}
			}
		}
	}
</style>
