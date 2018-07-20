const expect = require('expect');
const { onChange, applyChanges, reset } = require('../../actions/accidents');

const accidents = require('../accidents');
describe('accidents reducer', () => {
    it('onChange action changes values and modified flags', () => {
        const state = accidents(undefined, onChange("dow[1]", true));
        expect(state).toExist();
        expect(state.values.dow[0]).toBeFalsy();
        expect(state.values.dow[1]).toBe(true);
        expect(state.modified).toBe(true);
    });
    it('applyChanges action reset modified flag', () => {
        const action = applyChanges();
        const state = accidents( {modified: true}, action);
        expect(state.modified).toBe(false);
    });
    it('reset action reset modified flag and set values', () => {
        const action = reset();
        const state = accidents({ modified: true, values: {dow: [null, false, true, false]} }, action);
        expect(state.modified).toBe(false);
        expect(state.values.dow[1]).toBe(true);
    });
});
