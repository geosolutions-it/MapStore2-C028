const Rx = require('rxjs');
const { pathnameSelector } = require('../../MapStore2/web/client/selectors/router');

const { setControlProperty, RESET_CONTROLS } = require('../../MapStore2/web/client/actions/controls');

const { APPLY_CHANGES, RESET, reset, applyChanges } = require('../actions/accidents');
const { MAP_CONFIG_LOADED } = require('../../MapStore2/web/client/actions/config');

const { valuesSelector, getViewParamsLayers, getCqlLayers } = require('../selectors/accidents');
const { changeLayerParams } = require('../../MapStore2/web/client/actions/layers');
const moment = require('moment');

const getDate = d => moment(d).format('YYYY-MM-DD');
/**
 * normalize form values to make easier to create the filter
 * @return an object composed by the array of selected `days`, `types`, `fromDate` and `toDate`
 */
const getParams = ({ dow = {}, type = {}, period = {} }) => {
    const days = Object.keys(dow).filter(d => dow[d]);
    const types = Object.keys(type).filter(t => type[t]);
    const fromDate = getDate(period.fromdate);
    const toDate = getDate(period.todate);
    return {
        days,
        types,
        fromDate,
        toDate
    };
};

/**
 * Transforms form values into viewparams
 */
const toViewParams = (values) => {
    const { days, types, fromDate, toDate } = getParams(values);
    const daysParam = days.length > 0 ? days.join('\\,') : "0";
    const typesParam = types.length > 0 ? types.join('\\,') : "0";
    return `dow_p:${daysParam};tpinc_p:${typesParam}` + (fromDate && toDate ? `;fromdate_p:${fromDate};todate_p:${toDate}` : '');
};

/**
 * Transforms form values into a CQL filter
 */
const toCqlFilter = (values) => {
    const { days, types, fromDate, toDate } = getParams(values);
    const daysParam = days.length > 0 ? days : ["0"];
    const typesParam = types.length > 0 ? types : ["0"];
    return [
        `( DTINCID <= '${toDate}' AND DTINCID >= '${fromDate}' )`,
        "(" + (daysParam.map(d => `DOW='${d}'`).join(" OR ")) + ")",
        "(" + (typesParam.map(d => `TPINCID='${d}'`).join(" OR ")) + ")"
    ].join(" AND ");
};

const shouldInit = ({ getState = () => { } } = {}) => {
    const pathName = pathnameSelector(getState()) || "";
    return pathName.indexOf("roadAccidents") >= 0;
};
module.exports = {
    updateRoadAccidentLayers: (action$, { getState = () => { } } = {}) =>
        action$.ofType(APPLY_CHANGES).switchMap(() =>
            // Send an update action for each layer to update...
            Rx.Observable.from([
                // Layer(s) that need to update view params...
                ...getViewParamsLayers(getState())
                    .map(l => changeLayerParams(l.id, {
                        "VIEWPARAMS": toViewParams(valuesSelector(getState()))
                    })
                    ),
                // ...and layer(s) that need to update cql_filter
                ...getCqlLayers(getState()).
                    map(l => changeLayerParams(l.id, {
                        "CQL_FILTER": toCqlFilter(valuesSelector(getState()))
                    })
                    )
            ])),
    accidentsAutoApplyOnReset: action$ => action$.ofType(RESET).switchMap(() => Rx.Observable.of(applyChanges())),
    accidentsInitialSetup: (action$, store) => action$
        .ofType(MAP_CONFIG_LOADED)
        .filter(() => {
            return shouldInit(store);
        })
        .switchMap(() => Rx.Observable.of(
                reset(),
                setControlProperty("drawer", "enabled", true),
                setControlProperty("drawer", "menu", '2')
            ).merge(
                action$.ofType(RESET_CONTROLS).take(1).map(() => setControlProperty("drawer", "menu", '1'))
            )
        )
};
