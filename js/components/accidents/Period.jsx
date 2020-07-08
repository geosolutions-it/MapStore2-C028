
const React = require('react');
const { withProps } = require('recompose');
const Message = require('../../../MapStore2/web/client/components/I18N/Message');
const momentLocalizer = require('react-widgets/lib/localizers/moment');
const moment = require('moment');
momentLocalizer(moment);
const { DateTimePicker } = require('react-widgets');

/**
 * Component that renders a single date field, with label
 */
const DateField = ({value, name, title, max, min, onChange = () => {}}) =>
    (<div style={{ marginBottom: 10 }}>
        <div><Message msgId={title} />:</div>
        <div>
            <DateTimePicker
                format={(date) => moment(date).format('DD/MM/YYYY')}
                // supported formats for manual date insert
                parse={[
                    'DD/MM/YYYY',
                    'D/M/YYYY',
                    'D/M/YY',
                    'DD-MM-YYYY',
                    'D-M-YYYY',
                    'D-M-YY'
                ]}
                max={max}
                min={min}
                time={false}
                value={value}
                onChange={date => onChange(name, date)} />
        </div>
    </div>);

module.exports = withProps( ({values}) => ({
    items: [{
        title: "accidents.period.from",
        name: "fromdate",
        max: values && values.todate
    }, {
        title: "accidents.period.to",
        name: "todate",
        min: values && values.fromdate
    }]
})
/**
 * Component that renders 1 date field for each item in `items` property.
 */
)(({values = {}, onChange = () => {}, items = []}) => (
    <div>
        {items.map(({name, title, max, min}) => <DateField key={name} max={max} min={min} value={values[name]} name={name} title={title} onChange={onChange} />)}
    </div>
));
