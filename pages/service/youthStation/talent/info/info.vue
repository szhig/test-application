<template>
	<view class="content">
		<u-navbar fixed placeholder @leftClick="backTo"></u-navbar>
		<view class="inner-content">
			<p class="title">{{info.title}}</p>
			<p v-html="info.content" class="description"></p>
			<p class="create">{{info.createTime}}</p>
		</view>
	</view>
</template>

<script>
	import { talentPolicyInfo } from "../../../../../api/talent.js"
	export default {
		data() {
			return {
				query: {},
				info: {}
			}
		},
		methods: {
			getTalentPolicyInfo() {
				talentPolicyInfo(this.query.id).then(res => {
					console.log(res);
					this.info = res.data
				})
			},
			backTo() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(option) {
			this.query = JSON.parse(decodeURIComponent(option.data))
			
			this.getTalentPolicyInfo()
		}
	}
</script>

<style>
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
		/* text-indent: 2em !important; */
		font-size: 20rpx;
	}
	
	.title {
		text-align: center;
		font-size: 34rpx;
	}
	
	.create {
		text-align: right;
		font-size: 26rpx;
	}
</style>
