
const { ON_CHANGE, APPLY_CHANGES, RESET} = require('../actions/services');

const { set } = require('../../MapStore2/web/client/utils/ImmutableUtils');


const DEFAULT_STATE = {
    serviziLayer: [{
        predicate: {
            name: "Cartografia:servizi_testa"
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
            return set(`values.${action.name}`, action.value, set('modified', true, state));
        case RESET:
            return set('values', action.values, set('modified', false, state));
        case APPLY_CHANGES:
            return set('modified', false, state);
        default:
            return state;
    }

};
