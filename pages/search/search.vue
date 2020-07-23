<template>
	<view>
		<view class="bg-gradual-red">
			<view class="app-nav bg-gradual-red">
				<skw-search class="bg-gradual-red" :isBack="true" @confirm="search" @messageTap="messageTap"></skw-search>
			</view>
		</view>
		<view class="status-bar-height"></view>
		<skw-sort-tab :scrollTop="0" @sortTab="sortTab"></skw-sort-tab>
		<view style="height: 100rpx;"></view>
		<skw-goods :data="goods" :loadStatus="loadStatus" @listTap="listTap"></skw-goods>
		<skw-loading :show="loading"></skw-loading>
	</view>
</template>

<script>
	import skwSearch from '@/components/skw-seach/skw-search'
	import skwGoods from '@/components/skw-goods/skw-goods'
	import skwSortTab from '@/components/skw-sort-tab/skw-sort-tab'
	import skwLoading from '@/components/skw-loading/skw-loading'
	import utils from '@/common/utils.js';
	import {
		search
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
					word: '女装'
				},
				goods:[],
				loadStatus: 'more',
				loading: false,
			};
		},
		onReachBottom(e) {
			this.query.page = this.query.page + 1;
			this.getGoods();
		},
		methods: {
			async getData() {

			},
			getGoods() {
				this.loading = true;
				this.loadStatus = "loading";
				search(this.query).then(res => {
					if(res.data.goods.length != 0){
						if(this.query.page == 1){
							this.goods = [];
						}
						this.query.page = res.data.page;
						this.goods.push.apply(this.goods,res.data.goods);
						this.loadStatus = "more";
					}else{
						this.loadStatus = "noMore";
					}
					this.loading = false;
				}).catch(err => {
					this.loadStatus = "noMore";
					this.loading = false;
				});
			},
			search(e){
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
				})
			},messageTap() {
				uni.$emit("tabTap", 2);
			},
		}
	}
</script>

<style lang="scss">

</style>
