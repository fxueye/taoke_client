<template>
	<view class="app-grid-sort-view">
		<view class="bg-white cu-list grid col-5 no-border">
			<block v-for="(item,index) in list_data" :key="index" v-if="index < 9">
				<view class="cu-item" @tap="listTap(item,index)">
					<view class="grid-icon">
						<image :src="item.icon" mode="widthFix"/>
					</view>
					<text>{{item.name}}</text>
				</view>
			</block>
			<view class="cu-item" @tap="moreTap()">
				<view class="grid-icon">
					<image src="/static/app/img/more.png" mode="widthFix"/>
				</view>
				<text>更多</text>
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/common/utils.js';
	export default {
		name: 'grid-sort-list',
		props: {
			list_data: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		methods: {
			moreTap() {
				let index = this.list_data.length;
				this.listTap({type: 'more'},index);
			},
			listTap(data,index) {
				this.$emit('listTap', {
					data,
					index
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-grid-sort-view {
		.grid-icon {
			margin: 0 30rpx;
		}
	}
</style>
