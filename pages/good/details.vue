<template>
	<view>
		<skw-title-bar :isBack="true" :fixed="true">
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
				<swiper-item v-for="(item,index) in detailPics" :key="index">
					<image :src="item" mode="aspectFill"/>
				</swiper-item>
			</swiper>
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
				detailPics:{},
			}
		},
		onLoad:function(option) {
			console.log(option);
			this.id = option.id;
			this.goodsId = option.goodsId;
			this.getData();
		},
		onReady() {
			
		},
		methods:{
			getData(){
				getGoodDetails({id:this.id,goods_id:this.goodsId}).then((res)=>{
					console.log(res);
					if(res['code'] == "20000"){
						this.detailPics = res.data.goods_details.imgs.split(','); 
						console.log(this.detailPics);
					}
				}).catch((e)=>{
					console.log(e)
				})
			}
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
</style>
