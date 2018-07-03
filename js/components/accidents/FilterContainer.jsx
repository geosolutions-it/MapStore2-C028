

const React = require('react');
const { Col, FormGroup, ControlLabel} = require('react-bootstrap');
const Message = require('../../../MapStore2/web/client/components/I18N/Message');

module.exports = ({children, title}) =>
    (<Col xs={12}>
            <FormGroup>
            <ControlLabel>{title ? <span><Message msgId={title} /></span> : null}</ControlLabel>
                {children}
            </FormGroup>
    </Col>);
