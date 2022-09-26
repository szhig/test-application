<template>
	<view class="content">
		<view class="inner-content">
			<u-cell :border="false" style="background-color: #F2ECE7;border-radius: 5px;" >
				<div slot="icon">
					<u-avatar :src="userInfo.avatar" :size="150"></u-avatar>
				</div>
				<div slot="title" class="title">{{userInfo.nickName}}</div>
				<div slot="label">{{userInfo.phonenumber}}</div>
				<div slot="right-icon">
					<u-icon name="chat-fill" :size="50"></u-icon>
				</div>
			</u-cell>
			
			<div style="margin-top: 20px;"></div>
			
			<u-cell v-for="item in list" style="margin-top: 10px;" rightIcon="arrow-right" :isLink="true" @click="navagateTo(item)">
				<div slot="icon">
				</div>
				<div slot="title">{{item.name}}</div>
				<!-- <div slot="right-icon">right-icon</div> -->
			</u-cell>
			
			<u-button type="primary" style="margin-top: 20px;" @click="logout">退出登录</u-button>
		</view>
		
		<!-- <tabbar></tabbar> -->
	</view>
</template>

<script>
	import { userInfo, logout } from "../../../api/user.js"
	import operate from '../../../utils/operate.js'
	import tabbar from "../../../component/tabbar.vue"
	export default {
		data() {
			return {
				userInfo: {},
				list: [{
					'name': '个人信息',
					'icon': '',
					'path': '/pages/personal/userInfo/userInfo'
				},{
					'name': '订单列表',
					'icon': '',
					'path': '/pages/personal/order/order'
				},{
					'name': '修改密码',
					'icon': '',
					'path': '/pages/personal/resetPwd/resetPwd'
				}, {
					'name': '意见反馈',
					'icon': '',
					'path': '/pages/personal/opinion/opinion'
					
				}]
			}
		},
		methods: {
			getUserInfo() {
				userInfo().then(res => {
					this.userInfo = res.user
					this.userInfo.avatar = require("../../../static/image/a.jpg")
					console.log(res);
				})
			},
			navagateTo(item) {
				uni.navigateTo({
					url: item.path
				})
			},
			logout() {
				// logout().then(res => {
				// 	if (res.code == 200) {
						localStorage.removeItem("token")
						uni.redirectTo({
							url:"/pages/index/index/index"
						})
					// }
				// })
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		components: {
			tabbar
		}
	}
</script>

<style scoped>
	.content {
		height: 100%;
		width: 100%;
	}
	
	.inner-content {
		width: 99%;
		margin: 5px auto 0;
	}
	
	.title {
		font-size: 35rpx;
		font-weight: 700;
	}
</style>
