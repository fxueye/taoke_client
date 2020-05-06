<template>
	<view>
		<view class="home-header">
			<view class="home-nav">
				<skw-search></skw-search>
				<skw-nav :index="navIndex" @navSelect="navSelect"></skw-nav>
			</view>
		</view>
		<view></view>
		<skw-swiper></skw-swiper>
		<skw-grid></skw-grid>
		<skw-goods :data="goods.items" :loadStatus="loadStatus"></skw-goods>

	</view>
</template>

<script>
	import skwSearch from '@/components/skw-seach/skw-search'
	import skwNav from '@/components/skw-nav/skw-nav'
	import skwSwiper from '@/components/skw-swiper/skw-swiper'
	import skwGrid from '@/components/skw-grid/skw-grid'
	import skwGoods from '@/components/skw-goods/skw-goods'


	import {
		mapGetters
	} from 'vuex';

	export default {
		name: "home",
		computed: {
			...mapGetters('app', {
				cate: 'cate',
				goods: 'goods',
				banner: 'banner'
			}),
		},
		components: {
			skwSearch,
			skwNav,
			skwSwiper,
			skwGrid,
			skwGoods
		},
		props:{
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
					size: 100
				},
				loadStatus: 'more',
				inputBottom: 0,
				navIndex: 0,
			};
		},
		methods: {
			getData() {
				this.loadStatus = "loading"
				this.$store.dispatch('app/get_goods', this.query).then(res => {
					this.loadStatus = "more";
				}).catch(err => {
					this.loadStatus = "noMore";
				});
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				console.log(scrollTop);
			
			},
			//触底了
			setReachBottom() {
				this.query.page = this.goods.page + 1;
				this.getData();
			
			},
			inputFocus(e) {
				this.inputBottom = e.detail.height
			},
			inputBlur(e) {
				this.inputBottom = 0
			},
			navSelect(index) {
				console.log(index);
				this.navIndex = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-header {
		height: 164rpx;
		display: block;
		position: relative;

		.home-nav {
			position: fixed;
			width: 100%;
			top: 0;
			z-index: 9999;
			padding-top: var(--status-bar-height);
		}
	}
</style>
