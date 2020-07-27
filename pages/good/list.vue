<template>
	<view>
		<skw-title-bar :isBack="true" :fixed="true" :standing="true">
			<block slot="content">
				<text>{{title}}</text>
			</block>
			<block slot="right">
				<text class="cuIcon-message white"></text>
			</block>
		</skw-title-bar>
		<skw-sort-tab :scrollTop="0" @sortTab="sortTab"></skw-sort-tab>
		<skw-goods :data="goods" :loadStatus="loadStatus" @listTap="listTap"></skw-goods>
		<skw-loading :show="loading"></skw-loading>
		<skw-floating-button :visible="showFloatingButton" @click="goTop"></skw-floating-button>
	</view>
</template>

<script>
	import skwGoods from '@/components/skw-goods/skw-goods'
	import skwSortTab from '@/components/skw-sort-tab/skw-sort-tab'
	import skwLoading from '@/components/skw-loading/skw-loading'
	import skwFloatingButton from '@/components/skw-floating-button/skw-floating-button.vue';
	import utils from '@/common/utils.js';
	import {
		goodsList
	} from '@/common/api.js';
	// #ifdef APP-PLUS
	import plugin from '@/common/plugin.js';
	// #endif

	export default {
		components: {
			skwGoods,
			skwSortTab,
			skwLoading,
			skwFloatingButton
		},
		data() {
			return {
				query: {
					subcid: 0,
					cids: '',
					page: 1,
					size: 10,
					order: {
						hot_push: 'DESC'
					},
				},
				scrollY: 0,
				title: '',
				loading: true,
				loadStatus: 'more',
				goods: [],
				showFloatingButton: false
			}
		},
		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			if (this.scrollY > 350) {
				this.showFloatingButton = true;
			} else {
				this.showFloatingButton = false;
			}
			//console.log(e.scrollTop);
		},
		onReachBottom(e) {
			this.query.page = this.query.page + 1;
			this.getGoods();

		},
		onLoad: function(option) {

			this.query.subcid = option.subcid;
			this.query.cids = option.cids ? option.cids : '';
			this.title = decodeURIComponent(option.title);
			this.getData();

		},
		methods: {
			async getData() {
				this.getGoods();
			},
			getGoods() {
				this.loading = true;
				goodsList(this.query).then(res => {
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
				}).catch(error => {
					this.loading = false;
					console.log(error);
					this.loadStatus = "noMore";
				});
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
			},
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			}
		}
	}
</script>

<style>

</style>
