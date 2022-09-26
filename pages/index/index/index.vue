<template>
	<view class="content">
		<view class="inner-content">
			<u-search :height="50" :margin="margin"></u-search>
			<u-swiper :list="images" :height="300"></u-swiper>
			<service-grid :service="service"></service-grid>
		</view>
		<u-tabs :list="newsTypes" :keyName="'name'" style="background-color: #F2F2F2;" @change="changeTab"></u-tabs>
		<news-list :newsList="newsList"></news-list>
	</view>
</template>

<script>
	import { swiperList, allServerList } from "../../../api/common.js"
	import { newsType, newsList } from "../../../api/news.js"
	import operate from "../../../utils/operate.js"
	import serviceGrid from "../../../component/serviceGrid.vue"
	import tabbar from "../../../component/tabbar.vue"
	import NewsList from '../../../component/NewsList.vue'
	export default {
		data() {
			return {
				images: [],
				service: [],
				margin: '8px 0px',
				newsTypes: [],
				newsList: [],
				activeTab: 0,
				pageNum: 1,
				pageSize: 10,
			}
		},
		methods: {
			getSwiperList() {
				swiperList().then(res => {
					uni.showToast({
						title: res
					})
					res.rows.forEach(item => {
						this.images.push(operate.api + item.advImg)
					})
				}).catch(_ => {
					uni.showToast({
						title:"err"
					})
				})
			},
			getServerList() {
				allServerList().then(res => {
					this.service = res.rows
					this.service.length = 9
					this.service.forEach(item => {
						item.imgUrl = operate.api + item.imgUrl
					})
				})
			},
			getNewsTypeList() {
				newsType().then(res => {
					this.newsTypes = res.data
					this.getNewsList()
				})
			},
			getNewsList() {
				newsList({
					type: this.newsTypes[this.activeTab].id,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}).then(res => {
					this.newsList = res.rows
					this.newsList.forEach(item => {
						item.cover = operate.api + item.cover
					})
				})
			},
			changeTab(index) {
				this.activeTab = index.index
			},
			
		},
		onLoad() {
			this.getSwiperList()
			this.getServerList()
			this.getNewsTypeList()
			
		},
		components: {
			serviceGrid,
			tabbar,
			NewsList
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 90%;
	}
	.inner-content {
		margin: 0 5px;
	}
	
	
</style>
