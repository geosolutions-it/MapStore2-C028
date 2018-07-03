
const React = require('react');
const {defaultProps} = require('recompose');
const Message = require('../../../MapStore2/web/client/components/I18N/Message');
const momentLocalizer = require('react-widgets/lib/localizers/moment');
const moment = require('moment');
momentLocalizer(moment);
const { DateTimePicker } = require('react-widgets');
/**
 * Component that renders a single date field, with label
 */
const DateField = ({value, name, title, onChange = () => {}}) =>
    (<div style={{ marginBottom: 10 }}>
        <div><Message msgId={title} />:</div>
        <div>
            <DateTimePicker
                format={(date) => moment(date).format('DD/MM/YYYY')}
                time={false}
                value={value}
                onChange={date => onChange(name, date)} />
        </div>
    </div>);

module.exports = defaultProps({
    items: [{
        title: "accidents.period.from",
        name: "fromdate"
    }, {
        title: "accidents.period.to",
        name: "todate"
    }]
}
/**
 * Component that renders 1 date field for each item in `items` property.
 */
)(({values = {}, onChange = () => {}, items = []}) =>
(<div>
    {items.map(({name, title}) => <DateField value={values[name]} name={name} title={title} onChange={onChange} />)}
</div>));

