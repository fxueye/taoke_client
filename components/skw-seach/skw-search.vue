<template>
	<view class="cu-bar search">
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input :adjust-position="false" type="text" placeholder="搜索商品名称或者宝贝标题"
			 confirm-type="search"></input>
		</view>
		<view class="action text-white">
			<text class="cuIcon-message" @tap="messageTap" />
		</view>
	</view>
</template>

<script>
	export default{
		name:'skw-search',
		data(){
			return {}
		},
		methods:{
			messageTap(e){
				this.$emit("messageTap");
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
