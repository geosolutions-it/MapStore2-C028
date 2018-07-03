/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const {SET_OPTIONS, LOADING_PARCEL} = require('../actions/searchparcel');

function searchparcel(state = {}, action) {
    switch (action.type) {
        case SET_OPTIONS: {
            return {...state, ...action.options};
        }
        case LOADING_PARCEL: {
            return {...state, loading: action.loading};
        }
        default:
            return state;
    }
}

module.exports = searchparcel;
