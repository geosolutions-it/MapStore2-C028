
const React = require('react');
const { Row } = require('react-bootstrap');
const { onChange } = require('../../actions/services');

const {createSelector} = require('reselect');
const {connect} = require('react-redux');
const { valueSelectorCreator } = require('../../selectors/services');
const ServiceFilterContainer = require('../../components/services/ServiceFilterContainer');

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

const ServiceType = bindFilter('serviceTypeList')(require('../../components/services/ServiceRootType'));


module.exports = () =>
(<Row>     

    <ServiceFilterContainer title="services.serviceRoottype.title"><ServiceType /></ServiceFilterContainer>
     
</Row>);
