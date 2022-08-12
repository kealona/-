const LOCALURL = "http://localhost:8888/"
const URL = {
    loginManager: LOCALURL+'manager/login',
	getAllUser: LOCALURL+'user/getAllUser',
	getAllMusic: LOCALURL+'songlist/getSonglist',
	getAllMv: LOCALURL+'mv/getMvList',
	getAllManager: LOCALURL+'manager/getAllManager',
	getAllAuth: LOCALURL+'manager/getAllAuth',
	addManager: LOCALURL+'manager/addManager',
	updateManager: LOCALURL+'manager/updateManager',
	updatePass: LOCALURL+'manager/updatePassword',
	getCode: LOCALURL+'manager/getCode'
}

module.exports = URL