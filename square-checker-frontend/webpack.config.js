/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('bundle.css');

module.exports = {
	context: path.join(__dirname, '/src'),

	entry: ['./index.js'],

	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},

	resolve: {
		modules: [
			path.resolve('./node_modules'),
			path.resolve('./src')
		],

		alias: {
			styles: path.resolve('./src/styles')
		}
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: extractSASS.extract(['css-loader', 'sass-loader'])
			}
		]
	},

	devServer: {
		contentBase: path.join(__dirname, '/public'),
		historyApiFallback: true,
		inline: true
	},

	plugins: [
		extractSASS
	]

}
