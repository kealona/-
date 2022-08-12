<template>
	<div>
		<a class="title">用户管理</a>
		<el-table :data="users" tooltip-effect="dark">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="id" label="用户编号" width="130">
			</el-table-column>
			<el-table-column prop="username" label="用户名" width="100">
			</el-table-column>
			<el-table-column label="用户头像">
				<template slot-scope="scope">
					<img :src="getUrl(scope.row.username)" />
				</template>
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="200">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<el-button type="success" size="small">修改</el-button>
				<el-button type="danger" size="small">删除</el-button>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import axios from 'axios'
	import url from '../server/serviceAPI.config.js'

	export default {
		data() {
			return {
				users: []
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
			let manager = JSON.parse(localStorage.getItem('manager'))
			if(manager[0].grade != 3) {
				this.$notify.error({
					title: '错误',
					message: '您的管理权限不够'
				});
				this.$router.back(-1)
			}
			this.getUser()
		},
		methods: {
			async getUser() {
				axios.get(url.getAllUser)
				.then((res) => {
					this.users = res.data.data.status
				})
				.catch((err) => {
					console.log(err)
				})
			},
			getUrl (username) {
				return 'http://localhost:8888/headImg/'+username + '.jpg'
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
