var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['webpack/hot/dev-server', path.resolve(__dirname, './src/router/index')],
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: '',
		devtool: 'eval',
		hot: true,
		inline: true,
		port: 8181
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015'],
				}
			}, {
				test: /\.(css|scss)$/,
				loader: ExtractTextPlugin.extract("style", "css!sass!autoprefixer")
			}, {
				test: /\.(png|jpg|jpeg|gif|eot|woff|svg|ttf|woff2|appcache)(\?|$)/,
				exclude: /^node_modules$/,
				loader: 'file-loader?limit=80000&name=[name].[ext]'
			}
		]
	},
	resolve: {
		root: path.resolve(__dirname, './node_modules'),
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('./manifest.json'),
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("[name].css"),
		
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: './src/index.html',
		})
	]
};
