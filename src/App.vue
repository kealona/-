<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style>
	html,
	body {
		margin: 0;
		color: #5b5b5b;
		height: 100%;
		width: 100%;
		background-color: #f3f4f7;
	}

	#app {
		padding: 25px;
		height: 100%;
		width: 96.3%;
	}
</style>
