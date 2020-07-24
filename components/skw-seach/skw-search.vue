<template>
	<view class="cu-bar search">
		<view class="action text-white" v-if="isBack">
			<text class="cuIcon-back" @tap="backPage"/>
			<text>{{backText}}</text>
		</view>
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input :adjust-position="false" type="text" :disabled="disabled" @input="input" @focus="focus" @confirm="confirm"
			 @blur="blur" @keyboardheightchange="keyboardheightchange" placeholder="搜索商品名称或者宝贝标题" confirm-type="search" :value="word"></input>
		</view>
		<view class="action text-white">
			<text class="cuIcon-message" @tap="messageTap" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'skw-search',
		data() {
			return {}
		},
		props: {
			disabled: {
				type: Boolean,
				default: false
			},
			isBack: {
				type: Boolean,
				default: false
			},
			backText: {
				type: String,
				default: ""
			},
			word:{
				type:String,
				default:""
			}
		},
		methods: {
			messageTap(e) {
				this.$emit("messageTap");
			},
			input(e) {
				this.$emit("input", e);
			},
			focus(e) {
				this.$emit("focus", e);
			},
			blur(e) {
				this.$emit("blur", e);
			},
			confirm(e) {
				this.$emit("confirm", e);
			},
			keyboardheightchange(e) {
				this.$emit("keyboardheightchange", e);
			},
			backPage() {
				uni.navigateBack();
			},


		}
	}
</script>

<style lang="scss" scoped>

</style>
