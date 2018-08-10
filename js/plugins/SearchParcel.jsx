/**
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const {createSelector} = require('reselect');
const Loader = require('../../MapStore2/web/client/components/misc/Loader');
const Message = require('../../MapStore2/web/client/components/I18N/Message');

/**
 * SearchParcel Plugin.
 * Add particella, comCat and tipoPart paramiters to url to search a specific parcel.
 * All paramiters must be declared in url.
 * Application will not perform searches in case of missing query param or services.
 *
 * example for partedif
 * /#/viewer/openlayers/:mapid
 *  ?particella=.442
 *  &comCat=669
 *  &tipoPart=partedif
 *
 * example for partfond
 * /#/viewer/openlayers/:mapid
 *  ?particella=442
 *  &comCat=669
 *  &tipoPart=partfond
 *
 * results style can be configurated as follow:
 *
 * {
 *  "name": "SearchParcel",
 *  "cfg": {
 *      "resultStyle": {
 *          "iconUrl": "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
 *          "shadowUrl": "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
 *          "iconSize": [25, 41],
 *          "iconAnchor": [12, 41],
 *          "popupAnchor": [1, -34],
 *          "shadowSize": [41, 41],
 *          "color": "#3388ff",
 *          "weight": 4,
 *          "dashArray": "",
 *          "fillColor": "#3388ff",
 *          "fillOpacity": 0.2
 *      }
 *  }
 * }
 * params can be mapped to new vaules with searchKeys configuration object as follow:
 *
 * {
 *  "name": "SearchParcel",
 *  "cfg": {
 *      "searchKeys": {
 *          "comcat": "myComcatKey",
 *          "codice": "myParticellaKey",
 *          "type": "myTipoPartKey"
 *      }
 *  }
 * }
 *
 * now the query in url is `?myParticellaKey=442&myComcatKey=669&myTipoPartKey=partfond`
 *
 * @memberof plugins.SearchParcel
 * @name SearchParcel
 * @class
 * @prop {object} service service to request parcel data and geometries (similar to search configuration)
 * @prop {object} resultStyle style to apply to result geometries
 * @prop {object} searchKeys object to map query paramiters
 */

class SearchParcel extends React.Component {

    static propTypes = {
        service: PropTypes.object,
        resultStyle: PropTypes.object,
        searchKeys: PropTypes.object,
        setOptions: PropTypes.func,
        loading: PropTypes.bool
    };

    static defaultProps = {
        service: {
            priority: 2,
            type: "bzComuniCatastali",
            displayName: "${properties.title}",
            subTitle: "${properties.description}",
            geomService: {
                type: "wfs",
                options: {
                    url: "http://geoserv02:8080/geoserver/wfs",
                    typeName: "Ambiente:comuni_catast",
                    srsName: "EPSG:4326",
                    staticFilter: "CCAT_CODIC = ${properties.code}"
                }
            },
            then: [
                {
                    type: "bzParticella",
                    displayName: "${properties.codice}",
                    searchTextTemplate: "${properties.codice}",
                    subTitle: "${properties.descTipo}",
                    geomService: {
                        type: "wfs",
                        options: {
                            url: "http://geoserv02:8080/geoserver/wfs",
                            typeName: "Cartografia:particelle",
                            srsName: "EPSG:4326",
                            staticFilter: "(NUM = '${properties.codice}' OR DSUP_SOTTO = '${properties.codice}') AND COM = ${properties.comcat}"
                        }
                    },
                    options: {
                        protocol: "http",
                        host: "sit.comune.bolzano.it",
                        pathname: "/GeoInfo/ParticelleServlet"
                    }
                }
            ]
        },
        resultStyle: {
            iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            color: "#3388ff",
            weight: 4,
            dashArray: "",
            fillColor: "#3388ff",
            fillOpacity: 0.2
        },
        searchKeys: {
            comcat: 'comCat',
            codice: 'particella',
            type: 'tipoPart'
        },
        setOptions: () => {}
    };

    componentWillMount() {
        this.props.setOptions({
            service: this.props.service,
            style: this.props.resultStyle,
            searchKeys: this.props.searchKeys
        });
    }

    render() {
        return this.props.loading ? (
        <div className="ms-parcel-search">
            <div>
                <Loader size={176} className="ms-parcel-loader"/>
                <h4 className="text-center"><Message msgId="searchparcel.loading" /></h4>
            </div>
        </div>) : null;
    }
}

const {setOptions} = require('../actions/searchparcel');
const {loadingSelector} = require('../selectors/searchparcel');
const searchEpic = require('../../MapStore2/web/client/epics/search');
const searchParcelEpic = require('../epics/searchparcel');

const searchParcelSelector = createSelector([
    loadingSelector
], (loading) => ({
    loading
}));

const SearchParcelPlugin = connect(searchParcelSelector, {
    setOptions: setOptions
})(SearchParcel);

module.exports = {
    SearchParcelPlugin,
    reducers: {
        searchparcel: require('../reducers/searchparcel'),
        search: require('../../MapStore2/web/client/reducers/search'),
        mapInfo: require('../../MapStore2/web/client/reducers/mapInfo')
    },
    epics: {...searchEpic, ...searchParcelEpic}
};
