const Toolbar = require('../../../MapStore2/web/client/components/misc/toolbar/Toolbar');
const {connect} = require('react-redux');
const {withProps, compose} = require('recompose');
const { onApplyChanges, reset } = require('../../actions/accidents');

/**
 * Connect and configure the toolbar of the plugin.
 */
module.exports = compose(
    // connect event handlers
    connect(() => {}, {
        onApply: onApplyChanges,
        onReset: reset
    }),
    // configure buttons and handlers
    withProps(({
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
                tooltipId: 'accidents.toolbar.removeAllFilters',
                onClick: () => onReset()
            },
            {
                glyph: 'ok',
                tooltipId: 'accidents.toolbar.applyFilter',
                onClick: () => onApply()
            }
            ]
    }))
)(Toolbar);
