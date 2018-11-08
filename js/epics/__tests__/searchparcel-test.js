/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const expect = require('expect');

const {searchParcelEpic} = require('../searchparcel');
const {testEpic} = require('../../../MapStore2/web/client/epics/__tests__/epicTestUtils');
const {COMPLETE_SEARCH, LOADING_PARCEL} = require('../../actions/searchparcel');
const {configureMap} = require('../../../MapStore2/web/client/actions/config');
const {TEXT_SEARCH_RESULTS_PURGE, TEXT_SEARCH_RESET, TEXT_SEARCH_TEXT_CHANGE} = require('../../../MapStore2/web/client/actions/search');
const {SHOW_NOTIFICATION} = require('../../../MapStore2/web/client/actions/notifications');

const map = {
    present: {
        size: {width: 1387, height: 946},
        projection: "EPSG:900913",
        bbox: {
            bounds: {
                maxx: 180,
                maxy: 90,
                minx: -180,
                miny: -90
            },
            crs: 'EPSG:3857',
            rotation: 0
        }
    }
};

const searchparcel = {
    service: {
        priority: 2,
        type: "bzComuniCatastali",
        displayName: "${properties.title}",
        subTitle: "${properties.description}",
        geomService: {
            type: "wfs",
            options: {
                url: "http://sit.comune.bolzano.it/geoserver/wfs",
                typeName: "Ambiente:comuni_catast",
                srsName: "EPSG:4326",
                staticFilter: "CCAT_CODIC = ${properties.code}"
            }
        },
        then: [
            {
                type: "bzParticella",
                displayName: "${properties.codice}",
                searchTextTemplate: "${properties.codice}",
                subTitle: "${properties.descTipo}",
                geomService: {
                    type: "wfs",
                    options: {
                        url: "http://sit.comune.bolzano.it/geoserver/wfs",
                        typeName: "Cartografia:particelle",
                        srsName: "EPSG:4326",
                        staticFilter: "NUM = '${properties.codice}' AND COM = ${properties.comcat}"
                    }
                },
                options: {
                    protocol: "http",
                    host: "sit.comune.bolzano.it",
                    pathname: "/GeoInfo/ParticelleServlet"
                }
            }
        ]
    },
    resultStyle: {
        iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        color: "#3388ff",
        weight: 4,
        dashArray: "",
        fillColor: "#3388ff",
        fillOpacity: 0.2
    },
    searchKeys: {
        comcat: 'comCat',
        codice: 'particella',
        type: 'tipoPart'
    }
};

describe('searchparcel epics', () => {

    it('tests searchParcelEpic no state', (done) => {
        const epicResult = actions => {
            try {
                expect(actions.length).toBe(1);
                actions.map((action) => {
                    expect(action.type).toBe(COMPLETE_SEARCH);
                });
            } catch(e) {
                done(e);
            }
            done();
        };
        const state = {};
        testEpic(searchParcelEpic, 1, [{type: '@@router/LOCATION_CHANGE'}, configureMap()], epicResult, state);
    });

    it('tests searchParcelEpic with service and no query', (done) => {
        const epicResult = actions => {
            try {
                expect(actions.length).toBe(5);
                expect(actions[0].type).toBe(LOADING_PARCEL);
                expect(actions[0].loading).toBe(false);
                expect(actions[1].type).toBe(TEXT_SEARCH_RESULTS_PURGE);
                expect(actions[2].type).toBe(TEXT_SEARCH_RESET);
                expect(actions[3].type).toBe(LOADING_PARCEL);
                expect(actions[3].loading).toBe(false);
                expect(actions[4].type).toBe(COMPLETE_SEARCH);
            } catch(e) {
                done(e);
            }
            done();
        };
        const state = {
            searchparcel
        };
        testEpic(searchParcelEpic, 5, [{type: '@@router/LOCATION_CHANGE'}, configureMap()], epicResult, state);
    });

    it('tests searchParcelEpic with service and query with error and map in state', (done) => {
        const epicResult = actions => {
            try {
                expect(actions.length).toBe(10);
                expect(actions[0].type).toBe(TEXT_SEARCH_RESULTS_PURGE);
                expect(actions[1].type).toBe(TEXT_SEARCH_RESET);
                expect(actions[2].type).toBe(LOADING_PARCEL);
                expect(actions[2].loading).toBe(false);
                expect(actions[3].type).toBe(LOADING_PARCEL);
                expect(actions[3].loading).toBe(true);
                expect(actions[4].type).toBe(TEXT_SEARCH_TEXT_CHANGE);
                expect(actions[5].type).toBe(LOADING_PARCEL);
                expect(actions[5].loading).toBe(false);
                expect(actions[6].type).toBe(TEXT_SEARCH_RESULTS_PURGE);
                expect(actions[7].type).toBe(TEXT_SEARCH_RESET);
                expect(actions[8].type).toBe(SHOW_NOTIFICATION);
                expect(actions[9].type).toBe(COMPLETE_SEARCH);
            } catch(e) {
                done(e);
            }
            done();
        };
        const state = {
            searchparcel,
            map
        };
        testEpic(searchParcelEpic, 10, [{type: '@@router/LOCATION_CHANGE', payload: {search: '?particella=.442&comCat=669&tipoPart=partedif'}}, configureMap()], epicResult, state);
    });

});
