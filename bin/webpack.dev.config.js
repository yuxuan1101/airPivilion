/**
 * Created by yuxuan on 8/9/16.
 */
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var host = 8080;

module.exports = {
    devtool: 'inline-source-map',
    target: 'web',
    debug: false,
    context: path.resolve(__dirname, '.'),
    entry: {
        app: [
            'webpack-hot-middleware/client?reload=true',
            '../client/src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, '..', '/client/dist'),
        filename: 'bundle.js',
        // publicPath: 'http://localhost:'+host+'/',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new htmlWebpackPlugin({
            title: 'airPivilion',
            filename: 'index.html',
            favicon: '../client/src/images/favicon.ico',
            template: '../client/src/index.template.html'
        })
    ],
    resolve: {
        modulesDirectories: [
            'src',
            'bower_components',
            'node_modules'
        ],
        extensions: ['', '.js', '.json']
    },
    eslint: {
        formatter: require('eslint-friendly-formatter')
    },
    module: {
        preLoaders: [
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot',
                    'babel?{"presets":["react","es2015","stage-0"],"plugins":["transform-runtime"]}'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'},
            {
                test: /\.css$/,
                loaders: ['style','css']
            },
            {
                test: /\.less$/,
                loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:5]!less',
                include: path.join(__dirname,"../client/src")
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader?limit=8192&mimetype=image/png/gif"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    }
};