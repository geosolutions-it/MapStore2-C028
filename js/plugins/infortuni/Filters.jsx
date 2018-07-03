
const React = require('react');
const { Row } = require('react-bootstrap');

const FilterContainer = require('../../components/infortuni/FilterContainer');
const DayOfWeek = require('../../components/infortuni/DayOfWeek');


module.exports = () => (<Row>
        <FilterContainer>test1</FilterContainer>
        <FilterContainer><DayOfWeek /></FilterContainer>
    <FilterContainer>test1</FilterContainer>
    </Row>);
