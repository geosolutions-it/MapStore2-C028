/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const PropTypes = require('prop-types');
const src = require("../../assets/img/logo.jpg");
require('./footer/footer.css');
const HTML = require('../../MapStore2/web/client/components/I18N/HTML');
const LocaleUtils = require('../../MapStore2/web/client/utils/LocaleUtils');

class Footer extends React.Component {

    static contextTypes = {
       messages: PropTypes.object
    };

    render() {
        return (
            <div className="ms-footer col-md-12">
                <div>
                    <div><a target="_blank" href="http://www.comune.bolzano.it/index_it.html"> <img src={src} width="140" title={LocaleUtils.getMessageById(this.context.messages, "home.descriptionLogo")} alt={LocaleUtils.getMessageById(this.context.messages, "home.descriptionLogo")} /></a> <br/><br/></div>
                    <HTML msgId="home.footer" />
                </div>
            </div>
        );
    }
}

module.exports = {
    FooterPlugin: Footer
};
