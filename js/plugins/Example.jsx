const React = require('react');
const {connect} = require('react-redux');

const {example, exampleAsync, exampleFlow} = require('../actions/example');
const {toggleControl} = require('../../MapStore2/web/client/actions/controls');

const {Glyphicon} = require('react-bootstrap');

const assign = require('object-assign');

const Message = require('../../MapStore2/web/client/components/I18N/Message');

const Example = connect((state) => ({
    message: state.example.message,
    show: state.controls.example && state.controls.example.enabled || false
}), {
    onSync: example,
    onAsync: exampleAsync,
    onFlow: exampleFlow
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
            priority: 1
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
            priority: 2
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
