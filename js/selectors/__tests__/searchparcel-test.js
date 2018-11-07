/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const expect = require('expect');

const {
    optionsSelector,
    loadingSelector
} = require('../searchparcel');

describe('Test correctness of the searchparcel selectors', () => {

    it('optionsSelector', () => {
        expect(optionsSelector({})).toEqual({});
        expect(optionsSelector({searchparcel: { options: {} }})).toEqual({ options: {} });
    });

    it('loadingSelector', () => {
        expect(loadingSelector({})).toEqual(false);
        expect(loadingSelector({searchparcel: {loading: true}})).toEqual(true);
    });

});
