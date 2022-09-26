<template>
	<view>
		<u-navbar title="意见反馈" fixed placeholder @leftClick="backTo"></u-navbar>
		<view class="inner-content">
			<u-input placeholder="请在此输入此次反馈的标题" v-model="feedBack.title"></u-input>
			<u-textarea :height="150" :maxlength="150" placeholder="请输入您对我们的宝贵意见" max count v-model="feedBack.content"
				style="margin-top: 20px;"
			></u-textarea>
			<u-button type="primary" style="margin-top: 20px;" @click="sendFeedBack">提交</u-button>
		</view>
	</view>
</template>

<script>
	import { feedback } from "../../../api/user.js"
	export default {
		data() {
			return {
				feedBack: {
					title: '',
					content: ''
				}
			}
		},
		methods: {
			sendFeedBack() {
				feedback(this.feedBack).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: "提交成功，感谢您的反馈",
							duration: 2000,
							success() {
								setTimeout(() => {
									uni.navigateBack({
										delta:2
									})
								},2000)
							}
						})
					}
				})
			},
			backTo() {
				uni.navigateBack({
					delta:1
				})
			}
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
		margin: 20px auto;
	}
</style>
