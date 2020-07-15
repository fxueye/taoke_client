let data = {
	backgorund: [
		'/static/images/home/swiper/swiper-background-1.png',
		'/static/images/home/swiper/swiper-background-2.png',
		'/static/images/home/swiper/swiper-background-3.png',
	],
	sortList: [{
			title: '人气',
			key: 'coupon_receive_num',
			value: 'DESC',
		},
		{
			title: '最新',
			key: 'create_time',
			value: 'DESC'
		},
		{
			title: '销量',
			key: 'month_sales',
			value: 'DESC',
		},
		{
			title: '价格',
			key: 'actual_price',
			value: 'ASC'
		}
	]
}
export default data;
