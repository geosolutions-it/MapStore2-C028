/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const assign = require('object-assign');
const {isString, isEmpty, isArray, head} = require('lodash');
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
    },
    getLocalizedStyle: (style, availableStyles, currentLocale) => {
        /*
        HOW IT WORKS:
        - if it exists a localized style among the supported locales, it uses that localized style
        - if it not exists a localized style, it uses the style from the layer conf.
        */
        const locales = LocaleUtils.getSupportedLocales();
        const firstAvailableStyle = availableStyles && availableStyles.length > 0 ? availableStyles[0].name || availableStyles[0].Name : style;
        const currentStyle = style ? style : firstAvailableStyle;

        if (!!currentStyle) {
            const currentSuffix = currentStyle.substring(currentStyle.length - 3, currentStyle.length);
            const isLocale = head(Object.keys(locales).filter((loc) => {
                return currentSuffix === '_' + loc;
            }));
            const styleRoot = isLocale ? currentStyle.substring(0, currentStyle.length - 3) : currentStyle;
            const localizedStyle = head(availableStyles
                .filter((st) => st.name === styleRoot + '_' + currentLocale || st.Name === styleRoot + '_' + currentLocale)
                .map((st) => st.name || st.Name));
            return localizedStyle ? localizedStyle : currentStyle;
        }
        return style;
    }
};

module.exports = ProjectUtils;
