<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.init().then().catch()
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "app.css";
	@import "static/colorui/main.css";
	@import "static/colorui/icon.css";
</style>
