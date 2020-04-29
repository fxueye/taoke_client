<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor='bg-white'>
			<block slot="content">{{title}}</block>
		</bar-title>
		
		<!--状态图标-->
		<view class="app-status-view">
			<image class="status-img" src="/static/app/img/pay.png" mode="widthFix"/>
			<view class="bg-red status-bg-view">
				<text class="cuIcon-check icon"></text>
			</view>
		</view>
		
		<!--状态标题-->
		<view class="text-bold text-black text-xl text-center">{{title}}</view>
		
		<!--状态说明-->
		<view class="text-gray text-sm text-center app-padding"> {{introduce}} </view>
		
		<!--按钮-->
		<view class="app-btn-view">
			<button class="cu-btn radius line-red">查看订单详情</button>
		</view>
		
		<!--广告信息-->
		<view class="app-padding app-ad-view">
			<view class="text-gray text-sm text-center">
				<text>扫描下方二维码，或打开微信搜索【</text>
				<text class="text-blue">测试的内容</text>
				<text>】 ,微信关注公众号【</text>
				<text class="text-blue">测试的内容</text>
				<text>】优惠信息早知道，更多福利等你来拿!</text>
			</view>
			<view class="qrcode-img-view">
				<image class="qrcode-img" src="/static/images/reward/qrcode.png" mode="widthFix"/>
			</view>
		</view>
		
	</view>
</template>

<script>
	//各种状态显示内容，可自行修改或判断法显示，这里我就不一一写出来了。
	
	import barTitle from '@/components/base/bar-title';
	import utils from '@/common/utils.js';
	export default {
		components: {
			barTitle,
		},
		data() {
			return {
				title: '支付成功', introduce: '平台已收到您的钱款，已通知卖家发货。平台会及时通知您的交易状态，请您关注。',
			}
		},
		onLoad() {
			
		},
		onReady() {
			utils.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/app/style/app.scss";
	/* #endif */
	@import "../../static/app/style/pay-status.scss";
</style>
