/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {get} = require('lodash');

module.exports = {
    optionsSelector: state => state && get(state, 'searchparcel') || {},
    loadingSelector: state => state && get(state, 'searchparcel.loading') ? true : false
};
