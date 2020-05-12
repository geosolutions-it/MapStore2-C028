/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const assign = require('object-assign');
const {isString, isEmpty, isArray} = require('lodash');
const LocaleUtils = require('../../MapStore2/web/client/utils/LocaleUtils');

const ProjectUtils = {
    getKeywordsTranslations: (capabilities) => {
        const locales = LocaleUtils.getSupportedLocales();
        const translations = capabilities.KeywordList && capabilities.KeywordList.Keyword && isArray(capabilities.KeywordList.Keyword) ? capabilities.KeywordList.Keyword.filter((keyword) =>
            Object.keys(locales).filter((locale) => isString(keyword) && keyword.substring(0, 3) === locale + '=').length > 0
        ).reduce((previous, current) => {
            const values = current.split('=');
            return assign(previous, {
                [locales[values[0]].code]: values[1]
            });
        }, {}) : {};
        return isEmpty(translations) ? capabilities.Title : assign({'default': capabilities.Title || ''}, translations);
    },
    getGroupsTitleTranslations: (title) => {
        const locales = LocaleUtils.getSupportedLocales();
        const localIndexs = [].concat(Object.keys(locales));
        let titles = title.split('_');
        titles = titles.splice(0, localIndexs.length);
        return titles.reduce((previous, current, idx) => {
            return assign(previous, {
                [locales[localIndexs[idx]].code]: current
            });
        }, {'default': titles[0]});
    }
};

module.exports = ProjectUtils;
