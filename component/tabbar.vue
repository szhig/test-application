<template>
	<u-tabbar :value="tabbarName" @change="changeBar">
		<u-tabbar-item v-for="item in tabbar" :text="item.name" :icon="item.icon" :name="item.name"></u-tabbar-item>
	</u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: [{
					name: '首页',
					icon: 'home',
					path: 'pages/index/index/index'
				},{
					name: '全部服务',
					icon: 'list-dot',
					path: '/pages/service/index/index'
				},{
					name: '精准扶贫',
					icon: 'grid'
				},{
					name: '新闻',
					icon: 'file-text',
					path: '/pages/news/index/index'
				},{
					name: '个人中心',
					icon: 'account-fill',
					path: '/pages/personal/index/index'
				}],
				tabbarName: '首页'
			}
		},
		methods: {
			changeBar(index) {
				this.tabbarName = index
				console.log(this.tabbarName);
				this.tabbar.forEach(item => {
					if(item.name == index) {
						uni.navigateTo({
							url: item.path
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
