
const React = require('react');
const {defaultProps} = require('recompose');
const {range} = require('lodash');

const CheckList = require('./CheckList');
const Message = require('../../../MapStore2/web/client/components/I18N/Message');


module.exports = defaultProps({
    items: range(1, 8).map(i => ({
    name: `${i}`,
        title: <Message msgId={`accidents.dow.${i}`} />
    }))
})(CheckList);
