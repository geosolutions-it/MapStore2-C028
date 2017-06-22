const {example, exampleAsync, exampleComplex, changeIP} = require('../actions/example');
const {connect} = require('react-redux');

const Example = connect((state) => ({
    message: state.example.message,
    calls: state.example.calls,
    ip: state.example.ip
}),
{
    onSync: example,
    onAsync: exampleAsync,
    onComplex: exampleComplex,
    onChangeIP: changeIP
})(require('../components/Example'));

module.exports = {
    ExamplePlugin: Example,
    reducers: {
        example: require('../reducers/example')
    },
    epics: {
        example: require('../epics/example')
    }
};
