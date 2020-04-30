<template>
	<view class="app-home-box" :class="show?'show':''">
		<view class="app-home-top"></view>
		<!--轮播背景-->
		<swiper-background :list_data="swiperInfo.list" :indexs="swiperInfo.index" :show="swiperInfo.show" :welcome="false" />

		<view class="app-head-search-box" :style="[{backgroundColor:'rgba(229, 77, 66,'+ headInfo.opacity +')'}]">

			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<view class="text-center text-white app-small-routine-title">首页</view>
			<!-- #endif -->

			<!--搜索框-->
			<view class="cu-bar search app-search-box">
				<view class="search-form round" @tap="searchTap">
					<text class="cuIcon-search" />
					<text>口罩</text>
				</view>
				<view class="action text-white">
					<text class="cuIcon-message" @tap="messageTap" />
				</view>
			</view>

			<!--选项卡-->
			<view class="app-flex-tab show">
				<view class="flex text-white">
					<view class="basis-xxl">
						<scroll-view scroll-x class="nav z" scroll-with-animation :scroll-left="headTab.scrollLeft">
							<block v-for="(item,index) in headTab.list" :key="index">
								<view class="cu-item" :class="index==headTab.tabCur?'select':''" @tap="tabSelect" :data-id="index">
									<view>{{item.name}}</view>
									<view class="tab-dot bg-white" />
								</view>
							</block>
						</scroll-view>
					</view>
					<view class="basis-xxs">
						<view class="sort-icon" @tap="cateVueTap">
							<text class="cuIcon-sort" />
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--中间内容区域-->
		<view class="app-view-content" :class="[headTab.tabCur==0?'show':'']">
			<!--轮播图-->
			<view class="app-swiper-box">
				<swiper class="screen-swiper square-dot c" autoplay circular indicator-dots :current="swiperInfo.index" @change="swiperChange">
					<swiper-item v-for="(item,index) in banner" :key="index">
						<view class="swiper-padding">
							<image :src="item.img" mode="widthFix" />
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!--滑动菜单-->
			<grid-menu-list :list_data='gridMenuData' @listTap='gridMenuTap' />

			<!--红包块-->
			<view class="bg-red margin radius padding-sm">
				<image class="red-envelopes" src="/static/images/home/sundry/2.png" mode="widthFix" />
			</view>


			<!--活动区域-->
			<activity-list :list_data='activity' @listTap='activityTap' />

			<!--商品tab-->
			<view class="app-goods-tab-box">
				<scroll-view scroll-x class="nav z">
					<view class="flex text-center">
						<block v-for="(item,index) in sortData.list" :key="index">
							<view class="cu-item flex-sub nf" :class="index==sortData.tabCur?'select':''" @tap="sortTab" :data-id="index">
								<view :class="index == sortData.tabCur?'text-red':''">{{item.title}}</view>
								<view class="tab-dot bg-red" />
							</view>
						</block>
					</view>
				</scroll-view>
			</view>

			<view class="app-tab-list">
				<!--商品列表-->
				<goods-list :list_data="goods.items" @listTap="goodsListTap" :show="sortData.tabCur!=2 && sortData.tabCur!=4?true:false" />

			</view>

			<!--占位底部距离-->
			<view class="cu-tabbar-height" />
		</view>

		<!--中间内容区域-分类-->
		<view class="app-view-content" :class="headTab.tabCur!=0?'show':''">

			<!--宫格分类-->
			<grid-sort-list :list_data="gridSortData" @listTap="gridSortTap" />

			<!--广告-->

			<view class="margin">
				<image class="app-ad-img" src="/static/images/home/swiper/swiper-1.png" mode="widthFix" />
			</view>

			<!--标题-->
			<view class="margin-bottom-sm app-tab-list-title">
				<view class="flex flex-wrap">
					<view class="basis-sm text-right">
						<image class="img-aau" src="/static/app/img/aau.png" lazy-load mode="widthFix" />
					</view>
					<view class="basis-xs text-center">
						<text class="text-black text-xl text-bold">为您推荐</text>
					</view>
					<view class="basis-sm text-left">
						<image class="img-aau" src="/static/app/img/aau.png" lazy-load mode="widthFix" />
					</view>
				</view>
			</view>

			<!--商品列表-->
			<goods-list :list_data="goods.items" @listTap="goodsListTap" />

			<!--占位底部距离-->
			<view class="cu-tabbar-height" />
		</view>

		<!--弹出框-->
		<modal-img :show="modalShow" src="/static/images/home/sundry/reward.png" @imgTap="imgTap" @closeTap="closeTap" />

		<!--悬浮按钮-->
		<view class="app-add-btn-view-box" @tap="toTopTap">
			<button class="cu-btn cuIcon-top bg-red"></button>
		</view>

	</view>
</template>

<script>
	//加载组件  

	import swiperBackground from '@/components/base/swiper-background';
	import gridMenuList from '@/components/list/grid-menu-list';

	import activityList from '@/components/list/activity-list';
	import goodsList from '@/components/list/goods-list';

	import footerTabbar from '@/components/footer/footer-tabbar';
	import gridSortList from '@/components/list/grid-sort-list';
	import modalImg from '@/components/base/modal-img';
	import data from '@/common/data.js'

	//======================================================================
	import _home_data from '@/static/data/home.js'; //虚拟数据
	import utils from '@/common/utils.js';

	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'home',
		computed: {
			...mapGetters('app', {
				cate: 'cate',
				goods: 'goods',
				banner: 'banner'
			}),
		},

		components: {
			swiperBackground,
			gridMenuList,
			activityList,
			goodsList,
			footerTabbar,
			gridSortList,
			modalImg
		},
		data() {
			return {
				query: {
					page: 1,
					size: 100
				},
				swiperInfo: {
					index: 0,
					show: true,
					list: []
				},
				headInfo: {
					Class: "",
					opacity: 0,
				},
				goodsShow: true,
				headTab: {
					tabCur: 0,
					scrollLeft: 0,
				},

				gridMenuData: [],
				identifyData: [],
				quickly: {},
				activity: [],
				sortData: {
					tabCur: 0,
					list: []
				},
				liveData: [],
				videoData: [],
				gridSortData: [],
				modalShow: true,
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
				if (this.scrollBottom != 0) {
					this.setReachBottom();
				}
			},
			banner(newBanner, oldBanner) {
				this.swiperInfo.list = newBanner;
			},
			cate(newCate, oldCate) {
				this.headTab.list = newCate;
			}
		},
		created() {
			//加载虚拟数据

			this.headTab.list = this.cate;
			this.swiperInfo.list = this.banner;
			this.gridMenuData = _home_data.nav();
			this.activity = _home_data.activity();
			this.sortData.list = data.sortList;
			utils.setBarColor(false);
			this.getData();
		},
		mounted() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});



			// console.log(this.cate);
		},
		methods: {
			async getData() {
				await this.$store.dispatch('app/get_goods', this.query);
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
				if (this.headTab.tabCur == 0) {
					if (scrollTop <= 100) {
						let num = scrollTop / 100;
						this.headInfo.opacity = num;
					} else if (scrollTop > 100) {
						this.headInfo.opacity = 1;
					}
				}
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},

			//搜索框下的tab菜单被点击
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				console.log(index);
				console.log(this.cate);
				this.headTab.tabCur = index;
				this.headTab.scrollLeft = (index - 1) * 60;
				if (index == 0) {
					this.swiperInfo.show = true;
					this.headInfo.opacity = 0;
				} else {
					this.swiperInfo.show = false;
					this.headInfo.opacity = 1;
				}
				this.gridSortData = this.cate[index].sub_cate;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				});
			},
			swiperChange(e) {
				this.swiperInfo.index = e.detail.current;
			},
			gridMenuTap(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/home/sort_list"
				});
			},
			identifyTap(e) {
				console.log(e);
			},
			quicklyTap(e) {
				console.log(e);
			},
			activityTap(e) {
				console.log(e);
			},
			//商品列表上的分类tab被点击
			sortTab(e) {
				this.sortData.tabCur = e.currentTarget.dataset.id;
				// #ifdef H5
				uni.pageScrollTo({
					scrollTop: 1060,
					duration: 200
				});
				// #endif

				// #ifdef APP-PLUS
				uni.pageScrollTo({
					scrollTop: 1010,
					duration: 200
				});
				// #endif
			},
			goodsListTap(e) {
				console.log(e);
				if (e.index == 0) {
					uni.navigateTo({
						url: '/pages/goods/goods'
					});
				} else if (e.index == 2) {
					uni.navigateTo({
						url: '/pages/goods/second_hand'
					});
				} else if (e.index == 3) {
					uni.navigateTo({
						url: '/pages/goods/second_terrace'
					});
				} else {

				}
			},
			liveListTap(e) {
				console.log(e);
			},
			videoListTap(e) {
				console.log(e);
			},
			gridSortTap(e) {
				console.log(e);
				if (e.data.type == "more") {
					uni.navigateTo({
						url: '/pages/home/cate'
					});
				}
			},
			toTopTap() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});

			},
			imgTap() {
				this.modalShow = false;
				uni.navigateTo({
					// url: "/pages/goods/reward"
				});
				console.log('图片被点击');
			},
			closeTap() {
				this.modalShow = false;
				console.log('点击了关闭');
			},
			messageTap() {
				this.$emit('messageTap', 3);
			},
			cateVueTap() {
				uni.navigateTo({
					url: "/pages/home/cate"
				});
			},
			searchTap() {
				uni.navigateTo({
					url: "/pages/home/search"
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-home-top {
		position: relative;
		width: 100%;
		z-index: 9;
		padding-top: var(--status-bar-height);
		top: calc((var(--status-bar-height) + 101rpx) - (var(--status-bar-height) + 101rpx) - (var(--status-bar-height) + 101rpx));
		min-height: calc(var(--status-bar-height) + 101rpx);
	}

	.app-head-search-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 9999;
		background-color: rgba(229, 77, 66, 0);
		padding-top: var(--status-bar-height);
		transition: top .25s;
		padding-bottom: 10rpx;

		.app-search-box {
			position: relative;
		}

		.app-flex-tab {
			position: relative;
			transition: opacity .25s;

			.flex {
				.basis-xxl {
					flex-basis: 90%;
					width: 90%;
					z-index: 1;
				}

				.basis-xxs {
					flex-basis: 10%;
					z-index: 1;
					width: 10%;
				}

				.sort-icon {
					font-size: 55rpx;
					height: 64rpx;
					line-height: 64rpx;
					text-align: center;
				}
			}
		}
	}

	.app-head-search-box.welcome {
		top: calc(var(--status-bar-height) + 101rpx);
		transition: top .25s;
	}

	.app-view-content {
		display: none;
		width: 100%;

		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 30rpx);
		/* #endif */

		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 70rpx);
		/* #endif */

		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 85rpx);
		/* #endif */

		.app-tab-list {
			position: relative;
			width: 100%;
		}
	}

	.app-view-content.welcome {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 180rpx);
		/* #endif */

		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 220rpx);
		/* #endif */

		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 220rpx);
		/* #endif */

		transition: all .25s;
	}

	.app-view-content.show {
		display: block;
	}

	.app-swiper-box {
		width: 100%;

		.screen-swiper {
			height: 272rpx;
			min-height: 272rpx;

			.swiper-padding {
				padding: 0 25rpx;
			}
		}
	}

	.red-envelopes {
		width: 100%;
	}

	.app-goods-tab-box {
		position: sticky;
		padding: 2rpx 0;
		transition: all .25s;
		z-index: 9999;
		background: #fff;
		padding-bottom: 5px;

		/* #ifndef MP */
		top: calc(var(--status-bar-height) + 101rpx);
		/* #endif */

		/* #ifdef MP */
		top: calc(var(--status-bar-height) + 161rpx);
		/* #endif */

		.cu-tag.z {
			top: 0px;
			right: -32.72rpx;
			font-size: 20rpx;
			padding: 19rpx 6rpx;
			transform: scale(0.8);
		}
	}

	.app-ad-img {
		width: 100%;
	}

	.app-tab-list-title {
		.img-aau {
			width: 101.81rpx;
			margin-top: 12.72rpx;
		}

		.text-right {
			.img-aau {
				margin-right: 14.54rpx;
			}
		}

		.text-left {
			.img-aau {
				margin-left: 14.54rpx;
			}
		}
	}

	.app-add-btn-view-box {
		position: fixed;
		z-index: 999999;
		bottom: 181.81rpx;
		right: 27.27rpx;

		.cu-btn {
			margin: auto;
			width: 81.81rpx;
			height: 81.81rpx;
			font-weight: 800;
			border-radius: 50%;
			font-size: 36.36rpx;
			border: 9.09rpx solid #fff;
			box-shadow: 0 0 14.54rpx 7.27rpx #d0d0d0;
		}
	}

	.app-home-box {
		display: none;
	}

	.app-home-box.show {
		display: block;
	}
</style>
