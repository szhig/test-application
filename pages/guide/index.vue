<template>
	<view class="content">
		<u-swiper :list="images" 
				:style="{'height': '100%', 'width': '100%'}" 
				indicator indicatorMode="dot"
				@change="changeImage"></u-swiper>
	</view>
</template>

<script>
	import { allServerList } from "../../api/common.js"
	export default {
		data() {
			return {
				title: 'Hello',
				images: [require("../../static/index/1.jpg"),
				require("../../static/index/2.jpg"),
				require("../../static/index/3.jpg")]
			}
		},
		onLoad() {

		},
		methods: {
			getAllServer () {
				allServerList().then(res => {
					console.log(res);
				})
			},
			changeImage(index) {
				if((this.images.length -1) == index.current) {
					uni.redirectTo({
						url: "/pages/index/index/index"
					})
				}
			}
		},
		mounted() {
			this.getAllServer()
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
	}
	
	.u-swiper >>> .u-swiper__wrapper__item__wrapper__image {
		height: 100% !important;
	}
	
	.u-swiper >>> .u-swiper__wrapper {
		height: 100% !important;	
	}
</style>
