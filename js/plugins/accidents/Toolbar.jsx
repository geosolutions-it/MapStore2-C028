const Toolbar = require('../../../MapStore2/web/client/components/misc/toolbar/Toolbar');
const {connect} = require('react-redux');
const {withProps, compose} = require('recompose');
const { onApplyChanges } = require('../../actions/accidents');

/**
 * Connect and configure the toolbar of the plugin.
 */
module.exports = compose(
    // connect event handlers
    connect(() => {}, {
        onApply: onApplyChanges
    }),
    // configure buttons and handlers
    withProps(({
        onApply = () => {}
    }) => ({
        btnDefaultProps: {
            bsStyle: 'primary',
            className: 'square-button-md'
        },
        buttons: [
            {
                glyph: 'clear-filter',
                tooltipId: 'accidents.toolbar.removeAllFilters'
            },
            {
                glyph: 'ok',
                tooltipId: 'accidents.toolbar.applyFilter',
                onClick: () => onApply()
            }
            ]
    }))
)(Toolbar);
