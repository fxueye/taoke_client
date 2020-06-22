<template>
	<view class="app-message-box">
		<skw-title-bar :isBack="true" :fixed="true">
			<block slot="content">
				<text>消息中心</text>
			</block>
			<block slot="right">
				<text class="cuIcon-settings white"></text>
			</block>
		</skw-title-bar>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import skwTitleBar from '@/components/skw-title-bar/skw-title-bar';

	export default {
		name: "message",
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
				toolsList: []
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
			settings(e) {

			}


		}
	}
</script>

<style lang="scss" scoped>
	.app-message-box {
		width: 100%;

	}
</style>
