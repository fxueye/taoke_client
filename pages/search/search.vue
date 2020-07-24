<template>
	<view>
		<view class="bg-gradual-red">
			<view class="app-nav bg-gradual-red">
				<skw-search class="bg-gradual-red" :isBack="true" @confirm="search" :word="query.word" @messageTap="messageTap"></skw-search>
			</view>
		</view>
		<view class="status-bar-height"></view>
		<view style="height: 100rpx;"></view>
		<view v-if="goods.length > 0">
			<skw-sort-tab :scrollTop="0" @sortTab="sortTab"></skw-sort-tab>
			<skw-goods :data="goods" :loadStatus="loadStatus" @listTap="listTap"></skw-goods>
			<skw-loading :show="loading"></skw-loading>
		</view>
		<view v-if="goods.length == 0">
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action text-sm">搜索发现</view>
			</view>
			<view class="padding-sm bg-white solid-bottom">
				<block v-for="(w,i) in words" :key="i">
					<view class='cu-tag round margin-top-sm' @tap="wordTap(w)">{{w}}</view>
				</block>
			</view>
			<view class="cu-bar bg-white solid-bottom margin-top-sm">
				<view class="action text-sm">热搜榜</view>
			</view>
			<view class="cu-list menu-avatar">
				<block v-for="(g,i) in ranking" :key="i" v-if="i < 10">
					<view class="cu-item " @tap="goodTap(g)">
						<view class="cu-avatar radius lg" :style="{backgroundImage:'url('+g.main_pic+')'}"></view>
						<view class="content">
							<view class="text-gray text-sm flex">
								<view class="text-cut">{{g.dtitle}}</view>
							</view>
							<view class="text-gray text-sm margin-left-sm margin-top-sm flex">
								<text class="cuIcon-likefill text-red"></text>
								<view class="text-cut margin-left-sm">{{g.score}}</view>
							</view>
						</view>
						<view class="action flex">
							<text v-if="isNew(g.create_time)" class="cu-tag radius line-orange sm">新</text>
							<text v-if="g.daily_sales > 3000" class="cu-tag radius line-red sm">爆</text>
						</view>
					</view>
				</block>
			</view>
		</view>

	</view>
</template>

<script>
	import skwSearch from '@/components/skw-seach/skw-search'
	import skwGoods from '@/components/skw-goods/skw-goods'
	import skwSortTab from '@/components/skw-sort-tab/skw-sort-tab'
	import skwLoading from '@/components/skw-loading/skw-loading'
	import utils from '@/common/utils.js';
	import {
		search,
		words,
		ranking
	} from '@/common/api.js'
	// #ifdef APP-PLUS
	import plugin from '@/common/plugin.js';
	// #endif

	export default {
		name: 'search',
		components: {
			skwSearch,
			skwGoods,
			skwSortTab
		},
		created() {
			this.getData();
		},
		data() {
			return {
				query: {
					page: 1,
					size: 20,
					order: {
						hot_push: 'DESC'
					},
					word: ''
				},
				words: [],
				ranking: [],
				goods: [],
				loadStatus: 'more',
				loading: false,
			};
		},
		onReachBottom(e) {
			if(this.query.word != ""){
				this.query.page = this.query.page + 1;
				this.getGoods();
			}
		},
		methods: {
			async getData() {
				words().then(res => {
					this.words = utils.randomData(res.data.words, 8);
				}).catch(err => {
					console.log(err);
				});
				
				ranking({type:7}).then(res=>{
					this.ranking = res.data.ranking;
				}).catch(err=>{
					console.log(err);
				})
				
			},
			getGoods() {
				this.loading = true;
				this.loadStatus = "loading";
				search(this.query).then(res => {
					if (res.data.goods.length != 0) {
						if (this.query.page == 1) {
							this.goods = [];
						}
						this.query.page = res.data.page;
						this.goods.push.apply(this.goods, res.data.goods);
						this.loadStatus = "more";
					} else {
						this.loadStatus = "noMore";
					}
					this.loading = false;
				}).catch(err => {
					this.loadStatus = "noMore";
					this.loading = false;
				});
			},
			search(e) {
				this.query.word = e.detail.value;
				this.getGoods();
			},
			sortTab(e) {
				this.query.page = 1;
				this.query.order = {};
				this.query.order[e.item.key] = e.item.value;
				this.getGoods();
			},
			listTap(item) {
				console.log(item);
				var id = item.data.id;
				var goodsId = item.data.goods_id;

				uni.navigateTo({
					url: utils.format('/pages/good/details?id={0}&goodsId={1}', id, goodsId),
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			messageTap() {
				uni.$emit("tabTap", 2);
			},
			wordTap(w) {
				this.query.word = w;
				this.getGoods();
			},
			isNew(str){
				let time = utils.string2Date(str).getTime();
				let now =new Date().getTime();
				let diff = now - time;
				return diff < 24 * 60 * 60 * 1000;
			},
			goodTap(g){
				var id = g.id;
				var goodsId = g.goods_id;
				
				uni.navigateTo({
					url: utils.format('/pages/good/details?id={0}&goodsId={1}', id, goodsId),
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
