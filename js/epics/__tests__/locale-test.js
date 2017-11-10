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
const { addLayersStyleLocalization, checkEmptyAvailableStyles } = require('../locale');
const rootEpic = combineEpics(addLayersStyleLocalization);
const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);
const {testEpic} = require('../../../MapStore2/web/client/epics/__tests__/epicTestUtils');

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
        ]
    }]
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
    it('checkEmptyAvailableStyles', (done) => {
        const conf = {};
        const mapId = 12;
        testEpic(checkEmptyAvailableStyles, 1, configureMap(conf, mapId), actions => {
            expect(actions.length).toBe(1);
            actions.map((action) => {
                switch (action.type) {
                    case UPDATE_NODE:
                        expect(action.options.availableStyles).toBe(null);
                        break;
                    default:
                        expect(false).toBe(true);
                }
            });
            done();
        }, {layers: { flat: [{availableStyles: []}, {}, {availableStyles: [{name: "style"}]}] }});
    });
});
