/* const WorkboxPlugin = require("workbox-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	outputDir: 'music',
	configureWebpack: {
		devServer: {
			open: true,
			proxy: {
				'/netease-api': {
					target: 'http://localhost:3000',
					pathRewrite: {
						'^/netease-api': ''
					},
					changeOrigin: true,
					secure: false,
				},
			},
			port: 8080,
		},
		plugins: [
			new WorkboxPlugin.GenerateSW()
		]
	}

}
 */