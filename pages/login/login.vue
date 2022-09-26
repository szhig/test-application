<template>
	<view class="content">
		<u-navbar title="登录" @leftClick="backTo" fixed placeholder></u-navbar>
		<div class="form-box">
			<div class='form'>
				<u--form labelPosition="left">
					<u-form-item label="用户名" :labelWidth="120" borderBottom>
						<u--input
								v-model="form.username"
								border="none"
								placeholder="请输入用户名"></u--input>
					</u-form-item>
					<u-form-item :labelWidth="120" label="性别" prop="userInfo.sex" >
						<u--input
								v-model="form.password"
								placeholder="请输入密码"
								border="none"></u--input>
					</u-form-item>
					<u-button type="primary" style="margin-top: 10px;" @click="login">登陆</u-button>
				</u--form>
			</div>
		</div>
	</view>
</template>

<script>
	import { login } from "../../api/common.js"
	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
			backTo() {
				uni.navigateBack({
					delta: 2
				})
			},
			login() {
				login(this.form).then(res => {
					let token = res.token
					uni.setStorageSync("token", token)
					uni.redirectTo({
						url:"/pages/index/index/index"
					})
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped>

	.content {
		width: 100%;
		height: 100%;
		background-image: url(../../static/index/1.jpg);
	}
	
	.form-box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		margin-top: 200px;
	}
	
	.form {
		width: 80%;
		background-color: rgba(0,0,0,0.2);
		height: 20%;
		display: flex;
		justify-content: center;
		align-items: center;
		color:white;
	}
</style>
