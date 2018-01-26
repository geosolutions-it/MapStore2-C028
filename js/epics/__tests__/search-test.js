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
const { localConfigLoaded} = require('../../../MapStore2/web/client/actions/localConfig');
const { registerSearchServiceEpic, getActualLang, getBzVieUrl } = require('../search');
const rootEpic = combineEpics(registerSearchServiceEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);
const mockStore = configureMockStore([epicMiddleware]);


describe('search Epics', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            locale: {
                currentLocale: "it-IT"
            }
        });
    });

    afterEach(() => {
        epicMiddleware.replaceEpic(rootEpic);
    });

    it('check bz services, and bzvie in particular', () => {
        const config = {};
        let action = {
            ...localConfigLoaded(config)
        };
        const {API} = require('../../../MapStore2/web/client/api/searchText');

        store.dispatch( action );
        store.subscribe(() => {
            const vieService = API.Utils.getService("bzVie");
            expect(vieService).toNotBe(null);
            expect(API.Utils.getService("bzCivico")).toNotBe(null);
            expect(API.Utils.getService("bzComuniCatastali")).toNotBe(null);
            expect(API.Utils.getService("bzParticella")).toNotBe(null);
            expect(API.Utils.getService("bzVie_not_present")).toBe(null);

            vieService("roma", {
                protocol: "",
                host: "",
                pathname: "base/js/test-resources/bzvie.json",
                lang: "it"
            }).then((res) => {
                expect(res.length).toBeGreaterThan(0);
            });
        });
    });
    it('check getActualLang', () => {
        const state = {
            locale: {
                current: "it-IT"
            }
        };
        const lang = getActualLang(state, "en");
        expect(lang).toBe("it");
    });
    it('check getBzVieUrl', () => {
        const state = {
            locale: {
                current: "de-DE"
            }
        };
        const url = getBzVieUrl({
            state, searchText: "roma", protocol: "http", host: "sit.comune.bolzano.it", pathname: "/GeoInfo/VieServlet", lang: "de"
        });
        expect(url).toBe("http://sit.comune.bolzano.it/GeoInfo/VieServlet?query=roma&lang=de");
    });
});
