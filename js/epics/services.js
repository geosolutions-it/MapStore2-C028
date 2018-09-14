const Rx = require('rxjs');
const { pathnameSelector } = require('../../MapStore2/web/client/selectors/routing');

const { setControlProperty, RESET_CONTROLS } = require('../../MapStore2/web/client/actions/controls');

const { APPLY_CHANGES, RESET, reset, applyChanges } = require('../actions/services');
const { MAP_CONFIG_LOADED } = require('../../MapStore2/web/client/actions/config');

const { valuesSelector, getViewParamsLayers, getCqlLayers, getServiziLayers } = require('../selectors/services');
const { changeLayerParams } = require('../../MapStore2/web/client/actions/layers');
const moment = require('moment');

const getDate = d => moment(d).format('YYYY-MM-DD');
/**
 * normalize form values to make easier to create the filter
 * @return an object composed by the array of selected `days`, `types`, `fromDate` and `toDate`
 */


const toServiziFilter = (values) => { 
    const type = values.serviceTypeList;
    const serviziTypes = Object.keys(values.serviceTypeList).filter(t => type[t]);
    const typesParam = serviziTypes.length > 0 ? serviziTypes : ["0"];

    return (typesParam.map(d => `CATE_ROOT_CODE='${d}'`).join(" OR "));
};

const shouldInit = ({ getState = () => { } } = {}) => {
    const pathName = pathnameSelector(getState()) || "";
    return pathName.indexOf("serviceFilters") >= 0;
};
module.exports = {
    updateRoadAccidentLayers: (action$, { getState = () => { } } = {}) =>
        action$.ofType(APPLY_CHANGES).switchMap(() =>
            // Send an update action for each layer to update...
            Rx.Observable.from([

                ...getServiziLayers(getState())
                    .map(l => changeLayerParams(l.id, {
                        "CQL_FILTER": toServiziFilter(valuesSelector(getState()))
                    })
                    )    

            ])),
    accidentsAutoApplyOnReset: action$ => action$.ofType(RESET).switchMap(() => Rx.Observable.of(applyChanges())),
    accidentsInitialSetup: (action$, store) => action$
        .ofType(MAP_CONFIG_LOADED)
        .filter(() => shouldInit(store))
        .switchMap(() => Rx.Observable.of(
                reset(),
                setControlProperty("drawer", "enabled", true),
                setControlProperty("drawer", "menu", '2')
            ).merge(
                action$.ofType(RESET_CONTROLS).take(1).map(() => setControlProperty("drawer", "menu", '1'))
            )
        )
};
