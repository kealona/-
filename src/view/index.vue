<template>
	<div>
		<mheader></mheader>
		<maside></maside>
		<mmain></mmain>
	</div>
</template>

<script>
	import mheader from '../components/music_header.vue'
	import maside from '../components/aside.vue'
	import mmain from '../components/content.vue'
		
	export default {
		components: {
			mheader,
			maside,
			mmain
		}
	}
</script>

<style>
</style>
