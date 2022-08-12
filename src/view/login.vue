<template>
	<div style="background: linear-gradient(60deg, rgb(64 147 195) 0%, rgb(18 228 249) 100%);margin: -25px;height: 100%;">
		<div class="login-box">
			<h1>管理员登录</h1>

			<el-form :rules="rules" style="padding: 20px 70px;" :model="loginForm" ref="loginForm">
				<el-form-item label="帐号" prop="account">
					<el-input placeholder="请输入帐号" v-model="loginForm.account"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input placeholder="请输入密码" type="password" v-model="loginForm.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('loginForm')" style="width: 200px;">登录</el-button>
				</el-form-item>
			</el-form>

		</div>
		<div style="position: absolute;bottom: 0;width: 100%;">
			<svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
				<defs>
					<path id="gentle-wave"
						d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
				</defs>
				<g class="parallax">
					<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
					<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
					<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
					<use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
				</g>
			</svg>
		</div>
	</div>

</template>

<script>
	import axios from 'axios'
	import url from '../server/serviceAPI.config.js'

	export default {
		data() {
			var v_account = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('帐号不能为空'));
				} else {
					return callback()
				}
			};
			var v_password = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('密码不能为空'));
				} else {
					return callback()
				}
			};
			return {
				loginForm: {
					account: '',
					password: ''
				},
				rules: {
					account: [{
						validator: v_account,
						trigger: 'blur'
					}],
					password: [{
						validator: v_password,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						axios.post(url.loginManager, {
								account: this.loginForm.account,
								password: this.loginForm.password
							})
							.then((res) => {
								console.log(res)
								if (res.data.data != 0) {
									localStorage.setItem('manager', JSON.stringify(res.data.data))
									this.$notify({
										title: '成功',
										message: '登录成功',
										type: 'success'
									});
									this.$router.push('/home')
								} else {
									this.$notify.error({
										title: '失败',
										message: '帐号或密码错误'
									});
								}
							})

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.login-box {
		position: absolute;
		top: 15%;
		left: 28%;
		background-color: #fff;
		height: 400px;
		width: 600px;
		border-radius: 20px;
		text-align: center;
		box-shadow: 0 0.9rem 1.7rem rgb(0 0 0 / 25%), 0 0.7rem 0.7rem rgb(0 0 0 / 22%);
		padding: 25px;
	}
	
	.waves {
		position: relative;
		width: 100%;
		height: 15vh;
		margin-bottom: -7px;
		/*Fix for safari gap*/
		min-height: 100px;
		max-height: 150px;
	}
	
	.content {
		position: relative;
		height: 20vh;
		text-align: center;
		background-color: white;
	}
	
	/* Animation */
	
	.parallax>use {
		animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
	}
	
	.parallax>use:nth-child(1) {
		animation-delay: -2s;
		animation-duration: 7s;
	}
	
	.parallax>use:nth-child(2) {
		animation-delay: -3s;
		animation-duration: 10s;
	}
	
	.parallax>use:nth-child(3) {
		animation-delay: -4s;
		animation-duration: 13s;
	}
	
	.parallax>use:nth-child(4) {
		animation-delay: -5s;
		animation-duration: 20s;
	}
	
	@keyframes move-forever {
		0% {
			transform: translate3d(-90px, 0, 0);
		}
	
		100% {
			transform: translate3d(85px, 0, 0);
		}
	}
	
	/*Shrinking for mobile*/
	@media (max-width: 768px) {
		.waves {
			height: 40px;
			min-height: 40px;
		}
	
		.content {
			height: 30vh;
		}
	
		h1 {
			font-size: 24px;
		}
	}
</style>
