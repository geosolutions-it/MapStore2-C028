const React = require('react');
const Toolbar = require('../../../MapStore2/web/client/components/misc/toolbar/Toolbar');


module.exports = () => (<Toolbar
    btnDefaultProps={{
        bsStyle: 'primary',
        className: 'square-button-md'
    }}
    buttons={[
        {
            glyph: 'clear-filter',
            tooltip: 'Rimuovi tutti i filtri'
        },
        {
            glyph: 'ok',
            tooltip: 'Applica filtro'
        }
    ]} />);
