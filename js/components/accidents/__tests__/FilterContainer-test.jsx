const React = require('react');
const ReactDOM = require('react-dom');

const expect = require('expect');
const FilterContainer = require('../FilterContainer');
describe('FilterContainer component', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('FilterContainer rendering with content', () => {
        ReactDOM.render(<FilterContainer title="Some text"><div key="test-div" id="TEST_DIV"></div></FilterContainer>, document.getElementById("container"));
        const container = document.getElementById('container');

        // title box
        expect(container.querySelector('.control-label')).toExist();

        // content div
        const el = container.querySelector('#TEST_DIV');
        expect(el).toExist();
    });
});
