const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');
const expect = require('expect');
const CheckList = require('../CheckList');
describe('CheckList component', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('CheckList rendering with defaults', () => {
        ReactDOM.render(<CheckList />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelector('.list-group');
        expect(el).toExist();
    });
    it('CheckList rendering items', () => {
        ReactDOM.render(<CheckList items={[{
            title: "title",
            name: "1"
        }]} />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelector('input');
        expect(el).toExist();
        expect(el.type).toBe('checkbox');
    });
    it('checkList onChange handler', () => {
        const actions = {
            onChange: () => {}
        };
        const spyonChange = expect.spyOn(actions, 'onChange');
        ReactDOM.render(<CheckList items={[{ name: "1", title: "title"}]} onChange={actions.onChange} />, document.getElementById("container"));
        const container = document.getElementById('container');
        ReactTestUtils.Simulate.click(container.querySelector('input')); // <-- trigger event callback
        expect(spyonChange).toHaveBeenCalled();
    });

});
