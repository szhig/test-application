<template>
	<view class="content">
		<u-navbar title="停车场" @leftClick="backTo" fixed placeholder border :rightIcon="'list'" @rightClick="toHistoryPark"></u-navbar>
		
		<view class="inner-content">
			<u-cell v-for="item in parkList" isLink @click="toInfo(item)">
				<div slot="title" class="title">
					{{item.parkName}}
				</div>
				<div slot="label" class="label">
					{{item.address}}
				</div>
				<div slot="right-icon">
					<div class="park-info">
						<p>距离：{{item.distance}}km</p>
						<p>空位个数：{{item.vacancy}}个</p>
						<p>收费：&yen;{{item.rates}}</p>
					</div>
					<div>
					</div>
				</div>
			</u-cell>
		</view>
		<view class="" @click="loadmore">
			<u-loadmore :height="80" :status="status" :loadingText="'正在拼命加载中...'" :loadmoreText="loadmoreText"></u-loadmore>
		</view>
		
	</view>
</template>

<script>
	import { parkList } from "../../../api/park.js"
	import operate from "../../../utils/operate.js"
	export default {
		data() {
			return {
				parkList: [],
				pageNum: 1,
				pageSize: 6,
				status: 'loadmore',
				total: 0,
				loadmoreText: "查看更多"
			}
		},
		methods: {
			backTo() {
				uni.navigateBack({
					delta: 1
				})
			},
			getParkList() {
				parkList({
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res);
					this.status = "loadmore"
					this.total = res.total
					if (this.total == this.parkList.length) {
						this.loadmoreText = "暂无更多"
						this.status = "nomore"
					}
					this.parkList.push(...res.rows)
				})
			},
			
			toHistoryPark() {
				uni.navigateTo({
					url: "/pages/service/park/history/history"
				})
			},
			
			loadmore() {
				if (this.status == 'nomore') {
					ret
				}
				this.status = "loading"
				this.pageNum++
				this.getParkList()
			},
			
			toInfo(item) {
				
				let data = {
					id: item.id
				}
				
				uni.navigateTo({
					url: "/pages/service/park/info/info?data=" + encodeURIComponent(JSON.stringify(data)),
				})
			}
		},
		onLoad() {
			this.getParkList()
		}
	}
</script>

<style scoped>
	.content {
		height: 100%;
	}
	.inner-content {
		margin: 0px 5px 0;
		padding-top: 10px;
	}
	
	.park-info {
		color: #007AFF;
	}
	
	.title {
		font-size: 34rpx;
	}
	
	.label {
		font-size: 24rpx;
	}
</style>
