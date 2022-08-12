<template>
	<div>
		<a class="title">监控信息</a>
		<el-table :data="tableData" tooltip-effect="dark">
			<el-table-column type="index" label="编号" width="150">
			</el-table-column>
			<el-table-column label="监控图片" width="300">
				<template slot-scope="scope">
					<img style="width: 200px;" v-lazy="scope.row.url"/>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="图片名称">
			</el-table-column>
			<el-table-column prop="time" label="拍照时间">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope1">
					<el-button type="danger" size="small" @click="deletePic(scope1.$index)">删除</el-button>
				</template>
				
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: []
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
		},
		mounted() {
			this.sockets.subscribe('getPic', (data) => {
				let date = new Date()
				this.tableData.push({
					url: 'http://localhost:8888/' + data,
					name: data,
					time: date.toLocaleTimeString()
				})


			})
		},
		methods: {
			deletePic (index) {
				this.tableData.splice(index, 1)
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
</style>
