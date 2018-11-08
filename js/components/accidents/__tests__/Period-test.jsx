const React = require('react');
const ReactDOM = require('react-dom');

const expect = require('expect');
const Period = require('../Period');
describe('Period component', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('Period rendering with defaults', () => {
        ReactDOM.render(<Period />, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelectorAll('.rw-datetimepicker');
        expect(el).toExist();
        expect(el.length).toBe(2);
    });
    it('Test values', () => {
        ReactDOM.render(<Period values={{ fromdate: new Date(1492, 9, 12), todate: new Date(1789, 6, 14)}}/>, document.getElementById("container"));
        const container = document.getElementById('container');
        const el = container.querySelectorAll('.rw-input');
        expect(el).toExist();
        expect(el).toExist();
        expect(el.length).toBe(2);
        expect(el[0].value).toBe("12/10/1492");
        expect(el[1].value).toBe("14/07/1789");
    });
});
