var webpackConfig = require('./webpack.config.js');
var path = require("path");
var LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
var ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
var DefinePlugin = require("webpack/lib/DefinePlugin");
var NormalModuleReplacementPlugin = require("webpack/lib/NormalModuleReplacementPlugin");
var NoEmitOnErrorsPlugin = require("webpack/lib/NoEmitOnErrorsPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const extractThemesPlugin = require('./MapStore2/themes.js').extractThemesPlugin;
webpackConfig.plugins = [
    new LoaderOptionsPlugin({
        debug: false,
        options: {
            postcss: {
                plugins: [
                    require('postcss-prefix-selector')({prefix: '.ms2', exclude: ['.ms2']})
                ]
            },
            context: __dirname
        }
    }),
    new DefinePlugin({
        "__DEVTOOLS__": false
    }),
    new DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new NormalModuleReplacementPlugin(/leaflet$/, path.join(__dirname, "MapStore2", "web", "client", "libs", "leaflet")),
    new NormalModuleReplacementPlugin(/openlayers$/, path.join(__dirname, "MapStore2", "web", "client", "libs", "openlayers")),
    new NormalModuleReplacementPlugin(/cesium$/, path.join(__dirname, "MapStore2", "web", "client", "libs", "cesium")),
    new NormalModuleReplacementPlugin(/proj4$/, path.join(__dirname, "MapStore2", "web", "client", "libs", "proj4")),
    new ParallelUglifyPlugin({
        uglifyJS: {
            sourceMap: false,
            compress: {warnings: false},
            mangle: true
        }
    }),
    new NoEmitOnErrorsPlugin(),
    extractThemesPlugin,
    new HtmlWebpackPlugin({
        template: 'indexTemplate.html',
        chunks: ['MapStore2-C028'],
        inject: true,
        hash: true
    }),
    new HtmlWebpackPlugin({
        template: 'embeddedTemplate.html',
        chunks: ['embedded'],
        inject: true,
        hash: true,
        filename: 'embedded.html'
    })
];
webpackConfig.devtool = undefined;

// this is a workaround for this issue https://github.com/webpack/file-loader/issues/3
// use `__webpack_public_path__` in the index.html when fixed
webpackConfig.output.publicPath = "/mapstore2/dist/";
webpackConfig.output.chunkFilename = "[name].[hash].chunk.js";
webpackConfig.module.rules.push(
{
    test: /\.html$/,
    loader: 'html-loader'
});

module.exports = webpackConfig;
