var gulp = require('gulp');
var htmlreplace = require('gulp-html-replace');
var nodemon = require('gulp-nodemon');
var gutil = require("gulp-util");
var del = require('del');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var WebpackConfig = require('./webpack.config.js');

gulp.task('html:prod', function() {
    return gulp.src('src/index.html')
        .pipe(htmlreplace({
            'js': 'bundle.js'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('html:dev', function() {
    return gulp.src('src/index.html')
        .pipe(htmlreplace({
            'js': 'http://localhost:8080/bundle.js'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('start', function (callback) {
    nodemon({
        script: 'bin/run'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    });
    callback();
});

gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(WebpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            },
            _DEBUG_ : true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
    myConfig['display-error-details'] = true;

    // remove dist directory
    del(['dist']);

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));

        callback();
    });
});

//webpack dev server
gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var serverConfig = Object.create(WebpackConfig);
    serverConfig.devtool = '#source-map';
    serverConfig.debug = true;
    serverConfig.entry.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");
    serverConfig.plugins = serverConfig.plugins.concat(
        new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
          "process.env": {
              // This has effect on the react lib size
              "NODE_ENV": JSON.stringify("development")
          },
          _DEBUG_ : true
      })
    )

    // remove dist directory
    del(['dist']);
    
    var compiler = webpack(serverConfig);

    new WebpackDevServer(compiler, {
        publicPath: serverConfig.output.publicPath,
        // contentBase: serverConfig.output.contentBase,
        hot: true,
        // 设置代理
        // proxy: {
        //     '/some/path*': {
        //         target: 'https://other-server.example.com',
        //     },
        //     'path/*': function(req,res) {
        //     }
        // },
        stats: {
            color: true
        }
    }).listen(8080, function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]");

        // keep the server alive or continue?
        callback();
    })
});

gulp.task('start:dev',["html:dev","webpack-dev-server","start"]);

gulp.task('build',["html:prod","webpack:build"])

