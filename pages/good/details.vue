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
					<text class="text-price text-red text-xxl text-left margin-left-sm">{{goodsDetails.actual_price}}</text>
				</view>
				<view class="flex align-center text-xs margin-top-sm">
					<text class="text-gray">原价</text>
					<text class="text-price text-gray text-left margin-left-sm text-through">{{goodsDetails.orginal_price}}</text>
				</view>
			</view>
			<view class="margin-left flex align-center margin-top">
				<text v-if="goodsDetails.shop_type == 1" class="bg-gradual-orange text-sm padding-right-xs padding-left-xs radius">天猫</text>
				<text v-if="goodsDetails.shop_type == 0" class="bg-gradual-blue text-sm padding-right-xs padding-left-xs radius">淘宝</text>
				<text class="margin-left-sm text-xl">{{goodsDetails.dtitle}}</text>
			</view>
			<view class="margin-left flex justify-between align-center margin-top">
				<view>
					<text v-if="goodsDetails.yunfeixian == 1" class="cu-tag bg-blue radius sm">运费险</text>
				</view>
				<view class="margin-right">
					<text class="text-gray">已售</text>
					<text class="text-red">{{goodsDetails.month_sales | parseNum}}</text>
					<text class="text-gray">件</text>
				</view>
			</view>

			<view class="margin-top" @tap="couponTap">
				<view class="goods-poupon bg-gradual-orange flex">
					<view class="basis-lg flex justify-center align-center flex-direction">
						<view><text class="text-xxl margin-right-xs">{{goodsDetails.coupon_price}}</text><text>元优惠券</text></view>
						<view><text>{{goodsDetails.coupon_start_time | dateFormat}}-{{goodsDetails.coupon_end_time | dateFormat}}</text></view>
					</view>
					<view class="basis-sm flex justify-center align-center text-xxl "><text>立即领券</text></view>
				</view>
			</view>
			<view class="margin-top margin-right margin-left text-sm text-grey padding-bottom">
				<text>{{goodsDetails.desc}}</text>
			</view>
		</view>
		<view class="margin-top-sm bg-white padding">
			<view class="flex align-center">
				<view class="cu-avatar xl radius" :style="{backgroundImage: 'url('+goodsDetails.shop_logo+')'}"></view>
				<view class="margin-left">
					<view><text class="text-xl">{{goodsDetails.shop_name}}</text><text class="margin-left-xl cu-btn round line-red" @tap="goShop">进店逛逛</text></view>
					<view class="margin-top-sm">
						<!-- <text class="bg-gradual-orange text-sm padding-right-xs padding-left-xs radius">天猫</text> -->
						<!-- <text class="margin-left">在售有优惠商品</text> -->
						<!-- <text class="text-red">25</text> -->
						<!-- <text>件</text> -->
					</view>
				</view>
				
			</view>
			<view class="flex justify-between margin-top">
				<text>宝贝描述：{{goodsDetails.dsr_score}}</text>
				<text>卖家服务：{{goodsDetails.service_score}}</text>
				<text>物流服务：{{goodsDetails.ship_score}}</text>
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
		<view class="cu-tabbar-height" />
		<!-- bar -->
		<view class="cu-bar bg-white tabbar border shop bottom-fixed">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<!-- <view class="cu-tag badge"></view> -->
				</view> 客服
			</button>
			<button class="action" open-type="contact">
				<view class="cuIcon-favorfill text-green">
					<!-- <view class="cu-tag badge">99</view> -->
				</view>
				收藏
			</button>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow-blur" @tap="showtpwd">口令购买</button>
				<button class="cu-btn bg-red round shadow-blur" @tap="couponTap">领券购买</button>
			</view>
		</view>

		<view class="cu-modal" :class="tpwdDialog ? 'show':''">
			<view class="cu-dialog">
				<view class="bg-white">
					<view class="cu-bar justify-end text-black">
						<view class="content">复制口令购买</view>
						<view class="action" @tap="hidetpwd">
							<text class="cuIcon-close"></text>
						</view>
					</view>
				</view>
				<view class="padding-xl">
					<text>
						{{this.coupon.tpwd}}
					</text>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="copy">一键复制</view>
				</view>
			</view>
		</view>
		<skw-loading :show="loading"></skw-loading>
	</view>

</template>

<script>
	import skwTitleBar from '@/components/skw-title-bar/skw-title-bar';
	import utils from '@/common/utils.js';
	import skwLoading from '@/components/skw-loading/skw-loading'
	import {
		getGoodDetails
	} from '@/common/api.js';

	// #ifdef APP-PLUS
	import plugin from '@/common/plugin.js';
	// #endif

	export default {
		name: "good-details",
		computed: {

		},
		components: {
			skwTitleBar,
			skwLoading
		},
		created() {

		},
		data() {
			return {
				title: "商品详情",
				id: 0,
				goodsId: 0,
				imgs: [],
				detailPics: {},
				goodsDetails: {},
				coupon: {},
				scrollY: 0,
				showFloatingButton: false,
				opacity: 0,
				tpwdDialog: false,
				loading:false
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
			// console.log(e.scrollTop);
		},
		onReachBottom(e) {

			this.scrollBottom = this.scrollY;
		},
		onReady() {

		},
		filters: {
			parseNum: function(value) {
				return utils.paseNum(value);
			},
			dateFormat: function(str) {
				if (str) {
					let d = utils.string2Date(str);
					return utils.dateFormat("Y.m.d", d);
				} else {
					return "00-00:00";
				}

			}
		},
		methods: {
			getData() {
				this.loading = true;
				getGoodDetails({
					id: this.id,
					goods_id: this.goodsId
				}).then((res) => {
					if (res['code'] == "20000") {
						this.coupon = res.data.coupon;
						this.goodsDetails = res.data.goods_details;
						this.imgs = res.data.goods_details.imgs.split(',');
						this.detailPics = JSON.parse(res.data.goods_details.detail_pics);
						this.loading = false;
					}
				}).catch((e) => {
					console.log(e)
					uni.navigateBack();
					this.loading = false;
				})
			},
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			},
			couponTap() {
				//#ifdef APP-PLUS
				plugin.alibcsdk.openByUrl({
					'url': this.goodsDetails.coupon_link
				}, (ret) => {
					uni.navigateBack();
					console.log(ret);
				});
				//#endif
				// #ifdef H5
				location.href = this.coupon.coupon_click_url;
				//#endif
			},
			hidetpwd() {
				this.tpwdDialog = false
			},
			showtpwd() {
				this.tpwdDialog = true;
			},
			copy(){
				utils.setClipboard(this.coupon.tpwd);
				this.tpwdDialog = false;
			},
			goShop(){
				//#ifdef APP-PLUS
				plugin.alibcsdk.openByUrl({
					'url': this.goodsDetails.coupon_link
				}, (ret) => {
					uni.navigateBack();
					console.log(ret);
				});
				//#endif
			}
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
