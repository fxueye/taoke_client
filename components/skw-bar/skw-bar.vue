<template>
	<view class="cu-bar tabbar bg-white bottom-fixed">
		<block v-for="(tab,idx) in data">
			<view class="action" :class="sindex == idx ? 'text-red':'text-gray'" @tap="tabTap(idx)">
				<view :class="sindex == idx ? tab.iconFill : tab.icon "></view> {{tab.name}}
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'skw-bar',

		props: {
			index: {
				type: Number,
				default: 0,
			},
			data: {
				type: Array,
				default: () => {
					return [{
							name: '首页',
							icon: 'cuIcon-home',
							iconFill: 'cuIcon-homefill'
						},
						{
							name: '分类',
							icon: 'cuIcon-similar',
							iconFill: 'cuIcon-similar'
						},
						{
							name: '消息',
							icon: 'cuIcon-message',
							iconFill: 'cuIcon-messagefill'
						},
						{
							name: '我的',
							icon: 'cuIcon-my',
							iconFill: 'cuIcon-myfill'
						}
					]
				}
			}
		},
		created() {
			this.sindex = this.index;
		},
		data() {
			return {
				sindex: 0,
			};
		},
		watch: {
			index() {
				this.sindex = this.index;
			}
		},
		methods: {
			tabTap(index) {
				if (index != this.index) {
					this.$emit('tabTap', index);
				}

			}
		}
	}
</script>

<style>
	.bottom-fixed {
		position: fixed;
		z-index: 999999;
		width: 100%;
		bottom: 0;
		left: 0;
	}
</style>
