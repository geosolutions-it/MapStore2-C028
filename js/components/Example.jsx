const React = require('react');

const Example = React.createClass({
    propTypes: {
        message: React.PropTypes.string,
        onSync: React.PropTypes.func,
        onAsync: React.PropTypes.func,
        onFlow: React.PropTypes.func,
        show: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
            message: 'started',
            onSync: () => {},
            onAsync: () => {},
            onFlow: () => {},
            show: false
        };
    },
    render() {
        return this.props.show ? (<div className="mapstore-example">
        This is my plugin: {this.props.message}<br/>
            <button onClick={() => this.props.onSync('mytext')}>Sync</button>
            <button onClick={() => this.props.onAsync('myasync')}>Async</button>
            <button onClick={() => this.props.onFlow('8.8.8.8')}>Flow</button>
        </div>) : null;
    }
});

module.exports = Example;
