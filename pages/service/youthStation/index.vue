<template>
	<view class="content">
		<u-navbar fixed placeholder @leftClick="backTo"></u-navbar>
		<view class="inner-content">
			<image :src="image" mode="aspectFill" style="width: 100%;"></image>
			<p class="description">
				青年驿站是“青年安居计划”的重要服务载体，由共青团联合社会机构为高校应届毕业生免费提供短期住宿和就业指导等服务的公益项目，求职的青年人才最长可以7天免费住宿。
			</p>
		</view>
		<view class="inner-content">
			<u-grid col="3">
				<u-grid-item v-for="item in talents" @click="toTalentInfo(item)">
					<image :src="item.imgUrl" mode="aspectFill" style="width: 200rpx; height: 200rpx"></image>
					<text>{{item.name}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="inner-content" v-for="item in youthList">
			<u-cell @click="toInfo(item)">
				<div slot='icon'>
					<u-avatar :size="180" shape="square" :src="item.coverImgUrl"></u-avatar>
				</div>
				<div slot="title" class="title">{{item.name}}</div>
				<div slot="label" class="label">
					<div>
						剩余床位：
						<span>男：{{item.bedsCountBoy}}/位</span>
						<span style="display: inline-block; width: 25rpx;"></span>
						<span>女：{{item.bedsCountGirl}}/位</span>
					</div>
					<div>
						<span>地址：{{item.address}}</span>
					</div>
				</div>
			</u-cell>
			<u-read-more openText="介绍" :toggle="true" :showHeight="0" closeText="介绍" class="read-more">
				<rich-text :nodes="item.introduce" ></rich-text>
			</u-read-more>
		</view>
	</view>
</template>

<script>
	import { talentList, youthAllList } from '../../../api/talent.js'
	import operate from "../../../utils/operate.js"
	export default {
		data() {
			return {
				image: require("../../../static/image/youthStation.jpeg"),
				talents: [],
				youthList: []
			}
		},
		methods: {
			getTalentList() {
				talentList().then(res => {
					this.talents = res.data
					this.talents.forEach(item => {
						item.imgUrl = operate.api + item.imgUrl
					})
				})
			},
			getYouthList() {
				youthAllList({
					pageNum: 1,
					pageSize: 8
				}).then(res => {
					this.youthList = res.rows
					this.youthList.forEach(item => {
						item.coverImgUrl = operate.api + item.coverImgUrl
					})
				})
			},
			toInfo(item) {
				let data ={
					id: item.id
				}
				uni.navigateTo({
					url: '/pages/service/youthStation/info/info?data=' + encodeURIComponent(JSON.stringify(data))
				})
			},
			toTalentInfo(item) {
				let data ={
					id: item.id
				}
				uni.navigateTo({
					url: "/pages/service/youthStation/talent/talent?data=" + encodeURIComponent(JSON.stringify(data)) 
				})
			},
			backTo() {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad() {
			this.getTalentList()
			this.getYouthList()
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
	
	.title {
		font-size: 32rpx;
		margin-left: 10rpx;
	}
	
	.label {
		font-size: 20rpx;
		margin-left: 10rpx;
	}
	
	.inner-content >>> .u-cell__body__content {
		align-items: flex-start !important;
	}
	
	.u-cell {
		margin-top: 10rpx;
	}
	
	.inner-content >>> .u-read-more__toggle{
		background-image: none !important;
	}
	
	.inner-content >>> .u-read-more__content {
		font-size: 22rpx !important;
	}
</style>
