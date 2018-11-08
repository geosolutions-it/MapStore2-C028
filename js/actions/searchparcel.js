/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const SET_OPTIONS = 'SEARCH_PARCEL:SET_OPTIONS';
const LOADING_PARCEL = 'SEARCH_PARCEL:LOADING_PARCEL';
const COMPLETE_SEARCH = 'SEARCH_PARCEL:COMPLETE_SEARCH';

function setOptions(options) {
    return {
        type: SET_OPTIONS,
        options
    };
}

function loadingParcel(loading) {
    return {
        type: LOADING_PARCEL,
        loading
    };
}

function completeSearch() {
    return {
        type: COMPLETE_SEARCH
    };
}

module.exports = {
    SET_OPTIONS,
    LOADING_PARCEL,
    COMPLETE_SEARCH,
    setOptions,
    loadingParcel,
    completeSearch
};
