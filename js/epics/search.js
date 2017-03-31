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
const axios = require('axios');
const urlUtil = require('url');

const registerSearchServiceEpic = action$ => action$.ofType(LOCAL_CONFIG_LOADED).switchMap(() => {
    // registering the custom Services

    const bzVie = (searchText, {protocol, host, pathname, lang}) => {
        let params = assign({}, {query: searchText, lang});
        let url = urlUtil.format({
            protocol,
            host,
            pathname,
            query: params
        });
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

    API.Utils.setService("bzVie", bzVie);
    API.Utils.setService("bzCivico", bzCivico);
    return Rx.Observable.empty();
});


module.exports = {
    registerSearchServiceEpic
};
