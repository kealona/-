import Vue from 'vue'
import Router from 'vue-router'

import index from '../view/index.vue'
import login from '../view/login.vue'
import home from '../components/home.vue'
import music from '../components/music.vue'
import mv from '../components/mv.vue'
import songlist from '../components/songlist.vue'
import recommend from '../components/recommend.vue'
import user from '../components/user.vue'
import jurisdiction from '../components/jurisdiction.vue'
import monitor from '../components/monitor.vue'

Vue.use(Router)

export default new Router({
	 routes: [{
		path: '/index',
		component: index,
		children: [{
			path: '/home',
			component: home
		}, {
			path: '/music',
			component: music
		}, {
			path: '/mv',
			component: mv
		}, {
			path: '/songlist',
			component: songlist
		}, {
			path: '/recommend',
			component: recommend
		}, {
			path: '/user',
			component: user
		}, {
			path: '/jurisdiction',
			component: jurisdiction
		}, {
			path: '/monitor',
			component: monitor
		}]
	}, {
		path: '/',
		redirect: '/home'
	}, {
		path: '/login',
		component: login
	}]
})
