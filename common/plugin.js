class plugin {
	constructor() {
		this.inited = false;
		this.alibcsdk = uni.requireNativePlugin('Skw-AlibcSDK');
	}
	init(){
		if(!this.inited){
			this.alibcsdk.init(res => {
				console.log(res);
				this.inited = true;
			})
		}
	}
	
}
const p = new plugin()
export default p;
