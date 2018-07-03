const Rx = require('rxjs');
const { APPLY_CHANGES } = require('../actions/accidents');
const { valuesSelector, getViewParamsLayers, getCqlLayers } = require('../selectors/accidents');
const changeLayerParams = (layer, params) => ({type: "CHANGE_LAYER_PARAMS", layer, params}); // TODO: include real one when updated ms2

const getParams = ({dow = {}, type = {}, period = {}}) => {
    const days = Object.keys(dow).filter(d => dow[d]);
    const types = Object.keys(type).filter(t => type[t]);
    const fromDate = period.from;
    const toDate = period.to;
    return {
        days,
        types,
        fromDate,
        toDate
    }
};


const toViewParams = (values) => {
    const {days, types, fromDate, toDate} = getParams(values);
    const daysParam = days.length > 0 ? days.join('\\,') : "0";
    const typesParam = types.length > 0 ? types.join('\\,') : "0";
    // TODO: from and todate
    return `dow_p:${daysParam};tpinc_p:${typesParam}`;
};


const toCqlFilter = () => "INCLUDE";
module.exports = {
    updateRoadAccidentLayers: (action$, {getState = () => {}} = {}) =>
        action$.ofType( APPLY_CHANGES ).switchMap( () =>
            //Send an update action for each layer to update...
            Rx.Observable.from([
                // layer(s) that need to update view params...
                ...getViewParamsLayers(getState())
                    .map(l => changeLayerParams(l.id, {
                        "viewparams": toViewParams(valuesSelector(getState()))
                        })
                    ),
                // ...and layers that need to update cql_filter
                ...getCqlLayers(getState()).
                    map(l => changeLayerParams(l.id, {
                            "cql_filter": toCqlFilter(valuesSelector(getState()))
                        })
                    )
            ]))
};
