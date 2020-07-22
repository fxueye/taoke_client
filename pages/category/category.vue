<template>
	<view>
		<view class="app-header bg-gradual-red">
			<view class="app-nav bg-gradual-red">
				<skw-search class="bg-gradual-red" @messageTap="messageTap"></skw-search>
			</view>
		</view>
		
		<view class="vertical-box status-bar-height">
			<scroll-view class="vertical-nav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
				<block v-for="(item,index) in cate" :key="index">
					<view class="cu-item" :class="index==tabCur?'text-red cur':''" @tap="tabSelect" :data-id="index" v-if="item.id != '0'">
						<view :class="index==tabCur?'text-black text-bold':''">{{item.name}}</view>
					</view>
				</block>
			</scroll-view>
			<scroll-view class="vertical-main" scroll-y scroll-with-animation :scroll-into-view="'main-'+mainCur" @scroll="verticalMain">
				<block v-for="(item,index) in cate" :key="index">
					<view class="padding-top padding-lr" v-if="item.id != '0'" :id="'main-'+index">

						<!--标题栏-->
						<view class="cu-bar bg-white">
							<view class="action">
								<text class="cuIcon-title text-red" />
								<text>{{item.name}}</text>
							</view>
						</view>

						<!--图标导航-->
						<view class="app-grid-icon-box" >
							<view class="cu-list grid col-3 no-border">
								<block v-for="(items,indexs) in item.sub_cate" :key="indexs">
									<view class="cu-item" @tap="subClick(items)">
										<view class="grid-icon">
											<image class="icon" :src="items.icon" lazy-load mode="widthFix" />
										</view>
										<text class="text-black">{{items.name}}</text>
									</view>
								</block>
							</view>
						</view>

					</view>
				</block>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import utils from '@/common/utils.js'; //工具函数
	import skwSearch from '@/components/skw-seach/skw-search'
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: "category",
		computed: {
			...mapGetters('app', {
				cate: 'cate'
			})
		},
		components: {
			skwSearch,

		},
		onReady() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
		},
		data() {
			return {
				tabCur: 1,
				mainCur: 1,
				verticalNavTop: 0,
				load: true,
			}
		},
		methods: {
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * uni.upx2px(100);
			},
			messageTap(){
				uni.$emit("tabTap",2);
			},
			verticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 1; i < this.cate.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.cate[i].id);
						view.fields({
							size: true
						}, data => {
							this.cate[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.cate[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + uni.upx2px(10);;
				for (let i = 0; i < this.cate.length; i++) {
					if (scrollTop > this.cate[i].top && scrollTop < this.cate[i].bottom) {
						this.verticalNavTop = (this.cate[i].id - 1) * uni.upx2px(100);
						this.tabCur = this.cate[i].id
						return false
					}
				}
			},
			subClick(item){
				console.log(item);
			}
		}
	}
</script>

<style lang="scss">
	.app-header{
		height: 100rpx;
	}
	.vertical-nav.nav {
		width: 200rpx;
		color: #666666;
		height: calc(100vh - (var(--status-bar-height) + 101rpx));
		white-space: initial;
	}

	.vertical-nav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #FAFAFA;
		margin: 0;
		border: none;
		height: 100rpx;
		line-height: 100rpx;
		position: relative;
	}

	.vertical-nav.nav .cu-item.cur {
		background-color: #FFFFFF;
	}

	.vertical-nav.nav .cu-item.cur::after {
		content: "";
		width: 7.27rpx;
		height: 32.72rpx;
		border-radius: 0px 9.09rpx 9.09rpx 0px;
		position: absolute;
		background-color: currentColor;
		top: 0;
		left: 0;
		bottom: 0;
		margin: auto;
	}

	.vertical-box {
		display: flex;
	}

	.vertical-main {
		background-color: #FFFFFF;
		height: calc(100vh - (var(--status-bar-height) + 101rpx));
		flex: 1;
	}

	.app-grid-icon-box {
		position: relative;
		width: 100%;

		.cu-list.grid {
			background-color: inherit;

			.grid-icon {
				margin: 0;

				.icon {
					width: 80rpx;
					height: 80rpx;
				}
			}
		}

		.cu-list.grid>.cu-item {
			padding-bottom: 9.09rpx;

			text {
				color: #333333;
			}
		}

		.cu-list.grid.no-border {
			padding: 0;
		}
	}
</style>
