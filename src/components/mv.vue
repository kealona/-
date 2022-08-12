<template>
	<div>
		<a class="title">MV管理</a>
		<el-button type="primary" size="small" style="float: right;">上传视频</el-button>
		<el-table :data="mvs" tooltip-effect="dark">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="id" label="MV编号" width="130">
			</el-table-column>
			<el-table-column prop="mv_name" label="MV名称" width="200">
			</el-table-column>
			<el-table-column label="MV封面">
				<template slot-scope="scope">
					<img :src="getUrl(scope.row.cover_url)" />
				</template>
			</el-table-column>
			<el-table-column prop="singer_name" label="歌手名称">
			</el-table-column>
			<el-table-column prop="create_time" label="创建时间">
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
		getPersonalizedMv
	} from "@/api"
	import url from '../server/serviceAPI.config.js'
	import axios from 'axios'

	export default {
		data() {
			return {
				mvs: []
			}
		},
		async created() {
			if (localStorage.getItem('manager') == null) {
				this.$notify.error({
					title: '错误',
					message: '请先登录'
				});
				this.$router.push('/login')
				
			}
			this.getMvList()
		},
		methods: {
			getMvList () {
				axios.get(url.getAllMv)
				.then((res) => {
					let data = res.data.data
					console.log(data)
					this.mvs = data
				})
				.catch((err) => {
					console.log(err)
				})
			},
			getUrl (name) {
				return 'http://localhost:8888/cover/'+name
			},
			async getMvs() {
				const {
					result
				} = await getPersonalizedMv()
				this.mvs = result
				console.log(this.mvs)
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
