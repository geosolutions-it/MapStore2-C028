/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const expect = require('expect');

const {
    SET_OPTIONS,
    LOADING_PARCEL,
    COMPLETE_SEARCH,
    setOptions,
    loadingParcel,
    completeSearch
} = require('../searchparcel');

describe('Test correctness of the searchparcel actions', () => {

    it('setOptions', () => {
        const result = setOptions({service: {}});
        expect(result.type).toEqual(SET_OPTIONS);
        expect(result.options).toEqual({service: {}});
    });

    it('loadingParcel', () => {
        const result = loadingParcel(true);
        expect(result.type).toEqual(LOADING_PARCEL);
        expect(result.loading).toEqual(true);
    });

    it('completeSearch', () => {
        const result = completeSearch();
        expect(result.type).toEqual(COMPLETE_SEARCH);
    });
});
