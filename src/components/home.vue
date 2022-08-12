<template>
	<div>
		<div class="head-box">
			<div class="head-item">
				<p>歌曲播放量</p>
				<h2>{{play_num}}</h2>
			</div>
			<div class="head-item">
				<p>MV播放量</p>
				<h2>{{video_num}}</h2>
			</div>
			<div class="head-item">
				<p>歌单创建量</p>
				<h2>{{create_num}}</h2>
			</div>
			<div class="head-item">
				<p>用户上线量</p>
				<h2>{{user_num}}</h2>
			</div>
		</div>
		<div id="mychart">

		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	import mbutton from '../base/button.vue'

	export default {
		components: {
			mbutton
		},
		data() {
			return {
				play_num: 669835,
				user_num: 16576,
				video_num: 57541,
				create_num: 1543
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
			this.init_mychart()
		},
		methods: {
			init_mychart() {
				let chart = this.$echarts.init(document.getElementById('mychart'))

				const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
				let option = {
					backgroundColor: '#fff',
					title: {
						text: '七日数据统计',
						textStyle: {
							fontSize: 12,
							fontWeight: 400
						},
						left: 'center',
						top: '5%'
					},
					legend: {
						icon: 'circle',
						top: '5%',
						right: '5%',
						itemWidth: 6,
						itemGap: 20,
						textStyle: {
							color: '#556677'
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							label: {
								show: true,
								backgroundColor: '#fff',
								color: '#556677',
								borderColor: 'rgba(0,0,0,0)',
								shadowColor: 'rgba(0,0,0,0)',
								shadowOffsetY: 0
							},
							lineStyle: {
								width: 0
							}
						},
						backgroundColor: '#fff',
						textStyle: {
							color: '#5c6c7c'
						},
						padding: [10, 10],
						extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
					},
					grid: {
						top: '15%'
					},
					xAxis: [{
						type: 'category',
						data: ['06.12', '06.13', '06.14', '06.15', '06.16', '06.17', '06.18'],
						axisLine: {
							lineStyle: {
								color: '#DCE2E8'
							}
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							interval: 0,
							textStyle: {
								color: '#556677'
							},
							// 默认x轴字体大小
							fontSize: 12,
							// margin:文字到x轴的距离
							margin: 15
						},
						axisPointer: {
							label: {
								padding: [0, 0, 10, 0],
								margin: 15,
								fontSize: 12,
								backgroundColor: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#fff' // 0% 处的颜色
									}, {
										// offset: 0.9,
										offset: 0.86,
										/*
				0.86 = （文字 + 文字距下边线的距离）/（文字 + 文字距下边线的距离 + 下边线的宽度）
				                        
				                        */
										color: '#fff' // 0% 处的颜色
									}, {
										offset: 0.86,
										color: '#33c0cd' // 0% 处的颜色
									}, {
										offset: 1,
										color: '#33c0cd' // 100% 处的颜色
									}],
									global: false // 缺省为 false
								}
							}
						},
						boundaryGap: false
					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#DCE2E8'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#556677'
							}
						},
						splitLine: {
							show: false
						}
					}, {
						type: 'value',
						position: 'right',
						axisTick: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: '#556677'
							},
							formatter: '{value}'
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: '#DCE2E8'
							}
						},
						splitLine: {
							show: false
						}
					}],
					series: [{
							name: '网站访问量',
							type: 'line',
							data: [10, 10, 30, 12, 15, 3, 7],
							symbolSize: 1,
							symbol: 'circle',
							smooth: true,
							yAxisIndex: 0,
							showSymbol: false,
							lineStyle: {
								width: 5,
								color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
										offset: 0,
										color: '#9effff'
									},
									{
										offset: 1,
										color: '#9E87FF'
									}
								]),
								shadowColor: 'rgba(158,135,255, 0.3)',
								shadowBlur: 10,
								shadowOffsetY: 20
							},
							itemStyle: {
								normal: {
									color: colorList[0],
									borderColor: colorList[0]
								}
							}
						}, {
							name: '歌曲播放量',
							type: 'line',
							data: [5, 12, 11, 14, 25, 16, 10],
							symbolSize: 1,
							symbol: 'circle',
							smooth: true,
							yAxisIndex: 0,
							showSymbol: false,
							lineStyle: {
								width: 5,
								color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [{
										offset: 0,
										color: '#73DD39'
									},
									{
										offset: 1,
										color: '#73DDFF'
									}
								]),
								shadowColor: 'rgba(115,221,255, 0.3)',
								shadowBlur: 10,
								shadowOffsetY: 20
							},
							itemStyle: {
								normal: {
									color: colorList[1],
									borderColor: colorList[1]
								}
							}
						},
						{
							name: '视频点击量',
							type: 'line',
							data: [150, 120, 170, 140, 500, 160, 110],
							symbolSize: 1,
							yAxisIndex: 1,
							symbol: 'circle',
							smooth: true,
							showSymbol: false,
							lineStyle: {
								width: 5,
								color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
										offset: 0,
										color: '#fe9a'
									},
									{
										offset: 1,
										color: '#fe9a8b'
									}
								]),
								shadowColor: 'rgba(254,154,139, 0.3)',
								shadowBlur: 10,
								shadowOffsetY: 20
							},
							itemStyle: {
								normal: {
									color: colorList[2],
									borderColor: colorList[2]
								}
							}
						}
					]
				};
				chart.setOption(option)
			}
		}
	}
</script>

<style scoped="scoped">
	.head-box {
		display: flex;
		justify-content: space-between;
		/* color: #fff; */
		padding: 0 30px;
	}

	.head-item {
		padding: 8px 60px;
		border: 1px solid #ececec;
		border-radius: 13px;
		text-align: center;
		/* background-color: rgb(213, 39, 15, 0.9); */
		cursor: pointer;
		transition: all .3s ease-in-out;
	}

	.head-item:hover {
		opacity: 0.8;
		box-shadow: 5px 5px 16px #f4f4f4;
	}

	.head-item>p {
		margin-top: 20px;
		font-size: 18px;
	}

	#mychart {
		width: 970px;
		height: 500px;
	}
</style>
