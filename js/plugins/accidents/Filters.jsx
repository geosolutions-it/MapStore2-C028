
const React = require('react');
const { Row } = require('react-bootstrap');
const { onChange } = require('../../actions/accidents');

const {createSelector} = require('reselect');
const {connect} = require('react-redux');
const { valueSelectorCreator } = require('../../selectors/accidents');
const FilterContainer = require('../../components/accidents/FilterContainer');

/**
 * Binds all the form components to the proper part of the accident's state and to the proper handlers.
 *
 * @param {string} scope the scope of the values in the accident's state
 */
const bindFilter = scope => connect(
    createSelector(
        valueSelectorCreator(scope),
        values => ({values})
    ), {
        onChange: (name, value) => onChange(`${scope}.${name}`, value)
    }
);

const DayOfWeek = bindFilter('dow')(require('../../components/accidents/DayOfWeek'));
const AccidentType = bindFilter('type')(require('../../components/accidents/AccidentType'));
const Period = bindFilter('period')(require('../../components/accidents/Period'));

module.exports = () => (
    <Row>
        <FilterContainer title="accidents.period.title"><Period /></FilterContainer>
        <FilterContainer title="accidents.dow.title"><DayOfWeek /></FilterContainer>
        <FilterContainer title="accidents.type.title"><AccidentType /></FilterContainer>
    </Row>
);
