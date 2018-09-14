const Toolbar = require('../../../MapStore2/web/client/components/misc/toolbar/Toolbar');
const {connect} = require('react-redux');
const {withProps, compose} = require('recompose');
const { applyChanges, reset } = require('../../actions/services');
const {createSelector} = require('reselect');
const { isModified } = require('../../selectors/services');

/**
 * Connect and configure the toolbar of the plugin.
 */
module.exports = compose(
    // connect event handlers
    connect(createSelector(
        isModified,
        (modified) => ({
            modified
        })
    ), {
        onApply: applyChanges,
        onReset: reset
    }),
    // configure buttons and handlers
    withProps(({
        modified,
        onApply = () => {},
        onReset = () => {}
    }) => ({
        btnDefaultProps: {
            bsStyle: 'primary',
            className: 'square-button-md'
        },
        buttons: [
            {
                glyph: 'clear-filter',
                tooltipId: 'services.toolbar.reset',
                onClick: () => onReset()
            },
            {
                glyph: 'ok',
                disabled: !modified,
                tooltipId: 'services.toolbar.applyFilter',
                onClick: () => onApply()
            }
            ]
    }))
)(Toolbar);
