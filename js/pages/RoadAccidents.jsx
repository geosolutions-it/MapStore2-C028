/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const { connect } = require('react-redux');
const url = require('url');
const urlQuery = url.parse(window.location.href, true).query;
const ConfigUtils = require('../../MapStore2/web/client/utils//ConfigUtils');

const MapViewerCmp = require('../../MapStore2/web/client/product/components/viewer/MapViewerCmp');
const { loadMapConfig } = require('../../MapStore2/web/client/actions/config');
const { initMap } = require('../../MapStore2/web/client/actions/map');
const MapViewerContainer = require('../../MapStore2/web/client/containers/MapViewer');

class MapViewerPage extends React.Component {
    static propTypes = {
        mode: PropTypes.string,
        match: PropTypes.object,
        loadMapConfig: PropTypes.func,
        onInit: PropTypes.func,
        plugins: PropTypes.object,
        wrappedComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        location: PropTypes.object
    };

    static defaultProps = {
        mode: 'desktop',
        plugins: {},
        pluginsConfig: [],
        wrappedContainer: MapViewerContainer
    };
    componentWillMount() {
        let pluginsConfigs = ConfigUtils.getConfigProp("plugins") || {};
        this.setState({
            pluginsConfig: {
                "desktop": [
                    ...(pluginsConfigs.desktop || []),
                    ...(pluginsConfigs.roadAccidents || ["RoadAccidents"])],
                "mobile": [
                    ...(pluginsConfigs.mobile || []),
                    ...(pluginsConfigs.roadAccidents || ["RoadAccidents"])]
            }
        });
    }
    render() {
        return (<MapViewerCmp {...this.props} pluginsConfig={this.state.pluginsConfig}/>);
    }
}

module.exports = connect((state) => ({
    mode: urlQuery.mobile || state.browser && state.browser.mobile ? 'mobile' : 'desktop'
}),
{
    loadMapConfig,
    onInit: initMap
})(MapViewerPage);
