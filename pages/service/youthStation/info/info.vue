<template>
	<view class="content">
		<u-navbar fixed placeholder @leftClick="backTo"></u-navbar>
		<view class="inner-content">
			<u-swiper :list="info.imageUrlList" :height="400"></u-swiper>
			<div>
				<p class="description">地址：{{info.address}}</p>
				<p class="description">联系方式：{{info.phone}}</p>
				<p class="description">入住时间段：{{info.workTime}}</p>
				<p class="description">剩余床位数：男{{info.bedsCountBoy}}
					<span style="display: inline-block; width: 25rpx;"></span>
					{{info.bedsCountGirl}}
				</p>
			</div>
		</view>
		<view class="inner-content">
			<u-tabs :list='types' :scrollable="false" @change="changeTab"></u-tabs>
			<p class="description">
				{{showText}}
			</p>
		</view>
	</view>
</template>

<script>
	import { youthInfo } from "../../../../api/talent.js" 
	import operate from "../../../../utils/operate.js"
	export default {
		data() {
			return {
				query: {},
				info: {},
				types: [{
					name:' 公寓介绍',
					label: "introduce"
				},{
					name:' 房间配置',
					label: "internalFacilities"
				},{
					name:' 周边配套',
					label: "surroundingFacilities"
				},{
					name:' 特色服务',
					label: "specialService"
				}],
				showText: ""
			}
		},
		methods: {
			getYouthInfo() {
				youthInfo(this.query.id).then(res => {
					this.info = res.data
					this.info.coverImgUrl = operate.api + this.info.coverImgUrl
					this.info.imageUrls = operate.api + this.info.imageUrls
					this.info.imageUrlList = this.info.imageUrlList.map(item => {
						return item = operate.api + item
					})
					this.showText = this.info[this.types[0].label]
				})
			},
			changeTab(item) {
				this.showText = this.info[item.label]
			},
			backTo() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(option) {
			let data = JSON.parse(decodeURIComponent(option.data))
			this.query = data
			this.getYouthInfo()
		},
		mounted() {
		}
	}
</script>

<style scoped> 
	.content {
		width: 100%;
		height: 100%;
		background-color: #f1f1f1;
		overflow: scroll;
	}
	
	.content::-webkit-scrollbar {
		display: none;
	}
	
	.inner-content {
		width: 98%;	
		margin: 5px auto;
		padding: 10px;
		border-radius: 8px;
		background-color: white;
		line-height: 40rpx;
	}
	
	.description {
		margin-top: 25rpx;
		text-indent: 2em !important;
		font-size: 26rpx;
	}
</style>
