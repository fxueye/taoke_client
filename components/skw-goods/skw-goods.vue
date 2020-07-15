<template>
	<view class="goods-box">
		<view class="flex flex-wrap" >
			<view class="basis-df padding-sm padding-right-xs">
				<block v-for="(item,index) in data" :key="index" v-if="index % 2 == 0">
					<view class="bg-white margin-bottom-sm list-radius" @tap="listTap(item,index)">
						<view class="goods-img">
							<image :src="item.main_pic" mode="widthFix" lazy-load />
							<view class="mold-view" v-if="item.activity_type != '1'">
								<view class="text-right service-view" v-if="item.yunfeixian == '1'">
									<text class="cu-tag bg-blue radius sm">运费险</text>
								</view>
								<text class="cu-tag radius sm bg-red" v-if="item.activity_type == '2'">淘抢购</text>
								<text class="cu-tag radius sm bg-red" v-if="item.activity_type == '3'">聚划算</text>
							</view>
						</view>
						<view class="padding-xs">
							<view class="text-black">{{item.dtitle}}</view>
							<view class="margin-top-xs">
								<view class="flex">
									<view class="flex-sub" v-if="item.coupon_price">
										<text class="cu-tag text-white bg-red radius sm ">{{parseFloat(item.coupon_price)}}元券</text>
									</view>
								</view>

							</view>
							<view class="margin-top-xs">
								<view class="flex align-center">
									<view class="basis-xs">
										<text class="text-red text-xs">券后</text>
									</view>
									<view class="basis-sm">
										<text class="text-price text-red text-xl text-left">{{item.actual_price}}</text>
									</view>
								</view>
							</view>
							<view class="margin-top-xs">
								<view class="flex align-center text-gray">
									<view class="flex-sub">
										<text class="text-xs margin-right-xs">{{item.shop_type=='0'?'淘宝':'天猫'}}</text>
										<text class="text-price text-xs text-left">{{item.original_price}}</text>
									</view>
									<view class="flex-sub text-right">
										<text class="text-xs ">已售{{item.month_sales | parseNum}}</text>
									</view>
								</view>
							</view>
							<view class="margin-top-sm margin-bottom-xs">
								<view class="flex text-gray align-center">
									<view class="basis-xl">
										<view class="flex flex-wrap align-center">
											<view class="basis-xs">
												<image class="cu-avatar sm round img" :src="item.shop_logo" lazy-load mode="widthFix" />
											</view>
											<view class="basis-xl">
												<text class="text-sm">{{item.shop_name}}</text>
											</view>
										</view>
									</view>
									<view class="basis-xs text-right align-center">
										<text class="text-sm text-red">{{item.shop_type=='0'?'淘宝':'天猫'}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="basis-df padding-sm padding-left-xs">
				<block v-for="(item,index) in data" :key="index" v-if="index % 2 != 0">
					<view class="bg-white margin-bottom-sm list-radius" @tap="listTap(item,index)">
						<view class="goods-img">
							<image  :src="item.main_pic" mode="widthFix" lazy-load />
							<view class="mold-view" v-if="item.activity_type != '1'">
								<view class="text-right service-view" v-if="item.yunfeixian == '1'">
									<text class="cu-tag bg-blue radius sm">运费险</text>
								</view>
								<text class="cu-tag radius sm bg-red" v-if="item.activity_type == '2'">淘抢购</text>
								<text class="cu-tag radius sm bg-red" v-if="item.activity_type == '3'">聚划算</text>
							</view>
						</view>
						<view class="padding-xs">
							<view class="text-black">{{item.dtitle}}</view>
							<view class="margin-top-xs">
								<view class="flex">
									<view class="flex-sub" v-if="item.coupon_price">
										<text class="cu-tag text-white bg-red radius sm ">{{parseFloat(item.coupon_price)}}元券</text>
									</view>
								</view>

							</view>
							<view class="margin-top-xs">
								<view class="flex align-center">
									<view class="basis-xs">
										<text class="text-red text-xs">券后</text>
									</view>
									<view class="basis-sm">
										<text class="text-price text-red text-xl text-left">{{item.actual_price}}</text>
									</view>
								</view>
							</view>
							<view class="margin-top-xs">
								<view class="flex align-center text-gray">
									<view class="flex-sub">
										<text class="text-xs margin-right-xs">{{item.shop_type=='0'?'淘宝':'天猫'}}</text>
										<text class="text-price text-xs text-left">{{item.original_price}}</text>
									</view>
									<view class="flex-sub text-right">
										<text class="text-xs ">已售{{item.month_sales | parseNum}}</text>
									</view>
								</view>
							</view>
							<view class="margin-top-sm margin-bottom-xs">
								<view class="flex text-gray align-center">
									<view class="basis-xl">
										<view class="flex flex-wrap align-center">
											<view class="basis-xs">
												<image class="cu-avatar sm round img" :src="item.shop_logo" lazy-load mode="widthFix" />
											</view>
											<view class="basis-xl">
												<text class="text-sm">{{item.shop_name}}</text>
											</view>
										</view>
									</view>
									<view class="basis-xs text-right align-center">
										<text class="text-sm text-red">{{item.shop_type=='0'?'淘宝':'天猫'}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<skw-load-more :status="loadStatus"></skw-load-more>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	import skwLoadMore from '@/components/skw-load-more/skw-load-more'
	export default {
		name: 'skw-goods',
		components:{
			skwLoadMore
		},
		props: {
			data: {
				type: Array,
				default: () => {
					return []
				}
			},
			loadStatus: {
				type: String,
				default: 'more'
			}
		},
		filters: {
			parseNum: function(value) {
				return utils.paseNum(value);
			}
		},
		methods: {
			listTap(data, index) {
				this.$emit('listTap', {
					data,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

	.goods-box {
		position: relative;
		width: 100%;

		.list-radius {
			border-radius: 19rpx;
		}

		.goods-img {
			position: relative;
			width: 100%;

			image {
				width: 100%;
				height: 348rpx;
				border-radius: 19rpx 19rpx 0 0;
			}

			.service-view {
				position: absolute;
				width: 100%;
				bottom: 7.5rpx;
				right: 10rpx;
			}

			.mold-view {
				position: absolute;
				width: 100%;
				bottom: 7.5rpx;
				left: 10rpx;
			}
		}
	}
</style>
