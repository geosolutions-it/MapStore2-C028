/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this; source tree.
 */

const {API} = require('../../MapStore2/web/client/api/searchText');
const assign = require('object-assign');
const Rx = require('rxjs');
const {LOCAL_CONFIG_LOADED} = require('../../MapStore2/web/client/actions/localConfig');
const {currentLocaleSelector} = require('../../MapStore2/web/client/selectors/locale');
const {head} = require('lodash');

const axios = require('axios');
const urlUtil = require('url');

const getActualLang = (state, lang) => head(currentLocaleSelector(state).split('-')) || lang || "en";
const getBzVieUrl = ({state, searchText, protocol, host, pathname, lang}) => {
    let actualLang = getActualLang(state, lang);
    let params = assign({}, {query: searchText, lang: actualLang});
    return urlUtil.format({
        protocol,
        host,
        pathname,
        query: params
    });
};
const registerSearchServiceEpic = (action$, store) => action$.ofType(LOCAL_CONFIG_LOADED).switchMap(() => {
    // registering the custom Services

    const bzVie = (searchText, {protocol, host, pathname, lang}) => {
        const url = getBzVieUrl({searchText, protocol, host, pathname, lang, state: store.getState()});
        return axios.post(url).then( (res) => {
            if (res && res.data && res.data.success) {
                return res.data.vie.map((item) => {
                    return {
                        "type": "Feature",
                        "properties": {
                            "code": item.codice,
                            "desc": item.descrizione
                        }
                    };
                });
            }
            return [];
        });
    };
    const bzCivico = (searchText, {protocol, host, pathname, item}) => {
        let params = assign({}, {query: searchText, idVia: item.properties.code});
        let url = urlUtil.format({
            protocol,
            host,
            pathname,
            query: params
        });
        return axios.post(url).then( (res) => {
            if (res && res.data && res.data.success) {
                return res.data.vie.map((nestedItem) => {
                    return {
                        "type": "Feature",
                        "properties": {
                            "code": nestedItem.codice,
                            "desc": nestedItem.descrizione
                        }
                    };
                });
            }
            return [];
        });
    };
    const createEntry = (desc, tipo) => (matched) => ({
        type: "Feature",
        resultCssStyle: {
            backgroundColor: "#d3d3d3",
            borderColor: "grey"
        },
        properties: {
            tipo: tipo,
            descTipo: desc,
            title: matched.name,
            description: desc,
            code: matched.code
        }
    });
    const bzComuniCatastali = (searchText, {comuni = [
        { name: "Bolzano / Bozen", code: 613},
        { name: "Dodiciville / Zwölfmalgreien", code: 652},
        { name: "Gries / Gries", code: 669 }
    ]} = {}) => {
        const types = [
            ["Particella Fondiaria / Grundparzelle", " partfond"],
            ["Particella Edificabile / Bauparzelle", "partedif"]
        ];
        const entries = comuni.map(createEntry(...types[0]))
        .concat(
            comuni.map(createEntry(...types[1]))
        );
        const results = entries.filter( ({properties={}}) =>
            properties.title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
            || properties.descTipo.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
        );
        return new Promise((resolve) => {
            resolve(results);
        });
    };

    const bzParticella = (searchText, {protocol, host, pathname, item} = {}) => {
        let params = {
            query: searchText,
            tipo: item.properties.tipo,
            comcat: item.properties.code
        };
        let url = urlUtil.format({
            protocol,
            host,
            pathname,
            query: params
        });
        return axios.post(url).then( (res) => {
            if (res && res.data && res.data.success) {
                return res.data.particelle.map((nestedItem) => {
                    return {
                        "type": "Feature",
                        "properties": {
                            "tipo": "particella",
                            "comcat": item.properties.code,
                            "tipopart": item.properties.tipo,
                            "codice": nestedItem.codice,
                            "descTipo": item.properties.descTipo
                        }
                    };
                });
            }
            return [];
        });
    };
    API.Utils.setService("bzVie", bzVie);
    API.Utils.setService("bzCivico", bzCivico);
    API.Utils.setService("bzComuniCatastali", bzComuniCatastali);
    API.Utils.setService("bzParticella", bzParticella);
    return Rx.Observable.empty();
});


module.exports = {
    registerSearchServiceEpic,
    getActualLang,
    getBzVieUrl
};
