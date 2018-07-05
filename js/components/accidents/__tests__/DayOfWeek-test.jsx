const React = require('react');
const ReactDOM = require('react-dom');

const expect = require('expect');
const DayOfWeek = require('../DayOfWeek');
describe('DayOfWeek component', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('DayOfWeek rendering with defaults', () => {
        ReactDOM.render(<DayOfWeek />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelectorAll('input');
        expect(el).toExist();
        expect(el.length).toBe(7);
    });
    it('DayOfWeek values array', () => {
        ReactDOM.render(<DayOfWeek values={[null, true, false, true, false]}/>, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelectorAll('input');
        expect(el).toExist();
        expect(el.length).toBe(7);
        expect(el[0].checked).toBe(true);
        expect(el[1].checked).toBe(false);
        expect(el[2].checked).toBe(true);
        expect(el[3].checked).toBe(false);
        expect(el[4].checked).toBe(false);
        expect(el[5].checked).toBe(false);
        expect(el[6].checked).toBe(false);
    });
    it('DayOfWeek values object', () => {
        ReactDOM.render(<DayOfWeek values={{ 1: true, 3: true }} />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelectorAll('input');
        expect(el).toExist();
        expect(el.length).toBe(7);
        expect(el[0].checked).toBe(true);
        expect(el[1].checked).toBe(false);
        expect(el[2].checked).toBe(true);
        expect(el[3].checked).toBe(false);
        expect(el[4].checked).toBe(false);
        expect(el[5].checked).toBe(false);
        expect(el[6].checked).toBe(false);
    });
});
