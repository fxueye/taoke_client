<template>
	<view class="app-center-box">
		<skw-title-bar :isBack="true" :fixed="true">
			<block slot="content">
				<text>用户中心</text>
			</block>
			<block slot="right">
				<text class="cuIcon-settings white" @click="settingTap"></text>
			</block>
		</skw-title-bar>
		<view class="app-header-box bg-gradual-red">
			<!--用户信息-->
			<view class="app-user-box">
				<!--未登陆-->
				<view class="login-user-view" v-if="!login">
					<view class="login-user-avatar-view">
						<view class="cu-avatar round lg" style="background-image:url(/static/image/avatar/1.jpg);" />
					</view>
					<button class="cu-btn sm radius" @tap="loginTap">立即登录</button>
				</view>

				<!--已登陆-->
				<view class="cu-list menu-avatar" v-else>
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(/static/image/avatar/1.jpg);" />
						<view class="content text-xl">
							<view class="text-white">
								<text class="margin-right">xxxx</text>

							</view>
							<view class="text-white-bg text-sm">
								<!-- <text class="text-border-x">关注 2</text> -->
								<!-- <text>粉丝 9</text> -->
							</view>
						</view>
					</view>
				</view>


				<!--用户数据-->
				<view class="app-user-info-num-box">
					<view class="cu-list grid col-4 no-border">
						<view class="cu-item">
							<view class="text-xl" v-if="!login">-</view>
							<view class="text-xl" v-else>0</view>
							<text class="text-sm">购物车</text>
						</view>
						<view class="cu-item">
							<view class="text-xl" v-if="!login">-</view>
							<view class="text-xl" v-else>4</view>
							<text class="text-sm">足迹</text>
						</view>
						<view class="cu-item">
							<view class="text-xl" v-if="!login">-</view>
							<view class="text-xl" v-else>0</view>
							<text class="text-sm">红包</text>
						</view>
						<view class="cu-item">
							<view class="text-xl" v-if="!login">-</view>
							<view class="text-xl" v-else>0</view>
							<text class="text-sm">账单</text>
						</view>
					</view>
				</view>


				<!--用户提示-->
				<view class="text-sm app-user-info-tip-box" v-if="login" @tap="realNameTap">
					<view class="text-cut">偷偷告诉你，实名认证后宝贝更易卖出哦~</view>
					<text class="cuIcon-right icon" />
				</view>

			</view>
		</view>
		<view class="app-view-content">
			<!--用户数据-->
			<view class="padding-xs bg-white app-user-info-order-box">
				<view class="text-black text-lg text-bold padding-sm">我的交易</view>
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item">
						<view class="text-xxl text-red" v-if="login">
							<text class="cuIcon-presentfill"></text>
						</view>
						<view class="text-xxl text-black" v-else>0</view>
						<text class="text-sm">我发布的</text>
					</view>
					<view class="cu-item">
						<view class="text-xxl text-red" v-if="login">
							<text class="cuIcon-sponsorfill"></text>
						</view>
						<view class="text-xxl text-black" v-else>1</view>
						<text class="text-sm">我卖出的</text>
					</view>
					<view class="cu-item" >
						<view class="text-xxl text-red" v-if="login">
							<text class="cuIcon-cartfill"></text>
						</view>
						<view class="text-xxl text-black" v-else>2</view>
						<text class="text-sm">我买到的</text>
					</view>
					<view class="cu-item">
						<view class="text-xxl text-red" v-if="login">
							<text class="cuIcon-favorfill"></text>
						</view>
						<view class="text-xxl text-black" v-else>3</view>
						<text class="text-sm">我收藏的</text>
					</view>
				</view>
			</view>


			<!--推荐工具-->
			<view class="padding-xs bg-white margin-top app-user-info-tools-box">
				<view class="padding-sm tools-view">
					<view class="text-black text-bold text-lg tools-title">推荐工具</view>
					<view class="text-gray text-sm tools-right">
						<text>更多</text>
						<text class="cuIcon-right" />
					</view>
				</view>

				<view class="app-tools-list-box">
					<view class="cu-list grid col-4 no-border">
						<block v-for="(item,index) in toolsList" :key="index">
							<view class="cu-item" v-if="index < 12" >
								<view class="text-black" :class="['cuIcon-' + item.icon]" />
								<text>{{item.name}}</text>
							</view>
						</block>
					</view>
				</view>

			</view>

		</view>

		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import skwTitleBar from '@/components/skw-title-bar/skw-title-bar';

	export default {
		name: "center",
		computed: {
			...mapGetters('app', {
				cate: 'cate'

			}),
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
				toolsList: [{
					id: 1,
					icon: 'service',
					name: '客服中心'
				}, {
					id: 2,
					icon: 'squarecheck',
					name: '我的订阅'
				}, {
					id: 3,
					icon: 'friend',
					name: '我的拼团'
				}, {
					id: 4,
					icon: 'moneybag',
					name: '借钱'
				}, {
					id: 5,
					icon: 'read',
					name: '平台规则'
				}, {
					id: 6,
					icon: 'notification',
					name: '活动报名'
				}, {
					id: 7,
					icon: 'redpacket',
					name: '领新人红包'
				}, {
					id: 8,
					icon: 'vipcard',
					name: '办信用卡'
				}, {
					id: 9,
					icon: 'scan',
					name: '活动扫码'
				}, {
					id: 10,
					icon: 'present',
					name: '签到送礼'
				}, {
					id: 11,
					icon: 'delete',
					name: '垃圾分类'
				}, {
					id: 12,
					icon: 'settings',
					name: '设置'
				}]
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
			settingTap(e) {

			},
			loginTap(e) {

			}


		}
	}
</script>

<style lang="scss" scoped>
	.app-center-box {
		width: 100%;

		.app-header-box {
			padding-top: 0;
			padding-bottom: 72rpx;


			.app-user-box {
				width: 100%;


				.login-user-view {
					position: relative;
					text-align: center;

					.login-user-avatar-view {
						position: relative;
						margin-bottom: 18.18rpx;
					}
				}

				.cu-list.menu-avatar>.cu-item {
					background-color: inherit;

					.content {
						width: calc(100% - 94.54rpx - 59.99rpx - 20rpx);

						.text-white-bg {
							color: #e8e8e8;

							.text-border-x {
								margin-right: 25.45rpx;
								position: relative;

								&:after {
									position: absolute;
									background: #dddddd;
									top: 5.45rpx;
									width: 1.81rpx;
									right: -12.72rpx;
									height: 16.36rpx;
									content: " ";
								}
							}
						}
					}

					&:after {
						width: 0;
						height: 0;
						border-bottom: 0;
					}
				}

				.cu-list.menu-avatar>.cu-item .content>view:first-child {
					font-size: 34.54rpx;
				}

			}

			.app-user-info-num-box {
				.cu-list.grid.no-border {
					padding: 0;
				}

				.cu-list.grid.no-border>.cu-item {
					padding-top: 27.27rpx;
					padding-bottom: 9.09rpx;
				}

				.cu-list.grid {
					background-color: inherit;
				}

				.cu-list.grid>.cu-item text {
					color: #e8e8e8;
					font-size: 20rpx;
					line-height: 27.27rpx;
				}
			}

			.app-user-info-tip-box {
				position: relative;
				margin: 18.18rpx 27.27rpx;
				border-radius: 9.09rpx;
				padding: 18.18rpx 27.27rpx;
				background: #ea8d8d;
				background-image: linear-gradient(45deg, #f7615f, #f553b3);

				.text-cut {
					padding-right: 45.45rpx;
				}

				.icon {
					position: absolute;
					right: 27.27rpx;
					top: 23.63rpx;
				}
			}
		}

		.app-view-content {
			padding: 0 27.27rpx 54.54rpx;
			margin-top: -63.63rpx;

			.app-user-info-order-box {
				border-radius: 18.18rpx;

				.cu-list.grid.no-border {
					padding: 0;
				}

				.cu-list.grid.no-border>.cu-item {
					padding-bottom: 9.09rpx;
				}
			}

			.cu-list.grid>.cu-item text {
				color: inherit;
			}


			.app-user-info-tools-box {
				border-radius: 18.18rpx;

				.tools-view {
					position: relative;

					.tools-title {
						padding-right: 81.81rpx;
					}

					.tools-right {
						position: absolute;
						right: 9.09rpx;
						bottom: 23.63rpx;
					}
				}

			}
		}

	}
</style>
