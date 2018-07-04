const Rx = require('rxjs');
const { APPLY_CHANGES, reset } = require('../actions/accidents');
const {MAP_CONFIG_LOADED} = require('../../MapStore2/web/client/actions/config');

const { valuesSelector, getViewParamsLayers, getCqlLayers } = require('../selectors/accidents');
const { changeLayerParams } = require('../../MapStore2/web/client/actions/layers');


const getDate = d => d && d.toISOString && d.toISOString().split("T")[0];
/**
 * normalize form values to make easier to create the filter
 * @return an object composed by the array of selected `days`, `types`, `fromDate` and `toDate`
 */
const getParams = ({dow = {}, type = {}, period = {}}) => {
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
    const {days, types, fromDate, toDate} = getParams(values);
    const daysParam = days.length > 0 ? days.join('\\,') : "0";
    const typesParam = types.length > 0 ? types.join('\\,') : "0";
    // TODO: from and todate
    return `dow_p:${daysParam};tpinc_p:${typesParam};` + fromDate && toDate ? `fromdate_p:${fromDate};todate_p:${toDate}` : '';
};

/**
 * Transforms form values into a CQL filter
 */
const toCqlFilter = (values) => {
    const {days, types, fromDate, toDate} = getParams(values);
    const daysParam = days.length > 0 ? days : ["0"];
    const typesParam = types.length > 0 ? types : ["0"];
    return [
        `( DTINCID <= '${toDate}' AND DTINCID >= '${fromDate}' )`,
        "(" + (daysParam.map(d => `DOW='${d}'`).join(" OR ")) + ")",
        "(" + (typesParam.map(d => `TPINCID='${d}'`).join(" OR ")) + ")"
    ].join(" AND ");
};
module.exports = {
    updateRoadAccidentLayers: (action$, {getState = () => {}} = {}) =>
        action$.ofType( APPLY_CHANGES ).switchMap( () =>
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
    accidentsInitialSetup: action$ => action$.ofType(MAP_CONFIG_LOADED).switchMap(() => Rx.Observable.of(reset()))
};
