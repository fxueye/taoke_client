<script>
	export default {
		globalData: {
			text: 'text'
		},
		onLaunch: function() {
			this.init().catch(() => {
				console.log('init fail');
			})
			this.checkVersion().catch(() => {
				console.log('checkversion fail');
			});
			// console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifndef APP-PLUS */
	@import "static/colorui/main.css";
	@import "static/colorui/icon.css";
	@import "static/app/style/app.scss";
	/* #endif */
</style>
