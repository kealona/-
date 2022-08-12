<template>
	<div class="header">
		<div>
			<a href="#" id="Logo_a">
				<div>
					<img src="../assets/logo.png" id="logo">
				</div>
				<h1 id="headline">网易云音乐后台管理系统</h1>
			</a>
		</div>
		<div>
			<el-dropdown :hide-on-click="false" style="margin-top: 10px;margin-left: 30px;">
				<span class="el-dropdown-link">
					<img :src="user.head" />
					{{user.username}}<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="updatePass">修改密码</el-dropdown-item>
					<el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<div style="float: left;line-height: 70px;">登录时间：{{time}}</div>
		</div>
		<el-dialog title="修改密码" :visible.sync="changePassword">
			<el-form :model="form" :rules="rules" ref="form">
				<el-form-item label="管理员帐号" :label-width="formLabelWidth">
					<el-input v-model="form.account" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="管理员邮箱" :label-width="formLabelWidth">
					<el-input v-model="form.email" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="password" :label-width="formLabelWidth">
					<el-input v-model="form.password" type="password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="surepassword" :label-width="formLabelWidth">
					<el-input v-model="form.surepassword" type="password" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
					<el-input v-model="form.code" autocomplete="off" style="width: 250px;margin-right: 20px;">
					</el-input>
					<el-button @click="getcode($event)" :disabled="disabled" type="primary" ref="codeBtn">{{codeText}}
					</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="changePassword = false">取 消</el-button>
				<el-button type="primary" @click.native="updatePassword('form')">修 改</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	import url from '../server/serviceAPI.config.js'
	import $ from 'jquery'

	var countdown = 60

	export default {
		data() {
			var v_sure = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('密码不能为空'));
				} else if (value != this.form.password) {
					return callback(new Error('两次密码输入不一致'))
				} else {
					return callback()
				}
			};
			var v_pass = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('密码不能为空'));
				} else {
					return callback()
				}
			};
			var v_code = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('请输入验证码'));
				} else {
					return callback()
				}
			};
			return {
				user: {
					head: 'https://p1.music.126.net/NwHL_HQ3uFKHs7dirGQ-zQ==/109951164928869034.jpg?param=80y80',
					username: '新晋管理员'
				},
				time: '',
				changePassword: false,
				form: {
					password: '',
					surepassword: '',
					code: ''
				},
				formLabelWidth: '120px',
				codeText: '获取验证码',
				rules: {
					surepassword: [{
						validator: v_sure,
						trigger: 'blur'
					}],
					password: [{
						validator: v_pass,
						trigger: 'blur'
					}],
					code: [{
						validator: v_code,
						trigger: 'blur'
					}]
				},
				disabled: false
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
			this.user.username = JSON.parse(localStorage.getItem('manager'))[0].nickname
		},
		mounted() {
			let date = new Date()
			this.time = date.toLocaleTimeString()
			this.$socket.emit('connection', 1)
			this.sockets.subscribe('msg', (data) => {
			  console.log(data)
			})
		},
		methods: {
			//登出
			loginout() {
				localStorage.removeItem('manager')
				this.$router.push('/login')
			},
			//点击打开修改密码
			updatePass() {
				let data = JSON.parse(localStorage.getItem('manager'))[0]
				this.form.account = data.account
				this.form.email = data.email
				this.changePassword = true
			},
			//修改密码
			updatePassword(formName) {
				let code = this.cacheGet('code')
				if (code != this.form.code) {
					this.$message.error('验证码不正确！');
					return;
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						axios.post(url.updatePass, {
								account: this.form.account,
								password: this.form.password
							})
							.then((res) => {
								this.$message({
									message: '修改密码成功',
									type: 'success'
								});
								this.changePassword = false
							})
							.catch((err) => {
								console.log(err)
							})

					} else {
						this.$message.error('提交失败！');
						return false;
					}
				});
			},
			//获取验证码
			getcode(e) {
				axios.post(url.getCode, {
						email: this.form.email
					})
					.then((res) => {
						this.cacheSet('code', res.data.code, 300);
					})
					.catch((err) => {
						console.log(err)
					})
				this.settime(e.currentTarget)
			},
			//定时器
			settime(val) {
				if (countdown == 0) {
					this.disabled = false
					this.codeText = '获取验证码'
					countdown = 60
				} else {
					this.disabled = true
					this.codeText = countdown + '秒后可重新发送'
					countdown--
					setTimeout(() => {
						this.settime(val)
					}, 1000)
				}
			},
			//设置时间
			cacheSet(key, value = '', expire = 0) {
				// 当前时间戳
				var nowTime = Math.ceil(Date.now() / 1000);
				// 设置数据
				localStorage.setItem(key, JSON.stringify(value))
				// 判断是否有过期时间
				if (expire > 0) {
					// 设置过期时间
					localStorage.setItem(key + '_expire', (nowTime + parseInt(expire)))
				} else {
					// 设置过期时间
					localStorage.setItem(key + '_expire', 0)
				}
				return true;
			},
			//获取数据
			cacheGet(key) {
				// 当前时间戳
				var nowTime = Math.ceil(Date.now() / 1000);
				// 获取键时间戳
				var rawCacheDataExpire = localStorage.getItem(key + '_expire');
				var cacheDataExpire = parseInt(rawCacheDataExpire);

				// 强制过期时间 为0时忽略 用于解决缓存时间与本地时间差距过大(例本地更改了计算机时间)
				var forceTime = 3600;
				// 判断用户是否删除了过期时间 判断是否设置了过期时间 判断是否超过过期时间 判断当前计算机时间与设置的过期时间差距是否过大
				if ((rawCacheDataExpire === null) || (cacheDataExpire > 0) && ((nowTime > cacheDataExpire) || (forceTime >
						0 && Math.abs(cacheDataExpire - nowTime) > forceTime))) {
					// 删除过期key
					localStorage.removeItem(key)
					// 删除过期时间
					localStorage.removeItem(key + '_expire')
					return false;
				}

				// 获取数据
				let cacheData = JSON.parse(localStorage.getItem(key));

				if (cacheData === null || cacheData === false) {
					return false;
				}
				// 返回数据
				return cacheData;
			}
		}
	}
</script>

<style scoped="scoped">
	.header {
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 10px;
		box-shadow: 0 1px 3px 0 rgb(54 74 99 / 5%);
		padding: 0 30px;
		margin-bottom: 20px;
	}

	#Logo_a {
		display: flex;
		line-height: 70px;
		height: 70px;
		margin-left: 10px;
		text-decoration: none;
		color: #5b5b5b;
	}

	#Logo_a h1 {
		font-size: 20px;
		margin: 0;
	}

	#Logo_a div {
		line-height: 70px;
		display: flex;
		align-items: center;
		margin-right: 10px;
	}

	.el-dropdown-link {
		line-height: 40px;
	}

	.el-dropdown-link img {
		height: 40px;
		width: 40px;
		border-radius: 50px;
		float: left;
		margin-right: 10px;
	}
</style>
