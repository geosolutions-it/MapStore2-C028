/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const Page = require('../../MapStore2/web/client/containers/Page');

const {loadMapConfig} = require('../../MapStore2/web/client/actions/config');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');
const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');

class Home extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        mode: PropTypes.string,
        match: PropTypes.object,
        loadMaps: PropTypes.func,
        reset: PropTypes.func,
        plugins: PropTypes.object
    };

    static contextTypes = {
        router: PropTypes.object
    };

    static defaultProps = {
        name: "manager",
        mode: 'desktop',
        loadMaps: () => {},
        reset: () => {}
    };

    componentDidMount() {
        this.props.reset();
        this.props.loadMaps(ConfigUtils.getDefaults().geoStoreUrl);
    }

    render() {
        let plugins = ConfigUtils.getConfigProp("plugins") || {};
        let pagePlugins = {
            "desktop": plugins.common || [], // TODO mesh page plugins with other plugins
            "mobile": plugins.common || []
        };
        let pluginsConfig = {
            "desktop": plugins[this.props.name] || [], // TODO mesh page plugins with other plugins
            "mobile": plugins[this.props.name] || []
        };

        return (<Page
            id="page-manager"
            pagePluginsConfig={pagePlugins}
            pluginsConfig={pluginsConfig}
            plugins={this.props.plugins}
            params={this.props.match.params}
            />);
    }
}

module.exports = connect((state) => {
    return {
        mode: 'desktop',
        messages: state.locale && state.locale.messages || {}
    };
}, {
    loadMapConfig,
    reset: resetControls
})(Home);
