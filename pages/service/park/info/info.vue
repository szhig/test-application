<template>
	<view>
		<u-navbar :title="park.parkName" border @leftClick="backTo" fixed placeholder></u-navbar>
		<view class="content">
			<u-icon name="tags-fill" :label="park.parkName"></u-icon>
			<u-tag :text="park.open == 'Y' ? '对外开放' :	 '暂未对外开放'" style="width: 100px;text-align: center;"></u-tag>
			<u-icon name="attach" :label="'地址' + park.parkName"></u-icon>
			<u-icon name="attach" :label="'距离' + park.address"></u-icon>
			<u-icon name="attach" :label="'停车费' + park.rates"></u-icon>
			<u-icon name="attach" :label="'剩余车位' + park.vacancy"></u-icon>
			<u-icon name="attach" :label="'收费参考' + park.rates + '/小时'"></u-icon>
		</view>
	</view>
</template>

<script>
	import { parkInfo } from "../../../../api/park.js"
	export default {
		data() {
			return {
				query: {},
				park: {}
			}
		},
		methods: {
			getParkInfo() {
				parkInfo(this.query.id).then(res => {
					this.park = res.data
				})
			},
			
			backTo() {
				uni.navigateBack({
					delta: 2
				})
			}
		},
		onLoad(option) {
			let data = JSON.parse(decodeURIComponent(option.data))
			this.query = data
			
			this.getParkInfo()
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		padding-left: 15px;
	}
	
	.content * {
		height: 30px;
	}
</style>
