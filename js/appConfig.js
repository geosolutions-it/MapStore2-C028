/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {registerSearchServiceEpic} = require('./epics/search');
const {registerCustomLayersUtilsEpic} = require('./epics/layers');
module.exports = {
    printingEnabled: true,
    pages: [{
        name: "home",
        path: "/",
        component: require('./pages/Home')
    }, {
        name: "viewer",
        path: "/viewer",
        component: require('../MapStore2/web/client/product/pages/MapViewer')
    }, {
        name: "mapviewer",
        path: "/viewer/:mapType/:mapId",
        component: require('../MapStore2/web/client/product/pages/MapViewer')
    }, {
        name: "roadAccidents",
        path: "/roadAccidents/:mapType/:mapId",
        component: require('./pages/RoadAccidents')
    }, {
        name: "manager",
        path: "/manager",
        component: require('./pages/Manager')
    }, {
        name: "manager",
        path: "/manager/:tool",
        component: require('./pages/Manager')
    }],
    pluginsDef: require('./plugins.js'),
    appEpics: {registerSearchServiceEpic, registerCustomLayersUtilsEpic},
    initialState: {
        defaultState: {
            mousePosition: {enabled: false, "crs": "EPSG:4326"},
            controls: {
                styler: {
                    enabled: true
                },
                help: {
                    enabled: false
                },
                print: {
                    enabled: true
                },
                toolbar: {
                    active: null,
                    expanded: false
                },
                drawer: {
                    enabled: false,
                    menu: "1"
                }
            },
            "maps": {
                "mapType": "leaflet"
            },
            catalog: {
                format: "wms",
                "supportedFormats": [{"name": "wms", "label": "WMS"}]
            }
        },
        mobile: {
            mapInfo: {enabled: true, infoFormat: 'text/html' },
            mousePosition: {enabled: true, crs: "EPSG:4326", showCenter: true},
            "maps": {
                "mapType": "leaflet"
            },
            "home": {
                "mapType": "leaflet"
            },
            catalog: {
                format: "wms",
                "supportedFormats": [{"name": "wms", "label": "WMS"}, {"name": "csw", "label": "CSW"}]
            }
        }
    },
    storeOpts: {
        persist: {
            whitelist: ['security']
        }
    }
};
