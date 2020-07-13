/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const Rx = require('rxjs');
const {MAP_CONFIG_LOADED} = require('../../MapStore2/web/client/actions/config');
const {LOCATION_CHANGE} = require('connected-react-router');
const {API} = require('../../MapStore2/web/client/api/searchText');
const url = require('url');
const {selectNestedService, selectSearchItem, resultsPurge, resetSearch, searchTextChanged} = require('../../MapStore2/web/client/actions/search');
const {mapSelector} = require('../../MapStore2/web/client/selectors/map');
const {head, trim} = require('lodash');
const {optionsSelector} = require('../selectors/searchparcel');
const {warning, error} = require('../../MapStore2/web/client/actions/notifications');
const {loadingParcel, COMPLETE_SEARCH, completeSearch} = require('../actions/searchparcel');
const {get} = require('lodash');

const loadedParcelResults = (state, {results, codice, nestedService, comcatObj, style, mapConfig}) => {
    const item = results && head((results || [])
        .filter(result => result.properties && result.properties.codice && result.properties.codice + '' === codice + '')
        .map(result => ({...result, __SERVICE__: nestedService}))
    );
    return item && mapConfig ?
        Rx.Observable.concat(
            Rx.Observable.of(
                selectNestedService(
                    [nestedService],
                    {
                        text: comcatObj && comcatObj.properties && comcatObj.properties.title,
                        placeholder: '',
                        placeholderMsgId: ''
                    },
                    ''
                ),
                selectSearchItem(item, mapConfig, style),
                loadingParcel(false),
                resultsPurge(),
                completeSearch()
            )
        )
        : Rx.Observable.of(
            loadingParcel(false),
            resultsPurge(),
            resetSearch(),
            warning({
                title: 'searchparcel.warningTitle',
                message: 'searchparcel.warningMessage',
                autoDismiss: 6,
                position: 'tc'
            }),
            completeSearch()
        );
};

const searchParcel = (action$, store, locale, map) => {
    const state = store.getState();
    const {service, style, searchKeys} = optionsSelector(state);

    return service && service.type ? Rx.Observable.fromPromise(API.Utils.getService(service.type)(''))
        .switchMap(comuniCatastali => {
            const mapConfig = map || mapSelector(state);

            const search = get(locale, 'payload.location.search', '');
            const query = url.parse(search, true).query;

            const comcat = searchKeys && searchKeys.comcat && query[searchKeys.comcat] || query && query.comcat;
            const codice = searchKeys && searchKeys.codice && query[searchKeys.codice] || query && query.codice;
            const type = searchKeys && searchKeys.type && query[searchKeys.type] || query && query.type;
            const comcatObj = head(comuniCatastali.filter(comune => comune && comune.properties && comune.properties.code
                && trim(comune.properties.code + '') === trim(comcat + '') && trim(comune.properties.tipo + '') === trim(type + '')));

            const nestedService = head((service && service.then || []).map((nestedServ) => ({
                ...nestedServ,
                options: {
                    item: comcatObj,
                    ...nestedServ.options
                }
            })));

            return !comcatObj || !codice || !type || !nestedService ?
                Rx.Observable.of(resultsPurge(), resetSearch(), loadingParcel(false), completeSearch())
                : Rx.Observable.concat(
                    Rx.Observable.of(
                        loadingParcel(true),
                        searchTextChanged(' ')
                    ),
                    Rx.Observable.fromPromise(API.Utils.getService(nestedService.type)(codice, {...nestedService.options}))
                        .switchMap((results) => loadedParcelResults(state, {results, codice, nestedService, comcatObj, style, mapConfig}))
                        .catch(() => {
                            return Rx.Observable.of(
                                loadingParcel(false),
                                resultsPurge(),
                                resetSearch(),
                                error({
                                    title: 'searchparcel.errorTitle',
                                    message: 'searchparcel.errorMessage',
                                    autoDismiss: 6,
                                    position: 'tc'
                                }),
                                completeSearch()
                            );
                        })
                );
        })
        .startWith(loadingParcel(false))
        .takeUntil(action$.ofType(COMPLETE_SEARCH))
        :
        Rx.Observable.of(completeSearch());
};

const searchParcelEpic = (action$, store) =>
    action$.ofType(LOCATION_CHANGE)
        .switchMap((locale) => {
            const map = mapSelector(store.getState());
            return map && map.center && Rx.Observable.concat(
                Rx.Observable.of(
                    resultsPurge(),
                    resetSearch()
                ),
                searchParcel(action$, store, locale, map)
            ) ||
            action$.ofType(MAP_CONFIG_LOADED)
                .switchMap(() => searchParcel(action$, store, locale))
                .takeUntil(action$.ofType(COMPLETE_SEARCH));
        });

module.exports = {
    searchParcelEpic
};
