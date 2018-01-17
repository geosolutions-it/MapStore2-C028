/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');
const LocaleUtils = require('../MapStore2/web/client/utils/LocaleUtils');
const {registerSearchServiceEpic} = require('./epics/search');
const {registerCustomLayersUtilsEpic} = require('./epics/layers');
const {addLayersStyleLocalization, checkEmptyAvailableStyles, closePrintOnChangeLocale} = require('./epics/locale');

const startApp = () => {
    const ConfigUtils = require('../MapStore2/web/client/utils/ConfigUtils');

    const {loadMaps} = require('../MapStore2/web/client/actions/maps');
    const {loadVersion} = require('../MapStore2/web/client/actions/version');

    const StandardApp = require('../MapStore2/web/client/components/app/StandardApp');

    const {pages, pluginsDef, initialState, storeOpts} = require('./appConfig');
    LocaleUtils.setSupportedLocales({
         "it": {
             code: "it-IT",
             description: "Italiano"
         },
         "de": {
           code: "de-DE",
           description: "Deutsch"
         }
    });
    const StandardRouter = connect((state) => ({
        locale: state.locale || {},
        pages,
        version: state.version && state.version.current
    }))(require('../MapStore2/web/client/components/app/StandardRouter'));

    const appStore = require('../MapStore2/web/client/stores/StandardStore').bind(null, initialState, {
        maps: require('../MapStore2/web/client/reducers/maps'),
        security: require('../MapStore2/web/client/reducers/security')
    }, {registerSearchServiceEpic, registerCustomLayersUtilsEpic, addLayersStyleLocalization, checkEmptyAvailableStyles, closePrintOnChangeLocale});

    const initialActions = [
        loadVersion,
        () => loadMaps(ConfigUtils.getDefaults().geoStoreUrl, ConfigUtils.getDefaults().initialMapFilter || "*")
    ];

    const appConfig = {
        storeOpts,
        appStore,
        pluginsDef,
        initialActions,
        appComponent: StandardRouter,
        printingEnabled: true
    };

    ReactDOM.render(
        <StandardApp {...appConfig}/>,
        document.getElementById('container')
    );
};

if (!global.Intl ) {
    // Ensure Intl is loaded, then call the given callback
    LocaleUtils.ensureIntl(startApp);
}else {
    startApp();
}
