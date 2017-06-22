const React = require('react');

const Example = React.createClass({
    propTypes: {
        message: React.PropTypes.string,
        ip: React.PropTypes.string,
        calls: React.PropTypes.number,
        onSync: React.PropTypes.func,
        onAsync: React.PropTypes.func,
        onComplex: React.PropTypes.func,
        onChangeIP: React.PropTypes.func
    },
    getDefaultProps() {
        return {
            ip: '79.135.50.243'
        };
    },
    render() {
        return (<div style={{position: "absolute", zIndex: 1000, top: "50%", left: "50%", cursor: "pointer", backgroundColor: "white"}}
            >
            This is my plugin<br/>
            Message: {this.props.message}<br/>
            Calls: {this.props.calls || 0}<br/>
            <input value={this.props.ip} onChange={this.changeIP}/>
            <button onClick={this.sync}>Sync</button>
            <button onClick={this.async}>Async</button>
            <button onClick={this.complex}>Complex</button>
            </div>);
    },
    sync() {
        this.props.onSync('sync');
    },
    async() {
        this.props.onAsync('async');
    },
    complex() {
        this.props.onComplex(this.props.ip);
    },
    changeIP(e) {
        this.props.onChangeIP(e.target.value);
    }
});

module.exports = Example;
