<template>
	<view class="content">
		<u-navbar title="图书馆详情" @leftClick="backTo" fixed placeholder></u-navbar>
		<view class="inner-content">
			<image :src="info.imgUrl" mode="aspectFill" style="width: 100%;"></image>
			<text>
				{{info.name}}
				<span class="tag">{{businessType[info.businessState]}}</span>
			</text>
			<p class="description">
				{{info.description}}
			</p>
			<p class="description">
				地址：{{info.address}}
			</p>
			<p 
				营业时间：{{info.businessHours}}
			</p>
		</view>
		<u-button type="primary" style="width: 98%;margin: 10px auto;" @click="toComment">评论</u-button>
	</view>
</template>

<script>
	import { bookInfo } from "../../../../api/book.js"
	import operate from "../../../../utils/operate.js"
	export default {
		data() {
			return {
				query: {},
				info: {},
				businessType: {
					'0': '暂停营业',
					'1': "营业中"
				}
			}
		},
		methods: {
			getBookInfo() {
				bookInfo(this.query.id).then(res => {
					this.info = res.data
					this.info.imgUrl = operate.api + this.info.imgUrl
				})
			},
			backTo() {
				uni.navigateBack({
					delta:1
				})
			},
			toComment() {
				let data = {
					id: this.info.id
				}
				uni.navigateTo({
					url: "/pages/service/book/comment/comment?data=" + encodeURIComponent(JSON.stringify(data))
				})
			}
		},
		onLoad(option) {
			this.query = JSON.parse(decodeURIComponent(option.data))
			this.getBookInfo()
		}
	}
</script>

<style scoped>
	
	.content {
		width: 100%;
		height: 100%;
		background-color: #f1f1f1;
	}
	
	.inner-content {
		width: 98%;	
		margin: 5px auto;
		padding: 10px;
		background-color: white;
	}
	
	img {
		width: 100%;
	}
	
	.description {
		margin-top: 25rpx;
		text-indent: 2em !important;
		font-size: 26rpx;
	}
	
	
	.description >>> .u-tag {
		justify-content: center !important;
	}
	
	.tag {
		color: white;
		background-color: #007AFF;
		font-size: 22rpx;
		padding: 4rpx 10rpx;
		margin: 20rpx;
	}
</style>
