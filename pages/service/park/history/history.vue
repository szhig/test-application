<template>
	<view class="content">
		<u-navbar title="停车记录" fixed placeholder @leftClick="backTo"></u-navbar>
		<view class="inner-content" v-for="item in historyList">
			<u-cell-group title='1' >
				
				<div slot="title">
					{{item.plateNumber}}
				</div>
				<u-cell :border="false">
					<div slot="icon">
						<u-avatar :src="image" shape="square" :size="160"></u-avatar>
					</div>
					<div slot="title" class="title">{{item.parkName}}</div>
					<div slot="label" class="label">
						<div>&yen;{{item.monetary}}</div>
						<div>时间：{{item.entryTime}}-{{item.outTime}}</div>
					</div>
				</u-cell>
			</u-cell-group>
		</view>
		<div @click="loadmore">
			<u-loadmore :status="status"></u-loadmore>
		</div>
	</view>
</template>

<script>
	import { parkHistory } from "../../../../api/park.js"
	export default {
		data() {
			return {
				historyList: [],
				pageNum: 1,
				pageSize: 6,
				status: 'loadmore',
				total: 0,
				image: require("../../../../static/image/park.jpg"),
				entryShow: false,
				outShow: false,
				time: {
					entryTime: "",
					outTime: ""
				}
			}
		},
		methods: {
			getHistoryList() {
				parkHistory({
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					this.historyList.push(...res.rows)
					this.status = "loadmore"
					this.total = res.total
					if(this.historyList.length == this.total) {
						this.status = 'loadmoreText'
					}
				})
			},
			loadmore() {
				if(this.historyList.length == this.total) {
					this.status = 'loadmoreText'
					return
				}
				this.pageNum ++
				this.status = "loading"
				this.getHistoryList()
			},
			backTo() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			this.getHistoryList()
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
		border-radius: 8px;
		background-color: white;
		line-height: 40rpx;
	}
	
	.u-cell-group {
		
	}
	
	.title, .label {
		margin-left: 15rpx;
	}
	.label {
		font-size: 24rpx;
	}
	.title {
		font-size: 28rpx;
	}
</style>
