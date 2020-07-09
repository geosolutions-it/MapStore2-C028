const path = require("path");

const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'MapStore-C028': path.join(__dirname, "js", "app"),
        "MapStore-C028-embedded": path.join(__dirname, "js", "embedded")
    },
    {
        "themes/default": path.join(__dirname, "assets", "themes", "default", "theme.less")
    },
    {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
    },
    extractThemesPlugin,
    false,
    "dist/",
    '.MapStore-C028',
    undefined,
    {
        '@mapstore': path.resolve(__dirname, 'MapStore2/web/client'),
        '@js': path.resolve(__dirname, 'js')
    },
    {
        //  /mapstore3  test  instance
        //  /mapstore2  prod  instance
        '/rest/geostore': {
            target: "http://sit.comune.bolzano.it/mapstore3"
        },
        '/mapstore3/proxy': {
            target: "http://sit.comune.bolzano.it"
        },
        '/pdf': {
            target: "http://sit.comune.bolzano.it/mapstore3"
        },
        '/geoserver': {
            target: "http://sit.comune.bolzano.it"
        },
        '/GeoInfo': {
            target: "http://sit.comune.bolzano.it"
        }
    }
);
