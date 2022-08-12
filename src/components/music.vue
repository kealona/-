<template>
	<div>
		<a class="title">音乐管理</a>
		<el-button type="primary" size="small" style="float: right;" @click="dialog_task = true">上传音乐</el-button>
		<el-table :data="tableData" tooltip-effect="dark">
			<el-table-column type="selection"></el-table-column>
			<el-table-column prop="id" label="歌曲编号" width="130" >
			</el-table-column>
			<el-table-column prop="title" label="歌曲名称" width="200">
			</el-table-column>
			<el-table-column label="歌曲封面">
				<template slot-scope="scope">
					<img :src="getUrl(scope.row.cover)"/>
				</template>
			</el-table-column>
			<el-table-column prop="singer" label="歌手名称">
			</el-table-column>
			<el-table-column prop="album" label="专辑名称">
			</el-table-column>
			<el-table-column prop="time" label="时长/秒">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<el-button type="success" size="small">修改</el-button>
				<el-button type="danger" size="small">删除</el-button>
			</el-table-column>
		</el-table>
		
		<el-dialog title="上传音乐" :visible.sync="dialog_task">
			<el-form :model="form">
				<el-form-item label="歌曲名称" :label-width="formLabelWidth">
					<el-input v-model="form.title" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="歌手名称" :label-width="formLabelWidth">
					<el-input v-model="form.singer" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="歌曲文件上传" :label-width="formLabelWidth">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  multiple
					  :limit="3"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传mp3/mp4文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="歌词文件上传" :label-width="formLabelWidth">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  multiple
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传lrc文件，且不超过5000kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="歌曲封面上传" :label-width="formLabelWidth">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  :before-remove="beforeRemove"
					  multiple
					  :limit="1"
					  :on-exceed="handleExceed"
					  :file-list="fileList">
					  <el-button size="small" type="primary">点击上传</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5000kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="歌曲时长" :label-width="formLabelWidth">
					<el-input v-model="form.time" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="歌曲专辑" :label-width="formLabelWidth">
					<el-input v-model="form.album" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialog_task = false">取 消</el-button>
				<el-button type="primary" @click="dialog_task = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { getTopSongs } from "@/api"
	import { createSong } from "@/utils"
	import url from '../server/serviceAPI.config.js'
	import axios from 'axios'
	
	export default {
		data () {
			return {
				tableData: [],
				dialog_task: false,
				formLabelWidth: '120px',
				form: {},
				fileList: []
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
			this.getSongList()
		},
		methods: {
			getSongList () {
				axios({
				  url: url.getAllMusic,
				  method: 'get',
				  params: {
				    songlist_id: 1
				  }
				})
				.then((res) => {
					let data = res.data.data
					console.log(data)
					this.tableData = data
				})
				.catch((err) => {
					console.log(err)
				})
			},
			getUrl (name) {
				return 'http://localhost:8888/cover/'+name
			},
			async getSongs() {
			  const { data } = await getTopSongs(0)
			  this.tableData = data.map(song => {
			    const {
			      id,
			      name,
			      artists,
			      duration,
			      album: { picUrl, name: albumName }
			    } = song
			    return createSong({
			      id,
			      name,
			      artists,
			      duration,
			      albumName,
			      img: picUrl,
			    })
			  })
			  console.log(this.tableData)
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
