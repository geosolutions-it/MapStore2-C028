
const expect = require('expect');
const {
    valuesSelector,
    valueSelectorCreator,
    getCqlLayers,
    getViewParamsLayers
} = require('../accidents');

const STATE = {
    accidents: {
        viewParamsLayers: [{
            predicate: {
                name: "viewparams"
            }
        }],
        cqlLayers: [{
            predicate: {
                name: "cql"
            }
        }],
        values: {
            dow: [null, true],
            type: [null, true],
            period: {
                fromdate: new Date(1492, 9, 12),
                todate: new Date(1789, 6, 14
                )
            }
        }
    },
    layers: {
        flat: [{
            id: 1,
            name: "viewparams"
        }, {
            id: 2,
            name: "cql"
        }]
    }
};

describe('accidents selectors', () => {

    it('valuesSelector', () => {
        // check it gets the correct elements in state
        expect(valuesSelector(STATE).dow).toExist();
    });
    it('valueSelectorCreator', () => {
        // check the function returned it gets the correct elements in state
        // accidents.values.dow --> check element 1 of the array
        expect(valueSelectorCreator('dow')(STATE)[1]).toBe(true);
    });
    it('getViewParamsLayers', () => {
        // viewParamsLayer is an array containing only layers.flat[0]
        expect(getViewParamsLayers(STATE)[0].id).toBe(1);
    });
    it('getCqlLayers', () => {
        // viewParamsLayer is an array containing only layers.flat[1]
        expect(getCqlLayers(STATE)[0].id).toBe(2);
    });
});
