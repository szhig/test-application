<template>
	<view class="inner-content">
		<u-list :showScrollbar="true" :height="700">
			<u-list-item v-for="item in newsList" >
				<div class="news-list">
					<div class = "list-left">
						<image :src="item.cover" mode=""></image>
					</div>
					<div class = "list-right">
						<p class = "news-title">{{item.title}}</p>
						<div class="list-content-top">
							<div class="news-content" v-html="item.content"></div>
							<div class="news-other">
								<span>发布时间：{{item.publishDate}}</span>
							</div>
						</div>
					</div>
				</div>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		props: ['newsList']
	}
</script>

<style scoped>
	
	.inner-content {
		margin: 0px 5px 0;
		padding-top: 10px;
	}
	
	.news-list {
		display: flex;
		justify-content: space-around;
	}
	
	.list-left {
		width: 33.3%;
	}
	
	.list-right {
		width: 60%;
		
	}
	
	.list-left uni-image {
		width: 100%;
		height: 120px;
	}
	
	.list-content-top {
		height: 90px;
		line-height: 20px;
	}
	
	.news-title {
		font-size: 28rpx;
		font-weight: 500;
	}
	
	.news-content {
		color: #727272;
		font-size: 20rpx;
		height: 60px;
		display:-webkit-box;
	   -webkit-box-orient:vertical;/*设置方向*/
	   -webkit-line-clamp:3;/*设置超过为省略号的行数*/
	   overflow:hidden;
	   overflow:hidden;
	   text-overflow:ellipsis;
	}
	
	.news-other {
		font-size: 16rpx;
		color:#727272;
		display: flex;
		justify-content: flex-end;
		padding-right: 10px;
		margin-top: 10px;
	}
</style>
