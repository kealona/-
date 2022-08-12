<template>
	<div>
		<a class="title">歌单管理</a>
		<el-table :data="list" tooltip-effect="dark">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="id" label="歌单编号" width="130">
			</el-table-column>
			<el-table-column prop="name" label="歌单名称" width="200">
			</el-table-column>
			<el-table-column label="歌单封面">
				<template slot-scope="scope">
					<img :src="scope.row.picUrl" />
				</template>
			</el-table-column>
			<el-table-column prop="copywriter" label="歌单简介" width="200">
			</el-table-column>
			<el-table-column prop="playCount" label="播放量">
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
		getPersonalized
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
			const {
				result
			} = await getPersonalized({
				limit: 10
			})
			this.list = result
			console.log(this.list)

		},
		data() {
			return {
				list: []
			}
		}
	}
</script>

<style scoped="scoped">
	.title {
		font-size: 22px;
		border-left: 2.5px solid #da1414;
		padding-left: 10px;
	}

	img {
		height: 50px;
		width: 50px;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
