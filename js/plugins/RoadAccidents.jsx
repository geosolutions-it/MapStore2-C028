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
const Toolbar = require('./accidents/Toolbar');
const Filters = require('./accidents/Filters');
const RoadAccidentsPlugin = compose(
    connect(() => ({}))
)(() => <BorderLayout
    className="ms-infortuni-stradali-container"
    header={
        <Grid style={{ width: '100%', marginTop: 10 }} fluid>
            <Row style={{ marginTop: 10 }}>
                <Col xs={12} className="text-center">
                    <Toolbar />
                </Col>
            </Row>
        </Grid>
    }>
    <Grid style={{ width: '100%', overflow: 'auto', flex: 1 }} fluid>
        <Filters />
    </Grid>
</BorderLayout>);
module.exports = {
    TOCPlugin: assign(RoadAccidentsPlugin, {

        /*
         * This allows the plugin to be rendered in the left menu.
         */
        DrawerMenu: {
            name: 'toc',
            position: 2,
            glyph: "road",
            buttonConfig: {
                buttonClassName: "square-button no-border",
                tooltip: "toc.layers"
            },
            priority: 2
        }
    }),
    reducers: {
        accidents: require('../reducers/accidents')
    },
    epics: require('../epics/accidents')
};
