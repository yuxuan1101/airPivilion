/**
 * Created by yuxuan on 8/9/16.
 */
var webpack = require('webpack');
var path = require('path')
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config');
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, '../client/dist'),
    publicPath: '',
    quiet: !true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    // headers: {
    //     "Access-Control-Allow-Origin": "*"
    // },
    stats: {
        colors: true
    },
    proxy: {
        "/user": {
            target: 'http://localhost:3000',
            secure: false
        }
    }
});
server.use(require('webpack-hot-middleware')(compiler));
server.listen(8080, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8080');
});