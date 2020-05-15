const path = require("path");

const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'MapStore-C028': path.join(__dirname, "js", "app"),
        "MapStore-C028-embedded": path.join(__dirname, "js", "embedded")
    },
    {
        "themes/default": path.join(__dirname, "assets", "themes", "default", "theme.less")
    },
    paths,
    extractThemesPlugin,
    true,
    "dist/",
    '.MapStore-C028',
    [
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'indexTemplate.html'),
            chunks: ['MapStore-C028'],
            inject: true,
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(paths.framework, 'embeddedTemplate.html'),
            chunks: ['MapStore-C028-embedded'],
            inject: true,
            hash: true,
            filename: 'embedded.html'
        })
    ],
    {
        '@mapstore': path.resolve(__dirname, 'MapStore2/web/client'),
        '@js': path.resolve(__dirname, 'js')
    },
    {
        '/rest/geostore': {
            target: "http://sit.comune.bolzano.it/mapstore2"
        },
        '/mapstore2/proxy': {
            target: "http://sit.comune.bolzano.it"
        },
        '/pdf': {
            target: "http://sit.comune.bolzano.it/mapstore2"
        },
        '/geoserver': {
            target: "http://sit.comune.bolzano.it"
        },
        '/GeoInfo': {
            target: "http://sit.comune.bolzano.it"
        }
    }
);
