<template>
	<view>
		<skw-title-bar :isBack="true" :fixed="true" :opacity="opacity">
			<block slot="content">
				<text>{{title}}</text>
			</block>
			<block slot="right">
				<text class="cuIcon-forward white"/>
				<text class="cuIcon-more white"/>
			</block>
		</skw-title-bar>
		<!-- <view class="status-bar-height"></view> -->
		<view class="goods-images">
			<swiper class="screen-swiper" circular autoplay>
				<swiper-item v-for="(img,index) in imgs" :key="index">
					<image :src="img" mode="aspectFill"/>
				</swiper-item>
			</swiper>
		</view>
		<view class="goods-detail">
			<block v-for="(item,index) in detailPics">
				<image class="image" :src="item.img" mode="widthFix"></image>
			</block>
		</view>
		<skw-floating-button :visible="showFloatingButton" @click="goTop"></skw-floating-button>
		
		<view class="cu-bar bg-white tabbar border shop bottom-fixed">
			<button class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<view class="cu-tag badge"></view>
				</view> 客服
			</button>
			<view class="action">
				<view class="cuIcon-favorfill text-green">
					<view class="cu-tag badge">99</view>
				</view>
				收藏
			</view>
			<view class="btn-group">
				<button class="cu-btn bg-orange round shadow-blur">口令购买</button>
				<button class="cu-btn bg-red round shadow-blur">领券购买</button>
			</view>
		</view>
		
	</view>

</template>

<script>
	import skwTitleBar from '@/components/skw-title-bar/skw-title-bar';
	import utils from '@/common/utils.js';
	import{getGoodDetails} from '@/common/api.js';
	
	export default{
		name:"good-details",
		components:{
			skwTitleBar
		},
		created(){
			
		},
		data(){
			return{
				title:"商品详情",
				id:0,
				goodsId:0,
				imgs:{},
				detailPics:{},
				scrollY:0,
				showFloatingButton:false,
				opacity:0
			}
		},
		onLoad:function(option) {
			console.log(option);
			this.id = option.id;
			this.goodsId = option.goodsId;
			this.getData();
		},
		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			if (this.scrollY > 350) {
				this.showFloatingButton = true;
			} else {
				this.showFloatingButton = false;
			}
			if(this.scrollY < 100){
				this.opacity = this.scrollY / 100;
			}else{
				this.opacity = 1;
			}
			console.log(e.scrollTop);
		},
		onReachBottom(e) {
		
			this.scrollBottom = this.scrollY;
		},
		onReady() {
			
		},
		methods:{
			getData(){
				getGoodDetails({id:this.id,goods_id:this.goodsId}).then((res)=>{
					console.log(res);
					if(res['code'] == "20000"){
						this.imgs = res.data.goods_details.imgs.split(','); 
						this.detailPics = JSON.parse(res.data.goods_details.detail_pics);
						console.log(this.detailPics);
					}
				}).catch((e)=>{
					console.log(e)
				})
			},
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 200
				});
			},
		}
		
		
	}
</script>

<style lang="scss" scoped>
	.goods-images{
		width: 100%;
		.screen-swiper {
			min-height: 750rpx;
		}
		
	}
	.goods-detail{
		display: flex;
		flex-direction: column;
		align-items: center;
		.image{
			width: 100%;
		}
	}
	.bottom-fixed {
		position: fixed;
		z-index: 999999;
		width: 100%;
		bottom: 0;
		left: 0;
	}
</style>
