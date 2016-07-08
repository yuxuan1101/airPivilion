'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,plugins[]=transform-runtime'],
                include: path.join(__dirname, 'src')
            },
            {
                test:/\.css$/,
                loader:'style!css?',
                include: path.join(__dirname, 'src')
            },
            // LESS
            {
                test: /\.less$/,
                loader: 'style!css?modules&localIdentName=[name]_[local]_[hash:base64:5]!less',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192',
                include: path.join(__dirname, 'src/images')
            }
        ]
    }
};
