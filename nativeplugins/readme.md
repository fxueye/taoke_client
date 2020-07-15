## 准备事项
	1.到百川控制台申请应用https://console.baichuan.taobao.com/applications.htm,获取到appkey。
	
	2.在百川控制台->我的产品后台申请开通百川电商权限
	
	3.在百川控制台->套件申请，申请开通套件
	
## 创建插件目录
	1.在插件页面的右上角下载插件示例代码，将插件目录Skw-AlibcSDK,拷贝到你的项目中的nativeplugins目录里。如果没有这个目录可以自行创建。
	
	2.替换安全图片，将插件目录下的安全图片替换为你在百川控制台获取到的安全图片
	
	android安全图片路径
   
	```
		nativeplugins/Skw-AlibcSDK/android/res/drawable/yw_1222.jpg

	```
	
	3.兼容支付宝sdk 如果你的项目中有使用到支付宝sdk，需要删除插件目录的相应文件
	
	删除 /nativeplugins/Skw-AlibcSDK/android/libs/utdid4all-1.5.2.jar
## 插件的使用
	初始化
	const plug= uni.requireNativePlugin('Skw-AlibcSDK');
	```
		plug.init(result=>{});  
	```
	打开淘宝商品
	```
		plug.openDetail({
					'itemId': itemId
				}, (ret) => {
					console.log(ret);
				});  
	```
	打开店铺
	```
		plug.openShop({
					'shopId': itemId
				}, (ret) => {
					console.log(ret);
				});  
	```
	
	login
	```
		plug.login( (ret) => {
					console.log(ret);
				});  
	```
	logout
	```
		plug.logout( (ret) => {
					console.log(ret);
				});  
	```
说明：sdk完善中....