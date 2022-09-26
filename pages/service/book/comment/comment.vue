<template>
	<view class="content">
		<u-navbar fixed placeholder @leftClick="backTo"></u-navbar>
		<view class="inner-content" v-for="item in commentList">
			<u-cell-group title="1">
				<div slot="title" class="title">
					<u-avatar :src="image" text=""></u-avatar>
					<span style="margin-left: 20rpx;">{{item.userName}}</span>
				</div>
				<u-cell>
					<div slot="label">
						{{item.content}}
					</div>
					<div slot="value">
						<u-icon name="thumb-up-fill" v-if="item.myLikeState" :label="item.likeCount" @click="like(item)"></u-icon>
						<u-icon name="thumb-up" v-else :label="item.likeCount" @click="like(item)"></u-icon>
					</div>
				</u-cell>
			</u-cell-group>
		</view>
		<u-tabbar>
			<div class="tabbar">
				<u-input style="width: 60%;" v-model="commentContent"></u-input>
				<u-button style="width: 20%;" type="primary" @click="comment">评论</u-button>
			</div>
		</u-tabbar>
	</view>
</template>

<script>
	import { commentList, like, comment } from "../../../../api/book.js"
	export default {
		data() {
			return {
				query: {},
				pageNum: 1,
				pageSize: 10,
				commentList: [],
				image: require("../../../../static/image/a.jpg"),
				commentContent: ""
			}
		},
		methods: {
			getCommentList() {
				commentList({
					libraryId: this.query.id,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					this.commentList = res.data
				})
			},
			like(item) {
				like({
					like: !item.myLikeState,
					commentId: item.id
				}).then(res => {
					if(res.code == 200) {
						this.getCommentList()
					}
				})
			},
			comment() {
				comment({
					libraryId: this.query.id,
					content: this.commentContent
				}).then(res => {
					this.getCommentList()
				})
			},
			backTo() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad(option) {
			this.query = JSON.parse(decodeURIComponent(option.data))
			this.getCommentList()
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
		background-color: #f1f1f1;
		overflow:  scroll;
	}
	
	.inner-content {
		width: 98%;	
		margin: 5px auto;
		padding: 10px;
		background-color: white;
	}
	
	.title {
		display: flex;
	}
	
	.tabbar {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>
