<template>
	<view class="margin-bottom app-goods-list-box" :class="show?'show':''">
		<view class="flex flex-wrap ">
			<view class="basis-df padding-sm padding-right-xs ">
				<block v-for="(item,index) in list_data" :key="index" v-if="index%2==0">
					<view class="bg-white margin-bottom-sm list-radius" v-if="item.type=='0'" @tap="listTap(item,index)">
						<view class="goods-img">
							<image :src="item.main_pic" mode="widthFix" lazy-load />
							<!-- <text class="cuIcon-videofill text-white pay-view" v-if="item.pay"/> -->
							<view class="text-right service-view" v-if="item.yunfeixian == '1'">
								<text class="cu-tag bg-blue radius sm">运费险</text>
							</view>
							<view class="mold-view" v-if="item.activity_type != '1'">
								<text class="cu-tag radius sm bg-red" v-if="item.activity_type == '2'">淘抢购</text>
								<text class="cu-tag radius sm bg-red" v-if="item.activity_type == '3'">聚划算</text>
							</view>
						</view>
						<view class="padding-xs">
							<view class="text-cut-2 text-black">{{item.dtitle}}</view>
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
								<view class="flex text-gray">
									<view class="basis-xl">
										<view class="flex flex-wrap align-center">
											<view class="basis-xs">
												<image class="cu-avatar sm round img" :src="item.shop_logo" lazy-load mode="widthFix" />
											</view>
											<view class="basis-xl">
												<text class="text-sm">{{item.shop_name}}</text>
											</view>
											<!-- <image class="v-icon" src="/static/app/img/v.png" lazy-load mode="widthFix"  /> -->
										</view>
									</view>
									<view class="basis-xs text-right text-time">
										<text class="text-sm text-red">{{item.shop_type=='0'?'淘宝':'天猫'}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="bg-white margin-bottom-sm list-radius padding-sm recommend-list-box" v-if="item.type=='recommend'">
						<view class="flex flex-wrap">
							<view class="basis-xs text-right">
								<image class="img-aat" src="/static/app/img/aat.png" lazy-load mode="widthFix" />
							</view>
							<view class="basis-lg text-center">
								<text class="text-black text-bold">您可能感兴趣</text>
							</view>
							<view class="basis-xs text-left">
								<image class="img-aat" src="/static/app/img/aat.png" lazy-load mode="widthFix" />
							</view>
						</view>
						<view class="grid col-2 text-center margin-top-sm">
							<block v-for="(items,indexs) in item.list" :key="indexs" v-if="item.list.length < 5">
								<view class="padding-xs" @tap="listTap(items,indexs)">
									<view class="img-goods" :style="[{backgroundImage:'url('+ items.main_pic +')'}]" />
									<view class="text-black text-sm margin-top-xs">{{items.dtitle}}</view>
								</view>
							</block>
						</view>
					</view>
				</block>
			</view>

			<view class="basis-df padding-sm padding-left-xs ">
				<block v-for="(item,index) in list_data" :key="index" v-if="index%2 !=0">
					<view class="bg-white margin-bottom-sm list-radius" v-if="item.type=='0'" @tap="listTap(item,index)">
						<view class="goods-img">
							<image :src="item.main_pic" mode="widthFix" lazy-load />
							<!-- <text class="cuIcon-videofill text-white pay-view" v-if="item.pay"/> -->
							<view class="text-right service-view" v-if="item.yunfeixian == '1'">
								<text class="cu-tag bg-blue radius sm">运费险</text>
							</view>
							<view class="mold-view" v-if="item.activity_type != '1'">
								<text class="cu-tag radius sm bg-red" v-if="item.activity_type == '2'">淘抢购</text>
								<text class="cu-tag radius sm bg-red" v-if="item.activity_type == '3'">聚划算</text>
							</view>
						</view>
						<view class="padding-xs">
							<view class="text-cut-2 text-black">{{item.dtitle}}</view>
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
								<view class="flex text-gray">
									<view class="basis-xl">
										<view class="flex flex-wrap align-center">
											<view class="basis-xs">
												<image class="cu-avatar sm round img" :src="item.shop_logo" lazy-load mode="widthFix" />
											</view>
											<view class="basis-xl">
												<text class="text-sm">{{item.shop_name}}</text>
											</view>
											<!-- <image class="v-icon" src="/static/app/img/v.png" lazy-load mode="widthFix"  /> -->
										</view>
									</view>
									<view class="basis-xs text-right text-time">
										<text class="text-sm text-red">{{item.shop_type=='0'?'淘宝':'天猫'}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="bg-white margin-bottom-sm list-radius padding-sm recommend-list-box" v-if="item.type=='recommend'">
						<view class="flex flex-wrap">
							<view class="basis-xs text-right">
								<image class="img-aat" src="/static/app/img/aat.png" lazy-load mode="widthFix" />
							</view>
							<view class="basis-lg text-center">
								<text class="text-black text-bold">您可能感兴趣</text>
							</view>
							<view class="basis-xs text-left">
								<image class="img-aat" src="/static/app/img/aat.png" lazy-load mode="widthFix" />
							</view>
						</view>
						<view class="grid col-2 text-center margin-top-sm">
							<block v-for="(items,indexs) in item.list" :key="indexs" v-if="item.list.length < 5">
								<view class="padding-xs" @tap="listTap(items,indexs)">
									<view class="img-goods" :style="[{backgroundImage:'url('+ items.main_pic +')'}]" />
									<view class="text-black text-sm margin-top-xs">{{items.dtitle}}</view>
								</view>
							</block>
						</view>
					</view>
				</block>
			</view>


		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	export default {
		name: 'goods-list',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			},
			show: {
				type: Boolean,
				default: true
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
	.app-goods-list-box {
		position: relative;
		width: 100%;
		display: none;

		.list-radius {
			border-radius: 19rpx;
		}

		.goods-img {
			position: relative;
			width: 100%;

			image {
				width: 100%;
				border-radius: 19rpx 19rpx 0 0;
			}

			.pay-view {
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				font-size: 46rpx;
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

		.text-time {
			line-height: 47rpx;
		}

		.recommend-list-box {
			.img-aat {
				width: 55rpx;
				margin-top: 10rpx;
			}

			.img-goods {
				font-variant: small-caps;
				margin: 0;
				padding: 0;
				display: inline-flex;
				text-align: center;
				-webkit-box-pack: center;
				justify-content: center;
				-webkit-box-align: center;
				align-items: center;
				white-space: nowrap;
				position: relative;
				width: 137rpx;
				height: 137rpx;
				background-size: cover;
				background-position: center;
				vertical-align: middle;
				border-radius: 12%;
			}
		}
	}

	.app-goods-list-box.show {
		display: block;
	}
</style>
