
const {ON_CHANGE} = require('../actions/accidents');

const { set } = require('../../MapStore2/web/client/utils/ImmutableUtils');


const DEFAULT_STATE = {
    cqlLayers: [{
        predicate: {
            name: "Cartografia:view_incidenti"
        }
    }],
    viewParamsLayers: [{
        predicate: {
            name: "Cartografia:view_str_inc"
        }
    }]
};
/**
 * Reducer for accidents.
 * Manages the state of RoadAccidents plugin
 */
module.exports = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case ON_CHANGE:
            return set(`values.${action.name}`, action.value, state);
        default:
            return state;
    }

};
