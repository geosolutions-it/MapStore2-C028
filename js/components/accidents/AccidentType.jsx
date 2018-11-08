
const {defaultProps} = require('recompose');

const CheckList = require('./CheckList');

module.exports = defaultProps({
    items: [{
            title: "accidents.type.withInjured",
            name: "1"
    }, {
            title: "accidents.type.withoutInjured",
            name: "2"
    }, {
            title: "accidents.type.mortal",
            name: "3"
    }]
})(CheckList);
