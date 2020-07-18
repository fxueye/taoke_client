<template>
	<view>
		<skw-title-bar :isBack="true" :fixed="true" :opacity="opacity">
			<block slot="content">
				<text>{{title}}</text>
			</block>
			<block slot="right">
				<text class="cuIcon-forward white" />
				<text class="cuIcon-more white" />
			</block>
		</skw-title-bar>
		<!-- <view class="status-bar-height"></view> -->
		<view class="goods-images">
			<swiper class="screen-swiper" circular autoplay>
				<swiper-item v-for="(img,index) in imgs" :key="index">
					<image :src="img" mode="aspectFill" />
				</swiper-item>
			</swiper>

		</view>
		<view class="goods-info-box bg-white">
			<view class="margin-left">
				<view class="flex align-end padding-top-sm">
					<text class="text-red text-xs ">券后</text>
					<text class="text-price text-red text-xxl text-left margin-left-sm">1000</text>
				</view>
				<view class="flex align-center text-xs margin-top-sm">
					<text class="text-gray">原价</text>
					<text class="text-price text-gray text-left margin-left-sm">1000</text>
				</view>
			</view>
			<view class="margin-left flex align-center margin-top">
				<text class="bg-gradual-orange text-sm padding-right-xs padding-left-xs radius">天猫</text>
				<text class="margin-left-sm text-xl">你好你好你好</text>
			</view>
			<view class="margin-left flex justify-between align-center margin-top">
				<view>
					<text class="cu-tag bg-blue radius sm">运费险</text>
					<text class="cu-tag bg-blue radius sm">运费险</text>
				</view>
				<view class="margin-right">
					<text class="text-gray">已售</text>
					<text class="text-red">1000</text>
					<text class="text-gray">件</text>
				</view>
			</view>

			<view class="margin-top">
				<view class="goods-poupon bg-gradual-orange flex">
					<view class="basis-lg flex justify-center align-center flex-direction">
						<view><text class="text-xxl margin-right-xs">150</text><text>元优惠券</text></view>
						<view><text class="text-gray ">2020.07.18-2020.07.24</text></view>
					</view>
					<view class="basis-sm flex justify-center align-center text-xxl "><text>立即领券</text></view>
				</view>
			</view>
			<view class="margin-top margin-right margin-left text-sm text-grey padding-bottom">
				<text>拍2件第二件减5元！加入购物车后结算不同款！高弹不紧绷面料，上身无缝无痕，想没穿一样舒服！AA级纯棉抗菌裆，远离各种妇科疾病，蜂巢暖宫颗粒，还能舒缓姨妈痛。</text>
			</view>
		</view>
		<view class="margin-top-sm bg-white padding">
			<view class="flex align-center">
				<view class="cu-avatar xl radius" style="background-image: url(https://img.alicdn.com/imgextra//36/7c/TB1pCX.MpXXXXanXXXXSutbFXXX.jpg);"></view>
				<view class="margin-left">
					<view><text class="text-xl">派睿斯旗舰店</text></view>
					<view class="margin-top-sm"><text class="bg-gradual-orange text-sm padding-right-xs padding-left-xs radius">天猫</text><text class="margin-left">在售有优惠商品</text><text class="text-red">25</text><text>件</text></view>
				</view>
			</view>
			<view class="flex justify-between margin-top">
				<text>宝贝描述：4.8</text>
				<text>卖家服务：4.8</text>
				<text>物流服务：4.8</text>
			</view>
		</view>



		<view class="goods-detail bg-white margin-top-sm">
			<view class="flex justify-center">
				<view class="flex align-center text-gray padding-tb-sm">
					<view><text>----</text></view>
					<view><text>商品详情</text></view>
					<view><text>----</text></view>
				</view>
			</view>
			<block v-for="(item,index) in detailPics">
				<image class="image" :src="item.img" mode="widthFix"></image>
			</block>
		</view>

		<skw-floating-button :visible="showFloatingButton" @click="goTop"></skw-floating-button>

		<!-- bar -->
		<view class="cu-bar bg-white tabbar border shop bottom-fixed">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<!-- <view class="cu-tag badge"></view> -->
				</view> 客服
			</button>
			<view class="action">
				<view class="cuIcon-favorfill text-green">
					<!-- <view class="cu-tag badge">99</view> -->
				</view>
				收藏
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow-blur">口令购买</button>
				<button class="cu-btn bg-red round shadow-blur">领券购买</button>
			</view>
		</view>

	</view>

</template>

<script>
	import skwTitleBar from '@/components/skw-title-bar/skw-title-bar';
	import utils from '@/common/utils.js';
	import {
		getGoodDetails
	} from '@/common/api.js';

	export default {
		name: "good-details",
		components: {
			skwTitleBar
		},
		created() {

		},
		data() {
			return {
				title: "商品详情",
				id: 0,
				goodsId: 0,
				imgs: {},
				detailPics: {},
				scrollY: 0,
				showFloatingButton: false,
				opacity: 0
			}
		},
		onLoad: function(option) {
			console.log(option);
			this.id = option.id;
			this.goodsId = option.goodsId;
			this.getData();
		},
		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			if (this.scrollY > 350) {
				this.showFloatingButton = true;
			} else {
				this.showFloatingButton = false;
			}
			if (this.scrollY < 100) {
				this.opacity = this.scrollY / 100;
			} else {
				this.opacity = 1;
			}
			console.log(e.scrollTop);
		},
		onReachBottom(e) {

			this.scrollBottom = this.scrollY;
		},
		onReady() {

		},
		methods: {
			getData() {
				getGoodDetails({
					id: this.id,
					goods_id: this.goodsId
				}).then((res) => {
					console.log(res);
					if (res['code'] == "20000") {
						this.imgs = res.data.goods_details.imgs.split(',');
						this.detailPics = JSON.parse(res.data.goods_details.detail_pics);
						console.log(this.detailPics);
					}
				}).catch((e) => {
					console.log(e)
				})
			},
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			},
		}


	}
</script>

<style lang="scss" scoped>
	.goods-images {
		width: 100%;

		.screen-swiper {
			min-height: 750rpx;
		}

	}

	.goods-detail {
		display: flex;
		flex-direction: column;
		align-items: center;

		.image {
			width: 100%;
		}
	}

	.bottom-fixed {
		position: fixed;
		z-index: 999999;
		width: 100%;
		bottom: 0;
		left: 0;
	}

	.goods-info-box {
		width: 100%;
		.goods-poupon {
			margin: 20rpx 28rpx 20rpx 28rpx;
			height: 140rpx;
			border-radius: 30upx;
		}
	}
</style>
