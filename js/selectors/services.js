const { get, overSome, filter} = require('lodash');
const { layersSelector } = require('../../MapStore2/web/client/selectors/layers');

/**
 * gets the values of the services form
 */
const valuesSelector = state => get(state, "services.values");

/**
 * Return a selector for values of services form
 * @param name the path to the value
 */
const valueSelectorCreator = name => state => get(valuesSelector(state), name);

const getCqlLayersPredicates = state => get(state, "services.cqlLayers").map( ({predicate} = {}) => predicate);
const getViewParamsLayersPredicates = state => get(state, "services.viewParamsLayers").map( ({predicate} = {}) => predicate);
const getServiziLayersPredicates = state => get(state, "services.serviziLayer").map( ({predicate} = {}) => predicate);

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
const getServiziLayers = state => filter((layersSelector(state) || []), overSome(getServiziLayersPredicates(state)));
const isModified = state => get(state, "services.modified");

module.exports = {
    valueSelectorCreator,
    valuesSelector,
    getCqlLayers,
    getViewParamsLayers,
    getServiziLayers,
    isModified
};
