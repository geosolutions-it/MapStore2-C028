/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const expect = require('expect');

const searchparcel = require('../searchparcel');
const {setOptions, loadingParcel} = require('../../actions/searchparcel');

describe('Test the searchparcel reducer', () => {

    it('setOptions', () => {
        const state = searchparcel(undefined, setOptions({service: 'service'}));
        expect(state.service).toBe('service');
    });

    it('loadingParcel', () => {
        const state = searchparcel(undefined, loadingParcel(true));
        expect(state.loading).toBe(true);
    });
});
