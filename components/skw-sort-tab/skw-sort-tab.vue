<template>
	<view class="sort-tab-box">
		<scroll-view scroll-x class="nav">
			<view class="flex text-center">
				<block v-for="(item,index) in data" :key="index">
					<view class="cu-item flex-sub flex" :class="index==tabCur?'select':''" @tap="sortTab(item,index)" :data-id="index">
						<view :class="index == tabCur?'text-red':''" class="flex tab-item">
							<text>{{item.title}}</text>
							<view v-if="item.fold" class="flex flex-direction justify-center">
								<text class="cuIcon-fold fold" :class="item.value == 'ASC' && index == tabCur ? 'text-red':'text-black'"></text>
								<text class="cuIcon-unfold fold" :class="item.value == 'DESC' && index == tabCur ? 'text-red':'text-black'"></text>
							</view>
						</view>
					</view>

				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'skw-sort-tab',
		data() {
			return {
				tabCur: 0,
			}
		},
		props: {
			data: {
				type: Array,
				default: () => {
					return [{
							title: '人气',
							key: 'hot_push',
							value: 'DESC',
							fold: false,
						},
						{
							title: '最新',
							key: 'create_time',
							value: 'DESC',
							fold: false,
						},
						{
							title: '销量',
							key: 'month_sales',
							value: 'DESC',
							fold: true,
						},
						{
							title: '价格',
							key: 'actual_price',
							value: 'ASC',
							fold: true,
						}
					]
				}
			},
			scrollTop: {
				type: Number,
				default: 436
			},
			index:{
				type:Number,
				default:0,
			}
		},
		methods: {
			sortTab(item, index) {

				if (this.tabCur == index && item.fold) {
					item.value = item.value == 'ASC' ? 'DESC' : 'ASC';
				}
				uni.pageScrollTo({
					scrollTop: uni.upx2px(this.scrollTop),
					duration: 200
				});
				this.tabCur = index;

				this.$emit('sortTab', {
					item,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sort-tab-box {
		position: sticky;
		padding: 2rpx 0;
		transition: all .25s;
		z-index: 1;
		background: #fff;

		/* #ifndef MP */
		top: calc(var(--status-bar-height) + 101rpx);
		/* #endif */

		/* #ifdef MP */
		top: calc(var(--status-bar-height) + 161rpx);
		/* #endif */

	}

	.tab-item {
		height: 100%;
	}

	.fold {
		line-height: 50%;
	}
</style>
