<template>
	<div class="aside">
		<el-menu default-active="2" class="el-menu-vertical-demo" active-text-color="rgb(228 93 85)" router>
			<el-menu-item index="/home">
				<div class="item-box">
					<i class="el-icon-s-home"></i>
					<span slot="title">首页</span>
				</div>
			</el-menu-item>
			<el-menu-item index="/music">
				<div class="item-box">
					<i class="el-icon-document"></i>
					<span slot="title">音乐管理</span>
				</div>

			</el-menu-item>
			<el-menu-item index="/mv">
				<div class="item-box">
					<i class="el-icon-monitor"></i>
					<span slot="title">MV管理</span>
				</div>

			</el-menu-item>
			<!-- <el-menu-item index="/songlist">
				<div class="item-box">
					<i class="el-icon-document-copy"></i>
					<span slot="title">歌单管理</span>
				</div>

			</el-menu-item> -->
			<el-menu-item index="/recommend">
				<div class="item-box">
					<i class="el-icon-star-off"></i>
					<span slot="title">推荐管理</span>
				</div>

			</el-menu-item>
			<el-menu-item index="/user">
				<div class="item-box">
					<i class="el-icon-user"></i>
					<span slot="title">用户管理</span>
				</div>

			</el-menu-item>
			
			<el-menu-item index="/jurisdiction">
				<div class="item-box">
					<i class="el-icon-star-off"></i>
					<span slot="title">权限管理</span>
				</div>
			
			</el-menu-item>
			<el-menu-item index="/monitor">
				<div class="item-box">
					<i class="el-icon-camera-solid"></i>
					<span slot="title">监控信息</span>
				</div>
			
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style scoped="scoped">
	.aside {
		background-color: #fff;
		height: 600px;
		width: 19%;
		border-radius: 15px;
		box-shadow: 0 1px 3px 0 rgb(54 74 99 / 5%);
		overflow: hidden;
		float: left;
		margin-right: 40px;
	}

	.el-menu {
		border-radius: 15px !important;
	}

	.el-menu-item:focus,
	.el-menu-item:hover {
		background-color: #ffd1d152;
	}
	
	.item-box {
		transition: all .4s ease-in-out;
	}

	.item-box:hover {
		transition: all .4s ease-in-out;
		transform: translateX(10px);
	}
</style>
