const Toolbar = require('../../../MapStore2/web/client/components/misc/toolbar/Toolbar');
const {connect} = require('react-redux');
const {withProps, compose} = require('recompose');
const { applyChanges, reset } = require('../../actions/accidents');
const {createSelector} = require('reselect');
const { isModified } = require('../../selectors/accidents');

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
                tooltipId: 'accidents.toolbar.reset',
                onClick: () => onReset()
            },
            {
                glyph: 'ok',
                disabled: !modified,
                tooltipId: 'accidents.toolbar.applyFilter',
                onClick: () => onApply()
            }
            ]
    }))
)(Toolbar);
