<template>
	<view>
		<view class="app-bar-search-title-box">
			<view class="cu-bar fixed no-shadow bg-white">
				<view class="action" @tap="backPage">
					<text class="cuIcon-back" />
				</view>
				<view class="content search" @tap="searchTap">
					<view class="search-form round">
						<text class="cuIcon-search"/>
						<text class="margin-left-xs">输入您正在找的宝贝</text>
					</view>
				</view>
			</view>
			<!--占位的-->
			<view class="app-seat-height" />
		</view>

		<view class="vertical-box">
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
						<view class="app-grid-icon-box">
							<view class="cu-list grid col-3 no-border">
								<block v-for="(items,indexs) in item.sub_cate" :key="indexs">
									<view class="cu-item">
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
	import _sort_data from '@/static/data/sort_vue.js'; //虚拟数据
	import utils from '@/common/utils.js'; //工具函数

	import {
		mapGetters
	} from 'vuex';

	export default {
		computed: {
			...mapGetters('app', {
				cate: 'cate'
			})
		},
		data() {
			return {
				tabCur: 1,
				mainCur: 1,
				verticalNavTop: 0,
				load: true,
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
			backPage() {
				uni.navigateBack();
			},
			tabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
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
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.cate.length; i++) {
					if (scrollTop > this.cate[i].top && scrollTop < this.cate[i].bottom) {
						this.verticalNavTop = (this.cate[i].id - 1) * 50
						this.tabCur = this.cate[i].id
						return false
					}
				}
			},
			searchTap() {
				uni.navigateTo({
					url: "/pages/home/search"
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

	@import "../../static/app/style/cate_vue.scss";
</style>
