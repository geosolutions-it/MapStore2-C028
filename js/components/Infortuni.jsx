const React = require('react');

const {DateTimePicker} = require('react-widgets');

const Message = require('../../MapStore2/web/client/components/I18N/Message');

const giorniSettimana = [
    'Lunedì',
    'Martedì',
    'Mercoledì',
    'Giovedì',
    'Venerdì',
    'Sabato',
    'Domenica'
];

const Infortuni = React.createClass({
    propTypes: {
        giorni: React.PropTypes.array,
        from: React.PropTypes.date,
        onUpdateGiorni: React.PropTypes.func,
        onUpdateFrom: React.PropTypes.func,
        onFilter: React.PropTypes.func
    },
    getDefaultProps() {
        return {

        };
    },
    renderDate() {
        return (<DateTimePicker
            value={this.props.from}
            time={false}
            onChange={this.props.onUpdateFrom}/>);
    },
    renderGiorni() {
        return (<ul>
            {giorniSettimana.map((label, index) => <li><label>{label}</label><input type="checkbox" checked={this.props.giorni[index]} onChange={this.updateGiorni.bind(null, index)}/></li>)}
        </ul>);
    },
    render() {
        return (<div className="mapstore-infortuni">
            {this.renderDate()}
            {this.renderGiorni()}
            <button onClick={this.props.onFilter}><Message msgId="infortuni.update"/></button>
        </div>);
    },
    updateGiorni(index, e) {
        this.props.onUpdateGiorni(index, e.target.checked && true || false);
    }
});

module.exports = Infortuni;
