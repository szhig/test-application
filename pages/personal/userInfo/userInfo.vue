<template>
	<view class="content">
		<u-navbar title="个人信息" fixed placeholder @leftClick="backTo"></u-navbar>
		<u-form labelWidth="100" style="width: 90%;" labelPosition="left">
			<u-form-item label="头像">
				<u-upload accept="image" 
					:width="150" 
					:height="150" 
					:name="'file'"
					:auto-upload="true"
					:action="'http://218.7.112.123:10001/prod-api/common/upload'"
					@afterRead="imgUpSuccess">
					<u-avatar :src="adator" :size="120"></u-avatar>
				</u-upload>
			</u-form-item>
			<u-form-item label="昵称">
				<u-input v-model="userInfo.nickName"></u-input>
				<u-picker :show="show" :columns="columns" @confirm="changeSex"></u-picker>
			</u-form-item>
			<u-form-item label="性别">
				<u-input v-model="sex[userInfo.sex]" @focus="selectSex"></u-input>
			</u-form-item>
			<u-form-item label="电话:" >
				<u-input v-model="userInfo.showPh" @change="changePh" :maxlength = "11"></u-input>
			</u-form-item>
			<u-form-item label="邮箱:" >
				<u-input v-model="userInfo.email" @change="changePh" :maxlength = "11"></u-input>
			</u-form-item>
			<u-form-item label="身份证:" >
				<u-input v-model="userInfo.idCard" @change="changePh" :maxlength = "11"></u-input>
			</u-form-item>
			<u-button type="primary" style="margin-top: 20px;" @click="editInfo">保存</u-button>
		</u-form>
	</view>
</template>

<script>
	import { userInfo, editUserInfo } from "../../../api/user.js"
	import { upload } from "../../../api/common.js"
	import operate from "../../../utils/operate.js"
	import { myUpload } from "../../../utils/upload.js"
	import { verifyEmail } from "../../../utils/verify.js"
	export default {
		data() {
			return {
				show: false,
				columns: [
				    [{
						text: '男',
					}, {
						text: '女'
					}]
				],
				userInfo: {},
				sex: {
					'0': '男',
					'1': '女'
				},
				adator: require("../../../static/image/a.jpg")
			}
		},
		methods: {
			getUserInfo() {
				userInfo().then(res => {
					this.userInfo = res.user
					// this.userInfo.showPh = this.userInfo.phonenumber
					this.$set(this.userInfo, 'showPh', this.userInfo.phonenumber)
					this.userInfo.showPh = this.userInfo.showPh.slice(0,7) + "****"
				})
			},
			imgUpSuccess(e) {
				console.log(e);
				myUpload({
					url: operate.api + "/prod-api/common/upload",
					filePath: e.file.url,
				}).then(res => {
				})
			},
			selectSex() {
				this.show = true
			},
			changeSex(item) {
				this.userInfo.sex = item.indexs[0]
				this.show = false
			},
			changePh(value) {
				console.log(value);
				if (this.userInfo.showPh.length > 7) {
					this.userInfo.phonenumber += value.charAt(value.length - 1)
					this.userInfo.showPh = this.userInfo.showPh.slice(0,7) + this.addAsterisk()
				} else {
					this.userInfo.phonenumber = this.userInfo.showPh
				}
			},
			addAsterisk() {
				let str = ""
				for(let i =0 ;i <this.userInfo.showPh.length - 7; i++) {
					str += '*'
				}
				return str
			},
			editInfo() {
				if(!verifyEmail(this.userInfo.email)) {
					uni.showToast({
						title: "email格式不正确",
						icon: 'none'
					})
					return
				}
				editUserInfo(this.userInfo).then(res => {
					uni.showToast({
						title: "保存成功",
						icon: 'none',
						duration: 1000,
						success() {
							setTimeout(() => {
								uni.navigateBack({
									delta:2
								})
							},2000)
						}
					})
				})
			},
			backTo() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			this.getUserInfo()
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
		padding-left: 10px;
		background-color: #F2ECE7;
	}
	
	.u-form >>> .u-form-item__body__left__content__label {
		color: #837272;
	}
	
	.u-form >>> .u-form-item__body__right{
		margin-left: 20rpx !important;
	}
	
	.u-form >>> .u-input {
		padding: 0 !important;
	}
	
	.u-upload >>> .u-upload__button {
		background-color: white !important;
		border-radius: 50%
	}
	
	.u-form-item {
		border-bottom: 1px solid #d1cccc;
		margin-top: 30px;
	}
	
	.u-input {
		border: none;
	}
</style>
