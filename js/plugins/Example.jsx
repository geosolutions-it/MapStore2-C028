const {example, exampleAsync, exampleComplex, changeIP} = require('../actions/example');
const {toggleControl} = require('../../MapStore2/web/client/actions/controls');
const {connect} = require('react-redux');
const assign = require('object-assign');

const React = require('react');

const {Glyphicon} = require('react-bootstrap');
const Message = require('../../MapStore2/web/client/components/I18N/Message');

const Example = connect((state) => ({
    message: state.example.message,
    calls: state.example.calls,
    ip: state.example.ip,
    show: state.controls.example && state.controls.example.enabled
}),
{
    onSync: example,
    onAsync: exampleAsync,
    onComplex: exampleComplex,
    onChangeIP: changeIP
})(require('../components/Example'));

module.exports = {
    ExamplePlugin: assign(Example, {
        DrawerMenu: {
            name: 'example',
            position: 2,
            icon: <Glyphicon glyph="euro"/>,
            title: 'example',
            buttonConfig: {
                buttonClassName: "square-button no-border",
                tooltip: "example.tooltip"
            },
            priority: 4
        },
        Toolbar: {
            name: 'example',
            position: 9,
            panel: true,
            exclusive: true,
            wrap: true,
            tooltip: "example.tooltip",
            icon: <Glyphicon glyph="euro"/>,
            title: "example.title",
            priority: 1
        },
        BurgerMenu: {
            name: 'example',
            position: 1000,
            text: <Message msgId="example.title"/>,
            action: toggleControl.bind(null, 'example', null),
            icon: <Glyphicon glyph="euro"/>,
            priority: 3,
            doNotHide: true
        }
    }),
    reducers: {
        example: require('../reducers/example')
    },
    epics: {
        example: require('../epics/example')
    }
};
