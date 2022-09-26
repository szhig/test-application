<template>
	<view class="content">
		<u-navbar title="数字图书馆" @leftClick="backTo" fixed placeholder></u-navbar>
		<view class="inner-content">
			<u-cell-group title="1" v-for="item in bookList">
				<div slot="title" class="group-title">
					<span class="tag">{{businessType[item.businessState]}}</span>
					{{item.address}}
				</div>
				<u-cell @click="toInfo(item)">
					<div slot="icon">
						<u-avatar :src="item.imgUrl" :size="150" shape="square"></u-avatar>
					</div>
					<div slot="title" class="title">{{item.name}}</div>
					<div slot="label" class="label">
						<span>营业时间：{{item.businessHours}}</span>
					</div>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import { bookAllList } from "../../../api/book.js"
	import operate from "../../../utils/operate.js"
	export default {
		data() {
			return {
				bookList: [],
				businessType: {
					'0': '暂停营业',
					'1': "营业中"
				}
			}
		},
		methods: {
			getBookList() {
				bookAllList({
					pageNum: 1,
					pageSize: 10
				}).then(res => {
					if(res.code == 200) {
						this.bookList = res.rows
						this.bookList.forEach(item => {
							item.imgUrl = operate.api + item.imgUrl
						})
					}
				})
			},
			toInfo(item) {
				let data = {
					id: item.id
				}
				uni.navigateTo({
					url: "/pages/service/book/info/info?data=" + encodeURIComponent(JSON.stringify(data)) ,
				})
			},
			backTo() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			this.getBookList()
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
	.inner-content {
		width: 99.9%;
		margin: 0 auto;
	}
	
	.u-cell-group {
		margin: 4px;
		background-color: white;
	}
	
	:webkit-scrollbar {
		display: none;
	}
	
	.label,.title {
		margin-right: 20px;
	}
	
	.group-title{
		font-size: 20rpx;
	}
	.title {
		font-size: 30rpx;
		font-weight: 500;
	}
	.label {
		font-size: 20rpx;
	}
	.tag {
		color: white;
		background-color: #007AFF;
		font-size: 22rpx;
		padding: 4rpx 10rpx;
		margin: 20rpx;
	}
</style>
