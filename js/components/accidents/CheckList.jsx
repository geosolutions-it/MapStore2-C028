const React = require('react');
const {ListGroup, ListGroupItem, Checkbox} = require('react-bootstrap');
const Message = require('../../../MapStore2/web/client/components/I18N/Message');

module.exports = ({values = {}, items = [], onChange = () => {}}) => (<ListGroup>
    {items.map(item => (
        <ListGroupItem
            key={item.name}
            style={{ padding: '0 10px' }}
            active={values[item.name]}
            onClick={() => onChange(item.name, !values[item.name])}
        >
            <Checkbox onChange={() => {}}checked={values[item.name]}><Message msgId={item.title} /></Checkbox>
        </ListGroupItem>
    ))}
</ListGroup>);
