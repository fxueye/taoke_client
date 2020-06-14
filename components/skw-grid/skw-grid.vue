<template>
	<view>
		<view class="cu-list grid col-5 no-border">
			<view class="cu-item align-center" v-for="(item,index) in data" :key="index" @click="onClick(item)">
				<image class="icon" :src="item.icon" mode="widthFix" lazy-load>
					<view class="cu-tag badge" v-if="item.badge && item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</image>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'skw-grid',
		props: {
			data: {
				type: Array,
				default: () => {
					return []
				}
			},
			loadStatus: {
				type: String,
				default: 'more'
			}
		},
		data() {
			return {

			}
		},
		methods: {
			onClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon{
		height: 80rpx;
		width: 80rpx;
	}
</style>
