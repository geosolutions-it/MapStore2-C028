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
    undefined,
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
