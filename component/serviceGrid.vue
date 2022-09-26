<template>
	<view class="grid-service">
		<u-grid :col="5" style="margin-top: 10px;">
			<u-grid-item v-for="item in service" @click="serviceTo(item)">
				<image :src="item.imgUrl" mode="" style="width: 60rpx;height: 60rpx;"></image>
				<text style="margin: 5px 0 20px;">{{item.serviceName}}</text>
			</u-grid-item>
			<u-grid-item @click="toService">
				<u-icon name="more-circle" :size="60"></u-icon>
				<text style="margin: 5px 0 20px;">更多</text>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		name: 'service-grid',
		data() {
			return {
				
			}
		},
		props: ['service'],
		methods: {
			serviceTo(service) {
				console.log(service);
				uni.navigateTo({
					url: "/pages/service/" + service.link
				})
			},
			toService() {
				uni.navigateTo({
					url: "/pages/service/index/index"
				})
			}
		}
	}
</script>

<style scoped>
	.grid-service {
		width: 100%;
	}
</style>
