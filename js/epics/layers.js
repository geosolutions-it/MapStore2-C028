/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this; source tree.
 */

const Rx = require('rxjs');
const {LOCAL_CONFIG_LOADED} = require('../../MapStore2/web/client/actions/localConfig');
const Api = require('../../MapStore2/web/client/api/WMS');
const ProjectUtils = require('../utils/ProjectUtils');
const LayersUtils = require('../../MapStore2/web/client/utils/LayersUtils');
const {REFRESH_LAYERS, layersRefreshed, updateNode, layersRefreshError} = require('../../MapStore2/web/client/actions/layers');
const {groupsSelector} = require('../../MapStore2/web/client/selectors/layers');
const {currentLocaleSelector} = require('../../MapStore2/web/client/selectors/locale');

const assign = require('object-assign');
const {isString, isArray, head} = require('lodash');

const getUpdates = (updates, options) => {
    return Object.keys(options).filter((opt) => options[opt]).reduce((previous, current) => {
        return assign(previous, {
            [current]: updates[current]
        });
    }, {});
};

const removeWorkspace = (layer) => {
    if (layer.indexOf(':') !== -1) {
        return layer.split(':')[1];
    }
    return layer;
};

const updateMapEpic = (action$, store) =>
    action$.ofType(REFRESH_LAYERS)
        .debounce(({debounceTime = 500} = {}) => Rx.Observable.timer(debounceTime) )
        .switchMap(action => {
            // update groups name
            return Rx.Observable.defer(() => !!action.options.groups ?
                Rx.Observable.from(groupsSelector(store.getState()))
                    .switchMap((group) => {
                        const title = isString(group.title) ? ProjectUtils.getGroupsTitleTranslations(group.title) : group.title;
                        return Rx.Observable.of(updateNode(group.id, "groups", {title}));
                    })
                : Rx.Observable.empty()
            ).concat(
            Rx.Observable.from(
                action.layers.map((layer) =>
                    Rx.Observable.forkJoin(
                        Api.getCapabilities(LayersUtils.getCapabilitiesUrl(layer), true)
                            .then( (json) => {
                                const root = (json.WMS_Capabilities || json.WMT_MS_Capabilities).Capability;
                                const layersObj = Api.flatLayers(root);
                                const layers = isArray(layersObj) ? layersObj : [layersObj];
                                return head(layers.filter((l) => l.Name === removeWorkspace(layer.name) || l.Name === layer.name));
                            }).catch((e) => ({layer: layer.id, fullLayer: layer, error: e})),
                        Api.describeLayer(layer.url, layer.name)
                            .then( (result) => {
                                if (result && result.name === layer.name && result.owsType === 'WFS') {
                                    return {
                                        url: result.owsURL,
                                        type: 'wfs'
                                    };
                                }
                                return null;
                            }).catch((e) => ({layer: layer.id, fullLayer: layer, error: e}))
                    ).concatMap(([caps, describe]) => {
                        if (!caps) {
                            return Rx.Observable.of({layer: layer.id, fullLayer: layer, error: 'Missing layer'});
                        }
                        if (caps.error) {
                            return Rx.Observable.of(caps.error && caps);
                        }

                        // set style by language
                        const availableStyles = isArray(caps.Style) ? caps.Style : [];
                        const currentLocale = head(currentLocaleSelector(store.getState()).split('-'));
                        const style = ProjectUtils.getLocalizedStyle(layer.style, availableStyles, currentLocale || 'it');

                        return Rx.Observable.of(assign({layer: layer.id, title: ProjectUtils.getKeywordsTranslations(caps), style, availableStyles, bbox: Api.getBBox(caps, true), dimensions: Api.getDimensions(caps)}, (describe && !describe.error) ? {search: describe} : {}));
                    })
                )
            )
            .mergeAll()
            .map((layer) => {
                if (layer.error) {
                    return Rx.Observable.of(layersRefreshError([layer], layer.error.message));
                }
                return Rx.Observable.from([layersRefreshed([layer]), updateNode(layer.layer, "id", getUpdates({
                    bbox: layer.bbox,
                    search: layer.search,
                    title: layer.title,
                    dimensions: layer.dimensions,
                    availableStyles: layer.availableStyles,
                    style: layer.style
                }, action.options))]);
            })
            .mergeAll());
        });


const registerCustomLayersUtilsEpic = action$ => action$.ofType(LOCAL_CONFIG_LOADED).switchMap(() => {
    // registering custom LayerUtils
    LayersUtils.setCustomUtils("getLayerTitleTranslations", ProjectUtils.getKeywordsTranslations);
    return Rx.Observable.empty();
});

module.exports = {
    registerCustomLayersUtilsEpic,
    updateMapEpic
};
