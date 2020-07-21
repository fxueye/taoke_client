<template>
	<view>
		<view class="app-header bg-gradual-red">
			<view class="app-nav bg-gradual-red">
				<skw-search class="bg-gradual-red" @messageTap="messageTap"></skw-search>
				<skw-nav class="bg-gradual-red" :data='cate' :index="navIndex" @navSelect="navSelect" @cateTap="cateTap"></skw-nav>
			</view>
		</view>
		<view></view>
		<view class="status-bar-height"></view>
		<skw-swiper v-if="banners.length > 0" class="bg-gradual-red-white" v-show="navIndex == 0" :data="banners"></skw-swiper>

		<image class="banner_one radius padding-sm bg-white" v-if="banner_one.length > 0 && navIndex == 0" :src="banner_one[0].img"
		 lazy-load mode="widthFix" />

		<skw-grid v-if="subCate.length > 0" :showNum="9" :data="subCate" @moreTap="moreTap"></skw-grid>

		<skw-sort-tab v-show="navIndex != 0" @sortTab="sortTab"></skw-sort-tab>

		<skw-goods :data="goods.items" :loadStatus="loadStatus" @listTap="listTap"></skw-goods>

		<skw-loading :show="loading"></skw-loading>

	</view>
</template>

<script>
	import skwSearch from '@/components/skw-seach/skw-search'
	import skwNav from '@/components/skw-nav/skw-nav'
	import skwSwiper from '@/components/skw-swiper/skw-swiper'
	import skwGrid from '@/components/skw-grid/skw-grid'
	import skwGoods from '@/components/skw-goods/skw-goods'
	import skwSortTab from '@/components/skw-sort-tab/skw-sort-tab'
	import skwLoading from '@/components/skw-loading/skw-loading'
	import utils from '@/common/utils.js';
	// #ifdef APP-PLUS
	import plugin from '@/common/plugin.js';
	// #endif

	import {
		mapGetters
	} from 'vuex';

	export default {
		name: "home",
		computed: {
			...mapGetters('app', {
				cate: 'cate',
				goods: 'goods',
				banners: 'banners',
				banner_one: 'banner_one'
			}),
		},
		components: {
			skwSearch,
			skwNav,
			skwSwiper,
			skwGrid,
			skwGoods,
			skwSortTab
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
			scrollY() {
				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if (this.scrollBottom != 0) {
					this.setReachBottom();
				}
			},

		},
		created() {
			this.getData();
		},
		data() {
			return {
				query: {
					cid: 0,
					page: 1,
					size: 20,
					order: {
						hot_push: 'DESC'
					},
				},
				loadStatus: 'more',
				inputBottom: 0,
				navIndex: 0,
				loading: true,
				subCate: [],
			};
		},
		onReady() {},
		methods: {
			async getData() {
				await this.$store.dispatch('app/get_cate');
				await this.$store.dispatch('app/get_banner');

				this.getGoods();

			},
			getGoods() {
				this.loadStatus = "loading"
				this.$store.dispatch('app/get_goods', this.query).then(res => {
					this.loadStatus = "more";
					this.loading = false;
				}).catch(err => {
					this.loadStatus = "noMore";
					this.loading = false;
				});
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				// console.log(scrollTop);

			},
			//触底了
			setReachBottom() {
				this.query.page = this.goods.page + 1;
				this.getGoods();

			},
			inputFocus(e) {
				this.inputBottom = e.detail.height
			},
			inputBlur(e) {
				this.inputBottom = 0
			},
			sortTab(e) {
				this.query.page = 1;
				this.query.order = {};
				this.query.order[e.item.key] = e.item.value;
				this.getGoods();
			},
			moreTap(e) {

			},
			navSelect(index) {
				console.log(index);
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
				this.navIndex = index;
				var cate = this.cate[index];
				this.subCate = cate.sub_cate;
				this.query.cid = cate.id;
				this.query.page = 1;
				this.loading = true;
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
			cateTap() {
				uni.$emit('tabTap', 1);
			},
			messageTap() {
				uni.$emit("tabTap", 2);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg-gradual-red-white {
		background-image: linear-gradient(#f43f3b, #ec008c, #FFF);
	}

	.banner_one {
		width: 100%;
		height: 208rpx;
	}
</style>
