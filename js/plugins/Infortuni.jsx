const React = require('react');
const {connect} = require('react-redux');

const {Glyphicon} = require('react-bootstrap');
const {updateGiorni, updateFrom, filterInfortuni} = require('../actions/infortuni');

const assign = require('object-assign');

const Infortuni = connect((state) => ({
    giorni: state.infortuni && state.infortuni.giorni || [],
    from: state.infortuni && state.infortuni.from
}), {
    onUpdateGiorni: updateGiorni,
    onUpdateFrom: updateFrom,
    onFilter: filterInfortuni
})(require('../components/Infortuni'));

module.exports = {
    InfortuniPlugin: assign(Infortuni, {
        DrawerMenu: {
            name: 'infortuni',
            position: 2,
            icon: <Glyphicon glyph="euro"/>,
            title: 'infortuni',
            buttonConfig: {
                buttonClassName: "square-button no-border",
                tooltip: "infortuni.tooltip"
            },
            priority: 1
        }
    }),
    reducers: {
        infortuni: require('../reducers/infortuni')
    }
};
