/**
 * Created by yuxuan on 8/9/16.
 */
'use strict';
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'eval',
    context: path.resolve(__dirname, '..'),
    entry: [
        './client/src/index'
    ],
    output: {
        path: path.join(__dirname, '../client/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.NoErrorsPlugin(),
        new htmlWebpackPlugin({
            title: 'airPivilion',
            filename: 'index.html',
            favicon: 'client/src/images/favicon.ico',
            template: 'client/src/index.template.html'
        }),
        new CleanPlugin(['../client/dist'])
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?{"presets":["react","es2015","stage-0"],"plugins":["transform-runtime", "transform-decorators-legacy"]}'],
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                loaders: ['style','css']
            },
            // LESS
            {
                test: /\.less$/,
                loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:5]!less',
                include: path.join(__dirname,"../client/src")
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192',
                include: path.join(__dirname, '../client/src/images')
            },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
            { test: /\.json$/, loader: 'json' },
        ]
    }
};