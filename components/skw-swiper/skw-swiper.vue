<template>
	<view class="swiper-box">
		<swiper class="screen-swiper square-dot" indicator-dots circular autoplay interval="5000" duration="500">
			<swiper-item v-for="(item,index) in data" :key="index">
				<view>
					<image :src="item.img" mode="widthFix"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'skw-swiper',
		data() {
			return {}
		},
		props: {
			data: {
				type: Array,
				default: () => {
					return [{
						id: 0,
						img: 'https://img.alicdn.com/imgextra/i4/2053469401/O1CN01kyBlPz2JJi0p0IQv7_!!2053469401.jpg'
					}, {
						id: 1,
						img: 'https://img.alicdn.com/imgextra/i4/2053469401/O1CN01kyBlPz2JJi0p0IQv7_!!2053469401.jpg'
					}]
				}

			}
		},
		methods: {

		}

	}
</script>

<style lang="scss" scoped>
	.swiper-box {
		width: 100%;
		padding: 25rpx;
		

		.screen-swiper {
			height: 276rpx;
			min-height: 276rpx;

			.swiper-item {
				border-radius: 10rpx;
			}
		}
	}
</style>
