const { get, overSome, filter} = require('lodash');
const { layersSelector } = require('../../MapStore2/web/client/selectors/layers');

/**
 * gets the values of the accidents form
 */
const valuesSelector = state => get(state, "accidents.values");

/**
 * Return a selector for values of accidents form
 * @param name the path to the value
 */
const valueSelectorCreator = name => state => get(valuesSelector(state), name);

const getCqlLayersPredicates = state => get(state, "accidents.cqlLayers").map( ({predicate} = {}) => predicate);
const getViewParamsLayersPredicates = state => get(state, "accidents.viewParamsLayers").map( ({predicate} = {}) => predicate);

/**
 * return all the layer configured to work with accident's plugin using cql filter.
 * The layers are the ones that match 1 of the conditions of the predicates array
 * @param {object} state the state
 */
const getCqlLayers = state => filter((layersSelector(state) || []), overSome(getCqlLayersPredicates(state)));
/**
 * return all the layer configured to work with accident's plugin using view params.
 * The layers are the ones that match 1 of the conditions of the predicates array
 * @param {object} state the state
 */
const getViewParamsLayers = state => filter((layersSelector(state) || []), overSome(getViewParamsLayersPredicates(state)));
const isModified = state => get(state, "accidents.modified");

module.exports = {
    valueSelectorCreator,
    valuesSelector,
    getCqlLayers,
    getViewParamsLayers,
    isModified
};
