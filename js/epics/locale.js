/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const Rx = require('rxjs');
const {CHANGE_LOCALE} = require('../../MapStore2/web/client/actions/locale');
const {MAP_CONFIG_LOADED} = require('../../MapStore2/web/client/actions/config');
const {layersSelector} = require('../../MapStore2/web/client/selectors/layers');
const {updateNode} = require('../../MapStore2/web/client/actions/layers');
const ProjectUtils = require('../utils/ProjectUtils');
const {currentLocaleSelector} = require('../../MapStore2/web/client/selectors/locale');
const {head} = require('lodash');

const addLayersStyleLocalization = (action$, store) =>
    action$.ofType(CHANGE_LOCALE, MAP_CONFIG_LOADED)
        .switchMap(() => {
            const layers = layersSelector(store.getState());
            const currentLocale = head(currentLocaleSelector(store.getState()).split('-'));
            return layers && layers.length > 0 ?
            Rx.Observable.from(layers)
                .filter((layer) => layer.availableStyles && layer.availableStyles.length > 0 && layer.group !== 'background')
                .map((layer) => {
                    const style = ProjectUtils.getLocalizedStyle(layer.style, layer.availableStyles, currentLocale || 'it');
                    return Rx.Observable.of(updateNode(layer.id, "id", {style}));
                })
                .mergeAll()
            : Rx.Observable.empty();
        });

module.exports = {
    addLayersStyleLocalization
};
