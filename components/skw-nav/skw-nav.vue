<template>
	<view class="flex">
		<view class="basis-xxl">
			<scroll-view scroll-x class="bg-gradual-red nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" v-for="(item,idx) in data" :class="sindex==idx?'text-white cur':''" :key="idx" @tap="navSelect(idx)">
					{{item.name}}
				</view>
			</scroll-view>
		</view>
		<view class="cate basis-xxs">
			<view class="sort-icon text-white" @tap="cateTap">
				<text class="cuIcon-sort" />
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "skw-nav",
		props: {
			index: {
				type: Number,
				default: 0,
			},
			data: {
				type: Array,
				default: () => {
					return [{
							name: '首页'
						},
						{
							name: '分类',
						},
						{
							name: '消息',
						},
						{
							name: '我的',
						},
						{
							name: '我的',
						},
						{
							name: '我的',
						},
						{
							name: '我的',
						},
						{
							name: '我的',
						}
					]
				}
			}
		},
		data() {
			return {
				scrollLeft: 0,
				sindex: 0,
			}
		},
		created() {
			this.sindex = this.index;
		},

		watch: {
			index() {
				this.sindex = this.index;
				this.scrollLeft = (this.index - 1) * uni.upx2px(120);
			}
		},
		methods: {
			navSelect(index) {
				console.log(index);
				if (index != this.index) {
					this.$emit('navSelect', index);
				}

			},
			cateTap() {
				this.$emit('cateTap');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav .cu-item {
		height: 64rpx;
		display: inline-block;
		line-height: 64rpx;
		margin: 0 10rpx;
		padding: 0 20rpx;
	}
	.cate{
		background-color: #ec008c;
	}

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
</style>
