const React = require('react');
const ReactDOM = require('react-dom');

const expect = require('expect');
const AccidentType = require('../AccidentType');
describe('AccidentType component', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('AccidentType rendering with defaults', () => {
        ReactDOM.render(<AccidentType />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelectorAll('input');
        expect(el).toExist();
        expect(el.length).toBe(3);
    });
});
