<template>
	<view class="content">
		<u-navbar title="修改密码" @leftClick="backTo" fixed placeholder></u-navbar>
		<view class="inner-content">
			<u-form :labelWidth="120">
				<u-form-item label="原密码">
					<u-input v-model="pwd.oldPassword"></u-input>
				</u-form-item>
				<u-form-item label="新密码">
					<u-input v-model="pwd.newPassword"></u-input>
				</u-form-item>
				<u-form-item label="确认密码">
					<u-input v-model="pwd.confirmPwd"></u-input>
				</u-form-item>
			</u-form>
			<u-button type="primary" style="margin-top: 20px;" @click="reset">保存</u-button>
		</view>
	</view>
</template>

<script>
	import { resetPwd } from "../../../api/user.js"
	export default {
		data() {
			return {
				pwd: {
					newPassword: '',
					oldPassword: '',
					confirmPwd: ''
				}
			}
		},
		methods: {
			reset() {
				if(this.pwd.confirmPwd != this.pwd.oldPassword) {
					console.log(1);
					uni.showToast({
						title: "密码不一致"
					})
					return
				}
				resetPwd(this.pwd).then(res => {
					if(res.code == 200) {
						uni.showToast({
							title: '修改成功',
							duration: 2000
						})
					}
				})
			},
			backTo() {
				uni.navigateBack({
					delta: 2
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		background-color: #f1f1f1;
	}
	
	.inner-content {
		width: 94%;
		margin-left: 10px;
	}
	
	.u-form-item {
		border-bottom: 1px solid #d1cccc;
	}
	
	.u-input {
		border: none;
	}
	
	.u-form >>> .u-form-item__body__left__content__label {
		color: #837272;
	}
</style>
