/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const assign = require('object-assign');
const { Grid, Row, Col} = require('react-bootstrap');
const BorderLayout = require('../../MapStore2/web/client/components/layout/BorderLayout');
const {compose} = require('recompose');
const {connect} = require('react-redux');
const ServiceToolbar = require('./services/ServiceToolbar');
const ServiceFilters = require('./services/ServiceFilters');


const ServiceFiltersPlugin = compose(
    connect(() => ({}))
)(() => <BorderLayout
    className="ms-servizi-filter-container"
    header={
        <Grid style={{ width: '100%', marginTop: 10 }} fluid>
            <Row style={{ marginTop: 10 }}>
                <Col xs={12} className="text-center">
                    <ServiceToolbar />
                </Col>
            </Row>
        </Grid>
    }>
    <Grid style={{ width: '100%', overflow: 'auto', flex: 1 }} fluid>
        <ServiceFilters />
    </Grid>
</BorderLayout>);


module.exports = {
    ServiceFiltersPlugin: assign(ServiceFiltersPlugin, {
        hide: true,
        /*
         * This allows the plugin to be rendered in the left menu.
         */
        DrawerMenu: {
            name: 'serviceFilters',
            position: 3,
            glyph: "sunglasses",
            buttonConfig: {
                buttonClassName: "square-button no-border",
                tooltip: "services.title"
            },
            priority: 2
        }
    }),
    reducers: {
        services: require('../reducers/services')
    },
    epics: require('../epics/services')
};
