<template>
	<button>{{msg}}</button>
</template>

<script>
	import $ from 'jquery'

	export default {
		props: {
			msg: String,
			type: {
				type: String,
				default: 'default'
			}
		},
		mounted() {
			if (this.type == 'primary') {
				$('button').addClass('primary')
			} else if (this.type == 'danger') {
				$('button').addClass('danger')
			} else if (this.type == 'warning') {
				$('button').addClass('warning')
			} else
				$('button').addClass('default')
		}
	}
</script>

<style scoped="scoped">
	button {
		transition: all .3s ease-in-out;
		border-radius: 10px;
		padding: 8px 20px;
		cursor: pointer;
		margin-right: 15px;
		background-color: transparent;
	}

	.default {
		background-color: transparent;
		color: #5b5b5b;
		border: 1px solid #e4e6ef;
	}
	
	.default:hover {
		background-color: #e4e6ef;
		box-shadow: 0 7px 23px -8px #e4e6ef;
	}
	
	.primary {
		border: 1px solid #7888fc;
		color: #7888fc;
	}
	
	.primary:hover {
		background-color: #7888fc;
		color: #fff;
		box-shadow: 0 7px 23px -8px #7888fc;
	}
	
	.danger {
		border: 1px solid #f75d6fd8;
		color: #f75d6fd8;
	}
	
	.danger:hover {
		background-color: #f75d6fd8;
		color: #fff;
		box-shadow: 0 7px 23px -8px #f75d6fd8;
	}
	
	.warning {
		border: 1px solid #f5af47ea;
		color: #f5af47ea;
	}
	
	.warning:hover {
		background-color: #f5af47ea;
		color: #fff;
		box-shadow: 0 7px 23px -8px #f5af47ea;
	}
</style>
