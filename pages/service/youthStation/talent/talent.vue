<template>
	<view class="content">
		<u-navbar fixed placeholder @leftClick="backTo"></u-navbar>
		<view class="inner-content">
			<image :src="info.imgUrl" mode="aspectFill" style="width: 100%;"></image>
			<p class="description">
				{{info.introduce}}
			</p>
		</view>
		
		<view class="inner-content" v-for="item in policyList">
			<u-cell :border="false" @click="toInfo(item)">
				<div slot="title">
					{{item.title}}
				</div>
				<div slot="label">
					{{item.createTime}}
				</div>
			</u-cell>
		</view>
	</view>
</template>

<script>
	import { talentInfo, talentPolicy } from "../../../../api/talent.js"
	import operate from "../../../../utils/operate.js"
	export default {
		data() {
			return {
				query: {},
				info: {},
				policyList: []
			}
		},
		methods: {
			getTalentInfo() {
				talentInfo(this.query.id).then(res => {
					this.info = res.data
					this.info.imgUrl = operate.api + this.info.imgUrl
				})
			},
			getTalentPolicyList() {
				talentPolicy({
					areaId: this.query.id,
					pageNum: 1,
					pageSize: 8
				}).then(res => {
					this.policyList = res.data
				})
			},
			toInfo(item) {
				let data ={
					id: item.id
				}
				uni.navigateTo({
					url: "/pages/service/youthStation/talent/info/info?data=" + encodeURIComponent(JSON.stringify(data))
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
			this.getTalentInfo()
			this.getTalentPolicyList()
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
