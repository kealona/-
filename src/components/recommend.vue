<template>
	<div>
		<a class="title">推荐管理</a>
		<el-button type="primary" size="small" style="float: right;">新建广告</el-button>
		<el-table :data="banners" tooltip-effect="dark">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="encodeId" label="广告编号" width="150">
			</el-table-column>
			<el-table-column label="广告图片" width="250">
				<template slot-scope="scope">
					<img :src="scope.row.imageUrl" />
				</template>
			</el-table-column>
			<el-table-column prop="url" label="广告链接" width="220">
			</el-table-column>
			<el-table-column prop="typeTitle" label="广告类型">
			</el-table-column>
			<el-table-column label="状态">
				<el-tag type="success">已启用</el-tag>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<el-button type="success" size="small">修改</el-button>
				<el-button type="danger" size="small">删除</el-button>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import {
		getBanner
	} from "@/api"
	
	export default {
		async created() {
			if (localStorage.getItem('manager') == null) {
				this.$notify.error({
					title: '错误',
					message: '请先登录'
				});
				this.$router.push('/login')
			}
			let manager = JSON.parse(localStorage.getItem('manager'))
			if(manager[0].grade == 1) {
				this.$notify.error({
					title: '错误',
					message: '您的管理权限不够'
				});
				this.$router.back(-1)
			}
			const {
				banners
			} = await getBanner()
			this.banners = banners
		},
		data() {
			return {
				banners: [{
					encodeId: '15765',
					imageUrl: 'http://localhost:8888/cover/card1.jpg',
					typeTitle: '独家',
					url: '暂无'
				}, {
					encodeId: '11670',
					imageUrl: 'http://localhost:8888/cover/card2.jpg',
					typeTitle: '独家',
					url: '暂无'
				}, {
					encodeId: '17154',
					imageUrl: 'http://localhost:8888/cover/card3.jpg',
					typeTitle: '独家',
					url: '暂无'
				}, {
					encodeId: '11784',
					imageUrl: 'http://localhost:8888/cover/card4.jpg',
					typeTitle: '独家',
					url: '暂无'
				}, {
					encodeId: '14570',
					imageUrl: 'http://localhost:8888/cover/card5.jpg',
					typeTitle: '独家',
					url: '暂无'
				},],
			}
		},
	}
</script>

<style scoped="scoped">
	.title {
		font-size: 22px;
		border-left: 2.5px solid #da1414;
		padding-left: 10px;
	}

	img {
		height: 90px;
		width: 200px;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
