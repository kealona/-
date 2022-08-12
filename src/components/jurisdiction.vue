<template>
	<div>
		<a class="title">权限管理</a>
		<el-button type="primary" style="float: right;" @click="openManager = true">添加管理员</el-button>
		<el-button type='success' style="float: right;margin-right: 1em;" @click="openAuth = true">查看权限内容</el-button>
		<el-table :data="tableData" tooltip-effect="dark">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="account" label="帐号">
			</el-table-column>
			<el-table-column prop="nickname" label="管理员名称">
			</el-table-column>
			<el-table-column prop="password" label="默认密码">
			</el-table-column>
			<el-table-column prop="name" label="权限等级">
			</el-table-column>
			<el-table-column prop="create_time" label="创建时间" width="200">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button type="success" size="small" @click.native="updateManager(scope.$index)">修改</el-button>
					<el-button type="danger" size="small" @click.native="deleteManager(scope.$index)">删除</el-button>
				</template>

			</el-table-column>
		</el-table>

		<el-dialog title="查看管理员权限内容" :visible.sync="openAuth">
			<el-table :data="authData">
				<el-table-column property="role" label="管理员等级"></el-table-column>
				<el-table-column property="name" label="管理员名称"></el-table-column>
				<el-table-column property="describe" label="描述" width="300"></el-table-column>
			</el-table>
		</el-dialog>

		<el-dialog title="添加管理员" :visible.sync="openManager">
			<el-form :model="form">
				<el-form-item label="管理员帐号" :label-width="formLabelWidth">
					<el-input v-model="form.account" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="管理员昵称" :label-width="formLabelWidth">
					<el-input v-model="form.nickname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="默认密码" :label-width="formLabelWidth">
					<el-input v-model="form.password" type="password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限等级" :label-width="formLabelWidth">
					<el-select v-model="form.grade" placeholder="请选择">
						<el-option label="普通管理员" value="1"></el-option>
						<el-option label="高级管理员" value="2"></el-option>
						<el-option label="超级管理员" value="3"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="openManager = false">取 消</el-button>
				<el-button type="primary" @click.native="add_manager">创 建</el-button>
			</div>
		</el-dialog>
		
		<el-dialog title="修改管理员" :visible.sync="update_Manager">
			<el-form :model="form">
				<el-form-item label="帐号" :label-width="formLabelWidth">
					<el-input v-model="form.account" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="管理员昵称" :label-width="formLabelWidth">
					<el-input v-model="form.nickname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="默认密码" :label-width="formLabelWidth">
					<el-input v-model="form.password" type="password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限等级" :label-width="formLabelWidth">
					<el-select v-model="form.grade" placeholder="请选择">
						<el-option label="普通管理员" value="1"></el-option>
						<el-option label="高级管理员" value="2"></el-option>
						<el-option label="超级管理员" value="3"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="update_Manager = false">取 消</el-button>
				<el-button type="primary" @click.native="update_manager">创 建</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	import url from '../server/serviceAPI.config.js'

	export default {
		data() {
			return {
				tableData: [],
				openAuth: false,
				openManager: false,
				authData: [],
				form: {},
				formLabelWidth: '120px',
				update_Manager: false
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
		},
		mounted() {
			this.getAllManager()
			this.getAllAuth()
		},
		methods: {
			//获取所有管理员
			getAllManager() {
				axios.get(url.getAllManager)
					.then((res) => {
						this.tableData = res.data.data
					})
					.catch((err) => {
						console.log(err)
					})
			},
			//获取管理员权限内容
			getAllAuth() {
				axios.get(url.getAllAuth)
					.then((res) => {
						this.authData = res.data.data
					})
			},
			//添加新管理员
			add_manager() {
				axios.post(url.addManager, this.form)
					.then((res) => {
						this.getAllManager()
						this.$notify({
							title: '成功',
							message: '添加管理员成功',
							type: 'success'
						});
						this.openManager = false
					})
					.catch((err) => {
						console.log(err)
					})
			},
			//删除管理员
			deleteManager (id) {
				this.tableData.splice(id, 1)
				this.$notify({
					title: '成功',
					message: '删除管理员成功',
					type: 'success'
				});
			},
			//修改管理员信息
			updateManager (id) {
				this.form.account = this.tableData[id].account
				this.update_Manager = true
			},
			//修改管理员信息
			update_manager () {
				axios.post(url.updateManager, this.form)
				.then((res) => {
					this.getAllManager()
				})
				.catch((err) => {
					console.log(err)
				})
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
