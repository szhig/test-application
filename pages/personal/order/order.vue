<template>
	<view class="content">
		<u-navbar title="全部订单" @leftClick="backTo" fixed placeholder></u-navbar>
		<u-tabs :list="types" :keyName="'name'" :scrollable="types.length < 5 ? false : true" @change="changeTab"
			style="background-color: white;">
		</u-tabs>
		<view class="inner-content" v-for="item in orders">
			<u-cell-group title="1" style="background-color: white;margin-top: 8px;">
				<div slot="title" class="title">
					<div class="title-left">
						<span style="font-size: 25rpx;">
							{{item.orderNo}}
						</span>
						<span style="font-size: 25rpx;margin-left: 30rpx;">
						
						{{item.payTime}}</span>
					</div>
					<div class="title-right" style="font-size: 25rpx;">
						{{item.status}}
					</div>
				</div>
				<u-cell v-for="order in item.orderItemList">
					<div slot="icon">
						<u-avatar :src="order.productImage" shape="square" :size="100"></u-avatar>
					</div>
					<div slot="title">{{order.productName}}</div>
					<div slot="label">&yen;{{order.productPrice}}</div>
					<div slot="right-icon">
						<p>&times{{order.quantity}}</p>
					</div>
				</u-cell>
				<u-cell>
					<div slot="title">
						<div class="bottom">
							<span>
								共
								<span class="price">{{item.orderItemList.length}}</span>
								件商品，总价：
								<span class="price">&yen;{{item.amount}}</span>
							</span>
						</div>
					</div>
					<div slot="value">
						<div style="display: flex;">
							<u-button type="warning" size="small">取消订单</u-button>
						</div>
					</div>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		orderAll
	} from "../../../api/order.js"
	export default {
		data() {
			return {
				orderType: 'movie',
				types: [{
					'name': "待支付",
					type: '待支付'
				}, {
					'name': '退款',
					type: 'takeout'
				}, {
					name: '待评价',
					type: '待评价'
				}, {
					name: '完成',
					type: '完成'
				}],
				orders: [{
					"id": 19,
					"orderNo": "2021051121282519510",
					"userId": 2,
					"sellerId": 14,
					"amount": 40,
					"postage": null,
					"status": "待支付",
					"paymentType": null,
					"payTime": '2021-05-10',
					"sendTime": null,
					"receiverName": "王先生",
					"receiverPhone": "13800000000",
					"receiverAddress": "大连理工大学 教学楼 A3-118",
					"receiverLabel": null,
					"houseNumber": null,
					"orderItemList": [{
						"id": 20,
						"userId": 2,
						"orderNo": "2021051121282519510",
						"productId": 169,
						"productName": "鱿鱼炒面",
						"productImage": require("../../../static/image/a.jpg"),
						"productPrice": 20,
						"quantity": 1,
						"totalPrice": 20
					}, {
						"id": 21,
						"userId": 2,
						"orderNo": "2021051121282519510",
						"productId": 170,
						"productName": "芸豆蚬子打卤面",
						"productImage": require("../../../static/image/a.jpg"),
						"productPrice": 20,
						"quantity": 1,
						"totalPrice": 20
					}]
				}],
				tab: 0
			}
			},
		methods: {
			getOrderList() {
				orderAll({
					status: this.types[this.tab]
				}).then(res => {
					res.rows.forEach(item => {
						this.orders.push(item.orderInfo)
					})
				})
			},
			changeTab(index) {
				this.orders = []
				this.tab = index.index
				this.getOrderList()
			},
			backTo() {
				uni.navigateBack({
					delta:1
				})
			}
		},
		onLoad() {
			this.getOrderList()
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
		margin: 0 auto;
	}
	
	.u-cell-group {
		border-radius: 8px;
	}
	
	.title {
		display: flex;
		justify-content: space-between;
	}
	
	.price {
		color: red;
	}
	
</style>
