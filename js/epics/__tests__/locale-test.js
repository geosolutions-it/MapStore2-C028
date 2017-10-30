/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this; source tree.
 */
const expect = require('expect');
const configureMockStore = require('redux-mock-store').default;
const { createEpicMiddleware, combineEpics } = require('redux-observable');
const { CHANGE_LOCALE } = require('../../../MapStore2/web/client/actions/locale');
const { configureMap } = require('../../../MapStore2/web/client/actions/config');
const { UPDATE_NODE } = require('../../../MapStore2/web/client/actions/layers');
const { addLayersStyleLocalization } = require('../locale');
const rootEpic = combineEpics(addLayersStyleLocalization);
const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);

const layers = {
    flat: [
      {
        group: 'background',
        source: 'osm',
        name: 'mapnik',
        title: 'Open Street Map',
        type: 'osm',
        visibility: true,
        singleTile: false,
        dimensions: [],
        id: 'mapnik__0',
        loading: true
      },
      {
        group: 'background',
        source: 'google',
        name: 'HYBRID',
        title: 'Google HYBRID',
        type: 'google',
        visibility: false,
        singleTile: false,
        dimensions: [],
        id: 'HYBRID__1'
      },
      {
        group: 'background',
        source: 'mapquest',
        name: 'osm',
        title: 'MapQuest OSM',
        type: 'mapquest',
        visibility: false,
        singleTile: false,
        dimensions: [],
        apiKey: '__API_KEY_MAPQUEST__',
        id: 'osm__2'
      },
      {
        group: 'background',
        source: 'nasagibs',
        name: 'Night2012',
        provider: 'NASAGIBS.ViirsEarthAtNight2012',
        title: 'NASAGIBS Night 2012',
        type: 'tileprovider',
        visibility: false,
        singleTile: false,
        dimensions: [],
        id: 'Night2012__3'
      },
      {
        group: 'background',
        source: 'OpenTopoMap',
        name: 'OpenTopoMap',
        provider: 'OpenTopoMap',
        title: 'OpenTopoMap',
        type: 'tileprovider',
        visibility: false,
        singleTile: false,
        dimensions: [],
        id: 'OpenTopoMap__4'
      },
      {
        search: {
          url: 'http://sit.comune.bolzano.it/geoserver/wfs?',
          type: 'wfs'
        },
        name: 'Ambiente:quartieri',
        style: 'quartieri_it',
        availableStyles: [
          {
            TYPE_NAME: 'WMS_1_3_0.Style',
            name: 'quartieri',
            legendURL: [
              {
                TYPE_NAME: 'WMS_1_3_0.LegendURL',
                width: 158,
                height: 100,
                format: 'image/png',
                onlineResource: {
                  TYPE_NAME: 'WMS_1_3_0.OnlineResource',
                  type: 'simple',
                  href: 'http://sit.comune.bolzano.it/geoserver/Ambiente/quartieri/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=quartieri'
                }
              }
            ]
          },
          {
            TYPE_NAME: 'WMS_1_3_0.Style',
            name: 'quartieri_de',
            legendURL: [
              {
                TYPE_NAME: 'WMS_1_3_0.LegendURL',
                width: 199,
                height: 100,
                format: 'image/png',
                onlineResource: {
                  TYPE_NAME: 'WMS_1_3_0.OnlineResource',
                  type: 'simple',
                  href: 'http://sit.comune.bolzano.it/geoserver/Ambiente/quartieri/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=quartieri&style=quartieri_de'
                }
              }
            ]
          },
          {
            TYPE_NAME: 'WMS_1_3_0.Style',
            name: 'quartieri_it',
            legendURL: [
              {
                TYPE_NAME: 'WMS_1_3_0.LegendURL',
                width: 158,
                height: 100,
                format: 'image/png',
                onlineResource: {
                  TYPE_NAME: 'WMS_1_3_0.OnlineResource',
                  type: 'simple',
                  href: 'http://sit.comune.bolzano.it/geoserver/Ambiente/quartieri/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=quartieri&style=quartieri_it'
                }
              }
            ]
          }
        ],
        title: {
          'default': 'quartieri',
          'it-IT': 'Quartieri',
          'de-DE': 'Stadtviertel'
        },
        type: 'wms',
        url: 'http://sit.comune.bolzano.it/geoserver/wms',
        bbox: {
          crs: 'EPSG:4326',
          bounds: {
            minx: '11.274139788331421',
            miny: '46.44238098464227',
            maxx: '11.434390795696103',
            maxy: '46.53194067237907'
          }
        },
        visibility: true,
        singleTile: false,
        allowedSRS: {
          'EPSG:2398': true,
          'EPSG:2399': true,
          'EPSG:25832': true,
          'EPSG:25833': true,
          'EPSG:31468': true,
          'EPSG:31469': true,
          'EPSG:3785': true,
          'EPSG:4326': true,
          'EPSG:900913': true,
          'CRS:84': true
        },
        dimensions: [],
        params: {},
        id: 'Ambiente:quartieri__5',
        loading: false,
        loadingError: false
      }
    ],
    groups: [
      {
        id: 'Default',
        title: 'Default',
        name: 'Default',
        nodes: [
          'Ambiente:quartieri__5'
        ],
        expanded: true
      }
    ]
};

describe('search Epics', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            locale: {
                currentLocale: "it-IT"
            },
            layers
        });
    });

    afterEach(() => {
        epicMiddleware.replaceEpic(rootEpic);
    });

    it('check update of style when locale is changed', (done) => {
        const data = {
            messages: {},
            locale: "it-IT"
        };
        let action = {
            type: CHANGE_LOCALE,
            messages: data.messages,
            locale: data.locale
        };

        store.dispatch( action );
        const actions = store.getActions();
        if (actions.length === 2) {
            expect(actions[1].type).toBe(UPDATE_NODE);
            done();
        }
    });
    it('check update of style when map config is loaded', (done) => {
        const conf = {};
        const mapId = 12;
        let action = {
            ...configureMap(conf, mapId)
        };

        store.dispatch( action );
        const actions = store.getActions();
        if (actions.length === 2) {
            expect(actions[1].type).toBe(UPDATE_NODE);
            done();
        }
    });
});
